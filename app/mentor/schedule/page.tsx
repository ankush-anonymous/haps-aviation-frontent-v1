"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Video, Phone, DollarSign } from "lucide-react"
import type { MentorResponse } from "@/lib/api"

interface Meeting {
  id: string
  menteeName: string
  menteeEmail: string
  date: string
  time: string
  duration: string
  status: "Upcoming" | "Completed" | "Cancelled"
  topic: string
  amount: number
  mode: "Video Call" | "Phone Call"
  meetingLink?: string
}

export default function MentorSchedule() {
  const [mentor, setMentor] = useState<MentorResponse | null>(null)

  useEffect(() => {
    const mentorData = localStorage.getItem("mentorData")
    if (mentorData) {
      setMentor(JSON.parse(mentorData))
    }
  }, [])

  // Mock meetings data
  const meetings: Meeting[] = [
    {
      id: "1",
      menteeName: "Rahul Kumar",
      menteeEmail: "rahul.kumar@email.com",
      date: "2024-01-25",
      time: "14:00",
      duration: "90 min",
      status: "Upcoming",
      topic: "DGCA Exam Preparation",
      amount: 1499,
      mode: "Video Call",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "2",
      menteeName: "Priya Patel",
      menteeEmail: "priya.patel@email.com",
      date: "2024-01-26",
      time: "10:00",
      duration: "60 min",
      status: "Upcoming",
      topic: "Flight School Selection",
      amount: 1499,
      mode: "Video Call",
      meetingLink: "https://meet.google.com/xyz-uvwx-yz",
    },
    {
      id: "3",
      menteeName: "Amit Singh",
      menteeEmail: "amit.singh@email.com",
      date: "2024-01-24",
      time: "16:00",
      duration: "90 min",
      status: "Completed",
      topic: "Career Guidance",
      amount: 1499,
      mode: "Phone Call",
    },
    {
      id: "4",
      menteeName: "Sneha Sharma",
      menteeEmail: "sneha.sharma@email.com",
      date: "2024-01-23",
      time: "11:00",
      duration: "60 min",
      status: "Completed",
      topic: "Subject Doubts - Navigation",
      amount: 1499,
      mode: "Video Call",
    },
    {
      id: "5",
      menteeName: "Vikram Reddy",
      menteeEmail: "vikram.reddy@email.com",
      date: "2024-01-27",
      time: "15:00",
      duration: "90 min",
      status: "Upcoming",
      topic: "Interview Preparation",
      amount: 1499,
      mode: "Video Call",
      meetingLink: "https://meet.google.com/def-ghij-klm",
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

  const upcomingMeetings = meetings.filter((m) => m.status === "Upcoming")
  const completedMeetings = meetings.filter((m) => m.status === "Completed")

  if (!mentor) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">My Schedule</h1>
        <p className="text-blue-700 mt-2">Manage your upcoming and past mentoring sessions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Today's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">2</div>
            <p className="text-xs text-blue-600 mt-1">Next at 2:00 PM</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">This Week</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">8</div>
            <p className="text-xs text-blue-600 mt-1">3 upcoming</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Hours</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">45</div>
            <p className="text-xs text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">₹67,455</div>
            <p className="text-xs text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Upcoming Sessions</CardTitle>
            <CardDescription className="text-blue-700">Your scheduled mentoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-blue-900">{meeting.menteeName}</h4>
                      <p className="text-sm text-blue-700">{meeting.topic}</p>
                      <p className="text-xs text-blue-600">{meeting.menteeEmail}</p>
                    </div>
                    <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-blue-600 mb-3">
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
                      {meeting.mode === "Video Call" ? <Video className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
                      <span>{meeting.mode}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>₹{meeting.amount}</span>
                    </div>
                  </div>

                  {meeting.meetingLink && (
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Video className="mr-1 h-3 w-3" />
                        Join Meeting
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        Reschedule
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Sessions */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Recent Sessions</CardTitle>
            <CardDescription className="text-blue-700">Your completed mentoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedMeetings.map((meeting) => (
                <div key={meeting.id} className="border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-blue-900">{meeting.menteeName}</h4>
                      <p className="text-sm text-blue-700">{meeting.topic}</p>
                      <p className="text-xs text-blue-600">{meeting.menteeEmail}</p>
                    </div>
                    <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-blue-600 mb-3">
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
                      {meeting.mode === "Video Call" ? <Video className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
                      <span>{meeting.mode}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>₹{meeting.amount}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      View Feedback
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      Send Follow-up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
