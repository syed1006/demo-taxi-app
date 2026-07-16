import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	site: "https://bangaloreurbancabs.com",
	output: "static",
	trailingSlash: "ignore",
	integrations: [sitemap(), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
});
