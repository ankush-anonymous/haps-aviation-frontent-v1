"use client"

import type React from "react"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, User, Briefcase, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import { mentorAPI } from "@/lib/api"
import {type CreateMentorRequest} from "@/lib/interfaces"

export default function AddMentorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreateMentorRequest>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    linkedin_url: "",
    current_occ_role: "",
    years_of_experience: 0,
    area_of_expertise: [],
    availability_slots: [],
    profile_bio: "",
    languages_spoken: [],
    mentoring_fee: 0,
    level_comfortable: "",
    documents: [],
    requirements_from_mentees: "",
  })

  const expertiseOptions = [
    "Ground School",
    "Flight School Selection",
    "Subject Doubts",
    "DGCA Clearance",
    "Exam Preparation",
    "Career Guidance",
    "Interview Preparation",
    "License Conversion",
    "Airline Applications",
    "Simulator Training",
    "International Training",
    "Flight Safety",
    "Aviation Management",
  ]

  const languageOptions = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Marathi",
    "Bengali",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
  ]

  const levelOptions = ["Beginner", "Intermediate", "Advanced", "All Levels"]

  const timeSlots = [
    "Monday 09:00-12:00",
    "Monday 14:00-17:00",
    "Monday 18:00-21:00",
    "Tuesday 09:00-12:00",
    "Tuesday 14:00-17:00",
    "Tuesday 18:00-21:00",
    "Wednesday 09:00-12:00",
    "Wednesday 14:00-17:00",
    "Wednesday 18:00-21:00",
    "Thursday 09:00-12:00",
    "Thursday 14:00-17:00",
    "Thursday 18:00-21:00",
    "Friday 09:00-12:00",
    "Friday 14:00-17:00",
    "Friday 18:00-21:00",
    "Saturday 09:00-12:00",
    "Saturday 14:00-17:00",
    "Sunday 09:00-12:00",
    "Sunday 14:00-17:00",
  ]

  const handleInputChange = (field: keyof CreateMentorRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: "area_of_expertise" | "languages_spoken" | "availability_slots", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await mentorAPI.createMentor(formData)
      // Redirect to admin dashboard with mentors tab active
      router.push("/mentor/dashboard")
    } catch (error) {
      console.error("Failed to create mentor:", error)
      alert("Failed to create mentor. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const name = params.get('name');
  const picture = params.get('picture');

  if (email) localStorage.setItem('mentor_email', email);
  if (name) localStorage.setItem('mentor_name', name);
  if (picture) localStorage.setItem('mentor_picture', picture);
}, []);


  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-600">Basic personal details of the mentor</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="first_name" className="text-gray-700 font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="first_name"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    className="border-gray-200 focus:border-gray-400 mt-1"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name" className="text-gray-700 font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="last_name"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    className="border-gray-200 focus:border-gray-400 mt-1"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-gray-200 focus:border-gray-400 mt-1"
                    placeholder="mentor@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone_number" className="text-gray-700 font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    className="border-gray-200 focus:border-gray-400 mt-1"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin_url" className="text-gray-700 font-medium">
                  LinkedIn Profile URL
                </Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => handleInputChange("linkedin_url", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 mt-1"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Professional Information
              </CardTitle>
              <CardDescription className="text-gray-600">Professional background and expertise details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="current_occ_role" className="text-gray-700 font-medium">
                  Current Occupation/Role *
                </Label>
                <Input
                  id="current_occ_role"
                  type="text"
                  required
                  value={formData.current_occ_role}
                  onChange={(e) => handleInputChange("current_occ_role", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 mt-1"
                  placeholder="e.g., Commercial Pilot at IndiGo Airlines"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="years_of_experience" className="text-gray-700 font-medium">
                    Years of Experience *
                  </Label>
                  <Input
                    id="years_of_experience"
                    type="number"
                    min="0"
                    required
                    value={formData.years_of_experience}
                    onChange={(e) => handleInputChange("years_of_experience", Number.parseInt(e.target.value) || 0)}
                    className="border-gray-200 focus:border-gray-400 mt-1"
                    placeholder="6"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">Comfort Level *</Label>
                  <Select onValueChange={(value) => handleInputChange("level_comfortable", value)} required>
                    <SelectTrigger className="border-gray-200 focus:border-gray-400 mt-1">
                      <SelectValue placeholder="Select comfort level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium mb-3 block">
                  Areas of Expertise * (Select all that apply)
                </Label>
                <div className="grid md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {expertiseOptions.map((expertise) => (
                    <div key={expertise} className="flex items-center space-x-2">
                      <Checkbox
                        id={expertise}
                        checked={formData.area_of_expertise.includes(expertise)}
                        onCheckedChange={() => handleArrayToggle("area_of_expertise", expertise)}
                        className="border-gray-300"
                      />
                      <Label htmlFor={expertise} className="text-gray-700 text-sm">
                        {expertise}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="profile_bio" className="text-gray-700 font-medium">
                  Profile Bio *
                </Label>
                <Textarea
                  id="profile_bio"
                  required
                  rows={4}
                  value={formData.profile_bio}
                  onChange={(e) => handleInputChange("profile_bio", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 mt-1"
                  placeholder="Describe your professional background, experience, and what makes you a great mentor..."
                />
              </div>

              <div>
                <Label htmlFor="requirements_from_mentees" className="text-gray-700 font-medium">
                  Requirements from Mentees
                </Label>
                <Textarea
                  id="requirements_from_mentees"
                  rows={3}
                  value={formData.requirements_from_mentees}
                  onChange={(e) => handleInputChange("requirements_from_mentees", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 mt-1"
                  placeholder="What do you expect from mentees? (e.g., basic aviation knowledge, punctuality, etc.)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Mentoring Details */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Mentoring Details
              </CardTitle>
              <CardDescription className="text-gray-600">Pricing and language preferences</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="mentoring_fee" className="text-gray-700 font-medium">
                    Mentoring Fee (₹) *
                  </Label>
                  <Input
                    id="mentoring_fee"
                    type="number"
                    min="0"
                    required
                    value={formData.mentoring_fee}
                    onChange={(e) => handleInputChange("mentoring_fee", Number.parseInt(e.target.value) || 0)}
                    className="border-gray-200 focus:border-gray-400 mt-1"
                    placeholder="1499"
                  />
                  <p className="text-sm text-gray-500 mt-1">Amount per session</p>
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium mb-3 block">
                  Languages Spoken * (Select all that apply)
                </Label>
                <div className="grid md:grid-cols-4 gap-3 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {languageOptions.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.languages_spoken.includes(language)}
                        onCheckedChange={() => handleArrayToggle("languages_spoken", language)}
                        className="border-gray-300"
                      />
                      <Label htmlFor={language} className="text-gray-700 text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Availability Slots
              </CardTitle>
              <CardDescription className="text-gray-600">
                Select available time slots for mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {timeSlots.map((slot) => (
                  <div key={slot} className="flex items-center space-x-2">
                    <Checkbox
                      id={slot}
                      checked={formData.availability_slots.includes(slot)}
                      onCheckedChange={() => handleArrayToggle("availability_slots", slot)}
                      className="border-gray-300"
                    />
                    <Label htmlFor={slot} className="text-gray-700 text-sm">
                      {slot}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link href="/admin">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="bg-gray-900 hover:bg-gray-800 text-white px-8">
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Creating Mentor...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Mentor
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
