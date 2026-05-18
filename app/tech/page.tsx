import type { Metadata } from "next"
import { Monitor } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import DivisionHero from "@/components/division/division-hero"
import DynamicDivisionServices from "@/components/public/DynamicDivisionServices"
import ProcessSteps from "@/components/division/process-steps"
import DivisionFAQ from "@/components/division/division-faq"
import DivisionContact from "@/components/division/division-contact"

export const metadata: Metadata = {
  title: "Technology & Digital Solutions - Pratishesh Associate & Consultancy",
  description:
    "Professional websites, web apps, hosting, SEO and digital growth solutions. Website development, Flask apps, WordPress, E-Commerce and more.",
}

const processSteps = [
  {
    step: "1",
    title: "Requirement Analysis",
    description: "We understand your business goals, target audience and technical requirements.",
  },
  {
    step: "2",
    title: "Design & Development",
    description: "Our team creates modern, responsive designs and builds your solution with clean code.",
  },
  {
    step: "3",
    title: "Testing & Deployment",
    description: "Thorough testing across devices, SSL setup, hosting configuration and launch.",
  },
  {
    step: "4",
    title: "Support & Maintenance",
    description: "Ongoing support, regular updates, backups and performance optimization.",
  },
]

const faqs = [
  {
    question: "What types of websites do you develop?",
    answer:
      "We develop business websites, portfolio sites, e-commerce stores, web applications using Flask/Python, WordPress sites, and custom solutions tailored to your specific needs.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A basic business website typically takes 5-10 working days. Custom web applications and e-commerce sites may take 2-4 weeks depending on complexity and features required.",
  },
  {
    question: "Do you provide hosting and domain support?",
    answer:
      "Yes, we provide complete hosting solutions including VPS hosting, domain registration and setup, SSL certificates, and ongoing server management.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Absolutely. All our websites are fully responsive and optimized for mobile, tablet and desktop devices to ensure the best user experience.",
  },
  {
    question: "Do you offer SEO services?",
    answer:
      "Yes, we provide on-page SEO optimization including meta tags, speed optimization, structured data, and keyword optimization to improve your search engine rankings.",
  },
  {
    question: "What is the cost of website development?",
    answer:
      "Pricing depends on the project scope and features. We offer competitive packages starting from basic business websites. Contact us for a free quote.",
  },
]

export default function TechPage() {
  return (
    <>
      <Navbar />
      <main>
        <DivisionHero
          icon={Monitor}
          title="Technology & Digital Solutions"
          subtitle="Tech Division"
          description="Professional websites, web apps, hosting and digital growth solutions. We help businesses establish a strong online presence with modern technology."
          accentColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />
        <DynamicDivisionServices
          source="tech"
          title="Our IT Services"
          subtitle="What We Offer"
          accentColor="text-blue-400"
        />
        <ProcessSteps
          title="How We Work"
          subtitle="Our Process"
          steps={processSteps}
          accentColor="text-blue-400"
        />
        <DivisionFAQ
          title="Frequently Asked Questions"
          subtitle="Tech FAQ"
          faqs={faqs}
          accentColor="text-blue-400"
        />
        <DivisionContact divisionName="Technology" accentColor="text-blue-400" />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
