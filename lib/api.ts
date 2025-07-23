const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
import {CreateMeetingRequest, MeetingResponse,FilteredMeetingsResponse,CreateMentorRequest,MentorResponse,MentorsListResponse,CreateMenteeRequest,MenteeResponse,MenteesListResponse,CreateAdminRequest,AdminResponse,MenteeLoginResponse } from "./interfaces"

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API Request failed:", error)
    throw error
  }
}

// Mentor API functions
export const mentorAPI = {
  // Create a new mentor
 loginMentor: async (email: string): Promise<{ mentor: MentorResponse }> => {
  return apiRequest<{ mentor: MentorResponse }>("/api/v1/mentor/loginMentor", {
    method: "POST",
    body: JSON.stringify({ email: email }),
  });
},

  createMentor: async (mentorData: CreateMentorRequest): Promise<MentorResponse> => {
    return apiRequest<MentorResponse>("/api/v1/mentor/createMentor", {
      method: "POST",
      body: JSON.stringify(mentorData),
    })
  },

  // Get all mentors with pagination
  getAllMentors: async (limit = 10, offset = 0): Promise<MentorsListResponse> => {
    return apiRequest<MentorsListResponse>(`/api/v1/mentor/getAllMentors?limit=${limit}&offset=${offset}`)
  },

  // Get mentor by ID
  getMentorById: async (id: string): Promise<MentorResponse> => {
    return apiRequest<MentorResponse>(`/api/v1/mentor/getMentorById/${id}`)
  },

  // Update mentor by ID
  updateMentorById: async (id: string, mentorData: Partial<CreateMentorRequest>): Promise<MentorResponse> => {
    return apiRequest<MentorResponse>(`/api/v1/mentor/updateMentorById/${id}`, {
      method: "PUT",
      body: JSON.stringify(mentorData),
    })
  },

  // Delete mentor by ID
  deleteMentorById: async (id: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>(`/api/v1/mentor/deleteMentorById/${id}`, {
      method: "DELETE",
    })
  },

  
  // Get mentor earnings by ID
  getMentorEarnings: async (id: string): Promise<any> => {
    return apiRequest<any>(`/api/v1/mentor/earnings/${id}`)
  },

  // Get mentor sessions by ID
  getMentorSessions: async (id: string): Promise<any> => {
    return apiRequest<any>(`/api/v1/mentor/sessions/${id}`)
  },

  // Get mentor feedbacks by ID
  getMentorFeedbacks: async (id: string): Promise<any> => {
    return apiRequest<any>(`/api/v1/mentor/feedbacks/${id}`)
  },
}

// Mentee API functions
export const menteeAPI = {
  // Create a new mentee
  createMentee: async (menteeData: CreateMenteeRequest): Promise<MenteeResponse> => {
    return apiRequest<MenteeResponse>("/api/v1/mentee/createMentee", {
      method: "POST",
      body: JSON.stringify(menteeData),
    })
  },

  // Get all mentees with pagination
  getAllMentees: async (limit = 10, offset = 0): Promise<MenteesListResponse> => {
    return apiRequest<MenteesListResponse>(`/api/v1/mentee/getAllMentees?limit=${limit}&offset=${offset}`)
  },

  // Get mentee by ID
  getMenteeById: async (id: string): Promise<MenteeResponse> => {
    return apiRequest<MenteeResponse>(`/api/v1/mentee/getMenteeById/${id}`)
  },

  // Update mentee by ID
  updateMenteeById: async (id: string, menteeData: Partial<CreateMenteeRequest>): Promise<MenteeResponse> => {
    return apiRequest<MenteeResponse>(`/api/v1/mentee/updateMenteeById/${id}`, {
      method: "PUT",
      body: JSON.stringify(menteeData),
    })
  },

  // Delete mentee by ID
  deleteMenteeById: async (id: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>(`/api/v1/mentee/deleteMenteeById/${id}`, {
      method: "DELETE",
    })
  },

  // Login mentee by phone number
  loginMentee: async (phoneNumber: string): Promise<MenteeLoginResponse> => {
  return apiRequest<MenteeLoginResponse>(`/api/v1/mentee/loginMentee`, {
    method: "POST",
    body: JSON.stringify({ phone_number: phoneNumber }),
  })
},
}

// Admin API functions
export const adminAPI = {
  // Create a new admin
  createAdmin: async (adminData: CreateAdminRequest): Promise<AdminResponse> => {
    return apiRequest<AdminResponse>("/api/v1/admin/createAdmin", {
      method: "POST",
      body: JSON.stringify(adminData),
    })
  },

  // Get all admins
  getAllAdmins: async (): Promise<AdminResponse[]> => {
    return apiRequest<AdminResponse[]>("/api/v1/admin/getAllAdmins")
  },

  // Get admin by ID
  getAdminById: async (id: string): Promise<AdminResponse> => {
    return apiRequest<AdminResponse>(`/api/v1/admin/getAdminById/${id}`)
  },

  // Update admin by ID
  updateAdminById: async (id: string, adminData: Partial<CreateAdminRequest>): Promise<AdminResponse> => {
    return apiRequest<AdminResponse>(`/api/v1/admin/updateAdminById/${id}`, {
      method: "PUT",
      body: JSON.stringify(adminData),
    })
  },

  // Delete admin by ID
  deleteAdminById: async (id: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>(`/api/v1/admin/deleteAdminById/${id}`, {
      method: "DELETE",
    })
  },

  // Login admin by phone number
  loginAdmin: async (phoneNumber: string): Promise<AdminResponse> => {
    return apiRequest<AdminResponse>(`/api/v1/admin/login`, {
      method: "POST",
      body: JSON.stringify({ phone_number: phoneNumber }),
    })
  },
}


// Meeting API functions
export const meetingAPI = {
  // Create a new meeting
  createMeeting: async (meetingData: CreateMeetingRequest): Promise<MeetingResponse> => {
    return apiRequest<MeetingResponse>("/api/v1/meeting/createMeeting", {
      method: "POST",
      body: JSON.stringify(meetingData),
    })
  },

  // Get meeting by ID
  getMeetingById: async (id: string): Promise<MeetingResponse> => {
    return apiRequest<MeetingResponse>(`/api/v1/meeting/getMeetingById/${id}`)
  },

  // Get filtered meetings
  getFilteredMeetings: async (mentorId?: string, menteeId?: string): Promise<FilteredMeetingsResponse> => {
    const params = new URLSearchParams()
    if (mentorId) params.append("mentorId", mentorId)
    if (menteeId) params.append("menteeId", menteeId)

    return apiRequest<FilteredMeetingsResponse>(`/api/v1/meeting/getFilteredMeetings?${params.toString()}`)
  },
}




