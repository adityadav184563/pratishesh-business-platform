"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { GraduationCap } from "lucide-react"
import DivisionServices from "@/components/division/division-services"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { getActiveTrainingCourses } from "@/lib/adminData"

interface DynamicTrainingServicesProps {
  title: string
  subtitle: string
  accentColor: string
}

export default function DynamicTrainingServices({ title, subtitle, accentColor }: DynamicTrainingServicesProps) {
  const tick = useAdminDataRefresh()
  const mapCourses = () =>
    getActiveTrainingCourses().map((c) => ({
      icon: GraduationCap,
      title: c.courseName,
      description: `${c.description} (${c.duration} • ${c.fees})`,
    }))

  const [services, setServices] = useState<{ icon: LucideIcon; title: string; description: string }[]>(mapCourses)

  useEffect(() => {
    setServices(mapCourses())
  }, [tick])

  if (services.length === 0) return null

  return <DivisionServices title={title} subtitle={subtitle} services={services} accentColor={accentColor} />
}
