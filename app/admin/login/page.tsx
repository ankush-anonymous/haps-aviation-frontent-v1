"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, LogIn, Shield } from "lucide-react"
import Link from "next/link"
import { adminAPI } from "@/lib/api"

export default function AdminLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await adminAPI.loginAdmin(phoneNumber)

      // Store admin data in localStorage
      localStorage.setItem("adminData", JSON.stringify(response))
      localStorage.setItem("isAdminLoggedIn", "true")

      // Redirect to admin dashboard
      window.location.href = "/admin"
    } catch (error) {
      console.error("Admin login failed:", error)
      alert("Login failed. Please check your phone number and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-gray-900" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Admin Login</CardTitle>
            <CardDescription className="text-gray-600">Sign in to SkyMentor Admin Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-gray-900 font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 9876543210"
                    className="pl-10 border-gray-200 focus:border-gray-400"
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                {isLoading ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Need access?{" "}
                <Link href="/contact" className="text-gray-900 hover:underline font-medium">
                  Contact Support
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700">
                Mentee Login →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
