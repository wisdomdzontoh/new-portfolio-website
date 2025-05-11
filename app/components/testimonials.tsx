"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

type Testimonial = {
  name: string
  title: string
  quote: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Andreas Kahabka",
    title: "CTO CBAM-Estimator",
    quote:
      "I've managed several developers, and Wisdom stands out for his technical excellence and professional approach. He communicates clearly, meets deadlines consistently, and always considers the business impact of his technical decisions.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jocelyn Laryea",
    title: "Regional Health Information Officer",
    quote:
      "Wisdom is an exceptional developer with a rare combination of technical expertise and domain knowledge. His ability to understand complex requirements and translate them into elegant solutions has been invaluable to our team.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Nana Yaw Osei Poku",
    title: "Medical Doctor",
    quote:
      "Working with Wisdom has been transformative for our projects. His technical skills are impressive, but what sets him apart is his ability to understand healthcare workflows and build systems that genuinely improve efficiency and patient care.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Bright Obeng",
    title: "Data Protection Engineer",
    quote:
      "Wisdom's code quality and architecture decisions are exemplary. He consistently delivers robust, maintainable solutions and has a talent for simplifying complex problems. His work on our data pipeline automation saved countless hours of manual work.",
    image: "/placeholder.svg?height=100&width=100",
  },
  
]

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()
  const [activeIndex, setActiveIndex] = useState(0)

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

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="section-container py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Colleagues Say</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            Feedback from professionals who have worked with me on various projects and can attest to my technical
            expertise and collaborative approach.
          </p>
        </div>

        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary"
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <div className="overflow-hidden px-10">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card border-border/50 shadow-lg overflow-hidden">
                  <CardContent className="p-6 relative">
                    <Quote className="absolute top-6 right-6 text-primary/20" size={48} />

                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonials[activeIndex].image || "/placeholder.svg?height=100&width=100"}
                          alt={testimonials[activeIndex].name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{testimonials[activeIndex].name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonials[activeIndex].title}</p>
                      </div>
                    </div>

                    <p className="text-lg italic relative z-10">"{testimonials[activeIndex].quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary"
              aria-label="Next testimonial"
            >
              →
            </button>

            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeIndex === index ? "bg-primary w-4" : "bg-muted-foreground/30",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Testimonials Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-card border-border/50 shadow-lg overflow-hidden h-full hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 relative h-full flex flex-col">
                  <Quote className="absolute top-6 right-6 text-primary/20" size={48} />

                  <p className="text-lg mb-6 relative z-10 flex-grow">"{testimonial.quote}"</p>

                  <div className="border-t border-border pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
