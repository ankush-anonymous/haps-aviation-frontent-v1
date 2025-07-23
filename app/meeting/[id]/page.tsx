"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { meetingAPI } from "@/lib/api";

export interface MeetingResponse {
  id: string;
  mentor_id: string;
  mentee_id: string;
  scheduled_datetime: string;
  duration_minutes: number;
  mode_of_meeting: "Zoom" | "Phone" | "Video Call";
  meeting_link: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  reschedule_requested: boolean;
  reschedule_reason: string;
  notes_mentor: string;
  notes_mentee: string;
  session_recording: string;
  created_at: string;
}

export default function MeetingPage() {
  const params = useParams();
  const id = params?.id as string;
  const [meeting, setMeeting] = useState<MeetingResponse | null>(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await meetingAPI.getMeetingById(id); // Must return a single MeetingResponse object
        setMeeting(res); // Assuming the API returns just the meeting object, not wrapped in `{ data: ... }`
      } catch (err) {
        console.error("Failed to fetch meeting:", err);
      }
    };

    if (id) fetchMeeting();
  }, [id]);

  if (!meeting) {
    return <div className="text-center mt-10 text-gray-500">Loading meeting...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Meeting with your Mentor</h2>

      <div className="w-full max-w-5xl aspect-video border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={meeting.meeting_link}
          title="Meeting"
          className="w-full h-full"
          allow="camera; microphone; fullscreen; display-capture"
        />
      </div>

      <p className="mt-4 text-gray-600">
        Duration: {meeting.duration_minutes} minutes | Mode: {meeting.mode_of_meeting}
      </p>
    </div>
  );
}
