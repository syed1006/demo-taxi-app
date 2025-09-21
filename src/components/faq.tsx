"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants";

export function FAQ() {
	const [openItems, setOpenItems] = useState<number[]>([0]);

	const toggleItem = (index: number) => {
		setOpenItems((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		);
	};

	const faqs = [
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

	return (
		<section
			id="faq"
			className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
		>
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12 sm:mb-16">
					<div className="flex items-center justify-center mb-4 sm:mb-6">
						<HelpCircle className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mr-3 sm:mr-4 animate-bounce-in" />
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground animate-fade-in-up">
							Frequently Asked Questions
						</h2>
					</div>
					<p className="text-lg sm:text-xl text-muted-foreground animate-fade-in-up delay-200 px-4">
						Got questions? We've got answers! Find everything you
						need to know about our taxi services.
					</p>
				</div>

				<div className="space-y-3 sm:space-y-4">
					{faqs.map((faq, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-all duration-300 animate-slide-up border hover:border-orange-200 dark:hover:border-orange-800 overflow-hidden"
							style={{ animationDelay: `${index * 50}ms` }}
						>
							<CardHeader className="pb-2 sm:pb-3">
								<Button
									variant="ghost"
									className="w-full justify-between text-left p-0 h-auto hover:bg-transparent min-h-[60px] flex items-center"
									onClick={() => toggleItem(index)}
								>
									<CardTitle className="text-base sm:text-lg font-semibold text-foreground pr-4 text-left flex-1 flex items-center">
										{faq.question}
									</CardTitle>
									<div
										className={`transition-transform duration-300 ${
											openItems.includes(index)
												? "rotate-180"
												: "rotate-0"
										}`}
									>
										<ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
									</div>
								</Button>
							</CardHeader>
							<div
								className={`transition-all duration-300 ease-in-out overflow-hidden ${
									openItems.includes(index)
										? "max-h-96 opacity-100"
										: "max-h-0 opacity-0"
								}`}
							>
								<CardContent className="pt-0 pb-4">
									<p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
										{faq.answer}
									</p>
								</CardContent>
							</div>
						</Card>
					))}
				</div>

				<div className="text-center mt-8 sm:mt-12 animate-fade-in-up delay-500">
					<p className="text-muted-foreground mb-4 text-sm sm:text-base">
						Still have questions?
					</p>
					<Button
						onClick={() => {
							const message =
								"Hi! I have a question about your taxi services. Can you help me?";
							const whatsappUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(
								message
							)}`;
							window.open(whatsappUrl, "_blank");
						}}
						className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 hover:scale-105 transition-all duration-300"
					>
						Contact Us on WhatsApp
					</Button>
				</div>
			</div>
		</section>
	);
}
