"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import DivisionServices from "@/components/division/division-services"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { fetchActiveLegalServices, fetchActiveTechServices } from "@/lib/api-client"
import { getIcon } from "@/lib/iconMap"

type DivisionSource = "tech" | "legal"

interface DynamicDivisionServicesProps {
  source: DivisionSource
  title: string
  subtitle: string
  accentColor: string
}

export default function DynamicDivisionServices({
  source,
  title,
  subtitle,
  accentColor,
}: DynamicDivisionServicesProps) {
  const tick = useAdminDataRefresh()
  const [services, setServices] = useState<{ icon: LucideIcon; title: string; description: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const items = source === "tech" ? await fetchActiveTechServices() : await fetchActiveLegalServices()
        setServices(
          items.map((s) => ({
            icon: getIcon(s.icon),
            title: s.title,
            description: s.description,
          }))
        )
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [source, tick])

  if (loading) return null
  if (services.length === 0) return null

  return <DivisionServices title={title} subtitle={subtitle} services={services} accentColor={accentColor} />
}
