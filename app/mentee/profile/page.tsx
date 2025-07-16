"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { User, Save, Edit } from "lucide-react"
import { menteeAPI, type MenteeResponse, type CreateMenteeRequest } from "@/lib/api"

export default function MenteeProfile() {
  const [mentee, setMentee] = useState<MenteeResponse | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<CreateMenteeRequest>>({})

  useEffect(() => {
    const menteeData = localStorage.getItem("menteeData")
    if (menteeData) {
      const parsedMentee = JSON.parse(menteeData)
      setMentee(parsedMentee)
      setFormData({
        full_name: parsedMentee.full_name,
        email: parsedMentee.email,
        phone_number: parsedMentee.phone_number,
        age_group: parsedMentee.age_group,
        current_stage: parsedMentee.current_stage,
        key_goal: parsedMentee.key_goal,
        preferred_language: parsedMentee.preferred_language,
        preferred_mentor_domain: parsedMentee.preferred_mentor_domain,
        availability: parsedMentee.availability,
budget: parsedMentee.budget ? parseFloat(parsedMentee.budget) : 0,
        questions_for_mentor: parsedMentee.questions_for_mentor,
        previous_attempts: parsedMentee.previous_attempts,
      })
    }
  }, [])

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

  const handleInputChange = (field: keyof CreateMenteeRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDomainToggle = (domain: string) => {
    setFormData((prev) => ({
      ...prev,
      preferred_mentor_domain: prev.preferred_mentor_domain?.includes(domain)
        ? prev.preferred_mentor_domain.filter((d) => d !== domain)
        : [...(prev.preferred_mentor_domain || []), domain],
    }))
  }

  const handleSave = async () => {
    if (!mentee || !formData) return

    setIsLoading(true)
    try {
      const updatedMentee = await menteeAPI.updateMenteeById(mentee.id, formData)

      // Update localStorage
      localStorage.setItem("menteeData", JSON.stringify(updatedMentee))
      setMentee(updatedMentee)
      setIsEditing(false)

      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mentee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>
            <p className="text-blue-700 mt-2">Manage your personal information and preferences</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "border-gray-300 bg-transparent" : "bg-blue-600 hover:bg-blue-700"}
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <User className="mr-2 h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 font-medium">Full Name</Label>
                {isEditing ? (
                  <Input
                    value={formData.full_name || ""}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    className="border-blue-200 focus:border-blue-500 mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{mentee.full_name}</p>
                )}
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Email</Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-blue-200 focus:border-blue-500 mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{mentee.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 font-medium">Phone Number</Label>
                {isEditing ? (
                  <Input
                    value={formData.phone_number || ""}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    className="border-blue-200 focus:border-blue-500 mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{mentee.phone_number}</p>
                )}
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Age Group</Label>
                {isEditing ? (
                  <Select onValueChange={(value) => handleInputChange("age_group", value)}>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500 mt-1">
                      <SelectValue placeholder={formData.age_group} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-18">Below 18</SelectItem>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="25-35">25-35</SelectItem>
                      <SelectItem value="35+">35+</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-900 mt-1">{mentee.age_group}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aviation Background */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Aviation Background</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium">Current Stage</Label>
              {isEditing ? (
                <Select onValueChange={(value) => handleInputChange("current_stage", value)}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-500 mt-1">
                    <SelectValue placeholder={formData.current_stage} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ground-school-selection">Guidance in Ground School Selection</SelectItem>
                    <SelectItem value="cleared-cpl">Just Cleared CPL</SelectItem>
                    <SelectItem value="flight-school-abroad">Guidance in selecting Flight School Abroad</SelectItem>
                    <SelectItem value="doubt-subject">Have Doubt in one particular subject</SelectItem>
                    <SelectItem value="career-planning">Career Planning & Guidance</SelectItem>
                    <SelectItem value="interview-prep">Interview Preparation</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900 mt-1">{mentee.current_stage}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Key Goal</Label>
              {isEditing ? (
                <Textarea
                  value={formData.key_goal || ""}
                  onChange={(e) => handleInputChange("key_goal", e.target.value)}
                  className="border-blue-200 focus:border-blue-500 mt-1"
                  rows={3}
                />
              ) : (
                <p className="text-gray-900 mt-1">{mentee.key_goal}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Preferred Language</Label>
              {isEditing ? (
                <Select onValueChange={(value) => handleInputChange("preferred_language", value)}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-500 mt-1">
                    <SelectValue placeholder={formData.preferred_language} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="both">Both English & Hindi</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900 mt-1">{mentee.preferred_language}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Budget</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.budget || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleInputChange("budget", val === "" ? null : parseFloat(val));
                  }}
                  className="border-blue-200 focus:border-blue-500 mt-1"
                />
              ) : (
                <p className="text-gray-900 mt-1">₹{mentee.budget}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Mentorship Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">Preferred Mentor Domains</Label>
              {isEditing ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {mentorDomains.map((domain) => (
                    <div key={domain} className="flex items-center space-x-2">
                      <Checkbox
                        id={domain}
                        checked={formData.preferred_mentor_domain?.includes(domain) || false}
                        onCheckedChange={() => handleDomainToggle(domain)}
                        className="border-blue-300"
                      />
                      <Label htmlFor={domain} className="text-gray-700 text-sm">
                        {domain}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {mentee.preferred_mentor_domain.map((domain, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {domain}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Questions for Mentor</Label>
              {isEditing ? (
                <Textarea
                  value={formData.questions_for_mentor || ""}
                  onChange={(e) => handleInputChange("questions_for_mentor", e.target.value)}
                  className="border-blue-200 focus:border-blue-500 mt-1"
                  rows={3}
                />
              ) : (
                <p className="text-gray-900 mt-1">{mentee.questions_for_mentor || "None"}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Previous Attempts</Label>
              {isEditing ? (
                <Textarea
                  value={formData.previous_attempts || ""}
                  onChange={(e) => handleInputChange("previous_attempts", e.target.value)}
                  className="border-blue-200 focus:border-blue-500 mt-1"
                  rows={3}
                />
              ) : (
                <p className="text-gray-900 mt-1">{mentee.previous_attempts || "None"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="flex justify-end space-x-4">
            <Button onClick={() => setIsEditing(false)} variant="outline" className="border-gray-300 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
