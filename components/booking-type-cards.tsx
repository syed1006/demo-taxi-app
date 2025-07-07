"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Plane, Mountain, Camera, Briefcase } from "lucide-react"

interface BookingTypeCardsProps {
  onBookingTypeSelect: (bookingType: string) => void
}

const bookingTypes = [
  {
    id: "point-to-point",
    name: "Point to Point",
    description: "Direct ride from pickup to drop location",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: true,
    features: ["Direct route", "Fixed pricing", "Quick booking"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "hourly",
    name: "Hourly Rental",
    description: "Book for multiple hours with flexible stops",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: false,
    features: ["Multiple stops", "Flexible timing", "Wait time included"],
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "airport",
    name: "Airport Transfer",
    description: "Reliable transfers to/from Bangalore Airport",
    icon: Plane,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: true,
    features: ["Flight tracking", "Meet & greet", "Luggage assistance"],
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "outstation",
    name: "Outstation",
    description: "Travel outside Bangalore to nearby cities",
    icon: Mountain,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: false,
    features: ["Long distance", "Driver allowance", "Fuel included"],
    color: "from-orange-500 to-red-600",
  },
  {
    id: "tour",
    name: "City Tour",
    description: "Explore Bangalore's attractions with guided tours",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: false,
    features: ["Tourist spots", "Local guide", "Photo stops"],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional business travel solutions",
    icon: Briefcase,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: false,
    features: ["Business class", "Invoice support", "Priority booking"],
    color: "from-gray-600 to-gray-800",
  },
]

export function BookingTypeCards({ onBookingTypeSelect }: BookingTypeCardsProps) {
  return (
    <section id="booking-types" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Choose Your Journey Type
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-200 px-4">
            From quick city rides to long outstation trips - we have the perfect service for every travel need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bookingTypes.map((type, index) => {
            const IconComponent = type.icon
            return (
              <Card
                key={type.id}
                data-booking-type={type.id}
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-2 hover:border-orange-200 dark:hover:border-orange-800 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onBookingTypeSelect(type.id)}
              >
                {type.popular && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white font-semibold z-10 animate-pulse-soft">
                    Popular
                  </Badge>
                )}

                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  {/* Fallback gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color}`} />

                  {/* Icon overlay for fallback */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Actual image */}
                  <img
                    src={type.image || "/placeholder.svg"}
                    alt={type.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 z-10"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />

                  <div
                    className={`absolute bottom-4 left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-bounce-in z-30`}
                  >
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>

                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold">{type.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{type.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6">
                  <ul className="space-y-2">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0 animate-pulse-soft" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 font-semibold py-2 sm:py-3 hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation()
                      onBookingTypeSelect(type.id)
                    }}
                  >
                    Select {type.name}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
