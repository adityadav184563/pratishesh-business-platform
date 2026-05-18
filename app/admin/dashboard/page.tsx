"use client"

import {
  Briefcase,
  GraduationCap,
  Mail,
  Monitor,
  Scale,
} from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import StatCard from "@/components/admin/StatCard"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import {
  getInquiries,
  getJobs,
  getLegalServices,
  getTechServices,
  getTrainingCourses,
} from "@/lib/adminData"

export default function AdminDashboardPage() {
  const tick = useAdminDataRefresh()
  void tick

  const tech = getTechServices()
  const legal = getLegalServices()
  const training = getTrainingCourses()
  const jobs = getJobs()
  const inquiries = getInquiries()
  const unread = inquiries.filter((i) => i.status === "unread").length

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your website content">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Tech Services" value={tech.length} icon={Monitor} accent="blue" />
        <StatCard title="Legal Services" value={legal.length} icon={Scale} accent="green" />
        <StatCard title="Training Courses" value={training.length} icon={GraduationCap} accent="orange" />
        <StatCard title="Job Posts" value={jobs.length} icon={Briefcase} accent="navy" />
        <StatCard title="Total Inquiries" value={inquiries.length} icon={Mail} accent="blue" />
        <StatCard title="Unread Inquiries" value={unread} icon={Mail} accent="orange" />
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
        <p className="mt-1 text-sm text-slate-500">Manage content from the sidebar menu.</p>
        <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <li>• Add or edit tech & legal services</li>
          <li>• Update training courses and job posts</li>
          <li>• Review contact form inquiries</li>
          <li>• Update company contact settings</li>
        </ul>
      </div>
    </AdminLayout>
  )
}
