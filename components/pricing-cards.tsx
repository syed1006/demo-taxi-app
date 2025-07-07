"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Plane, Car, Users, Luggage, Star, Crown, Bus, Zap, Shield } from "lucide-react"

interface PricingCardsProps {
  onCabSelect: (cabType: string) => void
}

const vehicleCategories = {
  economy: {
    title: "Economy",
    description: "Budget-friendly options for everyday travel",
    icon: Car,
    gradient: "from-green-500 to-emerald-600",
    vehicles: [
      {
        id: "mini",
        name: "Mini",
        subtitle: "4+1 Seater",
        description: "Maruti Alto, Hyundai Eon, Tata Nano, Maruti Wagon R",
        pricing: {
          airport: "₹699",
          hourly4: "₹999",
          hourly8: "₹1,899",
          outstation: "₹10-11",
          driverBata: "₹300",
        },
        features: ["4+1 passengers", "AC Hatchback", "City rides", "Budget friendly"],
        icon: Car,
        image:
          "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-green-500 to-emerald-600",
      },
      {
        id: "sedan",
        name: "Sedan",
        subtitle: "4+1 Seater",
        description: "Toyota Etios, Swift Dzire, Honda Xcent, Honda Amaze",
        pricing: {
          airport: "₹799",
          hourly4: "₹1,200",
          hourly8: "₹2,300",
          outstation: "₹12-13",
          driverBata: "₹400",
        },
        features: ["4+1 passengers", "AC Sedan", "Comfortable seating", "Luggage space"],
        icon: Users,
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        color: "from-blue-500 to-cyan-600",
      },
      {
        id: "electric",
        name: "Electric",
        subtitle: "4+1 Seater",
        description: "Tata Nexon EV, MG ZS EV, Hyundai Kona Electric",
        pricing: {
          airport: "₹849",
          hourly4: "₹1,300",
          hourly8: "₹2,500",
          outstation: "₹13-14",
          driverBata: "₹400",
        },
        features: ["4+1 passengers", "Zero emissions", "Silent ride", "Eco-friendly"],
        icon: Zap,
        image:
          "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-green-400 to-teal-500",
      },
    ],
  },
  premium: {
    title: "Premium",
    description: "Enhanced comfort with premium vehicles",
    icon: Star,
    gradient: "from-purple-500 to-violet-600",
    vehicles: [
      {
        id: "prime-sedan",
        name: "Prime Sedan",
        subtitle: "4+1 Seater",
        description: "Maruti Ciaz, Platinum Etios, Nissan Sunny, Honda City",
        pricing: {
          airport: "₹899",
          hourly4: "₹1,400",
          hourly8: "₹2,600",
          outstation: "₹14",
          driverBata: "₹500",
        },
        features: ["4+1 passengers", "Premium sedan", "Enhanced comfort", "Premium interiors"],
        icon: Star,
        image:
          "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-purple-500 to-violet-600",
      },
      {
        id: "premium-suv",
        name: "Premium SUV",
        subtitle: "6+1 Seater",
        description: "Maruti Ertiga, Mahindra Marazzo, Toyota Rumion",
        pricing: {
          airport: "₹1,299",
          hourly4: "₹1,500",
          hourly8: "₹2,900",
          outstation: "₹15-16",
          driverBata: "₹500",
        },
        features: ["6+1 passengers", "Premium SUV", "Spacious interior", "Comfort ride"],
        icon: Luggage,
        image:
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        color: "from-indigo-500 to-purple-600",
      },
    ],
  },
  suv: {
    title: "SUV",
    description: "Spacious vehicles for groups and families",
    icon: Luggage,
    gradient: "from-orange-500 to-red-600",
    vehicles: [
      {
        id: "suv",
        name: "SUV",
        subtitle: "6+1 to 7+1 Seater",
        description: "Maruti Ertiga, Toyota Innova, Kia Carens, Toyota Rumion",
        pricing: {
          airport: "₹1,499",
          hourly4: "₹1,600-1,900",
          hourly8: "₹3,100-3,500",
          outstation: "₹16-18",
          driverBata: "₹500",
        },
        features: ["6+1 to 7+1 passengers", "Spacious SUV", "Large luggage space", "Group travel"],
        icon: Luggage,
        image:
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        color: "from-orange-500 to-red-600",
      },
      {
        id: "large-suv",
        name: "Large SUV",
        subtitle: "7+1 Seater",
        description: "Mahindra Scorpio, Tata Safari, Mahindra XUV700",
        pricing: {
          airport: "₹1,699",
          hourly4: "₹1,800",
          hourly8: "₹3,400",
          outstation: "₹17-19",
          driverBata: "₹500",
        },
        features: ["7+1 passengers", "Large SUV", "Maximum space", "Powerful engine"],
        icon: Shield,
        image:
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-red-500 to-orange-600",
      },
    ],
  },
  luxury: {
    title: "Luxury",
    description: "Premium luxury vehicles for special occasions",
    icon: Crown,
    gradient: "from-amber-500 to-yellow-600",
    vehicles: [
      {
        id: "luxury-suv",
        name: "Luxury SUV",
        subtitle: "6+1 to 7+1 Seater",
        description: "Innova Crysta, Toyota Innova Hycross, Toyota Fortuner",
        pricing: {
          airport: "₹1,999-2,499",
          hourly4: "Not Available",
          hourly8: "₹3,800-4,800",
          outstation: "₹19-24",
          driverBata: "₹600",
        },
        features: ["6+1 to 7+1 passengers", "Luxury SUV", "Premium comfort", "Executive travel"],
        icon: Crown,
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-amber-500 to-yellow-600",
      },
      {
        id: "premium-luxury",
        name: "Premium Luxury",
        subtitle: "4+1 Seater",
        description: "BMW 3 Series, Audi A4, Mercedes C-Class, Jaguar XE",
        pricing: {
          airport: "₹2,999-3,999",
          hourly4: "Not Available",
          hourly8: "₹5,999-7,999",
          outstation: "₹25-35",
          driverBata: "₹800",
        },
        features: ["4+1 passengers", "Luxury sedan", "Premium experience", "VIP treatment"],
        icon: Crown,
        image:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-yellow-500 to-amber-600",
      },
    ],
  },
  group: {
    title: "Group Travel",
    description: "Large capacity vehicles for big groups",
    icon: Bus,
    gradient: "from-indigo-500 to-blue-600",
    vehicles: [
      {
        id: "tempo-traveller",
        name: "Tempo Traveller",
        subtitle: "12+1 Seater",
        description: "Spacious tempo traveller for large groups and events",
        pricing: {
          airport: "₹3,500-4,000",
          hourly4: "Not Available",
          hourly8: "₹4,499",
          outstation: "₹22-29",
          driverBata: "₹600",
        },
        features: ["12+1 passengers", "Large group travel", "Event transportation", "Ample luggage space"],
        icon: Bus,
        image:
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-indigo-500 to-blue-600",
      },
      {
        id: "mini-bus",
        name: "Mini Bus",
        subtitle: "17+1 Seater",
        description: "Force Traveller, Mahindra Tourister for large groups",
        pricing: {
          airport: "₹4,500-5,500",
          hourly4: "Not Available",
          hourly8: "₹5,999",
          outstation: "₹25-32",
          driverBata: "₹700",
        },
        features: ["17+1 passengers", "Corporate events", "Wedding parties", "Tour groups"],
        icon: Bus,
        image:
          "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-blue-500 to-indigo-600",
      },
      {
        id: "luxury-bus",
        name: "Luxury Bus",
        subtitle: "35+1 Seater",
        description: "Volvo, Mercedes luxury coaches for large groups",
        pricing: {
          airport: "₹8,000-12,000",
          hourly4: "Not Available",
          hourly8: "₹12,999",
          outstation: "₹35-45",
          driverBata: "₹800",
        },
        features: ["35+1 passengers", "AC luxury coach", "Reclining seats", "Entertainment system"],
        icon: Bus,
        image:
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        color: "from-purple-500 to-indigo-600",
      },
    ],
  },
}

export function PricingCards({ onCabSelect }: PricingCardsProps) {
  return (
    <section
      id="pricing-cards"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Choose Your Perfect Ride
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-200 px-4">
            From budget-friendly sedans to luxury SUVs and group travel - we have the perfect vehicle for every journey
          </p>
        </div>

        <Tabs defaultValue="economy" className="w-full">
          {/* Mobile-First Responsive Tabs */}
          <TabsList className="w-full mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-1 rounded-xl shadow-lg">
            {/* Mobile: Horizontal Scrollable Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide w-full space-x-1 md:hidden">
              {Object.entries(vehicleCategories).map(([key, category]) => {
                const CategoryIcon = category.icon
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex-shrink-0 flex flex-col items-center space-y-1 px-3 py-2 min-w-[80px] data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900"
                  >
                    <CategoryIcon className="h-4 w-4" />
                    <span className="text-xs font-medium">{category.title}</span>
                  </TabsTrigger>
                )
              })}
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-5 w-full gap-1">
              {Object.entries(vehicleCategories).map(([key, category]) => {
                const CategoryIcon = category.icon
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900"
                  >
                    <CategoryIcon className="h-4 w-4" />
                    <span className="font-medium">{category.title}</span>
                  </TabsTrigger>
                )
              })}
            </div>
          </TabsList>

          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center mb-6 md:hidden">
            <p className="text-xs text-muted-foreground animate-pulse">← Swipe to see more categories →</p>
          </div>

          {Object.entries(vehicleCategories).map(([categoryKey, category]) => (
            <TabsContent key={categoryKey} value={categoryKey} className="space-y-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center shadow-lg animate-bounce-in`}
                  >
                    <category.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <h3
                  className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {category.title} Vehicles
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground px-4">{category.description}</p>
              </div>

              {/* Horizontal Scrollable Container for Multiple Vehicles */}
              <div className="overflow-x-auto scrollbar-hide pb-4">
                <div className="flex space-x-6 md:grid md:grid-cols-1 md:gap-6 md:space-x-0">
                  {category.vehicles.map((vehicle, index) => {
                    const VehicleIcon = vehicle.icon
                    return (
                      <Card
                        key={vehicle.id}
                        className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer border-2 hover:border-orange-200 dark:hover:border-orange-800 animate-slide-up flex-shrink-0 w-full md:w-auto"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => onCabSelect(vehicle.name)}
                      >
                        {vehicle.popular && (
                          <Badge className="absolute top-4 right-4 bg-orange-500 text-white font-semibold z-10 animate-pulse-soft">
                            Most Popular
                          </Badge>
                        )}

                        {/* Mobile-Optimized Layout */}
                        <div className="flex flex-col md:flex-row">
                          {/* Vehicle Image with Fallback Background */}
                          <div className="relative h-48 md:h-64 md:w-1/3 overflow-hidden">
                            {/* Fallback gradient background - always visible */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.color}`} />

                            {/* Vehicle icon overlay for fallback */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div
                                className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg`}
                              >
                                <VehicleIcon className="h-8 w-8 text-white" />
                              </div>
                            </div>

                            {/* Actual image */}
                            <img
                              src={vehicle.image || "/placeholder.svg"}
                              alt={vehicle.name}
                              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 z-10"
                              loading="lazy"
                              onLoad={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.opacity = "1"
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.opacity = "0"
                              }}
                              style={{ opacity: 0 }}
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 p-4 sm:p-6">
                            <CardHeader className="p-0 mb-4">
                              <div className="flex items-center space-x-4 mb-4">
                                <div
                                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${vehicle.color} flex items-center justify-center shadow-lg animate-bounce-in hover:scale-110 transition-transform duration-300`}
                                >
                                  <VehicleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg sm:text-xl font-bold">{vehicle.name}</CardTitle>
                                  <Badge variant="outline" className="text-xs">
                                    {vehicle.subtitle}
                                  </Badge>
                                </div>
                              </div>
                              <CardDescription className="text-sm leading-relaxed">
                                {vehicle.description}
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="p-0 space-y-4">
                              {/* Mobile-Optimized Pricing Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Airport Transfer */}
                                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3 border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow duration-200">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                      <Plane className="h-4 w-4 text-blue-600" />
                                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Airport
                                      </span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">{vehicle.pricing.airport}</span>
                                  </div>
                                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80">One way pickup/drop</p>
                                </div>

                                {/* 4 Hour Package */}
                                {vehicle.pricing.hourly4 !== "Not Available" && (
                                  <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3 border border-green-200 dark:border-green-800 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-green-600" />
                                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                          4 Hour
                                        </span>
                                      </div>
                                      <span className="text-lg font-bold text-green-600">
                                        {vehicle.pricing.hourly4}
                                      </span>
                                    </div>
                                    <p className="text-xs text-green-600/80 dark:text-green-400/80">40km included</p>
                                  </div>
                                )}

                                {/* 8 Hour Package */}
                                {vehicle.pricing.hourly8 !== "Not Available" && (
                                  <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-3 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                          8 Hour
                                        </span>
                                      </div>
                                      <span className="text-lg font-bold text-purple-600">
                                        {vehicle.pricing.hourly8}
                                      </span>
                                    </div>
                                    <p className="text-xs text-purple-600/80 dark:text-purple-400/80">80km included</p>
                                  </div>
                                )}

                                {/* Outstation */}
                                <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-3 border border-orange-200 dark:border-orange-800 hover:shadow-md transition-shadow duration-200">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="h-4 w-4 text-orange-600" />
                                      <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                        Outstation
                                      </span>
                                    </div>
                                    <span className="text-lg font-bold text-orange-600">
                                      ₹{vehicle.pricing.outstation}/km
                                    </span>
                                  </div>
                                  <p className="text-xs text-orange-600/80 dark:text-orange-400/80">
                                    + Driver bata: {vehicle.pricing.driverBata}
                                  </p>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="grid grid-cols-2 gap-2">
                                {vehicle.features.map((feature, index) => (
                                  <div key={index} className="flex items-center text-xs">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0 animate-pulse-soft" />
                                    <span className="text-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>

                              <Button
                                className="w-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 font-semibold py-3 hover:scale-[1.02] hover:shadow-lg"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onCabSelect(vehicle.name)
                                }}
                              >
                                Select {vehicle.name}
                              </Button>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Scroll Indicator for vehicles */}
              {category.vehicles.length > 1 && (
                <div className="flex justify-center mt-4 md:hidden">
                  <p className="text-xs text-muted-foreground animate-pulse">
                    ← Swipe to see more {category.title.toLowerCase()} vehicles →
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 md:p-12 text-white shadow-2xl hover:shadow-orange-500/25 transition-shadow duration-300">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Need a Custom Quote?</h3>
            <p className="text-sm sm:text-base md:text-lg mb-6 text-orange-100">
              For special events, corporate bookings, or custom requirements, contact us for personalized pricing.
            </p>
            <Button
              onClick={() => {
                const message = "Hi! I need a custom quote for my travel requirements. Can you help me?"
                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
              }}
              className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
