// Tour package catalogue — content, itineraries and HARD prices live in
// content/packages.json (editable from /admin/). Inclusions/exclusions are
// stored expanded per package so each one can be tuned independently.
import type { TourPackage } from "./route-types";
import { contentImage, optionalContentImage } from "./images";
import packagesJson from "./content/packages.json";

type PackageJson = Omit<TourPackage, "image" | "gallery"> & {
	image?: string;
	gallery?: string[];
};

export const PACKAGES: TourPackage[] = (
	packagesJson as unknown as PackageJson[]
).map((pkg) => ({
	...pkg,
	image: optionalContentImage(pkg.image),
	gallery: pkg.gallery?.map(contentImage),
}));

/**
 * Card/hero display title: geographic and route-like, not catalogue-like.
 * "Bangalore to Mysore 1-Day Tour Package" -> "Bangalore to Mysore 1-Day";
 * names without "Bangalore" get the "Bangalore to" prefix.
 */
export function packageTitle(pkg: TourPackage): string {
	const stripped = pkg.name
		.replace(/\s*(Tour\s+)?Package/i, "")
		.replace(/\s{2,}/g, " ")
		.trim();
	return /bangalore/i.test(stripped) ? stripped : `Bangalore to ${stripped}`;
}
