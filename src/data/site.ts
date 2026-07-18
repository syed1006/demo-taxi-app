import siteJson from "./content/site.json";

export interface SiteInfo {
	name: string;
	shortName: string;
	tagline: string;
	url: string;
	title: string;
	description: string;
	// The one canonical phone number. wa.me requires the country code with no
	// "+"; tel: requires full E.164.
	phoneDisplay: string;
	phoneE164: string;
	whatsapp: string;
	email: string;
	instagram: string;
	address: {
		street: string;
		locality: string;
		region: string;
		postalCode: string;
		country: string;
	};
	rating: string;
}

// Business identity/contact data lives in content/site.json (editable from /admin/).
export const SITE: SiteInfo = siteJson;

export const waLink = (text: string): string =>
	`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
