"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  CreditCard,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { meetingAPI, mentorAPI } from "@/lib/api";
import { MenteeResponse, MentorResponse } from "@/lib/interfaces";
const useRouter = require("next/navigation")

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const mentorId = searchParams.get("mentor");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mentor, setMentor] = useState<MentorResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (mentorId) {
      fetchMentor();
    } else {
      alert("Mentor ID is missing. Please try again.");
    }
  });

  const fetchMentor = async () => {
    if (!mentorId) {
      alert("Mentor ID is missing. Please try again.");
      return;
    }
    try {
      const mentor = await mentorAPI.getMentorById(mentorId);
      setMentor(mentor);
    } catch (error) {
      console.error("Failed to fetch mentor:", error);
      alert("Failed to load mentor details. Please try again later.");
    }
  };

// selectedTimeSlot = "2025-07-20#10:00-11:30"
const handlePayment = async () => {
  setIsProcessing(true);

  try {
    const menteeData = localStorage.getItem("menteeData");
    const bookingData = localStorage.getItem("bookingData");

    if (!menteeData || !bookingData) {
      alert("Session expired. Please try again.");
      return;
    }

    const mentee: MenteeResponse = JSON.parse(menteeData);
    const booking = JSON.parse(bookingData);

    const selectedSlot = selectedTimeSlot || booking?.date;
    if (!selectedSlot) {
      alert("No time slot selected.");
      return;
    }

    const scheduledDateTime = new Date(selectedSlot);

    if (isNaN(scheduledDateTime.getTime())) {
      alert("Invalid date or time.");
      return;
    }

    // Fetch pre-created GMeet link from your backend
    const meetingLink = await fetch("/api/meet-link").then(res => res.text());

    const meetingData = {
      mentor_id: mentorId || booking.mentorId,
      mentee_id: mentee.id,
      scheduled_datetime: scheduledDateTime.toISOString(),
      duration_minutes: 90,
      mode_of_meeting: "Video Call",
      meeting_link: meetingLink,
      status: "Scheduled" as const,
      reschedule_requested: false,
      reschedule_reason: "",
      notes_mentor: "Prepare syllabus overview",
      notes_mentee: "Looking forward to the session",
      session_recording: "",
    };

    await meetingAPI.createMeeting(meetingData);

    alert("Meeting successfully scheduled. You'll receive the Google Meet link by email.");
    localStorage.removeItem("bookingData");
    router.push("/mentee/dashboard");
  } catch (error) {
    console.error("Meeting creation failed:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};




  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Your Booking
          </h1>
          <p className="text-xl text-blue-100">
            You're one step away from your personalized aviation mentorship
            session
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
             {mentor && (
  <Card className="border-blue-200">
    <CardHeader>
      <CardTitle className="text-blue-900">Your Selected Mentor</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-4">
        <Image
          src={mentor.documents?.[0] ?? "/placeholder.svg"}
          alt={`${mentor.first_name} ${mentor.last_name}`}
          width={80}
          height={80}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900">
            {mentor.first_name} {mentor.last_name}
          </h3>
          <p className="text-blue-700 text-sm">{mentor.current_occ_role}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-blue-600">
              5.0 (12 reviews) {/* Static/placeholder */}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-blue-900">
            ₹{mentor.mentoring_fee}
          </div>
          <div className="text-sm text-blue-600">per session</div>
        </div>
      </div>
    </CardContent>
  </Card>
)}


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
                    <Label className="text-blue-900 font-medium">
                      Select Payment Method
                    </Label>
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
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-blue-900">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <Label htmlFor="upiId" className="text-blue-900">
                        UPI ID
                      </Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-blue-200 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    Booking Summary
                  </CardTitle>
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
                    <h4 className="font-medium text-blue-900 mb-2">
                      What's Included:
                    </h4>
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
                    disabled={!paymentMethod || isProcessing}
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
  );
}
