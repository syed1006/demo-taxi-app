/**
 * Master rate card — every rupee figure on the site derives from here or
 * from a hand-verified figure in routes/packages/airport data. The numbers
 * live in content/rate-card.json (editable from /admin/); keep them in sync
 * with the display strings in content/vehicles.json.
 */
import rateCardJson from "./content/rate-card.json";

export type VehicleClassId = "sedan" | "suv" | "innova-crysta" | "tempo-traveller";

export interface ClassRates {
	label: string;
	capacity: string;
	/** Must match a CAB_TYPES name in vehicles.ts — used for /book/?cab= prefill. */
	bookingFormValue: string;
	/** Round-trip billing basis, ₹/km. */
	outstationPerKm: number;
	/** One-way trips bill higher per km (car returns empty). */
	oneWayPerKm: number;
	driverBataPerDay: number;
	airportBase: number;
	hourly4: number | null;
	hourly8: number;
	minKmPerDay: number;
	/** Ratio used to derive this class's fare from a quoted sedan fare. */
	sedanMultiplier: number;
}

export const RATE_CARD = rateCardJson as Record<VehicleClassId, ClassRates>;

export const VEHICLE_CLASS_IDS = Object.keys(RATE_CARD) as VehicleClassId[];
