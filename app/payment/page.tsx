"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, CreditCard, Shield, Star, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const mentorId = searchParams.get("mentor")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock mentor data - in real app, fetch based on mentorId
  const mentor = {
    id: "1",
    name: "Captain Sarah Johnson",
    title: "Commercial Airline Pilot & DGCA Examiner",
    rating: 4.9,
    reviews: 127,
    price: "₹1,429",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["DGCA Clearance", "Ground School", "Exam Preparation"],
  }

  const timeSlots = [
    "Today, 2:00 PM - 3:30 PM",
    "Today, 4:00 PM - 5:30 PM",
    "Tomorrow, 10:00 AM - 11:30 AM",
    "Tomorrow, 2:00 PM - 3:30 PM",
    "Day After Tomorrow, 9:00 AM - 10:30 AM",
    "Day After Tomorrow, 3:00 PM - 4:30 PM",
  ]

  const handlePayment = async () => {
    if (!selectedTimeSlot || !paymentMethod) {
      alert("Please select a time slot and payment method")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    alert("Payment successful! You'll receive a confirmation email with meeting details.")
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Complete Your Booking</h1>
          <p className="text-xl text-blue-100">
            You're one step away from your personalized aviation mentorship session
          </p>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mentor Info */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Your Selected Mentor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={mentor.image || "/placeholder.svg"}
                      alt={mentor.name}
                      width={80}
                      height={80}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">{mentor.name}</h3>
                      <p className="text-blue-700 text-sm">{mentor.title}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-blue-600">
                          {mentor.rating} ({mentor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-900">{mentor.price}</div>
                      <div className="text-sm text-blue-600">per session</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Slot Selection */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Select Time Slot
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Choose your preferred time for the mentorship session
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {timeSlots.map((slot, index) => (
                      <Button
                        key={index}
                        variant={selectedTimeSlot === slot ? "default" : "outline"}
                        className={`justify-start p-4 h-auto ${
                          selectedTimeSlot === slot
                            ? "bg-blue-600 text-white"
                            : "border-blue-200 text-blue-800 hover:bg-blue-50"
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-blue-900 font-medium">Select Payment Method</Label>
                    <Select onValueChange={setPaymentMethod}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-500">
                        <SelectValue placeholder="Choose payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI Payment</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                        <SelectItem value="wallet">Digital Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardNumber" className="text-blue-900">
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName" className="text-blue-900">
                            Cardholder Name
                          </Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-blue-900">
                            Expiry Date
                          </Label>
                          <Input id="expiry" placeholder="MM/YY" className="border-blue-200 focus:border-blue-500" />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-blue-900">
                            CVV
                          </Label>
                          <Input id="cvv" placeholder="123" className="border-blue-200 focus:border-blue-500" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <Label htmlFor="upiId" className="text-blue-900">
                        UPI ID
                      </Label>
                      <Input id="upiId" placeholder="yourname@upi" className="border-blue-200 focus:border-blue-500" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-blue-200 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-blue-900">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Mentorship Session</span>
                      <span className="text-blue-900">₹1,429</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Platform Fee</span>
                      <span className="text-blue-900">₹71</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">GST (18%)</span>
                      <span className="text-blue-900">₹270</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span className="text-blue-900">Total Amount</span>
                    <span className="text-blue-900">₹1,770</span>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">What's Included:</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        90-minute 1-on-1 session
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Personalized guidance
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Session recording
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Follow-up resources
                      </li>
                    </ul>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={!selectedTimeSlot || !paymentMethod || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Pay Securely
                      </>
                    )}
                  </Button>

                  <div className="text-center text-xs text-blue-600">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Secure payment powered by industry-standard encryption
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
