"use client"

import { AdminMenuButton } from "@/components/admin/AdminSidebar"

interface AdminHeaderProps {
  title: string
  subtitle?: string
  onMenuOpen: () => void
  action?: React.ReactNode
}

export default function AdminHeader({ title, subtitle, onMenuOpen, action }: AdminHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AdminMenuButton onClick={onMenuOpen} />
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
    </header>
  )
}
