"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { AdminResponse } from "@/lib/api"
import AdminNavbar from "@/components/admin/admin-navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [admin, setAdmin] = useState<AdminResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip authentication check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false)
      return
    }

    const adminData = localStorage.getItem("adminData")
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn")

    if (!adminData || !isAdminLoggedIn) {
      router.push("/admin/login")
      return
    }

    try {
      const parsedAdmin = JSON.parse(adminData)
      setAdmin(parsedAdmin)
    } catch (error) {
      console.error("Failed to parse admin data:", error)
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }, [router, pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Render login page without authentication wrapper
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Render dashboard with authentication and admin navbar
  if (!admin) {
    return null
  }

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  )
}
