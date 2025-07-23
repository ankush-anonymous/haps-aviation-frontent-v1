// Meeting Type definitions
export interface CreateMeetingRequest {
  mentor_id: string
  mentee_id: string
  scheduled_datetime: string
  duration_minutes: number
  mode_of_meeting: string
  meeting_link: string
  status: "Scheduled" | "Completed" | "Cancelled" | "No Show"
  reschedule_requested: boolean
  reschedule_reason: string
  notes_mentor: string
  notes_mentee: string
  session_recording: string
}


export interface MeetingResponse {
  id: string
  mentor_id: string
  mentee_id: string
  scheduled_datetime: string
  duration_minutes: number
  mode_of_meeting: "Zoom" | "Phone"
  meeting_link: string
  status: "Scheduled" | "Completed" | "Cancelled"
  reschedule_requested: boolean
  reschedule_reason: string
  notes_mentor: string
  notes_mentee: string
  session_recording: string
  created_at: string
}

export interface FilteredMeetingsResponse { 
  success: boolean
  data: MeetingResponse[]
}

// Type definitions
export interface CreateMentorRequest {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  linkedin_url?: string
  current_occ_role: string
  years_of_experience: number
  area_of_expertise: string[]
  availability_slots: string[]
  profile_bio: string
  languages_spoken: string[]
  mentoring_fee: number
  level_comfortable: string
  documents?: string[]
  requirements_from_mentees?: string
}

export interface MentorResponse {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  linkedin_url?: string
  current_occ_role: string
  years_of_experience: number
  area_of_expertise: string[]
  availability_slots: string[]
  profile_bio: string
  languages_spoken: string[]
  mentoring_fee: number
  level_comfortable: string
  documents?: string[]
  requirements_from_mentees?: string
  created_at: string
  updated_at: string
}

export interface MentorsListResponse {
  mentors: MentorResponse[]
  total: number
  limit: number
  offset: number
}

// Mentee Type definitions
export interface CreateMenteeRequest {
  full_name: string
  email: string
  phone_number: string
  age_group: string
  current_stage: string
  key_goal: string
  preferred_language: string
  preferred_mentor_domain: string[]
  availability: string[]
  budget: number
  questions_for_mentor?: string
  previous_attempts?: string
}

export interface MenteeResponse {
  id: string
  full_name: string
  email: string
  phone_number: string
  age_group: string
  current_stage: string
  key_goal: string
  preferred_language: string
  preferred_mentor_domain: string[]
  availability: string[]
  budget: number
  questions_for_mentor?: string
  previous_attempts?: string
  created_at: string
  updated_at: string
}

export interface MenteeLoginResponse {
  message: string
  mentee: MenteeResponse
}


export interface MenteesListResponse {
  mentees: MenteeResponse[]
  total: number
  limit: number
  offset: number
}

// Admin Type definitions
export interface CreateAdminRequest {
  name: string
  email: string
  phone_number: string
}

export interface AdminResponse {
  id: string
  name: string
  email: string
  phone_number: string
  created_at: string
  updated_at: string
}