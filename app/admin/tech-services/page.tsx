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
  createTechServiceAdmin,
  deleteTechServiceAdmin,
  fetchTechServicesAdmin,
  updateTechServiceAdmin,
} from "@/lib/api-client"
import { ICON_OPTIONS } from "@/lib/iconMap"
import type { TechService } from "@/lib/types/admin"

const empty: Omit<TechService, "id"> = {
  title: "",
  description: "",
  icon: "Globe",
  category: "",
  status: "active",
  order: 1,
}

export default function AdminTechServicesPage() {
  const tick = useAdminDataRefresh()
  const [items, setItems] = useState<TechService[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<TechService | null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchTechServicesAdmin()
      setItems(data)
    } catch (e) {
      console.error(e)
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

  const openEdit = (item: TechService) => {
    setEditing(item)
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      category: item.category,
      status: item.status,
      order: item.order,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updateTechServiceAdmin(editing.id, form)
      else await createTechServiceAdmin(form)
      setModalOpen(false)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tech service?")) return
    try {
      await deleteTechServiceAdmin(id)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete")
    }
  }

  return (
    <AdminLayout
      title="Tech Services"
      subtitle="Manage technology division services"
      action={
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      }
    >
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <DataTable
          data={[...items].sort((a, b) => a.order - b.order)}
          columns={[
            { key: "order", label: "Order" },
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "icon", label: "Icon" },
            { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(row)} className="rounded p-1 text-slate-500 hover:text-orange-600">
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => handleDelete(row.id)} className="rounded p-1 text-slate-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        />
      )}

      <FormModal
        open={modalOpen}
        title={editing ? "Edit Tech Service" : "Add Tech Service"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        submitLabel={saving ? "Saving..." : "Save"}
      >
        <FormField label="Title" name="title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <FormField label="Description" name="description" as="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
        <FormField label="Icon" name="icon" as="select" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} options={ICON_OPTIONS.map((i) => ({ value: i, label: i }))} />
        <FormField label="Category" name="category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
        <FormField label="Status" name="status" as="select" value={form.status} onChange={(v) => setForm({ ...form, status: v as TechService["status"] })} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />
        <FormField label="Order" name="order" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: Number(v) })} />
      </FormModal>
    </AdminLayout>
  )
}
