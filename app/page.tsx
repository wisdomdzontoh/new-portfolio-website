import Hero from "@/app/components/hero"
import About from "@/app/components/about"
import Skills from "@/app/components/skills"
import Experience from "@/app/components/experience"
import Projects from "@/app/components/projects"
import Testimonials from "@/app/components/testimonials"
import Contact from "@/app/components/contact"
import ScrollToTop from "@/app/components/scroll-to-top"
import ScrollProgress from "@/app/components/scroll-progress"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
      <ScrollToTop />
    </>
  )
}
