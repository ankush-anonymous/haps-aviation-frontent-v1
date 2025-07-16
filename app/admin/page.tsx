"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Calendar, MessageSquare } from "lucide-react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import MentorsTab from "@/components/admin/mentors-tab"
import MenteesTab from "@/components/admin/mentees-tab"
import SessionsTab from "@/components/admin/sessions-tab"
import FeedbackTab from "@/components/admin/feedback-tab"
import AdminsTab from "@/components/admin/admins-tab"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const adminData = localStorage.getItem("adminData")
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn")

    if (!adminData || !isLoggedIn) {
      router.push("/admin/login")
      return
    }

    setIsAuthenticated(true)

    // Check if there's a tab parameter in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Mentors",
      value: "24",
      icon: Users,
      description: "Active mentors on platform",
    },
    {
      title: "Total Mentees",
      value: "156",
      icon: UserCheck,
      description: "Registered mentees",
    },
    {
      title: "Sessions This Month",
      value: "89",
      icon: Calendar,
      description: "Completed sessions",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: MessageSquare,
      description: "From feedback reviews",
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "mentors":
        return <MentorsTab />
      case "mentees":
        return <MenteesTab />
      case "sessions":
        return <SessionsTab />
      case "feedback":
        return <FeedbackTab />
      case "admins":
        return <AdminsTab />
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Monitor your aviation mentorship platform performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-600">Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">New mentor registered: Captain Sarah Johnson</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Session completed: DGCA Exam Preparation</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Feedback received: 5-star rating</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-600">Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab("mentors")}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">Manage Mentors</p>
                          <p className="text-sm text-gray-500">Add, edit, or remove mentors</p>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("sessions")}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">View Sessions</p>
                          <p className="text-sm text-gray-500">Monitor upcoming and past sessions</p>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("feedback")}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">Review Feedback</p>
                          <p className="text-sm text-gray-500">Check mentor and session feedback</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
