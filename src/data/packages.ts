// Tour package catalogue — content, itineraries and HARD prices live in
// content/packages.json (editable from /admin/). Inclusions/exclusions are
// stored expanded per package so each one can be tuned independently.
import type { TourPackage } from "./route-types";
import { optionalContentImage } from "./images";
import packagesJson from "./content/packages.json";

type PackageJson = Omit<TourPackage, "image"> & { image?: string };

export const PACKAGES: TourPackage[] = (
	packagesJson as unknown as PackageJson[]
).map((pkg) => ({
	...pkg,
	image: optionalContentImage(pkg.image),
}));
