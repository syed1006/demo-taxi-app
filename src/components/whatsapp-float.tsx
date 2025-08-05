"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Phone, Headphones } from "lucide-react"

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in booking a taxi with BangaloreUrbanCabs. Can you please help me with the details?`
    const whatsappNumber = "7022762929"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCallClick = () => {
    window.location.href = "tel:+7022762929"
  }

  const handleClose = () => {
    setIsVisible(false)
    setIsMinimized(true)
  }

  const handleReopen = () => {
    setIsVisible(true)
    setIsMinimized(false)
  }

  // Show minimized state when closed
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
        <Button
          onClick={handleReopen}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-110 transform animate-pulse"
          size="lg"
        >
          <Headphones className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 animate-slide-up">
      {/* Call Button */}
      <div className="relative group">
        <Button
          onClick={handleCallClick}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 transform"
          size="lg"
        >
          <Phone className="h-6 w-6" />
        </Button>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Call us directly
          <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="relative group">
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-110 transform"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        className="self-end h-6 w-6 rounded-full bg-gray-500 hover:bg-gray-600 text-white p-0 transition-all duration-200 hover:scale-110"
        onClick={handleClose}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}
