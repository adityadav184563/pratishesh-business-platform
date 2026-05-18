"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import DivisionServices from "@/components/division/division-services"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { getActiveLegalServices, getActiveTechServices } from "@/lib/adminData"
import { getIcon } from "@/lib/iconMap"

type DivisionSource = "tech" | "legal"

interface DynamicDivisionServicesProps {
  source: DivisionSource
  title: string
  subtitle: string
  accentColor: string
}

function loadServices(source: DivisionSource) {
  const items = source === "tech" ? getActiveTechServices() : getActiveLegalServices()
  return items.map((s) => ({
    icon: getIcon(s.icon),
    title: s.title,
    description: s.description,
  }))
}

export default function DynamicDivisionServices({
  source,
  title,
  subtitle,
  accentColor,
}: DynamicDivisionServicesProps) {
  const tick = useAdminDataRefresh()
  const [services, setServices] = useState<{ icon: LucideIcon; title: string; description: string }[]>(() =>
    loadServices(source)
  )

  useEffect(() => {
    setServices(loadServices(source))
  }, [source, tick])

  return <DivisionServices title={title} subtitle={subtitle} services={services} accentColor={accentColor} />
}
