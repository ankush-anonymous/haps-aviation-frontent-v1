"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock, Award, MapPin, Languages } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Mentor {
  id: string
  name: string
  title: string
  experience: string
  rating: number
  reviews: number
  specialties: string[]
  languages: string[]
  location: string
  price: string
  availability: string
  image: string
  matchScore: number
}

export default function MatchingResults() {
  const [mentors, setMentors] = useState<Mentor[]>([])
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

    // Mock mentor data - in real app, this would come from API based on matching algorithm
    const mockMentors: Mentor[] = [
      {
        id: "1",
        name: "Captain Sarah Johnson",
        title: "Commercial Airline Pilot & DGCA Examiner",
        experience: "15+ years",
        rating: 4.9,
        reviews: 127,
        specialties: ["DGCA Clearance", "Ground School", "Exam Preparation"],
        languages: ["English", "Hindi"],
        location: "Delhi, India",
        price: "₹1,429",
        availability: "Available this week",
        image: "/placeholder.svg?height=300&width=300",
        matchScore: 95,
      },
      {
        id: "2",
        name: "Captain Mike Rodriguez",
        title: "Flight Training Specialist",
        experience: "12+ years",
        rating: 4.8,
        reviews: 89,
        specialties: ["Flight School Selection", "Simulator Training", "Career Guidance"],
        languages: ["English"],
        location: "Mumbai, India",
        price: "₹1,429",
        availability: "Available tomorrow",
        image: "/placeholder.svg?height=300&width=300",
        matchScore: 92,
      },
      {
        id: "3",
        name: "Captain Priya Sharma",
        title: "Aviation Career Consultant",
        experience: "10+ years",
        rating: 4.9,
        reviews: 156,
        specialties: ["Subject Doubts", "Ground School", "International Training"],
        languages: ["English", "Hindi"],
        location: "Bangalore, India",
        price: "₹1,429",
        availability: "Available this week",
        image: "/placeholder.svg?height=300&width=300",
        matchScore: 88,
      },
    ]

    setMentors(mockMentors)
  }, [])

  const getMatchReasonText = () => {
    const area = userAnswers.step1
    const level = userAnswers.step2
    const goal = userAnswers.step3
    const stage = userAnswers.step4

    return `Based on your need for ${area} guidance at ${level} level, with the goal of "${goal}" at the ${stage} stage.`
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
            <p className="text-blue-700">Sorted by best match score and availability</p>
          </div>

          <div className="space-y-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Mentor Image and Basic Info */}
                    <div className="lg:col-span-1">
                      <div className="text-center">
                        <Image
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          width={120}
                          height={120}
                          className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                        />
                        <Badge className="bg-green-100 text-green-800 mb-2">{mentor.matchScore}% Match</Badge>
                        <div className="flex items-center justify-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium text-blue-900">
                            {mentor.rating} ({mentor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mentor Details */}
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-bold text-blue-900 mb-1">{mentor.name}</h3>
                      <p className="text-blue-700 mb-3">{mentor.title}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-blue-600">
                          <Award className="h-4 w-4 mr-2" />
                          {mentor.experience} experience
                        </div>
                        <div className="flex items-center text-sm text-blue-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {mentor.location}
                        </div>
                        <div className="flex items-center text-sm text-blue-600">
                          <Languages className="h-4 w-4 mr-2" />
                          {mentor.languages.join(", ")}
                        </div>
                        <div className="flex items-center text-sm text-blue-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {mentor.availability}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Booking Section */}
                    <div className="lg:col-span-1">
                      <div className="text-center lg:text-right">
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-blue-900">{mentor.price}</div>
                          <div className="text-sm text-blue-600">per session</div>
                        </div>

                        <Link href={`/payment?mentor=${mentor.id}`}>
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
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                  Retake Matching Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
