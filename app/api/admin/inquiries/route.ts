import { NextResponse } from "next/server"
import { listInquiries } from "@/lib/data/repository"
import { handleApiError, requireAdmin } from "@/lib/api-utils"

export async function GET(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const data = await listInquiries()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
