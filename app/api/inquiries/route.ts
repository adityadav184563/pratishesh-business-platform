import { NextResponse } from "next/server"
import { createInquiry } from "@/lib/data/repository"
import { handleApiError } from "@/lib/api-utils"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = await createInquiry({
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      message: body.message,
      division: body.division ?? "General",
    })
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
