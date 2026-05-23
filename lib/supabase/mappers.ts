import type {
  Inquiry,
  JobPost,
  LegalService,
  SiteSettings,
  TechService,
  TrainingCourse,
} from "@/lib/types/admin"
import {
  DEFAULT_PHONE,
  DEFAULT_WHATSAPP,
  DEFAULT_EMAIL,
  DEFAULT_ADDRESS,
  DEFAULT_COMPANY_NAME,
  DEFAULT_FOOTER_TEXT,
} from "@/lib/defaultSettings"

export interface TechServiceRow {
  id: string
  title: string
  description: string
  icon: string
  category: string
  status: string
  sort_order: number
  created_at: string
}

export interface LegalServiceRow {
  id: string
  title: string
  description: string
  icon: string
  category: string
  status: string
  sort_order: number
  created_at: string
}

export interface TrainingCourseRow {
  id: string
  course_name: string
  duration: string
  fees: string
  description: string
  image: string
  placement_support: boolean
  status: string
  sort_order: number
  created_at: string
}

export interface JobPostRow {
  id: string
  job_title: string
  company_name: string
  location: string
  salary: string
  qualification: string
  description: string
  status: string
  created_at: string
}

export interface InquiryRow {
  id: string
  name: string
  email: string
  phone: string
  message: string
  division: string
  status: string
  created_at: string
}

export interface SiteSettingsRow {
  id: number
  company_name: string
  phone: string
  whatsapp: string
  email: string
  address: string
  facebook: string
  instagram: string
  linkedin: string
  footer_text: string
  updated_at: string
}

export function mapTechService(row: TechServiceRow): TechService {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    icon: row.icon,
    category: row.category,
    status: row.status as TechService["status"],
    order: row.sort_order,
  }
}

export function mapLegalService(row: LegalServiceRow): LegalService {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    icon: row.icon,
    category: row.category,
    status: row.status as LegalService["status"],
    order: row.sort_order,
  }
}

export function mapTrainingCourse(row: TrainingCourseRow): TrainingCourse {
  return {
    id: row.id,
    courseName: row.course_name,
    duration: row.duration,
    fees: row.fees,
    description: row.description,
    image: row.image,
    placementSupport: row.placement_support,
    status: row.status as TrainingCourse["status"],
    order: row.sort_order,
  }
}

export function mapJobPost(row: JobPostRow): JobPost {
  return {
    id: row.id,
    jobTitle: row.job_title,
    companyName: row.company_name,
    location: row.location,
    salary: row.salary,
    qualification: row.qualification,
    description: row.description,
    status: row.status as JobPost["status"],
    createdAt: row.created_at,
  }
}

export function mapInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    division: row.division,
    status: row.status as Inquiry["status"],
    createdAt: row.created_at,
  }
}

export function mapSettings(row: SiteSettingsRow): SiteSettings {
  return {
    companyName: row.company_name,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    address: row.address,
    facebook: row.facebook,
    instagram: row.instagram,
    linkedin: row.linkedin,
    footerText: row.footer_text,
  }
}

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: DEFAULT_COMPANY_NAME,
  phone: DEFAULT_PHONE,
  whatsapp: DEFAULT_WHATSAPP,
  email: DEFAULT_EMAIL,
  address: DEFAULT_ADDRESS,
  facebook: "",
  instagram: "",
  linkedin: "",
  footerText: DEFAULT_FOOTER_TEXT,
}
