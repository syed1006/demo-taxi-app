"use client"

import { Star, Users, Car, Clock } from "lucide-react"

export function SocialProof() {
  const stats = [
    { icon: Users, value: "50,000+", label: "Happy Customers" },
    { icon: Car, value: "1,000+", label: "Rides Daily" },
    { icon: Star, value: "4.8", label: "Average Rating" },
    { icon: Clock, value: "24/7", label: "Service Available" },
  ]

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 animate-fade-in-up">
            Trusted by Thousands in Bangalore
          </h2>
          <p className="text-lg sm:text-xl text-orange-100 animate-fade-in-up delay-200">
            Join our growing community of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="text-center animate-slide-up hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:scale-110 transition-transform duration-300 animate-bounce-in">
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 animate-count-up">
                  {stat.value}
                </div>
                <div className="text-orange-100 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
