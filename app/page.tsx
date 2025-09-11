import Hero from "@/app/components/hero"
import About from "@/app/components/about"
import Skills from "@/app/components/skills"
import Experience from "@/app/components/experience"
import ProjectsEnhanced from "@/app/components/projects-enhanced"
import GitHubRepos from "@/app/components/github-repos"
import Education from "@/app/components/education"
import Certifications from "@/app/components/certifications"
import Testimonials from "@/app/components/testimonials"
import Contact from "@/app/components/contact"
import ScrollToTop from "@/app/components/scroll-to-top"
import ScrollProgress from "@/app/components/scroll-progress"
import PortfolioIntro from "@/app/components/portfolio-intro"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <PortfolioIntro />
      <About />
      <Skills />
      <Experience />
      <ProjectsEnhanced />
      <GitHubRepos />
      <Education />
      <Certifications />
      <Testimonials />
      <Contact />
      <ScrollToTop />
    </>
  )
}
