import { NextResponse } from "next/server"
import { createInquiry } from "@/lib/data/repository"
import { handleApiError, jsonError } from "@/lib/api-utils"

interface ContactRequestBody {
  fullName: string
  email: string
  phone?: string
  service?: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody
    const { fullName, email, phone = "", service = "General", message } = body

    if (!fullName || !email || !message) {
      return jsonError("Missing required fields", 400)
    }

    await createInquiry({
      name: fullName,
      email,
      phone,
      message,
      division: service,
    })

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully" })
  } catch (error) {
    return handleApiError(error)
  }
}
