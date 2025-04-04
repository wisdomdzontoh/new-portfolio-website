"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { Code, Database, HeartPulse, Award, GraduationCap } from "lucide-react"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bridging Healthcare & Technology</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            A passionate software engineer and health informatician dedicated to creating innovative solutions that
            improve healthcare delivery and patient outcomes.
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
                src="/assets/coder.jpg"
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
                  <h3 className="font-semibold">Professional Excellence</h3>
                  <p className="text-sm text-muted-foreground">Dedicated to quality and innovation</p>
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
                  <p className="text-sm text-muted-foreground">Always expanding my knowledge</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Who I Am</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                I am a <span className="text-foreground font-medium">software engineer and health informatician</span>{" "}
                with a passion for developing solutions that address real-world healthcare challenges. My unique blend
                of technical expertise and healthcare domain knowledge allows me to create systems that are both
                technically robust and clinically relevant.
              </p>
              <p className="leading-relaxed">
                With experience at the{" "}
                <span className="text-foreground font-medium">Greater Accra Regional Health Directorate</span> and
                collaborations with organizations like the{" "}
                <span className="text-foreground font-medium">World Health Organization</span>, I've developed a deep
                understanding of healthcare systems and the critical role technology plays in improving them.
              </p>
              <p className="leading-relaxed">
                I'm currently focused on building innovative applications that leverage{" "}
                <span className="text-foreground font-medium">machine learning</span> and
                <span className="text-foreground font-medium"> data analytics</span> to provide personalized healthcare
                solutions and improve patient outcomes.
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
                Software Engineer
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Experienced in building robust web applications and APIs using Django, React, and other modern
              technologies. Focused on creating scalable, maintainable, and user-friendly solutions.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                <HeartPulse className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Health Informatician
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Specialized in health information systems, data analytics, and improving healthcare delivery through
              technology. Experienced with DHIMS2 and other healthcare data management platforms.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Database className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                Data Specialist
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Skilled in data collection, analysis, and visualization using tools like SPSS, STATA, and EPI INFO.
              Experienced in developing custom data collection tools with Kobo Collect, ODK, and Google Forms.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

