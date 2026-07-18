/**
 * Admin app entry: sign-in with a fine-grained GitHub token, load the
 * content JSON + asset listings, route between editor tabs, and publish
 * changes as ONE commit that triggers the Pages build. No server anywhere:
 * GitHub is the database, the build pipeline and the host.
 */
import { GitHub, GitHubError, encodeText } from "./github";
import {
	ADMIN_REPO,
	ADMIN_BRANCH,
	DEPLOYS,
	TOKEN_STORAGE_KEY,
	CONTENT_FILES,
	type FileKey,
} from "./config";
import {
	app,
	serialize,
	dirtyKeys,
	hasChanges,
	CLASS_IDS,
	estimateSedanRoundTrip,
	estimateSedanOneWay,
} from "./state";
import { el, cx, field, modal, badge } from "./ui";
import {
	viewRoutes,
	viewPackages,
	viewAirport,
	viewRateCard,
	viewFleet,
	viewSite,
	viewFaqs,
	viewTestimonials,
	viewPhotos,
} from "./editors";

const root = document.getElementById("admin-app")!;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FILE_LABELS: Record<FileKey, string> = {
	site: "contact & SEO",
	rateCard: "rate card",
	routes: "routes",
	packages: "tour packages",
	airport: "airport areas",
	vehicles: "fleet",
	faqs: "FAQ page",
	testimonials: "testimonials",
};

const TABS: { id: string; label: string; keys: FileKey[]; view: () => HTMLElement }[] = [
	{ id: "routes", label: "Routes", keys: ["routes"], view: viewRoutes },
	{ id: "packages", label: "Packages", keys: ["packages"], view: viewPackages },
	{ id: "airport", label: "Airport", keys: ["airport"], view: viewAirport },
	{ id: "rates", label: "Rate card", keys: ["rateCard"], view: viewRateCard },
	{ id: "fleet", label: "Fleet", keys: ["vehicles"], view: viewFleet },
	{ id: "photos", label: "Photos", keys: [], view: viewPhotos },
	{ id: "faqs", label: "FAQs", keys: ["faqs"], view: viewFaqs },
	{ id: "reviews", label: "Reviews", keys: ["testimonials"], view: viewTestimonials },
	{ id: "site", label: "Contact & SEO", keys: ["site"], view: viewSite },
];

/* ---------- sign-in ---------- */

function renderLogin(error?: string) {
	const tokenInput = el("input", {
		class: cx.input,
		type: "password",
		placeholder: "github_pat_…",
		autocomplete: "off",
	}) as HTMLInputElement;
	const errorLine = el(
		"p",
		{ class: "text-sm font-semibold text-red-600 dark:text-red-400" },
		error ?? ""
	);
	const submit = async () => {
		const token = tokenInput.value.trim();
		if (!token) return;
		errorLine.textContent = "Checking token…";
		try {
			await start(token);
			localStorage.setItem(TOKEN_STORAGE_KEY, token);
		} catch (e) {
			errorLine.textContent =
				e instanceof GitHubError && e.status === 401
					? "GitHub rejected that token — check it was copied fully and hasn't expired."
					: (e as Error).message;
		}
	};

	const step = (n: number, ...content: (string | Node)[]) =>
		el(
			"li",
			{ class: "flex gap-3 text-sm text-muted-foreground" },
			el(
				"span",
				{ class: "flex h-6 w-6 flex-none items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white" },
				String(n)
			),
			el("span", {}, ...content)
		);

	root.replaceChildren(
		el(
			"div",
			{ class: "mx-auto max-w-xl space-y-6 px-4 py-14" },
			el("h2", { class: "text-3xl font-bold text-foreground" }, "Sign in"),
			el(
				"p",
				{ class: "text-muted-foreground" },
				"Paste your GitHub access token. It is stored only in this browser and can be revoked from GitHub at any time."
			),
			el(
				"div",
				{ class: cx.card + " space-y-4" },
				field("Access token", tokenInput),
				errorLine,
				el(
					"button",
					{ class: `${cx.btn} ${cx.btnPrimary} w-full`, onclick: submit },
					"Sign in"
				)
			),
			el(
				"div",
				{ class: cx.card + " space-y-3" },
				el("h3", { class: "font-bold text-foreground" }, "First time? Create your token (2 minutes)"),
				el(
					"ol",
					{ class: "space-y-2.5" },
					step(
						1,
						"Open ",
						el(
							"a",
							{
								href: "https://github.com/settings/personal-access-tokens/new",
								target: "_blank",
								rel: "noopener",
								class: "font-semibold text-orange-600 underline dark:text-orange-400",
							},
							"github.com → Fine-grained tokens → New"
						),
						" (sign in as the account that owns the site repo)."
					),
					step(2, `Name it "cab-site-admin" and set Expiration to the maximum (you'll paste a fresh one when it expires).`),
					step(3, `Repository access → "Only select repositories" → choose ${ADMIN_REPO.split("/")[1]}.`),
					step(4, `Permissions → Repository permissions → set "Contents" to Read and write, and "Actions" to Read-only (that shows publish progress here).`),
					step(5, `Click "Generate token", copy the github_pat_… value and paste it above.`)
				)
			)
		)
	);
	tokenInput.focus();
}

/* ---------- load & shell ---------- */

async function start(token: string) {
	root.replaceChildren(
		el("p", { class: "px-4 py-14 text-center text-muted-foreground" }, "Loading content from GitHub…")
	);
	const gh = new GitHub(token);
	const { login, canPush } = await gh.verify();
	if (!canPush)
		throw new Error(`This token can't push to ${ADMIN_REPO}. Re-check the token's repository access and Contents permission.`);
	app.gh = gh;
	app.login = login;

	const keys = Object.keys(CONTENT_FILES) as FileKey[];
	const [fileResults, destinations, cars] = await Promise.all([
		Promise.all(keys.map((k) => gh.getFile(CONTENT_FILES[k]))),
		gh.listDir("src/assets/destinations"),
		gh.listDir("src/assets/cars"),
	]);
	keys.forEach((key, i) => {
		const current = JSON.parse(fileResults[i].text);
		app.files[key] = { current, snapshot: serialize(current), sha: fileResults[i].sha };
	});
	app.assets = { destinations, cars };
	app.pending = [];
	renderShell();
}

let activeTab = TABS[0];
const viewHost = el("div", { class: "mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-40 sm:px-6 sm:pb-28" });
// One swipeable row on phones, wraps on wider screens.
const tabsNav = el("nav", { class: "scrollbar-hide mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-4 sm:flex-wrap sm:overflow-visible sm:px-6" });
const publishBar = el("div", {
	class: "fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur",
});

function renderShell() {
	app.show = (view) => {
		viewHost.replaceChildren(view);
		refreshChrome();
	};
	app.refreshChrome = refreshChrome;

	root.replaceChildren(
		el(
			"div",
			{ class: "border-b bg-card" },
			el(
				"div",
				{ class: "mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6" },
				el("p", { class: "font-bold text-foreground" }, "Bangalore Urban Cabs ", el("span", { class: "text-orange-600 dark:text-orange-400" }, "Admin")),
				el("span", { class: "hidden sm:inline-flex" }, badge(`${ADMIN_REPO}@${ADMIN_BRANCH}`)),
				DEPLOYS ? null : badge("test branch — no auto-deploy", "warn"),
				el("span", { class: "flex-1" }),
				el("a", { href: `${import.meta.env.BASE_URL}`, class: "py-2 text-sm font-semibold text-orange-600 hover:underline dark:text-orange-400" }, "View site →"),
				el("span", { class: "hidden text-sm text-muted-foreground sm:inline" }, `@${app.login}`),
				el(
					"button",
					{
						class: "text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer",
						onclick: () => {
							if (hasChanges() && !confirm("You have unpublished changes that will be lost. Sign out anyway?")) return;
							localStorage.removeItem(TOKEN_STORAGE_KEY);
							location.reload();
						},
					},
					"Sign out"
				)
			),
			tabsNav
		),
		viewHost,
		publishBar
	);

	// Any interaction may change data or dirty state; refresh the chrome
	// (tab dots + publish bar) on a small debounce.
	let timer: number | undefined;
	for (const evt of ["input", "change", "click"])
		viewHost.addEventListener(evt, () => {
			clearTimeout(timer);
			timer = window.setTimeout(refreshChrome, 250);
		});

	setTab(TABS[0]);
}

function setTab(tab: (typeof TABS)[number]) {
	activeTab = tab;
	viewHost.replaceChildren(tab.view());
	refreshChrome();
	window.scrollTo({ top: 0 });
}

function refreshChrome() {
	const dirty = new Set(dirtyKeys());
	tabsNav.replaceChildren(
		...TABS.map((tab) => {
			const isDirty = tab.keys.some((k) => dirty.has(k)) || (tab.id === "photos" && app.pending.length > 0);
			return el(
				"button",
				{
					class: `relative flex-none whitespace-nowrap rounded-t-lg px-3 py-2 text-sm font-semibold cursor-pointer ${
						tab === activeTab
							? "border border-b-0 bg-background text-orange-600 dark:text-orange-400"
							: "text-muted-foreground hover:text-foreground"
					}`,
					onclick: () => setTab(tab),
				},
				tab.label,
				isDirty ? el("span", { class: "absolute -right-0.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" }) : null
			);
		})
	);

	const changed = dirtyKeys();
	if (!changed.length && !app.pending.length) {
		publishBar.replaceChildren();
		publishBar.style.display = "none";
		return;
	}
	publishBar.style.display = "";
	const parts = [
		...changed.map((k) => FILE_LABELS[k]),
		...(app.pending.length ? [`${app.pending.length} new photo${app.pending.length > 1 ? "s" : ""}`] : []),
	];
	publishBar.replaceChildren(
		el(
			"div",
			{ class: "mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-6" },
			el(
				"p",
				{ class: "flex min-w-0 basis-full items-center gap-2 text-sm text-foreground sm:basis-0 sm:flex-1" },
				el("span", { class: "h-2.5 w-2.5 flex-none animate-pulse rounded-full bg-orange-500" }),
				el("span", { class: "truncate" }, el("strong", {}, "Unpublished: "), parts.join(", "))
			),
			el("button", { class: `${cx.btn} ${cx.btnGhost} flex-1 sm:flex-none`, onclick: discardAll }, "Discard"),
			el("button", { class: `${cx.btn} ${cx.btnPrimary} flex-1 sm:flex-none`, onclick: openPublishModal }, "Review & publish")
		)
	);
}

function discardAll() {
	const m = modal(
		"Discard all changes?",
		el("p", { class: "text-sm text-muted-foreground" }, "Everything you edited since the last publish reverts. Staged photos are removed too."),
		[
			el("button", { class: `${cx.btn} ${cx.btnGhost}`, onclick: () => m.close() }, "Keep editing"),
			el(
				"button",
				{
					class: `${cx.btn} ${cx.btnDanger}`,
					onclick: () => {
						for (const key of Object.keys(app.files) as FileKey[])
							app.files[key].current = JSON.parse(app.files[key].snapshot);
						app.pending = [];
						m.close();
						setTab(activeTab);
					},
				},
				"Discard everything"
			),
		]
	);
}

/* ---------- normalize + validate before publish ---------- */

/** Drop empty optional fields / fully-empty rows the list editors leave behind. */
function normalizeContent() {
	const clean = (arr: string[]) => arr.map((s) => s.trim()).filter(Boolean);
	const cleanFaqs = (faqs: any[]) => faqs.filter((f) => f.question.trim() || f.answer.trim());
	for (const r of app.files.routes.current) {
		r.slug = r.slug.trim();
		r.intro = clean(r.intro);
		r.travelTips = clean(r.travelTips);
		r.sights = r.sights.filter((s: any) => s.name.trim() || s.blurb.trim());
		r.faqs = cleanFaqs(r.faqs);
	}
	for (const p of app.files.packages.current) {
		p.slug = p.slug.trim();
		p.overview = clean(p.overview);
		p.inclusions = clean(p.inclusions);
		p.exclusions = clean(p.exclusions);
		p.sightsCovered = clean(p.sightsCovered);
		p.faqs = cleanFaqs(p.faqs);
		for (const day of p.itinerary)
			for (const stop of day.stops) {
				if (!stop.time?.trim()) delete stop.time;
				if (!stop.note?.trim()) delete stop.note;
			}
		for (const day of p.itinerary) day.stops = day.stops.filter((s: any) => s.place?.trim() || s.time || s.note);
	}
	for (const a of app.files.airport.current) {
		a.slug = a.slug.trim();
		a.neighbourhoods = clean(a.neighbourhoods);
		a.notes = clean(a.notes);
		a.faqs = cleanFaqs(a.faqs);
	}
	app.files.faqs.current.items = cleanFaqs(app.files.faqs.current.items);
	app.files.testimonials.current = app.files.testimonials.current.filter(
		(t: any) => t.name.trim() || t.text.trim()
	);
	for (const cat of Object.values(app.files.vehicles.current) as any[])
		for (const v of cat.vehicles) v.features = clean(v.features);
}

/** Client-side mirror of scripts/validate-data.mjs (the build re-checks everything). */
function validateAll(): string[] {
	const errors: string[] = [];
	const err = (m: string) => errors.push(m);
	const routes = app.files.routes.current;
	const packages = app.files.packages.current;
	const kebabRe = /^[a-z0-9]+(-[a-z0-9]+)*$/;
	const routeSlugs = new Set(routes.map((r: any) => r.slug));
	const pkgSlugs = new Set(packages.map((p: any) => p.slug));
	const knownImages = new Set([
		...app.assets.destinations.map((a) => `destinations/${a.name}`),
		...app.assets.cars.map((a) => `cars/${a.name}`),
		...app.pending.map((p) => `${p.folder}/${p.name}`),
	]);
	const band = (actual: number, estimate: number, where: string) => {
		const ratio = actual / estimate;
		if (ratio < 0.35 || ratio > 3)
			err(`${where}: ₹${actual} is ${ratio.toFixed(1)}× the rate-card estimate (₹${Math.round(estimate)}) — double-check for a typo.`);
	};

	const seenRoute = new Set<string>();
	for (const r of routes) {
		const where = `Route "${r.name || r.slug}"`;
		if (!r.name?.trim()) err(`${where}: name is empty.`);
		if (!kebabRe.test(r.slug)) err(`${where}: slug "${r.slug}" must be lowercase-with-hyphens.`);
		if (seenRoute.has(r.slug)) err(`${where}: duplicate slug.`);
		seenRoute.add(r.slug);
		if (!r.intro.length) err(`${where}: needs at least one intro paragraph.`);
		const sedan = r.fares?.sedan;
		if (!(sedan?.roundTrip > 0)) err(`${where}: sedan round-trip fare is required.`);
		else {
			band(sedan.roundTrip, estimateSedanRoundTrip(r.distanceKm, r.days), `${where} round-trip`);
			if (sedan.oneWay !== undefined) {
				if (sedan.oneWay >= sedan.roundTrip) err(`${where}: one-way fare must be below the round-trip fare.`);
				band(sedan.oneWay, estimateSedanOneWay(r.distanceKm), `${where} one-way`);
			}
		}
		if (r.image && !knownImages.has(r.image)) err(`${where}: photo "${r.image}" is missing.`);
		for (const rel of r.relatedRoutes) if (!routeSlugs.has(rel)) err(`${where}: related route "${rel}" doesn't exist.`);
		for (const ps of r.packageSlugs) if (!pkgSlugs.has(ps)) err(`${where}: package "${ps}" doesn't exist.`);
	}

	const seenPkg = new Set<string>();
	for (const p of packages) {
		const where = `Package "${p.shortName || p.slug}"`;
		if (!p.name?.trim() || !p.shortName?.trim()) err(`${where}: name and short name are required.`);
		if (!kebabRe.test(p.slug)) err(`${where}: slug "${p.slug}" must be lowercase-with-hyphens.`);
		if (seenPkg.has(p.slug)) err(`${where}: duplicate slug.`);
		seenPkg.add(p.slug);
		const sedan = p.prices.find((x: any) => x.vehicle === "sedan");
		if (!(sedan?.price > 0)) err(`${where}: a sedan price is required.`);
		else band(sedan.price, p.includedKm * app.files.rateCard.current.sedan.outstationPerKm + app.files.rateCard.current.sedan.driverBataPerDay * p.durationDays, `${where} sedan price`);
		if (!p.overview.length) err(`${where}: needs at least one overview paragraph.`);
		if (!p.itinerary.length || p.itinerary.some((d: any) => !d.title?.trim() || !d.stops.length))
			err(`${where}: every itinerary day needs a title and at least one stop.`);
		if (p.image && !knownImages.has(p.image)) err(`${where}: photo "${p.image}" is missing.`);
		for (const s of p.routeSlugs) if (!routeSlugs.has(s)) err(`${where}: route "${s}" doesn't exist.`);
		for (const s of p.relatedPackages) if (!pkgSlugs.has(s)) err(`${where}: related package "${s}" doesn't exist.`);
	}

	const seenArea = new Set<string>();
	for (const a of app.files.airport.current) {
		const where = `Airport area "${a.name || a.slug}"`;
		if (!a.name?.trim()) err(`${where}: name is empty.`);
		if (!kebabRe.test(a.slug)) err(`${where}: slug must be lowercase-with-hyphens.`);
		if (seenArea.has(a.slug)) err(`${where}: duplicate slug.`);
		seenArea.add(a.slug);
		if (!(a.fares?.sedan >= 300 && a.fares?.sedan <= 6000)) err(`${where}: sedan fare must be ₹300–6,000.`);
		if (!a.neighbourhoods.length) err(`${where}: list at least one neighbourhood.`);
	}

	const site = app.files.site.current;
	if (!/^91[0-9]{10}$/.test(site.whatsapp)) err(`Contact: WhatsApp number must be 91 + 10 digits (currently "${site.whatsapp}").`);
	if (site.phoneE164 !== `+${site.whatsapp}`) site.phoneE164 = `+${site.whatsapp}`;
	if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(site.email)) err("Contact: email address looks invalid.");

	const vehicleNames = new Set(
		(Object.values(app.files.vehicles.current) as any[]).flatMap((c) => c.vehicles.map((v: any) => v.name))
	);
	for (const cls of CLASS_IDS) {
		const r = app.files.rateCard.current[cls];
		for (const k of ["outstationPerKm", "oneWayPerKm", "driverBataPerDay", "airportBase", "hourly8", "minKmPerDay", "sedanMultiplier"])
			if (!(r[k] > 0)) err(`Rate card ${cls}: "${k}" must be a positive number.`);
		if (!vehicleNames.has(r.bookingFormValue))
			err(`Rate card ${cls}: booking form value "${r.bookingFormValue}" doesn't match any vehicle name on the Fleet tab.`);
	}
	if (app.files.rateCard.current.sedan.sedanMultiplier !== 1) err("Rate card: the sedan multiplier must stay 1.");

	for (const cat of Object.values(app.files.vehicles.current) as any[])
		for (const v of cat.vehicles) {
			if (!v.images.length) err(`Fleet "${v.name}": needs at least one photo.`);
			for (const img of v.images) if (!knownImages.has(img)) err(`Fleet "${v.name}": photo "${img}" is missing.`);
		}

	for (const f of app.files.faqs.current.items)
		if (!f.question.trim() || !f.answer.trim()) err(`FAQ "${f.question || "(empty)"}": needs both a question and an answer.`);
	for (const t of app.files.testimonials.current)
		if (!t.name.trim() || !t.text.trim() || !(t.rating >= 1 && t.rating <= 5))
			err(`Testimonial "${t.name || "(unnamed)"}": needs a name, a quote and a 1–5 rating.`);

	return errors;
}

/** Human summary of what changed, for the commit message and review list. */
function changeSummary(): string[] {
	const lines: string[] = [];
	const diffBySlug = (key: FileKey, label: string, slugKey = "slug", nameKey = "shortName") => {
		const before = new Map(JSON.parse(app.files[key].snapshot).map((x: any) => [x[slugKey], x]));
		const after = new Map(app.files[key].current.map((x: any) => [x[slugKey], x]));
		const added = [...after.keys()].filter((s) => !before.has(s));
		const removed = [...before.keys()].filter((s) => !after.has(s));
		const edited = [...after.keys()].filter(
			(s) => before.has(s) && JSON.stringify(before.get(s)) !== JSON.stringify(after.get(s))
		);
		const name = (s: unknown) => {
			const item = (after.get(s) ?? before.get(s)) as any;
			return item?.[nameKey] ?? item?.name ?? s;
		};
		if (added.length) lines.push(`add ${label}: ${added.map(name).join(", ")}`);
		if (removed.length) lines.push(`remove ${label}: ${removed.map(name).join(", ")}`);
		if (edited.length) lines.push(`update ${label}: ${edited.map(name).join(", ")}`);
	};
	const dirty = new Set(dirtyKeys());
	if (dirty.has("routes")) diffBySlug("routes", "route", "slug", "name");
	if (dirty.has("packages")) diffBySlug("packages", "package");
	if (dirty.has("airport")) diffBySlug("airport", "airport area", "slug", "name");
	if (dirty.has("rateCard")) lines.push("update rate card");
	if (dirty.has("vehicles")) lines.push("update fleet");
	if (dirty.has("site")) lines.push("update contact/site info");
	if (dirty.has("faqs")) lines.push("update FAQs");
	if (dirty.has("testimonials")) lines.push("update testimonials");
	if (app.pending.length) lines.push(`add ${app.pending.length} photo${app.pending.length > 1 ? "s" : ""}`);
	return lines;
}

/* ---------- publish ---------- */

function openPublishModal() {
	normalizeContent();
	const errors = validateAll();
	if (errors.length) {
		const m = modal(
			"Fix these before publishing",
			el(
				"ul",
				{ class: "max-h-80 list-disc space-y-1.5 overflow-y-auto pl-5 text-sm text-red-700 dark:text-red-400" },
				...errors.map((e) => el("li", {}, e))
			),
			[el("button", { class: `${cx.btn} ${cx.btnPrimary}`, onclick: () => m.close() }, "OK, I'll fix them")]
		);
		return;
	}

	const summary = changeSummary();
	const messageInput = el("textarea", { class: cx.input, rows: 2 }) as HTMLTextAreaElement;
	messageInput.value = `admin: ${summary.join("; ")}`.slice(0, 300);

	const status = el("div", { class: "space-y-1.5 text-sm" });
	const publishBtn = el(
		"button",
		{ class: `${cx.btn} ${cx.btnPrimary}`, onclick: () => publish() },
		DEPLOYS ? "Publish to the live site" : `Commit to ${ADMIN_BRANCH}`
	) as HTMLButtonElement;
	const cancelBtn = el("button", { class: `${cx.btn} ${cx.btnGhost}`, onclick: () => m.close() }, "Cancel") as HTMLButtonElement;

	const m = modal(
		"Review & publish",
		el(
			"div",
			{ class: "space-y-4" },
			el(
				"ul",
				{ class: "list-disc space-y-1 pl-5 text-sm text-foreground" },
				...summary.map((line) => el("li", {}, line))
			),
			field("Change note (goes into the site's history)", messageInput),
			DEPLOYS
				? el("p", { class: "text-sm text-muted-foreground" }, "Publishing rebuilds the whole site — your change is live in about 2–3 minutes. If anything is wrong with the data, the build stops and the current site stays untouched.")
				: el("p", { class: "text-sm text-muted-foreground" }, `This admin points at the "${ADMIN_BRANCH}" branch, which doesn't auto-deploy. Changes go live when that branch is merged to main.`),
			status
		),
		[cancelBtn, publishBtn]
	);

	const log = (text: string, tone: "info" | "ok" | "bad" = "info") =>
		status.append(
			el(
				"p",
				{ class: tone === "ok" ? "font-semibold text-green-700 dark:text-green-400" : tone === "bad" ? "font-semibold text-red-700 dark:text-red-400" : "text-muted-foreground" },
				text
			)
		);

	async function publish() {
		const gh = app.gh!;
		publishBtn.disabled = true;
		cancelBtn.disabled = true;
		publishBtn.classList.add("opacity-50");
		try {
			const changed = dirtyKeys();
			log("Checking nothing changed on GitHub in the meantime…");
			for (const key of changed) {
				const sha = await gh.fileSha(CONTENT_FILES[key]);
				if (sha !== app.files[key].sha)
					throw new Error(`"${FILE_LABELS[key]}" changed on GitHub since you loaded this page (another device or session?). Reload the admin and redo this edit.`);
			}

			const files = [
				...changed.map((key) => ({
					path: CONTENT_FILES[key],
					base64: encodeText(serialize(app.files[key].current)),
				})),
				...app.pending.map((p) => ({
					path: `src/assets/${p.folder}/${p.name}`,
					base64: p.base64,
				})),
			];
			log(`Saving ${files.length} file${files.length > 1 ? "s" : ""} to GitHub…`);
			const { sha } = await gh.commitFiles(files, messageInput.value.trim() || "admin: content update");
			log(`Saved ✓ (${sha.slice(0, 7)})`, "ok");

			// Refresh local snapshots so the publish bar clears.
			for (const key of changed) {
				app.files[key].snapshot = serialize(app.files[key].current);
				const freshSha = await gh.fileSha(CONTENT_FILES[key]);
				if (freshSha) app.files[key].sha = freshSha;
			}
			for (const p of app.pending)
				app.assets[p.folder].push({
					name: p.name,
					path: `src/assets/${p.folder}/${p.name}`,
					downloadUrl: p.dataUrl,
				});
			app.pending = [];
			refreshChrome();

			if (!DEPLOYS) {
				log(`Committed to ${ADMIN_BRANCH}. It will deploy once merged to main.`, "ok");
				cancelBtn.disabled = false;
				cancelBtn.textContent = "Close";
				return;
			}

			log("Site rebuild starting — usually live in 2–3 minutes…");
			let finished = false;
			for (let i = 0; i < 90 && !finished; i++) {
				await sleep(8000);
				const run = await gh.runForCommit(sha).catch(() => null);
				if (!run) continue;
				if (run.status === "completed") {
					finished = true;
					if (run.conclusion === "success") {
						const url = app.files.site.current.url;
						status.append(
							el(
								"p",
								{ class: "font-semibold text-green-700 dark:text-green-400" },
								"Your changes are LIVE ✓ — ",
								el("a", { href: url, target: "_blank", rel: "noopener", class: "underline" }, url.replace("https://", ""))
							)
						);
					} else {
						status.append(
							el(
								"p",
								{ class: "font-semibold text-red-700 dark:text-red-400" },
								"The build rejected this change, so the live site is UNCHANGED. ",
								el("a", { href: run.html_url, target: "_blank", rel: "noopener", class: "underline" }, "See what failed"),
								" — your edits are still here; fix and publish again, or contact your developer."
							)
						);
					}
				}
			}
			if (!finished) log("Still building — check back on the site in a few minutes.", "info");
		} catch (e) {
			log((e as Error).message, "bad");
			publishBtn.disabled = false;
			publishBtn.classList.remove("opacity-50");
		} finally {
			cancelBtn.disabled = false;
			cancelBtn.textContent = "Close";
		}
	}
}

/* ---------- boot ---------- */

(async () => {
	const token = localStorage.getItem(TOKEN_STORAGE_KEY);
	if (!token) return renderLogin();
	try {
		await start(token);
	} catch (e) {
		localStorage.removeItem(TOKEN_STORAGE_KEY);
		renderLogin(
			e instanceof GitHubError && e.status === 401
				? "Your saved token expired or was revoked — paste a fresh one."
				: (e as Error).message
		);
	}
})();
