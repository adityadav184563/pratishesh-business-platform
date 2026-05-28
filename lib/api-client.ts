import type {
  Inquiry,
  JobPost,
  LegalService,
  SiteSettings,
  TechService,
  TrainingCourse,
} from "@/lib/types/admin"

export function notifyDataUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("pratishesh-data-updated"))
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: options?.credentials ?? "same-origin",
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json.error ?? `Request failed: ${res.status}`)
  }
  return json as T
}

// ——— Public reads ———
export const fetchActiveTechServices = () =>
  request<TechService[]>("/api/tech-services?active=true")

export const fetchActiveLegalServices = () =>
  request<LegalService[]>("/api/legal-services?active=true")

export const fetchActiveTrainingCourses = () =>
  request<TrainingCourse[]>("/api/training-courses?active=true")

export const fetchActiveJobs = () => request<JobPost[]>("/api/jobs?active=true")

export const fetchSettings = () => request<SiteSettings>("/api/settings")

export const submitInquiry = (data: Omit<Inquiry, "id" | "status" | "createdAt">) =>
  request<{ success: true; message: string }>("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      service: data.division,
      message: data.message,
    }),
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

// ——— Admin auth ———
export const adminLogin = (username: string, password: string) =>
  request<{ ok: boolean }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    credentials: "include",
  })

export const adminLogout = () =>
  request<{ ok: boolean }>("/api/admin/logout", {
    method: "POST",
    credentials: "include",
  })

export const checkAdminSession = () =>
  request<{ authenticated: boolean }>("/api/admin/session", { credentials: "include" })

// ——— Admin CRUD ———
const adminOpts = { credentials: "include" as const }

export const fetchTechServicesAdmin = () =>
  request<TechService[]>("/api/admin/tech-services", adminOpts)

export const createTechServiceAdmin = (data: Omit<TechService, "id">) =>
  request<TechService>("/api/admin/tech-services", {
    method: "POST",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const updateTechServiceAdmin = (id: string, data: Omit<TechService, "id">) =>
  request<TechService>(`/api/admin/tech-services/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const deleteTechServiceAdmin = (id: string) =>
  request<{ ok: boolean }>(`/api/admin/tech-services/${id}`, {
    method: "DELETE",
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const fetchLegalServicesAdmin = () =>
  request<LegalService[]>("/api/admin/legal-services", adminOpts)

export const createLegalServiceAdmin = (data: Omit<LegalService, "id">) =>
  request<LegalService>("/api/admin/legal-services", {
    method: "POST",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const updateLegalServiceAdmin = (id: string, data: Omit<LegalService, "id">) =>
  request<LegalService>(`/api/admin/legal-services/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const deleteLegalServiceAdmin = (id: string) =>
  request<{ ok: boolean }>(`/api/admin/legal-services/${id}`, {
    method: "DELETE",
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const fetchTrainingCoursesAdmin = () =>
  request<TrainingCourse[]>("/api/admin/training-courses", adminOpts)

export const createTrainingCourseAdmin = (data: Omit<TrainingCourse, "id">) =>
  request<TrainingCourse>("/api/admin/training-courses", {
    method: "POST",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const updateTrainingCourseAdmin = (id: string, data: Omit<TrainingCourse, "id">) =>
  request<TrainingCourse>(`/api/admin/training-courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const deleteTrainingCourseAdmin = (id: string) =>
  request<{ ok: boolean }>(`/api/admin/training-courses/${id}`, {
    method: "DELETE",
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const fetchJobsAdmin = () => request<JobPost[]>("/api/admin/jobs", adminOpts)

export const createJobAdmin = (data: Omit<JobPost, "id" | "createdAt">) =>
  request<JobPost>("/api/admin/jobs", {
    method: "POST",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const updateJobAdmin = (id: string, data: Omit<JobPost, "id" | "createdAt">) =>
  request<JobPost>(`/api/admin/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const deleteJobAdmin = (id: string) =>
  request<{ ok: boolean }>(`/api/admin/jobs/${id}`, {
    method: "DELETE",
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const fetchInquiriesAdmin = () =>
  request<Inquiry[]>("/api/admin/inquiries", adminOpts)

export const markInquiryReadAdmin = (id: string) =>
  request<Inquiry>(`/api/admin/inquiries/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "read" }),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const deleteInquiryAdmin = (id: string) =>
  request<{ ok: boolean }>(`/api/admin/inquiries/${id}`, {
    method: "DELETE",
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })

export const fetchSettingsAdmin = () =>
  request<SiteSettings>("/api/admin/settings", adminOpts)

export const updateSettingsAdmin = (settings: SiteSettings) =>
  request<SiteSettings>("/api/admin/settings", {
    method: "PUT",
    body: JSON.stringify(settings),
    ...adminOpts,
  }).then((r) => {
    notifyDataUpdated()
    return r
  })
