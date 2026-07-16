export interface FaqItem {
	question: string;
	answer: string;
}

export const FAQS: FaqItem[] = [
	{
		question: "How do I book a taxi?",
		answer: "You can book a taxi by filling out our booking form and clicking 'Book via WhatsApp'. We'll connect with you instantly to confirm your ride details and provide fare information.",
	},
	{
		question: "What are your operating hours?",
		answer: "We operate 24/7, 365 days a year. Whether you need an early morning airport transfer or a late-night ride home, we're always available to serve you.",
	},
	{
		question: "How is the fare calculated?",
		answer: "Our fares are calculated based on distance, time, and cab type. We have transparent pricing with no hidden charges. You'll get an estimated fare before booking, and the final fare will be confirmed by our team.",
	},
	{
		question: "Do you provide airport transfers?",
		answer: "Yes! We specialize in airport transfers to and from Kempegowda International Airport. Our drivers track your flight status and provide meet & greet service with luggage assistance.",
	},
	{
		question: "Can I book for outstation trips?",
		answer: "We offer outstation services to nearby cities like Mysore, Coorg, Ooty, and more. Our packages include driver allowance and fuel charges for your convenience.",
	},
	{
		question: "Are your drivers verified?",
		answer: "Yes, all our drivers are thoroughly verified with proper licenses, background checks, and regular training. We prioritize your safety and ensure professional service.",
	},
	{
		question: "What payment methods do you accept?",
		answer: "We accept cash, UPI, credit/debit cards, and digital wallets. For corporate bookings, we also provide invoice facilities and monthly billing options.",
	},
	{
		question: "Can I cancel or modify my booking?",
		answer: "Yes, you can cancel or modify your booking by contacting us via WhatsApp or phone. Cancellation charges may apply based on the timing and booking type.",
	},
];
