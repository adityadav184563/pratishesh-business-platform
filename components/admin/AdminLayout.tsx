"use client"

import { useState } from "react"
import AdminAuthGuard from "@/components/admin/AdminAuthGuard"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminSidebar from "@/components/admin/AdminSidebar"

interface AdminLayoutProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
}

export default function AdminLayout({ title, subtitle, action, children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader
            title={title}
            subtitle={subtitle}
            onMenuOpen={() => setSidebarOpen(true)}
            action={action}
          />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  )
}
