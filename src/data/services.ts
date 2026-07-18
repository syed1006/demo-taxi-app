/**
 * Registry of service + vehicle pages: single source for nav, footer,
 * booking-type cards, and breadcrumbs. `bookingType` matches the ids in
 * booking-types.ts so CTAs can deep-link /book/?type=…
 */

export interface ServicePage {
	id: string;
	name: string;
	path: string;
	description: string;
	icon: string;
	bookingType: string;
	color: string;
	popular: boolean;
}

export const SERVICES: ServicePage[] = [
	{
		id: "airport",
		name: "Airport Taxi",
		path: "/airport-taxi-bangalore/",
		description: "Kempegowda Airport pickup & drop from ₹799",
		icon: "lucide:plane",
		bookingType: "airport",
		color: "from-purple-500 to-violet-600",
		popular: true,
	},
	{
		id: "outstation",
		name: "Outstation Cabs",
		path: "/outstation-cabs-bangalore/",
		description: "One-way & round trips from ₹12/km",
		icon: "lucide:mountain",
		bookingType: "outstation",
		color: "from-orange-500 to-red-600",
		popular: true,
	},
	{
		id: "hourly",
		name: "Hourly Rental",
		path: "/hourly-cab-rental-bangalore/",
		description: "4hr ₹1,200 · 8hr ₹2,200 with driver",
		icon: "lucide:clock",
		bookingType: "hourly",
		color: "from-green-500 to-emerald-600",
		popular: true,
	},
	{
		id: "tour",
		name: "Tour Packages",
		path: "/tour-packages/",
		description: "Fixed-price sightseeing trips, 1–4 days",
		icon: "lucide:camera",
		bookingType: "tour",
		color: "from-pink-500 to-rose-600",
		popular: true,
	},
	{
		id: "corporate",
		name: "Corporate Cabs",
		path: "/corporate-cab-services-bangalore/",
		description: "Employee transport with monthly billing",
		icon: "lucide:briefcase",
		bookingType: "corporate",
		color: "from-gray-600 to-gray-800",
		popular: false,
	},
	{
		id: "driver-only",
		name: "Hire a Driver",
		path: "/hire-driver-bangalore/",
		description: "Verified drivers for your own car",
		icon: "lucide:user",
		bookingType: "driver-only",
		color: "from-amber-500 to-orange-600",
		popular: false,
	},
];

export interface VehiclePageEntry {
	name: string;
	path: string;
	/** CAB_TYPES value for /book/?cab= prefill. */
	cab: string;
}

export const VEHICLE_PAGES: VehiclePageEntry[] = [
	{ name: "Sedan Taxi", path: "/sedan-taxi-bangalore/", cab: "Sedan" },
	{ name: "SUV Taxi", path: "/suv-taxi-bangalore/", cab: "SUV" },
	{
		name: "Innova Crysta Rental",
		path: "/innova-crysta-rental-bangalore/",
		cab: "Premium SUV",
	},
	{
		name: "Tempo Traveller Hire",
		path: "/tempo-traveller-hire-bangalore/",
		cab: "Tempo Traveller",
	},
	{
		name: "Luxury Car Rental",
		path: "/luxury-car-rental-bangalore/",
		cab: "Premium Luxury",
	},
];

export const serviceById = (id: string): ServicePage => {
	const service = SERVICES.find((s) => s.id === id);
	if (!service) throw new Error(`Unknown service id: ${id}`);
	return service;
};
