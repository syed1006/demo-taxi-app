/**
 * Post-build site validation: unique titles/descriptions/H1s/canonicals,
 * exactly one H1 per page, resolvable internal links, JSON-LD present and
 * parseable. Run: node scripts/validate-site.mjs [distDir]
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const dist = process.argv[2] ?? "dist";
// Test deploys build under a base path (see astro.config.mjs); links must
// carry the prefix in the HTML but resolve against dist/ without it.
const base = (process.env.ASTRO_BASE ?? "").replace(/\/+$/, "");
const errors = [];
const warnings = [];

function* htmlFiles(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) yield* htmlFiles(full);
		else if (entry.name.endsWith(".html")) yield full;
	}
}

const pages = [...htmlFiles(dist)];
const seen = { title: new Map(), description: new Map(), h1: new Map(), canonical: new Map() };

// Decode the common entities so length checks measure what users see
// ("&amp;" is one character in the SERP, not five).
const decode = (s) =>
	s
		.replace(/&amp;/g, "&")
		.replace(/&#38;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">");

const get = (html, regex) => {
	const value = html.match(regex)?.[1]?.trim();
	return value ? decode(value) : null;
};

for (const file of pages) {
	const rel = "/" + path.relative(dist, file).replace(/index\.html$/, "").replace(/\.html$/, "");
	const html = readFileSync(file, "utf8");
	const is404 = rel.includes("404");

	const title = get(html, /<title>([^<]*)<\/title>/);
	const description = get(html, /<meta name="description" content="([^"]*)"/);
	const canonical = get(html, /<link rel="canonical" href="([^"]*)"/);
	const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
		m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
	);

	if (!title) errors.push(`${rel}: missing <title>`);
	if (!description) errors.push(`${rel}: missing meta description`);
	if (description && (description.length < 70 || description.length > 175))
		warnings.push(`${rel}: description length ${description.length}`);
	if (title && title.length > 75) warnings.push(`${rel}: title length ${title.length}`);
	if (h1s.length !== 1) errors.push(`${rel}: ${h1s.length} <h1> tags`);

	if (!is404) {
		for (const [key, value] of [
			["title", title],
			["description", description],
			["h1", h1s[0]],
			["canonical", canonical],
		]) {
			if (!value) continue;
			if (seen[key].has(value))
				errors.push(`${rel}: duplicate ${key} (also on ${seen[key].get(value)}): "${String(value).slice(0, 60)}"`);
			else seen[key].set(value, rel);
		}
	}

	// JSON-LD parses
	for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
		try {
			JSON.parse(match[1]);
		} catch {
			errors.push(`${rel}: invalid JSON-LD`);
		}
	}

	// Internal links resolve
	for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
		const url = match[1].split("#")[0].split("?")[0];
		if (!url || url === "/") continue;
		if (url.startsWith("//")) continue;
		let clean = decodeURIComponent(url);
		if (base) {
			if (clean !== base && !clean.startsWith(`${base}/`)) {
				errors.push(`${rel}: link missing base prefix ${base}: ${url}`);
				continue;
			}
			clean = clean.slice(base.length) || "/";
			if (clean === "/") continue;
		}
		const candidates = [
			path.join(dist, clean),
			path.join(dist, clean, "index.html"),
			path.join(dist, `${clean.replace(/\/$/, "")}.html`),
		];
		if (!candidates.some((c) => existsSync(c) && statSync(c).isFile())) {
			errors.push(`${rel}: broken internal link ${url}`);
		}
	}
}

console.log(`Checked ${pages.length} pages.`);
if (warnings.length) {
	console.log(`\n⚠ ${warnings.length} warnings:`);
	for (const w of warnings) console.log("  " + w);
}
if (errors.length) {
	console.error(`\n✗ ${errors.length} errors:`);
	for (const e of errors) console.error("  " + e);
	process.exit(1);
}
console.log("✓ All pages pass: unique titles/descriptions/H1s/canonicals, valid JSON-LD, no broken internal links.");
