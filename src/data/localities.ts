import type { FaqItem } from "./faq";

/**
 * Locality service pages (/taxi-in-<slug>/) for the neighbourhoods where
 * most bookings originate. Each entry is joined with its AIRPORT_AREAS
 * record (same slug) for fares, distances and neighbourhood lists — the
 * copy here must stay area-specific so these never read as doorway pages.
 */
export interface Locality {
	/** Must match a dedicated-page AIRPORT_AREAS slug. */
	slug: string;
	name: string;
	intro: string[];
	faqs: FaqItem[];
}

export const LOCALITIES: Locality[] = [
	{
		slug: "whitefield",
		name: "Whitefield",
		intro: [
			"Whitefield runs on schedules — ITPL badge-ins, EPIP shift changes, hotel check-outs and red-eye flights — and that's exactly the kind of driving we do best. Our drivers know which gate of which tech park you mean, how Graphite India Road behaves at 6 PM, and that the Budigere route beats the ORR for almost every airport run.",
			"From a quick drop to Phoenix Marketplace to a 5 AM pickup on Whitefield Main Road, the same rules apply: fixed fare agreed on WhatsApp before the car moves, verified drivers, and no surge — not at midnight, not in the rain.",
		],
		faqs: [
			{
				question: "Do you do late-night pickups from ITPL and the tech parks?",
				answer: "All night, every night. Post-shift drops from ITPL, EPIP Zone and Brookefield are routine for us — share your gate number and the driver waits at the right exit with his number plate shared in advance.",
			},
			{
				question: "How long does Whitefield to the airport take?",
				answer: "75–105 minutes depending on the hour, usually via Budigere Cross. The fixed sedan fare is on our Whitefield airport taxi page — it's the same day or night.",
			},
			{
				question: "Can an outstation trip start from Whitefield?",
				answer: "Yes — pickup anywhere in Bangalore is included in every outstation fare and tour package. A Coorg weekend or Mysore day trip starts at your Whitefield doorstep at no extra cost.",
			},
			{
				question: "Do you serve hotels and serviced apartments in Whitefield?",
				answer: "Daily — guest pickups from the hotel belt around Whitefield Main Road and ITPL are a core part of our day. Hotels can book on a guest's behalf on WhatsApp and pay either way.",
			},
		],
	},
	{
		slug: "electronic-city",
		name: "Electronic City",
		intro: [
			"Electronic City is Bangalore's longest commute, and we've built our service around that fact. Infosys, Wipro, Biocon, TCS — our drivers know the campus gates in Phase 1 and Phase 2, when the elevated expressway is worth it, and when NICE Road saves your evening despite the extra kilometres.",
			"Whether it's a 4 AM shift pickup on Hosa Road, a client run to the city, or the long haul to Kempegowda Airport, the fare is fixed before you get in — and our drivers actually show up at the phase, gate and pillar you named.",
		],
		faqs: [
			{
				question: "Do you handle odd-hour shift pickups in Electronic City?",
				answer: "Around the clock — Phase 1, Phase 2, Neeladri Nagar, Hosa Road and Chandapura included. Night-shift drops and 4 AM pickups are among our most common bookings from this side of town.",
			},
			{
				question: "What's the best route to the airport from Electronic City?",
				answer: "Outside peak hours: elevated expressway, Silk Board, ORR, Hebbal. In the evening peak our drivers default to NICE Road — a few kilometres longer, usually 30–40 minutes faster. The fixed fare doesn't change either way.",
			},
			{
				question: "Can you do daily or weekly office travel?",
				answer: "Yes — regular commutes and corporate arrangements with monthly billing are available. Tell us the schedule on WhatsApp and we'll fix a driver and rate.",
			},
			{
				question: "Do outstation trips from Electronic City cost extra?",
				answer: "No — pickup anywhere in Bangalore is part of every outstation fare. Heading to Hosur-side destinations like Kodaikanal? You're actually closer than the rest of the city.",
			},
		],
	},
	{
		slug: "koramangala",
		name: "Koramangala",
		intro: [
			"Koramangala's cab needs don't keep office hours — investor meetings in the morning, Forum and 5th Block dinners at night, and airport runs at every hour in between. We run all of it across the eight blocks, Ejipura and ST Bed with fixed fares and drivers who don't need directions to Sony World Signal.",
			"The neighbourhood's startup crowd uses us three ways: hourly rentals for meeting-hopping days, fixed airport transfers that beat surge pricing, and late-night drops home when the last app cab is 1.8x and twenty minutes away.",
		],
		faqs: [
			{
				question: "Can I get a cab after a late dinner in 5th Block?",
				answer: "Yes — we run 24/7 with no surge. A WhatsApp message with your pickup point (say, near the Social or Forum side) gets you a fixed quote and a driver, usually within 20–30 minutes at night.",
			},
			{
				question: "How does the hourly rental work for a day of meetings?",
				answer: "₹1,200 for 4 hours/40 km or ₹2,200 for 8 hours/80 km in a sedan — the car and driver stay with you between stops. It's the Koramangala startup crowd's favourite way to do a packed day.",
			},
			{
				question: "What does Koramangala to the airport cost?",
				answer: "A fixed ₹899 by sedan, any hour — covering all blocks plus Ejipura, ST Bed and Jakkasandra. Flight tracking included; see the Koramangala airport taxi page for details.",
			},
			{
				question: "Do you do one-way drops to other cities from Koramangala?",
				answer: "Yes — one-way drops bill one side only, with fixed fares to 20 corridors including Mysore ₹3,000 and Chennai ₹6,200, picked up from your door.",
			},
		],
	},
	{
		slug: "hsr-layout",
		name: "HSR Layout",
		intro: [
			"HSR sits at a useful crossroads — Sarjapur Road on one side, Silk Board on the other, half the city's startups in between — and its taxi patterns show it: airport runs from every sector, hourly cars for founder days, weekend escapes that start before sunrise.",
			"We cover all seven sectors plus the Agara and 27th Main stretches with the same promise everywhere: a fixed fare agreed upfront, a verified driver, and a car that arrives when the message said it would — whether that's a school run or a 4 AM Nandi Hills start.",
		],
		faqs: [
			{
				question: "Which parts of HSR do you cover?",
				answer: "All sectors 1–7, Agara, and the 27th Main café stretch — plus the immediate surrounds toward Bommanahalli and Sarjapur Road. If you can drop a pin, we pick you up there.",
			},
			{
				question: "What's the airport fare from HSR Layout?",
				answer: "A fixed sedan fare listed on our HSR airport taxi page, identical day and night. Evening pickups route around Silk Board — our drivers decide live between ORR and the city route.",
			},
			{
				question: "Early weekend starts — can the cab come at 4 AM?",
				answer: "That's prime time for us. Nandi Hills sunrise runs and early Mysore starts from HSR are daily business; book the evening before and the driver messages you when he leaves.",
			},
			{
				question: "Do you do monthly arrangements for office commutes?",
				answer: "Yes — fixed daily pickups with monthly billing are available for HSR-based teams and individuals. Share the route and timings on WhatsApp for a quote.",
			},
		],
	},
	{
		slug: "indiranagar",
		name: "Indiranagar",
		intro: [
			"Indiranagar is equal parts office and evening out — 100 Feet Road boutiques, CMH Road offices, and one of Bangalore's densest restaurant and brewery strips. Our cabs work both shifts: daytime meetings and airport transfers, then safe fixed-fare rides home when the night winds down.",
			"From Defence Colony to HAL 2nd Stage and the Domlur edge, pickup is at your gate — and because the fare is agreed on WhatsApp before the car moves, the ride home after a long dinner costs exactly what you were told, not what the hour decides.",
		],
		faqs: [
			{
				question: "Can I get a fixed-fare ride home after a night out on 100 Feet Road?",
				answer: "Yes — no surge, ever. Message your pickup point and destination; you'll have a fixed quote and a driver's live location before you've settled the bill.",
			},
			{
				question: "What does Indiranagar to the airport cost?",
				answer: "A fixed ₹899 by sedan covering the whole Indiranagar belt — Domlur, HAL 2nd Stage and Jeevanbheemanagar included. Details on the Indiranagar airport taxi page.",
			},
			{
				question: "Is an hourly cab better for a shopping or errand day?",
				answer: "Usually, yes — ₹1,200 for 4 hours/40 km keeps the car with you between 100 Feet Road, Commercial Street and wherever else the day goes, with no waiting anxiety.",
			},
			{
				question: "Do you run outstation and tour pickups from Indiranagar?",
				answer: "Daily — every outstation fare and tour package includes doorstep pickup. Coorg, Mysore, Tirupati and the rest all start from your gate in Indiranagar.",
			},
		],
	},
	{
		slug: "yelahanka",
		name: "Yelahanka",
		intro: [
			"Yelahanka is the closest big neighbourhood to Kempegowda Airport, and our busiest northern base — airport drops that take 25–40 minutes, early trade-fair runs to the BIEC side, and wedding-season shuttles across New Town's convention halls.",
			"Being north also makes Yelahanka the best-placed starting point in Bangalore for Nandi Hills, Lepakshi and the Adiyogi — sunrise trips leave your gate a full half hour later than they would from the city core. Same fixed fares, less alarm clock.",
		],
		faqs: [
			{
				question: "Why book a cab to the airport when Yelahanka is so close?",
				answer: "Because the minimum airport fare (₹899 by sedan) buys a door-to-terminal ride with flight tracking and luggage help at any hour — no dragging suitcases to a pickup point, no last-minute app cancellations before a flight.",
			},
			{
				question: "Are Nandi Hills trips cheaper from Yelahanka?",
				answer: "The package price is the same city-wide, but you gain the best part of an hour — from Yelahanka and New Town the sunrise pickup can be as late as 5 AM and still beat the gates.",
			},
			{
				question: "Do you cover weddings and events in Yelahanka New Town?",
				answer: "Yes — guest shuttles, decorated cars on request, and Tempo Travellers for group movements between venues and hotels. Share dates early for wedding-season weekends.",
			},
			{
				question: "Which areas around Yelahanka do you serve?",
				answer: "Yelahanka Old Town and New Town, Attur Layout, Jakkur and the Kogilu stretch — and everything toward the airport road. Drop a pin and we're there.",
			},
		],
	},
];
