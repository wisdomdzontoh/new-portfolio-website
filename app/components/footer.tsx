"use client"

import { Button } from "@/components/ui/button"
import { Github, Heart, Linkedin, Mail, Phone, ArrowUp, Twitter } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  const checkScrollPosition = () => {
    if (window.scrollY > 500) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition)
    return () => window.removeEventListener("scroll", checkScrollPosition)
  }, [])

  return (
    <footer className="bg-card border-t border-border relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 inline-block">
              <span className="text-primary">W</span>isdom Dzontoh
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Full-Stack Developer with 3+ years of experience specializing in backend development, API integrations,
              and data analytics. Building robust, scalable solutions that bridge technology and healthcare.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/wisdomdzontoh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/wisdom-dzontoh-563430195"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com/wisdomdzontoh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:wisdomdzontoh@gmail.com"
                aria-label="Email"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+233558749735"
                aria-label="Phone"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="mr-2 text-primary/70" size={16} />
                <a href="mailto:wisdomdzontoh@gmail.com" className="hover:text-primary transition-colors">
                  wisdomdzontoh@gmail.com
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="mr-2 text-primary/70" size={16} />
                <a href="tel:+233558749735" className="hover:text-primary transition-colors">
                  +233 558 749 735
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Button asChild variant="default" size="sm" className="rounded-full">
                <a href="/assets/Wisdom_Dzontoh_CV.pdf" download className="flex items-center gap-2">
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} Wisdom Dzontoh. All rights reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Built with <Heart className="mx-1 text-primary" size={14} /> using Next.js and Tailwind CSS
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 z-50",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}
