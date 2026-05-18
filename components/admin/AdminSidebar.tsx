"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Monitor,
  Scale,
  Settings,
  X,
} from "lucide-react"
import { logout } from "@/lib/adminAuth"
import { useRouter } from "next/navigation"

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Tech Services", href: "/admin/tech-services", icon: Monitor },
  { label: "Legal Services", href: "/admin/legal-services", icon: Scale },
  { label: "Training Courses", href: "/admin/training-courses", icon: GraduationCap },
  { label: "Job Placement", href: "/admin/jobs", icon: Briefcase },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const nav = (
    <>
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-lg font-bold text-white">PRATISHESH</p>
        <p className="text-xs font-medium tracking-widest text-orange-400">ADMIN PANEL</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-orange-500 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-red-500/20 hover:text-red-300"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0f172a] transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-4 rounded-lg p-1 text-slate-400 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        {nav}
      </aside>
    </>
  )
}

export function AdminMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
