"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plane, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { MenteeResponse } from "@/lib/api"

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mentee, setMentee] = useState<MenteeResponse | null>(null)
  const router = useRouter()

useEffect(() => {
  const menteeData = localStorage.getItem("menteeData")
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  if (!menteeData || !isLoggedIn) {
    router.push("/login")
    return
  }

  try {
    const parsedMentee = JSON.parse(menteeData)
    setMentee(parsedMentee)
  } catch (error) {
    console.error("Failed to parse mentee data:", error)
    router.push("/login")
  }
}, [router])



  const handleLogout = () => {
    localStorage.removeItem("menteeData")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  if (!mentee) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/mentee/dashboard" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">SkyMentor</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white">{getInitials(mentee.full_name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-gray-900">{mentee.full_name}</p>
                  <p className="text-xs text-gray-500">{mentee.email}</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/mentee/profile" className="flex items-center">
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

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
