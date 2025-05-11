"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Typed from "typed.js"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const typedRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)

    const typed = new Typed(typedRef.current, {
      strings: ["Full-Stack Developer", "Backend Specialist", "API Engineer", "Data Automation Expert"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

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
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] opacity-30" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full filter blur-[100px] opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-[80px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex-1" variants={itemVariants}>
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Available for new opportunities
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-foreground">Hi, I'm </span>
                <span className="text-primary relative">
                  Wisdom Dzontoh
                  <span className="absolute bottom-2 left-0 h-3 w-full bg-primary/20 -z-10 transform -rotate-1"></span>
                </span>
              </h1>

              <h2 className="text-xl md:text-2xl font-medium flex items-center gap-2">
                <span>I'm a</span>
                <span ref={typedRef} className="text-primary font-semibold"></span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                I build robust, scalable web applications with a focus on backend development, API integrations, and
                data automation. Specialized in <span className="text-primary font-medium">Python</span>,
                <span className="text-primary font-medium"> Django</span>, and
                <span className="text-primary font-medium"> RESTful APIs</span> to create efficient, maintainable
                solutions that solve real business problems.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full group relative overflow-hidden">
                  <a href="#projects" className="flex items-center gap-2">
                    <span className="relative z-10">View My Work</span>
                    <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <a href="/assets/Wisdom_Dzontoh_CV.pdf" download className="flex items-center gap-2">
                    <span>Download CV</span>
                    <Download size={18} />
                  </a>
                </Button>
              </div>

              <div className="flex gap-6 pt-4">
                <a
                  href="https://github.com/wisdomdzontoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all transform hover:scale-110 duration-300"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/wisdom-dzontoh-563430195"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all transform hover:scale-110 duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:wisdomdzontoh@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-all transform hover:scale-110 duration-300"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div className="flex-1 flex justify-center" variants={itemVariants}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-30 blur-xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/10 shadow-2xl">
                <Image src="/assets/currentpic.jpg" alt="Wisdom Dzontoh" fill className="object-cover" priority />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-card rounded-lg shadow-lg flex items-center justify-center p-2 border border-border/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3+</div>
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-auto h-auto bg-card rounded-lg shadow-lg flex items-center justify-center p-3 border border-border/50">
                <a
                  href="https://github.com/wisdomdzontoh/AI-chatbot-SAAS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm"
                >
                  <span>Latest Project</span>
                  <ExternalLink size={14} className="text-primary" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a
            href="#about"
            aria-label="Scroll down"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="animate-bounce" size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
