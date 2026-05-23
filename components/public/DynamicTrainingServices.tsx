"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { GraduationCap } from "lucide-react"
import DivisionServices from "@/components/division/division-services"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { fetchActiveTrainingCourses } from "@/lib/api-client"

interface DynamicTrainingServicesProps {
  title: string
  subtitle: string
  accentColor: string
}

export default function DynamicTrainingServices({ title, subtitle, accentColor }: DynamicTrainingServicesProps) {
  const tick = useAdminDataRefresh()
  const [services, setServices] = useState<{ icon: LucideIcon; title: string; description: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const courses = await fetchActiveTrainingCourses()
        setServices(
          courses.map((c) => ({
            icon: GraduationCap,
            title: c.courseName,
            description: `${c.description} (${c.duration} • ${c.fees})`,
          }))
        )
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tick])

  if (loading || services.length === 0) return null

  return <DivisionServices title={title} subtitle={subtitle} services={services} accentColor={accentColor} />
}
