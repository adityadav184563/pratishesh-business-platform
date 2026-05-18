import type { Metadata } from "next"
import { GraduationCap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import DivisionHero from "@/components/division/division-hero"
import DynamicTrainingServices from "@/components/public/DynamicTrainingServices"
import TrainingPrograms from "@/components/public/TrainingPrograms"
import ProcessSteps from "@/components/division/process-steps"
import DivisionFAQ from "@/components/division/division-faq"
import DivisionContact from "@/components/division/division-contact"

export const metadata: Metadata = {
  title: "Industrial Training & Skill Development - Pratishesh Associate & Consultancy",
  description:
    "Job-ready courses in Flask, Python, Java, Tally, HR, O Level and practical learning programs. From beginner to professional.",
}

const processSteps = [
  {
    step: "1",
    title: "Course Selection",
    description: "Choose from our range of practical, job-oriented courses based on your career goals.",
  },
  {
    step: "2",
    title: "Hands-on Learning",
    description: "Learn through practical projects, real-world examples and industry-relevant assignments.",
  },
  {
    step: "3",
    title: "Assessment & Certification",
    description: "Complete assessments, build your portfolio and receive a recognized certification.",
  },
  {
    step: "4",
    title: "Placement Support",
    description: "Resume building, interview preparation and placement assistance with our partner companies.",
  },
]

const faqs = [
  {
    question: "What are the course durations?",
    answer:
      "Course durations vary: Flask Development (3-4 months), Python/Java (2-3 months), Tally (1-2 months), HR & Office Management (2-3 months), O Level (varies by NIELIT schedule). Contact us for detailed schedules.",
  },
  {
    question: "Do you provide certificates after training?",
    answer:
      "Yes, we provide certificates upon successful completion of each course. For O Level, you receive the NIELIT government certificate after clearing the exam.",
  },
  {
    question: "Is prior experience required?",
    answer:
      "No prior experience is needed for most courses. We start from basics and build up to advanced concepts. Basic computer knowledge is helpful but not mandatory.",
  },
  {
    question: "Do you offer placement assistance?",
    answer:
      "Yes, our Job Placement division provides resume building, interview preparation, and connects trained candidates with job opportunities from our partner companies.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "We offer competitive and affordable fees with flexible payment options. Contact us for detailed course-wise fee structures and any ongoing offers.",
  },
  {
    question: "Are the classes online or offline?",
    answer:
      "We primarily offer offline classroom training at our Lucknow center for hands-on learning. Online support and doubt clearing sessions are also available.",
  },
]

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <main>
        <DivisionHero
          icon={GraduationCap}
          title="Industrial Training & Skill Development"
          subtitle="Training Division"
          description="From beginner to job-ready professional with practical, industry-relevant training programs. Build skills that employers actually look for."
          accentColor="text-primary"
          iconBg="bg-primary/10"
        />
        <DynamicTrainingServices
          title="Training Programs"
          subtitle="Our Courses"
          accentColor="text-primary"
        />
        <TrainingPrograms accentColor="text-primary" />
        <ProcessSteps
          title="Your Learning Journey"
          subtitle="How It Works"
          steps={processSteps}
          accentColor="text-primary"
        />
        <DivisionFAQ
          title="Frequently Asked Questions"
          subtitle="Training FAQ"
          faqs={faqs}
          accentColor="text-primary"
        />
        <DivisionContact divisionName="Training" accentColor="text-primary" />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
