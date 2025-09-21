import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface Coordinates {
	pickup: {
		lat: null | number;
		lng: null | number;
	};
	drop: {
		lat: null | number;
		lng: null | number;
	};
}

interface MapUrls {
	pickup: string | null;
	drop: string | null;
	direction: string | null;
}

export const generateMapUrls = (coordinates: Coordinates): MapUrls => {
	const { pickup, drop } = coordinates;

	// Check if coordinates are valid (not null and are numbers)
	const isValidCoordinate = (
		lat: number | null,
		lng: number | null
	): boolean => {
		return lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng);
	};

	const hasValidPickup = isValidCoordinate(pickup.lat, pickup.lng);
	const hasValidDrop = isValidCoordinate(drop.lat, drop.lng);

	const result: MapUrls = {
		pickup: null,
		drop: null,
		direction: null,
	};

	// Generate pickup URL if pickup coordinates are available
	if (hasValidPickup) {
		result.pickup = `https://www.google.com/maps?q=${pickup.lat},${pickup.lng}`;
	}

	// Generate drop URL if drop coordinates are available
	if (hasValidDrop) {
		result.drop = `https://www.google.com/maps?q=${drop.lat},${drop.lng}`;
	}

	// Generate direction URL if both pickup and drop coordinates are available
	if (hasValidPickup && hasValidDrop) {
		result.direction = `https://www.google.com/maps/dir/?api=1&origin=${pickup.lat},${pickup.lng}&destination=${drop.lat},${drop.lng}`;
	}

	return result;
};
