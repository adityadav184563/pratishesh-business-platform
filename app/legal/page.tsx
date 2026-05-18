import type { Metadata } from "next"
import { Scale } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import DivisionHero from "@/components/division/division-hero"
import DynamicDivisionServices from "@/components/public/DynamicDivisionServices"
import ProcessSteps from "@/components/division/process-steps"
import DivisionFAQ from "@/components/division/division-faq"
import DivisionContact from "@/components/division/division-contact"

export const metadata: Metadata = {
  title: "Legal & Compliance Services - Pratishesh Associate & Consultancy",
  description:
    "Business registration, GST, ITR, MSME, company registration, PF, ESIC, labour law and statutory compliance support for all business types.",
}

const processSteps = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "Free consultation to understand your business structure and compliance requirements.",
  },
  {
    step: "2",
    title: "Document Collection",
    description: "We gather all necessary documents and verify eligibility for required registrations.",
  },
  {
    step: "3",
    title: "Filing & Processing",
    description: "Expert filing with government portals, follow-ups and status tracking until completion.",
  },
  {
    step: "4",
    title: "Delivery & Support",
    description: "Certificate delivery, ongoing compliance reminders and renewal support.",
  },
]

const faqs = [
  {
    question: "What documents are needed for GST registration?",
    answer:
      "Basic documents include PAN card, Aadhaar card, proof of business address, bank account details, and photographs. We guide you through the complete document checklist based on your business type.",
  },
  {
    question: "How long does company registration take?",
    answer:
      "Private limited company registration typically takes 10-15 working days from the date of complete document submission. LLP registration may take 7-10 working days.",
  },
  {
    question: "Is MSME registration mandatory?",
    answer:
      "MSME registration is not mandatory but highly recommended as it provides access to government schemes, subsidies, priority sector lending, and various tax benefits.",
  },
  {
    question: "Do you handle PF and ESIC for small businesses?",
    answer:
      "Yes, we provide complete PF and ESIC compliance services including registration, monthly filing, annual returns, and employee record management for businesses of all sizes.",
  },
  {
    question: "What is the cost of ITR filing?",
    answer:
      "ITR filing costs depend on the type of return and complexity. Individual salaried returns start at very affordable rates. Contact us for a personalized quote.",
  },
  {
    question: "Can you help with labour law compliance?",
    answer:
      "Yes, we provide comprehensive labour law compliance support including LWF, BOCW, shops and establishment registration, and statutory compliance advisory.",
  },
]

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main>
        <DivisionHero
          icon={Scale}
          title="Legal & Compliance Services"
          subtitle="Legal Division"
          description="Business registration, tax filing, labour law and statutory compliance support. We ensure your business stays compliant with all government regulations."
          accentColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <DynamicDivisionServices
          source="legal"
          title="Our Legal Services"
          subtitle="What We Offer"
          accentColor="text-emerald-400"
        />
        <ProcessSteps
          title="How We Work"
          subtitle="Our Process"
          steps={processSteps}
          accentColor="text-emerald-400"
        />
        <DivisionFAQ
          title="Frequently Asked Questions"
          subtitle="Legal FAQ"
          faqs={faqs}
          accentColor="text-emerald-400"
        />
        <DivisionContact divisionName="Legal & Compliance" accentColor="text-emerald-400" />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
