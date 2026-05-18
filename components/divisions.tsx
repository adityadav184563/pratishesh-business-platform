import { ArrowRight, Monitor, Scale, GraduationCap, Briefcase } from "lucide-react"
import Link from "next/link"

const divisions = [
  {
    icon: Monitor,
    title: "Technology Solutions",
    desc: "Website development, Flask apps, WordPress, hosting, SEO and digital solutions for businesses.",
    color: "bg-blue-500/10 text-blue-400",
    borderColor: "hover:border-blue-500/40",
    href: "/tech",
    services: ["Website Development", "Flask Development", "WordPress", "E-Commerce", "Hosting & Domain", "SEO"],
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    desc: "GST, ITR, MSME, company registration, PF, ESIC and compliance support for all business types.",
    color: "bg-emerald-500/10 text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
    href: "/legal",
    services: ["GST Registration", "ITR Filing", "MSME Registration", "Company Registration", "PF & ESIC", "Labour Law"],
  },
  {
    icon: GraduationCap,
    title: "Industrial Training",
    desc: "Job-ready courses, Flask training, Tally, HR, Python, Java and practical learning programs.",
    color: "bg-primary/10 text-primary",
    borderColor: "hover:border-primary/40",
    href: "/training",
    services: ["Flask Development", "HR & Office Management", "Tally & Accounting", "Python", "Java", "O Level"],
  },
  {
    icon: Briefcase,
    title: "Job Placement",
    desc: "Resume building, interview preparation, recruitment and placement support for candidates and employers.",
    color: "bg-violet-500/10 text-violet-400",
    borderColor: "hover:border-violet-500/40",
    href: "/job",
    services: ["Candidate Registration", "Resume Building", "Interview Prep", "Current Openings", "Employer Support", "Internships"],
  },
]

export default function Divisions() {
  return (
    <section id="divisions" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Our Divisions
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Four Specialized Divisions, One Vision
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Each division is dedicated to delivering excellence in its domain — together they form a complete ecosystem for business growth.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {divisions.map((div) => (
            <Link
              key={div.title}
              href={div.href}
              className={`group rounded-2xl border border-border bg-card p-8 transition-all duration-300 ${div.borderColor} hover:shadow-xl block`}
            >
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${div.color}`}>
                <div.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{div.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{div.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {div.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                  Explore Division <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
