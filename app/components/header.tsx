"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Code, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleScroll = () => {
    const scrollPosition = window.scrollY

    if (scrollPosition > 10) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop - 100
      const sectionHeight = (section as HTMLElement).offsetHeight
      const sectionId = section.getAttribute("id") || ""

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(sectionId)
      }
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-3 border-b border-border/30" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold relative group flex items-center">
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-2">
              <Code className="text-primary" size={18} />
            </div>
            <span className="text-primary">W</span>
            <span>isdom</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors relative block",
                      activeSection === item.href.substring(1)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="outline" size="sm" className="rounded-full hidden md:flex" asChild>
            <a
              href="https://drive.google.com/uc?export=download&id=1watZAeRuLBZeCcoAMfuefS_wVUV7I9vt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span>Resume</span>
            </a>
          </Button>


            <Button variant="default" size="sm" className="rounded-full hidden md:flex" asChild>
              <a href="#contact">Let's Talk</a>
            </Button>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="relative z-50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.ul
              className="flex flex-col items-center gap-6 text-center"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-xl font-medium transition-colors",
                      activeSection === item.href.substring(1)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
              >
                <Button variant="outline" size="sm" className="rounded-full hidden md:flex" asChild>
                <a
                  href="https://drive.google.com/uc?export=download&id=1watZAeRuLBZeCcoAMfuefS_wVUV7I9vt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Resume</span>
                </a>
              </Button>

              </motion.li>
              <motion.li
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
              >
                <Button asChild className="mt-2 rounded-full">
                  <a href="#contact" onClick={toggleMenu}>
                    Let's Talk
                  </a>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
