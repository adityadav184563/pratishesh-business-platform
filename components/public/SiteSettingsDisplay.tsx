"use client"

import { useEffect, useState } from "react"
import { useAdminDataRefresh, useMounted } from "@/hooks/use-admin-data"
import { getSettings } from "@/lib/adminData"
import type { SiteSettings } from "@/lib/types/admin"
import { SEED_SETTINGS } from "@/lib/adminData"

export function useSiteSettings(): SiteSettings {
  const mounted = useMounted()
  const tick = useAdminDataRefresh()
  const [settings, setSettings] = useState<SiteSettings>(SEED_SETTINGS)

  useEffect(() => {
    if (mounted) setSettings(getSettings())
  }, [mounted, tick])

  return settings
}
