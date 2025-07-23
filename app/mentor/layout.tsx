"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plane, User, Settings, LogOut, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import type { MentorResponse } from "@/lib/interfaces"

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mentor, setMentor] = useState<MentorResponse | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()
  const pathname = usePathname()

   useEffect(() => {
    const mentorData = localStorage.getItem("mentorData")
    const isMentorLoggedIn = localStorage.getItem("isMentorLoggedIn")

    // Exception for signup and login routes
    const publicPaths = ["/mentor/login", "/mentor/signup", "/mentor/onboard"]

    // Skip auth check for public routes
    if (publicPaths.includes(pathname)) return

    // Redirect if not logged in
    if (!mentorData || !isMentorLoggedIn) {
      router.push("/mentor/login")
    }
  }, [pathname, router])


   const handleLogout = () => {
    localStorage.removeItem("adminData")
    localStorage.removeItem("isAdminLoggedIn")

    sessionStorage.clear()

    router.push("/admin/login")
  }

  // Render login page without layout
  if (pathname === "/mentor/login") {
    return <>{children}</>
  }
  if (pathname === "/mentor/signup") {
    return <>{children}</>
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/mentor/dashboard" },
    { id: "schedule", label: "Schedule", icon: Calendar, href: "/mentor/schedule" },
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/mentor/dashboard" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">SkyMentor</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(mentor.first_name, mentor.last_name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-gray-900">
                    {mentor.first_name} {mentor.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{mentor.email}</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/mentor/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
              
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-blue-200 min-h-[calc(100vh-4rem)]">
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-blue-700 hover:text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
