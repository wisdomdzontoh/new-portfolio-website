"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Calendar, MapPin, Building } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type Experience = {
  role: string
  company: string
  location?: string
  period: string
  description: string
  tasks: string[]
  tags?: string[]
}

const experiences: Experience[] = [
  {
    role: "Software Engineer — Contract / Freelance",
    company: "Backend & Full-Stack Engineering",
    location: "Remote",
    period: "2024 - Present",
    description:
      "Designing and shipping backend systems, APIs, and AI-integrated products for clients spanning health regulation, emergency-response infrastructure, and SaaS — see the Projects section for specific systems built.",
    tags: ["Backend Development", "API Design", "AI Integration"],
    tasks: [
      "Designed and deployed scalable backend solutions using Python, Django, and FastAPI across multiple production systems.",
      "Built and maintained RESTful APIs integrating third-party and AI services (OpenAI, government health data systems, CRM/automation tools).",
      "Designed PostgreSQL and MongoDB data models to support reporting, analytics, and high-integrity record keeping.",
      "Delivered dashboards, reporting tools, and data import/export modules used by 600+ end users across client systems.",
      "Automated manual business workflows — data entry, lead processing, reporting — cutting manual effort by up to 60%.",
      "Integrated LLM APIs (OpenAI) to enhance data analysis, scoring, and in-product automation.",
    ],
  },
  {
    role: "Health Information Officer",
    company: "Public Health Sector",
    location: "Greater Accra Region, Ghana",
    period: "2021 - 2024",
    description:
      "Managed regional health data systems and led the shift from paper-based to digital data collection across a large, multi-district health directorate.",
    tags: ["Data Management", "Public Health", "Analytics"],
    tasks: [
      "Managed large-scale regional health data systems (DHIMS2), ensuring data integrity and accessibility for decision-makers.",
      "Rolled out digital data collection tools (ODK, Kobo Collect, Google Forms) to replace manual, paper-based field processes.",
      "Conducted regular data audits and KPI analytics across facilities to inform strategic public health decisions.",
      "Trained 500+ staff in data analysis and visualization techniques, improving data literacy across the directorate.",
      "Monitored and evaluated key performance indicators at the district and facility level.",
    ],
  },
]

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="experience" className="section-container py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            My Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            A track record of impactful work in backend engineering, data systems, and public health informatics that
            has shaped how I build software today.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="visible"
          animate="visible"
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:translate-x-px"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="visible"
              animate="visible"
              className={cn(
                "relative mb-12 md:mb-24 flex flex-col md:flex-row",
                index % 2 === 0 ? "md:flex-row-reverse" : "",
              )}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-primary transform -translate-x-1/2 md:-translate-x-2.5 z-10"></div>

              {/* Content */}
              <div className={cn("w-full md:w-1/2 pl-8 md:pl-0 md:pr-12", index % 2 === 0 ? "md:pl-12 md:pr-0" : "")}>
                <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={16} className="mr-1" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-muted-foreground mb-2">
                    <Building size={16} className="mr-2 flex-shrink-0" />
                    <span className="font-medium">{exp.company}</span>
                  </div>

                  {exp.location && (
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span>{exp.location}</span>
                    </div>
                  )}

                  <p className="mb-4 text-muted-foreground">{exp.description}</p>

                  {exp.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <h4 className="font-medium mb-3 text-foreground">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {exp.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">▹</span>
                        <span className="text-muted-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
