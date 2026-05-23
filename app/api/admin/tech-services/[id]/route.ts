import { NextResponse } from "next/server"
import { deleteTechService, updateTechService } from "@/lib/data/repository"
import { handleApiError, requireAdmin } from "@/lib/api-utils"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const { id } = await params
    const body = await request.json()
    const data = await updateTechService(id, body)
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const { id } = await params
    await deleteTechService(id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleApiError(error)
  }
}
