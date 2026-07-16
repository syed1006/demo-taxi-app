import type { ImageMetadata } from "astro";

import etios from "../assets/cars/etios.png";
import siftDezire from "../assets/cars/sift-dezire.png";
import amaze from "../assets/cars/amaze.png";
import innova from "../assets/cars/innova.png";
import ertiga from "../assets/cars/ertiga.png";
import kiaCarrens from "../assets/cars/kia-carrens.png";
import ciaz from "../assets/cars/ciaz.png";
import nissanSunny from "../assets/cars/nissan-sunny.png";
import city from "../assets/cars/city.png";
import fortuner from "../assets/cars/fortuner.png";
import innovaCrysta from "../assets/cars/innova-crysta.png";
import fortunerBlack from "../assets/cars/fortuner-black.png";
import audi from "../assets/cars/audi.png";
import bmw from "../assets/cars/bmw.png";
import mercedes from "../assets/cars/mercedes.png";
import traveller from "../assets/cars/traveller.png";

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

export const VEHICLE_CATEGORIES: Record<string, VehicleCategory> = {
	economy: {
		title: "Economy",
		description: "Budget-friendly options for everyday travel",
		icon: "lucide:car",
		gradient: "from-green-500 to-emerald-600",
		vehicles: [
			{
				id: "sedan",
				name: "Sedan",
				subtitle: "4+1 Seater",
				description: "Toyota Etios, Swift Dzire, Honda Xcent, Honda Amaze",
				pricing: {
					airport: "starting at ₹799",
					hourly4: "₹1,200",
					hourly8: "₹2,200",
					outstation: "12",
					driverBata: "₹400",
				},
				features: [
					"4+1 passengers",
					"AC Sedan",
					"Comfortable seating",
					"Luggage space",
				],
				icon: "lucide:users",
				images: [etios, siftDezire, amaze],
				popular: true,
				color: "from-blue-500 to-cyan-600",
			},
		],
	},
	suv: {
		title: "SUV",
		description: "Spacious vehicles for groups and families",
		icon: "lucide:luggage",
		gradient: "from-orange-500 to-red-600",
		vehicles: [
			{
				id: "suv",
				name: "SUV",
				subtitle: "6+1 to 7+1 Seater",
				description: "Maruti Ertiga, Toyota Innova, Kia Carens, Toyota Rumion",
				pricing: {
					airport: "₹1,499",
					hourly4: "₹1,600-1,900",
					hourly8: "₹2,800-3,200",
					outstation: "16-18",
					driverBata: "₹500",
				},
				features: [
					"6+1 to 7+1 passengers",
					"Spacious SUV",
					"Large luggage space",
					"Group travel",
				],
				icon: "lucide:luggage",
				images: [innova, ertiga, kiaCarrens],
				popular: true,
				color: "from-orange-500 to-red-600",
			},
		],
	},
	premium: {
		title: "Premium",
		description: "Enhanced comfort with premium vehicles",
		icon: "lucide:star",
		gradient: "from-purple-500 to-violet-600",
		vehicles: [
			{
				id: "prime-sedan",
				name: "Prime Sedan",
				subtitle: "4+1 Seater",
				description: "Maruti Ciaz, Platinum Etios, Nissan Sunny, Honda City",
				pricing: {
					airport: "starting at ₹999",
					hourly4: "₹1,300",
					hourly8: "₹2,400",
					outstation: "13-14",
					driverBata: "₹500",
				},
				features: [
					"4+1 passengers",
					"Premium sedan",
					"Enhanced comfort",
					"Premium interiors",
				],
				icon: "lucide:star",
				images: [ciaz, nissanSunny, city],
				popular: false,
				color: "from-purple-500 to-violet-600",
			},
			{
				id: "premium-suv",
				name: "Premium SUV",
				subtitle: "6+1 to 7+1 Seater",
				description: "Maruti Ertiga, Mahindra Marazzo, Toyota Rumion",
				pricing: {
					airport: "₹1,999-₹2,499",
					hourly4: "₹1,999-₹2,499",
					hourly8: "₹3,400-₹4,800",
					outstation: "19-24",
					driverBata: "₹600",
				},
				features: [
					"6+1 passengers",
					"Premium SUV",
					"Spacious interior",
					"Comfort ride",
				],
				icon: "lucide:luggage",
				images: [fortuner, innovaCrysta, fortunerBlack],
				popular: true,
				color: "from-indigo-500 to-purple-600",
			},
		],
	},
	luxury: {
		title: "Luxury",
		description: "Premium luxury vehicles for special occasions",
		icon: "lucide:crown",
		gradient: "from-amber-500 to-yellow-600",
		vehicles: [
			{
				id: "premium-luxury",
				name: "Premium Luxury",
				subtitle: "4+1 Seater",
				description: "BMW 3 Series, Audi A4, Mercedes C-Class, Jaguar XE",
				pricing: {
					airport: "₹2,999-3,999",
					hourly4: "Not Available",
					hourly8: "₹5,999-7,999",
					outstation: "25-35",
					driverBata: "₹800",
				},
				features: [
					"4+1 passengers",
					"Luxury sedan",
					"Premium experience",
					"VIP treatment",
				],
				icon: "lucide:crown",
				images: [audi, bmw, mercedes],
				popular: false,
				color: "from-yellow-500 to-amber-600",
			},
		],
	},
	group: {
		title: "Group Travel",
		description: "Large capacity vehicles for big groups",
		icon: "lucide:bus",
		gradient: "from-indigo-500 to-blue-600",
		vehicles: [
			{
				id: "tempo-traveller",
				name: "Tempo Traveller",
				subtitle: "12+1 Seater",
				description: "Spacious tempo traveller for large groups and events",
				pricing: {
					airport: "₹3,200-₹4,000",
					hourly4: "Not Available",
					hourly8: "₹4,199",
					outstation: "20-29",
					driverBata: "₹600",
				},
				features: [
					"12+1 passengers",
					"Large group travel",
					"Event transportation",
					"Ample luggage space",
				],
				icon: "lucide:bus",
				images: [traveller],
				popular: false,
				color: "from-indigo-500 to-blue-600",
			},
		],
	},
};

/** Flat list of vehicle names for the booking form's cab-type select. */
export const CAB_TYPES = Object.values(VEHICLE_CATEGORIES).flatMap((category) =>
	category.vehicles.map((vehicle) => ({
		name: vehicle.name,
		subtitle: vehicle.subtitle,
	}))
);
