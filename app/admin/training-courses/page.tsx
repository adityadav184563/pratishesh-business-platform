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
  createTrainingCourseAdmin,
  deleteTrainingCourseAdmin,
  fetchTrainingCoursesAdmin,
  updateTrainingCourseAdmin,
} from "@/lib/api-client"
import type { TrainingCourse } from "@/lib/types/admin"

const empty: Omit<TrainingCourse, "id"> = {
  courseName: "",
  duration: "",
  fees: "",
  description: "",
  image: "/placeholder.svg",
  placementSupport: true,
  status: "active",
  order: 1,
}

export default function AdminTrainingCoursesPage() {
  const tick = useAdminDataRefresh()
  const [items, setItems] = useState<TrainingCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<TrainingCourse | null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await fetchTrainingCoursesAdmin())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load, tick])

  const openAdd = () => {
    setEditing(null)
    setForm({ ...empty, order: items.length + 1 })
    setModalOpen(true)
  }

  const openEdit = (item: TrainingCourse) => {
    setEditing(item)
    setForm({
      courseName: item.courseName,
      duration: item.duration,
      fees: item.fees,
      description: item.description,
      image: item.image,
      placementSupport: item.placementSupport,
      status: item.status,
      order: item.order,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updateTrainingCourseAdmin(editing.id, form)
      else await createTrainingCourseAdmin(form)
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
      title="Training Courses"
      subtitle="Manage industrial training programs"
      action={
        <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
          <Plus className="h-4 w-4" /> Add Course
        </button>
      }
    >
      {loading ? <p className="text-slate-500">Loading...</p> : (
        <DataTable
          data={[...items].sort((a, b) => a.order - b.order)}
          columns={[
            { key: "order", label: "Order" },
            { key: "courseName", label: "Course" },
            { key: "duration", label: "Duration" },
            { key: "fees", label: "Fees" },
            { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(row)} className="rounded p-1 hover:text-orange-600"><Pencil className="h-4 w-4" /></button>
              <button type="button" onClick={async () => { if (confirm("Delete?")) { await deleteTrainingCourseAdmin(row.id); load() } }} className="rounded p-1 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          )}
        />
      )}
      <FormModal open={modalOpen} title={editing ? "Edit Course" : "Add Course"} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} submitLabel={saving ? "Saving..." : "Save"}>
        <FormField label="Course Name" name="courseName" value={form.courseName} onChange={(v) => setForm({ ...form, courseName: v })} required />
        <FormField label="Duration" name="duration" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
        <FormField label="Fees" name="fees" value={form.fees} onChange={(v) => setForm({ ...form, fees: v })} />
        <FormField label="Description" name="description" as="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
        <FormField label="Image URL" name="image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <FormField label="Placement Support" name="placementSupport" as="select" value={form.placementSupport ? "yes" : "no"} onChange={(v) => setForm({ ...form, placementSupport: v === "yes" })} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
        <FormField label="Status" name="status" as="select" value={form.status} onChange={(v) => setForm({ ...form, status: v as TrainingCourse["status"] })} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />
        <FormField label="Order" name="order" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: Number(v) })} />
      </FormModal>
    </AdminLayout>
  )
}
