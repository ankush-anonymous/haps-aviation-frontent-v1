"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Users, UserCheck, Calendar, MessageSquare, Settings, LogOut, Plane } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "mentors", label: "Mentors", icon: Users },
    { id: "mentees", label: "Mentees", icon: UserCheck },
    { id: "sessions", label: "Sessions", icon: Calendar },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "admins", label: "Admins", icon: Settings },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Plane className="h-8 w-8 text-gray-900" />
          <span className="text-xl font-bold text-gray-900">SkyMentor Admin</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === item.id
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <Separator className="my-6" />

        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => {
            localStorage.removeItem("adminData")
            localStorage.removeItem("isAdminLoggedIn")
            window.location.href = "/admin/login"
          }}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
