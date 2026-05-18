export type ItemStatus = "active" | "inactive"

export interface TechService {
  id: string
  title: string
  description: string
  icon: string
  category: string
  status: ItemStatus
  order: number
}

export interface LegalService {
  id: string
  title: string
  description: string
  icon: string
  category: string
  status: ItemStatus
  order: number
}

export interface TrainingCourse {
  id: string
  courseName: string
  duration: string
  fees: string
  description: string
  image: string
  placementSupport: boolean
  status: ItemStatus
  order: number
}

export interface JobPost {
  id: string
  jobTitle: string
  companyName: string
  location: string
  salary: string
  qualification: string
  description: string
  status: ItemStatus
  createdAt: string
}

export type InquiryStatus = "unread" | "read"

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  division: string
  status: InquiryStatus
  createdAt: string
}

export interface SiteSettings {
  companyName: string
  phone: string
  whatsapp: string
  email: string
  address: string
  facebook: string
  instagram: string
  linkedin: string
  footerText: string
}

export type StorageKey =
  | "techServices"
  | "legalServices"
  | "trainingCourses"
  | "jobs"
  | "inquiries"
  | "settings"
