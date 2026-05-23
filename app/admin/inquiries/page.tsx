"use client"

import { useCallback, useEffect, useState } from "react"
import { Check, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import DataTable from "@/components/admin/DataTable"
import StatusBadge from "@/components/admin/StatusBadge"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { deleteInquiryAdmin, fetchInquiriesAdmin, markInquiryReadAdmin } from "@/lib/api-client"
import type { Inquiry } from "@/lib/types/admin"

export default function AdminInquiriesPage() {
  const tick = useAdminDataRefresh()
  const [items, setItems] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await fetchInquiriesAdmin())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load, tick])

  return (
    <AdminLayout title="Inquiries" subtitle="Contact form submissions from the website">
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <DataTable
          data={items}
          emptyMessage="No inquiries yet. Submissions from the public site will appear here."
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "division", label: "Division" },
            { key: "message", label: "Message", render: (row) => <span className="line-clamp-2 max-w-xs">{row.message}</span> },
            { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
            { key: "createdAt", label: "Date", render: (row) => new Date(row.createdAt).toLocaleString() },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              {row.status === "unread" && (
                <button type="button" onClick={async () => { await markInquiryReadAdmin(row.id); load() }} className="rounded p-1 hover:text-emerald-600" title="Mark as read">
                  <Check className="h-4 w-4" />
                </button>
              )}
              <button type="button" onClick={async () => { if (confirm("Delete?")) { await deleteInquiryAdmin(row.id); load() } }} className="rounded p-1 hover:text-red-600" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        />
      )}
    </AdminLayout>
  )
}
