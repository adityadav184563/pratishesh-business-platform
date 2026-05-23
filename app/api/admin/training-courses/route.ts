import { NextResponse } from "next/server"
import { createTrainingCourse, listTrainingCourses } from "@/lib/data/repository"
import { handleApiError, requireAdmin } from "@/lib/api-utils"

export async function GET(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied
  try {
    const data = await listTrainingCourses(false, true)
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
    const data = await createTrainingCourse(body)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
