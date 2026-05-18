import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface DivisionHeroProps {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  accentColor: string
  iconBg: string
}

export default function DivisionHero({
  icon: Icon,
  title,
  subtitle,
  description,
  accentColor,
  iconBg,
}: DivisionHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background decoration */}
      <div
        className={`pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-[0.04] ${iconBg}`}
      />
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
              >
                <Icon className={`h-6 w-6 ${accentColor}`} />
              </div>
              <p className={`text-sm font-semibold uppercase tracking-widest ${accentColor}`}>
                {subtitle}
              </p>
            </div>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance leading-tight">
              {title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="#contact"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Get Consultation
            </a>
            <a
              href="#services"
              className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
