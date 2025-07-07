"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Car, MapPin, Clock, Shield, Star, Users, ChevronLeft, ChevronRight, Plane, Mountain } from "lucide-react"

interface HeroSliderProps {
  onBookNow: () => void
}

const slides = [
  {
    id: 1,
    title: "BangaloreCabs",
    subtitle: "ನಮ್ಮ ಸೇವೆ",
    description:
      "From Koramangala to Whitefield, MG Road to Electronic City - Your trusted ride partner across Bangalore.",
    cta: "Book Your Ride Now",
    background:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    theme: "from-orange-600/80 via-red-600/70 to-pink-600/80",
    icon: Car,
    features: [
      { icon: Clock, title: "24/7 Available", desc: "Round the clock service" },
      { icon: Shield, title: "Safe & Secure", desc: "Verified drivers" },
      { icon: Star, title: "Top Rated", desc: "4.8★ customer rating" },
      { icon: Users, title: "Local Experts", desc: "Know Bangalore well" },
    ],
  },
  {
    id: 2,
    title: "Airport Transfers",
    subtitle: "✈️ Seamless Journey",
    description:
      "Professional airport transfers with flight tracking, meet & greet service, and luggage assistance. Never miss a flight again!",
    cta: "Book Airport Ride",
    background:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    theme: "from-blue-600/80 via-purple-600/70 to-indigo-600/80",
    icon: Plane,
    features: [
      { icon: Plane, title: "Flight Tracking", desc: "Real-time monitoring" },
      { icon: Users, title: "Meet & Greet", desc: "Personal assistance" },
      { icon: Shield, title: "Reliable", desc: "On-time guarantee" },
      { icon: Star, title: "Premium", desc: "Luxury vehicles" },
    ],
  },
  {
    id: 3,
    title: "Outstation Adventures",
    subtitle: "🏔️ Explore Beyond",
    description:
      "Discover beautiful destinations around Bangalore. From Nandi Hills to Mysore, Coorg to Ooty - adventure awaits!",
    cta: "Plan Your Trip",
    background:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    theme: "from-green-600/80 via-teal-600/70 to-emerald-600/80",
    icon: Mountain,
    features: [
      { icon: Mountain, title: "Hill Stations", desc: "Scenic destinations" },
      { icon: Car, title: "Comfortable", desc: "Long distance ready" },
      { icon: MapPin, title: "Local Guides", desc: "Know best routes" },
      { icon: Clock, title: "Flexible", desc: "Custom itineraries" },
    ],
  },
  {
    id: 4,
    title: "Corporate Travel",
    subtitle: "💼 Business Class",
    description:
      "Professional business travel solutions with premium vehicles, punctual service, and invoice support for corporate clients.",
    cta: "Corporate Booking",
    background:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    theme: "from-gray-700/80 via-slate-600/70 to-zinc-600/80",
    icon: Users,
    features: [
      { icon: Users, title: "Professional", desc: "Business class service" },
      { icon: Shield, title: "Reliable", desc: "Always on time" },
      { icon: Star, title: "Premium", desc: "Executive vehicles" },
      { icon: Clock, title: "Efficient", desc: "Quick bookings" },
    ],
  },
]

export function HeroSlider({ onBookNow }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentSlideData = slides[currentSlide]
  const IconComponent = currentSlideData.icon

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Fallback */}
      {slides.map((slide, index) => (
        <div key={slide.id} className="absolute inset-0">
          {/* Fallback gradient background - always visible */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.theme} transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Actual background image */}
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${slide.background}')`,
              opacity: index === currentSlide ? 1 : 0,
            }}
            onError={(e) => {
              const target = e.target as HTMLDivElement
              target.style.opacity = "0"
            }}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.theme} dark:opacity-90 transition-all duration-1000`}
      />

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-full w-12 h-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-full w-12 h-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Floating Elements */}
      <div className="absolute top-20 left-4 sm:left-10 animate-float">
        <Car className="h-6 w-6 sm:h-8 sm:w-8 text-white/40" />
      </div>
      <div className="absolute top-40 right-8 sm:right-16 animate-float-delayed">
        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-300/60" />
      </div>
      <div className="absolute bottom-32 left-8 sm:left-20 animate-float-slow">
        <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mt-20">
        <div className="space-y-6 sm:space-y-8">
          {/* Brand Logo/Icon */}
          <div className="flex justify-center">
            <div className="bg-white/15 backdrop-blur-sm rounded-full p-4 sm:p-6 border border-white/30 shadow-2xl hover:scale-110 transition-transform duration-500 animate-scale-in">
              <IconComponent className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block animate-slide-in-left">{currentSlideData.title}</span>
              <span className="block text-orange-300 animate-slide-in-right">{currentSlideData.subtitle}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400 px-4">
              {currentSlideData.description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4 animate-fade-in-up delay-500">
            <Button
              onClick={onBookNow}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-orange-500/25 transform hover:scale-110 transition-all duration-300 border-2 border-orange-400 animate-pulse-glow"
            >
              {currentSlideData.cta}
              <IconComponent className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
            {currentSlideData.features.map((feature, index) => {
              const FeatureIcon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <FeatureIcon className="h-8 w-8 sm:h-10 sm:w-10 text-orange-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-white font-semibold text-sm sm:text-lg">{feature.title}</p>
                  <p className="text-white/80 text-xs sm:text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
