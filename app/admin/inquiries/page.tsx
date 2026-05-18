"use client"

import { useEffect, useState } from "react"
import { Check, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import DataTable from "@/components/admin/DataTable"
import StatusBadge from "@/components/admin/StatusBadge"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { getInquiries, saveInquiries } from "@/lib/adminData"
import type { Inquiry } from "@/lib/types/admin"

export default function AdminInquiriesPage() {
  const tick = useAdminDataRefresh()
  const [items, setItems] = useState<Inquiry[]>(() => getInquiries())

  useEffect(() => setItems(getInquiries()), [tick])

  const markRead = (id: string) => {
    const next = items.map((i) => (i.id === id ? { ...i, status: "read" as const } : i))
    saveInquiries(next)
    setItems(next)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this inquiry?")) return
    const next = items.filter((i) => i.id !== id)
    saveInquiries(next)
    setItems(next)
  }

  return (
    <AdminLayout title="Inquiries" subtitle="Contact form submissions from the website">
      <DataTable
        data={items}
        emptyMessage="No inquiries yet. Submissions from the public site will appear here."
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "division", label: "Division" },
          {
            key: "message",
            label: "Message",
            render: (row) => (
              <span className="line-clamp-2 max-w-xs" title={row.message}>
                {row.message}
              </span>
            ),
          },
          { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
          {
            key: "createdAt",
            label: "Date",
            render: (row) => new Date(row.createdAt).toLocaleString(),
          },
        ]}
        actions={(row) => (
          <div className="flex gap-2">
            {row.status === "unread" && (
              <button
                type="button"
                onClick={() => markRead(row.id)}
                className="rounded p-1 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                title="Mark as read"
              >
                <Check className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDelete(row.id)}
              className="rounded p-1 text-slate-500 hover:bg-red-50 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      />
    </AdminLayout>
  )
}
