import { adminLogin, adminLogout, checkAdminSession } from "@/lib/api-client"

const AUTH_KEY = "pratishesh_admin_auth"

export const DEMO_CREDENTIALS = {
  username: "admin",
  password: "admin123",
}

export async function login(username: string, password: string): Promise<boolean> {
  try {
    await adminLogin(username, password)
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, "true")
    }
    return true
  } catch {
    return false
  }
}

export async function logout(): Promise<void> {
  try {
    await adminLogout()
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEY)
    }
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_KEY) === "true"
}

export async function verifySession(): Promise<boolean> {
  try {
    const { authenticated } = await checkAdminSession()
    if (typeof window !== "undefined") {
      if (authenticated) localStorage.setItem(AUTH_KEY, "true")
      else localStorage.removeItem(AUTH_KEY)
    }
    return authenticated
  } catch {
    return false
  }
}
