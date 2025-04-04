import About from "@/app/components/about"
import Contact from "@/app/components/contact"
import Experience from "@/app/components/experience"
import Hero from "@/app/components/hero"
import Projects from "@/app/components/projects"
import Skills from "@/app/components/skills"
import Testimonials from "@/app/components/testimonials"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  )
}

