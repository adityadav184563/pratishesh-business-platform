"use client"

import { useEffect, useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import DataTable from "@/components/admin/DataTable"
import FormField from "@/components/admin/FormField"
import FormModal from "@/components/admin/FormModal"
import StatusBadge from "@/components/admin/StatusBadge"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { getLegalServices, saveLegalServices, uid } from "@/lib/adminData"
import { ICON_OPTIONS } from "@/lib/iconMap"
import type { LegalService } from "@/lib/types/admin"

const empty: Omit<LegalService, "id"> = {
  title: "",
  description: "",
  icon: "Scale",
  category: "",
  status: "active",
  order: 1,
}

export default function AdminLegalServicesPage() {
  const tick = useAdminDataRefresh()
  const [items, setItems] = useState<LegalService[]>(() => getLegalServices())
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<LegalService | null>(null)
  const [form, setForm] = useState(empty)

  useEffect(() => setItems(getLegalServices()), [tick])

  const openAdd = () => {
    setEditing(null)
    setForm({ ...empty, order: items.length + 1 })
    setModalOpen(true)
  }

  const openEdit = (item: LegalService) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = editing
      ? items.map((i) => (i.id === editing.id ? { ...editing, ...form } : i))
      : [...items, { id: uid(), ...form }]
    saveLegalServices(next)
    setItems(next)
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this legal service?")) return
    const next = items.filter((i) => i.id !== id)
    saveLegalServices(next)
    setItems(next)
  }

  return (
    <AdminLayout
      title="Legal Services"
      subtitle="Manage legal & compliance services"
      action={
        <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      }
    >
      <DataTable
        data={[...items].sort((a, b) => a.order - b.order)}
        columns={[
          { key: "order", label: "Order" },
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
        ]}
        actions={(row) => (
          <div className="flex gap-2">
            <button type="button" onClick={() => openEdit(row)} className="rounded p-1 hover:text-orange-600"><Pencil className="h-4 w-4" /></button>
            <button type="button" onClick={() => handleDelete(row.id)} className="rounded p-1 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        )}
      />
      <FormModal open={modalOpen} title={editing ? "Edit Legal Service" : "Add Legal Service"} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <FormField label="Title" name="title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <FormField label="Description" name="description" as="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
        <FormField label="Icon" name="icon" as="select" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} options={ICON_OPTIONS.map((i) => ({ value: i, label: i }))} />
        <FormField label="Category" name="category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
        <FormField label="Status" name="status" as="select" value={form.status} onChange={(v) => setForm({ ...form, status: v as LegalService["status"] })} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />
        <FormField label="Order" name="order" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: Number(v) })} />
      </FormModal>
    </AdminLayout>
  )
}
