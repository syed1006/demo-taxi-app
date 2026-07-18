import type { ImageMetadata } from "astro";

/**
 * Content JSON (src/data/content/*.json) refers to images by their path
 * relative to src/assets/ — e.g. "destinations/mysore-palace.webp". The
 * admin page uploads new photos into the same folders, so any file it
 * commits resolves here on the next build.
 */
const DESTINATIONS = import.meta.glob<{ default: ImageMetadata }>(
	"../assets/destinations/*.{webp,png,jpg,jpeg}",
	{ eager: true }
);
const CARS = import.meta.glob<{ default: ImageMetadata }>(
	"../assets/cars/*.{webp,png,jpg,jpeg}",
	{ eager: true }
);

const ALL: Record<string, { default: ImageMetadata }> = {
	...DESTINATIONS,
	...CARS,
};

export function contentImage(file: string): ImageMetadata {
	const mod = ALL[`../assets/${file}`];
	if (!mod)
		throw new Error(
			`Content image not found in src/assets/: "${file}" — upload it or fix the reference in src/data/content/.`
		);
	return mod.default;
}

export const optionalContentImage = (
	file?: string
): ImageMetadata | undefined =>
	file === undefined ? undefined : contentImage(file);
