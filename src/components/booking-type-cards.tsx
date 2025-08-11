"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Briefcase,
	Camera,
	Clock,
	MapPin,
	Mountain,
	Plane,
	User,
} from "lucide-react";

interface BookingTypeCardsProps {
	onBookingTypeSelect: (bookingType: string) => void;
}

const bookingTypes = [
	{
		id: "point-to-point",
		name: "Point to Point",
		description: "Direct pickup to drop",
		icon: MapPin,
		popular: true,
		color: "from-blue-500 to-cyan-600",
	},
	{
		id: "hourly",
		name: "Hourly Rental",
		description: "Flexible stops, hourly",
		icon: Clock,
		popular: true,
		color: "from-green-500 to-emerald-600",
	},
	{
		id: "airport",
		name: "Airport Transfer",
		description: "To/From BLR airport",
		icon: Plane,
		popular: true,
		color: "from-purple-500 to-violet-600",
	},
	{
		id: "outstation",
		name: "Outstation",
		description: "Travel beyond city",
		icon: Mountain,
		popular: true,
		color: "from-orange-500 to-red-600",
	},
	{
		id: "tour",
		name: "City Tour",
		description: "Explore attractions",
		icon: Camera,
		popular: false,
		color: "from-pink-500 to-rose-600",
	},
	{
		id: "corporate",
		name: "Corporate",
		description: "Business travel",
		icon: Briefcase,
		popular: false,
		color: "from-gray-600 to-gray-800",
	},
	{
		id: "driver-only",
		name: "Spare Driver",
		description: "Hire driver only",
		icon: User,
		popular: true,
		color: "from-amber-500 to-orange-600",
	},
];

export function BookingTypeCards({
	onBookingTypeSelect,
}: BookingTypeCardsProps) {
	return (
		<section
			id="booking-types"
			className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background"
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-6 sm:mb-8">
					<h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
						Choose Your Journey Type
					</h2>
					<p className="text-sm sm:text-base text-muted-foreground">
						Quick selection for your travel needs
					</p>
				</div>

				{/* Mobile-first: Horizontal scroll */}
				<div className="sm:hidden">
					<div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
						{bookingTypes.map((type) => {
							const Icon = type.icon;
							return (
								<button
									key={type.id}
									data-booking-type={type.id}
									onClick={() => onBookingTypeSelect(type.id)}
									className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl border bg-card hover:bg-accent transition-colors min-w-[100px]"
								>
									<div
										className={`w-10 h-10 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}
									>
										<Icon className="h-5 w-5 text-white" />
									</div>
									<div className="text-center">
										<div className="text-xs font-medium leading-tight">
											{type.name}
										</div>
										{type.popular && (
											<Badge className="bg-orange-500 text-white text-[10px] px-1 py-0 mt-1">
												Popular
											</Badge>
										)}
									</div>
								</button>
							);
						})}
					</div>
					<div className="text-center mt-3">
						<p className="text-xs text-muted-foreground">
							← Swipe to see more options
						</p>
					</div>
				</div>

				{/* Desktop and tablet: Compact grid */}
				<div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
					{bookingTypes.map((type) => {
						const Icon = type.icon;
						return (
							<Card
								key={type.id}
								data-booking-type={type.id}
								className="group cursor-pointer border hover:border-orange-200 dark:hover:border-orange-800 transition-all duration-200 hover:shadow-md"
								onClick={() => onBookingTypeSelect(type.id)}
							>
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<div
											className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}
										>
											<Icon className="h-5 w-5 text-white" />
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<h3 className="font-semibold text-sm leading-tight">
													{type.name}
												</h3>
												{type.popular && (
													<Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0">
														Popular
													</Badge>
												)}
											</div>
											<p className="text-xs text-muted-foreground leading-tight">
												{type.description}
											</p>
										</div>
									</div>
									<Button
										size="sm"
										className="w-full mt-3 h-8 text-xs group-hover:bg-orange-500 group-hover:text-white transition-colors"
										onClick={(e) => {
											e.stopPropagation();
											onBookingTypeSelect(type.id);
										}}
									>
										Select
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
