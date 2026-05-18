"use client"

import { useEffect, useState } from "react"
import { Save } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import FormField from "@/components/admin/FormField"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { getSettings, saveSettings } from "@/lib/adminData"
import type { SiteSettings } from "@/lib/types/admin"

export default function AdminSettingsPage() {
  const tick = useAdminDataRefresh()
  const [form, setForm] = useState<SiteSettings>(() => getSettings())
  const [saved, setSaved] = useState(false)

  useEffect(() => setForm(getSettings()), [tick])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout title="Settings" subtitle="Company contact and social links">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <FormField label="Company Name" name="companyName" value={form.companyName} onChange={(v) => setForm({ ...form, companyName: v })} required />
        <FormField label="Phone" name="phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <FormField label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
        <FormField label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <FormField label="Address" name="address" as="textarea" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        <FormField label="Facebook URL" name="facebook" value={form.facebook} onChange={(v) => setForm({ ...form, facebook: v })} />
        <FormField label="Instagram URL" name="instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} />
        <FormField label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} />
        <FormField label="Footer Text" name="footerText" as="textarea" rows={3} value={form.footerText} onChange={(v) => setForm({ ...form, footerText: v })} />
        <div className="flex items-center gap-4 pt-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
            <Save className="h-4 w-4" />
            Save Settings
          </button>
          {saved && <span className="text-sm text-emerald-600">Settings saved successfully.</span>}
        </div>
      </form>
    </AdminLayout>
  )
}
