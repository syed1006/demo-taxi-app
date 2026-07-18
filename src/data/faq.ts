import faqsJson from "./content/faqs.json";

export interface FaqItem {
	question: string;
	answer: string;
	category?: "booking" | "pricing" | "airport" | "outstation";
}

// Global FAQ content lives in content/faqs.json (editable from /admin/).
export const FAQS = faqsJson.items as FaqItem[];

export const FAQ_CATEGORIES = faqsJson.categories as {
	id: NonNullable<FaqItem["category"]>;
	label: string;
}[];
