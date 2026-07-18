/**
 * Pre-build content validation for src/data/content/*.json — the files the
 * /admin/ page edits. Catches structural mistakes and order-of-magnitude
 * price typos BEFORE astro build, so a bad admin commit fails CI and the
 * previous deploy stays live. Deliberate price changes pass: fare bands are
 * intentionally loose (0.35×–3× of the rate-card estimate).
 * Run: node scripts/validate-data.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const CONTENT = "src/data/content";
const errors = [];
const err = (msg) => errors.push(msg);

const load = (name) => {
	try {
		return JSON.parse(readFileSync(path.join(CONTENT, name), "utf8"));
	} catch (e) {
		err(`${name}: unreadable or invalid JSON — ${e.message}`);
		return null;
	}
};

const rateCard = load("rate-card.json");
const routes = load("routes.json");
const packages = load("packages.json");
const airportAreas = load("airport-areas.json");
const site = load("site.json");
const vehicles = load("vehicles.json");
const faqs = load("faqs.json");
const testimonials = load("testimonials.json");

if (errors.length) fail();

const assets = new Set();
for (const dir of ["destinations", "cars"]) {
	try {
		for (const f of readdirSync(path.join("src/assets", dir)))
			assets.add(`${dir}/${f}`);
	} catch {
		err(`missing asset directory src/assets/${dir}`);
	}
}

const CLASS_IDS = ["sedan", "suv", "innova-crysta", "tempo-traveller"];
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CATEGORIES = ["hills", "heritage", "beach", "waterfalls", "spiritual", "nature", "city"];

const isPosNum = (n) => typeof n === "number" && Number.isFinite(n) && n > 0;
const nonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
const checkFaqList = (list, where) => {
	if (!Array.isArray(list)) return err(`${where}: faqs must be an array`);
	list.forEach((f, i) => {
		if (!nonEmpty(f.question) || !nonEmpty(f.answer))
			err(`${where}: faq #${i + 1} needs a question and an answer`);
	});
};
const checkImage = (file, where) => {
	if (file === undefined) return;
	if (!assets.has(file))
		err(`${where}: image "${file}" not found in src/assets/`);
};

// ---- rate card ---------------------------------------------------------
const vehicleNames = new Set(
	Object.values(vehicles).flatMap((c) => (c.vehicles ?? []).map((v) => v.name))
);
for (const id of CLASS_IDS) {
	const r = rateCard[id];
	if (!r) { err(`rate-card: missing class "${id}"`); continue; }
	for (const k of ["outstationPerKm", "oneWayPerKm", "driverBataPerDay", "airportBase", "hourly8", "minKmPerDay", "sedanMultiplier"])
		if (!isPosNum(r[k])) err(`rate-card ${id}: ${k} must be a positive number`);
	if (r.hourly4 !== null && !isPosNum(r.hourly4))
		err(`rate-card ${id}: hourly4 must be a positive number or null`);
	if (!nonEmpty(r.label) || !nonEmpty(r.capacity))
		err(`rate-card ${id}: label and capacity are required`);
	if (!vehicleNames.has(r.bookingFormValue))
		err(`rate-card ${id}: bookingFormValue "${r.bookingFormValue}" doesn't match any vehicle name in vehicles.json (breaks /book/?cab= prefill)`);
	if (isPosNum(r.oneWayPerKm) && isPosNum(r.outstationPerKm) && r.oneWayPerKm <= r.outstationPerKm)
		err(`rate-card ${id}: oneWayPerKm should exceed outstationPerKm (one-way covers the empty return)`);
}
if (rateCard.sedan?.sedanMultiplier !== 1)
	err(`rate-card sedan: sedanMultiplier must be 1 (all classes derive from sedan)`);

const sedanRates = rateCard.sedan ?? { outstationPerKm: 12, oneWayPerKm: 18, driverBataPerDay: 400, minKmPerDay: 300 };
const estRoundTrip = (distanceKm, days) =>
	Math.max(distanceKm * 2, sedanRates.minKmPerDay * days) * sedanRates.outstationPerKm +
	sedanRates.driverBataPerDay * days;
const estOneWay = (distanceKm) =>
	distanceKm * sedanRates.oneWayPerKm + sedanRates.driverBataPerDay;
const bandCheck = (actual, estimate, where) => {
	const ratio = actual / estimate;
	if (ratio < 0.35 || ratio > 3)
		err(`${where}: ₹${actual} is ${ratio.toFixed(1)}× the rate-card estimate (₹${Math.round(estimate)}) — looks like a typo (allowed band 0.35×–3×)`);
};

// ---- routes ------------------------------------------------------------
const routeSlugs = new Set();
const packageSlugs = new Set(packages.map((p) => p.slug));
for (const r of routes) {
	const where = `routes/${r.slug ?? "?"}`;
	if (!KEBAB.test(r.slug ?? "")) err(`${where}: slug must be kebab-case`);
	if (routeSlugs.has(r.slug)) err(`${where}: duplicate slug`);
	routeSlugs.add(r.slug);
	if (!nonEmpty(r.name)) err(`${where}: name is required`);
	if (!CATEGORIES.includes(r.category)) err(`${where}: category must be one of ${CATEGORIES.join(", ")}`);
	if (!isPosNum(r.distanceKm) || r.distanceKm < 10 || r.distanceKm > 1200)
		err(`${where}: distanceKm must be 10–1200`);
	if (!isPosNum(r.durationHrs) || r.durationHrs > 30) err(`${where}: durationHrs must be a positive number ≤ 30`);
	if (![1, 2, 3].includes(r.days)) err(`${where}: days must be 1, 2 or 3`);
	if (!nonEmpty(r.summary)) err(`${where}: summary is required`);
	if (!Array.isArray(r.intro) || r.intro.length === 0 || !r.intro.every(nonEmpty))
		err(`${where}: intro needs at least one non-empty paragraph`);
	checkFaqList(r.faqs, where);
	checkImage(r.image, where);
	if (typeof r.rating !== "number" || r.rating < 3 || r.rating > 5)
		err(`${where}: rating must be between 3 and 5`);
	if (![null, "weekend", "extended"].includes(r.homepageRail ?? null))
		err(`${where}: homepageRail must be "weekend", "extended" or null`);

	const sedan = r.fares?.sedan;
	if (!sedan || !isPosNum(sedan.roundTrip)) {
		err(`${where}: fares.sedan.roundTrip is required (other classes derive from it)`);
	} else {
		if (isPosNum(r.distanceKm) && [1, 2, 3].includes(r.days))
			bandCheck(sedan.roundTrip, estRoundTrip(r.distanceKm, r.days), `${where} round-trip`);
		if (sedan.oneWay !== undefined) {
			if (!isPosNum(sedan.oneWay)) err(`${where}: fares.sedan.oneWay must be a positive number`);
			else {
				if (sedan.oneWay >= sedan.roundTrip)
					err(`${where}: one-way fare (₹${sedan.oneWay}) must be below round-trip (₹${sedan.roundTrip})`);
				if (isPosNum(r.distanceKm)) bandCheck(sedan.oneWay, estOneWay(r.distanceKm), `${where} one-way`);
			}
		}
		for (const [cls, fare] of Object.entries(r.fares)) {
			if (!CLASS_IDS.includes(cls)) err(`${where}: unknown vehicle class "${cls}" in fares`);
			else if (cls !== "sedan" && !isPosNum(fare.roundTrip))
				err(`${where}: fares.${cls}.roundTrip must be a positive number`);
		}
	}
}
for (const r of routes) {
	const where = `routes/${r.slug}`;
	for (const rel of r.relatedRoutes ?? [])
		if (!routeSlugs.has(rel)) err(`${where}: relatedRoutes references unknown route "${rel}"`);
	for (const p of r.packageSlugs ?? [])
		if (!packageSlugs.has(p)) err(`${where}: packageSlugs references unknown package "${p}"`);
}

// ---- packages ----------------------------------------------------------
const seenPkg = new Set();
for (const p of packages) {
	const where = `packages/${p.slug ?? "?"}`;
	if (!KEBAB.test(p.slug ?? "")) err(`${where}: slug must be kebab-case`);
	if (seenPkg.has(p.slug)) err(`${where}: duplicate slug`);
	seenPkg.add(p.slug);
	if (!nonEmpty(p.name) || !nonEmpty(p.shortName)) err(`${where}: name and shortName are required`);
	if (!isPosNum(p.durationDays)) err(`${where}: durationDays must be a positive number`);
	if (typeof p.durationNights !== "number" || p.durationNights < 0)
		err(`${where}: durationNights must be 0 or more`);
	if (!isPosNum(p.includedKm)) err(`${where}: includedKm must be a positive number`);
	if (!Array.isArray(p.overview) || !p.overview.length) err(`${where}: overview needs at least one paragraph`);
	if (!Array.isArray(p.itinerary) || !p.itinerary.length) err(`${where}: itinerary needs at least one day`);
	else p.itinerary.forEach((day, i) => {
		if (!nonEmpty(day.title)) err(`${where}: itinerary day ${i + 1} needs a title`);
		if (!Array.isArray(day.stops) || !day.stops.length) err(`${where}: itinerary day ${i + 1} needs stops`);
		else day.stops.forEach((s, j) => { if (!nonEmpty(s.place)) err(`${where}: day ${i + 1} stop ${j + 1} needs a place`); });
	});
	if (!Array.isArray(p.prices) || !p.prices.length) err(`${where}: prices are required`);
	else {
		const sedanPrice = p.prices.find((x) => x.vehicle === "sedan");
		if (!sedanPrice) err(`${where}: a sedan price is required`);
		for (const { vehicle, price } of p.prices) {
			if (!CLASS_IDS.includes(vehicle)) err(`${where}: unknown vehicle "${vehicle}" in prices`);
			if (!isPosNum(price)) err(`${where}: price for ${vehicle} must be a positive number`);
		}
		if (sedanPrice && isPosNum(sedanPrice.price) && isPosNum(p.includedKm) && isPosNum(p.durationDays))
			bandCheck(
				sedanPrice.price,
				p.includedKm * sedanRates.outstationPerKm + sedanRates.driverBataPerDay * p.durationDays,
				`${where} sedan price`
			);
	}
	for (const k of ["inclusions", "exclusions", "sightsCovered"])
		if (!Array.isArray(p[k]) || !p[k].every(nonEmpty)) err(`${where}: ${k} must be a list of non-empty lines`);
	checkFaqList(p.faqs, where);
	checkImage(p.image, where);
	for (const s of p.routeSlugs ?? [])
		if (!routeSlugs.has(s)) err(`${where}: routeSlugs references unknown route "${s}"`);
	for (const s of p.relatedPackages ?? [])
		if (!packageSlugs.has(s)) err(`${where}: relatedPackages references unknown package "${s}"`);
}

// ---- airport areas -----------------------------------------------------
const seenArea = new Set();
for (const a of airportAreas) {
	const where = `airport-areas/${a.slug ?? "?"}`;
	if (!KEBAB.test(a.slug ?? "")) err(`${where}: slug must be kebab-case`);
	if (seenArea.has(a.slug)) err(`${where}: duplicate slug`);
	seenArea.add(a.slug);
	if (!nonEmpty(a.name)) err(`${where}: name is required`);
	if (!["north", "south", "east", "west", "central"].includes(a.zone)) err(`${where}: bad zone`);
	if (!isPosNum(a.distanceKm) || a.distanceKm > 120) err(`${where}: distanceKm must be a positive number ≤ 120`);
	if (!nonEmpty(a.durationRange)) err(`${where}: durationRange is required`);
	if (!isPosNum(a.fares?.sedan) || a.fares.sedan < 300 || a.fares.sedan > 6000)
		err(`${where}: sedan fare must be ₹300–6000`);
	if (typeof a.dedicatedPage !== "boolean") err(`${where}: dedicatedPage must be true/false`);
	if (!Array.isArray(a.neighbourhoods) || !a.neighbourhoods.length) err(`${where}: neighbourhoods required`);
	checkFaqList(a.faqs, where);
}

// ---- site --------------------------------------------------------------
if (!/^91[0-9]{10}$/.test(site.whatsapp ?? ""))
	err(`site: whatsapp must be 91 + 10 digits (got "${site.whatsapp}") — broken wa.me links otherwise`);
if (site.phoneE164 !== `+${site.whatsapp}`)
	err(`site: phoneE164 (${site.phoneE164}) must equal "+" + whatsapp (${site.whatsapp})`);
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(site.email ?? "")) err(`site: email looks invalid`);
if (!/^https:\/\//.test(site.url ?? "")) err(`site: url must be https`);
for (const k of ["name", "title", "description", "phoneDisplay"])
	if (!nonEmpty(site[k])) err(`site: ${k} is required`);

// ---- vehicles ----------------------------------------------------------
for (const [catId, cat] of Object.entries(vehicles)) {
	if (!nonEmpty(cat.title)) err(`vehicles/${catId}: title required`);
	for (const v of cat.vehicles ?? []) {
		const where = `vehicles/${catId}/${v.id ?? "?"}`;
		if (!nonEmpty(v.name) || !nonEmpty(v.subtitle)) err(`${where}: name and subtitle required`);
		for (const k of ["airport", "hourly4", "hourly8", "outstation", "driverBata"])
			if (!nonEmpty(v.pricing?.[k])) err(`${where}: pricing.${k} required`);
		if (!Array.isArray(v.images) || !v.images.length) err(`${where}: at least one image required`);
		else v.images.forEach((img) => checkImage(img, where));
	}
}

// ---- faqs & testimonials ----------------------------------------------
const faqCatIds = new Set((faqs.categories ?? []).map((c) => c.id));
checkFaqList(faqs.items, "faqs");
for (const f of faqs.items ?? [])
	if (f.category && !faqCatIds.has(f.category)) err(`faqs: unknown category "${f.category}"`);
for (const [i, t] of (testimonials ?? []).entries()) {
	if (!nonEmpty(t.name) || !nonEmpty(t.text)) err(`testimonials #${i + 1}: name and text required`);
	if (typeof t.rating !== "number" || t.rating < 1 || t.rating > 5) err(`testimonials #${i + 1}: rating 1–5`);
}

function fail() {
	console.error(`✗ ${errors.length} data error(s):`);
	for (const e of errors) console.error("  " + e);
	process.exit(1);
}
if (errors.length) fail();
console.log(`✓ Content data valid: ${routes.length} routes, ${packages.length} packages, ${airportAreas.length} airport areas.`);
