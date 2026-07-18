/**
 * Fare math + INR formatting. All derived prices on the site come through
 * these helpers so numbers stay consistent between pages.
 */
import {
	RATE_CARD,
	VEHICLE_CLASS_IDS,
	type VehicleClassId,
} from "../data/rate-card";

export const formatINR = (n: number): string =>
	`₹${n.toLocaleString("en-IN")}`;

/** Round up to a "market" price ending in 99 (2,743 -> 2,799). */
export const roundFare = (n: number): number => Math.ceil(n / 100) * 100 - 1;

export interface TripFare {
	oneWay?: number;
	roundTrip: number;
}

/** Estimate a sedan fare from distance/days when no quoted price exists. */
export function estimateSedanFare(
	distanceKm: number,
	days: number,
	trip: "oneWay" | "roundTrip"
): number {
	const rates = RATE_CARD.sedan;
	if (trip === "oneWay") {
		return roundFare(distanceKm * rates.oneWayPerKm + rates.driverBataPerDay);
	}
	const billedKm = Math.max(distanceKm * 2, rates.minKmPerDay * days);
	return roundFare(
		billedKm * rates.outstationPerKm + rates.driverBataPerDay * days
	);
}

/** Derive a class fare from the (authoritative) sedan fare. */
export function deriveClassFare(
	sedanFare: number,
	cls: VehicleClassId,
	days = 1
): number {
	const rates = RATE_CARD[cls];
	const bataDelta =
		(rates.driverBataPerDay - RATE_CARD.sedan.driverBataPerDay) * days;
	return roundFare(sedanFare * rates.sedanMultiplier + bataDelta);
}

export interface FareRow {
	classId: VehicleClassId;
	label: string;
	capacity: string;
	bookingFormValue: string;
	oneWay?: number;
	roundTrip: number;
	/** true when the number came from a hand-verified quote, not derivation */
	verified: boolean;
}

/**
 * Build a full per-class fare table from partially-specified fares.
 * Sedan is required; missing classes derive from it.
 */
export function fareTableFor(
	fares: Partial<Record<VehicleClassId, TripFare>>,
	days = 1
): FareRow[] {
	const sedan = fares.sedan;
	if (!sedan) throw new Error("fareTableFor: sedan fare is required");
	return VEHICLE_CLASS_IDS.map((classId) => {
		const rates = RATE_CARD[classId];
		const quoted = fares[classId];
		return {
			classId,
			label: rates.label,
			capacity: rates.capacity,
			bookingFormValue: rates.bookingFormValue,
			oneWay: quoted?.oneWay ?? (sedan.oneWay !== undefined
				? deriveClassFare(sedan.oneWay, classId, days)
				: undefined),
			roundTrip:
				quoted?.roundTrip ?? deriveClassFare(sedan.roundTrip, classId, days),
			verified: quoted !== undefined,
		};
	});
}

/** Airport transfer fare per class for a given distance from the airport. */
export function airportFare(classId: VehicleClassId, distanceKm: number): number {
	const rates = RATE_CARD[classId];
	const includedKm = 40;
	if (distanceKm <= includedKm) return rates.airportBase;
	return roundFare(
		rates.airportBase + (distanceKm - includedKm) * rates.oneWayPerKm
	);
}
