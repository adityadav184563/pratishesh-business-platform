"use client"

import { useEffect, useState } from "react"

export function useAdminDataRefresh(): number {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const handler = () => setTick((t) => t + 1)
    window.addEventListener("pratishesh-data-updated", handler)
    return () => window.removeEventListener("pratishesh-data-updated", handler)
  }, [])

  return tick
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
