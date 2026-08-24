"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, ArrowRight, Star, Info } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectDetail from "@/app/components/project-detail"

type Challenge = {
  description: string
  solution: string
}

type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  link: string
  technologies: string[]
  image: string
  screenshots: string[]
  features: string[]
  challenges: Challenge[]
  github?: string
  featured?: boolean
  role: string
  duration: string
}

const projects: Project[] = [
  {
    id: "emergency-alert-response-system",
    title: "Emergency IoT Alert & Response System",
    description:
      "A nationwide IoT alert platform that routes verified SOS signals from GPS pendant devices to geographically-assigned response hubs in real time — four independently deployable Go microservices, a Tauri desktop command center, and a React Native field app.",
    longDescription: `This system solves a mission-critical problem: getting a verified emergency signal from a household device to the right response team, fast, even under network stress. The backend is decomposed into four independently deployable Go services — a device gateway ingesting signals over MQTT and legacy GPS protocols (GT06/JT808), a worker that processes and escalates alerts, a gRPC delivery API, and a lightweight dev-mode server — communicating through Apache Kafka running in KRaft mode.

    To make sure an alert is never silently lost, the Kafka producer layer falls back to local disk-spooling during broker outages and replays automatically once the broker recovers. PostgreSQL with TimescaleDB stores time-series audit and incident data as hypertables, and Redis backs IMEI-allowlisted rate limiting on device ingest.

    The system ships with two companion clients: a Tauri (Rust + React) desktop command center for hub operators, with a live satellite map, catchment-boundary overlays, and an audio-alert incident stream; and a React Native field app for on-the-ground responders, with secure location heartbeats and TOTP-secured authentication. Security runs on RS256 JWT and AES-256-GCM encryption end-to-end.`,
    link: "#",
    technologies: ["Go", "Apache Kafka", "MQTT (EMQX)", "PostgreSQL + TimescaleDB", "Redis", "gRPC", "Tauri (Rust)", "React Native"],
    image: "/assets/projects/emergency-ers.svg",
    screenshots: ["/assets/projects/emergency-ers.svg"],
    features: [
      "CQRS-style backend split across 4 independently deployable Go services",
      "Kafka (KRaft) event streaming with disk-spool fallback so alerts survive broker outages",
      "IMEI-allowlisted device ingest over MQTT with Redis-backed rate limiting",
      "TimescaleDB hypertables for time-series incident and audit logging",
      "Tauri desktop command center with live satellite maps for hub operators",
      "React Native field app for responders with secure location heartbeat tracking",
      "RS256 JWT + TOTP two-factor auth with AES-256-GCM encryption throughout",
    ],
    challenges: [
      {
        description: "An alert getting silently dropped if the message broker goes down mid-incident isn't an acceptable failure mode.",
        solution:
          "Built a disk-spool fallback into the Kafka producer layer so alert events persist locally during an outage and replay automatically once the broker recovers, instead of being lost.",
      },
      {
        description: "Coordinating four independently deployable services without tight coupling or a single point of failure.",
        solution:
          "Adopted a CQRS-style decomposition (gateway, worker, api, server) communicating over internal gRPC, so each service can be deployed, scaled, and restarted on its own.",
      },
    ],
    featured: true,
    role: "Software Engineer",
    duration: "Ongoing",
  },
  {
    id: "holistic-assessment",
    title: "Holistic Assessment Automation Platform",
    description:
      "Rebuilt Ghana Health Service's Excel-based facility assessment process as a web platform with a real-time weighted scoring engine, DHIS2 integration, and fully configurable indicators.",
    longDescription: `Ghana Health Service scores health facility performance using a "Holistic Assessment Tool" that started life as an unwieldy Excel workbook. This platform rebuilds that process as a proper web application, integrated directly with DHIS2 (Ghana's national health information system).

    The backend runs on Django REST Framework, PostgreSQL, and Celery + Redis for asynchronous processing, deployed behind Gunicorn and NGINX in Docker. Rather than maintaining a separate user database, authentication runs on DHIS2 Basic Auth, with role-based access (Super Admin, National, Regional, District, Facility) derived directly from each user's DHIS2 org-unit assignment.

    Roughly 80% of indicator data is pulled automatically from the DHIS2 API, with the remainder entered manually where DHIS2 doesn't have it. Scores are computed by a real-time weighted engine on a −2 to +2 scale, with indicators, weights, and targets fully configurable from an admin panel — so scoring-rule changes don't require a code deploy. Results export to Excel, CSV, and PDF with the same conditional formatting the original Excel tool used, and the Next.js/TypeScript frontend gives facility and district staff a UI built for actual field use.`,
    link: "https://holistic-generator.leadsranc.com",
    github: "https://github.com/wisdomdzontoh/holistic-backend",
    technologies: ["Django REST Framework", "PostgreSQL", "Celery", "Redis", "Next.js", "TypeScript", "DHIS2 API", "Docker"],
    image: "/assets/projects/holistic-assessment.svg",
    screenshots: ["/assets/projects/holistic-assessment.svg"],
    features: [
      "Real-time weighted scoring engine on a configurable −2 to +2 scale",
      "DHIS2 API integration auto-populating roughly 80% of indicator data",
      "DHIS2-based authentication with org-unit-derived, role-based access control",
      "Fully configurable indicators, weights, and targets via an admin panel — no redeploy needed",
      "Multi-period scoring (monthly, quarterly, half-yearly, yearly)",
      "Excel, CSV, and PDF export preserving the original tool's conditional formatting",
    ],
    challenges: [
      {
        description: "Replacing an Excel tool that health facility staff already trusted, without standing up a separate login system.",
        solution:
          "Authenticated directly against DHIS2 Basic Auth and derived role-based permissions from each user's existing DHIS2 org-unit assignment, so there was no new credential system to roll out.",
      },
      {
        description: "Keeping scoring logic flexible as indicators and weights change across reporting periods.",
        solution:
          "Moved indicators, weights, and targets into an admin-configurable model instead of hardcoding them, so scoring-rule updates are a data change, not a code change.",
      },
    ],
    featured: true,
    role: "Full-Stack Developer",
    duration: "2025 – Present",
  },
  {
    id: "imems-nmc",
    title: "Integrated M&E Management System — Nursing & Midwifery Regulation",
    description:
      "A national regulatory reporting platform for a Ministry of Health-affiliated licensing body, covering structured data entry, analytics, and real-time reporting across its monitoring & evaluation workflows.",
    longDescription: `IMEMS digitizes the monitoring and evaluation reporting process for a national nursing and midwifery regulatory body, replacing fragmented spreadsheet-based reporting with a structured, role-gated web platform.

    The frontend is built on Next.js (App Router) with TypeScript, styled with Tailwind CSS and a shadcn/ui component system, using Zustand for client-side state alongside React Context for shared app state. It's paired with a REST API backend for secure, role-based data handling appropriate for institutional and government use.

    The platform covers six core capabilities end-to-end: structured data entry, standardized reporting, analytics, real-time insights, report generation, and data export/sharing — giving regulatory staff a single system instead of scattered documents.`,
    link: "https://nmc-reporting-system.vercel.app",
    github: "https://github.com/wisdomdzontoh/nmc-frontend",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand", "REST API"],
    image: "/assets/projects/imems-nmc.svg",
    screenshots: ["/assets/projects/imems-nmc.svg"],
    features: [
      "Structured, form-driven data entry for regulatory reporting workflows",
      "Real-time analytics and insights dashboards",
      "Standardized report generation with export & share options",
      "Role-gated authentication built for institutional/government use",
      "Component system built on Next.js App Router, Zustand, and shadcn/ui",
    ],
    challenges: [
      {
        description: "Making a rigid regulatory reporting schema usable by non-technical institutional staff.",
        solution:
          "Built structured, form-driven data entry flows on top of shadcn/ui components, keeping validation and schema enforcement on the backend while the UI stays approachable for day-to-day users.",
      },
    ],
    featured: true,
    role: "Full-Stack Developer",
    duration: "2025 – 2026",
  },
  {
    id: "ebads",
    title: "EBADS — Emergency Bed Allocation Decision Support",
    description:
      "A decision-support system that algorithmically matches emergency patients to the most appropriate hospital facility across Ghana's referral network — evaluated through discrete-event simulation and formal statistical testing rather than guesswork.",
    longDescription: `EBADS addresses a real bottleneck in emergency care: deciding which facility an incoming patient should be routed to, given bed availability, travel time, and facility capability. It was built and evaluated as a rigorously-tested systems project, seeded with a 24+ facility dataset across Greater Accra.

    The backend runs on FastAPI with PostgreSQL and Alembic migrations, containerized with Docker Compose. At its core is a multi-algorithm allocation engine — three competing allocation strategies benchmarked against each other — using travel-time estimation via the Google Maps API and Haversine distance calculations.

    Rather than shipping the allocation logic on faith, it's validated through a discrete-event simulation framework with deterministic seeding for repeatable offline evaluation (no real patient data involved), backed by a formal statistical pipeline — Shapiro-Wilk normality tests, paired t-tests, Wilcoxon signed-rank tests, and sensitivity analysis — against defined KPIs: Average Time to Bed Placement, Facility Referral Rate, and Mean Cost per Emergency Encounter. The engineering process itself is documented in a companion specs repository tracing every implementation decision back to the underlying research.`,
    link: "https://ebads-portal.vercel.app",
    github: "https://github.com/wisdomdzontoh/ebads",
    technologies: ["FastAPI", "PostgreSQL", "Alembic", "Docker", "Google Maps API", "Statistical Analysis"],
    image: "/assets/projects/ebads.svg",
    screenshots: ["/assets/projects/ebads.svg"],
    features: [
      "Multi-algorithm emergency bed allocation engine with head-to-head benchmarking",
      "Discrete-event simulation with deterministic seeding for repeatable evaluation",
      "Formal statistical validation pipeline (Shapiro-Wilk, paired t-test, Wilcoxon signed-rank)",
      "Defined KPI tracking: time-to-bed-placement, referral rate, cost per encounter",
      "Travel-time estimation via Google Maps API / Haversine distance",
      "Engineering process fully documented and traced back to the underlying research spec",
    ],
    challenges: [
      {
        description: "Proving an allocation algorithm actually performs better without access to real patient data.",
        solution:
          "Built a discrete-event simulation framework with deterministic seeding, then validated results with a formal statistical pipeline (Shapiro-Wilk, paired t-test, Wilcoxon signed-rank) instead of relying on a single benchmark run.",
      },
      {
        description: "Comparing multiple allocation strategies fairly under identical conditions.",
        solution:
          "Ran all three competing algorithms through the same simulation harness and KPI set (time-to-bed-placement, referral rate, cost per encounter) for an apples-to-apples comparison.",
      },
    ],
    featured: true,
    role: "Software Engineer",
    duration: "2025 – 2026",
  },
  {
    id: "african-investment-hub",
    title: "African Investment Hub",
    description:
      "A backend platform for connecting investors with opportunities across African markets, built on a modern async Python stack with vector search for AI-assisted matching.",
    longDescription: `African Investment Hub is a backend platform designed to connect investors with investment opportunities across African markets. It's built on FastAPI with a fully async architecture — SQLAlchemy 2.0's async ORM over PostgreSQL 16, which uses the pgvector extension for embedding-based matching and search.

    Background processing runs on ARQ, with Redis for caching and job queues. Auth is handled through Clerk with JWT verification, and AI-assisted features (matching, summarization) are built on the OpenAI API with Langfuse for LLM observability. File storage runs on Cloudflare R2, transactional email through Resend, and Sentry for error monitoring — production tooling usually reserved for much later-stage products.

    The codebase enforces a minimum 85% test coverage, with Ruff and MyPy running as pre-commit hooks, OpenAPI auto-documentation, Alembic migrations, and feature-flagged rollout for in-progress capabilities.`,
    link: "#",
    github: "https://github.com/wisdomdzontoh/africa-investment-hub-backend",
    technologies: ["FastAPI", "PostgreSQL + pgvector", "SQLAlchemy 2.0 (async)", "Redis", "ARQ", "OpenAI API", "Clerk", "Docker"],
    image: "/assets/projects/investment-hub.svg",
    screenshots: ["/assets/projects/investment-hub.svg"],
    features: [
      "Fully async backend: FastAPI + SQLAlchemy 2.0 over PostgreSQL 16",
      "pgvector-powered embedding search for AI-assisted investor/opportunity matching",
      "Background job processing via ARQ with Redis-backed queues and caching",
      "Clerk-based JWT authentication and authorization",
      "OpenAI API integration with Langfuse for LLM observability",
      "85%+ enforced test coverage with Ruff + MyPy pre-commit hooks",
    ],
    challenges: [
      {
        description: "Building AI-assisted matching that needs to stay explainable and observable, not a black box.",
        solution:
          "Paired OpenAI API calls with Langfuse tracing so every LLM interaction in the matching pipeline is logged and inspectable, rather than opaque.",
      },
    ],
    featured: false,
    role: "Backend Developer",
    duration: "2026",
  },
  {
    id: "chatbot-saas",
    title: "ChatWise — AI Customer Support Platform",
    description:
      "An AI customer-support SaaS that lets businesses train a custom chatbot on their own PDFs, websites, and docs, with human-agent fallback and multi-language support — no code required.",
    longDescription: `ChatWise enables businesses to create custom support chatbots trained on their own data. Users upload documents, connect knowledge bases, and fine-tune persona and tone, all through a UI built for non-technical users.

    The backend is built with Django REST Framework, providing API endpoints for chatbot management, authentication, and data processing. The frontend uses Next.js for a responsive, real-time chat experience.

    The system integrates with the OpenAI API for response generation while keeping training data isolated per business. Chatbots embed into any website via a JavaScript snippet, and the platform exposes webhooks and an API for teams that want deeper integration.`,
    link: "https://chatwise-ai.vercel.app",
    github: "https://github.com/wisdomdzontoh/AI-assistant-bot-frontend",
    technologies: ["Django REST Framework", "Next.js", "OpenAI API", "PostgreSQL (pgvector)", "Redis", "Celery", "Tailwind CSS"],
    image: "/assets/chatwise_ai.png",
    screenshots: ["/assets/chatwise_ai.png"],
    features: [
      "Custom chatbot creation with persona branding, trained on PDFs/websites/docs",
      "Automatic multi-language detection",
      "Smart fallback to a human agent when the bot can't confidently answer",
      "Conversation analytics dashboard for support teams",
      "Website embedding via a JavaScript snippet",
      "Webhook & API access for deeper integrations",
    ],
    challenges: [
      {
        description: "Processing large document uploads efficiently for chatbot training.",
        solution:
          "Chunk documents and process them asynchronously via Celery, keeping upload response times fast while training happens in the background.",
      },
      {
        description: "Keeping chatbot answers grounded in the uploaded knowledge base instead of hallucinating.",
        solution:
          "Built a vector similarity search on PostgreSQL with the pgvector extension to retrieve the most relevant context before generating a response.",
      },
    ],
    featured: false,
    role: "Full-Stack Developer",
    duration: "2024 – Present",
  },
  {
    id: "i-cast-voting",
    title: "I-Cast Voting Platform",
    description:
      "A secure, AI-integrated voting platform for schools, unions, corporates, and government bodies — encrypted OTP-verified voting, real-time results, and AI-generated summaries and analytics.",
    longDescription: `I-Cast is a secure, transparent voting platform built for organizations of all sizes to run elections, polls, and surveys with confidence.

    Administrators create custom voting events with different question types, candidate profiles, and voting rules, verifying voter eligibility through OTP or organizational directory integration. The platform is multi-tenant, so many organizations run independently on the same infrastructure, with a mobile-responsive, installable PWA for voters.

    Real-time results include AI-generated summaries and analytics heatmaps. Security features include end-to-end encrypted voting, comprehensive audit logs, and anti-double-vote protection, and the platform supports white-labeling and a developer API for teams that want to embed voting into their own products.`,
    link: "https://i-cast.vercel.app",
    github: "https://github.com/wisdomdzontoh/I-CAST_Voting_Platform_frontend",
    technologies: ["Django REST Framework", "Next.js", "PostgreSQL", "WebSockets", "OpenAI API", "Tailwind CSS"],
    image: "/assets/i-cast.png",
    screenshots: ["/assets/i-cast.png"],
    features: [
      "OTP-verified, encrypted voting with anti-double-vote protection",
      "Real-time results with AI-generated summaries and analytics heatmaps",
      "Multi-tenant architecture supporting many organizations on one platform",
      "Mobile-responsive, installable PWA",
      "Comprehensive audit logging for election integrity",
      "White-labeling and a developer API for embedding into other systems",
    ],
    challenges: [
      {
        description: "Ensuring the voting system is both secure and simple enough for non-technical voters.",
        solution:
          "Implemented a multi-layered but progressive security model — OTP verification and encryption by default, with stronger controls scaling up for higher-stakes elections.",
      },
      {
        description: "Handling traffic spikes during peak voting windows without degrading performance.",
        solution:
          "Designed the architecture around the read-heavy, write-light pattern typical of voting systems, with caching and WebSocket-based result updates instead of client polling.",
      },
    ],
    featured: false,
    role: "Backend Developer & System Architect",
    duration: "2024 – Present",
  },
  {
    id: "learndrill-ai",
    title: "LearnDrill AI",
    description:
      "An AI-powered study platform that converts uploaded notes, videos, and web pages into flashcards, adaptive quizzes, and practice tests, using spaced repetition to help students study more efficiently.",
    longDescription: `LearnDrill AI helps students turn raw study material into an active study routine instead of passive re-reading. Users upload notes, lecture videos, or web pages, and the platform generates flashcards, adaptive quizzes, and practice tests from that content automatically.

    Progress is tracked per topic on a spectrum from "unfamiliar" to "mastered," and the review schedule adapts using spaced-repetition and active-recall principles — so students spend more time on what they haven't retained yet, rather than material they already know.`,
    link: "https://learndrill-ai.vercel.app",
    technologies: ["Next.js", "Tailwind CSS", "AI/LLM Integration"],
    image: "/assets/projects/learndrill.svg",
    screenshots: ["/assets/projects/learndrill.svg"],
    features: [
      "Converts uploaded notes, videos, and web pages into study material automatically",
      "AI-generated flashcards and adaptive quizzes",
      "Spaced-repetition scheduling based on per-topic mastery tracking",
      "Built for college and university exam preparation",
    ],
    challenges: [
      {
        description: "Turning unstructured source material (notes, video, web pages) into well-formed quiz and flashcard content.",
        solution:
          "Built an AI content pipeline that extracts and restructures key concepts from mixed input formats into structured question/answer pairs before generating study material.",
      },
    ],
    featured: false,
    role: "Full-Stack Developer",
    duration: "2024 – Present",
  },
]

export default function ProjectsEnhanced() {
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = filter ? projects.filter((project) => project.technologies.includes(filter)) : projects

  const featuredProjects = projects.filter((project) => project.featured)

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

  const uniqueTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies))).sort()

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDetail = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="section-container py-20 bg-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            My Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            A showcase of my technical expertise in backend development, API integrations, and data automation through
            real-world applications and innovative solutions.
          </p>
        </div>

        {/* Featured Projects */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-16"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={cn(
                "flex flex-col lg:flex-row gap-8 items-center mb-16 last:mb-0",
                index % 2 !== 0 ? "lg:flex-row-reverse" : "",
              )}
            >
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-sm group-hover:blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-lg">
                  <Image
                    src={project.image || "/placeholder.svg?height=600&width=800"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="text-primary" size={16} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 my-4">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-muted-foreground">
                      +{project.technologies.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => openProjectDetail(project)}
                  >
                    <Info size={16} className="mr-2" />
                    <span>Project Details</span>
                  </Button>

                  {project.github && (
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </a>
                    </Button>
                  )}

                  {project.link && project.link !== "#" && (
                    <Button asChild variant="default" size="sm" className="rounded-full">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter */}
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl font-semibold mb-4">Filter by Technology</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge
              variant={filter === null ? "default" : "secondary"}
              className={cn(
                "cursor-pointer",
                filter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20",
              )}
              onClick={() => setFilter(null)}
            >
              All
            </Badge>
            {uniqueTechnologies.map((tech, index) => (
              <Badge
                key={index}
                variant={filter === tech ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer",
                  filter === tech
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20",
                )}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card
                className={cn(
                  "overflow-hidden transition-all duration-500 border-border/50 bg-card h-full flex flex-col group",
                  hoveredIndex === index
                    ? "transform scale-[1.03] shadow-2xl border-primary/30 bg-gradient-to-br from-card to-card/95"
                    : "transform scale-100 shadow-md hover:shadow-xl hover:border-primary/20 hover:bg-gradient-to-br hover:from-card hover:to-card/98",
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-500",
                      hoveredIndex === index ? "scale-110 brightness-110" : "scale-100",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                      <Star size={12} className="mr-1" />
                      Featured
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="pb-2 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-muted-foreground">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={() => openProjectDetail(project)}>
                    <Info size={16} className="mr-1" />
                    <span>Details</span>
                  </Button>

                  {project.github && (
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    </Button>
                  )}

                  {project.link && project.link !== "#" && (
                    <Button asChild variant="default" size="sm">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight size={16} />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            title={selectedProject.title}
            description={selectedProject.description}
            longDescription={selectedProject.longDescription}
            image={selectedProject.image}
            screenshots={selectedProject.screenshots}
            technologies={selectedProject.technologies}
            features={selectedProject.features}
            challenges={selectedProject.challenges}
            github={selectedProject.github}
            liveUrl={selectedProject.link !== "#" ? selectedProject.link : undefined}
            role={selectedProject.role}
            duration={selectedProject.duration}
            isOpen={!!selectedProject}
            onClose={closeProjectDetail}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
