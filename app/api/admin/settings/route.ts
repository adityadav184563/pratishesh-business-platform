import { NextResponse } from "next/server"
import { getSiteSettings, updateSiteSettings } from "@/lib/data/repository"
import { handleApiError, requireAdmin } from "@/lib/api-utils"
import { isSupabaseAvailable } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const data = await getSiteSettings()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const body = await request.json()
    const data = await updateSiteSettings(body)
    const response = isSupabaseAvailable()
      ? data
      : { ...data, info: "Saved locally. Connect database to publish globally." }
    return NextResponse.json(response)
  } catch (error) {
    return handleApiError(error)
  }
}
