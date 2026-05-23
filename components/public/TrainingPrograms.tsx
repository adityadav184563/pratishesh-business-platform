"use client"

import { useEffect, useState } from "react"
import { GraduationCap } from "lucide-react"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { fetchActiveTrainingCourses } from "@/lib/api-client"
import type { TrainingCourse } from "@/lib/types/admin"

export default function TrainingPrograms({ accentColor }: { accentColor: string }) {
  const tick = useAdminDataRefresh()
  const [courses, setCourses] = useState<TrainingCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActiveTrainingCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [tick])

  if (loading || courses.length === 0) return null

  return (
    <section className="py-20 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${accentColor}`}>Course Details</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Programs & Fees</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{course.courseName}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-secondary px-3 py-1 text-muted-foreground">{course.duration}</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{course.fees}</span>
                {course.placementSupport && (
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400">Placement support</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
