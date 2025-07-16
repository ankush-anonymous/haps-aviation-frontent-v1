"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plane, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function MentorNavbar() {
  const [mentorData, setMentorData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem("mentorData")
    if (data) {
      setMentorData(JSON.parse(data))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("mentorData")
    localStorage.removeItem("isMentorLoggedIn")
    router.push("/mentor/login")
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/mentor/dashboard" className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-orange-600" />
          <span className="text-xl font-bold text-gray-900">SkyMentor</span>
        </Link>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-orange-100 text-orange-600">
                  {mentorData ? getInitials(mentorData.first_name, mentorData.last_name) : "M"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">
                {mentorData ? `${mentorData.first_name} ${mentorData.last_name}` : "Mentor"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{mentorData?.email || "mentor@example.com"}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/mentor/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
