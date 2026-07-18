import type { ImageMetadata } from "astro";
import { contentImage } from "./images";
import vehiclesJson from "./content/vehicles.json";

export interface Vehicle {
	id: string;
	name: string;
	subtitle: string;
	description: string;
	pricing: {
		airport: string;
		hourly4: string;
		hourly8: string;
		outstation: string;
		driverBata: string;
	};
	features: string[];
	icon: string;
	images: ImageMetadata[];
	popular: boolean;
	color: string;
}

export interface VehicleCategory {
	title: string;
	description: string;
	icon: string;
	gradient: string;
	vehicles: Vehicle[];
}

type VehicleJson = Omit<Vehicle, "images"> & { images: string[] };
type VehicleCategoryJson = Omit<VehicleCategory, "vehicles"> & {
	vehicles: VehicleJson[];
};

// Fleet content lives in content/vehicles.json (editable from /admin/);
// image paths there are src/assets-relative (cars/*.webp).
export const VEHICLE_CATEGORIES: Record<string, VehicleCategory> =
	Object.fromEntries(
		Object.entries(
			vehiclesJson as unknown as Record<string, VehicleCategoryJson>
		).map(([key, category]) => [
			key,
			{
				...category,
				vehicles: category.vehicles.map((vehicle) => ({
					...vehicle,
					images: vehicle.images.map(contentImage),
				})),
			},
		])
	);

/** Flat list of vehicle names for the booking form's cab-type select. */
export const CAB_TYPES = Object.values(VEHICLE_CATEGORIES).flatMap((category) =>
	category.vehicles.map((vehicle) => ({
		name: vehicle.name,
		subtitle: vehicle.subtitle,
	}))
);
