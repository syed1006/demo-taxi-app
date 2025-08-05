"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, Users } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Koramangala",
      rating: 5,
      text: "Excellent service! The driver was punctual and the car was clean. Highly recommend for airport transfers.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Rajesh Kumar",
      location: "Electronic City",
      rating: 5,
      text: "Best taxi service in Bangalore. Professional drivers and reasonable rates. Been using for 2 years now.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Anita Reddy",
      location: "Whitefield",
      rating: 5,
      text: "Safe and reliable. Perfect for late night rides. The booking process is so simple via WhatsApp.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Vikram Singh",
      location: "Indiranagar",
      rating: 5,
      text: "Great for outstation trips. Comfortable cars and experienced drivers who know the routes well.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Meera Nair",
      location: "HSR Layout",
      rating: 5,
      text: "Affordable and punctual. The hourly rental service is perfect for shopping trips around the city.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Arjun Patel",
      location: "BTM Layout",
      rating: 5,
      text: "Corporate travel made easy. Professional service with proper invoicing. Highly recommended for business.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ]

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            What Our Customers Say
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-200 px-4">
            Don't just take our word for it - hear from thousands of satisfied customers across Bangalore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-up border-2 hover:border-blue-200 dark:hover:border-blue-800"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mr-2 sm:mr-3 animate-bounce-in" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current animate-twinkle"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed italic text-sm sm:text-base">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                    {/* Fallback gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500" />

                    {/* Fallback icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>

                    {/* Actual image */}
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="absolute inset-0 w-full h-full object-cover animate-scale-in z-10"
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
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
