"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, Languages, User, Target } from "lucide-react"
import Link from "next/link"
import { menteeAPI, type MenteeResponse } from "@/lib/api"

export default function MenteeDetailPage() {
  const params = useParams()
  const menteeId = params.id as string
  const [mentee, setMentee] = useState<MenteeResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMentee = async () => {
      if (!menteeId || menteeId === "add" || menteeId.length < 10) {
        setLoading(false)
        return
      }

      try {
        const response = await menteeAPI.getMenteeById(menteeId)
        setMentee(response)
      } catch (error) {
        console.error("Failed to fetch mentee:", error)
      } finally {
        setLoading(false)
      }
    }

    if (menteeId) {
      fetchMentee()
    }
  }, [menteeId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!mentee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Mentee not found</h1>
            <Link href="/admin">
              <Button className="mt-4">Back to Admin Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">{mentee.full_name}</CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-1">{mentee.current_stage}</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{mentee.email}</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{mentee.phone_number}</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Age Group: {mentee.age_group}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Goals & Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Key Goal
                  </h4>
                  <p className="text-gray-600">{mentee.key_goal}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Preferred Mentor Domains</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentee.preferred_mentor_domain.map((domain, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                        {domain}
                      </Badge>
                    ))}
                  </div>
                </div>
                {mentee.questions_for_mentor && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Questions for Mentor</h4>
                      <p className="text-gray-600">{mentee.questions_for_mentor}</p>
                    </div>
                  </>
                )}
                {mentee.previous_attempts && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Previous Attempts</h4>
                      <p className="text-gray-600">{mentee.previous_attempts}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Budget & Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">₹{mentee.budget}</p>
                    <p className="text-sm text-gray-500">budget per session</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Preferred Language</p>
                    <p className="text-gray-600">{mentee.preferred_language}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mentee.availability.map((slot, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-sm text-gray-700">
                      {slot}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Account Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Joined:</span>
                    <span className="ml-2 text-gray-900">{new Date(mentee.created_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 text-gray-900">{new Date(mentee.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 text-blue-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
