import type { ImageMetadata } from "astro";

import lalbagh from "../assets/destinations/lalbagh.jpg";
import cubbonPark from "../assets/destinations/cubbon-park-unsplash.jpg";
import bangalorePalace from "../assets/destinations/bangalore-palace.jpg";
import iskconTemple from "../assets/destinations/iskcon-temple.jpg";
import wonderla from "../assets/destinations/wonderla.jpg";
import nandiHills from "../assets/destinations/nandi-hills.jpg";
import lepakshiTemple from "../assets/destinations/lepakshi-temple.png";
import shivanaSamudra from "../assets/destinations/shivana-samudra.png";
import mysorePalace from "../assets/destinations/mysore-palace.jpg";
import ishaFoundation from "../assets/destinations/isha-foundation.jpg";
import chickmagaluru from "../assets/destinations/chickmagaluru.jpg";
import coorg from "../assets/destinations/coorg.jpg";
import ooty from "../assets/destinations/ooty.jpg";
import waynad from "../assets/destinations/waynad.jpg";
import hogenakkalFalls from "../assets/destinations/hogenakkal-falls.jpg";
import chennai from "../assets/destinations/chennai.jpg";

export interface Destination {
	id: number;
	name: string;
	description: string;
	image: ImageMetadata;
	distance: string | null;
	duration: string | null;
	oneWay: string | null;
	roundTrip: string | null;
	category: string;
	rating: number;
	popular: boolean;
	additionalInfo: boolean;
}

export const CATEGORY_ICONS: Record<string, string> = {
	Nature: "lucide:tree-pine",
	Heritage: "lucide:building",
	Spiritual: "lucide:star",
	Hills: "lucide:mountain",
	Adventure: "lucide:mountain",
	Waterfalls: "lucide:tree-pine",
	"Coffee Estates": "lucide:tree-pine",
	Entertainment: "lucide:star",
	Beach: "lucide:map-pin",
};

export const DESTINATIONS: Record<string, Destination[]> = {
	bangalore: [
		{
			id: 1,
			name: "Lalbagh Botanical Garden",
			description:
				"Historic 240-acre garden with glasshouse and diverse plant species",
			image: lalbagh,
			distance: null,
			duration: null,
			oneWay: null,
			roundTrip: null,
			category: "Nature",
			rating: 4.5,
			popular: true,
			additionalInfo: false,
		},
		{
			id: 2,
			name: "Cubbon Park",
			description:
				"Green oasis in city center, perfect for jogging and relaxing",
			image: cubbonPark,
			distance: null,
			duration: null,
			oneWay: null,
			roundTrip: null,
			category: "Nature",
			rating: 4.3,
			popular: false,
			additionalInfo: false,
		},
		{
			id: 3,
			name: "Bangalore Palace",
			description:
				"Majestic Tudor-style palace with elegant interiors and royal artifacts",
			image: bangalorePalace,
			distance: null,
			duration: null,
			oneWay: null,
			roundTrip: null,
			category: "Heritage",
			rating: 4.6,
			popular: true,
			additionalInfo: false,
		},
		{
			id: 4,
			name: "ISKCON Temple",
			description: "Stunning white marble temple with spiritual ambiance",
			image: iskconTemple,
			distance: null,
			duration: null,
			oneWay: null,
			roundTrip: null,
			category: "Spiritual",
			rating: 4.7,
			popular: false,
			additionalInfo: false,
		},
		{
			id: 5,
			name: "Wonderla Amusement Park",
			description:
				"Biggest amusement park with high-thrill rides and water slides",
			image: wonderla,
			distance: null,
			duration: null,
			oneWay: null,
			roundTrip: null,
			category: "Entertainment",
			rating: 4.4,
			popular: true,
			additionalInfo: false,
		},
	],
	weekend: [
		{
			id: 6,
			name: "Nandi Hills",
			description: "Scenic hill station with sunrise views and cycling trails",
			image: nandiHills,
			distance: null,
			duration: null,
			oneWay: "₹2,100",
			roundTrip: "₹3,300",
			category: "Hills",
			rating: 4.8,
			popular: true,
			additionalInfo: false,
		},
		{
			id: 7,
			name: "Lepakshi Temple",
			description: "Heritage site",
			image: lepakshiTemple,
			distance: null,
			duration: null,
			oneWay: "₹2,100",
			roundTrip: "₹3,300",
			category: "Heritage",
			rating: 4.8,
			popular: true,
			additionalInfo: false,
		},
		{
			id: 8,
			name: "Shivanasamudra Falls",
			description: "Breathtaking segmented waterfall on the Kaveri River",
			image: shivanaSamudra,
			distance: null,
			duration: null,
			oneWay: "₹2,799",
			roundTrip: "₹4,999",
			category: "Waterfalls",
			rating: 4.6,
			popular: true,
			additionalInfo: false,
		},
		{
			id: 9,
			name: "Mysore",
			description: "Heritage city with grand palace and cultural charm",
			image: mysorePalace,
			distance: null,
			duration: null,
			oneWay: "₹2,799",
			roundTrip: "₹5,100",
			category: "Heritage",
			rating: 4.9,
			popular: true,
			additionalInfo: false,
		},
		{
			id: 10,
			name: "Isha Foundation Adiyogi",
			description: "Heritage site with grand Shiva statue",
			image: ishaFoundation,
			distance: null,
			duration: null,
			oneWay: null,
			roundTrip: "₹3,300",
			category: "Heritage",
			rating: 4.5,
			popular: false,
			additionalInfo: false,
		},
	],
	extended: [
		{
			id: 11,
			name: "Chikmagalur",
			description:
				"Hill station with lush coffee plantations and trekking trails",
			image: chickmagaluru,
			distance: "600 kms",
			duration: "2 days",
			oneWay: "₹4,800",
			roundTrip: "₹8,800",
			category: "Coffee Estates",
			rating: 4.7,
			popular: true,
			additionalInfo: true,
		},
		{
			id: 12,
			name: "Madikeri Coorg",
			description: "Scotland of India with misty hills and coffee estates",
			image: coorg,
			distance: "600 kms",
			duration: "2 days",
			oneWay: "₹4,800",
			roundTrip: "₹8,800",
			category: "Hills",
			rating: 4.8,
			popular: true,
			additionalInfo: true,
		},
		{
			id: 13,
			name: "Ooty",
			description:
				"Charming hill station with colonial architecture and toy train",
			image: ooty,
			distance: "600 kms",
			duration: "2 days",
			oneWay: "₹5,000",
			roundTrip: "₹9,000",
			category: "Hills",
			rating: 4.6,
			popular: false,
			additionalInfo: true,
		},
		{
			id: 14,
			name: "Wayanad",
			description: "Lush Kerala district with forests, waterfalls, and caves",
			image: waynad,
			distance: "600 kms",
			duration: "2 days",
			oneWay: "₹5,000",
			roundTrip: "₹9,000",
			category: "Nature",
			rating: 4.5,
			popular: false,
			additionalInfo: true,
		},
		{
			id: 15,
			name: "Hogenakkal Falls",
			description: "Niagara of India with coracle rides and scenic beauty",
			image: hogenakkalFalls,
			distance: "360 kms",
			duration: "1 day",
			oneWay: "₹2,999",
			roundTrip: "₹5,199",
			category: "Waterfalls",
			rating: 4.4,
			popular: true,
			additionalInfo: true,
		},
		{
			id: 16,
			name: "Chennai",
			description: "Beautiful city with pleasant beach",
			image: chennai,
			distance: "700 kms",
			duration: "2 days",
			oneWay: "₹6,200",
			roundTrip: "₹10,200",
			category: "Beach",
			rating: 4.4,
			popular: true,
			additionalInfo: true,
		},
	],
};
