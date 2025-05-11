"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"

type Project = {
  title: string
  description: string
  link: string
  technologies: string[]
  image: string
  github?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "AI Chatbot SAAS Application",
    description:
      "A web application that allows users to create, train, and deploy custom chatbots with data-specific training and website integration for customer support.",
    link: "https://ai-chatbot-saas.vercel.app",
    github: "https://github.com/wisdomdzontoh/AI-chatbot-SAAS",
    technologies: ["Django REST Framework", "Next.js", "OpenAI API", "Tailwind CSS"],
    image: "/assets/ai-chatbot.png",
    featured: true,
  },
  {
    title: "Data Visualizer Dashboard",
    description:
      "A dashboard application that enables users to create visualizations from uploaded CSV/Excel files or database connections with sharing and collaboration features.",
    link: "#",
    github: "https://github.com/wisdomdzontoh/data-visualizer",
    technologies: ["Django REST Framework", "Next.js", "Chart.js", "shadcn/ui"],
    image: "/assets/data-visualizer.png",
    featured: true,
  },
  {
    title: "Invoice Generator System",
    description:
      "An automated invoice generation system that integrates with the sevDesk API to streamline invoice creation, processing, and organization.",
    link: "#",
    github: "https://github.com/wisdomdzontoh/invoice-generator",
    technologies: ["Python", "sevDesk API", "Pandas", "FastAPI"],
    image: "/assets/invoice-generator.png",
    featured: true,
  },
  {
    title: "Campaign Automation Tool",
    description:
      "An end-to-end solution that automates lead campaign processes by cleaning data, integrating with ChatGPT for analysis, and connecting with CRM systems.",
    link: "#",
    github: "https://github.com/wisdomdzontoh/campaign-automation",
    technologies: ["Python", "ChatGPT API", "Turso", "Pipedrive API"],
    image: "/assets/campaign-automation.png",
  },
  {
    title: "Web Scraping & Lead Generation",
    description:
      "A sophisticated web scraping tool that extracts data from websites, scores leads using a BK_Tree algorithm, and enhances accuracy with AI integration.",
    link: "#",
    github: "https://github.com/wisdomdzontoh/web-scraping-lead-gen",
    technologies: ["Python", "Selenium", "ChatGPT API", "Pandas"],
    image: "/assets/web-scraping.png",
  },
  {
    title: "Expense Tracker Application",
    description:
      "A responsive web application for tracking personal and business expenses with interactive visualizations and trend analysis.",
    link: "#",
    github: "https://github.com/wisdomdzontoh/expense-tracker",
    technologies: ["Django REST Framework", "Next.js", "Chart.js", "Tailwind CSS"],
    image: "/assets/expense-tracker.png",
  },
]

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const filteredProjects = filter ? projects.filter((project) => project.technologies.includes(filter)) : projects

  const featuredProjects = projects.filter((project) => project.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const uniqueTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies))).sort()

  return (
    <section id="projects" className="section-container py-20 bg-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            My Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            A showcase of my technical expertise in backend development, API integrations, and data automation through
            real-world applications and innovative solutions.
          </p>
        </div>

        {/* Featured Projects */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-16"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "flex flex-col lg:flex-row gap-8 items-center mb-16 last:mb-0",
                index % 2 !== 0 ? "lg:flex-row-reverse" : "",
              )}
            >
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-sm group-hover:blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-lg">
                  <Image
                    src={project.image || "/placeholder.svg?height=600&width=800"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="text-primary" size={16} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 my-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 pt-2">
                  {project.github && (
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </a>
                    </Button>
                  )}

                  <Button asChild variant="default" size="sm" className="rounded-full">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={16} />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter */}
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl font-semibold mb-4">Filter by Technology</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge
              variant={filter === null ? "default" : "secondary"}
              className={cn(
                "cursor-pointer",
                filter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20",
              )}
              onClick={() => setFilter(null)}
            >
              All
            </Badge>
            {uniqueTechnologies.map((tech, index) => (
              <Badge
                key={index}
                variant={filter === tech ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer",
                  filter === tech
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20",
                )}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={cn(
                  "overflow-hidden transition-all duration-300 border-border/50 bg-card h-full flex flex-col",
                  hoveredIndex === index
                    ? "transform scale-[1.02] shadow-xl border-primary/20"
                    : "transform scale-100 shadow-md",
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500",
                      hoveredIndex === index ? "scale-110" : "scale-100",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                      <Star size={12} className="mr-1" />
                      Featured
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="pb-2 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-2">
                  {project.github && (
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    </Button>
                  )}

                  <Button asChild variant="default" size="sm" className={project.github ? "ml-auto" : ""}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span>View Project</span>
                      <ArrowRight size={16} />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
