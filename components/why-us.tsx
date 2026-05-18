import {
  Users,
  Target,
  Wallet,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
} from "lucide-react"

const reasons = [
  {
    icon: Users,
    title: "Professional Team",
    desc: "Experienced professionals across legal, technology, HR and training domains.",
  },
  {
    icon: Target,
    title: "Multi-Domain Expertise",
    desc: "Comprehensive solutions spanning tech, legal, training and placement.",
  },
  {
    icon: Wallet,
    title: "Affordable Solutions",
    desc: "Quality services at competitive prices tailored for SMEs and startups.",
  },
  {
    icon: GraduationCap,
    title: "Practical Training",
    desc: "Industry-ready courses with hands-on project-based learning approach.",
  },
  {
    icon: HeartHandshake,
    title: "Placement Assistance",
    desc: "Direct recruitment support connecting candidates with top employers.",
  },
  {
    icon: Lightbulb,
    title: "Client-Focused Support",
    desc: "Dedicated account management with personalized attention to every client.",
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            The Pratishesh Advantage
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            We combine expertise, affordability, and commitment to deliver exceptional value for every client.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, i) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40"
            >
              {/* Number watermark */}
              <span className="absolute -right-2 -top-4 text-7xl font-bold text-muted/30 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
