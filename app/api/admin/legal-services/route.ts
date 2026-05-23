import { NextResponse } from "next/server"
import { createLegalService, listLegalServices } from "@/lib/data/repository"
import { handleApiError, requireAdmin } from "@/lib/api-utils"

export async function GET(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const data = await listLegalServices(false, true)
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const body = await request.json()
    const data = await createLegalService(body)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
