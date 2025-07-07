"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, MapPin, Clock, IndianRupee } from "lucide-react"

interface FareEstimatorProps {
  pickup: string
  drop: string
  cabType: string
  bookingType: string
}

const cabRates = {
  Mini: { baseKm: 12, baseFare: 50, waitingCharges: 2 },
  Sedan: { baseKm: 15, baseFare: 80, waitingCharges: 3 },
  SUV: { baseKm: 20, baseFare: 120, waitingCharges: 4 },
  Premium: { baseKm: 25, baseFare: 200, waitingCharges: 5 },
  Electric: { baseKm: 13, baseFare: 60, waitingCharges: 2 },
}

export function FareEstimator({ pickup, drop, cabType, bookingType }: FareEstimatorProps) {
  const [estimatedFare, setEstimatedFare] = useState<{
    distance: number
    baseFare: number
    totalFare: number
    duration: number
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (pickup && drop && cabType) {
      calculateFare()
    }
  }, [pickup, drop, cabType, bookingType])

  const calculateFare = async () => {
    setIsCalculating(true)

    // Simulate API call for distance calculation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock distance calculation based on location names
    const mockDistance = Math.floor(Math.random() * 25) + 5 // 5-30 km
    const mockDuration = Math.floor(mockDistance * 2.5) // Rough estimate in minutes

    const rates = cabRates[cabType as keyof typeof cabRates]
    const baseFare = rates.baseFare
    const distanceFare = mockDistance * rates.baseKm

    let totalFare = baseFare + distanceFare

    // Add booking type multipliers
    if (bookingType === "airport") totalFare *= 1.2
    if (bookingType === "outstation") totalFare *= 1.5
    if (bookingType === "corporate") totalFare *= 1.1

    setEstimatedFare({
      distance: mockDistance,
      baseFare,
      totalFare: Math.round(totalFare),
      duration: mockDuration,
    })

    setIsCalculating(false)
  }

  if (!pickup || !drop || !cabType) return null

  return (
    <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-green-600" />
          Estimated Fare
          <Badge variant="secondary" className="text-xs">
            Approximate
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isCalculating ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-muted-foreground">Calculating fare...</span>
          </div>
        ) : estimatedFare ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Distance:</span>
                <span className="font-semibold">{estimatedFare.distance} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Duration:</span>
                <span className="font-semibold">{estimatedFare.duration} mins</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Base Fare:</span>
                <span className="font-medium">₹{estimatedFare.baseFare}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Distance Fare:</span>
                <span className="font-medium">₹{estimatedFare.totalFare - estimatedFare.baseFare}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold border-t pt-2">
                <span className="flex items-center gap-1">
                  <IndianRupee className="h-5 w-5" />
                  Total Estimated Fare:
                </span>
                <span className="text-green-600">₹{estimatedFare.totalFare}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              * Final fare may vary based on traffic, tolls, and waiting time
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
