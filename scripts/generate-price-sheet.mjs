/**
 * Generate PRICING-REVIEW.md from the built site — one row per published
 * price for the owner to verify before production. Prices marked * are
 * derived from the sedan rate and shown with an "indicative" footnote on
 * the site until confirmed.
 * Run after a build: node scripts/generate-price-sheet.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const dist = "dist";
const out = [];

out.push("# Pricing Review Sheet");
out.push("");
out.push(
	"Every rupee figure published on the site. Verify each row; prices marked `*` are derived from the sedan rate and displayed with an 'indicative — confirmed on WhatsApp' footnote until you confirm them (then we freeze them in the data files and the asterisk disappears)."
);
out.push("");

function extractTable(html) {
	const rows = [];
	for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
		const cells = [...rowMatch[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(
			(m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
		);
		if (cells.length) rows.push(cells);
	}
	return rows;
}

function section(title, dirPrefix, filterFn = () => true) {
	out.push(`## ${title}`);
	out.push("");
	const dirs = readdirSync(dist, { withFileTypes: true })
		.filter((d) => d.isDirectory() && d.name.startsWith(dirPrefix) && filterFn(d.name))
		.map((d) => d.name)
		.sort();
	for (const dir of dirs) {
		const file = path.join(dist, dir, "index.html");
		let html;
		try {
			html = readFileSync(file, "utf8");
		} catch {
			continue;
		}
		const rows = extractTable(html);
		if (rows.length === 0) continue;
		out.push(`### /${dir}/`);
		out.push("");
		for (const row of rows) {
			out.push(`| ${row.join(" | ")} |`);
			if (row === rows[0]) out.push(`|${" --- |".repeat(row.length)}`);
		}
		out.push("");
	}
}

section("Route fares (/bangalore-to-…-taxi/)", "bangalore-to-");
section("Airport area fares (/airport-taxi-…/)", "airport-taxi-");

// Packages live under tour-packages/<slug>/
out.push("## Tour package prices (/tour-packages/…/)");
out.push("");
const pkgRoot = path.join(dist, "tour-packages");
for (const dir of readdirSync(pkgRoot, { withFileTypes: true })
	.filter((d) => d.isDirectory())
	.map((d) => d.name)
	.sort()) {
	const html = readFileSync(path.join(pkgRoot, dir, "index.html"), "utf8");
	const rows = extractTable(html);
	if (!rows.length) continue;
	out.push(`### /tour-packages/${dir}/`);
	out.push("");
	for (const row of rows) {
		out.push(`| ${row.join(" | ")} |`);
		if (row === rows[0]) out.push(`|${" --- |".repeat(row.length)}`);
	}
	out.push("");
}

out.push("## Also verify");
out.push("");
out.push("- Acting-driver charges on /hire-driver-bangalore/ (₹599 / ₹999 / ₹1,199 / +₹300 night)");
out.push("- Hourly packages on /hourly-cab-rental-bangalore/ (from rate-card.ts)");
out.push("- 'Adiyogi Chikkaballapur' naming + ₹3,300 RT price (inherited from the old site's 'Isha Foundation' entry)");
out.push("- Inter-state permit ranges in package exclusions (TN ₹500–1,500 / Kerala ₹500–3,000 / AP ₹500–2,500 / Goa ₹2,500–3,500)");
out.push("");
out.push("Once a table is verified, tell Claude to freeze it: derived fares get written into the data file as quoted fares and the asterisk footnote disappears for that page.");

writeFileSync("PRICING-REVIEW.md", out.join("\n"));
console.log("PRICING-REVIEW.md written");
