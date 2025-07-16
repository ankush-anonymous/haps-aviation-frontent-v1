"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Star } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Feedback {
  id: string
  mentorName: string
  menteeName: string
  rating: number
  whatWentWell: string
  recommendMentor: boolean
  createdAt: string
}

export default function FeedbackTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")

  // Mock data - in real app, this would come from API
  const feedbacks: Feedback[] = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      menteeName: "Rahul Kumar",
      rating: 5,
      whatWentWell: "Excellent guidance on DGCA exam preparation. Very knowledgeable and patient.",
      recommendMentor: true,
      createdAt: "2024-01-25",
    },
    {
      id: "2",
      mentorName: "Mike Rodriguez",
      menteeName: "Priya Patel",
      rating: 4,
      whatWentWell: "Good insights on flight school selection abroad. Helpful resources provided.",
      recommendMentor: true,
      createdAt: "2024-01-26",
    },
    {
      id: "3",
      mentorName: "Priya Sharma",
      menteeName: "Amit Singh",
      rating: 5,
      whatWentWell: "Amazing session on navigation concepts. Cleared all my doubts effectively.",
      recommendMentor: true,
      createdAt: "2024-01-24",
    },
  ]

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.menteeName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = ratingFilter === "all" || feedback.rating.toString() === ratingFilter

    return matchesSearch && matchesRating
  })

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feedback Management</h2>
          <p className="text-gray-600">Monitor session feedback and mentor ratings</p>
        </div>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Feedback</CardTitle>
          <CardDescription className="text-gray-600">
            A list of all feedback received from mentorship sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 border-gray-200 focus:border-gray-400"
              />
            </div>

            <Select onValueChange={setRatingFilter}>
              <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400">
                <SelectValue placeholder="Filter by Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-900 font-medium">Mentor</TableHead>
                  <TableHead className="text-gray-900 font-medium">Mentee</TableHead>
                  <TableHead className="text-gray-900 font-medium">Rating</TableHead>
                  <TableHead className="text-gray-900 font-medium">Feedback</TableHead>
                  <TableHead className="text-gray-900 font-medium">Recommend</TableHead>
                  <TableHead className="text-gray-900 font-medium">Date</TableHead>
                  <TableHead className="text-gray-900 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedbacks.map((feedback) => (
                  <TableRow key={feedback.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{feedback.mentorName}</TableCell>
                    <TableCell className="text-gray-600">{feedback.menteeName}</TableCell>
                    <TableCell>{renderStars(feedback.rating)}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-gray-600 truncate">{feedback.whatWentWell}</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={feedback.recommendMentor ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {feedback.recommendMentor ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{new Date(feedback.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/feedback/${feedback.id}`}>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
