import type { ImageMetadata } from "astro";

import etios from "../assets/cars/etios.webp";
import siftDezire from "../assets/cars/sift-dezire.webp";
import amaze from "../assets/cars/amaze.webp";
import innova from "../assets/cars/innova.webp";
import ertiga from "../assets/cars/ertiga.webp";
import kiaCarrens from "../assets/cars/kia-carrens.webp";
import ciaz from "../assets/cars/ciaz.webp";
import nissanSunny from "../assets/cars/nissan-sunny.webp";
import city from "../assets/cars/city.webp";
import fortuner from "../assets/cars/fortuner.webp";
import innovaCrysta from "../assets/cars/innova-crysta.webp";
import fortunerBlack from "../assets/cars/fortuner-black.webp";
import audi from "../assets/cars/audi.webp";
import bmw from "../assets/cars/bmw.webp";
import mercedes from "../assets/cars/mercedes.webp";
import traveller from "../assets/cars/traveller.webp";

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
		gradient: "from-orange-400 to-orange-600",
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
				color: "from-orange-500 to-red-600",
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
		gradient: "from-red-600 to-red-800",
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
				color: "from-red-600 to-red-800",
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
				color: "from-red-700 to-pink-600",
			},
		],
	},
	luxury: {
		title: "Luxury",
		description: "Premium luxury vehicles for special occasions",
		icon: "lucide:crown",
		gradient: "from-orange-300 to-orange-500",
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
				color: "from-orange-300 to-orange-500",
			},
		],
	},
	group: {
		title: "Group Travel",
		description: "Large capacity vehicles for big groups",
		icon: "lucide:bus",
		gradient: "from-pink-600 to-red-800",
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
				color: "from-pink-600 to-red-800",
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
