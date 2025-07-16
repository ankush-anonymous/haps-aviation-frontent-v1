"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Target } from "lucide-react"

export default function MatchingStep3() {
  const [specificGoal, setSpecificGoal] = useState("")

  const commonGoals = [
    "Clearing DGCA exam",
    "Finding a flight school abroad",
    "Getting commercial pilot license",
    "Passing instrument rating",
    "Career transition to aviation",
    "Improving flight skills",
  ]

  const handleNext = () => {
    if (specificGoal.trim()) {
      localStorage.setItem("matchingStep3", specificGoal)
      window.location.href = "/matching/step-4"
    }
  }

  const handleBack = () => {
    window.location.href = "/matching/step-2"
  }

  const selectCommonGoal = (goal: string) => {
    setSpecificGoal(goal)
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
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
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
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Do you have a specific goal in mind?</h2>
            <p className="text-xl text-blue-700">
              Tell us about your specific aviation goal so we can match you with a mentor who specializes in that area.
            </p>
          </div>

          <Card className="border-blue-200 mb-8">
            <CardHeader>
              <CardTitle className="text-blue-900">Your Specific Goal</CardTitle>
              <CardDescription className="text-blue-700">
                Be as specific as possible (e.g., "clearing DGCA exam", "finding a flight school abroad")
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="goal" className="text-blue-900 font-medium">
                What do you want to achieve? *
              </Label>
              <Input
                id="goal"
                type="text"
                value={specificGoal}
                onChange={(e) => setSpecificGoal(e.target.value)}
                placeholder="Enter your specific aviation goal..."
                className="border-blue-200 focus:border-blue-500 mt-2"
                required
              />
            </CardContent>
          </Card>

          <Card className="border-blue-200 mb-12">
            <CardHeader>
              <CardTitle className="text-blue-900">Common Goals</CardTitle>
              <CardDescription className="text-blue-700">
                Click on any of these common goals to select them quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {commonGoals.map((goal, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start border-blue-200 text-blue-800 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                    onClick={() => selectCommonGoal(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

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
              disabled={!specificGoal.trim()}
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
