import type { Metadata } from "next"
import { Briefcase, UserPlus, FileText, Mic, Search, Building2, Award } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import DivisionHero from "@/components/division/division-hero"
import DivisionServices from "@/components/division/division-services"
import ProcessSteps from "@/components/division/process-steps"
import DivisionFAQ from "@/components/division/division-faq"
import DivisionContact from "@/components/division/division-contact"
import JobOpenings from "@/components/public/JobOpenings"

export const metadata: Metadata = {
  title: "Job Placement & Recruitment Support - Pratishesh Associate & Consultancy",
  description:
    "Resume building, interview preparation, recruitment and placement support for candidates and employers. Connecting talent with the right opportunities.",
}

const services = [
  {
    icon: UserPlus,
    title: "Candidate Registration",
    description: "Students and job seekers can register for placement assistance and get matched with opportunities.",
  },
  {
    icon: FileText,
    title: "Resume Building",
    description: "Professional resume creation, profile improvement and LinkedIn optimization support.",
  },
  {
    icon: Mic,
    title: "Interview Preparation",
    description: "Mock interviews, HR questions practice and confidence-building sessions with industry experts.",
  },
  {
    icon: Search,
    title: "Current Openings",
    description: "Job opportunities from partner companies, local businesses and growing startups.",
  },
  {
    icon: Building2,
    title: "Employer Hiring Support",
    description: "Recruitment support for companies looking for suitable, pre-screened candidates.",
  },
  {
    icon: Award,
    title: "Internship Support",
    description: "Internship assistance for students and freshers to gain industry experience.",
  },
]

const processSteps = [
  {
    step: "1",
    title: "Register & Profile",
    description: "Create your profile, upload your resume and specify your career preferences.",
  },
  {
    step: "2",
    title: "Skill Assessment",
    description: "We evaluate your skills, identify gaps and suggest training if needed.",
  },
  {
    step: "3",
    title: "Interview Prep",
    description: "Mock interviews, resume polishing and soft skills training to make you job-ready.",
  },
  {
    step: "4",
    title: "Placement & Follow-up",
    description: "Get matched with suitable opportunities, attend interviews and receive post-placement support.",
  },
]

const faqs = [
  {
    question: "Is there a fee for job placement?",
    answer:
      "Registration for job seekers is free. We charge a nominal service fee only after successful placement. Employers may have separate fee structures based on hiring requirements.",
  },
  {
    question: "What types of jobs do you offer placement for?",
    answer:
      "We provide placement support across IT, accounting, HR, administration, sales, marketing, and other sectors. Both fresher and experienced positions are available.",
  },
  {
    question: "How long does the placement process take?",
    answer:
      "The timeline varies based on your profile, skills and market demand. Most candidates receive interview calls within 2-4 weeks of completing their profile and preparation.",
  },
  {
    question: "Do you help with resume writing?",
    answer:
      "Yes, we provide professional resume building services including content writing, formatting, keyword optimization and LinkedIn profile enhancement.",
  },
  {
    question: "Can employers partner with you for hiring?",
    answer:
      "Absolutely. We work with companies of all sizes to provide pre-screened, qualified candidates. Contact us to discuss your hiring needs and partnership options.",
  },
  {
    question: "Do you provide internship opportunities?",
    answer:
      "Yes, we help students and freshers find internship opportunities with our partner companies. Internships are available in various fields including IT, HR, accounting and more.",
  },
]

export default function JobPage() {
  return (
    <>
      <Navbar />
      <main>
        <DivisionHero
          icon={Briefcase}
          title="Job Placement & Recruitment Support"
          subtitle="Placement Division"
          description="Helping candidates and companies connect with the right opportunities. From resume building to final placement, we support you at every step."
          accentColor="text-violet-400"
          iconBg="bg-violet-500/10"
        />
        <DivisionServices
          title="Placement Services"
          subtitle="What We Offer"
          services={services}
          accentColor="text-violet-400"
        />
        <JobOpenings accentColor="text-violet-400" />
        <ProcessSteps
          title="Your Placement Journey"
          subtitle="How It Works"
          steps={processSteps}
          accentColor="text-violet-400"
        />
        <DivisionFAQ
          title="Frequently Asked Questions"
          subtitle="Placement FAQ"
          faqs={faqs}
          accentColor="text-violet-400"
        />
        <DivisionContact divisionName="Placement" accentColor="text-violet-400" />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
