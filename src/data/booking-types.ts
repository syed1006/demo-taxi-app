export interface BookingType {
	id: string;
	name: string;
	description: string;
	icon: string;
	popular: boolean;
	color: string;
}

export const BOOKING_TYPES: BookingType[] = [
	{
		id: "point-to-point",
		name: "Point to Point",
		description: "Direct pickup to drop",
		icon: "lucide:map-pin",
		popular: true,
		color: "from-blue-500 to-cyan-600",
	},
	{
		id: "hourly",
		name: "Hourly Rental",
		description: "Flexible stops, hourly",
		icon: "lucide:clock",
		popular: true,
		color: "from-green-500 to-emerald-600",
	},
	{
		id: "airport",
		name: "Airport Transfer",
		description: "To/From BLR airport",
		icon: "lucide:plane",
		popular: true,
		color: "from-purple-500 to-violet-600",
	},
	{
		id: "outstation",
		name: "Outstation",
		description: "Travel beyond city",
		icon: "lucide:mountain",
		popular: true,
		color: "from-orange-500 to-red-600",
	},
	{
		id: "tour",
		name: "City Tour",
		description: "Explore attractions",
		icon: "lucide:camera",
		popular: false,
		color: "from-pink-500 to-rose-600",
	},
	{
		id: "corporate",
		name: "Corporate",
		description: "Business travel",
		icon: "lucide:briefcase",
		popular: false,
		color: "from-stone-600 to-stone-800",
	},
	{
		id: "driver-only",
		name: "Spare Driver",
		description: "Hire driver only",
		icon: "lucide:user",
		popular: true,
		color: "from-amber-500 to-orange-600",
	},
];

/**
 * Booking types where the drop-location field does not apply.
 * "driver-only" additionally hides the cab-type field.
 */
export const NO_DROP_TYPES = ["hourly", "tour", "driver-only"];
