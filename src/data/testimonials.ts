import testimonialsJson from "./content/testimonials.json";

export interface Testimonial {
	name: string;
	location: string;
	rating: number;
	text: string;
}

// Testimonials live in content/testimonials.json (editable from /admin/).
export const TESTIMONIALS = testimonialsJson as Testimonial[];

/** "Priya Sharma" -> "PS" for the CSS initials avatar. */
export const initials = (name: string): string =>
	name
		.split(/\s+/)
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
