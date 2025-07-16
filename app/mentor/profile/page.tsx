"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Save, Edit, Clock, DollarSign, Languages, FileText } from "lucide-react"
import { mentorAPI, type MentorResponse, type CreateMentorRequest } from "@/lib/api"
import AvailabilityScheduler from "@/components/mentor/availability-scheduler"

export default function MentorProfile() {
  const [mentor, setMentor] = useState<MentorResponse | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<CreateMentorRequest>>({})
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    const mentorData = localStorage.getItem("mentorData")
    if (mentorData) {
      const parsedMentor = JSON.parse(mentorData)
      setMentor(parsedMentor)
      setFormData({
        first_name: parsedMentor.first_name,
        last_name: parsedMentor.last_name,
        email: parsedMentor.email,
        phone_number: parsedMentor.phone_number,
        linkedin_url: parsedMentor.linkedin_url,
        current_occ_role: parsedMentor.current_occ_role,
        years_of_experience: parsedMentor.years_of_experience,
        area_of_expertise: parsedMentor.area_of_expertise,
        availability_slots: parsedMentor.availability_slots,
        profile_bio: parsedMentor.profile_bio,
        languages_spoken: parsedMentor.languages_spoken,
        mentoring_fee: parseFloat(parsedMentor.mentoring_fee),
        level_comfortable: parsedMentor.level_comfortable,
        documents: parsedMentor.documents,
        requirements_from_mentees: parsedMentor.requirements_from_mentees,
      })
    }
  }, [])

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

 const handleInputChange = (field: keyof CreateMentorRequest, value: any) => {
  setFormData((prev) => ({
    ...prev,
    [field]: field === "mentoring_fee" || field === "years_of_experience"
      ? Number.parseInt(value) || 0
      : value,
  }))
}

  const handleArrayToggle = (field: "area_of_expertise" | "languages_spoken", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...(prev[field] || []), value],
    }))
  }

  const handleAvailabilityChange = (slots: string[]) => {
    setFormData((prev) => ({ ...prev, availability_slots: slots }))
  }

  const handleSave = async () => {
    if (!mentor || !formData) return

    setIsLoading(true)
    try {
      const updatedMentor = await mentorAPI.updateMentorById(mentor.id, formData)

      // Update localStorage
      localStorage.setItem("mentorData", JSON.stringify(updatedMentor))
      setMentor(updatedMentor)
      setIsEditing(false)

      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mentor) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  function groupSlotsByDate(slots: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {}

  slots.forEach((slot) => {
    const [day, date, month, ...rest] = slot.split(" ")
    const time = rest.join(" ")
    const dateKey = `${day} ${date} ${month}`

    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }

    grouped[dateKey].push(time)
  })

  return grouped
}


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>
            <p className="text-blue-700 mt-2">Manage your professional information and availability</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "border-blue-300 bg-transparent" : "bg-blue-600 hover:bg-blue-700"}
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-blue-200">
          <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Profile Info
          </TabsTrigger>
          <TabsTrigger value="availability" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Availability
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
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
                  <Label className="text-blue-700 font-medium">First Name</Label>
                  {isEditing ? (
                    <Input
                      value={formData.first_name || ""}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      className="border-blue-200 focus:border-blue-500 mt-1"
                    />
                  ) : (
                    <p className="text-blue-900 mt-1">{mentor.first_name}</p>
                  )}
                </div>
                <div>
                  <Label className="text-blue-700 font-medium">Last Name</Label>
                  {isEditing ? (
                    <Input
                      value={formData.last_name || ""}
                      onChange={(e) => handleInputChange("last_name", e.target.value)}
                      className="border-blue-200 focus:border-blue-500 mt-1"
                    />
                  ) : (
                    <p className="text-blue-900 mt-1">{mentor.last_name}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-700 font-medium">Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-blue-200 focus:border-blue-500 mt-1"
                    />
                  ) : (
                    <p className="text-blue-900 mt-1">{mentor.email}</p>
                  )}
                </div>
                <div>
                  <Label className="text-blue-700 font-medium">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={formData.phone_number || ""}
                      onChange={(e) => handleInputChange("phone_number", e.target.value)}
                      className="border-blue-200 focus:border-blue-500 mt-1"
                    />
                  ) : (
                    <p className="text-blue-900 mt-1">{mentor.phone_number}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-blue-700 font-medium">LinkedIn URL</Label>
                {isEditing ? (
                  <Input
                    value={formData.linkedin_url || ""}
                    onChange={(e) => handleInputChange("linkedin_url", e.target.value)}
                    className="border-blue-200 focus:border-blue-500 mt-1"
                  />
                ) : (
                  <p className="text-blue-900 mt-1">{mentor.linkedin_url || "Not provided"}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-700 font-medium">Current Role</Label>
                  {isEditing ? (
                    <Input
                      value={formData.current_occ_role || ""}
                      onChange={(e) => handleInputChange("current_occ_role", e.target.value)}
                      className="border-blue-200 focus:border-blue-500 mt-1"
                    />
                  ) : (
                    <p className="text-blue-900 mt-1">{mentor.current_occ_role}</p>
                  )}
                </div>
                <div>
                  <Label className="text-blue-700 font-medium">Years of Experience</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={formData.years_of_experience || ""}
                      onChange={(e) => handleInputChange("years_of_experience", Number.parseInt(e.target.value))}
                      className="border-blue-200 focus:border-blue-500 mt-1"
                    />
                  ) : (
                    <p className="text-blue-900 mt-1">{mentor.years_of_experience} years</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-blue-700 font-medium">Profile Bio</Label>
                {isEditing ? (
                  <Textarea
                    value={formData.profile_bio || ""}
                    onChange={(e) => handleInputChange("profile_bio", e.target.value)}
                    className="border-blue-200 focus:border-blue-500 mt-1"
                    rows={4}
                  />
                ) : (
                  <p className="text-blue-900 mt-1">{mentor.profile_bio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Availability Slots
              </CardTitle>
              <CardDescription className="text-blue-700">
                Set your available time slots for mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
  {isEditing ? (
    <AvailabilityScheduler
      selectedSlots={formData.availability_slots || []}
      onSlotsChange={handleAvailabilityChange}
    />
  ) : (
    <div className="space-y-4">
      {Object.entries(groupSlotsByDate(mentor.availability_slots)).map(([date, times]) => (
        <div key={date} className="bg-blue-100 border border-blue-300 rounded-lg p-4">
          <h3 className="text-blue-800 font-semibold mb-2">{date}</h3>
          <div className="flex flex-wrap gap-2">
            {times.map((time, index) => (
              <span
                key={index}
                className="bg-white text-blue-700 border border-blue-300 px-3 py-1 rounded-full text-sm"
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</CardContent>

          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          {/* Areas of Expertise */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Areas of Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid md:grid-cols-3 gap-3">
                  {expertiseOptions.map((expertise) => (
                    <div key={expertise} className="flex items-center space-x-2">
                      <Checkbox
                        id={expertise}
                        checked={formData.area_of_expertise?.includes(expertise) || false}
                        onCheckedChange={() => handleArrayToggle("area_of_expertise", expertise)}
                        className="border-blue-300"
                      />
                      <Label htmlFor={expertise} className="text-blue-700 text-sm">
                        {expertise}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {mentor.area_of_expertise.map((area, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {area}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Languages and Fee */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center">
                  <Languages className="mr-2 h-5 w-5" />
                  Languages Spoken
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-3">
                    {languageOptions.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={formData.languages_spoken?.includes(language) || false}
                          onCheckedChange={() => handleArrayToggle("languages_spoken", language)}
                          className="border-blue-300"
                        />
                        <Label htmlFor={language} className="text-blue-700 text-sm">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {mentor.languages_spoken.map((language, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {language}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Mentoring Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-blue-700 font-medium">Mentoring Fee (₹)</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={formData.mentoring_fee || ""}
                      onChange={(e) => handleInputChange("mentoring_fee", Number.parseInt(e.target.value))}
                      className="border-blue-200 focus:border-blue-500 mt-1"
                    />
                  ) : (
                    <p className="text-blue-900 mt-1">₹{mentor.mentoring_fee}</p>
                  )}
                </div>
                <div>
                  <Label className="text-blue-700 font-medium">Comfort Level</Label>
                  {isEditing ? (
                    <Select
                      value={formData.level_comfortable || ""}
                      onValueChange={(value) => handleInputChange("level_comfortable", value)}
                    >
                      <SelectTrigger className="border-blue-200 focus:border-blue-500 mt-1">
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
                  ) : (
                    <p className="text-blue-900 mt-1">{mentor.level_comfortable}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Requirements from Mentees
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={formData.requirements_from_mentees || ""}
                  onChange={(e) => handleInputChange("requirements_from_mentees", e.target.value)}
                  className="border-blue-200 focus:border-blue-500"
                  rows={3}
                  placeholder="What do you expect from your mentees?"
                />
              ) : (
                <p className="text-blue-900">{mentor.requirements_from_mentees || "No specific requirements"}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isEditing && (
        <div className="flex justify-end space-x-4 pt-6 border-t border-blue-200">
          <Button onClick={() => setIsEditing(false)} variant="outline" className="border-blue-300 bg-transparent">
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
  )
}
