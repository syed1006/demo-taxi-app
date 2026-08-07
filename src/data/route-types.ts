import type { ImageMetadata } from "astro";
import type { VehicleClassId } from "./rate-card";
import type { FaqItem } from "./faq";

export interface TripFare {
	/** Absent = one-way not offered on this corridor (round trip only). */
	oneWay?: number;
	roundTrip: number;
}

export interface Sight {
	name: string;
	blurb: string;
}

export interface Route {
	/** URL: /bangalore-to-{slug}-taxi/ */
	slug: string;
	name: string;
	image?: ImageMetadata;
	category:
		| "hills"
		| "heritage"
		| "beach"
		| "waterfalls"
		| "spiritual"
		| "nature"
		| "city";
	/** Real one-way road distance from Bangalore, km. */
	distanceKm: number;
	durationHrs: number;
	/** Typical trip length; drives the billed-km cap (300 km/day). */
	days: 1 | 2 | 3;
	/** Sedan fare is authoritative; other classes derive via lib/fare.ts. */
	fares: Partial<Record<VehicleClassId, TripFare>> & { sedan: TripFare };
	/** One-line card blurb. */
	summary: string;
	/** 2–3 unique paragraphs (~150–250 words total). */
	intro: string[];
	sights: Sight[];
	travelTips: string[];
	faqs: FaqItem[];
	relatedRoutes: string[];
	packageSlugs: string[];
	popular: boolean;
	rating: number;
	/** Which homepage rail this route appears on (legacy rails). */
	homepageRail: "weekend" | "extended" | null;
}

export interface TourPackage {
	/** URL: /tour-packages/{slug}/ */
	slug: string;
	name: string;
	shortName: string;
	durationDays: number;
	durationNights: number;
	routeSlugs: string[];
	image?: ImageMetadata;
	overview: string[];
	itinerary: {
		day: number;
		title: string;
		stops: { time?: string; place: string; note?: string }[];
	}[];
	/** Hide the "N km included" chip/meta on fixed city/day tours. */
	hideIncludedKm?: boolean;
	/** Extra photos shown as a strip on the package page. */
	gallery?: ImageMetadata[];
	/** HARD prices — every figure goes on the owner verification sheet. */
	prices: { vehicle: VehicleClassId; price: number }[];
	includedKm: number;
	extraKmRate: Partial<Record<VehicleClassId, number>>;
	inclusions: string[];
	exclusions: string[];
	sightsCovered: string[];
	faqs: FaqItem[];
	relatedPackages: string[];
	popular: boolean;
}

export interface AirportArea {
	/** URL (dedicated pages only): /airport-taxi-{slug}/ */
	slug: string;
	name: string;
	zone: "north" | "south" | "east" | "west" | "central";
	distanceKm: number;
	durationRange: string;
	/** One-way fares; sedan required, others derive. */
	fares: Partial<Record<VehicleClassId, number>> & { sedan: number };
	neighbourhoods: string[];
	notes: string[];
	faqs: FaqItem[];
	dedicatedPage: boolean;
}
