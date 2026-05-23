import { createPublicClient, createServiceClient } from "@/lib/supabase/server"
import {
  DEFAULT_SETTINGS,
  mapInquiry,
  mapJobPost,
  mapLegalService,
  mapSettings,
  mapTechService,
  mapTrainingCourse,
  type InquiryRow,
  type JobPostRow,
  type LegalServiceRow,
  type SiteSettingsRow,
  type TechServiceRow,
  type TrainingCourseRow,
} from "@/lib/supabase/mappers"
import type {
  Inquiry,
  JobPost,
  LegalService,
  SiteSettings,
  TechService,
  TrainingCourse,
} from "@/lib/types/admin"

// ——— Tech Services ———
export async function listTechServices(activeOnly = false, admin = false): Promise<TechService[]> {
  const client = admin ? createServiceClient() : createPublicClient()
  let query = client.from("tech_services").select("*").order("sort_order", { ascending: true })
  if (activeOnly) query = query.eq("status", "active")
  const { data, error } = await query
  if (error) throw error
  return (data as TechServiceRow[]).map(mapTechService)
}

export async function createTechService(
  input: Omit<TechService, "id">
): Promise<TechService> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("tech_services")
    .insert({
      title: input.title,
      description: input.description,
      icon: input.icon,
      category: input.category,
      status: input.status,
      sort_order: input.order,
    })
    .select()
    .single()
  if (error) throw error
  return mapTechService(data as TechServiceRow)
}

export async function updateTechService(
  id: string,
  input: Omit<TechService, "id">
): Promise<TechService> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("tech_services")
    .update({
      title: input.title,
      description: input.description,
      icon: input.icon,
      category: input.category,
      status: input.status,
      sort_order: input.order,
    })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return mapTechService(data as TechServiceRow)
}

export async function deleteTechService(id: string): Promise<void> {
  const client = createServiceClient()
  const { error } = await client.from("tech_services").delete().eq("id", id)
  if (error) throw error
}

// ——— Legal Services ———
export async function listLegalServices(activeOnly = false, admin = false): Promise<LegalService[]> {
  const client = admin ? createServiceClient() : createPublicClient()
  let query = client.from("legal_services").select("*").order("sort_order", { ascending: true })
  if (activeOnly) query = query.eq("status", "active")
  const { data, error } = await query
  if (error) throw error
  return (data as LegalServiceRow[]).map(mapLegalService)
}

export async function createLegalService(input: Omit<LegalService, "id">): Promise<LegalService> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("legal_services")
    .insert({
      title: input.title,
      description: input.description,
      icon: input.icon,
      category: input.category,
      status: input.status,
      sort_order: input.order,
    })
    .select()
    .single()
  if (error) throw error
  return mapLegalService(data as LegalServiceRow)
}

export async function updateLegalService(
  id: string,
  input: Omit<LegalService, "id">
): Promise<LegalService> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("legal_services")
    .update({
      title: input.title,
      description: input.description,
      icon: input.icon,
      category: input.category,
      status: input.status,
      sort_order: input.order,
    })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return mapLegalService(data as LegalServiceRow)
}

export async function deleteLegalService(id: string): Promise<void> {
  const client = createServiceClient()
  const { error } = await client.from("legal_services").delete().eq("id", id)
  if (error) throw error
}

// ——— Training Courses ———
export async function listTrainingCourses(
  activeOnly = false,
  admin = false
): Promise<TrainingCourse[]> {
  const client = admin ? createServiceClient() : createPublicClient()
  let query = client.from("training_courses").select("*").order("sort_order", { ascending: true })
  if (activeOnly) query = query.eq("status", "active")
  const { data, error } = await query
  if (error) throw error
  return (data as TrainingCourseRow[]).map(mapTrainingCourse)
}

export async function createTrainingCourse(
  input: Omit<TrainingCourse, "id">
): Promise<TrainingCourse> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("training_courses")
    .insert({
      course_name: input.courseName,
      duration: input.duration,
      fees: input.fees,
      description: input.description,
      image: input.image,
      placement_support: input.placementSupport,
      status: input.status,
      sort_order: input.order,
    })
    .select()
    .single()
  if (error) throw error
  return mapTrainingCourse(data as TrainingCourseRow)
}

export async function updateTrainingCourse(
  id: string,
  input: Omit<TrainingCourse, "id">
): Promise<TrainingCourse> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("training_courses")
    .update({
      course_name: input.courseName,
      duration: input.duration,
      fees: input.fees,
      description: input.description,
      image: input.image,
      placement_support: input.placementSupport,
      status: input.status,
      sort_order: input.order,
    })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return mapTrainingCourse(data as TrainingCourseRow)
}

export async function deleteTrainingCourse(id: string): Promise<void> {
  const client = createServiceClient()
  const { error } = await client.from("training_courses").delete().eq("id", id)
  if (error) throw error
}

// ——— Jobs ———
export async function listJobs(activeOnly = false, admin = false): Promise<JobPost[]> {
  const client = admin ? createServiceClient() : createPublicClient()
  let query = client.from("job_posts").select("*").order("created_at", { ascending: false })
  if (activeOnly) query = query.eq("status", "active")
  const { data, error } = await query
  if (error) throw error
  return (data as JobPostRow[]).map(mapJobPost)
}

export async function createJob(input: Omit<JobPost, "id" | "createdAt">): Promise<JobPost> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("job_posts")
    .insert({
      job_title: input.jobTitle,
      company_name: input.companyName,
      location: input.location,
      salary: input.salary,
      qualification: input.qualification,
      description: input.description,
      status: input.status,
    })
    .select()
    .single()
  if (error) throw error
  return mapJobPost(data as JobPostRow)
}

export async function updateJob(
  id: string,
  input: Omit<JobPost, "id" | "createdAt">
): Promise<JobPost> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("job_posts")
    .update({
      job_title: input.jobTitle,
      company_name: input.companyName,
      location: input.location,
      salary: input.salary,
      qualification: input.qualification,
      description: input.description,
      status: input.status,
    })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return mapJobPost(data as JobPostRow)
}

export async function deleteJob(id: string): Promise<void> {
  const client = createServiceClient()
  const { error } = await client.from("job_posts").delete().eq("id", id)
  if (error) throw error
}

// ——— Inquiries ———
export async function listInquiries(): Promise<Inquiry[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data as InquiryRow[]).map(mapInquiry)
}

export async function createInquiry(
  input: Omit<Inquiry, "id" | "status" | "createdAt">
): Promise<Inquiry> {
  const client = createPublicClient()
  const { data, error } = await client
    .from("inquiries")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      division: input.division,
      status: "unread",
    })
    .select()
    .single()
  if (error) throw error
  return mapInquiry(data as InquiryRow)
}

export async function markInquiryRead(id: string): Promise<Inquiry> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("inquiries")
    .update({ status: "read" })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return mapInquiry(data as InquiryRow)
}

export async function deleteInquiry(id: string): Promise<void> {
  const client = createServiceClient()
  const { error } = await client.from("inquiries").delete().eq("id", id)
  if (error) throw error
}

// ——— Settings ———
export async function getSiteSettings(): Promise<SiteSettings> {
  const client = createPublicClient()
  const { data, error } = await client.from("site_settings").select("*").eq("id", 1).maybeSingle()
  if (error) throw error
  if (!data) return DEFAULT_SETTINGS
  return mapSettings(data as SiteSettingsRow)
}

export async function updateSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const client = createServiceClient()
  const { data, error } = await client
    .from("site_settings")
    .upsert({
      id: 1,
      company_name: settings.companyName,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      address: settings.address,
      facebook: settings.facebook,
      instagram: settings.instagram,
      linkedin: settings.linkedin,
      footer_text: settings.footerText,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()
  if (error) throw error
  return mapSettings(data as SiteSettingsRow)
}
