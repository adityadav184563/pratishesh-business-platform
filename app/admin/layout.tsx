import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Pratishesh Associate & Consultancy",
  description: "Admin panel for Pratishesh website management",
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-panel">{children}</div>
}
