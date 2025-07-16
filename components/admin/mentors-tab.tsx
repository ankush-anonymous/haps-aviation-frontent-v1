"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mentorAPI, type MentorResponse } from "@/lib/api"

export default function MentorsTab() {
  const [mentors, setMentors] = useState<MentorResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [feeFilter, setFeeFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalMentors, setTotalMentors] = useState(0)
  const [itemsPerPage] = useState(10)

  // Fetch mentors from API
 const fetchMentors = async (page = 1) => {
  setLoading(true)
  try {
    const offset = (page - 1) * itemsPerPage
    const response = await mentorAPI.getAllMentors(itemsPerPage, offset)
    

    // Ensure response.mentors exists and is an array
    setMentors(response.mentors)
setTotalMentors(response.total)

  } catch (error) {
    console.error("Failed to fetch mentors:", error)
    setMentors([]) // fallback on failure
    setTotalMentors(0)
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    fetchMentors(currentPage)
  }, [currentPage])

  // Handle delete mentor
  const handleDeleteMentor = async (id: string) => {
    if (confirm("Are you sure you want to delete this mentor?")) {
      try {
        await mentorAPI.deleteMentorById(id)
        fetchMentors(currentPage) // Refresh the list
      } catch (error) {
        console.error("Failed to delete mentor:", error)
        alert("Failed to delete mentor. Please try again.")
      }
    }
  }

  // Filter mentors based on search and filters
const filteredMentors = (mentors || []).filter((mentor) => {
    const matchesSearch =
      mentor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.current_occ_role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFee =
      feeFilter === "all" ||
      (() => {
        const fee = mentor.mentoring_fee
        switch (feeFilter) {
          case "0-1000":
            return fee >= 0 && fee <= 1000
          case "1000-2000":
            return fee > 1000 && fee <= 2000
          case "2000-5000":
            return fee > 2000 && fee <= 5000
          case "5000+":
            return fee > 5000
          default:
            return true
        }
      })()

    const matchesExperience =
      experienceFilter === "all" ||
      (() => {
        const exp = mentor.years_of_experience
        switch (experienceFilter) {
          case "0-5":
            return exp >= 0 && exp <= 5
          case "5-10":
            return exp > 5 && exp <= 10
          case "10-15":
            return exp > 10 && exp <= 15
          case "15+":
            return exp > 15
          default:
            return true
        }
      })()

    return matchesSearch && matchesFee && matchesExperience
  })

  // Pagination calculations
  const totalPages = Math.ceil(totalMentors / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalMentors)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mentors Management</h2>
            <p className="text-gray-600">Loading mentors...</p>
          </div>
        </div>
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mentors Management</h2>
          <p className="text-gray-600">Manage mentor profiles and information</p>
        </div>
        <Link href="/admin/add-mentor">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add New Mentor
          </Button>
        </Link>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Mentors</CardTitle>
          <CardDescription className="text-gray-600">A list of all mentors registered on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 border-gray-200 focus:border-gray-400"
              />
            </div>

            <Select onValueChange={setFeeFilter}>
              <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400">
                <SelectValue placeholder="Filter by Fee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fees</SelectItem>
                <SelectItem value="0-1000">₹0 - ₹1,000</SelectItem>
                <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                <SelectItem value="5000+">₹5,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400">
                <SelectValue placeholder="Filter by Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="0-5">0-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10-15">10-15 years</SelectItem>
                <SelectItem value="15+">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-900 font-medium">Name</TableHead>
                  <TableHead className="text-gray-900 font-medium">Email</TableHead>
                  <TableHead className="text-gray-900 font-medium">Role</TableHead>
                  <TableHead className="text-gray-900 font-medium">Experience</TableHead>
                  <TableHead className="text-gray-900 font-medium">Fee</TableHead>
                  <TableHead className="text-gray-900 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentors.map((mentor) => (
                  <TableRow key={mentor.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">
                      {mentor.first_name} {mentor.last_name}
                    </TableCell>
                    <TableCell className="text-gray-600">{mentor.email}</TableCell>
                    <TableCell className="text-gray-600">{mentor.current_occ_role}</TableCell>
                    <TableCell className="text-gray-600">{mentor.years_of_experience} years</TableCell>
                    <TableCell className="text-gray-600">₹{mentor.mentoring_fee}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/mentors/${mentor.id}`}>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/mentors/${mentor.id}/edit`}>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteMentor(mentor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {startItem} to {endItem} of {totalMentors} mentors
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={
                        currentPage === page
                          ? "bg-gray-900 text-white"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
