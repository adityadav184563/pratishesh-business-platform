import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Divisions from "@/components/divisions"
import WhyUs from "@/components/why-us"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Divisions />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
