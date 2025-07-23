"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Video, DollarSign, Loader2 } from "lucide-react"
import type { MentorResponse, MeetingResponse } from "@/lib/api"
import { meetingAPI } from "@/lib/api"

export default function MentorSchedule() {
  const [mentor, setMentor] = useState<MentorResponse | null>(null)
  const [meetings, setMeetings] = useState<MeetingResponse[]>([])
  const [loadingMeetings, setLoadingMeetings] = useState(false)

  const fetchMeetings = async () => {
    if (!mentor) return

    setLoadingMeetings(true)
    try {
      const response = await meetingAPI.getFilteredMeetings(mentor.id, undefined)
      setMeetings(response.data || [])
    } catch (error) {
      console.error("Failed to fetch meetings:", error)
      setMeetings([])
    } finally {
      setLoadingMeetings(false)
    }
  }

  useEffect(() => {
    const mentorData = localStorage.getItem("mentorData")
    if (mentorData) {
      const parsedMentor = JSON.parse(mentorData)
      setMentor(parsedMentor)
      // Fetch meetings after setting mentor
      setTimeout(() => fetchMeetings(), 100)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const upcomingMeetings = meetings.filter((m) => m.status === "Scheduled")
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
            {loadingMeetings ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-blue-700">Loading meetings...</p>
              </div>
            ) : upcomingMeetings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <p className="text-blue-700 mb-2">No upcoming meetings</p>
                <p className="text-sm text-blue-600">Your scheduled sessions will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-blue-900">Mentorship Session</h4>
                        <p className="text-sm text-blue-700">Duration: {meeting.duration_minutes} minutes</p>
                        <p className="text-xs text-blue-600">Meeting ID: {meeting.id.slice(0, 8)}...</p>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-blue-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(meeting.scheduled_datetime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(meeting.scheduled_datetime).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Video className="h-3 w-3" />
                        <span>{meeting.mode_of_meeting}</span>
                      </div>
                    </div>

                    {meeting.meeting_link && (
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                          <a href={meeting.meeting_link} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-1 h-3 w-3" />
                            Join Meeting
                          </a>
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
            )}
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
                      <h4 className="font-medium text-blue-900">Mentorship Session</h4>
                      <p className="text-sm text-blue-700">Duration: {meeting.duration_minutes} minutes</p>
                      <p className="text-xs text-blue-600">Meeting ID: {meeting.id.slice(0, 8)}...</p>
                    </div>
                    <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-blue-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(meeting.scheduled_datetime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(meeting.scheduled_datetime).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="h-3 w-3" />
                      <span>{meeting.mode_of_meeting}</span>
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
