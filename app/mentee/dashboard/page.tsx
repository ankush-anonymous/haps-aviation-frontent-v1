"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Star,
  Users,
  BookOpen,
  Video,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type MenteeResponse,
  type MeetingResponse,
  MentorResponse,
} from "@/lib/interfaces";
import { meetingAPI, mentorAPI } from "@/lib/api"; // Declare the meetingAPI variable

interface Mentor {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviews: number;
  specialties: string[];
  languages: string[];
  price: string;
  availability: string;
  image: string;
}

export default function MenteeDashboard() {
  const [mentee, setMentee] = useState<MenteeResponse | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [mentors, setMentors] = useState<MentorResponse[]>([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  // Replace the mock meetings array with state and API call:
  const [meetings, setMeetings] = useState<MeetingResponse[]>([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);

  // Add this function to fetch meetings:
  const fetchMeetings = async () => {
    if (!mentee) return;

    setLoadingMeetings(true);
    try {
      const response = await meetingAPI.getFilteredMeetings(
        undefined,
        mentee.id
      );
      console.log(response);

      setMeetings(response.data || []);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
      setMeetings([]);
    } finally {
      setLoadingMeetings(false);
    }
  };

  useEffect(() => {
    const menteeData = localStorage.getItem("menteeData");
    if (menteeData) {
      const parsedMentee = JSON.parse(menteeData);
      setMentee(parsedMentee);
      fetchMentors(0);
    }
  }, []);

  useEffect(() => {
    if (mentee) {
      fetchMeetings();
    }
  }, [mentee]); // 👈 triggers when `mentee` is set

  const fetchMentors = async (currentOffset: number) => {
    try {
      const response = await mentorAPI.getAllMentors(limit, currentOffset);
      const newMentors = response.mentors || [];

      setMentors((prev) => {
        const allMentors = [...prev, ...newMentors];

        // De-duplicate by ID
        const uniqueMentorsMap = new Map();
        allMentors.forEach((mentor) => {
          uniqueMentorsMap.set(mentor.id, mentor);
        });

        return Array.from(uniqueMentorsMap.values());
      });
    } catch (error) {
      console.error("Failed to fetch mentors:", error);
    }
  };

  const loadMoreMentors = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchMentors(nextOffset);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (!mentee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">
          Welcome back, {mentee.full_name.split(" ")[0]}!
        </h1>
        <p className="text-blue-700 mt-2">
          Continue your aviation journey with expert guidance
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 bg-white border border-blue-200">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="meetings"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            My Meetings
          </TabsTrigger>
          <TabsTrigger
            value="mentors"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Find Mentors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">
                  Total Sessions
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">3</div>
                <p className="text-xs text-blue-600 mt-1">
                  2 completed, 1 upcoming
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">
                  Hours Mentored
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">4.5</div>
                <p className="text-xs text-blue-600 mt-1">This month</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">
                  Progress Score
                </CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">85%</div>
                <p className="text-xs text-blue-600 mt-1">Towards your goal</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Completed session with Captain Sarah Johnson
                    </p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Upcoming session scheduled
                    </p>
                    <p className="text-xs text-gray-500">
                      Tomorrow at 10:00 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Profile updated</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Current Goal
                    </h4>
                    <p className="text-gray-700 text-sm">{mentee.key_goal}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Current Stage
                    </h4>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {mentee.current_stage}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Preferred Domains
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {mentee.preferred_mentor_domain
                        .slice(0, 3)
                        .map((domain, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {domain}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">My Meetings</CardTitle>
              <CardDescription className="text-blue-700">
                View your past and upcoming mentorship sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingMeetings ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-700">Loading meetings...</p>
                </div>
              ) : meetings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-blue-700 mb-2">
                    No meetings scheduled yet
                  </p>
                  <p className="text-sm text-blue-600">
                    Book your first session with a mentor
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="border border-blue-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Mentorship Session
                            </h4>
                            <p className="text-sm text-gray-600">
                              Duration: {meeting.duration_minutes} minutes
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(
                                    meeting.scheduled_datetime
                                  ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>{" "}
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {new Date(
                                    meeting.scheduled_datetime
                                  ).toLocaleTimeString("en-IN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "Asia/Kolkata",
                                  })}
                                </span>{" "}
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Video className="h-3 w-3" />
                                <span>{meeting.mode_of_meeting}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(meeting.status)}>
                            {meeting.status}
                          </Badge>
                          {meeting.status === "Scheduled" &&
                            meeting.meeting_link && (
                              <div className="mt-2">
                                <Button size="sm" asChild>
                                  <a
                                    href={meeting.meeting_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Join Meeting
                                  </a>
                                </Button>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Available Mentors</CardTitle>
              <CardDescription className="text-blue-700">
                Find and book sessions with expert aviation mentors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <Card
                    key={mentor.id}
                    className="border-blue-200 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <Image
                          src={"/placeholder.svg"}
                          alt={`${mentor.first_name} ${mentor.last_name}`}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                        />
                        <h3 className="font-semibold text-gray-900">
                          {mentor.first_name} {mentor.last_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {mentor.current_occ_role}
                        </p>
                        <div className="flex items-center justify-center mt-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {/* Replace with real rating if available */}
                            4.8 (21 reviews)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {mentor.years_of_experience} years experience
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {mentor.availability_slots?.length || 0} slots
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {mentor.area_of_expertise
                            .slice(0, 2)
                            .map((specialty, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-blue-100 text-blue-800 text-xs"
                              >
                                {specialty}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-900 mb-2">
                          ₹{mentor.mentoring_fee}
                        </div>
                        <Link
                          href={`/mentee/book-appointment?mentor=${mentor.id}`}
                        >
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Book Session
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              <div className="flex justify-center mt-8">
                <Button
                  onClick={loadMoreMentors}
                  className="bg-gray-100 hover:bg-gray-200 text-blue-700"
                >
                  Load More Mentors
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
