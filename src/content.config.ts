import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Long-form travel guides (/guides/). Editorial content — authored in
// markdown, not admin-editable. Internal links in the body are written
// root-relative; a rehype plugin in astro.config prefixes the base path
// on test deploys.
const guides = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		/** Shown as "Updated …" and used for Article schema dates. */
		updated: z.coerce.date(),
		/** src/assets-relative image ref, e.g. "destinations/mysore-palace.webp". */
		heroImage: z.string().optional(),
		/** Position on the /guides/ index. */
		order: z.number(),
		relatedLinks: z.array(
			z.object({ label: z.string(), href: z.string() })
		),
		faqs: z
			.array(z.object({ question: z.string(), answer: z.string() }))
			.default([]),
	}),
});

export const collections = { guides };
