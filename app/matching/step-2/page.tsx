"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Star, TrendingUp, Award } from "lucide-react"

export default function MatchingStep2() {
  const [selectedLevel, setSelectedLevel] = useState("")

  const levels = [
    {
      id: "beginner",
      title: "Beginner",
      description: "Just starting your aviation journey, need foundational guidance",
      icon: Star,
      details: "Perfect for those new to aviation or just beginning their training",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Have some aviation knowledge, need specific guidance and direction",
      icon: TrendingUp,
      details: "Ideal for students currently in training or with basic aviation experience",
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Experienced in aviation, need expert-level mentorship and career guidance",
      icon: Award,
      details: "Best for licensed pilots or aviation professionals seeking career advancement",
    },
  ]

  const handleNext = () => {
    if (selectedLevel) {
      localStorage.setItem("matchingStep2", selectedLevel)
      window.location.href = "/matching/step-3"
    }
  }

  const handleBack = () => {
    window.location.href = "/matching/step-1"
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
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
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
              What level of guidance are you looking for?
            </h2>
            <p className="text-xl text-blue-700">
              Help us understand your experience level to match you with the most suitable mentor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {levels.map((level) => (
              <Card
                key={level.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedLevel === level.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-blue-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <CardHeader className="text-center pb-4">
                  <level.icon
                    className={`h-16 w-16 mx-auto mb-4 ${
                      selectedLevel === level.id ? "text-blue-600" : "text-blue-500"
                    }`}
                  />
                  <CardTitle className="text-blue-900 text-xl">{level.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <CardDescription className="text-blue-700 mb-3">{level.description}</CardDescription>
                  <p className="text-blue-600 text-sm font-medium">{level.details}</p>
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
              disabled={!selectedLevel}
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
