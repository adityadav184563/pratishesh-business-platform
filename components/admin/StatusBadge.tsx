export default function StatusBadge({ status }: { status: string }) {
  const isActive = status === "active"
  const isUnread = status === "unread"
  const className = isActive
    ? "bg-emerald-100 text-emerald-700"
    : isUnread
      ? "bg-orange-100 text-orange-700"
      : status === "read"
        ? "bg-slate-100 text-slate-600"
        : "bg-slate-100 text-slate-500"

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${className}`}>
      {status}
    </span>
  )
}
