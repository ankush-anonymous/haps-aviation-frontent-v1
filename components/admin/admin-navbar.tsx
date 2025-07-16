"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plane, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type { AdminResponse } from "@/lib/api"

export default function AdminNavbar() {
  const [admin, setAdmin] = useState<AdminResponse | null>(null)
  const router = useRouter()

  useEffect(() => {
    const adminData = localStorage.getItem("adminData")
    if (adminData) {
      try {
        const parsedAdmin = JSON.parse(adminData)
        
        setAdmin(parsedAdmin.admin)
      } catch (error) {
        console.error("Failed to parse admin data:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminData")
    localStorage.removeItem("isAdminLoggedIn")
    router.push("/admin/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (!admin) {
    return null
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-gray-900" />
            <span className="text-xl font-bold text-gray-900">SkyMentor</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gray-900 text-white">{getInitials(admin.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
             
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
