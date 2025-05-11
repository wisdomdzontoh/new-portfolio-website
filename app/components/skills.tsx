"use client"

import type React from "react"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Code2,
  Database,
  Server,
  Globe,
  Cpu,
  BarChart,
  Layers,
  GitBranch,
  Cloud,
  Braces,
  Palette,
  Monitor,
} from "lucide-react"

type Skill = {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
  percentage: number
  icon?: React.ReactNode
}

const skillCategories = [
  {
    category: "Programming Languages",
    icon: <Code2 className="text-primary" size={24} />,
    items: [
      { name: "Python", level: "Advanced", percentage: 90, icon: <Braces size={16} /> },
      { name: "JavaScript", level: "Intermediate", percentage: 80, icon: <Braces size={16} /> },
      { name: "TypeScript", level: "Intermediate", percentage: 75, icon: <Braces size={16} /> },
      { name: "Java", level: "Intermediate", percentage: 65, icon: <Braces size={16} /> },
      { name: "C++", level: "Intermediate", percentage: 70, icon: <Braces size={16} /> },
    ],
  },
  {
    category: "Backend Development",
    icon: <Server className="text-primary" size={24} />,
    items: [
      { name: "Django", level: "Advanced", percentage: 90, icon: <Server size={16} /> },
      { name: "Django REST Framework", level: "Advanced", percentage: 85, icon: <Server size={16} /> },
      { name: "FastAPI", level: "Intermediate", percentage: 75, icon: <Server size={16} /> },
      { name: "Node.js", level: "Intermediate", percentage: 65, icon: <Server size={16} /> },
      { name: "API Design", level: "Advanced", percentage: 85, icon: <Server size={16} /> },
    ],
  },
  {
    category: "Frontend Development",
    icon: <Globe className="text-primary" size={24} />,
    items: [
      { name: "HTML/CSS", level: "Advanced", percentage: 85, icon: <Monitor size={16} /> },
      { name: "React", level: "Intermediate", percentage: 80, icon: <Monitor size={16} /> },
      { name: "Next.js", level: "Intermediate", percentage: 75, icon: <Monitor size={16} /> },
      { name: "Tailwind CSS", level: "Advanced", percentage: 85, icon: <Palette size={16} /> },
      { name: "Bootstrap", level: "Intermediate", percentage: 80, icon: <Palette size={16} /> },
    ],
  },
  {
    category: "Database & DevOps",
    icon: <Database className="text-primary" size={24} />,
    items: [
      { name: "MySQL", level: "Advanced", percentage: 85, icon: <Database size={16} /> },
      { name: "PostgreSQL", level: "Intermediate", percentage: 80, icon: <Database size={16} /> },
      { name: "MongoDB", level: "Intermediate", percentage: 70, icon: <Database size={16} /> },
      { name: "Docker", level: "Intermediate", percentage: 70, icon: <Layers size={16} /> },
      { name: "AWS", level: "Intermediate", percentage: 65, icon: <Cloud size={16} /> },
      { name: "Git", level: "Advanced", percentage: 85, icon: <GitBranch size={16} /> },
    ],
  },
  {
    category: "Data & AI",
    icon: <Cpu className="text-primary" size={24} />,
    items: [
      { name: "Data Analytics", level: "Advanced", percentage: 85, icon: <BarChart size={16} /> },
      { name: "Pandas/NumPy", level: "Intermediate", percentage: 80, icon: <BarChart size={16} /> },
      { name: "Web Scraping", level: "Advanced", percentage: 90, icon: <Globe size={16} /> },
      { name: "Selenium", level: "Advanced", percentage: 85, icon: <Globe size={16} /> },
      { name: "OpenAI API", level: "Intermediate", percentage: 80, icon: <Cpu size={16} /> },
    ],
  },
]

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation()
  const [animateSkills, setAnimateSkills] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimateSkills(true)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

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

  return (
    <section id="skills" className="section-container py-20 bg-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            My Skills
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            A comprehensive toolkit of programming languages, frameworks, and technologies that enable me to build
            robust, scalable, and efficient software solutions.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              variants={itemVariants}
              className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="space-y-6">
                {category.items.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">{skill.icon}</span>
                        <h4 className="font-medium">{skill.name}</h4>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{skill.level}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animateSkills ? `${skill.percentage}%` : "0%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
