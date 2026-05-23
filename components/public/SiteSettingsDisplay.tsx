"use client"

import { useEffect, useState } from "react"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { fetchSettings } from "@/lib/api-client"
import { DEFAULT_SETTINGS } from "@/lib/supabase/mappers"
import type { SiteSettings } from "@/lib/types/admin"

export function useSiteSettings(): SiteSettings {
  const tick = useAdminDataRefresh()
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch(() => setSettings(DEFAULT_SETTINGS))
  }, [tick])

  return settings
}
