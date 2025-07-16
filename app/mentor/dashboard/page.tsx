"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, Star, Users, TrendingUp, Edit } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { MentorResponse } from "@/lib/api"

interface Meeting {
  id: string
  menteeName: string
  date: string
  time: string
  duration: string
  status: "Upcoming" | "Completed" | "Cancelled"
  topic: string
  amount: number
}

interface Feedback {
  id: string
  menteeName: string
  rating: number
  comment: string
  date: string
}

export default function MentorDashboard() {
  const [mentor, setMentor] = useState<MentorResponse | null>(null)

  useEffect(() => {
    const mentorData = localStorage.getItem("mentorData")
    if (mentorData) {
      setMentor(JSON.parse(mentorData))
    }
  }, [])

  // Mock earnings data
  const earningsData = [
    { month: "Jan", earnings: 12000 },
    { month: "Feb", earnings: 15000 },
    { month: "Mar", earnings: 18000 },
    { month: "Apr", earnings: 22000 },
    { month: "May", earnings: 25000 },
    { month: "Jun", earnings: 28000 },
  ]

  // Mock meetings data
  const meetings: Meeting[] = [
    {
      id: "1",
      menteeName: "Rahul Kumar",
      date: "2024-01-25",
      time: "14:00",
      duration: "90 min",
      status: "Upcoming",
      topic: "DGCA Exam Preparation",
      amount: 1499,
    },
    {
      id: "2",
      menteeName: "Priya Patel",
      date: "2024-01-26",
      time: "10:00",
      duration: "60 min",
      status: "Upcoming",
      topic: "Flight School Selection",
      amount: 1499,
    },
    {
      id: "3",
      menteeName: "Amit Singh",
      date: "2024-01-24",
      time: "16:00",
      duration: "90 min",
      status: "Completed",
      topic: "Career Guidance",
      amount: 1499,
    },
  ]

  // Mock feedback data
  const feedbacks: Feedback[] = [
    {
      id: "1",
      menteeName: "Rahul Kumar",
      rating: 5,
      comment: "Excellent guidance on DGCA exam preparation. Very knowledgeable and patient.",
      date: "2024-01-20",
    },
    {
      id: "2",
      menteeName: "Priya Patel",
      rating: 4,
      comment: "Good insights on flight school selection abroad. Helpful resources provided.",
      date: "2024-01-18",
    },
    {
      id: "3",
      menteeName: "Amit Singh",
      rating: 5,
      comment: "Amazing session on navigation concepts. Cleared all my doubts effectively.",
      date: "2024-01-15",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  const getTodayTomorrowSlots = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todaySlots =
      mentor?.availability_slots.filter((slot) =>
        slot.toLowerCase().includes(today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()),
      ) || []

    const tomorrowSlots =
      mentor?.availability_slots.filter((slot) =>
        slot.toLowerCase().includes(tomorrow.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()),
      ) || []

    return { todaySlots, tomorrowSlots }
  }

  if (!mentor) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const { todaySlots, tomorrowSlots } = getTodayTomorrowSlots()

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Welcome back, {mentor.first_name}!</h1>
        <p className="text-blue-700 mt-2">Here's your mentorship overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">₹1,20,000</div>
            <p className="text-xs text-blue-600 mt-1">+20% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Sessions This Month</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">24</div>
            <p className="text-xs text-blue-600 mt-1">8 upcoming</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">4.8</div>
            <p className="text-xs text-blue-600 mt-1">From 45 reviews</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Active Mentees</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">18</div>
            <p className="text-xs text-blue-600 mt-1">+3 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Monthly Earnings
            </CardTitle>
            <CardDescription className="text-blue-700">Your earnings over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, "Earnings"]} />
                <Line type="monotone" dataKey="earnings" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Available Time Slots */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-blue-900 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Available Slots
              </CardTitle>
              <Link href="/mentor/profile">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
              </Link>
            </div>
            <CardDescription className="text-blue-700">Today & Tomorrow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Today</h4>
              {todaySlots.length > 0 ? (
                <div className="space-y-1">
                  {todaySlots.map((slot, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded text-sm text-blue-800">
                      {slot}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No slots available</p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Tomorrow</h4>
              {tomorrowSlots.length > 0 ? (
                <div className="space-y-1">
                  {tomorrowSlots.map((slot, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded text-sm text-blue-800">
                      {slot}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No slots available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Meetings */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Scheduled Meetings</CardTitle>
            <CardDescription className="text-blue-700">Your upcoming and recent sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-blue-900">{meeting.menteeName}</h4>
                      <p className="text-sm text-blue-700">{meeting.topic}</p>
                    </div>
                    <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-blue-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(meeting.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {meeting.time} ({meeting.duration})
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>₹{meeting.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Recent Feedback</CardTitle>
            <CardDescription className="text-blue-700">What your mentees are saying</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-blue-900">{feedback.menteeName}</h4>
                    {renderStars(feedback.rating)}
                  </div>
                  <p className="text-sm text-blue-700 mb-2">{feedback.comment}</p>
                  <p className="text-xs text-blue-500">{new Date(feedback.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
