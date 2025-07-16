"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Play, BookOpen, GraduationCap, Plane } from "lucide-react"

export default function MatchingStep4() {
  const [selectedStage, setSelectedStage] = useState("")

  const stages = [
    {
      id: "just-getting-started",
      title: "Just Getting Started",
      description: "New to aviation, exploring career options",
      icon: Play,
      details: "Perfect for those who are just beginning to explore aviation as a career",
    },
    {
      id: "preparing-ground-school",
      title: "Preparing for Ground School",
      description: "Ready to start formal aviation education",
      icon: BookOpen,
      details: "Ideal for those planning to enroll in ground school or aviation courses",
    },
    {
      id: "completed-cpl",
      title: "Completed CPL",
      description: "Have commercial pilot license, planning next steps",
      icon: GraduationCap,
      details: "Great for licensed pilots looking for career guidance and opportunities",
    },
    {
      id: "considering-abroad-options",
      title: "Considering Abroad Options",
      description: "Exploring international flight training opportunities",
      icon: Plane,
      details: "Perfect for those considering flight training or career opportunities abroad",
    },
  ]

  const handleNext = () => {
    if (selectedStage) {
      localStorage.setItem("matchingStep4", selectedStage)
      window.location.href = "/matching/results"
    }
  }

  const handleBack = () => {
    window.location.href = "/matching/step-3"
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-blue-900">Finding Your Perfect Mentor</h1>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-300 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="w-8 h-1 bg-blue-300"></div>
              <div className="w-8 h-8 bg-blue-300 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="w-8 h-1 bg-blue-300"></div>
              <div className="w-8 h-8 bg-blue-300 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div className="w-8 h-1 bg-blue-300"></div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
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
              What's your current stage in your aviation journey?
            </h2>
            <p className="text-xl text-blue-700">
              This final question helps us understand where you are in your aviation career path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {stages.map((stage) => (
              <Card
                key={stage.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedStage === stage.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-blue-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedStage(stage.id)}
              >
                <CardHeader className="text-center pb-4">
                  <stage.icon
                    className={`h-12 w-12 mx-auto mb-3 ${
                      selectedStage === stage.id ? "text-blue-600" : "text-blue-500"
                    }`}
                  />
                  <CardTitle className="text-blue-900 text-lg">{stage.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <CardDescription className="text-blue-700 mb-3">{stage.description}</CardDescription>
                  <p className="text-blue-600 text-sm font-medium">{stage.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handleBack}
              variant="outline"
              size="lg"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedStage}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Find My Mentors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
