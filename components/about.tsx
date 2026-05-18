import { Shield, CheckCircle, Users } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left - Info */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              About Us
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              A Multi-Service Organization Driving Growth
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Pratishesh is a multi-service organization providing digital technology solutions,
              legal and compliance support, industrial training programs, and career placement
              assistance for businesses, students, and professionals based in Lucknow, Uttar Pradesh.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We are dedicated to empowering businesses with comprehensive solutions that cover
              every aspect of modern business operations — from web development and technology to
              legal compliance, workforce training, and recruitment support.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Professional Team with Multi-Domain Expertise",
                "Affordable & Client-Focused Solutions",
                "End-to-End Business Support Services",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40">
              <Shield className="mb-4 h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Trusted Partner</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Trusted by 500+ businesses across India for reliable professional services.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40">
              <Users className="mb-4 h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Expert Team</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Experienced professionals in legal, tech, HR, and training domains.
              </p>
            </div>
            <div className="col-span-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Complete Business Solutions</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Technology, Legal, Training & Placement — all under one roof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
