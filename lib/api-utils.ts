import { NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin-session"

export function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status })
}

export function handleApiError(error: unknown) {
  console.error(error)
  const message = error instanceof Error ? error.message : "Internal server error"
  return jsonError(message, 500)
}

export function requireAdmin(request: Request) {
  if (!isAdminRequest(request)) {
    return jsonError("Unauthorized", 401)
  }
  return null
}
