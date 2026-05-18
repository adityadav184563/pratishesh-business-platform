"use client"

import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { useSiteSettings } from "@/components/public/SiteSettingsDisplay"

const footerLinks = {
  "Our Divisions": [
    { label: "Technology Solutions", href: "/tech" },
    { label: "Legal & Compliance", href: "/legal" },
    { label: "Industrial Training", href: "/training" },
    { label: "Job Placement", href: "/job" },
  ],
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Divisions", href: "/#divisions" },
    { label: "Contact", href: "/#contact" },
  ],
}

export default function Footer() {
  const settings = useSiteSettings()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="Pratishesh"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <div>
                <p className="text-lg font-bold text-foreground">PRATISHESH</p>
                <p className="text-xs font-medium tracking-widest text-primary">ASSOCIATE & CONSULTANCY</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{settings.footerText}</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {settings.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {settings.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {settings.address}
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {settings.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
