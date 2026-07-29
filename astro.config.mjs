import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// Production serves from the custom domain at the site root. Test deploys
// (any non-main branch, see .github/workflows/publish.yml) override these to
// the *.github.io project URL, which needs a base path.
const site = process.env.ASTRO_SITE || "https://bangaloreurbancabs.com";
const base = process.env.ASTRO_BASE || undefined;

// Markdown guides link internally with root-relative hrefs; on base-path
// test deploys those need the prefix (components use withBase(), markdown
// can't). No-op in production where base is empty.
function rehypeBaseLinks() {
	const prefix = (base ?? "").replace(/\/$/, "");
	return (tree) => {
		if (!prefix) return;
		const visit = (node) => {
			if (node.type === "element" && node.properties) {
				for (const key of ["href", "src"]) {
					const value = node.properties[key];
					if (
						typeof value === "string" &&
						value.startsWith("/") &&
						!value.startsWith("//")
					)
						node.properties[key] = prefix + value;
				}
			}
			for (const child of node.children ?? []) visit(child);
		};
		visit(tree);
	};
}

export default defineConfig({
	site,
	base,
	output: "static",
	trailingSlash: "ignore",
	integrations: [
		sitemap({
			filter: (page) =>
				!page.includes("/logo-preview") && !page.includes("/admin"),
			serialize(item) {
				const url = new URL(item.url);
				const p = url.pathname;
				if (p === "/") item.priority = 1.0;
				else if (
					p.includes("-bangalore") ||
					p === "/tour-packages/" ||
					p === "/book/"
				)
					item.priority = 0.9;
				else if (p.startsWith("/bangalore-to-") || p.startsWith("/tour-packages/"))
					item.priority = 0.8;
				else if (p.startsWith("/airport-taxi-") || p.startsWith("/taxi-in-"))
					item.priority = 0.7;
				else if (p.startsWith("/guides/")) item.priority = 0.6;
				else item.priority = 0.4;
				return item;
			},
		}),
		icon(),
	],
	markdown: {
		rehypePlugins: [rehypeBaseLinks],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
