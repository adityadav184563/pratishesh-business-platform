import type {
  Inquiry,
  JobPost,
  LegalService,
  SiteSettings,
  TechService,
  TrainingCourse,
} from "@/lib/types/admin"

export const STORAGE_KEYS = {
  techServices: "pratishesh_tech_services",
  legalServices: "pratishesh_legal_services",
  trainingCourses: "pratishesh_training_courses",
  jobs: "pratishesh_jobs",
  inquiries: "pratishesh_inquiries",
  settings: "pratishesh_settings",
  initialized: "pratishesh_data_initialized",
} as const

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const SEED_TECH_SERVICES: TechService[] = [
  { id: "t1", title: "Website Development", description: "Modern, responsive and SEO-friendly business websites built with the latest technologies.", icon: "Globe", category: "Web", status: "active", order: 1 },
  { id: "t2", title: "Flask Development", description: "Custom Python Flask web apps with admin panel, database integration and deployment.", icon: "Code", category: "Web App", status: "active", order: 2 },
  { id: "t3", title: "WordPress Development", description: "Business, portfolio, blog and service websites using WordPress CMS platform.", icon: "Layout", category: "CMS", status: "active", order: 3 },
  { id: "t4", title: "E-Commerce Website", description: "Online store with product listing, enquiry system and payment-ready structure.", icon: "ShoppingCart", category: "E-Commerce", status: "active", order: 4 },
  { id: "t5", title: "Hosting & Domain", description: "Domain setup, VPS hosting, SSL certificates and complete website deployment support.", icon: "Server", category: "Infrastructure", status: "active", order: 5 },
  { id: "t6", title: "Website Maintenance", description: "Regular updates, backup, speed improvement and ongoing security support.", icon: "Wrench", category: "Support", status: "active", order: 6 },
]

export const SEED_LEGAL_SERVICES: LegalService[] = [
  { id: "l1", title: "GST Registration & Filing", description: "Complete GST registration, return filing, and compliance guidance for businesses of all sizes.", icon: "Receipt", category: "Tax", status: "active", order: 1 },
  { id: "l2", title: "ITR Filing", description: "Income tax return filing for individuals, professionals and businesses with expert support.", icon: "FileText", category: "Tax", status: "active", order: 2 },
  { id: "l3", title: "MSME Registration", description: "MSME/Udyam registration support for small and medium businesses to access government benefits.", icon: "Landmark", category: "Registration", status: "active", order: 3 },
  { id: "l4", title: "Company Registration", description: "Private limited, LLP, OPC and other business entity registration with complete documentation.", icon: "Building2", category: "Registration", status: "active", order: 4 },
  { id: "l5", title: "PF & ESIC Compliance", description: "Employee compliance management including PF, ESIC registration and payroll-related support.", icon: "ShieldCheck", category: "Compliance", status: "active", order: 5 },
  { id: "l6", title: "Labour Law Compliance", description: "LWF, BOCW, statutory compliance services and labour law advisory for employers.", icon: "Users", category: "Compliance", status: "active", order: 6 },
]

export const SEED_TRAINING_COURSES: TrainingCourse[] = [
  { id: "tr1", courseName: "Web Development using Flask", duration: "3-4 months", fees: "Contact for fees", description: "Learn HTML, CSS, Bootstrap, Python Flask, database integration and deployment from scratch.", image: "/placeholder.svg", placementSupport: true, status: "active", order: 1 },
  { id: "tr2", courseName: "HR Executive & Office Management", duration: "2-3 months", fees: "Contact for fees", description: "Office tools, HR process, payroll management, compliance and interview skills training.", image: "/placeholder.svg", placementSupport: true, status: "active", order: 2 },
  { id: "tr3", courseName: "Tally & Accounting", duration: "1-2 months", fees: "Contact for fees", description: "Accounting fundamentals, GST billing, voucher entry and business finance basics with Tally.", image: "/placeholder.svg", placementSupport: false, status: "active", order: 3 },
  { id: "tr4", courseName: "Python Programming", duration: "2-3 months", fees: "Contact for fees", description: "Python fundamentals, logic building, data structures and practical coding projects.", image: "/placeholder.svg", placementSupport: true, status: "active", order: 4 },
  { id: "tr5", courseName: "Java Programming", duration: "2-3 months", fees: "Contact for fees", description: "Java programming support for academic learning, OOP concepts and practical applications.", image: "/placeholder.svg", placementSupport: true, status: "active", order: 5 },
  { id: "tr6", courseName: "O Level Training", duration: "Varies", fees: "Contact for fees", description: "Computer fundamentals, programming concepts and practical exam preparation for NIELIT O Level.", image: "/placeholder.svg", placementSupport: false, status: "active", order: 6 },
]

export const SEED_JOBS: JobPost[] = [
  { id: "j1", jobTitle: "Web Developer Intern", companyName: "Partner Tech Co.", location: "Lucknow", salary: "As per company norms", qualification: "BCA / B.Tech / Diploma", description: "Assist in website development using React and Python.", status: "active", createdAt: new Date().toISOString() },
  { id: "j2", jobTitle: "HR Executive", companyName: "Growing Startup", location: "Lucknow", salary: "₹15,000 - ₹20,000", qualification: "MBA / BBA HR", description: "Handle recruitment, payroll support and employee records.", status: "active", createdAt: new Date().toISOString() },
]

export const SEED_INQUIRIES: Inquiry[] = []

export const SEED_SETTINGS: SiteSettings = {
  companyName: "Pratishesh Associate & Consultancy",
  phone: "+91 XXXXX XXXXX",
  whatsapp: "+91 XXXXX XXXXX",
  email: "info@pratishesh.com",
  address: "Lucknow, Uttar Pradesh, India",
  facebook: "",
  instagram: "",
  linkedin: "",
  footerText: "Technology Solutions, Legal & Compliance, Industrial Training, and Job Placement — empowering businesses across India.",
}

function isClient(): boolean {
  return typeof window !== "undefined"
}

function readJson<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, data: T): void {
  if (!isClient()) return
  localStorage.setItem(key, JSON.stringify(data))
  window.dispatchEvent(new CustomEvent("pratishesh-data-updated"))
}

export function initializeStorage(): void {
  if (!isClient()) return
  if (localStorage.getItem(STORAGE_KEYS.initialized)) return

  writeJson(STORAGE_KEYS.techServices, SEED_TECH_SERVICES)
  writeJson(STORAGE_KEYS.legalServices, SEED_LEGAL_SERVICES)
  writeJson(STORAGE_KEYS.trainingCourses, SEED_TRAINING_COURSES)
  writeJson(STORAGE_KEYS.jobs, SEED_JOBS)
  writeJson(STORAGE_KEYS.inquiries, SEED_INQUIRIES)
  writeJson(STORAGE_KEYS.settings, SEED_SETTINGS)
  localStorage.setItem(STORAGE_KEYS.initialized, "true")
}

// ——— Tech Services ———
export function getTechServices(): TechService[] {
  initializeStorage()
  return readJson(STORAGE_KEYS.techServices, SEED_TECH_SERVICES)
}

export function saveTechServices(items: TechService[]): void {
  writeJson(STORAGE_KEYS.techServices, items)
}

export function getActiveTechServices(): TechService[] {
  return getTechServices()
    .filter((s) => s.status === "active")
    .sort((a, b) => a.order - b.order)
}

// ——— Legal Services ———
export function getLegalServices(): LegalService[] {
  initializeStorage()
  return readJson(STORAGE_KEYS.legalServices, SEED_LEGAL_SERVICES)
}

export function saveLegalServices(items: LegalService[]): void {
  writeJson(STORAGE_KEYS.legalServices, items)
}

export function getActiveLegalServices(): LegalService[] {
  return getLegalServices()
    .filter((s) => s.status === "active")
    .sort((a, b) => a.order - b.order)
}

// ——— Training Courses ———
export function getTrainingCourses(): TrainingCourse[] {
  initializeStorage()
  return readJson(STORAGE_KEYS.trainingCourses, SEED_TRAINING_COURSES)
}

export function saveTrainingCourses(items: TrainingCourse[]): void {
  writeJson(STORAGE_KEYS.trainingCourses, items)
}

export function getActiveTrainingCourses(): TrainingCourse[] {
  return getTrainingCourses()
    .filter((c) => c.status === "active")
    .sort((a, b) => a.order - b.order)
}

// ——— Jobs ———
export function getJobs(): JobPost[] {
  initializeStorage()
  return readJson(STORAGE_KEYS.jobs, SEED_JOBS)
}

export function saveJobs(items: JobPost[]): void {
  writeJson(STORAGE_KEYS.jobs, items)
}

export function getActiveJobs(): JobPost[] {
  return getJobs()
    .filter((j) => j.status === "active")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// ——— Inquiries ———
export function getInquiries(): Inquiry[] {
  initializeStorage()
  return readJson(STORAGE_KEYS.inquiries, SEED_INQUIRIES)
}

export function saveInquiries(items: Inquiry[]): void {
  writeJson(STORAGE_KEYS.inquiries, items)
}

export function addInquiry(data: Omit<Inquiry, "id" | "status" | "createdAt">): Inquiry {
  const inquiry: Inquiry = {
    ...data,
    id: uid(),
    status: "unread",
    createdAt: new Date().toISOString(),
  }
  const items = [inquiry, ...getInquiries()]
  saveInquiries(items)
  return inquiry
}

// ——— Settings ———
export function getSettings(): SiteSettings {
  initializeStorage()
  return readJson(STORAGE_KEYS.settings, SEED_SETTINGS)
}

export function saveSettings(settings: SiteSettings): void {
  writeJson(STORAGE_KEYS.settings, settings)
}

export { uid }
