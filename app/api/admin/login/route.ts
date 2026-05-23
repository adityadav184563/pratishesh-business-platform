import { NextResponse } from "next/server"
import { setAdminCookie, validateAdminCredentials } from "@/lib/admin-session"
import { handleApiError, jsonError } from "@/lib/api-utils"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    if (!validateAdminCredentials(username, password)) {
      return jsonError("Invalid username or password", 401)
    }
    const response = NextResponse.json({ ok: true })
    setAdminCookie(response)
    return response
  } catch (error) {
    return handleApiError(error)
  }
}
