import type { Route } from "./route-types";
import { optionalContentImage } from "./images";
import routesJson from "./content/routes.json";

export type { Route, TripFare, Sight } from "./route-types";

/**
 * Route content lives in content/routes.json (editable from /admin/).
 * Images are stored there as src/assets-relative paths and resolved to
 * optimized ImageMetadata here. Data sanity (fare bands, slug shape,
 * cross-references) is enforced by scripts/validate-data.mjs before every
 * build, so a bad admin edit fails CI and the old deploy stays live.
 */
type RouteJson = Omit<Route, "image"> & { image?: string };

export const ROUTES: Route[] = (routesJson as unknown as RouteJson[]).map(
	(route) => ({
		...route,
		image: optionalContentImage(route.image),
	})
);

export const routeBySlug = (slug: string): Route => {
	const route = ROUTES.find((r) => r.slug === slug);
	if (!route) throw new Error(`Unknown route slug: ${slug}`);
	return route;
};

export const routePath = (slug: string): string =>
	`/bangalore-to-${slug}-taxi/`;
