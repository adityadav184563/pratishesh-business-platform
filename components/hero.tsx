import { Star, ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted Business Partner</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              We Build Modern Digital Solutions & Business Strategies{" "}
              <span className="text-primary">for Your Growth</span>
            </h1>

            <p className="mt-6 text-lg font-medium text-primary/90">
              Empowering Businesses with Professional Consultancy, Legal Compliance, HR Solutions, and Web Development Services
            </p>

            <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
              At Pratishesh Associate & Consultancy, we provide complete business support services including manpower recruitment, HR & accounting, statutory compliance, legal consultation, registration processes, and professional website development.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                <Star className="h-4 w-4" />
                Get Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-muted"
              >
                <ArrowRight className="h-4 w-4" />
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Clients Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4+</p>
                <p className="text-sm text-muted-foreground">Service Divisions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right - Decorative Card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Main Card */}
              <div className="relative z-10 rounded-2xl border border-border bg-card p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
                    <svg className="h-7 w-7 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Business Growth</p>
                    <p className="text-xl font-bold text-foreground">+127%</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 rounded-full bg-muted">
                    <div className="h-full w-4/5 rounded-full bg-primary" />
                  </div>
                  <div className="h-2.5 rounded-full bg-muted">
                    <div className="h-full w-3/5 rounded-full bg-primary/70" />
                  </div>
                  <div className="h-2.5 rounded-full bg-muted">
                    <div className="h-full w-11/12 rounded-full bg-primary/50" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-xs text-muted-foreground">Legal Services</p>
                    <p className="text-lg font-bold text-foreground">Active</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-xs text-muted-foreground">IT Projects</p>
                    <p className="text-lg font-bold text-foreground">12+</p>
                  </div>
                </div>
              </div>

              {/* Background decoration cards */}
              <div className="absolute -right-6 -bottom-6 h-full w-full rounded-2xl border border-primary/20 bg-primary/5" />
              <div className="absolute -right-12 -bottom-12 h-full w-full rounded-2xl border border-primary/10 bg-primary/3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
