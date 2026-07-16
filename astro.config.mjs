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
	integrations: [sitemap(), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
});
