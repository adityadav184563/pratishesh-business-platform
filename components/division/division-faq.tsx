"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface DivisionFAQProps {
  title: string
  subtitle: string
  faqs: FAQItem[]
  accentColor: string
}

export default function DivisionFAQ({
  title,
  subtitle,
  faqs,
  accentColor,
}: DivisionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${accentColor}`}>
            {subtitle}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {title}
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-xl border border-border bg-card overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="pr-4 text-sm font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-border px-6 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
