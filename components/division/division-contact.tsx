"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import InquiryForm from "@/components/public/InquiryForm"
import { useSiteSettings } from "@/components/public/SiteSettingsDisplay"

interface DivisionContactProps {
  divisionName: string
  accentColor: string
}

export default function DivisionContact({ divisionName, accentColor }: DivisionContactProps) {
  const settings = useSiteSettings()

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${accentColor}`}>
            Get In Touch
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Contact Our {divisionName} Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Reach out to discuss your requirements. We provide free consultation for all our services.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{settings.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{settings.phone}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 lg:col-span-3">
            <h3 className="text-xl font-bold text-foreground">Request a Consultation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form and our {divisionName.toLowerCase()} team will get back to you within 24 hours.
            </p>
            <InquiryForm division={divisionName} className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  )
}
