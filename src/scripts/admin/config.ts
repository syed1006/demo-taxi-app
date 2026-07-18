/**
 * Which repo/branch the admin edits. Baked at build time so preview builds
 * can point at a test branch while production points at main.
 */
export const ADMIN_REPO: string =
	import.meta.env.PUBLIC_ADMIN_REPO || "syed1006/demo-taxi-app";
export const ADMIN_BRANCH: string =
	import.meta.env.PUBLIC_ADMIN_BRANCH || "main";

/** main is the only branch the Pages workflow deploys from. */
export const DEPLOYS = ADMIN_BRANCH === "main";

export const TOKEN_STORAGE_KEY = "buc-admin-token";

export const CONTENT_FILES = {
	site: "src/data/content/site.json",
	rateCard: "src/data/content/rate-card.json",
	routes: "src/data/content/routes.json",
	packages: "src/data/content/packages.json",
	airport: "src/data/content/airport-areas.json",
	vehicles: "src/data/content/vehicles.json",
	faqs: "src/data/content/faqs.json",
	testimonials: "src/data/content/testimonials.json",
} as const;

export type FileKey = keyof typeof CONTENT_FILES;

export const ASSET_FOLDERS = ["destinations", "cars"] as const;
export type AssetFolder = (typeof ASSET_FOLDERS)[number];
