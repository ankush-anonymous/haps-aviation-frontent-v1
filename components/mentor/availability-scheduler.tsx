"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AvailabilitySchedulerProps {
  selectedSlots: string[]
  onSlotsChange: (slots: string[]) => void
}

export default function AvailabilityScheduler({ selectedSlots, onSlotsChange }: AvailabilitySchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])

  // Generate next 7 days
  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        date: date.toISOString().split("T")[0],
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString("en-US", { month: "short" }),
      })
    }
    return dates
  }

  const dates = generateDates()

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ]

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    // Clear selected times when date changes
    setSelectedTimes([])
  }

  const handleTimeToggle = (time: string) => {
    setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  const handleContinue = () => {
    if (selectedDate && selectedTimes.length > 0) {
      const selectedDateObj = dates.find((d) => d.date === selectedDate)
      if (selectedDateObj) {
        const newSlots = selectedTimes.map(
          (time) => `${selectedDateObj.dayName} ${selectedDateObj.dayNumber} ${selectedDateObj.monthName} ${time}`,
        )
        onSlotsChange([...selectedSlots, ...newSlots])
        // Reset selections
        setSelectedDate("")
        setSelectedTimes([])
      }
    }
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200">
      <CardHeader>
        <CardTitle className="text-gray-800">When should we meet?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex space-x-2">
            {dates.map((date) => (
              <Button
                key={date.date}
                variant={selectedDate === date.date ? "default" : "outline"}
                className={`flex flex-col p-3 h-auto ${
                  selectedDate === date.date
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
                onClick={() => handleDateSelect(date.date)}
              >
                <span className="text-xs">{date.dayName}</span>
                <span className="text-sm font-medium">
                  {date.dayNumber} {date.monthName}
                </span>
              </Button>
            ))}
          </div>

          <Button variant="ghost" size="sm" className="text-gray-600">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Select time of day</h3>
              <div className="grid grid-cols-4 gap-3">
               {timeSlots
                  .filter((time) => !selectedSlots.some((slot) => slot.includes(time))) // Remove already added time slots globally
                  .map((time) => (
                    <Button
                      key={time}
                      variant={selectedTimes.includes(time) ? "default" : "outline"}
                      className={`p-3 ${
                        selectedTimes.includes(time)
                          ? "bg-blue-500 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                      }`}
                      onClick={() => handleTimeToggle(time)}
                    >
                      {time}
                    </Button>
                ))}

              </div>
            </div>

            {/* Timezone */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Timezone</h3>
              <Select defaultValue="gmt+5:30">
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt+5:30">(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi</SelectItem>
                  <SelectItem value="gmt+0">(GMT+0) London, Dublin</SelectItem>
                  <SelectItem value="gmt-5">(GMT-5) New York, Toronto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={selectedTimes.length === 0}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3"
            >
              Add Selected Slots
            </Button>
          </>
        )}

        {/* Current Selected Slots */}
        {selectedSlots.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Current Availability</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedSlots.map((slot, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                  <span className="text-sm text-gray-700">{slot}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSlotsChange(selectedSlots.filter((_, i) => i !== index))}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
