import { NextResponse } from "next/server"
import { deleteInquiry, markInquiryRead } from "@/lib/data/repository"
import { handleApiError, requireAdmin, jsonError } from "@/lib/api-utils"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const { id } = await params
    const body = await request.json()
    if (body.status === "read") {
      const data = await markInquiryRead(id)
      return NextResponse.json(data)
    }
    return jsonError("Invalid update", 400)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const { id } = await params
    await deleteInquiry(id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleApiError(error)
  }
}
