"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Calendar, Award, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Certification = {
  name: string
  issuer: string
  date: string
  description: string
  skills: string[]
  verified?: boolean
}

const certifications: Certification[] = [
  {
    name: "HHFA Data Collector",
    issuer: "Health Information Management",
    date: "2021",
    description: "Certified in health facility assessment data collection methodologies and healthcare data standards.",
    skills: ["Data Collection", "Healthcare Standards", "Assessment Methodologies", "Quality Assurance"],
    verified: true,
  },
  {
    name: "DHIS Customization",
    issuer: "District Health Information System",
    date: "2020",
    description: "Specialized training in DHIS2 customization, configuration, and advanced data management techniques.",
    skills: ["DHIS2", "Data Management", "System Configuration", "Healthcare Analytics"],
    verified: true,
  },
  {
    name: "Basics of Python Programming",
    issuer: "Programming Fundamentals",
    date: "2022",
    description: "Comprehensive foundation in Python programming covering syntax, data structures, and basic algorithms.",
    skills: ["Python", "Programming Fundamentals", "Data Structures", "Algorithms"],
    verified: true,
  },
]

export default function Certifications() {
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
    <section id="certifications" className="section-container py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Certifications
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Certifications</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            Continuous learning and professional development through industry-recognized certifications
            in healthcare informatics, data management, and programming fundamentals.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="text-primary" size={20} />
                        {cert.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg text-primary mb-1">{cert.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{cert.date}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>

                  <div>
                    <h5 className="font-semibold text-foreground mb-2 text-sm">Skills Covered</h5>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="text-xs bg-primary/5 text-primary border-primary/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <div className="bg-muted/50 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">Continuous Learning</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I believe in continuous learning and staying updated with the latest technologies and industry best practices. 
              These certifications represent my commitment to professional development and expertise in key areas of 
              healthcare informatics, data management, and software development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
