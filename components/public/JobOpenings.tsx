"use client"

import { useEffect, useState } from "react"
import { Briefcase, MapPin } from "lucide-react"
import { useAdminDataRefresh } from "@/hooks/use-admin-data"
import { fetchActiveJobs } from "@/lib/api-client"
import type { JobPost } from "@/lib/types/admin"

export default function JobOpenings({ accentColor }: { accentColor: string }) {
  const tick = useAdminDataRefresh()
  const [jobs, setJobs] = useState<JobPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActiveJobs()
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [tick])

  if (loading || jobs.length === 0) return null

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${accentColor}`}>Current Openings</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Available Positions</h2>
        </div>
        <div className="mt-14 space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{job.jobTitle}</h3>
                  </div>
                  <p className="mt-1 text-sm text-primary">{job.companyName}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Qualification: {job.qualification}</p>
                </div>
                <div className="shrink-0 space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {job.location}
                  </p>
                  <p className="font-medium text-foreground">{job.salary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
