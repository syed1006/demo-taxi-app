/**
 * Shared admin state: working copies of the content JSON files, pending
 * photo uploads, asset listings, and the fare-derivation math (mirrors
 * src/lib/fare.ts but reads the LIVE working copy of the rate card so
 * previews react to unpublished rate changes).
 */
import type { GitHub, AssetEntry } from "./github";
import { CONTENT_FILES, type FileKey, type AssetFolder } from "./config";

export interface FileState {
	/** Parsed working copy — editors mutate this directly. */
	current: any;
	/** Serialized snapshot of the last loaded/published state. */
	snapshot: string;
	/** Blob sha at load/publish time — used for stale-edit detection. */
	sha: string;
}

export interface PendingImage {
	folder: AssetFolder;
	name: string;
	base64: string;
	dataUrl: string;
	bytes: number;
}

export const app = {
	gh: null as GitHub | null,
	login: "",
	files: {} as Record<FileKey, FileState>,
	assets: { destinations: [], cars: [] } as Record<AssetFolder, AssetEntry[]>,
	pending: [] as PendingImage[],
	/** Set by main.ts — refreshes tab badges and the publish bar. */
	refreshChrome: () => {},
	/** Set by main.ts — swaps the visible view. */
	show: (_view: HTMLElement) => {},
};

export const serialize = (value: unknown): string =>
	JSON.stringify(value, null, "\t") + "\n";

export const dirtyKeys = (): FileKey[] =>
	(Object.keys(CONTENT_FILES) as FileKey[]).filter(
		(key) =>
			app.files[key] && serialize(app.files[key].current) !== app.files[key].snapshot
	);

export const hasChanges = (): boolean =>
	dirtyKeys().length > 0 || app.pending.length > 0;

/* ---- fare math against the working rate card ---- */

export const CLASS_IDS = ["sedan", "suv", "innova-crysta", "tempo-traveller"] as const;

export const formatINR = (n: number): string => `₹${n.toLocaleString("en-IN")}`;

export const roundFare = (n: number): number => Math.ceil(n / 100) * 100 - 1;

export function deriveFare(sedanFare: number, cls: string, days = 1): number {
	const rateCard = app.files.rateCard.current;
	const rates = rateCard[cls];
	const bataDelta =
		(rates.driverBataPerDay - rateCard.sedan.driverBataPerDay) * days;
	return roundFare(sedanFare * rates.sedanMultiplier + bataDelta);
}

export function estimateSedanRoundTrip(distanceKm: number, days: number): number {
	const sedan = app.files.rateCard.current.sedan;
	const billedKm = Math.max(distanceKm * 2, sedan.minKmPerDay * days);
	return billedKm * sedan.outstationPerKm + sedan.driverBataPerDay * days;
}

export function estimateSedanOneWay(distanceKm: number): number {
	const sedan = app.files.rateCard.current.sedan;
	return distanceKm * sedan.oneWayPerKm + sedan.driverBataPerDay;
}

/* ---- misc helpers ---- */

export const kebab = (s: string): string =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

/** All image refs usable in content, committed + pending, for one folder. */
export function imageOptions(folder: AssetFolder): { value: string; label: string }[] {
	const committed = app.assets[folder].map((a) => ({
		value: `${folder}/${a.name}`,
		label: a.name,
	}));
	const pending = app.pending
		.filter((p) => p.folder === folder)
		.map((p) => ({ value: `${folder}/${p.name}`, label: `${p.name} (new)` }));
	return [...committed, ...pending];
}

/** Thumbnail URL for an image ref ("destinations/x.webp"), if known. */
export function imageUrl(ref: string | undefined): string | null {
	if (!ref) return null;
	const [folder, name] = ref.split("/", 2) as [AssetFolder, string];
	const pending = app.pending.find((p) => p.folder === folder && p.name === name);
	if (pending) return pending.dataUrl;
	const committed = app.assets[folder]?.find((a) => a.name === name);
	return committed?.downloadUrl ?? null;
}
