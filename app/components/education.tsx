"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type Education = {
  degree: string
  institution: string
  location?: string
  period: string
  description: string
  achievements?: string[]
  tags?: string[]
}

const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Ghana Communication Technology University (GCTU)",
    location: "Accra, Ghana",
    period: "2023 - 2026",
    description:
      "Currently pursuing a comprehensive computer science degree focusing on software engineering, data structures, algorithms, and modern programming paradigms.",
    achievements: [
      "Focus on software engineering and system design",
      "Advanced programming concepts and algorithms",
      "Database management and data structures",
      "Web development and mobile applications",
    ],
    tags: ["Computer Science", "Software Engineering", "Algorithms", "Data Structures"],
  },
  {
    degree: "Diploma in Health Information Management",
    institution: "College of Health and Well Being",
    location: "Ghana",
    period: "2018 - 2021",
    description:
      "Specialized training in health information systems, data management, and healthcare analytics, providing a strong foundation in data handling and system management.",
    achievements: [
      "Health information systems management",
      "Data collection and analysis techniques",
      "Healthcare data standards and protocols",
      "Medical record management systems",
    ],
    tags: ["Health Informatics", "Data Management", "Healthcare Systems", "Analytics"],
  },
  {
    degree: "Software Engineering",
    institution: "Africa Leadership Union",
    location: "Ghana",
    period: "2022 - 2024",
    description:
      "Intensive software engineering program covering modern development practices, project management, and industry-standard tools and technologies.",
    achievements: [
      "Full-stack development methodologies",
      "Agile and Scrum project management",
      "Version control and collaboration tools",
      "Software testing and quality assurance",
    ],
    tags: ["Software Engineering", "Full-Stack Development", "Project Management", "Agile"],
  },
]

export default function Education() {
  const { ref, isVisible } = useScrollAnimation()

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
    <section id="education" className="section-container py-20 bg-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Education
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic Background</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            A strong educational foundation combining computer science, health informatics, and software engineering
            to create a unique skill set for data-driven applications and healthcare technology solutions.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center lg:items-start lg:w-48 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <GraduationCap className="text-primary" size={24} />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
                    {edu.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{edu.degree}</h3>
                      <h4 className="text-lg font-semibold text-foreground mb-3">{edu.institution}</h4>
                      <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                    </div>

                    {edu.achievements && (
                      <div>
                        <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Award size={16} className="text-primary" />
                          Key Achievements
                        </h5>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0"></span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {edu.tags && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {edu.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Connecting line */}
              {index < education.length - 1 && (
                <div className="hidden lg:block absolute left-6 top-16 w-px h-16 bg-border/50"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
