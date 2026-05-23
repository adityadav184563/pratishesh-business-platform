import { NextResponse } from "next/server"
import { getSiteSettings } from "@/lib/data/repository"
import { handleApiError } from "@/lib/api-utils"

export async function GET() {
  try {
    const data = await getSiteSettings()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
