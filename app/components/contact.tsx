"use client"

import type React from "react"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, MapPin, Phone, Send, CheckCircle, Calendar } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xjkwewqn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormState({ name: "", email: "", subject: "", message: "" })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        alert("There was a problem submitting your form. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("An unexpected error occurred. Please try again.")
    }

    setIsSubmitting(false)
  }

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
    <section id="contact" className="section-container py-20 bg-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        {/* Intro text */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Contact Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something Great</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            Looking for a skilled developer to bring your project to life? I'm available for freelance work, full-time
            positions, and interesting collaborations.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50 shadow-lg overflow-hidden h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-primary">Contact Information</CardTitle>
                <CardDescription>Let's discuss how I can help with your next project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href="mailto:wisdomdzontoh@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      wisdomdzontoh@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+233558749735" className="text-muted-foreground hover:text-primary transition-colors">
                      +233 558 749 735
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Accra, Ghana</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <Calendar className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Availability</h3>
                    <p className="text-muted-foreground">Open to freelance and full-time opportunities</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium mb-4">Connect with me</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/wisdomdzontoh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/wisdom-dzontoh-563430195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="mailto:wisdomdzontoh@gmail.com"
                      className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                      aria-label="Email"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>

                {/* Tech pitch */}
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                  <h3 className="font-medium text-primary mb-2">Looking for a Technical Partner?</h3>
                  <p className="text-muted-foreground text-sm">
                    I specialize in building robust backend systems, API integrations, and data-driven applications.
                    Let's discuss how I can help bring your project to life with clean, maintainable code and scalable
                    architecture.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50 shadow-lg overflow-hidden h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-primary">Send a Message</CardTitle>
                <CardDescription>I'll get back to you within 24 hours</CardDescription>
              </CardHeader>

              <CardContent>
                {isSubmitted ? (
                  <div className="bg-primary/10 text-primary p-6 rounded-lg flex flex-col items-center text-center">
                    <CheckCircle className="mb-2" size={48} />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p>Thank you for reaching out. I'll respond to your message shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="border-border/50 focus:border-primary/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                          className="border-border/50 focus:border-primary/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        required
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity"
                        rows={5}
                        required
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full rounded-full group relative overflow-hidden"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send size={16} className={isSubmitting ? "animate-pulse" : ""} />
                      </span>
                      <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
