"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { MapPicker } from "@/components/map-picker"
import { FareEstimator } from "@/components/fare-estimator"
import { useToast } from "@/hooks/use-toast"
import {
  MapPin,
  Phone,
  Calendar,
  User,
  MessageCircle,
  AlertCircle,
  Briefcase,
  Map,
  Clock,
  Star,
  CheckCircle2,
} from "lucide-react"

interface BookingFormProps {
  selectedCabType: string
  selectedBookingType: string
  onBookingTypeChange: (type: string) => void
}

interface FormErrors {
  name?: string
  pickup?: string
  drop?: string
  mobile?: string
  date?: string
  time?: string
  cabType?: string
  bookingType?: string
}

const bookingTypes = [
  { id: "point-to-point", name: "Point to Point", description: "Direct ride from pickup to drop" },
  { id: "hourly", name: "Hourly Rental", description: "Book for multiple hours" },
  { id: "airport", name: "Airport Transfer", description: "To/From Bangalore Airport" },
  { id: "outstation", name: "Outstation", description: "Travel outside Bangalore" },
  { id: "tour", name: "City Tour", description: "Sightseeing around Bangalore" },
  { id: "corporate", name: "Corporate", description: "Business travel" },
]

const timeSlots = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
]

export function BookingForm({ selectedCabType, selectedBookingType, onBookingTypeChange }: BookingFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    pickup: "",
    drop: "",
    mobile: "",
    date: "",
    time: "",
    cabType: "",
    bookingType: "",
    notes: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPickupMap, setShowPickupMap] = useState(false)
  const [showDropMap, setShowDropMap] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  useEffect(() => {
    if (selectedCabType) {
      setFormData((prev) => ({ ...prev, cabType: selectedCabType }))
    }
  }, [selectedCabType])

  useEffect(() => {
    if (selectedBookingType) {
      setFormData((prev) => ({ ...prev, bookingType: selectedBookingType }))
    }
  }, [selectedBookingType])

  // Calculate form progress
  useEffect(() => {
    const requiredFields = ["name", "pickup", "mobile", "date", "time", "cabType", "bookingType"]
    if (formData.bookingType !== "hourly" && formData.bookingType !== "tour") {
      requiredFields.push("drop")
    }

    const filledFields = requiredFields.filter((field) => formData[field as keyof typeof formData]?.trim())
    const progress = (filledFields.length / requiredFields.length) * 100
    setFormProgress(progress)
  }, [formData])

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters long"
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Name can only contain letters and spaces"
        break
      case "mobile":
        if (!value.trim()) return "Mobile number is required"
        if (!/^[6-9]\d{9}$/.test(value.replace(/\s+/g, "")))
          return "Please enter a valid 10-digit Indian mobile number starting with 6-9"
        break
      case "pickup":
        if (!value.trim()) return "Pickup location is required"
        if (value.trim().length < 3) return "Please enter a valid pickup location (minimum 3 characters)"
        break
      case "drop":
        if (!value.trim()) return "Drop location is required"
        if (value.trim().length < 3) return "Please enter a valid drop location (minimum 3 characters)"
        if (
          formData.bookingType !== "hourly" &&
          formData.bookingType !== "tour" &&
          value.trim().toLowerCase() === formData.pickup.trim().toLowerCase()
        ) {
          return "Drop location must be different from pickup location"
        }
        break
      case "date":
        if (!value) return "Travel date is required"
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) return "Travel date cannot be in the past"
        const maxDate = new Date()
        maxDate.setDate(maxDate.getDate() + 30)
        if (selectedDate > maxDate) return "Bookings can only be made up to 30 days in advance"
        break
      case "time":
        if (!value) return "Travel time is required"
        break
      case "cabType":
        if (!value) return "Please select a cab type"
        break
      case "bookingType":
        if (!value) return "Please select a booking type"
        break
    }
    return undefined
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [field]: true }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    // Real-time validation for touched fields
    if (touched[field]) {
      const error = validateField(field, value)
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }))
      }
    }

    if (field === "bookingType") {
      onBookingTypeChange(value)
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field as keyof typeof formData])
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const requiredFields = ["name", "pickup", "mobile", "date", "time", "cabType", "bookingType"]

    if (formData.bookingType !== "hourly" && formData.bookingType !== "tour") {
      requiredFields.push("drop")
    }

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData])
      if (error) {
        newErrors[field as keyof FormErrors] = error
      }
    })

    setErrors(newErrors)
    setTouched(requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or contain errors. Please check and try again.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const bookingTypeText = bookingTypes.find((bt) => bt.id === formData.bookingType)?.name || formData.bookingType

      let message = `🚗 *BangaloreCabs Booking Request*\n\n`
      message += `📋 *Booking Details:*\n`
      message += `👤 Name: ${formData.name}\n`
      message += `📱 Mobile: ${formData.mobile}\n`
      message += `🚗 Cab Type: ${formData.cabType}\n`
      message += `📍 Pickup: ${formData.pickup}\n`

      if (formData.bookingType !== "hourly" && formData.bookingType !== "tour") {
        message += `🎯 Drop: ${formData.drop}\n`
      }

      message += `📅 Date: ${formData.date}\n`
      message += `⏰ Time: ${formData.time}\n`
      message += `🎫 Booking Type: ${bookingTypeText}\n`

      if (formData.notes) {
        message += `📝 Notes: ${formData.notes}\n`
      }

      message += `\nPlease confirm the booking and share the fare details. Thank you! 🙏`

      const whatsappNumber = "919876543210"
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

      window.open(whatsappUrl, "_blank")

      toast({
        title: "Booking Request Sent Successfully! 🎉",
        description: "We'll contact you shortly via WhatsApp to confirm your booking and share fare details.",
      })

      // Reset form after successful submission
      setFormData({
        name: "",
        pickup: "",
        drop: "",
        mobile: "",
        date: "",
        time: "",
        cabType: "",
        bookingType: "",
        notes: "",
      })
      setTouched({})
      setErrors({})
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formProgress === 100 && Object.keys(errors).length === 0

  const getFieldStatus = (field: string) => {
    const hasValue = formData[field as keyof typeof formData]?.trim()
    const hasError = errors[field as keyof FormErrors]
    const isTouched = touched[field]

    if (hasError && isTouched) return "error"
    if (hasValue && !hasError) return "success"
    return "default"
  }

  return (
    <>
      <section
        id="booking-form"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in">Book Your Ride</h2>
            <p className="text-xl text-muted-foreground animate-fade-in delay-200">
              Fill in your details and we'll connect you via WhatsApp instantly
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-orange-100 dark:border-orange-900 animate-slide-up">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <MessageCircle className="h-6 w-6" />
                    Booking Details
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    Complete the form below to book your taxi via WhatsApp
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-orange-100 mb-2">Form Progress</div>
                  <div className="flex items-center gap-2">
                    <Progress value={formProgress} className="w-24 h-2" />
                    <span className="text-sm font-semibold">{Math.round(formProgress)}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Booking Type Selection */}
                <div className="space-y-4">
                  <Label htmlFor="bookingType" className="flex items-center gap-2 text-lg font-semibold">
                    <Briefcase className="h-5 w-5 text-orange-500" />
                    Booking Type
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select
                    value={formData.bookingType}
                    onValueChange={(value) => handleInputChange("bookingType", value)}
                  >
                    <SelectTrigger
                      className={`min-h-[56px] data-[state=open]:min-h-[56px] transition-all duration-200 ${
                        getFieldStatus("bookingType") === "error"
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : getFieldStatus("bookingType") === "success"
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : ""
                      }`}
                    >
                      <SelectValue placeholder="Select your booking type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookingTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="min-h-[24px]">
                    {errors.bookingType && touched.bookingType && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{errors.bookingType}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-4">
                    <Label htmlFor="name" className="flex items-center gap-2 text-lg font-semibold">
                      <User className="h-5 w-5 text-orange-500" />
                      Full Name
                      <span className="text-red-500 ml-1">*</span>
                      {getFieldStatus("name") === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={`min-h-[56px] transition-all duration-200 ${
                        getFieldStatus("name") === "error"
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : getFieldStatus("name") === "success"
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : ""
                      }`}
                      required
                    />
                    <div className="min-h-[24px]">
                      {errors.name && touched.name && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="space-y-4">
                    <Label htmlFor="mobile" className="flex items-center gap-2 text-lg font-semibold">
                      <Phone className="h-5 w-5 text-orange-500" />
                      Mobile Number
                      <span className="text-red-500 ml-1">*</span>
                      {getFieldStatus("mobile") === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      onBlur={() => handleBlur("mobile")}
                      className={`min-h-[56px] transition-all duration-200 ${
                        getFieldStatus("mobile") === "error"
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : getFieldStatus("mobile") === "success"
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : ""
                      }`}
                      required
                    />
                    <div className="min-h-[24px]">
                      {errors.mobile && touched.mobile && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errors.mobile}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Pickup Location */}
                  <div className="space-y-4">
                    <Label htmlFor="pickup" className="flex items-center gap-2 text-lg font-semibold">
                      <MapPin className="h-5 w-5 text-green-600" />
                      Pickup Location
                      <span className="text-red-500 ml-1">*</span>
                      {getFieldStatus("pickup") === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="pickup"
                        placeholder="e.g., Koramangala, Bangalore"
                        value={formData.pickup}
                        onChange={(e) => handleInputChange("pickup", e.target.value)}
                        onBlur={() => handleBlur("pickup")}
                        className={`min-h-[56px] flex-1 transition-all duration-200 ${
                          getFieldStatus("pickup") === "error"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : getFieldStatus("pickup") === "success"
                              ? "border-green-500 bg-green-50 dark:bg-green-950"
                              : ""
                        }`}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-14 w-14 flex-shrink-0"
                        onClick={() => setShowPickupMap(true)}
                      >
                        <Map className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="min-h-[24px]">
                      {errors.pickup && touched.pickup && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errors.pickup}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Drop Location */}
                  {formData.bookingType !== "hourly" && formData.bookingType !== "tour" && (
                    <div className="space-y-4">
                      <Label htmlFor="drop" className="flex items-center gap-2 text-lg font-semibold">
                        <MapPin className="h-5 w-5 text-red-600" />
                        Drop Location
                        <span className="text-red-500 ml-1">*</span>
                        {getFieldStatus("drop") === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="drop"
                          placeholder="e.g., Electronic City, Bangalore"
                          value={formData.drop}
                          onChange={(e) => handleInputChange("drop", e.target.value)}
                          onBlur={() => handleBlur("drop")}
                          className={`min-h-[56px] flex-1 transition-all duration-200 ${
                            getFieldStatus("drop") === "error"
                              ? "border-red-500 bg-red-50 dark:bg-red-950"
                              : getFieldStatus("drop") === "success"
                                ? "border-green-500 bg-green-50 dark:bg-green-950"
                                : ""
                          }`}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-14 w-14 flex-shrink-0"
                          onClick={() => setShowDropMap(true)}
                        >
                          <Map className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="min-h-[24px]">
                        {errors.drop && touched.drop && (
                          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <span>{errors.drop}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Date */}
                  <div className="space-y-4">
                    <Label htmlFor="date" className="flex items-center gap-2 text-lg font-semibold">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      Travel Date
                      <span className="text-red-500 ml-1">*</span>
                      {getFieldStatus("date") === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      onBlur={() => handleBlur("date")}
                      min={new Date().toISOString().split("T")[0]}
                      max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                      className={`min-h-[56px] transition-all duration-200 ${
                        getFieldStatus("date") === "error"
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : getFieldStatus("date") === "success"
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : ""
                      }`}
                      required
                    />
                    <div className="min-h-[24px]">
                      {errors.date && touched.date && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errors.date}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="space-y-4">
                    <Label htmlFor="time" className="flex items-center gap-2 text-lg font-semibold">
                      <Clock className="h-5 w-5 text-orange-500" />
                      Travel Time
                      <span className="text-red-500 ml-1">*</span>
                      {getFieldStatus("time") === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                      <SelectTrigger
                        className={`min-h-[56px] data-[state=open]:min-h-[56px] transition-all duration-200 ${
                          getFieldStatus("time") === "error"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : getFieldStatus("time") === "success"
                              ? "border-green-500 bg-green-50 dark:bg-green-950"
                              : ""
                        }`}
                      >
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="min-h-[24px]">
                      {errors.time && touched.time && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errors.time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cab Type */}
                  <div className="space-y-4">
                    <Label htmlFor="cabType" className="flex items-center gap-2 text-lg font-semibold">
                      <Star className="h-5 w-5 text-orange-500" />
                      Cab Type
                      <span className="text-red-500 ml-1">*</span>
                      {getFieldStatus("cabType") === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Select value={formData.cabType} onValueChange={(value) => handleInputChange("cabType", value)}>
                      <SelectTrigger
                        className={`min-h-[56px] data-[state=open]:min-h-[56px] transition-all duration-200 ${
                          getFieldStatus("cabType") === "error"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : getFieldStatus("cabType") === "success"
                              ? "border-green-500 bg-green-50 dark:bg-green-950"
                              : ""
                        }`}
                      >
                        <SelectValue placeholder="Select cab" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mini">Mini (₹12/km)</SelectItem>
                        <SelectItem value="Sedan">Sedan (₹15/km)</SelectItem>
                        <SelectItem value="SUV">SUV (₹20/km)</SelectItem>
                        <SelectItem value="Premium">Premium (₹25/km)</SelectItem>
                        <SelectItem value="Electric">Electric (₹13/km)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="min-h-[24px]">
                      {errors.cabType && touched.cabType && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errors.cabType}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fare Estimator */}
                {formData.pickup && formData.drop && formData.cabType && (
                  <FareEstimator
                    pickup={formData.pickup}
                    drop={formData.drop}
                    cabType={formData.cabType}
                    bookingType={formData.bookingType}
                  />
                )}

                {/* Additional Notes */}
                <div className="space-y-4">
                  <Label htmlFor="notes" className="text-lg font-semibold">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements, landmarks, or instructions..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                    className="resize-none min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-xl rounded-xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Sending Request...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-6 w-6" />
                      Book via WhatsApp
                    </div>
                  )}
                </Button>

                {!isFormValid && (
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Please complete all required fields to proceed with your booking
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Form completion: {Math.round(formProgress)}%
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map Pickers */}
      <MapPicker
        isOpen={showPickupMap}
        onClose={() => setShowPickupMap(false)}
        onLocationSelect={(location) => handleInputChange("pickup", location)}
        title="Select Pickup Location"
      />

      <MapPicker
        isOpen={showDropMap}
        onClose={() => setShowDropMap(false)}
        onLocationSelect={(location) => handleInputChange("drop", location)}
        title="Select Drop Location"
      />
    </>
  )
}
