"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, User, AlertCircle } from "lucide-react"
import { menteeAPI, type CreateMenteeRequest } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    ageGroup: "",
    currentRole: "",
    currentStage: "",
    keyGoal: "",
    preferredLanguage: "",
    preferredMentorDomains: [] as string[],
    availability: "",
    budget: "",
    questionsForMentor: "",
    previousAttempts: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for API
      const menteeData: CreateMenteeRequest = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        age_group: formData.ageGroup,
        current_stage: formData.currentStage,
        key_goal: formData.keyGoal,
        preferred_language: formData.preferredLanguage,
        preferred_mentor_domain: formData.preferredMentorDomains,
        availability: [formData.availability], // Convert single availability to array
        budget: Number.parseInt(formData.budget) || 1429,
        questions_for_mentor: formData.questionsForMentor,
        previous_attempts: formData.previousAttempts,
      }

      // Create mentee via API
      const response = await menteeAPI.createMentee(menteeData)

      // Store mentee data in localStorage for authentication
      localStorage.setItem("menteeData", JSON.stringify(response))
      localStorage.setItem("isLoggedIn", "true")

      // Redirect to mentee dashboard
     router.push("/matching/results")
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDomainChange = (domain: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferredMentorDomains: checked
        ? [...prev.preferredMentorDomains, domain]
        : prev.preferredMentorDomains.filter((d) => d !== domain),
    }))
  }

  const mentorDomains = [
    "Ground School",
    "Exams Preparation",
    "Flight Training Abroad",
    "Financial Planning",
    "Career Guidance",
    "Interview Preparation",
    "License Conversion",
    "Airline Applications",
  ]

  const timeSlots = [
    "Early Morning (6:00 AM - 9:00 AM)",
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 3:00 PM)",
    "Evening (3:00 PM - 6:00 PM)",
    "Night (6:00 PM - 9:00 PM)",
    "Late Night (9:00 PM - 11:00 PM)",
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Register for Mentorship</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Take the first step towards accelerating your aviation career. Fill out the form below to get matched with
            the perfect mentor.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-2xl text-blue-900 flex items-center">
                <User className="mr-3 h-6 w-6" />
                Mentorship Registration Form
              </CardTitle>
              <CardDescription className="text-blue-700">
                Please provide detailed information to help us match you with the most suitable mentor for your aviation
                journey.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-900 border-b border-blue-200 pb-2">
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-blue-900 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your official name"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-blue-900 font-medium">
                        Email ID *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phoneNumber" className="text-blue-900 font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        placeholder="+91 9876543210"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label className="text-blue-900 font-medium">Age Group *</Label>
                      <Select onValueChange={(value) => handleInputChange("ageGroup", value)} required>
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select your age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="below-18">Below 18</SelectItem>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="25-35">25-35</SelectItem>
                          <SelectItem value="35+">35+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Aviation Background */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-900 border-b border-blue-200 pb-2">
                    Aviation Background
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-blue-900 font-medium">Current Role *</Label>
                      <Input
                        value={formData.currentRole}
                        onChange={(e) => handleInputChange("currentRole", e.target.value)}
                        placeholder="e.g., Student, Working Professional, Pilot in Training"
                        className="border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-blue-900 font-medium">Current Stage *</Label>
                      <Select onValueChange={(value) => handleInputChange("currentStage", value)} required>
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select your current stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ground-school-selection">Guidance in Ground School Selection</SelectItem>
                          <SelectItem value="cleared-cpl">Just Cleared CPL</SelectItem>
                          <SelectItem value="flight-school-abroad">
                            Guidance in selecting Flight School Abroad
                          </SelectItem>
                          <SelectItem value="doubt-subject">Have Doubt in one particular subject</SelectItem>
                          <SelectItem value="career-planning">Career Planning & Guidance</SelectItem>
                          <SelectItem value="interview-prep">Interview Preparation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="keyGoal" className="text-blue-900 font-medium">
                      Key Goal *
                    </Label>
                    <Textarea
                      id="keyGoal"
                      required
                      rows={3}
                      value={formData.keyGoal}
                      onChange={(e) => handleInputChange("keyGoal", e.target.value)}
                      placeholder="What are you hoping to achieve from this mentorship? Be specific about your goals..."
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-900 border-b border-blue-200 pb-2">
                    Mentorship Preferences
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-blue-900 font-medium">Preferred Language *</Label>
                      <Select onValueChange={(value) => handleInputChange("preferredLanguage", value)} required>
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="both">Both English & Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-blue-900 font-medium">Budget for Mentorship *</Label>
                      <Select onValueChange={(value) => handleInputChange("budget", value)} required>
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1429">₹1,429 per session</SelectItem>
                          <SelectItem value="2500">₹2,500 per session</SelectItem>
                          <SelectItem value="5000">₹5,000 per session</SelectItem>
                          <SelectItem value="custom">Custom Budget</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-blue-900 font-medium mb-3 block">
                      Preferred Mentor Domains * (Select all that apply)
                    </Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {mentorDomains.map((domain) => (
                        <div key={domain} className="flex items-center space-x-2">
                          <Checkbox
                            id={domain}
                            checked={formData.preferredMentorDomains.includes(domain)}
                            onCheckedChange={(checked) => handleDomainChange(domain, checked as boolean)}
                            className="border-blue-300"
                          />
                          <Label htmlFor={domain} className="text-blue-800 text-sm">
                            {domain}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-blue-900 font-medium">Availability *</Label>
                    <Select onValueChange={(value) => handleInputChange("availability", value)} required>
                      <SelectTrigger className="border-blue-200 focus:border-blue-500">
                        <SelectValue placeholder="When are you free to take calls?" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-900 border-b border-blue-200 pb-2">
                    Additional Information
                  </h3>

                  <div>
                    <Label htmlFor="questionsForMentor" className="text-blue-900 font-medium">
                      Questions for Mentor (Optional)
                    </Label>
                    <Textarea
                      id="questionsForMentor"
                      rows={3}
                      value={formData.questionsForMentor}
                      onChange={(e) => handleInputChange("questionsForMentor", e.target.value)}
                      placeholder="Any specific questions or topics you'd like to discuss in your first session?"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="previousAttempts" className="text-blue-900 font-medium">
                      Previous Attempts (if any)
                    </Label>
                    <Textarea
                      id="previousAttempts"
                      rows={3}
                      value={formData.previousAttempts}
                      onChange={(e) => handleInputChange("previousAttempts", e.target.value)}
                      placeholder="Mention any failed exams, interviews, or schools you've considered previously..."
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-6 pt-6 border-t border-blue-200">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">What happens next?</p>
                        <ul className="space-y-1 text-blue-700">
                          <li>• We'll review your application within 24 hours</li>
                          <li>• You'll receive mentor recommendations based on your preferences</li>
                          <li>• Schedule your first session at your convenience</li>
                          <li>• Start your personalized aviation mentorship journey</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-5 w-5 animate-spin" />
                        Processing Registration...
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-2 h-5 w-5" />
                        Complete Registration & Start Matching
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
