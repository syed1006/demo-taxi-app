"use client"

import { Button } from "@/components/ui/button"
import { Car, MapPin, Clock, Shield, Star, Users } from "lucide-react"

interface HeroSectionProps {
  onBookNow: () => void
}

export function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image from Unsplash */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 via-red-600/70 to-pink-600/80 dark:from-orange-800/90 dark:via-red-800/80 dark:to-pink-800/90" />

      {/* Floating Elements with Indian Theme */}
      <div className="absolute top-20 left-4 sm:left-10 animate-float">
        <Car className="h-6 w-6 sm:h-8 sm:w-8 text-white/40" />
      </div>
      <div className="absolute top-40 right-8 sm:right-16 animate-float-delayed">
        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-300/60" />
      </div>
      <div className="absolute bottom-32 left-8 sm:left-20 animate-float-slow">
        <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-white/30" />
      </div>
      <div className="absolute top-60 right-16 sm:right-32 animate-float-delayed">
        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-300/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
          {/* Brand Logo/Icon */}
          <div className="flex justify-center">
            <div className="bg-white/15 backdrop-blur-sm rounded-full p-4 sm:p-6 border border-white/30 shadow-2xl hover:scale-110 transition-transform duration-500 animate-scale-in">
              <Car className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block animate-slide-in-left">BangaloreCabs</span>
              <span className="block text-orange-300 animate-slide-in-right">ನಮ್ಮ ಸೇವೆ</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-semibold animate-fade-in-up delay-300">
              Bangalore ನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಟ್ಯಾಕ್ಸಿ ಸೇವೆ
            </p>

            <p className="text-base sm:text-lg text-white/85 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400 px-4">
              From Koramangala to Whitefield, MG Road to Electronic City - Your trusted ride partner across Bangalore.
              Safe, reliable, and affordable rides 24/7.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4 animate-fade-in-up delay-500">
            <Button
              onClick={onBookNow}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-orange-500/25 transform hover:scale-110 transition-all duration-300 border-2 border-orange-400 animate-pulse-glow"
            >
              Book Your Ride Now
              <Car className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>

          {/* Features with Indian Context */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in-up delay-600">
              <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-orange-300 mx-auto mb-2 sm:mb-3" />
              <p className="text-white font-semibold text-sm sm:text-lg">24/7 Available</p>
              <p className="text-white/80 text-xs sm:text-sm">Round the clock service</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in-up delay-700">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-300 mx-auto mb-2 sm:mb-3" />
              <p className="text-white font-semibold text-sm sm:text-lg">Safe & Secure</p>
              <p className="text-white/80 text-xs sm:text-sm">Verified drivers</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in-up delay-800">
              <Star className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-300 mx-auto mb-2 sm:mb-3" />
              <p className="text-white font-semibold text-sm sm:text-lg">Top Rated</p>
              <p className="text-white/80 text-xs sm:text-sm">4.8★ customer rating</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in-up delay-900">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300 mx-auto mb-2 sm:mb-3" />
              <p className="text-white font-semibold text-sm sm:text-lg">Local Experts</p>
              <p className="text-white/80 text-xs sm:text-sm">Know Bangalore well</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
