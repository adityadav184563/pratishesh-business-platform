"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { submitInquiry } from "@/lib/api-client"
import { DEFAULT_PHONE } from "@/lib/defaultSettings"

interface InquiryFormProps {
  division: string
  className?: string
}

export default function InquiryForm({ division, className = "" }: InquiryFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitInquiry({ name, email, phone, message, division })
      setSubmitted(true)
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={`space-y-5 ${className}`} onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="inq-name" className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
          <input id="inq-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="inq-email" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
          <input id="inq-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div>
        <label htmlFor="inq-phone" className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
        <input id="inq-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={DEFAULT_PHONE} className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="inq-message" className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
        <textarea id="inq-message" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your requirements..." className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      {submitted && <p className="text-sm text-emerald-400">Thank you! Your message has been sent. We will contact you soon.</p>}
      <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60">
        <Send className="h-4 w-4" />
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}
