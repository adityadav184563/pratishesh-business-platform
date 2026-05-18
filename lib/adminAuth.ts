const AUTH_KEY = "pratishesh_admin_auth"

const DEMO_USERNAME = "admin"
const DEMO_PASSWORD = "admin123"

export function login(username: string, password: string): boolean {
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, "true")
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY)
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_KEY) === "true"
}

export const DEMO_CREDENTIALS = {
  username: DEMO_USERNAME,
  password: DEMO_PASSWORD,
}
