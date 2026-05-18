"use client"

import { useCallback, useEffect, useState } from "react"
import { initializeStorage } from "@/lib/adminData"

export function useAdminDataRefresh(): number {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    initializeStorage()
    const handler = () => setTick((t) => t + 1)
    window.addEventListener("pratishesh-data-updated", handler)
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener("pratishesh-data-updated", handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  return tick
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
