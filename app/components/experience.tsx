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
    role: "Health Information Officer",
    company: "Greater Accra Regional Health Directorate, Ghana Health Service",
    location: "Accra, Ghana",
    period: "2020 - Present",
    description:
      "Utilized DHIMS2 for comprehensive health data management, ensuring accuracy and efficiency in data analysis and interpretation.",
    tags: ["Healthcare", "Data Management", "Analysis"],
    tasks: [
      "Trained healthcare professionals on effective data collection and analysis techniques.",
      "Developed customized data collection tools using Kobo Collect, ODK, and Google Forms.",
      "Conducted data analysis with statistical tools like Excel, SPSS, STATA, and EPI INFO.",
      "Ensured effective health data management through regular supervisory visits.",
      "Monitored and evaluated Key Performance Indicators (KPIs) at the district and facility level.",
    ],
  },
  {
    role: "Field Research Officer",
    company: "University of Ghana Business School - Department of Finance",
    location: "Accra, Ghana",
    period: "06/2024",
    description:
      "Engaged in pivotal research projects focusing on health system governance and the impacts of antimicrobial resistance.",
    tags: ["Research", "Healthcare", "Data Collection"],
    tasks: [
      "Collaborated with pharmacies and over-the-counter (OTC) providers to gather insights on antimicrobial resistance.",
      "Utilized REDCAP offline survey app for accurate data collection in diverse environments.",
    ],
  },
  {
    role: "HHFA Data Collector",
    company: "World Health Organization (in collaboration with GHS & MOH)",
    location: "Ghana",
    period: "2022 - 2023",
    description:
      "Led data collection initiatives for the Harmonized Health Facility Assessment (HHFA) in Ghana, contributing to national health system evaluations.",
    tags: ["WHO", "Healthcare Assessment", "Data Collection"],
    tasks: [
      "Assessed health system service availability and readiness across various facilities.",
      "Worked closely with WHO to ensure the successful execution of health assessments.",
      "Provided in-depth data analysis and interpretation to support evidence-based decision-making.",
    ],
  },
  {
    role: "Clinical Data Abstractor",
    company: "AYA Collective (GHS)",
    location: "Accra, Ghana",
    period: "08/2022 - 09/2022",
    description:
      "Participated in the baseline evaluation of the Making Every Baby Count Initiative (MEBCI 2.0), focusing on maternal and child health data.",
    tags: ["Clinical Data", "Maternal Health", "Child Health"],
    tasks: ["Entered critical data from delivery, antenatal, and NICU registers at Ridge Hospital using Survey CTO."],
  },
  {
    role: "Software Development Projects",
    company: "Various Projects",
    period: "Ongoing",
    description: "Developed innovative software solutions addressing various needs in health and e-commerce sectors.",
    tags: ["Software Development", "Healthcare", "E-commerce"],
    tasks: [
      "Electronic Medical Records System: Addressed data management gaps in health facilities.",
      "E-commerce Web App: Developed CRUD operations for both user and admin roles.",
      "E-voting System: Enabled user voting and results monitoring with a dedicated admin panel.",
      "Blockchain Voting Platform: Created a secure voting environment with real-time monitoring capabilities.",
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
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
            A track record of impactful roles in healthcare, research, and software development that have shaped my
            multidisciplinary expertise.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:translate-x-px"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
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

