import { NextResponse } from "next/server"
import { listLegalServices } from "@/lib/data/repository"
import { handleApiError } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    const activeOnly = new URL(request.url).searchParams.get("active") === "true"
    const data = await listLegalServices(activeOnly)
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
