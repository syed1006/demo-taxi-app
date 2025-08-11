"use client";

import {
	Car,
	Phone,
	Mail,
	MapPin,
	Clock,
	Star,
	Facebook,
	Twitter,
	Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHATSAPP_NUMBER } from "@/constants";

export function Footer() {
	const currentYear = new Date().getFullYear();

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const scrollToBookingType = (bookingTypeId: string) => {
		// First scroll to the booking types section
		const bookingTypesSection = document.getElementById("booking-types");
		if (bookingTypesSection) {
			bookingTypesSection.scrollIntoView({ behavior: "smooth" });

			// Then highlight the specific card after a short delay
			setTimeout(() => {
				const specificCard = document.querySelector(
					`[data-booking-type="${bookingTypeId}"]`
				);
				if (specificCard) {
					specificCard.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
					// Add a temporary highlight effect
					specificCard.classList.add(
						"ring-4",
						"ring-orange-400",
						"ring-opacity-75"
					);
					setTimeout(() => {
						specificCard.classList.remove(
							"ring-4",
							"ring-orange-400",
							"ring-opacity-75"
						);
					}, 2000);
				}
			}, 500);
		}
	};

	return (
		<footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-6">
						<div className="flex items-center space-x-3">
							<div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
								<Car className="h-8 w-8 text-white" />
							</div>
							<div>
								<h3 className="text-2xl font-bold">
									BangaloreCabs
								</h3>
								<p className="text-orange-300">ನಮ್ಮ ಸೇವೆ</p>
							</div>
						</div>
						<p className="text-gray-300 leading-relaxed">
							Your trusted ride partner across Bangalore. Safe,
							reliable, and affordable taxi service available
							24/7.
						</p>
						<div className="flex space-x-4">
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-orange-500/20"
							>
								<Facebook className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-orange-500/20"
							>
								<Twitter className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-orange-500/20"
							>
								<Instagram className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-6">
						<h4 className="text-xl font-semibold text-orange-300">
							Quick Links
						</h4>
						<ul className="space-y-3">
							<li>
								<button
									onClick={() => scrollToSection("hero")}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									About Us
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToSection("booking-types")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Our Services
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToSection("pricing-cards")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Pricing
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToSection("testimonials")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Reviews
								</button>
							</li>
							<li>
								<button
									onClick={() => scrollToSection("faq")}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									FAQ
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToSection("booking-form")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Contact
								</button>
							</li>
						</ul>
					</div>

					{/* Services */}
					<div className="space-y-6">
						<h4 className="text-xl font-semibold text-orange-300">
							Our Services
						</h4>
						<ul className="space-y-3">
							<li>
								<button
									onClick={() =>
										scrollToBookingType("point-to-point")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Point to Point
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToBookingType("airport")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Airport Transfer
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToBookingType("hourly")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Hourly Rental
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToBookingType("outstation")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Outstation
								</button>
							</li>
							<li>
								<button
									onClick={() => scrollToBookingType("tour")}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									City Tours
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										scrollToBookingType("corporate")
									}
									className="text-gray-300 hover:text-orange-300 transition-colors"
								>
									Corporate Travel
								</button>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className="space-y-6">
						<h4 className="text-xl font-semibold text-orange-300">
							Contact Us
						</h4>
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<Phone className="h-5 w-5 text-orange-400" />
								<span className="text-gray-300">
									+91 {WHATSAPP_NUMBER}
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<Mail className="h-5 w-5 text-orange-400" />
								<span className="text-gray-300">
									info@bangalorecabs.com
								</span>
							</div>
							<div className="flex items-start space-x-3">
								<MapPin className="h-5 w-5 text-orange-400 mt-1" />
								<span className="text-gray-300">
									RMV 2nd stage, Bhoopasandra, Bangalore
									<br />
									Karnataka 560094
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<Clock className="h-5 w-5 text-orange-400" />
								<span className="text-gray-300">
									24/7 Available
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Newsletter */}
				<div className="mt-12 pt-8 border-t border-gray-700">
					<div className="max-w-md mx-auto text-center">
						<h4 className="text-xl font-semibold text-orange-300 mb-4">
							Stay Updated
						</h4>
						<p className="text-gray-300 mb-6">
							Get the latest offers and updates delivered to your
							inbox
						</p>
						<div className="flex space-x-2">
							<Input
								placeholder="Enter your email"
								className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
							/>
							<Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
								Subscribe
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-700 bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-gray-400 text-sm">
							© {currentYear} BangaloreCabs. All rights reserved.
							Made with ❤️ in Bangalore.
						</p>
						<div className="flex items-center space-x-6 text-sm text-gray-400">
							<a
								href="#"
								className="hover:text-orange-300 transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="hover:text-orange-300 transition-colors"
							>
								Terms of Service
							</a>
							<div className="flex items-center space-x-1">
								<Star className="h-4 w-4 text-yellow-400 fill-current" />
								<span>4.8/5 Rating</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
