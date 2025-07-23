"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Star,
  Award,
  Languages,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { mentorAPI } from "@/lib/api";
import {
  MentorResponse,
  CreateMentorRequest,
  MentorsListResponse,
} from "@/lib/interfaces";

export default function BookAppointment() {
  interface DateTimeSlot {
    id: string;
    date: string;
    time: string;
    display: string;
    available: boolean;
  }

  interface TimeSlot {
    id: string;
    display: string;
    value: string;
    available: boolean;
  }

  const searchParams = useSearchParams();
  const router = useRouter();
  const mentorId = searchParams.get("mentor");

  const [mentor, setMentor] = useState<MentorResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

useEffect(() => {
  if (mentorId) {
    fetchMentorAndSlots();
  } else {
    router.push("/matching/results");
  }
}, [mentorId, router]);


const fetchMentorAndSlots = async () => {
  if (!mentorId) return;

  try {
    const mentor = await mentorAPI.getMentorById(mentorId);
    setMentor(mentor);
    setTimeSlots([]);
    
    const slots = mentor.availability_slots.map((slot: string, index: number) => {
      const slotDate = new Date(slot); // parse the ISO string

      const datePart = slotDate.toDateString(); // e.g., "Sat Jul 19 2025"
      const timePart = slotDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }); // e.g., "09:00 PM"

      return {
        id: `slot-${index}`,
        display: `${datePart} | ${timePart}`, // "Sat Jul 19 2025 | 09:00 PM"
        value: slot, // store full ISO string as value
        available: true,
      };
    });

    setTimeSlots(slots);
  } catch (error) {
    console.error("Error fetching mentor or slots:", error);
    router.push("/matching/results");
  } finally {
    setLoading(false);
  }
};


const handleBooking = () => {
  if (!selectedSlot || !mentor) {
    alert("Please select a time slot");
    return;
  }

  const bookingData = {
    mentorId: mentor.id,
    mentorName: `${mentor.first_name} ${mentor.last_name}`,
    date: selectedSlot, // ISO string!
    price: mentor.mentoring_fee,
  };

  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  router.push(`/payment?mentor=${mentor.id}&slot=${selectedSlot}`);
};



  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-blue-700">Loading mentor details...</p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-blue-700 mb-4">Mentor not found</p>
            <Button onClick={() => router.push("/matching/results")}>
              Back to Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Session
          </h1>
          <p className="text-xl text-blue-100">
            Schedule your personalized aviation mentorship session
          </p>
        </div>
      </section>

      {/* Booking Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mentor Details */}
            <div className="space-y-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    Your Selected Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt={`${mentor.first_name} ${mentor.last_name}`}
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-900 mb-1">
                        {mentor.first_name} {mentor.last_name}
                      </h3>
                      <p className="text-blue-700 mb-2">
                        {mentor.current_occ_role}
                      </p>
                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-blue-600">
                          4.8 (50+ reviews)
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">
                        ₹{mentor.mentoring_fee}
                      </div>
                      <div className="text-sm text-blue-600">per session</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    About Your Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-blue-600">
                      <Award className="h-4 w-4 mr-2" />
                      {mentor.years_of_experience}+ years experience
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <Languages className="h-4 w-4 mr-2" />
                      {mentor.languages_spoken.join(", ")}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.area_of_expertise.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {mentor.profile_bio && (
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Bio</h4>
                      <p className="text-sm text-blue-700">
                        {mentor.profile_bio}
                      </p>
                    </div>
                  )}

                  {mentor.requirements_from_mentees && (
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">
                        Requirements
                      </h4>
                      <p className="text-sm text-blue-700">
                        {mentor.requirements_from_mentees}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Booking Slots */}
            <div className="space-y-6">
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
               {timeSlots.length === 0 ? (
  <p className="text-blue-600">Loading available slots...</p>
) : (
  timeSlots.map((slot) => (
    <Button
      key={slot.id}
      variant={selectedSlot === slot.value ? "default" : "outline"}
      className={`w-full justify-start p-4 h-auto ${
        selectedSlot === slot.value
          ? "bg-blue-600 text-white"
          : "border-blue-200 text-blue-800 hover:bg-blue-50"
      }`}
      onClick={() => setSelectedSlot(slot.value)}
      disabled={!slot.available}
    >
      <Clock className="mr-3 h-4 w-4" />
      <div className="text-left">
        <div className="font-medium">{slot.display}</div>
        <div className="text-xs opacity-75">90 minutes session</div>
      </div>
    </Button>
  ))
)}

                </CardContent>
              </Card>

              {/* Session Details */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-blue-700">
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
                      Session recording (if requested)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Follow-up resources
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Email support for 1 week
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Book Button */}
              <Button
                onClick={handleBooking}
                disabled={!selectedSlot}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              >
                {selectedSlot ? "Proceed to Payment" : "Select a Time Slot"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
