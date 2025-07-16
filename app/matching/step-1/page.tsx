"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, FileText, GraduationCap, HelpCircle, Monitor, PenTool } from "lucide-react"

export default function MatchingStep1() {
  const [selectedArea, setSelectedArea] = useState("")

  const areas = [
    {
      id: "ground-school",
      title: "Ground School",
      description: "Theory classes, regulations, and aviation fundamentals",
      icon: BookOpen,
    },
    {
      id: "dgca-clearance",
      title: "DGCA Clearance",
      description: "DGCA exams, documentation, and certification process",
      icon: FileText,
    },
    {
      id: "flight-school-selection",
      title: "Flight School Selection",
      description: "Choosing the right flight training academy",
      icon: GraduationCap,
    },
    {
      id: "subject-doubts",
      title: "Subject Doubts",
      description: "Specific subject clarifications and problem solving",
      icon: HelpCircle,
    },
    {
      id: "simulator-training",
      title: "Simulator Training",
      description: "Flight simulator practice and techniques",
      icon: Monitor,
    },
    {
      id: "exam-preparation",
      title: "Exam Preparation",
      description: "Study strategies and exam techniques",
      icon: PenTool,
    },
  ]

  const handleNext = () => {
    if (selectedArea) {
      localStorage.setItem("matchingStep1", selectedArea)
      window.location.href = "/matching/step-2"
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-blue-900">Finding Your Perfect Mentor</h1>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="w-8 h-1 bg-blue-200"></div>
              <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="w-8 h-1 bg-blue-200"></div>
              <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div className="w-8 h-1 bg-blue-200"></div>
              <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              What area do you need the most help with right now?
            </h2>
            <p className="text-xl text-blue-700">
              Select the area where you need the most guidance to help us match you with the right mentor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {areas.map((area) => (
              <Card
                key={area.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedArea === area.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-blue-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedArea(area.id)}
              >
                <CardHeader className="text-center pb-4">
                  <area.icon
                    className={`h-12 w-12 mx-auto mb-3 ${selectedArea === area.id ? "text-blue-600" : "text-blue-500"}`}
                  />
                  <CardTitle className="text-blue-900 text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-blue-700 text-center text-sm">{area.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleNext}
              disabled={!selectedArea}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
