export interface FaqItem {
	question: string;
	answer: string;
	category?: "booking" | "pricing" | "airport" | "outstation";
}

export const FAQS: FaqItem[] = [
	{
		question: "How do I book a taxi?",
		answer: "You can book a taxi by filling out our booking form and clicking 'Book via WhatsApp'. We'll connect with you instantly to confirm your ride details and provide fare information.",
		category: "booking",
	},
	{
		question: "What are your operating hours?",
		answer: "We operate 24/7, 365 days a year. Whether you need an early morning airport transfer or a late-night ride home, we're always available to serve you.",
		category: "booking",
	},
	{
		question: "How is the fare calculated?",
		answer: "Our fares are calculated based on distance, time, and cab type. We have transparent pricing with no hidden charges. You'll get an estimated fare before booking, and the final fare will be confirmed by our team.",
		category: "pricing",
	},
	{
		question: "Do you provide airport transfers?",
		answer: "Yes! We specialize in airport transfers to and from Kempegowda International Airport. Our drivers track your flight status and provide meet & greet service with luggage assistance.",
		category: "airport",
	},
	{
		question: "Can I book for outstation trips?",
		answer: "We offer outstation services to nearby cities like Mysore, Coorg, Ooty, and more. Our packages include driver allowance and fuel charges for your convenience.",
		category: "outstation",
	},
	{
		question: "Are your drivers verified?",
		answer: "Yes, all our drivers are thoroughly verified with proper licenses, background checks, and regular training. We prioritize your safety and ensure professional service.",
		category: "booking",
	},
	{
		question: "What payment methods do you accept?",
		answer: "We accept cash, UPI, credit/debit cards, and digital wallets. For corporate bookings, we also provide invoice facilities and monthly billing options.",
		category: "pricing",
	},
	{
		question: "Can I cancel or modify my booking?",
		answer: "Yes, you can cancel or modify your booking by contacting us via WhatsApp or phone. Cancellation charges may apply based on the timing and booking type.",
		category: "booking",
	},
	{
		question: "Do I need to pay in advance?",
		answer: "No advance payment is needed for most bookings — we confirm your fare on WhatsApp and you pay after the trip. Some tour packages may ask for a small advance to block the vehicle on peak dates, which we'll tell you upfront.",
		category: "booking",
	},
	{
		question: "Will I get the driver's details before the trip?",
		answer: "Yes. Once confirmed, we share the driver's name, phone number and vehicle number on WhatsApp — typically the evening before for morning pickups.",
		category: "booking",
	},
	{
		question: "Is there a night charge?",
		answer: "Airport transfers have no night surge — same fare 24/7. For outstation trips, driving between 10 PM and 6 AM attracts an extra driver allowance, which is confirmed before you book.",
		category: "pricing",
	},
	{
		question: "Are tolls and parking included in the fare?",
		answer: "No — tolls, parking and inter-state permits are billed at actuals, exactly what the receipt says. Fuel and driver charges are always included in the quoted fare.",
		category: "pricing",
	},
	{
		question: "What is driver bata?",
		answer: "Driver bata is the driver's daily allowance on outstation trips (₹400–₹600 per day depending on vehicle). It covers his food and stay — you never need to arrange anything for the driver.",
		category: "pricing",
	},
	{
		question: "How early will the driver arrive for an airport pickup?",
		answer: "Drivers are scheduled to reach your pickup point 10 minutes early. For flight pickups we track the actual landing time, so delays don't strand you or cost extra.",
		category: "airport",
	},
	{
		question: "Do you offer one-way outstation drops?",
		answer: "Yes — most corridors like Mysore, Coorg, Chennai and Tirupati have fixed one-way fares that cost much less than a round trip. Check the route page for your destination.",
		category: "outstation",
	},
	{
		question: "What is the minimum billing for outstation round trips?",
		answer: "300 km per calendar day. If you drive less, the minimum still applies; if you drive more, extra kilometres are billed at your vehicle's standard per-km rate.",
		category: "outstation",
	},
	{
		question: "Why is the AC switched off on ghat sections?",
		answer: "On steep climbs like Ooty or Kodaikanal, running the AC strains the engine and can overheat it. Drivers switch it off just for the climb — a standard safety practice on all South India hill routes.",
		category: "outstation",
	},
	{
		question: "Can I bring a pet along?",
		answer: "Small pets in carriers are welcome on most trips — mention it while booking so we assign a pet-friendly driver. A cleaning charge may apply for shedding-heavy travel.",
		category: "booking",
	},
	{
		question: "Do your cabs have child seats?",
		answer: "Child seats are available on request for airport transfers and outstation trips — ask on WhatsApp at least a few hours before pickup.",
		category: "booking",
	},
	{
		question: "What happens if the car breaks down mid-trip?",
		answer: "We arrange a replacement vehicle at no extra cost and adjust the fare for any delay. Breakdowns are rare — the fleet is owner-maintained and serviced on schedule.",
		category: "booking",
	},
];

export const FAQ_CATEGORIES: { id: NonNullable<FaqItem["category"]>; label: string }[] = [
	{ id: "booking", label: "Booking & Service" },
	{ id: "pricing", label: "Pricing & Payments" },
	{ id: "airport", label: "Airport Transfers" },
	{ id: "outstation", label: "Outstation Trips" },
];
