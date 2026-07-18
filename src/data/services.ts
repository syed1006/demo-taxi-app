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
	/** SERP/CTA price hook, e.g. "from ₹799". */
	priceHook: string;
	/** Pre-filled WhatsApp message for direct booking. */
	waMessage: string;
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
		description: "Kempegowda Airport pickup & drop, flight tracking, 24/7",
		priceHook: "from ₹799",
		waMessage:
			"Hi! I want to book an airport taxi in Bangalore. Please share the details.",
		icon: "lucide:plane",
		bookingType: "airport",
		color: "from-red-600 to-red-800",
		popular: true,
	},
	{
		id: "outstation",
		name: "Outstation Cabs",
		path: "/outstation-cabs-bangalore/",
		description: "One-way drops & round trips across South India",
		priceHook: "from ₹12/km",
		waMessage:
			"Hi! I want to book an outstation cab from Bangalore. Please share the fare.",
		icon: "lucide:mountain",
		bookingType: "outstation",
		color: "from-orange-500 to-red-600",
		popular: true,
	},
	{
		id: "hourly",
		name: "Hourly Rental",
		path: "/hourly-cab-rental-bangalore/",
		description: "Car + driver at your disposal — unlimited stops in the city",
		priceHook: "4hr ₹1,200 · 8hr ₹2,200",
		waMessage:
			"Hi! I want to book an hourly cab rental in Bangalore. Please share availability.",
		icon: "lucide:clock",
		bookingType: "hourly",
		color: "from-orange-400 to-orange-600",
		popular: true,
	},
	{
		id: "tour",
		name: "Tour Packages",
		path: "/tour-packages/",
		description: "Fixed-price sightseeing trips — Mysore, Coorg, Ooty & more",
		priceHook: "from ₹3,399",
		waMessage:
			"Hi! I want to book a tour package from Bangalore. Please share the options.",
		icon: "lucide:camera",
		bookingType: "tour",
		color: "from-pink-600 to-red-800",
		popular: true,
	},
	{
		id: "corporate",
		name: "Corporate Cabs",
		path: "/corporate-cab-services-bangalore/",
		description: "Employee transport & airport desk with monthly billing",
		priceHook: "monthly billing",
		waMessage:
			"Hi! I'd like to discuss corporate cab services for my company.",
		icon: "lucide:briefcase",
		bookingType: "corporate",
		color: "from-stone-600 to-stone-800",
		popular: false,
	},
	{
		id: "driver-only",
		name: "Hire a Driver",
		path: "/hire-driver-bangalore/",
		description: "Verified acting drivers for your own car, 24/7",
		priceHook: "from ₹599",
		waMessage:
			"Hi! I want to hire a driver for my own car in Bangalore. Please share the details.",
		icon: "lucide:user",
		bookingType: "driver-only",
		color: "from-orange-300 to-orange-500",
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
