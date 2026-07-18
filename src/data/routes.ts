import type { Route } from "./route-types";
import { ROUTES_CORE } from "./routes-core";
import { ROUTES_EXTENDED } from "./routes-extended";

export type { Route, TripFare, Sight } from "./route-types";

export const ROUTES: Route[] = [...ROUTES_CORE, ...ROUTES_EXTENDED];

export const routeBySlug = (slug: string): Route => {
	const route = ROUTES.find((r) => r.slug === slug);
	if (!route) throw new Error(`Unknown route slug: ${slug}`);
	return route;
};

export const routePath = (slug: string): string =>
	`/bangalore-to-${slug}-taxi/`;

// Guard: the 11 legacy corridors must keep the fares that were live on the
// single-page site — a data migration must never silently change a price.
const LEGACY_SEDAN_FARES: Record<string, { oneWay?: number; roundTrip: number }> = {
	"nandi-hills": { oneWay: 2100, roundTrip: 3300 },
	lepakshi: { oneWay: 2100, roundTrip: 3300 },
	shivanasamudra: { oneWay: 2799, roundTrip: 4999 },
	mysore: { oneWay: 2799, roundTrip: 5100 },
	"adiyogi-chikkaballapur": { roundTrip: 3300 },
	chikmagalur: { oneWay: 4800, roundTrip: 8800 },
	coorg: { oneWay: 4800, roundTrip: 8800 },
	ooty: { oneWay: 5000, roundTrip: 9000 },
	wayanad: { oneWay: 5000, roundTrip: 9000 },
	hogenakkal: { oneWay: 2999, roundTrip: 5199 },
	chennai: { oneWay: 6200, roundTrip: 10200 },
};

for (const [slug, expected] of Object.entries(LEGACY_SEDAN_FARES)) {
	const actual = routeBySlug(slug).fares.sedan;
	if (
		actual.oneWay !== expected.oneWay ||
		actual.roundTrip !== expected.roundTrip
	) {
		throw new Error(
			`Legacy fare drift on "${slug}": expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
		);
	}
}
