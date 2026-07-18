/**
 * Entity editors for the admin app. Every editor mutates the working copies
 * in state.app.files directly; the publish bar picks up changes by
 * comparing against the loaded snapshots.
 */
import {
	el,
	cx,
	field,
	bindText,
	bindNumber,
	bindCheckbox,
	bindSelect,
	bindMultiCheck,
	listEditor,
	stringListEditor,
	modal,
	badge,
	textControl,
} from "./ui";
import {
	app,
	CLASS_IDS,
	deriveFare,
	formatINR,
	imageOptions,
	imageUrl,
	kebab,
} from "./state";
import { processImage } from "./webp";
import type { AssetFolder } from "./config";

const CATEGORY_OPTIONS = [
	"hills",
	"heritage",
	"beach",
	"waterfalls",
	"spiritual",
	"nature",
	"city",
].map((c) => ({ value: c, label: c }));

const CLASS_LABELS: Record<string, string> = {
	sedan: "Sedan",
	suv: "SUV",
	"innova-crysta": "Innova Crysta",
	"tempo-traveller": "Tempo Traveller",
};

/* ---------- small shared pieces ---------- */

const h2 = (text: string) =>
	el("h2", { class: "text-2xl font-bold text-foreground" }, text);
const h3 = (text: string) =>
	el("h3", { class: "mt-2 text-lg font-bold text-foreground" }, text);
const note = (text: string) =>
	el("p", { class: "text-sm text-muted-foreground" }, text);
const section = (...kids: (Node | null)[]) =>
	el("section", { class: cx.card + " space-y-4" }, ...kids.filter(Boolean));
const grid2 = (...kids: (Node | null)[]) =>
	el("div", { class: "grid gap-4 sm:grid-cols-2" }, ...kids.filter(Boolean));

const button = (label: string, kind: string, onclick: () => void) =>
	el("button", { type: "button", class: `${cx.btn} ${kind}`, onclick }, label);

const listHeader = (title: string, addLabel: string | null, onAdd: () => void) =>
	el(
		"div",
		{ class: "flex flex-wrap items-center justify-between gap-3" },
		h2(title),
		addLabel ? button(addLabel, cx.btnPrimary, onAdd) : null
	);

function thumb(ref: string | undefined, size = "h-14 w-20"): HTMLElement {
	const url = imageUrl(ref);
	return url
		? el("img", {
				src: url,
				alt: "",
				loading: "lazy",
				class: `${size} flex-none rounded-md border object-cover`,
			})
		: el("div", {
				class: `${size} flex-none rounded-md border bg-stone-100 dark:bg-stone-800`,
			});
}

function confirmDelete(what: string, onConfirm: () => void) {
	const m = modal(
		`Delete ${what}?`,
		el(
			"p",
			{ class: "text-sm text-muted-foreground" },
			"It disappears from the site on the next publish. References from other pages are cleaned up automatically."
		),
		[
			button("Cancel", cx.btnGhost, () => m.close()),
			button("Delete", cx.btnDanger, () => {
				m.close();
				onConfirm();
			}),
		]
	);
}

/** FAQ rows (question + answer) used by routes, packages, areas and the FAQ page. */
function faqEditor(items: any[], withCategory = false): HTMLElement {
	return listEditor<any>({
		items,
		create: () => (withCategory ? { question: "", answer: "", category: "booking" } : { question: "", answer: "" }),
		addLabel: "Add question",
		render: (item) =>
			el(
				"div",
				{ class: "space-y-2" },
				field("Question", bindText(item, "question")),
				field("Answer", bindText(item, "answer", { textarea: true })),
				withCategory
					? field(
							"Category",
							bindSelect(item, "category", [
								{ value: "booking", label: "Booking & Service" },
								{ value: "pricing", label: "Pricing & Payments" },
								{ value: "airport", label: "Airport Transfers" },
								{ value: "outstation", label: "Outstation Trips" },
							])
						)
					: null
			),
	});
}

/* ---------- photo upload (shared by Photos tab and image pickers) ---------- */

function uniqueName(folder: AssetFolder, base: string, ext: string): string {
	const taken = new Set([
		...app.assets[folder].map((a) => a.name),
		...app.pending.filter((p) => p.folder === folder).map((p) => p.name),
	]);
	let name = `${base}.${ext}`;
	for (let i = 2; taken.has(name); i++) name = `${base}-${i}.${ext}`;
	return name;
}

async function addPhoto(folder: AssetFolder, file: File, baseName?: string): Promise<string> {
	const processed = await processImage(file);
	const base = kebab(baseName || file.name.replace(/\.[^.]+$/, "")) || "photo";
	const name = uniqueName(folder, base, processed.ext);
	app.pending.push({
		folder,
		name,
		base64: processed.base64,
		dataUrl: processed.dataUrl,
		bytes: processed.bytes,
	});
	app.refreshChrome();
	return `${folder}/${name}`;
}

/** Dropdown of existing photos + inline upload; binds obj[key] to an asset ref. */
function imagePicker(
	obj: Record<string, any>,
	key: string,
	folder: AssetFolder
): HTMLElement {
	const preview = thumb(obj[key]);
	const select = el("select", {
		class: cx.input,
		onchange: (e: Event) => {
			const v = (e.target as HTMLSelectElement).value;
			if (v) obj[key] = v;
			else delete obj[key];
			refresh();
		},
	});
	const rebuild = () => {
		select.replaceChildren(
			el("option", { value: "", selected: !obj[key] }, "— no photo —"),
			...imageOptions(folder).map((o) =>
				el("option", { value: o.value, selected: o.value === obj[key] }, o.label)
			)
		);
	};
	const wrap = el("div", { class: "flex items-center gap-3" });
	const refresh = () => {
		rebuild();
		wrap.replaceChildren(thumb(obj[key]), select, uploadBtn);
	};
	const fileInput = el("input", {
		type: "file",
		accept: "image/*",
		class: "hidden",
		onchange: async (e: Event) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;
			try {
				obj[key] = await addPhoto(folder, file);
				refresh();
			} catch (err) {
				alert(`Could not process the image: ${(err as Error).message}`);
			}
			(e.target as HTMLInputElement).value = "";
		},
	});
	const uploadBtn = el(
		"button",
		{
			type: "button",
			class: `${cx.btn} ${cx.btnGhost} flex-none`,
			onclick: () => fileInput.click(),
		},
		"Upload…"
	);
	wrap.append(preview, select, uploadBtn, fileInput);
	rebuild();
	return wrap;
}

/* ---------- Rate card ---------- */

export function viewRateCard(): HTMLElement {
	const rateCard = app.files.rateCard.current;
	return el(
		"div",
		{ class: "space-y-4" },
		section(
			h2("Rate card"),
			note(
				"The master price list. Every fare on the site that isn't hand-quoted derives from these numbers: non-sedan route fares come from the sedan quote × multiplier + driver-bata difference, airport fares beyond 40 km add the one-way ₹/km, and hourly packages show these figures directly."
			)
		),
		el(
			"div",
			{ class: "grid gap-4 md:grid-cols-2 xl:grid-cols-4" },
			...CLASS_IDS.map((id) => {
				const r = rateCard[id];
				const hourly4 = el("input", {
					type: "number",
					class: cx.input,
					value: r.hourly4 ?? "",
					placeholder: "not offered",
					oninput: (e: Event) => {
						const raw = (e.target as HTMLInputElement).value.trim();
						r.hourly4 = raw === "" ? null : Number(raw);
					},
				});
				return section(
					h3(CLASS_LABELS[id]),
					field("Display label", bindText(r, "label")),
					field("Capacity", bindText(r, "capacity")),
					field("Round-trip ₹/km", bindNumber(r, "outstationPerKm")),
					field("One-way ₹/km", bindNumber(r, "oneWayPerKm"), "Higher — the car returns empty."),
					field("Driver bata ₹/day", bindNumber(r, "driverBataPerDay")),
					field("Airport base fare (≤40 km)", bindNumber(r, "airportBase")),
					field("Hourly 4h/40km", hourly4, "Leave blank if not offered."),
					field("Hourly 8h/80km", bindNumber(r, "hourly8")),
					field("Min. billed km/day", bindNumber(r, "minKmPerDay")),
					field(
						"Sedan multiplier",
						bindNumber(r, "sedanMultiplier", { step: 0.05 }),
						id === "sedan" ? "Must stay 1 — all classes derive from sedan." : "Derived fare = sedan fare × this + bata difference."
					),
					field(
						"Booking form value",
						bindText(r, "bookingFormValue"),
						"Must exactly match a vehicle name on the Fleet tab (used for /book/ prefills)."
					)
				);
			})
		)
	);
}

/* ---------- Routes ---------- */

function tripFaresEditor(route: any): HTMLElement {
	const fares = route.fares;
	const hints: (() => void)[] = [];
	const refreshHints = () => hints.forEach((fn) => fn());

	const overrideInput = (cls: string, key: "oneWay" | "roundTrip") =>
		el("input", {
			type: "number",
			class: cx.input,
			placeholder: "auto",
			value: fares[cls]?.[key] ?? "",
			oninput: (e: Event) => {
				const raw = (e.target as HTMLInputElement).value.trim();
				if (raw === "") {
					if (fares[cls]) {
						delete fares[cls][key];
						if (fares[cls].oneWay === undefined && fares[cls].roundTrip === undefined)
							delete fares[cls];
					}
				} else {
					fares[cls] = fares[cls] ?? {};
					fares[cls][key] = Number(raw);
				}
				refreshHints();
			},
		});

	const rows = CLASS_IDS.map((cls) => {
		const isSedan = cls === "sedan";
		const hint = el("p", { class: "text-xs text-muted-foreground" });
		if (!isSedan) {
			const update = () => {
				const sedan = fares.sedan ?? {};
				const days = route.days ?? 1;
				const parts: string[] = [];
				if (fares[cls]?.oneWay === undefined && sedan.oneWay)
					parts.push(`one-way auto ${formatINR(deriveFare(sedan.oneWay, cls, days))}`);
				if (fares[cls]?.roundTrip === undefined && sedan.roundTrip)
					parts.push(`round-trip auto ${formatINR(deriveFare(sedan.roundTrip, cls, days))}`);
				hint.textContent = parts.length ? parts.join(" · ") : "hand-quoted";
			};
			hints.push(update);
		}
		return el(
			"div",
			{ class: cx.row + " space-y-2" },
			el("p", { class: "text-sm font-semibold text-foreground" }, CLASS_LABELS[cls], isSedan ? " — sets all auto fares" : ""),
			el(
				"div",
				{ class: "grid grid-cols-2 gap-3" },
				field(
					"One-way ₹",
					isSedan
						? bindNumber(fares.sedan, "oneWay", { optional: true, placeholder: "not offered", onInput: refreshHints })
						: overrideInput(cls, "oneWay")
				),
				field(
					"Round trip ₹",
					isSedan
						? bindNumber(fares.sedan, "roundTrip", { onInput: refreshHints })
						: overrideInput(cls, "roundTrip")
				)
			),
			isSedan ? null : hint
		);
	});
	refreshHints();
	return el("div", { class: "space-y-2" }, ...rows);
}

function editRoute(route: any, isNew: boolean): HTMLElement {
	const routes = app.files.routes.current as any[];
	const packages = app.files.packages.current as any[];
	let slugTouched = !isNew;

	const slugInput = bindText(route, "slug", {
		readonly: !isNew,
		onInput: () => (slugTouched = true),
	});
	const nameInput = bindText(route, "name", {
		onInput: (v) => {
			if (isNew && !slugTouched) {
				route.slug = kebab(v);
				slugInput.value = route.slug;
			}
		},
	});

	const done = () => {
		if (isNew) {
			if (!route.name.trim() || !route.slug.trim() || !(route.fares.sedan.roundTrip > 0)) {
				alert("A new route needs at least a name, a slug and a sedan round-trip fare.");
				return;
			}
			if (routes.some((r) => r.slug === route.slug)) {
				alert(`Slug "${route.slug}" is already used by another route.`);
				return;
			}
			routes.push(route);
		}
		app.refreshChrome();
		app.show(viewRoutes());
	};

	const doneLabel = isNew ? "Add route" : "Done";
	return el(
		"div",
		{ class: "space-y-4" },
		el(
			"div",
			{ class: "flex flex-wrap items-center justify-between gap-3" },
			h2(isNew ? "New route" : `Edit: ${route.name}`),
			el(
				"div",
				{ class: "flex gap-2" },
				button("Cancel", cx.btnGhost, () => app.show(viewRoutes())),
				button(doneLabel, cx.btnPrimary, done)
			)
		),
		section(
			h3("Basics"),
			grid2(
				field("Name", nameInput),
				field(
					"Slug",
					slugInput,
					isNew
						? "Page URL becomes /bangalore-to-<slug>-taxi/"
						: `URL: /bangalore-to-${route.slug}-taxi/ — changing a live URL needs a developer.`
				),
				field("Category", bindSelect(route, "category", CATEGORY_OPTIONS)),
				field("Distance from Bangalore (km, one-way)", bindNumber(route, "distanceKm")),
				field("Drive time (hours)", bindNumber(route, "durationHrs", { step: 0.5 })),
				field(
					"Typical trip length (days)",
					bindSelect(route, "days", ["1", "2", "3"].map((d) => ({ value: d, label: `${d} day${d === "1" ? "" : "s"}` }))),
					"Drives the minimum billed km."
				)
			),
			field("Photo", imagePicker(route, "image", "destinations"))
		),
		section(
			h3("Fares"),
			note("Quote the sedan; other classes derive automatically from the rate card. Type a number to hand-quote a class instead."),
			tripFaresEditor(route)
		),
		section(
			h3("Page content"),
			field("Card summary (one line)", bindText(route, "summary", { textarea: true, rows: 2 })),
			field("Intro paragraphs", stringListEditor(route.intro, { textarea: true, addLabel: "Add paragraph" }), "2–3 unique paragraphs. Search engines punish copied text — keep it specific to this destination."),
			el("div", {}, el("span", { class: cx.label }, "Places to see"), listEditor<any>({
				items: route.sights,
				create: () => ({ name: "", blurb: "" }),
				addLabel: "Add place",
				render: (s) =>
					el("div", { class: "space-y-2" }, field("Place", bindText(s, "name")), field("One-line description", bindText(s, "blurb"))),
			})),
			field("Travel tips", stringListEditor(route.travelTips, { textarea: true, addLabel: "Add tip" })),
			el("div", {}, el("span", { class: cx.label }, "FAQs for this route"), faqEditor(route.faqs))
		),
		section(
			h3("Connections & flags"),
			field("Related routes (shown as suggestions)", bindMultiCheck(route, "relatedRoutes", routes.filter((r) => r.slug !== route.slug).map((r) => ({ value: r.slug, label: r.name })))),
			field("Tour packages covering this route", bindMultiCheck(route, "packageSlugs", packages.map((p) => ({ value: p.slug, label: p.shortName })))),
			grid2(
				field("Homepage rail", bindSelect(route, "homepageRail", [
					{ value: "weekend", label: "Weekend getaways" },
					{ value: "extended", label: "Extended trips" },
				], { nullLabel: "— not on homepage —" })),
				field("Display rating (3–5)", bindNumber(route, "rating", { step: 0.1 }))
			),
			bindCheckbox(route, "popular", "Show a “Popular” badge")
		),
		el("div", { class: "flex justify-end gap-2" }, button("Cancel", cx.btnGhost, () => app.show(viewRoutes())), button(doneLabel, cx.btnPrimary, done))
	);
}

export function viewRoutes(): HTMLElement {
	const routes = app.files.routes.current as any[];
	const newRoute = () => ({
		slug: "",
		name: "",
		category: "hills",
		distanceKm: 100,
		durationHrs: 2.5,
		days: 1,
		fares: { sedan: { roundTrip: 0 } },
		summary: "",
		intro: [""],
		sights: [],
		travelTips: [],
		faqs: [],
		relatedRoutes: [],
		packageSlugs: [],
		popular: false,
		rating: 4.7,
		homepageRail: null,
	});

	const rows = routes.map((route) =>
		el(
			"div",
			{ class: "flex items-center gap-3 rounded-lg border bg-card p-3" },
			// Names beat thumbnails for width on phones.
			thumb(route.image, "hidden sm:block h-14 w-20"),
			el(
				"div",
				{ class: "min-w-0 flex-1" },
				el("p", { class: "truncate font-semibold text-foreground" }, route.name, " ", route.popular ? badge("popular", "warn") : ""),
				el("p", { class: "truncate text-xs text-muted-foreground" }, `/bangalore-to-${route.slug}-taxi/ · ${route.distanceKm} km · ${route.days}d`)
			),
			el(
				"p",
				{ class: "hidden text-sm text-muted-foreground sm:block" },
				route.fares.sedan.oneWay ? `${formatINR(route.fares.sedan.oneWay)} / ` : "",
				`${formatINR(route.fares.sedan.roundTrip)} RT`
			),
			button("Edit", `${cx.btnGhost} ${cx.btnSmall}`, () => app.show(editRoute(route, false))),
			button("Delete", `${cx.btnDanger} ${cx.btnSmall}`, () =>
				confirmDelete(route.name, () => {
					routes.splice(routes.indexOf(route), 1);
					for (const r of routes) r.relatedRoutes = r.relatedRoutes.filter((s: string) => s !== route.slug);
					for (const p of app.files.packages.current) p.routeSlugs = p.routeSlugs.filter((s: string) => s !== route.slug);
					app.refreshChrome();
					app.show(viewRoutes());
				})
			)
		)
	);

	return el(
		"div",
		{ class: "space-y-4" },
		listHeader(`Routes (${routes.length})`, "+ Add route", () => app.show(editRoute(newRoute(), true))),
		note("Each route is a full landing page at /bangalore-to-<slug>-taxi/ with fares, sights and FAQs."),
		el("div", { class: "space-y-2" }, ...rows)
	);
}

/* ---------- Packages ---------- */

function packagePricesEditor(pkg: any): HTMLElement {
	const priceInput = (cls: string) =>
		el("input", {
			type: "number",
			class: cx.input,
			placeholder: cls === "sedan" ? "required" : "not offered",
			value: pkg.prices.find((p: any) => p.vehicle === cls)?.price ?? "",
			oninput: (e: Event) => {
				const raw = (e.target as HTMLInputElement).value.trim();
				pkg.prices = pkg.prices.filter((p: any) => p.vehicle !== cls);
				if (raw !== "")
					pkg.prices.push({ vehicle: cls, price: Number(raw) });
				pkg.prices.sort(
					(a: any, b: any) => CLASS_IDS.indexOf(a.vehicle) - CLASS_IDS.indexOf(b.vehicle)
				);
			},
		});
	return el(
		"div",
		{ class: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4" },
		...CLASS_IDS.map((cls) => field(`${CLASS_LABELS[cls]} ₹`, priceInput(cls)))
	);
}

function itineraryEditor(pkg: any): HTMLElement {
	return listEditor<any>({
		items: pkg.itinerary,
		create: () => ({ day: pkg.itinerary.length + 1, title: "", stops: [{ place: "" }] }),
		addLabel: "Add day",
		render: (day, i) => {
			day.day = i + 1;
			return el(
				"div",
				{ class: "space-y-2" },
				field(`Day ${i + 1} title`, bindText(day, "title")),
				el("span", { class: cx.label }, "Stops"),
				listEditor<any>({
					items: day.stops,
					create: () => ({ place: "" }),
					addLabel: "Add stop",
					render: (stop) =>
						el(
							"div",
							{ class: "grid gap-2 sm:grid-cols-[8rem_1fr]" },
							field("Time", bindText(stop, "time", { placeholder: "6:30 AM" })),
							field("Place", bindText(stop, "place")),
							el("div", { class: "sm:col-span-2" }, field("Note", bindText(stop, "note", { placeholder: "optional" })))
						),
				})
			);
		},
	});
}

function editPackage(pkg: any, isNew: boolean): HTMLElement {
	const packages = app.files.packages.current as any[];
	const routes = app.files.routes.current as any[];
	let slugTouched = !isNew;

	const slugInput = bindText(pkg, "slug", { readonly: !isNew, onInput: () => (slugTouched = true) });
	const nameInput = bindText(pkg, "name", {
		onInput: (v) => {
			if (isNew && !slugTouched) {
				pkg.slug = kebab(v);
				slugInput.value = pkg.slug;
			}
		},
	});

	const done = () => {
		if (isNew) {
			const sedan = pkg.prices.find((p: any) => p.vehicle === "sedan");
			if (!pkg.name.trim() || !pkg.slug.trim() || !sedan || !(sedan.price > 0)) {
				alert("A new package needs at least a name, a slug and a sedan price.");
				return;
			}
			if (packages.some((p) => p.slug === pkg.slug)) {
				alert(`Slug "${pkg.slug}" is already used by another package.`);
				return;
			}
			packages.push(pkg);
		}
		app.refreshChrome();
		app.show(viewPackages());
	};

	const doneLabel = isNew ? "Add package" : "Done";
	return el(
		"div",
		{ class: "space-y-4" },
		el(
			"div",
			{ class: "flex flex-wrap items-center justify-between gap-3" },
			h2(isNew ? "New tour package" : `Edit: ${pkg.shortName}`),
			el("div", { class: "flex gap-2" }, button("Cancel", cx.btnGhost, () => app.show(viewPackages())), button(doneLabel, cx.btnPrimary, done))
		),
		section(
			h3("Basics"),
			grid2(
				field("Full name (page title)", nameInput),
				field("Short name (cards, menus)", bindText(pkg, "shortName")),
				field("Slug", slugInput, isNew ? "Page URL becomes /tour-packages/<slug>/" : `URL: /tour-packages/${pkg.slug}/ — changing a live URL needs a developer.`),
				field("Days", bindNumber(pkg, "durationDays")),
				field("Nights", bindNumber(pkg, "durationNights")),
				field("Included km", bindNumber(pkg, "includedKm"))
			),
			field("Photo", imagePicker(pkg, "image", "destinations")),
			bindCheckbox(pkg, "popular", "Show a “Popular” badge")
		),
		section(h3("Hard prices"), note("These are the exact prices shown on the package page — no derivation."), packagePricesEditor(pkg)),
		section(
			h3("Extra km rate (₹/km beyond included)"),
			el("div", { class: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4" }, ...CLASS_IDS.map((cls) => field(CLASS_LABELS[cls], bindNumber(pkg.extraKmRate, cls, { optional: true }))))
		),
		section(h3("Overview paragraphs"), stringListEditor(pkg.overview, { textarea: true, addLabel: "Add paragraph" })),
		section(h3("Itinerary"), itineraryEditor(pkg)),
		section(
			h3("Inclusions / exclusions / sights"),
			field("Inclusions", stringListEditor(pkg.inclusions, { addLabel: "Add inclusion" })),
			field("Exclusions", stringListEditor(pkg.exclusions, { addLabel: "Add exclusion" })),
			field("Sights covered", stringListEditor(pkg.sightsCovered, { addLabel: "Add sight" }))
		),
		section(h3("FAQs"), faqEditor(pkg.faqs)),
		section(
			h3("Connections"),
			field("Routes this package covers", bindMultiCheck(pkg, "routeSlugs", routes.map((r) => ({ value: r.slug, label: r.name })))),
			field("Related packages", bindMultiCheck(pkg, "relatedPackages", packages.filter((p) => p.slug !== pkg.slug).map((p) => ({ value: p.slug, label: p.shortName }))))
		),
		el("div", { class: "flex justify-end gap-2" }, button("Cancel", cx.btnGhost, () => app.show(viewPackages())), button(doneLabel, cx.btnPrimary, done))
	);
}

export function viewPackages(): HTMLElement {
	const packages = app.files.packages.current as any[];
	const rateCard = app.files.rateCard.current;
	const first = packages[0];
	const newPackage = () => ({
		slug: "",
		name: "",
		shortName: "",
		durationDays: 1,
		durationNights: 0,
		routeSlugs: [],
		overview: [""],
		itinerary: [{ day: 1, title: "", stops: [{ place: "" }] }],
		prices: [{ vehicle: "sedan", price: 0 }],
		includedKm: 300,
		extraKmRate: Object.fromEntries(CLASS_IDS.map((c) => [c, rateCard[c].outstationPerKm])),
		inclusions: [...(first?.inclusions ?? [])],
		exclusions: [...(first?.exclusions ?? [])],
		sightsCovered: [],
		faqs: [],
		relatedPackages: [],
		popular: false,
	});

	const rows = packages.map((pkg) => {
		const sedan = pkg.prices.find((p: any) => p.vehicle === "sedan");
		return el(
			"div",
			{ class: "flex items-center gap-3 rounded-lg border bg-card p-3" },
			thumb(pkg.image, "hidden sm:block h-14 w-20"),
			el(
				"div",
				{ class: "min-w-0 flex-1" },
				el("p", { class: "truncate font-semibold text-foreground" }, pkg.shortName, " ", pkg.popular ? badge("popular", "warn") : ""),
				el("p", { class: "truncate text-xs text-muted-foreground" }, `/tour-packages/${pkg.slug}/ · ${pkg.durationDays}D/${pkg.durationNights}N · ${pkg.includedKm} km`)
			),
			el("p", { class: "hidden text-sm text-muted-foreground sm:block" }, sedan ? `${formatINR(sedan.price)} sedan` : "—"),
			button("Edit", `${cx.btnGhost} ${cx.btnSmall}`, () => app.show(editPackage(pkg, false))),
			button("Delete", `${cx.btnDanger} ${cx.btnSmall}`, () =>
				confirmDelete(pkg.shortName, () => {
					packages.splice(packages.indexOf(pkg), 1);
					for (const p of packages) p.relatedPackages = p.relatedPackages.filter((s: string) => s !== pkg.slug);
					for (const r of app.files.routes.current) r.packageSlugs = r.packageSlugs.filter((s: string) => s !== pkg.slug);
					app.refreshChrome();
					app.show(viewPackages());
				})
			)
		);
	});

	return el(
		"div",
		{ class: "space-y-4" },
		listHeader(`Tour packages (${packages.length})`, "+ Add package", () => app.show(editPackage(newPackage(), true))),
		note("Each package is a full page at /tour-packages/<slug>/ with a day-by-day itinerary and hard prices."),
		el("div", { class: "space-y-2" }, ...rows)
	);
}

/* ---------- Airport areas ---------- */

function airportFaresEditor(area: any): HTMLElement {
	const hint = (cls: string) => {
		const p = el("p", { class: "text-xs text-muted-foreground" });
		const update = () => {
			p.textContent =
				area.fares[cls] === undefined && area.fares.sedan > 0
					? `auto ${formatINR(deriveFare(area.fares.sedan, cls, 1))}`
					: "";
		};
		update();
		return { p, update };
	};
	const hints: (() => void)[] = [];
	const inputs = CLASS_IDS.map((cls) => {
		const isSedan = cls === "sedan";
		const h = isSedan ? null : hint(cls);
		if (h) hints.push(h.update);
		const input = el("input", {
			type: "number",
			class: cx.input,
			placeholder: isSedan ? "required" : "auto",
			value: area.fares[cls] ?? "",
			oninput: (e: Event) => {
				const raw = (e.target as HTMLInputElement).value.trim();
				if (raw === "") {
					if (!isSedan) delete area.fares[cls];
					else area.fares.sedan = 0;
				} else area.fares[cls] = Number(raw);
				hints.forEach((fn) => fn());
			},
		});
		return el("div", {}, field(`${CLASS_LABELS[cls]} ₹`, input), h?.p ?? null);
	});
	return el("div", { class: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4" }, ...inputs);
}

function editArea(area: any, isNew: boolean): HTMLElement {
	const areas = app.files.airport.current as any[];
	let slugTouched = !isNew;
	const slugInput = bindText(area, "slug", { readonly: !isNew, onInput: () => (slugTouched = true) });
	const nameInput = bindText(area, "name", {
		onInput: (v) => {
			if (isNew && !slugTouched) {
				area.slug = kebab(v);
				slugInput.value = area.slug;
			}
		},
	});
	const done = () => {
		if (isNew) {
			if (!area.name.trim() || !area.slug.trim() || !(area.fares.sedan > 0)) {
				alert("A new area needs a name, a slug and a sedan fare.");
				return;
			}
			if (areas.some((a) => a.slug === area.slug)) {
				alert(`Slug "${area.slug}" is already used.`);
				return;
			}
			areas.push(area);
		}
		app.refreshChrome();
		app.show(viewAirport());
	};
	const doneLabel = isNew ? "Add area" : "Done";
	return el(
		"div",
		{ class: "space-y-4" },
		el(
			"div",
			{ class: "flex flex-wrap items-center justify-between gap-3" },
			h2(isNew ? "New airport area" : `Edit: ${area.name}`),
			el("div", { class: "flex gap-2" }, button("Cancel", cx.btnGhost, () => app.show(viewAirport())), button(doneLabel, cx.btnPrimary, done))
		),
		section(
			h3("Basics"),
			grid2(
				field("Area name", nameInput),
				field("Slug", slugInput, area.dedicatedPage ? `URL: /airport-taxi-${area.slug}/` : "Only used internally unless the area gets its own page."),
				field("Zone", bindSelect(area, "zone", ["north", "south", "east", "west", "central"].map((z) => ({ value: z, label: z })))),
				field("Distance to airport (km)", bindNumber(area, "distanceKm")),
				field("Drive time range", bindText(area, "durationRange", { placeholder: "75–105 min" }))
			),
			bindCheckbox(area, "dedicatedPage", "Give this area its own landing page (/airport-taxi-<slug>/)")
		),
		section(h3("One-way fares (either direction)"), airportFaresEditor(area)),
		section(
			h3("Content"),
			field("Neighbourhoods covered", stringListEditor(area.neighbourhoods, { addLabel: "Add neighbourhood" })),
			field("Local route notes", stringListEditor(area.notes, { textarea: true, addLabel: "Add note" })),
			el("div", {}, el("span", { class: cx.label }, "FAQs"), faqEditor(area.faqs))
		),
		el("div", { class: "flex justify-end gap-2" }, button("Cancel", cx.btnGhost, () => app.show(viewAirport())), button(doneLabel, cx.btnPrimary, done))
	);
}

export function viewAirport(): HTMLElement {
	const areas = app.files.airport.current as any[];
	const newArea = () => ({
		slug: "",
		name: "",
		zone: "central",
		distanceKm: 35,
		durationRange: "",
		fares: { sedan: 0 },
		neighbourhoods: [],
		notes: [],
		faqs: [],
		dedicatedPage: false,
	});
	const rows = areas.map((area) =>
		el(
			"div",
			{ class: "flex items-center gap-3 rounded-lg border bg-card p-3" },
			el(
				"div",
				{ class: "min-w-0 flex-1" },
				el("p", { class: "truncate font-semibold text-foreground" }, area.name, " ", area.dedicatedPage ? badge("own page", "ok") : ""),
				el("p", { class: "truncate text-xs text-muted-foreground" }, `${area.zone} · ${area.distanceKm} km · ${area.durationRange}`)
			),
			el("p", { class: "text-sm text-muted-foreground" }, formatINR(area.fares.sedan)),
			button("Edit", `${cx.btnGhost} ${cx.btnSmall}`, () => app.show(editArea(area, false))),
			button("Delete", `${cx.btnDanger} ${cx.btnSmall}`, () =>
				confirmDelete(area.name, () => {
					areas.splice(areas.indexOf(area), 1);
					app.refreshChrome();
					app.show(viewAirport());
				})
			)
		)
	);
	return el(
		"div",
		{ class: "space-y-4" },
		listHeader(`Airport coverage areas (${areas.length})`, "+ Add area", () => app.show(editArea(newArea(), true))),
		note("Areas with their own page rank for “airport taxi <area>” searches; the rest appear in the coverage table on the airport hub."),
		el("div", { class: "space-y-2" }, ...rows)
	);
}

/* ---------- Fleet ---------- */

export function viewFleet(): HTMLElement {
	const categories = app.files.vehicles.current as Record<string, any>;
	return el(
		"div",
		{ class: "space-y-4" },
		listHeader("Fleet", null, () => {}),
		note("Vehicles shown on the fleet section and vehicle pages. Prices here are display text — keep them in sync with the Rate card tab. Vehicle names are referenced by the rate card's “booking form value”, so rename with care."),
		...Object.entries(categories).map(([catId, cat]) =>
			section(
				h3(cat.title || catId),
				grid2(field("Category title", bindText(cat, "title")), field("Category description", bindText(cat, "description"))),
				...cat.vehicles.map((v: any) =>
					el(
						"div",
						{ class: cx.row + " space-y-3" },
						el("p", { class: "font-semibold text-foreground" }, v.name),
						grid2(
							field("Name", bindText(v, "name")),
							field("Subtitle", bindText(v, "subtitle")),
							el("div", { class: "sm:col-span-2" }, field("Models (description)", bindText(v, "description")))
						),
						el(
							"div",
							{ class: "grid gap-3 sm:grid-cols-2 xl:grid-cols-5" },
							field("Airport", bindText(v.pricing, "airport")),
							field("Hourly 4h", bindText(v.pricing, "hourly4")),
							field("Hourly 8h", bindText(v.pricing, "hourly8")),
							field("Outstation ₹/km", bindText(v.pricing, "outstation")),
							field("Driver bata", bindText(v.pricing, "driverBata"))
						),
						field("Feature bullets", stringListEditor(v.features, { addLabel: "Add feature" })),
						field("Photos (in display order)", bindMultiCheck(v, "images", imageOptions("cars").map((o) => ({ value: o.value, label: o.label })))),
						bindCheckbox(v, "popular", "Show a “Popular” badge")
					)
				)
			)
		)
	);
}

/* ---------- Site / contact ---------- */

export function viewSite(): HTMLElement {
	const site = app.files.site.current;
	const e164 = el("input", { class: cx.input + " opacity-60", readOnly: true, value: site.phoneE164 });
	return el(
		"div",
		{ class: "space-y-4" },
		listHeader("Business & contact", null, () => {}),
		el(
			"div",
			{ class: "rounded-lg border border-orange-300 bg-orange-50 p-4 text-sm text-orange-900 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-200" },
			"The WhatsApp number feeds every booking link on the site. Double-check it before publishing — a wrong digit sends every customer to a stranger."
		),
		section(
			h3("Identity"),
			grid2(
				field("Business name", bindText(site, "name")),
				field("Tagline", bindText(site, "tagline")),
				el("div", { class: "sm:col-span-2" }, field("Homepage title (SEO)", bindText(site, "title"), "Shown in Google and browser tabs. Keep under ~75 characters.")),
				el("div", { class: "sm:col-span-2" }, field("Homepage description (SEO)", bindText(site, "description", { textarea: true }), "Google snippet text. Aim for 70–175 characters."))
			)
		),
		section(
			h3("Contact"),
			grid2(
				field("WhatsApp / phone (country code, digits only)", bindText(site, "whatsapp", {
					placeholder: "917022762929",
					onInput: (v) => {
						site.phoneE164 = `+${v}`;
						e164.value = site.phoneE164;
					},
				}), "Format: 91 + 10-digit number, no + or spaces."),
				field("Display phone", bindText(site, "phoneDisplay"), "How the number looks on the site, e.g. +91 70227 62929."),
				field("tel: link (derived)", e164),
				field("Email", bindText(site, "email")),
				el("div", { class: "sm:col-span-2" }, field("Instagram URL", bindText(site, "instagram")))
			)
		),
		section(
			h3("Address & rating"),
			grid2(
				field("Street / area", bindText(site.address, "street")),
				field("City", bindText(site.address, "locality")),
				field("State", bindText(site.address, "region")),
				field("PIN code", bindText(site.address, "postalCode")),
				field("Displayed rating", bindText(site, "rating"))
			)
		)
	);
}

/* ---------- FAQs & testimonials ---------- */

export function viewFaqs(): HTMLElement {
	const faqs = app.files.faqs.current;
	return el(
		"div",
		{ class: "space-y-4" },
		listHeader(`FAQ page (${faqs.items.length} questions)`, null, () => {}),
		note("These appear on the /faq/ page grouped by category, and feed the FAQ rich results in Google."),
		section(faqEditor(faqs.items, true))
	);
}

export function viewTestimonials(): HTMLElement {
	const testimonials = app.files.testimonials.current as any[];
	return el(
		"div",
		{ class: "space-y-4" },
		listHeader(`Testimonials (${testimonials.length})`, null, () => {}),
		note("Shown on the reviews page. Use real customer quotes — names + area read as more credible."),
		section(
			listEditor<any>({
				items: testimonials,
				create: () => ({ name: "", location: "", rating: 5, text: "" }),
				addLabel: "Add testimonial",
				render: (t) =>
					el(
						"div",
						{ class: "space-y-2" },
						grid2(field("Name", bindText(t, "name")), field("Area", bindText(t, "location")), field("Rating (1–5)", bindNumber(t, "rating"))),
						field("Quote", bindText(t, "text", { textarea: true }))
					),
			})
		)
	);
}

/* ---------- Photos ---------- */

/** Survives the view re-render after a successful upload. */
let lastUploadNote = "";

export function viewPhotos(): HTMLElement {
	const uploadStatus = el(
		"p",
		{ class: "text-sm font-semibold text-green-700 dark:text-green-400" },
		lastUploadNote
	);
	lastUploadNote = "";
	const folderSelect = el(
		"select",
		{ class: cx.input },
		el("option", { value: "destinations" }, "Destinations & tours"),
		el("option", { value: "cars" }, "Cars / fleet")
	) as HTMLSelectElement;
	const nameInput = el("input", { class: cx.input, type: "text", placeholder: "auto from filename" }) as HTMLInputElement;
	const fileInput = el("input", {
		type: "file",
		accept: "image/*",
		class: "block w-full text-sm text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-600",
		onchange: () => {
			const f = fileInput.files?.[0];
			if (f && !nameInput.value) nameInput.value = kebab(f.name.replace(/\.[^.]+$/, ""));
		},
	}) as HTMLInputElement;

	const upload = async () => {
		const file = fileInput.files?.[0];
		if (!file) {
			uploadStatus.textContent = "Choose an image file first.";
			return;
		}
		uploadStatus.textContent = "Optimizing…";
		try {
			const ref = await addPhoto(folderSelect.value as AssetFolder, file, nameInput.value || undefined);
			const added = app.pending[app.pending.length - 1];
			lastUploadNote = `Staged ${ref} (${Math.round(added.bytes / 1024)} KB — resized & WebP-converted in your browser). Publish to put it on the site.`;
			app.show(viewPhotos());
		} catch (err) {
			uploadStatus.textContent = `Could not process the image: ${(err as Error).message}`;
		}
	};

	const pendingSection = app.pending.length
		? section(
				h3("Waiting to publish"),
				el(
					"div",
					{ class: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6" },
					...app.pending.map((p) =>
						el(
							"figure",
							{ class: "space-y-1" },
							el("img", { src: p.dataUrl, alt: "", class: "aspect-[4/3] w-full rounded-md border object-cover" }),
							el("figcaption", { class: "truncate text-xs text-muted-foreground" }, `${p.folder}/${p.name}`),
							button("Remove", `${cx.btnDanger} ${cx.btnSmall} w-full`, () => {
								app.pending.splice(app.pending.indexOf(p), 1);
								app.refreshChrome();
								app.show(viewPhotos());
							})
						)
					)
				)
			)
		: null;

	const gallery = (folder: AssetFolder, title: string) =>
		section(
			h3(`${title} (${app.assets[folder].length})`),
			el(
				"div",
				{ class: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6" },
				...app.assets[folder].map((a) =>
					el(
						"figure",
						{ class: "space-y-1" },
						el("img", { src: a.downloadUrl, alt: "", loading: "lazy", class: "aspect-[4/3] w-full rounded-md border object-cover" }),
						el("figcaption", { class: "truncate text-xs text-muted-foreground" }, a.name)
					)
				)
			)
		);

	return el(
		"div",
		{ class: "space-y-4" },
		listHeader("Photos", null, () => {}),
		note("Photos are resized and converted to WebP right in your browser, then published into the site. Existing photos can't be deleted here (unused files are harmless) — ask your developer to prune."),
		section(
			h3("Upload a photo"),
			grid2(field("Where is it used?", folderSelect), field("File name (kebab-case)", nameInput)),
			fileInput,
			el("div", {}, button("Optimize & stage", cx.btnPrimary, upload)),
			uploadStatus
		),
		pendingSection,
		gallery("destinations", "Destinations & tours"),
		gallery("cars", "Cars / fleet")
	);
}
