import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const ADMIN_COOKIE = "pratishesh_admin_session"
const DEMO_USERNAME = "admin"
const DEMO_PASSWORD = "admin123"

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === DEMO_USERNAME && password === DEMO_PASSWORD
}

export function setAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 })
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_COOKIE)?.value === "1"
}

export function isAdminRequest(request: Request): boolean {
  const cookie = request.headers.get("cookie") ?? ""
  return cookie.includes(`${ADMIN_COOKIE}=1`)
}
