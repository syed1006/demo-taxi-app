"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingTypeCards } from "@/components/booking-type-cards";
import { PricingCards } from "@/components/pricing-cards";
import { BookingForm } from "@/components/booking-form";
import { SocialProof } from "@/components/social-proof";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { Toaster } from "@/components/ui/toaster";
import { WeatherWidget } from "@/components/weather-widget";
import { HeroSlider } from "@/components/hero-slider";
import { Destinations } from "@/components/destinations";

export default function Home() {
	const [selectedCabType, setSelectedCabType] = useState("");
	const [selectedBookingType, setSelectedBookingType] = useState("");

	const handleCabSelect = (cabType: string) => {
		setSelectedCabType(cabType);
		scrollToSection("booking-form");
	};

	const handleBookingTypeSelect = (bookingType: string) => {
		setSelectedBookingType(bookingType);
		scrollToSection("pricing-cards");
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const headerHeight = 80; // Account for sticky header
			const elementPosition = element.offsetTop - headerHeight;
			window.scrollTo({ top: elementPosition, behavior: "smooth" });
		}
	};

	const scrollToBooking = () => scrollToSection("booking-form");

	const handleDestinationSelect = (destination: string) => {
		// Pre-fill the booking form with the destination
		setSelectedBookingType("outstation");
		scrollToSection("booking-form");
	};

	return (
		<div className="box-border min-h-screen bg-background overflow-x-hidden">
			{/* Sticky Header */}
			<Header />

			{/* Floating Action Buttons */}
			<WhatsAppFloat />

			{/* Hero Slider */}
			<HeroSlider onBookNow={scrollToBooking} />

			{/* Booking Type Cards */}
			<BookingTypeCards onBookingTypeSelect={handleBookingTypeSelect} />

			{/* Pricing Cards */}
			<PricingCards onCabSelect={handleCabSelect} />

			{/* Weather Widget */}
			<div className="max-w-md mx-auto px-4 -mb-10 relative z-10">
				<WeatherWidget />
			</div>

			{/* Booking Form */}
			<BookingForm
				selectedCabType={selectedCabType}
				selectedBookingType={selectedBookingType}
				onBookingTypeChange={setSelectedBookingType}
			/>

			{/* Destinations */}
			<Destinations onBookDestination={handleDestinationSelect} />

			{/* Social Proof */}
			<SocialProof />

			{/* Testimonials */}
			<Testimonials />

			{/* FAQ */}
			<FAQ />

			{/* Footer */}
			<Footer />

			{/* Toast Notifications */}
			<Toaster />
		</div>
	);
}
