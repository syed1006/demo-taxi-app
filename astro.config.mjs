import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// Production serves from the custom domain at the site root. Test deploys
// (any non-main branch, see .github/workflows/publish.yml) override these to
// the *.github.io project URL, which needs a base path.
const site = process.env.ASTRO_SITE || "https://bangaloreurbancabs.com";
const base = process.env.ASTRO_BASE || undefined;

export default defineConfig({
	site,
	base,
	output: "static",
	trailingSlash: "ignore",
	integrations: [
		sitemap({
			filter: (page) => !page.includes("/logo-preview"),
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
				else if (p.startsWith("/bangalore-to-")) item.priority = 0.8;
				else if (p.startsWith("/tour-packages/") || p.startsWith("/airport-taxi-"))
					item.priority = 0.7;
				else item.priority = 0.4;
				return item;
			},
		}),
		icon(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
