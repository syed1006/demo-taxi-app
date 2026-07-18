// Bangalore city sightseeing spots for local tour pages and rails.
import type { ImageMetadata } from "astro";

import lalbagh from "../assets/destinations/lalbagh.webp";
import cubbonPark from "../assets/destinations/cubbon-park-unsplash.webp";
import bangalorePalace from "../assets/destinations/bangalore-palace.webp";
import iskconTemple from "../assets/destinations/iskcon-temple.webp";
import wonderla from "../assets/destinations/wonderla.webp";

export interface CitySight {
	name: string;
	blurb: string;
	image: ImageMetadata;
	category: string;
	rating: number;
	popular: boolean;
}

export const CITY_SIGHTS: CitySight[] = [
	{
		name: "Lalbagh Botanical Garden",
		blurb: "Historic 240-acre garden with a Victorian glasshouse, ancient rock outcrop and famous biannual flower shows.",
		image: lalbagh,
		category: "Nature",
		rating: 4.5,
		popular: true,
	},
	{
		name: "Cubbon Park",
		blurb: "300 acres of bamboo groves and rain trees in the city's heart — Bangalore's favourite morning-walk green lung.",
		image: cubbonPark,
		category: "Nature",
		rating: 4.3,
		popular: false,
	},
	{
		name: "Bangalore Palace",
		blurb: "Tudor-style palace of the Wadiyars, built in 1878, with turreted facades, royal artifacts and audio-guided interiors.",
		image: bangalorePalace,
		category: "Heritage",
		rating: 4.6,
		popular: true,
	},
	{
		name: "ISKCON Temple",
		blurb: "Grand hilltop temple complex with gold-plated shikharas, evening aartis and a serene spiritual ambiance.",
		image: iskconTemple,
		category: "Spiritual",
		rating: 4.7,
		popular: false,
	},
	{
		name: "Wonderla Amusement Park",
		blurb: "Karnataka's biggest amusement park on Mysore Road, packed with high-thrill rides, coasters and water slides.",
		image: wonderla,
		category: "Entertainment",
		rating: 4.4,
		popular: true,
	},
];
