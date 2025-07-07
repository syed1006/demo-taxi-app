"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Search, X } from "lucide-react"

interface MapPickerProps {
  isOpen: boolean
  onClose: () => void
  onLocationSelect: (location: string) => void
  title: string
}

// Mock location data for Bangalore
const popularLocations = [
  { name: "Koramangala", area: "South Bangalore", lat: 12.9352, lng: 77.6245 },
  { name: "Whitefield", area: "East Bangalore", lat: 12.9698, lng: 77.75 },
  { name: "Electronic City", area: "South Bangalore", lat: 12.8456, lng: 77.6603 },
  { name: "MG Road", area: "Central Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Brigade Road", area: "Central Bangalore", lat: 12.9716, lng: 77.6033 },
  { name: "Indiranagar", area: "East Bangalore", lat: 12.9719, lng: 77.6412 },
  { name: "HSR Layout", area: "South Bangalore", lat: 12.9082, lng: 77.6476 },
  { name: "BTM Layout", area: "South Bangalore", lat: 12.9165, lng: 77.6101 },
  { name: "Jayanagar", area: "South Bangalore", lat: 12.9279, lng: 77.5937 },
  { name: "Malleshwaram", area: "North Bangalore", lat: 13.0067, lng: 77.5667 },
]

export function MapPicker({ isOpen, onClose, onLocationSelect, title }: MapPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(popularLocations)

  useEffect(() => {
    if (searchQuery) {
      const filtered = popularLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.area.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(popularLocations)
    }
  }, [searchQuery])

  const handleLocationSelect = (locationName: string) => {
    onLocationSelect(locationName)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-500" />
            {title}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Map Placeholder */}
          <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive Map</p>
              <p className="text-sm text-muted-foreground">Click on locations below or search above</p>
            </div>
          </div>

          {/* Location List */}
          <div className="max-h-48 overflow-y-auto space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Popular Locations</h4>
            {filteredLocations.map((location, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-orange-50 dark:hover:bg-orange-950"
                onClick={() => handleLocationSelect(location.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <div className="text-left">
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-muted-foreground">{location.area}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
