import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Founder, TechStart India",
    text: "Pratishesh built our entire business website and handled GST registration seamlessly. Their multi-service approach saved us both time and money.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "HR Manager, GreenLeaf Corp",
    text: "The industrial training programs are excellent. Three of our interns who trained at Pratishesh are now full-time employees. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "Director, Verma & Associates",
    text: "Outstanding legal compliance support. They handled our PF, ESIC and company registration with complete professionalism and on-time delivery.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    role: "Student, B.Tech Graduate",
    text: "The Flask and Python training was hands-on and practical. I got placed within 2 months of completing my course. Thank you Pratishesh!",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Trusted by businesses, professionals, and students across India.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
            >
              <Quote className="mb-3 h-8 w-8 text-primary/30" />
              <p className="text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
