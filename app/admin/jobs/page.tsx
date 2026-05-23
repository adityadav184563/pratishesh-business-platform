"use client"

import { useCallback, useEffect, useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import DataTable from "@/components/admin/DataTable"
import FormField from "@/components/admin/FormField"
import FormModal from "@/components/admin/FormModal"
import StatusBadge from "@/components/admin/StatusBadge"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import {
  createJobAdmin,
  deleteJobAdmin,
  fetchJobsAdmin,
  updateJobAdmin,
} from "@/lib/api-client"
import type { JobPost } from "@/lib/types/admin"

const empty: Omit<JobPost, "id" | "createdAt"> = {
  jobTitle: "",
  companyName: "",
  location: "",
  salary: "",
  qualification: "",
  description: "",
  status: "active",
}

export default function AdminJobsPage() {
  const tick = useAdminDataRefresh()
  const [items, setItems] = useState<JobPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<JobPost | null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await fetchJobsAdmin())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load, tick])

  const openAdd = () => {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }

  const openEdit = (item: JobPost) => {
    setEditing(item)
    setForm({
      jobTitle: item.jobTitle,
      companyName: item.companyName,
      location: item.location,
      salary: item.salary,
      qualification: item.qualification,
      description: item.description,
      status: item.status,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updateJobAdmin(editing.id, form)
      else await createJobAdmin(form)
      setModalOpen(false)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Job Placement"
      subtitle="Manage job openings"
      action={
        <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
          <Plus className="h-4 w-4" /> Add Job
        </button>
      }
    >
      {loading ? <p className="text-slate-500">Loading...</p> : (
        <DataTable
          data={items}
          columns={[
            { key: "jobTitle", label: "Job Title" },
            { key: "companyName", label: "Company" },
            { key: "location", label: "Location" },
            { key: "salary", label: "Salary" },
            { key: "createdAt", label: "Posted", render: (row) => new Date(row.createdAt).toLocaleDateString() },
            { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(row)} className="rounded p-1 hover:text-orange-600"><Pencil className="h-4 w-4" /></button>
              <button type="button" onClick={async () => { if (confirm("Delete?")) { await deleteJobAdmin(row.id); load() } }} className="rounded p-1 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          )}
        />
      )}
      <FormModal open={modalOpen} title={editing ? "Edit Job" : "Add Job"} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} submitLabel={saving ? "Saving..." : "Save"}>
        <FormField label="Job Title" name="jobTitle" value={form.jobTitle} onChange={(v) => setForm({ ...form, jobTitle: v })} required />
        <FormField label="Company Name" name="companyName" value={form.companyName} onChange={(v) => setForm({ ...form, companyName: v })} required />
        <FormField label="Location" name="location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
        <FormField label="Salary" name="salary" value={form.salary} onChange={(v) => setForm({ ...form, salary: v })} />
        <FormField label="Qualification" name="qualification" value={form.qualification} onChange={(v) => setForm({ ...form, qualification: v })} />
        <FormField label="Description" name="description" as="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
        <FormField label="Status" name="status" as="select" value={form.status} onChange={(v) => setForm({ ...form, status: v as JobPost["status"] })} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />
      </FormModal>
    </AdminLayout>
  )
}
