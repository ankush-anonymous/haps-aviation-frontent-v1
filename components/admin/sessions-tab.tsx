"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Session {
  id: string
  mentorName: string
  menteeName: string
  scheduledDateTime: string
  durationMinutes: number
  modeOfMeeting: string
  status: "Scheduled" | "Completed" | "Cancelled" | "No Show"
  createdAt: string
}

export default function SessionsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data - in real app, this would come from API
  const sessions: Session[] = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      menteeName: "Rahul Kumar",
      scheduledDateTime: "2024-01-25T14:00:00",
      durationMinutes: 90,
      modeOfMeeting: "Video Call",
      status: "Completed",
      createdAt: "2024-01-20",
    },
    {
      id: "2",
      mentorName: "Mike Rodriguez",
      menteeName: "Priya Patel",
      scheduledDateTime: "2024-01-26T10:00:00",
      durationMinutes: 60,
      modeOfMeeting: "Video Call",
      status: "Scheduled",
      createdAt: "2024-01-22",
    },
    {
      id: "3",
      mentorName: "Priya Sharma",
      menteeName: "Amit Singh",
      scheduledDateTime: "2024-01-24T16:00:00",
      durationMinutes: 90,
      modeOfMeeting: "Phone Call",
      status: "Cancelled",
      createdAt: "2024-01-18",
    },
  ]

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.menteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.status.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || session.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "No Show":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sessions Management</h2>
          <p className="text-gray-600">Monitor and manage mentorship sessions</p>
        </div>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Sessions</CardTitle>
          <CardDescription className="text-gray-600">A list of all mentorship sessions on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 border-gray-200 focus:border-gray-400"
              />
            </div>

            <Select onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="No Show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-900 font-medium">Mentor</TableHead>
                  <TableHead className="text-gray-900 font-medium">Mentee</TableHead>
                  <TableHead className="text-gray-900 font-medium">Scheduled</TableHead>
                  <TableHead className="text-gray-900 font-medium">Duration</TableHead>
                  <TableHead className="text-gray-900 font-medium">Mode</TableHead>
                  <TableHead className="text-gray-900 font-medium">Status</TableHead>
                  <TableHead className="text-gray-900 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{session.mentorName}</TableCell>
                    <TableCell className="text-gray-600">{session.menteeName}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(session.scheduledDateTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(session.scheduledDateTime).toLocaleTimeString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{session.durationMinutes} min</TableCell>
                    <TableCell className="text-gray-600">{session.modeOfMeeting}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/sessions/${session.id}`}>
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
