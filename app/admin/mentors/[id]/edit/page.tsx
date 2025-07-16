"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { mentorAPI, type MentorResponse, type CreateMentorRequest } from "@/lib/api"

export default function EditMentorPage() {
  const params = useParams()
  const router = useRouter()
  const mentorId = params.id as string

  const [mentor, setMentor] = useState<MentorResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<CreateMentorRequest>>({})

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await mentorAPI.getMentorById(mentorId)
        setMentor(response)
        setFormData({
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          phone_number: response.phone_number,
          linkedin_url: response.linkedin_url,
          current_occ_role: response.current_occ_role,
          years_of_experience: response.years_of_experience,
          area_of_expertise: response.area_of_expertise,
          availability_slots: response.availability_slots,
          profile_bio: response.profile_bio,
          languages_spoken: response.languages_spoken,
          mentoring_fee: typeof response.mentoring_fee === "number" ? response.mentoring_fee : 0,
          level_comfortable: response.level_comfortable,
          documents: response.documents,
          requirements_from_mentees: response.requirements_from_mentees,
        })
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

  const handleInputChange = (field: keyof CreateMentorRequest, value: any) => {
  setFormData((prev) => ({
    ...prev,
    [field]: field === "mentoring_fee" || field === "years_of_experience"
      ? Number.parseInt(value) || 0
      : value,
  }))
}


  const handleArrayInputChange = (field: keyof CreateMentorRequest, value: string) => {
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
    setFormData((prev) => ({
      ...prev,
      [field]: arrayValue,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await mentorAPI.updateMentorById(mentorId, formData)
      router.push(`/admin/mentors/${mentorId}`)
    } catch (error) {
      console.error("Failed to update mentor:", error)
      alert("Failed to update mentor. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
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
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link href={`/admin/mentors/${mentorId}`}>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mentor Details
            </Button>
          </Link>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Edit Mentor Profile</CardTitle>
            <CardDescription className="text-gray-600">Update mentor information and profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name || ""}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name || ""}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={formData.phone_number || ""}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url || ""}
                  onChange={(e) => handleInputChange("linkedin_url", e.target.value)}
                />
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current_occ_role">Current Role</Label>
                  <Input
                    id="current_occ_role"
                    value={formData.current_occ_role || ""}
                    onChange={(e) => handleInputChange("current_occ_role", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="years_of_experience">Years of Experience</Label>
                  <Input
                    id="years_of_experience"
                    type="number"
                    value={formData.years_of_experience || ""}
                    onChange={(e) => handleInputChange("years_of_experience", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="profile_bio">Profile Bio</Label>
                <Textarea
                  id="profile_bio"
                  value={formData.profile_bio || ""}
                  onChange={(e) => handleInputChange("profile_bio", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Arrays */}
              <div>
                <Label htmlFor="area_of_expertise">Areas of Expertise (comma-separated)</Label>
                <Input
                  id="area_of_expertise"
                  value={formData.area_of_expertise?.join(", ") || ""}
                  onChange={(e) => handleArrayInputChange("area_of_expertise", e.target.value)}
                  placeholder="e.g., Flight School, Subject Doubts, Career Guidance"
                />
              </div>

              <div>
                <Label htmlFor="languages_spoken">Languages Spoken (comma-separated)</Label>
                <Input
                  id="languages_spoken"
                  value={formData.languages_spoken?.join(", ") || ""}
                  onChange={(e) => handleArrayInputChange("languages_spoken", e.target.value)}
                  placeholder="e.g., English, Hindi, Spanish"
                />
              </div>

              <div>
                <Label htmlFor="availability_slots">Availability Slots (comma-separated)</Label>
                <Textarea
                  id="availability_slots"
                  value={formData.availability_slots?.join(", ") || ""}
                  onChange={(e) => handleArrayInputChange("availability_slots", e.target.value)}
                  placeholder="e.g., Monday 10:00-12:00, Wednesday 15:00-17:00"
                  rows={3}
                />
              </div>

              {/* Mentoring Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mentoring_fee">Mentoring Fee (₹)</Label>
                  <Input
                    id="mentoring_fee"
                    type="number"
                    value={formData.mentoring_fee || ""}
                    onChange={(e) => handleInputChange("mentoring_fee", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="level_comfortable">Comfort Level</Label>
                  <Select
                    value={formData.level_comfortable || ""}
                    onValueChange={(value) => handleInputChange("level_comfortable", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select comfort level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="All Levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements_from_mentees">Requirements from Mentees</Label>
                <Textarea
                  id="requirements_from_mentees"
                  value={formData.requirements_from_mentees || ""}
                  onChange={(e) => handleInputChange("requirements_from_mentees", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="documents">Document URLs (comma-separated)</Label>
                <Textarea
                  id="documents"
                  value={formData.documents?.join(", ") || ""}
                  onChange={(e) => handleArrayInputChange("documents", e.target.value)}
                  placeholder="e.g., https://example.com/doc1.pdf, https://example.com/doc2.pdf"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Link href={`/admin/mentors/${mentorId}`}>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
