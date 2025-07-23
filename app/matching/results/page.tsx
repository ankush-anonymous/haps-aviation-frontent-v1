"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock, Award, Languages, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { mentorAPI, type MentorResponse } from "@/lib/api"

export default function MatchingResults() {
  const [mentors, setMentors] = useState<MentorResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [userAnswers, setUserAnswers] = useState<any>({})

  useEffect(() => {
    // Get user answers from localStorage
    const answers = {
      step1: localStorage.getItem("matchingStep1"),
      step2: localStorage.getItem("matchingStep2"),
      step3: localStorage.getItem("matchingStep3"),
      step4: localStorage.getItem("matchingStep4"),
    }
    setUserAnswers(answers)

    // Fetch mentors from API
    fetchMentors()
  }, [])

  const fetchMentors = async () => {
    setLoading(true)
    try {
      const response = await mentorAPI.getAllMentors(50, 0) // Get up to 50 mentors
      setMentors(response.mentors || [])
    } catch (error) {
      console.error("Failed to fetch mentors:", error)
      setMentors([])
    } finally {
      setLoading(false)
    }
  }

  const getMatchReasonText = () => {
    const area = userAnswers.step1
    const level = userAnswers.step2
    const goal = userAnswers.step3
    const stage = userAnswers.step4

    return `Based on your need for ${area || "aviation"} guidance at ${level || "beginner"} level, with the goal of "${goal || "career advancement"}" at the ${stage || "planning"} stage.`
  }

  const getMentorDisplayName = (mentor: MentorResponse) => {
    return `${mentor.first_name} ${mentor.last_name}`
  }

  const getMentorExperience = (mentor: MentorResponse) => {
    return `${mentor.years_of_experience}+ years`
  }

  const getMentorPrice = (mentor: MentorResponse) => {
    return `₹${mentor.mentoring_fee}`
  }

  const getMentorAvailability = (mentor: MentorResponse) => {
    return mentor.availability_slots.length > 0 ? "Available this week" : "Limited availability"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-blue-700">Finding the best mentors for you...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Perfect Matches Found!</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            We've found the best mentors for your aviation journey based on your preferences and goals.
          </p>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-blue-100 text-sm">
              <strong>Match Criteria:</strong> {getMatchReasonText()}
            </p>
          </div>
        </div>
      </section>

      {/* Mentors List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{mentors.length} Mentors Available for You</h2>
            <p className="text-blue-700">Expert aviation mentors ready to guide your journey</p>
          </div>

          {mentors.length === 0 ? (
            <Card className="border-blue-200 text-center py-12">
              <CardContent>
                <p className="text-blue-700 text-lg mb-4">No mentors found at the moment.</p>
                <p className="text-blue-600">Please check back later or contact our support team.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      {/* Mentor Image and Basic Info */}
                      <div className="lg:col-span-1">
                        <div className="text-center">
                          <Image
                            src="/placeholder.svg?height=120&width=120"
                            alt={getMentorDisplayName(mentor)}
                            width={120}
                            height={120}
                            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                          />
                          <Badge className="bg-green-100 text-green-800 mb-2">Expert Match</Badge>
                          <div className="flex items-center justify-center mb-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium text-blue-900">4.8 (50+ reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Mentor Details */}
                      <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-blue-900 mb-1">{getMentorDisplayName(mentor)}</h3>
                        <p className="text-blue-700 mb-3">{mentor.current_occ_role}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-blue-600">
                            <Award className="h-4 w-4 mr-2" />
                            {getMentorExperience(mentor)} experience
                          </div>
                          <div className="flex items-center text-sm text-blue-600">
                            <Languages className="h-4 w-4 mr-2" />
                            {mentor.languages_spoken.join(", ")}
                          </div>
                          <div className="flex items-center text-sm text-blue-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {getMentorAvailability(mentor)}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-blue-900 mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {mentor.area_of_expertise.slice(0, 3).map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                                {specialty}
                              </Badge>
                            ))}
                            {mentor.area_of_expertise.length > 3 && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                +{mentor.area_of_expertise.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {mentor.profile_bio && (
                          <p className="text-sm text-blue-600 line-clamp-2">{mentor.profile_bio}</p>
                        )}
                      </div>

                      {/* Booking Section */}
                      <div className="lg:col-span-1">
                        <div className="text-center lg:text-right">
                          <div className="mb-4">
                            <div className="text-2xl font-bold text-blue-900">{getMentorPrice(mentor)}</div>
                            <div className="text-sm text-blue-600">per session</div>
                          </div>

                          <Link href={`/mentee/book-appointment?mentor=${mentor.id}`}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3">
                              <Calendar className="mr-2 h-4 w-4" />
                              Book Consultation
                            </Button>
                          </Link>

                          <Button
                            variant="outline"
                            className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Additional Help */}
          <Card className="mt-12 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">Need Help Choosing?</CardTitle>
              <CardDescription className="text-blue-700">
                Our team can help you select the perfect mentor based on your specific needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                  Schedule a Call with Our Team
                </Button>
                <Link href="/matching/step-1">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                    Retake Matching Quiz
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
