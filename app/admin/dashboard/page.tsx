"use client"

import { useEffect, useState } from "react"
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
  fetchInquiriesAdmin,
  fetchJobsAdmin,
  fetchLegalServicesAdmin,
  fetchTechServicesAdmin,
  fetchTrainingCoursesAdmin,
} from "@/lib/api-client"

export default function AdminDashboardPage() {
  const tick = useAdminDataRefresh()
  const [stats, setStats] = useState({
    tech: 0,
    legal: 0,
    training: 0,
    jobs: 0,
    inquiries: 0,
    unread: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [tech, legal, training, jobs, inquiries] = await Promise.all([
          fetchTechServicesAdmin(),
          fetchLegalServicesAdmin(),
          fetchTrainingCoursesAdmin(),
          fetchJobsAdmin(),
          fetchInquiriesAdmin(),
        ])
        setStats({
          tech: tech.length,
          legal: legal.length,
          training: training.length,
          jobs: jobs.length,
          inquiries: inquiries.length,
          unread: inquiries.filter((i) => i.status === "unread").length,
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tick])

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your website content">
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard title="Tech Services" value={stats.tech} icon={Monitor} accent="blue" />
            <StatCard title="Legal Services" value={stats.legal} icon={Scale} accent="green" />
            <StatCard title="Training Courses" value={stats.training} icon={GraduationCap} accent="orange" />
            <StatCard title="Job Posts" value={stats.jobs} icon={Briefcase} accent="navy" />
            <StatCard title="Total Inquiries" value={stats.inquiries} icon={Mail} accent="blue" />
            <StatCard title="Unread Inquiries" value={stats.unread} icon={Mail} accent="orange" />
          </div>
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
            <p className="mt-1 text-sm text-slate-500">Changes sync to Supabase — visible on all devices instantly.</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <li>• Add or edit tech & legal services</li>
              <li>• Update training courses and job posts</li>
              <li>• Review contact form inquiries</li>
              <li>• Update company contact settings</li>
            </ul>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
