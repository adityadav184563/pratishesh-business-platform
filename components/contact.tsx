"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import InquiryForm from "@/components/public/InquiryForm"
import { useSiteSettings } from "@/components/public/SiteSettingsDisplay"

export default function Contact() {
  const settings = useSiteSettings()
  const [division, setDivision] = useState("General")
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Get In Touch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Ready to grow your business? Reach out to us for a free consultation.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6">
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

            <div className="rounded-xl border border-border bg-card p-6">
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

            <div className="rounded-xl border border-border bg-card p-6">
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

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Working Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-8 lg:col-span-3">
            <h3 className="text-xl font-bold text-foreground">Send us a message</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="mt-6">
              <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
                Service Interested In
              </label>
              <select
                id="service"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="mb-5 w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="General">General Inquiry</option>
                <option value="Technology">Website Development</option>
                <option value="Legal & Compliance">Legal & Compliance</option>
                <option value="Training">Industrial Training</option>
                <option value="Placement">Job Placement</option>
                <option value="GST / ITR">GST / ITR Filing</option>
                <option value="Other">Other</option>
              </select>
              <InquiryForm division={division} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
