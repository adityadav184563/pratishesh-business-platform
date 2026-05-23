import { NextResponse } from "next/server"
import { clearAdminCookie } from "@/lib/admin-session"

export async function POST() {
  const response = NextResponse.json({ ok: true })
  clearAdminCookie(response)
  return response
}
