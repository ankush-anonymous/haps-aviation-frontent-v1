const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

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
 loginMentor: async (phoneNumber: string): Promise<{ mentor: MentorResponse }> => {
  return apiRequest<{ mentor: MentorResponse }>("/api/v1/mentor/loginMentor", {
    method: "POST",
    body: JSON.stringify({ phone_number: phoneNumber }),
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

interface MenteeLoginResponse {
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
