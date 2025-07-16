"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Phone, Linkedin, Calendar, DollarSign, Languages, FileText, Edit } from "lucide-react"
import Link from "next/link"
import { mentorAPI, type MentorResponse } from "@/lib/api"

export default function MentorDetailPage() {
  const params = useParams()
  const mentorId = params.id as string
  const [mentor, setMentor] = useState<MentorResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMentor = async () => {
      // Check if the ID is valid (not "add" or other reserved words)
      if (!mentorId || mentorId === "add" || mentorId.length < 10) {
        setLoading(false)
        return
      }

      try {
        const response = await mentorAPI.getMentorById(mentorId)
        setMentor(response)
      } catch (error) {
        console.error("Failed to fetch mentor:", error)
      } finally {
        setLoading(false)
      }
    }

    if (mentorId) {
      fetchMentor()
    }
  }, [mentorId])

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

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Mentor not found</h1>
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
                    <CardTitle className="text-2xl text-gray-900">
                      {mentor.first_name} {mentor.last_name}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-1">{mentor.current_occ_role}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Link href={`/admin/mentors/${mentor.id}/edit`}>
                      <Button size="sm" variant="outline" className="border-gray-300 bg-transparent">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{mentor.email}</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{mentor.phone_number}</span>
                </div>
                {mentor.linkedin_url && (
                  <div className="flex items-center space-x-4 text-gray-600">
                    <Linkedin className="h-4 w-4" />
                    <a
                      href={mentor.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Professional Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
                  <p className="text-gray-600">{mentor.years_of_experience} years in aviation industry</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Profile Bio</h4>
                  <p className="text-gray-600">{mentor.profile_bio}</p>
                </div>
                {mentor.requirements_from_mentees && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requirements from Mentees</h4>
                      <p className="text-gray-600">{mentor.requirements_from_mentees}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {mentor.documents && mentor.documents.length > 0 && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Documents & Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mentor.documents.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <a
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Document {index + 1}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Mentoring Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">₹{mentor.mentoring_fee}</p>
                    <p className="text-sm text-gray-500">per session</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Comfort Level</h4>
                  <p className="text-gray-600">{mentor.level_comfortable}</p>
                </div>
                <Separator />
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Languages</p>
                    <p className="text-gray-600">{mentor.languages_spoken.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mentor.area_of_expertise.map((area, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                      {area}
                    </Badge>
                  ))}
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
                  {mentor.availability_slots.map((slot, index) => (
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
                    <span className="ml-2 text-gray-900">{new Date(mentor.created_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 text-gray-900">{new Date(mentor.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 text-green-600">Active</span>
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
