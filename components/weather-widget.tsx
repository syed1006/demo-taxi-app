"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    feelsLike: 32,
  })

  useEffect(() => {
    // Mock weather data - in real app, fetch from weather API
    // TODO: Integrate with a real weather service like OpenWeatherMap API
    const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"]
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    const randomTemp = Math.floor(Math.random() * 10) + 25 // 25-35°C

    setWeather({
      temperature: randomTemp,
      condition: randomCondition,
      humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
      windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
      visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
      feelsLike: randomTemp + Math.floor(Math.random() * 6) + 2, // +2 to +8°C
    })
  }, [])

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "Sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "Partly Cloudy":
        return <Cloud className="h-8 w-8 text-blue-400" />
      case "Cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "Light Rain":
        return <CloudRain className="h-8 w-8 text-blue-600" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const getWeatherGradient = () => {
    switch (weather.condition) {
      case "Sunny":
        return "from-yellow-400 via-orange-400 to-red-400"
      case "Partly Cloudy":
        return "from-blue-400 via-cyan-400 to-teal-400"
      case "Cloudy":
        return "from-gray-400 via-slate-400 to-zinc-400"
      case "Light Rain":
        return "from-blue-500 via-indigo-500 to-purple-500"
      default:
        return "from-yellow-400 via-orange-400 to-red-400"
    }
  }

  return (
    <Card
      className={`bg-gradient-to-br ${getWeatherGradient()} text-white border-none shadow-2xl overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">{getWeatherIcon()}</div>
            <div>
              <h3 className="text-2xl font-bold">{weather.temperature}°C</h3>
              <p className="text-white/90 font-medium">{weather.condition}</p>
              <p className="text-white/70 text-sm">Bangalore, Karnataka</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-white/80 text-sm mb-1">
              <Thermometer className="h-3 w-3" />
              <span>Feels like {weather.feelsLike}°C</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-white/80" />
              <span className="text-xs text-white/70">Wind</span>
            </div>
            <p className="font-semibold">{weather.windSpeed} km/h</p>
          </div>
          <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="h-4 w-4 text-white/80" />
              <span className="text-xs text-white/70">Humidity</span>
            </div>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="h-4 w-4 text-white/80" />
              <span className="text-xs text-white/70">Visibility</span>
            </div>
            <p className="font-semibold">{weather.visibility} km</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm font-medium">Perfect weather for your ride today! 🚗</p>
        </div>
      </CardContent>
    </Card>
  )
}
