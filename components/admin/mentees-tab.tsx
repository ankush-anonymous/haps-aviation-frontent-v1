"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { menteeAPI, type MenteeResponse } from "@/lib/api"

export default function MenteesTab() {
  const [mentees, setMentees] = useState<MenteeResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [budgetFilter, setBudgetFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalMentees, setTotalMentees] = useState(0)
  const [itemsPerPage] = useState(10)

  // Fetch mentees from API
  const fetchMentees = async (page = 1) => {
    setLoading(true)
    try {
      const offset = (page - 1) * itemsPerPage
      const response = await menteeAPI.getAllMentees(itemsPerPage, offset)

      setMentees(response.mentees)
      setTotalMentees(response.total)
    } catch (error) {
      console.error("Failed to fetch mentees:", error)
      setMentees([])
      setTotalMentees(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMentees(currentPage)
  }, [currentPage])

  // Handle delete mentee
  const handleDeleteMentee = async (id: string) => {
    if (confirm("Are you sure you want to delete this mentee?")) {
      try {
        await menteeAPI.deleteMenteeById(id)
        fetchMentees(currentPage)
      } catch (error) {
        console.error("Failed to delete mentee:", error)
        alert("Failed to delete mentee. Please try again.")
      }
    }
  }

  // Filter mentees based on search and filters
  const filteredMentees = (mentees || []).filter((mentee) => {
    const matchesSearch =
      mentee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.current_stage.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBudget =
      budgetFilter === "all" ||
      (() => {
        const budget = mentee.budget
        switch (budgetFilter) {
          case "0-1000":
            return budget >= 0 && budget <= 1000
          case "1000-2000":
            return budget > 1000 && budget <= 2000
          case "2000-5000":
            return budget > 2000 && budget <= 5000
          case "5000+":
            return budget > 5000
          default:
            return true
        }
      })()

    const matchesStage = stageFilter === "all" || mentee.current_stage.toLowerCase().includes(stageFilter.toLowerCase())

    return matchesSearch && matchesBudget && matchesStage
  })

  // Pagination calculations
  const totalPages = Math.ceil(totalMentees / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalMentees)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mentees Management</h2>
            <p className="text-gray-600">Loading mentees...</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Mentees Management</h2>
          <p className="text-gray-600">Manage mentee profiles and information</p>
        </div>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Mentees</CardTitle>
          <CardDescription className="text-gray-600">A list of all mentees registered on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search mentees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 border-gray-200 focus:border-gray-400"
              />
            </div>

            <Select onValueChange={setBudgetFilter}>
              <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400">
                <SelectValue placeholder="Filter by Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="0-1000">₹0 - ₹1,000</SelectItem>
                <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                <SelectItem value="5000+">₹5,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setStageFilter}>
              <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400">
                <SelectValue placeholder="Filter by Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="career change">Career Change</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-900 font-medium">Name</TableHead>
                  <TableHead className="text-gray-900 font-medium">Email</TableHead>
                  <TableHead className="text-gray-900 font-medium">Stage</TableHead>
                  <TableHead className="text-gray-900 font-medium">Age Group</TableHead>
                  <TableHead className="text-gray-900 font-medium">Budget</TableHead>
                  <TableHead className="text-gray-900 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentees.map((mentee) => (
                  <TableRow key={mentee.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{mentee.full_name}</TableCell>
                    <TableCell className="text-gray-600">{mentee.email}</TableCell>
                    <TableCell className="text-gray-600">{mentee.current_stage}</TableCell>
                    <TableCell className="text-gray-600">{mentee.age_group}</TableCell>
                    <TableCell className="text-gray-600">₹{mentee.budget}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/mentees/${mentee.id}`}>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteMentee(mentee.id)}
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
              Showing {startItem} to {endItem} of {totalMentees} mentees
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
