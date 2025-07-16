"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { mentorAPI } from "@/lib/api"

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

const timezones = [
  "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi",
  "(GMT+0:00) London, Dublin",
  "(GMT-5:00) New York, Toronto",
  "(GMT-8:00) Los Angeles, Vancouver",
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function MentorAvailability() {
  const [mentorData, setMentorData] = useState<any>(null)
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0])
  const [availabilitySlots, setAvailabilitySlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("mentorData")
    if (data) {
      const mentor = JSON.parse(data)
      setMentorData(mentor)
      setAvailabilitySlots(mentor.availability_slots || [])
    }
  }, [])

  const getWeekDates = (weekOffset: number) => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() + weekOffset * 7)

    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const formatDate = (date: Date) => {
    const day = daysOfWeek[date.getDay()]
    const dayNum = date.getDate()
    const month = date.toLocaleDateString("en-US", { month: "short" })
    return { day, dayNum, month, fullDate: date.toISOString().split("T")[0] }
  }

  const weekDates = getWeekDates(currentWeek)

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr)
    setSelectedTimes([])
  }

  const handleTimeSelect = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time))
    } else {
      setSelectedTimes([...selectedTimes, time])
    }
  }

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(" ")
    let [hours, minutes] = time.split(":")
    if (hours === "12") {
      hours = "00"
    }
    if (modifier === "PM") {
      hours = (Number.parseInt(hours, 10) + 12).toString()
    }
    return `${hours}:${minutes}`
  }

  const handleSaveAvailability = async () => {
    if (!selectedDate || selectedTimes.length === 0) {
      alert("Please select a date and at least one time slot")
      return
    }

    setIsLoading(true)

    try {
      const selectedDateObj = new Date(selectedDate)
      const dayName = daysOfWeek[selectedDateObj.getDay()]

      // Group consecutive time slots
      const sortedTimes = selectedTimes.sort((a, b) => {
        const timeA = convertTo24Hour(a)
        const timeB = convertTo24Hour(b)
        return timeA.localeCompare(timeB)
      })

      // Create time ranges
      const newSlots = []
      let rangeStart = sortedTimes[0]
      let rangeEnd = sortedTimes[0]

      for (let i = 1; i < sortedTimes.length; i++) {
        const currentTime = convertTo24Hour(sortedTimes[i])
        const prevTime = convertTo24Hour(sortedTimes[i - 1])

        const currentHour = Number.parseInt(currentTime.split(":")[0])
        const prevHour = Number.parseInt(prevTime.split(":")[0])

        if (currentHour === prevHour + 1) {
          rangeEnd = sortedTimes[i]
        } else {
          // End current range and start new one
          const startTime24 = convertTo24Hour(rangeStart)
          const endTime24 = convertTo24Hour(rangeEnd)
          const endHour = Number.parseInt(endTime24.split(":")[0]) + 1
          const endTimeFormatted = `${endHour.toString().padStart(2, "0")}:00`

          newSlots.push(`${dayName} ${startTime24}-${endTimeFormatted}`)
          rangeStart = sortedTimes[i]
          rangeEnd = sortedTimes[i]
        }
      }

      // Add the last range
      const startTime24 = convertTo24Hour(rangeStart)
      const endTime24 = convertTo24Hour(rangeEnd)
      const endHour = Number.parseInt(endTime24.split(":")[0]) + 1
      const endTimeFormatted = `${endHour.toString().padStart(2, "0")}:00`

      newSlots.push(`${dayName} ${startTime24}-${endTimeFormatted}`)

      // Remove existing slots for the same day and add new ones
      const filteredSlots = availabilitySlots.filter((slot) => !slot.startsWith(dayName))
      const updatedSlots = [...filteredSlots, ...newSlots]

      if (mentorData?.id) {
        await mentorAPI.updateMentorById(mentorData.id, {
          ...mentorData,
          availability_slots: updatedSlots,
        })

        // Update localStorage
        const updatedMentor = { ...mentorData, availability_slots: updatedSlots }
        localStorage.setItem("mentorData", JSON.stringify(updatedMentor))
        setMentorData(updatedMentor)
        setAvailabilitySlots(updatedSlots)

        alert("Availability updated successfully!")
        setSelectedDate("")
        setSelectedTimes([])
      }
    } catch (error) {
      console.error("Failed to update availability:", error)
      alert("Failed to update availability. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Availability</h1>
        <p className="text-gray-600 mt-1">Set your available time slots for mentoring sessions</p>
      </div>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader>
          <CardTitle className="text-gray-900">When should we meet?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="border-orange-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium text-gray-700">
              {currentWeek === 0 ? "This Week" : currentWeek === 1 ? "Next Week" : `Week ${currentWeek + 1}`}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="border-orange-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, index) => {
              const { day, dayNum, month, fullDate } = formatDate(date)
              const isSelected = selectedDate === fullDate
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(fullDate)}
                  className={cn(
                    "p-3 rounded-lg text-center transition-colors border",
                    isSelected
                      ? "bg-orange-600 text-white border-orange-600"
                      : isToday
                        ? "bg-orange-100 text-orange-600 border-orange-300"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50",
                  )}
                >
                  <div className="text-xs font-medium">{day.slice(0, 3)}</div>
                  <div className="text-lg font-bold">
                    {dayNum} {month}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Select time of day</h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTimes.includes(time)
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                          "p-2 rounded-lg text-sm font-medium transition-colors border",
                          isSelected
                            ? "bg-orange-600 text-white border-orange-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50",
                        )}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Timezone Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Timezone</h3>
                <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone} value={timezone}>
                        {timezone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveAvailability}
                disabled={isLoading || selectedTimes.length === 0}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                {isLoading ? (
                  <>
                    <Save className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Current Availability */}
      {availabilitySlots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Availability</CardTitle>
            <CardDescription>Your currently set availability slots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availabilitySlots.map((slot, index) => (
                <div key={index} className="p-2 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                  {slot}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
