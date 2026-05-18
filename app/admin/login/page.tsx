"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { DEMO_CREDENTIALS, isAuthenticated, login } from "@/lib/adminAuth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin/dashboard")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const ok = login(username, password)
    setLoading(false)
    if (ok) {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-[#0f172a] p-12 lg:flex">
        <div>
          <p className="text-2xl font-bold text-white">PRATISHESH</p>
          <p className="text-sm tracking-widest text-orange-400">ADMIN PANEL</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Manage your website</h1>
          <p className="mt-3 max-w-md text-slate-400">
            Control services, courses, jobs, inquiries and site settings from one dashboard.
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Demo: {DEMO_CREDENTIALS.username} / {DEMO_CREDENTIALS.password}
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-slate-50 px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src="/images/logo.jpeg" alt="Logo" width={48} height={48} className="rounded-lg" />
            <div>
              <p className="font-bold text-slate-900">PRATISHESH</p>
              <p className="text-xs text-orange-500">Admin Login</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
              <Lock className="h-6 w-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
            <p className="mt-1 text-sm text-slate-500">Enter your admin credentials</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-400 lg:hidden">Demo: admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
