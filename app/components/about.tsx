"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { Code, Server, Award, GraduationCap, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function About() {
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
    <section id="about" className="section-container py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            About Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Software Engineer, Backend &amp; Data Systems</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            Results-driven Software Engineer with 4+ years of experience designing, building, and optimizing scalable
            web and AI-powered applications. I've shipped production systems for national health regulators,
            emergency-response infrastructure, and AI SaaS products — with a focus on clean architecture, reliable
            APIs, and data pipelines that hold up under real-world use.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <Image
                src="/assets/profile-pic.jpeg"
                alt="Wisdom Dzontoh"
                width={600}
                height={700}
                className="object-cover w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-lg border border-border/50 max-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Technical Excellence</h3>
                  <p className="text-sm text-muted-foreground">Clean code, robust architecture</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border/50 max-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Continuous Learner</h3>
                  <p className="text-sm text-muted-foreground">Always mastering new technologies</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">My Tech Stack</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <span className="text-foreground font-medium">Languages:</span> Python, TypeScript/JavaScript, Java, C++, Go, PHP
              </p>
              <p className="leading-relaxed">
                <span className="text-foreground font-medium">Backend:</span> Django, Django REST Framework, FastAPI, RESTful API design
              </p>
              <p className="leading-relaxed">
                <span className="text-foreground font-medium">Frontend:</span> Next.js, React, Tailwind CSS, shadcn/ui
              </p>
              <p className="leading-relaxed">
                <span className="text-foreground font-medium">Data & Infrastructure:</span> PostgreSQL, MySQL, MongoDB, Docker, AWS (EC2, S3), GitHub Actions CI/CD
              </p>
              <p className="leading-relaxed">
                <span className="text-foreground font-medium">AI & Automation:</span> OpenAI API, LangChain, Pandas/NumPy, workflow automation with n8n
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild variant="outline" className="rounded-full">
                <a href="#experience">My Experience</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="#skills">My Skills</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Code className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Backend Developer
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Specialized in building robust backend systems with Django, FastAPI, and RESTful APIs. Experienced in
              database design, third-party API integrations, and asynchronous data pipelines (Celery, Redis) for
              systems that need to hold accurate, high-stakes data.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Server className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Full-Stack Engineer
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Experienced in developing end-to-end web applications using Django or FastAPI backends paired with
              Next.js and React frontends. Comfortable owning a product from database schema to deployed UI.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Cpu className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Data & AI Specialist
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Proficient in data analytics, workflow automation, and AI integrations. Experienced in working with the
              OpenAI API and LangChain to build applications that turn raw data into actionable insight and automate
              manual processes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
