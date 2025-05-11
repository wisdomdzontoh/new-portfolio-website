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
    role: "Software Engineer (Freelance)",
    company: "CBAMESTIMATOR GmbH",
    location: "Germany (Remote)",
    period: "2024 - 2025",
    description:
      "Designed and implemented scalable backend solutions and data pipelines for a German tech company, focusing on process automation and data-driven applications.",
    tags: ["Backend Development", "API Integration", "Automation"],
    tasks: [
      "Designed and deployed scalable backend solutions using Python, Django, and FastAPI.",
      "Developed and maintained RESTful APIs for seamless integration with third-party services.",
      "Created efficient data pipelines using PostgreSQL and MongoDB to improve business operations.",
      "Automated lead generation, invoice management, and email campaigns, resulting in significant operational cost savings.",
      "Integrated with ChatGPT API to enhance data analysis capabilities and improve lead scoring accuracy.",
    ],
  },
  {
    role: "Health Information Officer",
    company: "Greater Accra Regional Health Directorate, Ghana Health Service",
    location: "Accra, Ghana",
    period: "2021 - 2024",
    description:
      "Managed large-scale health data systems and developed digital tools for data collection and analysis, facilitating data-driven decision-making in public health.",
    tags: ["Data Management", "Healthcare", "Analytics"],
    tasks: [
      "Managed large-scale health data systems using DHIMS2, ensuring data integrity and accessibility.",
      "Developed digital tools for data collection using ODK, Kobo Collect, and Google Forms.",
      "Conducted detailed data analysis using Excel, SPSS, and STATA to support evidence-based decision making.",
      "Provided training on data analytics and visualization techniques to healthcare professionals.",
      "Monitored and evaluated Key Performance Indicators (KPIs) at district and facility levels.",
    ],
  },
  {
    role: "Full-Stack Developer (Personal Projects)",
    company: "Various Projects",
    period: "2022 - Present",
    description:
      "Developed several full-stack applications focusing on AI integration, data visualization, and process automation.",
    tags: ["Full-Stack", "AI Integration", "Data Visualization"],
    tasks: [
      "AI Chatbot SAAS: Developed a web application allowing users to create, train, and deploy custom chatbots with OpenAI integration.",
      "Data Visualizer: Built a dashboard application enabling users to create visualizations from uploaded CSV/Excel files or database connections.",
      "Expense Tracker: Created a responsive web application for tracking expenses with interactive charts and trend analysis.",
      "Invoice Generator: Developed an automated system for invoice generation and management using the sevDesk API.",
      "Campaign Automation: Built an end-to-end solution for lead campaign processes with CRM integration.",
    ],
  },
  {
    role: "Web Scraping Specialist",
    company: "Freelance Projects",
    period: "2023 - 2024",
    description:
      "Developed automated web scraping solutions for lead generation and data collection using Python and Selenium.",
    tags: ["Web Scraping", "Automation", "Python"],
    tasks: [
      "Designed and implemented web scraping tools using Selenium and BeautifulSoup for automated data extraction.",
      "Developed a BK_Tree algorithm for scoring leads based on defined metrics.",
      "Integrated ChatGPT API to enhance lead scoring accuracy and data classification.",
      "Created data processing pipelines to clean and structure scraped data for business use.",
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
            A track record of impactful roles in software development, data engineering, and healthcare informatics that
            have shaped my technical expertise.
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
