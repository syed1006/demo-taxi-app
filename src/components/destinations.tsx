"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, ArrowRight, Mountain, Building, TreePine, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

interface DestinationsProps {
  onBookDestination: (destination: string) => void
}

const destinations = {
  bangalore: [
    {
      id: 1,
      name: "Lalbagh Botanical Garden",
      description: "Historic 240-acre garden with glasshouse and diverse plant species",
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "15 km",
      duration: "45 mins",
      oneWay: "₹250",
      roundTrip: "₹450",
      category: "Nature",
      rating: 4.5,
      popular: true,
    },
    {
      id: 2,
      name: "Cubbon Park",
      description: "Green oasis in city center, perfect for jogging and relaxing",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "12 km",
      duration: "35 mins",
      oneWay: "₹200",
      roundTrip: "₹350",
      category: "Nature",
      rating: 4.3,
      popular: false,
    },
    {
      id: 3,
      name: "Bangalore Palace",
      description: "Majestic Tudor-style palace with elegant interiors and royal artifacts",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "18 km",
      duration: "50 mins",
      oneWay: "₹300",
      roundTrip: "₹550",
      category: "Heritage",
      rating: 4.6,
      popular: true,
    },
    {
      id: 4,
      name: "ISKCON Temple",
      description: "Stunning white marble temple with spiritual ambiance",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "20 km",
      duration: "55 mins",
      oneWay: "₹350",
      roundTrip: "₹650",
      category: "Spiritual",
      rating: 4.7,
      popular: false,
    },
    {
      id: 5,
      name: "Wonderla Amusement Park",
      description: "Biggest amusement park with high-thrill rides and water slides",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "25 km",
      duration: "1 hr",
      oneWay: "₹400",
      roundTrip: "₹750",
      category: "Entertainment",
      rating: 4.4,
      popular: true,
    },
  ],
  weekend: [
    {
      id: 6,
      name: "Nandi Hills",
      description: "Scenic hill station with sunrise views and cycling trails",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "60 km",
      duration: "1.5 hrs",
      oneWay: "₹1,200",
      roundTrip: "₹2,000",
      category: "Hills",
      rating: 4.8,
      popular: true,
    },
    {
      id: 7,
      name: "Ramanagara",
      description: "Rocky terrain famous from Sholay movie, ideal for rock climbing",
      image:
        "https://images.unsplash.com/photo-1464822759844-d150baec4ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "50 km",
      duration: "1.2 hrs",
      oneWay: "₹1,000",
      roundTrip: "₹1,800",
      category: "Adventure",
      rating: 4.4,
      popular: false,
    },
    {
      id: 8,
      name: "Shivanasamudra Falls",
      description: "Breathtaking segmented waterfall on the Kaveri River",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "130 km",
      duration: "2.5 hrs",
      oneWay: "₹2,500",
      roundTrip: "₹4,500",
      category: "Waterfalls",
      rating: 4.6,
      popular: true,
    },
    {
      id: 9,
      name: "Mysore",
      description: "Heritage city with grand palace and cultural charm",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "145 km",
      duration: "3 hrs",
      oneWay: "₹3,000",
      roundTrip: "₹5,500",
      category: "Heritage",
      rating: 4.9,
      popular: true,
    },
    {
      id: 10,
      name: "Skandagiri",
      description: "Night trek destination with magical sunrise above clouds",
      image:
        "https://images.unsplash.com/photo-1464822759844-d150baec4ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "60 km",
      duration: "1.5 hrs",
      oneWay: "₹1,200",
      roundTrip: "₹2,200",
      category: "Trekking",
      rating: 4.5,
      popular: false,
    },
  ],
  extended: [
    {
      id: 11,
      name: "Chikmagalur",
      description: "Hill station with lush coffee plantations and trekking trails",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "250 km",
      duration: "4.5 hrs",
      oneWay: "₹5,500",
      roundTrip: "₹10,000",
      category: "Coffee Estates",
      rating: 4.7,
      popular: true,
    },
    {
      id: 12,
      name: "Coorg",
      description: "Scotland of India with misty hills and coffee estates",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "260 km",
      duration: "5 hrs",
      oneWay: "₹6,000",
      roundTrip: "₹11,000",
      category: "Hills",
      rating: 4.8,
      popular: true,
    },
    {
      id: 13,
      name: "Ooty",
      description: "Charming hill station with colonial architecture and toy train",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "270 km",
      duration: "5.5 hrs",
      oneWay: "₹6,500",
      roundTrip: "₹12,000",
      category: "Hills",
      rating: 4.6,
      popular: false,
    },
    {
      id: 14,
      name: "Wayanad",
      description: "Lush Kerala district with forests, waterfalls, and caves",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "290 km",
      duration: "6 hrs",
      oneWay: "₹7,000",
      roundTrip: "₹13,000",
      category: "Nature",
      rating: 4.5,
      popular: false,
    },
    {
      id: 15,
      name: "Hogenakkal Falls",
      description: "Niagara of India with coracle rides and scenic beauty",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      distance: "180 km",
      duration: "3.5 hrs",
      oneWay: "₹4,000",
      roundTrip: "₹7,500",
      category: "Waterfalls",
      rating: 4.4,
      popular: true,
    },
  ],
}

const categoryIcons = {
  Nature: TreePine,
  Heritage: Building,
  Spiritual: Star,
  Hills: Mountain,
  Adventure: Mountain,
  Waterfalls: TreePine,
  "Coffee Estates": TreePine,
  Entertainment: Star,
  Trekking: Mountain,
}

export function Destinations({ onBookDestination }: DestinationsProps) {
  const bangaloreScrollRef = useRef<HTMLDivElement>(null)
  const weekendScrollRef = useRef<HTMLDivElement>(null)
  const extendedScrollRef = useRef<HTMLDivElement>(null)

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 320 // Width of card + gap
      const currentScroll = ref.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      ref.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
    }
  }

  const sections = [
    {
      title: "🏙️ Within Bangalore",
      subtitle: "Explore the Garden City",
      data: destinations.bangalore,
      gradient: "from-green-500 to-emerald-600",
      ref: bangaloreScrollRef,
    },
    {
      title: "🏞️ Weekend Getaways",
      subtitle: "Perfect for short trips",
      data: destinations.weekend,
      gradient: "from-blue-500 to-cyan-600",
      ref: weekendScrollRef,
    },
    {
      title: "🌲 Extended Trips",
      subtitle: "Multi-day adventures",
      data: destinations.extended,
      gradient: "from-purple-500 to-violet-600",
      ref: extendedScrollRef,
    },
  ]

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Popular Destinations
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-200 px-4">
            Discover amazing places around Bangalore with our reliable taxi service. From city attractions to hill
            stations!
          </p>
        </div>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16 sm:mb-20">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h3
                  className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent mb-2 animate-fade-in-up`}
                >
                  {section.title}
                </h3>
                <p className="text-muted-foreground animate-fade-in-up delay-100">{section.subtitle}</p>
              </div>

              {/* Scroll Controls */}
              <div className="hidden sm:flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(section.ref, "left")}
                  className="rounded-full hover:bg-orange-100 dark:hover:bg-orange-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(section.ref, "right")}
                  className="rounded-full hover:bg-orange-100 dark:hover:bg-orange-900"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Horizontal Scrollable Container */}
            <div
              ref={section.ref}
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {section.data.map((destination, index) => {
                const CategoryIcon = categoryIcons[destination.category as keyof typeof categoryIcons] || MapPin
                return (
                  <Card
                    key={destination.id}
                    className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800 animate-slide-up flex-shrink-0 w-80"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => onBookDestination(destination.name)}
                  >
                    {destination.popular && (
                      <Badge className="absolute top-4 right-4 bg-orange-500 text-white font-semibold z-10 animate-pulse-soft">
                        Popular
                      </Badge>
                    )}

                    {/* Full Background Image with Fallback */}
                    <div className="relative h-full min-h-[400px] overflow-hidden">
                      {/* Fallback gradient background - always visible */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />

                      {/* Category icon overlay for fallback */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <CategoryIcon className="h-10 w-10 text-white" />
                        </div>
                      </div>

                      {/* Actual image */}
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 z-10"
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

                      {/* Enhanced gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-20" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-30">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium">
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {destination.category}
                        </Badge>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-16 left-4 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 z-30">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-white text-xs font-semibold">{destination.rating}</span>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-30">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-xl font-bold text-white mb-2">{destination.name}</CardTitle>
                          <p className="text-white/90 text-sm leading-relaxed">{destination.description}</p>
                        </CardHeader>

                        <CardContent className="p-0 space-y-4">
                          {/* Distance & Duration */}
                          <div className="flex items-center justify-between text-sm text-white/80">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{destination.distance}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{destination.duration}</span>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white/80">One Way:</span>
                              <span className="font-bold text-green-400">{destination.oneWay}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white/80">Round Trip:</span>
                              <span className="font-bold text-blue-400">{destination.roundTrip}</span>
                            </div>
                          </div>

                          <Button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold hover:scale-105 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              onBookDestination(destination.name)
                            }}
                          >
                            Book Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="flex justify-center mt-4 sm:hidden">
              <p className="text-xs text-muted-foreground">← Swipe to see more destinations →</p>
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 animate-fade-in-up delay-500">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Don't See Your Destination?</h3>
            <p className="text-lg mb-6 text-orange-100">
              We cover many more destinations! Contact us for custom trips and special packages.
            </p>
            <Button
              onClick={() => {
                const message =
                  "Hi! I'd like to know about trips to destinations not listed on your website. Can you help me?"
                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
              }}
              className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
            >
              Contact Us for Custom Trips
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
