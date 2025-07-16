"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    interest: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you within 24 hours.")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri 8AM-6PM EST",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@skymentor.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Aviation Hub Center",
      description: "123 Sky Drive, Aviation City, AC 12345",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      description: "8:00 AM - 6:00 PM EST",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to start your aviation mentorship journey? We're here to help you take the next step.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Send Us a Message</CardTitle>
                <CardDescription className="text-blue-700">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-blue-900">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-blue-900">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-blue-900">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-blue-900">
                      Aviation Experience Level
                    </Label>
                    <Select onValueChange={(value) => handleChange("experience", value)}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-500">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Complete Beginner</SelectItem>
                        <SelectItem value="student">Student Pilot</SelectItem>
                        <SelectItem value="private">Private Pilot</SelectItem>
                        <SelectItem value="commercial">Commercial Pilot</SelectItem>
                        <SelectItem value="instructor">Flight Instructor</SelectItem>
                        <SelectItem value="professional">Aviation Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="interest" className="text-blue-900">
                      Area of Interest
                    </Label>
                    <Select onValueChange={(value) => handleChange("interest", value)}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-500">
                        <SelectValue placeholder="What are you interested in?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="career-guidance">Career Guidance</SelectItem>
                        <SelectItem value="flight-training">Flight Training</SelectItem>
                        <SelectItem value="commercial-aviation">Commercial Aviation</SelectItem>
                        <SelectItem value="military-transition">Military Transition</SelectItem>
                        <SelectItem value="instructor-development">Instructor Development</SelectItem>
                        <SelectItem value="aviation-management">Aviation Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-blue-900">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your goals and how we can help you..."
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">Contact Information</h2>
                <p className="text-lg text-blue-700 mb-8">
                  Have questions about our mentorship programs? We're here to help you navigate your aviation career
                  path.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <info.icon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-1">{info.title}</h3>
                          <p className="text-blue-800 font-medium">{info.details}</p>
                          <p className="text-blue-600 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Section */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Quick Questions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">How long are mentorship sessions?</h4>
                      <p className="text-blue-700 text-sm">
                        Sessions typically last 60-90 minutes, but can be customized based on your needs.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">What's the cost of mentorship?</h4>
                      <p className="text-blue-700 text-sm">
                        Pricing varies by mentor and program type. Contact us for detailed pricing information.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Can I choose my mentor?</h4>
                      <p className="text-blue-700 text-sm">
                        Yes! We'll match you with mentors based on your goals and preferences.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't wait to accelerate your aviation career. Book your first mentorship session today.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Book Consultation Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
