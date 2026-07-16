export const SITE = {
	name: "Bangalore Urban Cabs",
	shortName: "BangaloreUrbanCabs",
	tagline: "ನಮ್ಮ ಸೇವೆ",
	url: "https://bangaloreurbancabs.com",
	title: "Bangalore Urban Cabs — Taxi, Airport Transfer & Outstation Cabs in Bangalore",
	description:
		"Book reliable taxis in Bangalore — airport transfers, hourly rentals, outstation trips & corporate travel. 24/7 service with verified drivers. Call +91 70227 62929.",
	// The one canonical phone number. wa.me requires the country code with no
	// "+"; tel: requires full E.164.
	phoneDisplay: "+91 70227 62929",
	phoneE164: "+917022762929",
	whatsapp: "917022762929",
	email: "info@bangaloreurbancabs.com",
	instagram: "https://www.instagram.com/bangalore_urban_cabs/",
	address: {
		street: "RMV 2nd Stage, Bhoopasandra",
		locality: "Bengaluru",
		region: "Karnataka",
		postalCode: "560094",
		country: "IN",
	},
	rating: "4.8",
} as const;

export const waLink = (text: string): string =>
	`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
