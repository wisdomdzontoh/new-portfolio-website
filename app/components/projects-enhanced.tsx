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
    id: "invoice-generator",
    title: "Invoice Generator System",
    description:
      "An automated invoice generation system that integrates with the sevDesk API to streamline invoice creation, processing, and organization.",
    longDescription: `This automated invoice generation system revolutionizes the way businesses handle their billing processes. The system seamlessly integrates with the sevDesk API to automate invoice creation, processing, and organization.
    
    The application processes and transforms data extracted from Excel/CSV files into API payloads, ensuring accurate and consistent invoice generation. It implements a robust solution to download and organize invoices based on date and time, making financial record-keeping efficient and organized.
    
    Built with Python and leveraging the sevDesk API, the system handles complex data transformations and provides a streamlined workflow for businesses to manage their invoicing processes. The solution significantly reduces manual work and minimizes errors in invoice generation.`,
    link: "#",
    github: "https://github.com/wisdomdzontoh/invoice-generator",
    technologies: ["Python", "sevDesk API", "Pandas", "FastAPI", "CSV & XLSX handling"],
    image: "/assets/student-mgt.jpg",
    screenshots: ["/assets/student-mgt.jpg"],
    features: [
      "Automated invoice generation using sevDesk API",
      "Data processing from Excel/CSV files",
      "Invoice organization by date and time",
      "Robust error handling and validation",
      "Streamlined workflow for invoice management",
    ],
    challenges: [
      {
        description: "Handling complex data transformations from various file formats.",
        solution:
          "Implemented robust data parsing and validation using Pandas to ensure data integrity and handle different file formats consistently.",
      },
      {
        description: "Integrating with external API while maintaining data security.",
        solution:
          "Developed secure API integration patterns with proper authentication and error handling to ensure reliable communication with sevDesk API.",
      },
    ],
    featured: true,
    role: "Software Engineer",
    duration: "2 months",
  },
  {
    id: "campaign-automation",
    title: "Campaign Automation Tool",
    description:
      "An end-to-end solution that automates lead campaign processes by cleaning data, integrating with ChatGPT for analysis, and connecting with CRM systems.",
    longDescription: `This comprehensive campaign automation tool streamlines lead generation and management processes for businesses. The system automates data cleaning and integration by reading data from CSV/XLSX files and storing it in a Turso database.
    
    The application utilizes the ChatGPT API to analyze and assign data attributes, enhancing lead scoring accuracy. It seamlessly integrates with Pipedrive (CRM) and Lemlist for coordinated lead campaigns, creating a unified workflow for marketing teams.
    
    Built with Python and leveraging modern APIs, the system provides intelligent data processing, automated lead scoring, and seamless CRM integration. This solution significantly improves lead quality and campaign effectiveness while reducing manual work.`,
    link: "#",
    github: "https://github.com/wisdomdzontoh/campaign-automation",
    technologies: ["Python", "ChatGPT API", "Turso", "Pipedrive API", "Lemlist"],
    image: "/assets/react-job-listing.png",
    screenshots: ["/assets/react-job-listing.png"],
    features: [
      "Automated data cleaning and integration",
      "ChatGPT API integration for lead analysis",
      "Turso database for efficient data storage",
      "Pipedrive CRM integration",
      "Lemlist campaign coordination",
      "Intelligent lead scoring system",
    ],
    challenges: [
      {
        description: "Integrating multiple third-party APIs while maintaining system reliability.",
        solution:
          "Implemented robust error handling and retry mechanisms with proper API rate limiting to ensure reliable integration with all external services.",
      },
      {
        description: "Ensuring data consistency across different platforms.",
        solution:
          "Developed a unified data model and synchronization system that maintains data integrity across Turso database, Pipedrive, and Lemlist.",
      },
    ],
    featured: true,
    role: "Software Engineer",
    duration: "3 months",
  },
  {
    id: "web-scraping-lead-gen",
    title: "Web Scraping & Lead Generation",
    description:
      "A sophisticated web scraping tool that extracts data from websites, scores leads using a BK_Tree algorithm, and enhances accuracy with AI integration.",
    longDescription: `This advanced web scraping and lead generation system combines traditional web scraping techniques with modern AI capabilities to deliver high-quality leads for businesses. The system automates extraction of web data using Selenium, ensuring reliable data collection from various websites.
    
    The application employs a BK_Tree algorithm for scoring leads based on defined metrics, providing intelligent lead qualification. It integrates ChatGPT API to enhance lead scoring accuracy, making the system more effective at identifying high-value prospects.
    
    Built with Python and leveraging Selenium for web automation, the system provides comprehensive lead generation capabilities with intelligent scoring and AI-enhanced accuracy. This solution significantly improves lead quality and reduces manual research time.`,
    link: "#",
    github: "https://github.com/wisdomdzontoh/web-scraping-lead-gen",
    technologies: ["Python", "Selenium", "ChatGPT API", "Pandas", "BK_Tree Algorithm"],
    image: "/assets/maternal-death.png",
    screenshots: ["/assets/maternal-death.png"],
    features: [
      "Automated web data extraction using Selenium",
      "BK_Tree algorithm for intelligent lead scoring",
      "ChatGPT API integration for enhanced accuracy",
      "Comprehensive data processing and analysis",
      "Configurable scraping parameters",
      "Lead quality assessment and ranking",
    ],
    challenges: [
      {
        description: "Handling dynamic web content and anti-scraping measures.",
        solution:
          "Implemented advanced Selenium techniques with proper wait strategies and user-agent rotation to handle dynamic content and avoid detection.",
      },
      {
        description: "Optimizing lead scoring algorithm for accuracy and performance.",
        solution:
          "Developed a hybrid scoring system combining BK_Tree algorithm with AI analysis to provide both fast processing and high accuracy in lead qualification.",
      },
    ],
    featured: true,
    role: "Software Engineer",
    duration: "2 months",
  },
  {
    id: "health-chatbot",
    title: "Health Information Chatbot",
    description:
      "Built an end-to-end chatbot that helps professionals answer questions in relation to Standard operating procedures, documentations etc.",
    longDescription: `This comprehensive health information chatbot system is designed to assist healthcare professionals by providing instant access to standard operating procedures, documentation, and medical guidelines. The system leverages advanced AI capabilities to deliver accurate and contextually relevant information.
    
    Built with FastAPI and Langchain, the application provides a robust backend infrastructure for handling complex medical queries. It integrates with OpenAI API and Ollama for enhanced AI capabilities, while the frontend is developed using Next.js and shadcn UI library for an intuitive user experience.
    
    The system is specifically designed for healthcare environments where quick access to accurate information is critical. It helps reduce response time for medical queries and ensures consistent information delivery across healthcare teams.`,
    link: "#",
    github: "#",
    technologies: ["FastAPI", "Langchain", "OpenAI API", "Ollama", "Next.js", "shadcn UI"],
    image: "/assets/med-rec-system.png",
    screenshots: ["/assets/med-rec-system.png"],
    features: [
      "AI-powered health information retrieval",
      "Integration with medical documentation systems",
      "Real-time query processing",
      "Secure healthcare data handling",
      "User-friendly interface for healthcare professionals",
      "Comprehensive medical knowledge base",
    ],
    challenges: [
      {
        description: "Ensuring accuracy and reliability of medical information.",
        solution:
          "Implemented rigorous validation systems and medical knowledge verification processes to ensure all provided information meets healthcare standards.",
      },
      {
        description: "Handling complex medical queries with appropriate context.",
        solution:
          "Developed advanced prompt engineering techniques and context-aware response generation to provide accurate and relevant medical information.",
      },
    ],
    featured: true,
    role: "Full-Stack Developer",
    duration: "4 months",
  },
  {
    id: "chatbot-saas",
    title: "AI Chatbot SAAS Application",
    description:
      "A web application that allows users to create, train, and deploy custom chatbots with data-specific training.",
    longDescription: `This AI Chatbot SAAS platform enables businesses to create custom chatbots trained on their specific data. 
    
    The application features a user-friendly interface for chatbot creation, training, and deployment. Users can upload documents, connect knowledge bases, and fine-tune their chatbots to provide accurate responses based on their business data.
    
    The backend is built with Django REST Framework, providing robust API endpoints for chatbot management, user authentication, and data processing. The frontend uses Next.js for a responsive and interactive user experience, with real-time chat functionality.
    
    The system integrates with OpenAI's API to leverage advanced language models while maintaining data privacy and security. The chatbots can be embedded into websites via a JavaScript snippet, making deployment simple for non-technical users.`,
    link: "https://chatwise-ai.vercel.app",
    github: "https://github.com/wisdomdzontoh/AI-assistant-bot-frontend",
    technologies: ["Django REST Framework", "Next.js", "OpenAI API", "Tailwind CSS", "PostgreSQL", "Redis"],
    image: "/assets/chatwise_ai.png",
    screenshots: ["/assets/chatwise_ai.png", "/assets/chatbot-dashboard.png", "/assets/chatbot-training.png"],
    features: [
      "Custom chatbot creation with personalized branding",
      "Document upload and knowledge base integration for training",
      "Real-time chat interface with typing indicators",
      "Analytics dashboard to track user interactions",
      "Website embedding via JavaScript snippet",
      "User management with different permission levels",
      "Subscription billing integration",
    ],
    challenges: [
      {
        description: "Handling large document uploads and processing them efficiently for chatbot training.",
        solution:
          "Implemented a chunking algorithm that breaks documents into smaller pieces and processes them asynchronously using Celery tasks, significantly improving processing speed and resource utilization.",
      },
      {
        description: "Ensuring chatbot responses were accurate and relevant to the uploaded knowledge base.",
        solution:
          "Developed a custom vector similarity search using PostgreSQL with pgvector extension to find the most relevant context from the knowledge base before generating responses.",
      },
      {
        description: "Managing API costs while providing a responsive user experience.",
        solution:
          "Implemented a tiered caching system with Redis that stores frequent queries and responses, reducing API calls by approximately 40% while maintaining response quality.",
      },
    ],
    featured: false,
    role: "Full-Stack Developer",
    duration: "3 months",
  },
  {
    id: "data-visualizer",
    title: "Data Visualizer Dashboard",
    description:
      "A dashboard application that enables users to create visualizations from uploaded CSV/Excel files or database connections.",
    longDescription: `The Data Visualizer Dashboard is a comprehensive solution for data analysis and visualization. It allows users to upload data files or connect directly to databases to generate interactive charts and dashboards.
    
    The application supports various data sources including CSV, Excel, JSON files, and direct connections to MySQL, PostgreSQL, and MongoDB databases. Users can create custom dashboards with multiple visualization types including line charts, bar charts, pie charts, scatter plots, and heat maps.
    
    The platform features a drag-and-drop interface for dashboard creation, making it accessible to non-technical users. Advanced users can write custom SQL queries or use the built-in query builder to transform data before visualization.
    
    Dashboards can be shared with specific users or made public with view-only permissions. The system also supports scheduled exports and reports via email.`,
    link: "#",
    github: "https://github.com/wisdomdzontoh/dataviz-frontend",
    technologies: ["Django REST Framework", "Next.js", "Chart.js", "shadcn/ui", "PostgreSQL", "WebSockets"],
    image: "/assets/data_viz.png",
    screenshots: ["/assets/data_viz.png", "/assets/data-viz-chart.png", "/assets/data-viz-dashboard.png"],
    features: [
      "Support for multiple data sources (CSV, Excel, JSON, databases)",
      "Interactive chart creation with 10+ visualization types",
      "Drag-and-drop dashboard builder",
      "Real-time collaboration with WebSockets",
      "Custom SQL query support and visual query builder",
      "Dashboard sharing and permission management",
      "Scheduled reports and exports",
    ],
    challenges: [
      {
        description: "Handling large datasets efficiently in the browser without performance issues.",
        solution:
          "Implemented data sampling and progressive loading techniques that analyze data size and automatically apply appropriate optimization strategies based on browser capabilities.",
      },
      {
        description: "Creating a flexible yet user-friendly interface for chart customization.",
        solution:
          "Developed a modular chart configuration system with sensible defaults and progressive disclosure of advanced options, balancing simplicity with power.",
      },
      {
        description: "Supporting real-time collaboration on dashboards.",
        solution:
          "Implemented a WebSocket-based system with operational transformation to handle concurrent edits, similar to how Google Docs manages collaborative editing.",
      },
    ],
    featured: true,
    role: "Lead Developer",
    duration: "4 months",
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker Application",
    description:
      "A responsive web application for tracking personal and business expenses with interactive visualizations and trend analysis.",
    longDescription: `The Expense Tracker is a comprehensive financial management tool designed to help individuals and small businesses monitor their spending habits and financial health.
    
    The application allows users to record expenses and income, categorize transactions, and attach receipts or invoices. It provides detailed reports and visualizations to help users understand their spending patterns and identify areas for potential savings.
    
    Key features include budget creation and tracking, recurring transaction management, and financial goal setting. The dashboard presents an overview of current financial status with customizable widgets for different metrics.
    
    The application is built with a responsive design that works seamlessly across desktop and mobile devices, allowing users to track expenses on the go. Data is securely stored and can be exported in various formats for accounting purposes.`,
    link: "https://expenses-tracker-eosin-one.vercel.app",
    github: "https://github.com/wisdomdzontoh/ExpensesTracker-Frontend",
    technologies: ["Django REST Framework", "Next.js", "Chart.js", "Tailwind CSS", "PostgreSQL"],
    image: "/assets/expense-tracker.png",
    screenshots: ["/assets/expense-tracker.png", "/assets/expense-dashboard.png", "/assets/expense-reports.png"],
    features: [
      "Expense and income tracking with categorization",
      "Receipt/invoice attachment and storage",
      "Budget creation and monitoring",
      "Recurring transaction management",
      "Interactive reports and visualizations",
      "Financial goal setting and tracking",
      "Data export in multiple formats (CSV, PDF, Excel)",
    ],
    challenges: [
      {
        description: "Creating intuitive data entry forms that work well on both desktop and mobile.",
        solution:
          "Designed a progressive form system that adapts to the device size, with simplified quick-entry on mobile and more detailed options on desktop.",
      },
      {
        description: "Generating meaningful insights from financial data that help users improve their habits.",
        solution:
          "Developed an analytics engine that identifies spending patterns and anomalies, providing actionable recommendations based on historical data and user-defined goals.",
      },
      {
        description: "Ensuring data security while maintaining good performance.",
        solution:
          "Implemented end-to-end encryption for sensitive financial data with a hybrid approach that keeps frequently accessed data in a secure but performant state.",
      },
    ],
    role: "Full-Stack Developer",
    duration: "2 months",
  },
  {
    id: "i-cast-voting",
    title: "I-Cast Voting Platform",
    description:
      "An end-to-end solution that allows organizations to create and manage voting events with real-time results and analytics.",
    longDescription: `I-Cast is a secure, transparent voting platform designed for organizations of all sizes to conduct elections, polls, and surveys with confidence.
    
    The platform enables administrators to create custom voting events with various question types, candidate profiles, and voting rules. It supports different authentication methods to verify voter eligibility, including email verification, access codes, and integration with organizational directories.
    
    The voting interface is designed to be intuitive and accessible, working across devices and meeting WCAG accessibility standards. Real-time results are available to administrators, with customizable public results displays that can be embedded in websites or shared via direct links.
    
    Security features include end-to-end encryption, audit logs, and optional blockchain verification for maximum transparency. The system is designed to prevent double-voting while maintaining voter anonymity when required.`,
    link: "#projects",
    github: "https://github.com/wisdomdzontoh/I-CAST_Voting_Platform_frontend",
    technologies: ["Django REST Framework", "Next.js", "WebSockets", "Tailwind CSS", "PostgreSQL"],
    image: "/assets/i-cast.png",
    screenshots: ["/assets/i-cast.png", "/assets/voting-admin.png", "/assets/voting-results.png"],
    features: [
      "Custom voting event creation with multiple question types",
      "Secure voter authentication and verification",
      "Real-time results and analytics",
      "Mobile-responsive voting interface",
      "Customizable public results display",
      "Comprehensive audit logs and reporting",
      "Optional blockchain verification for transparency",
    ],
    challenges: [
      {
        description: "Ensuring the voting system is both secure and user-friendly.",
        solution:
          "Implemented a multi-layered security approach with simple user flows, using progressive security that adapts to the sensitivity of the election.",
      },
      {
        description: "Handling high traffic during peak voting periods without performance degradation.",
        solution:
          "Designed a scalable architecture with load balancing and caching strategies specifically optimized for the read-heavy, write-light pattern of voting systems.",
      },
      {
        description: "Creating a flexible system that works for different types of elections and organizations.",
        solution:
          "Developed a modular system with customizable components that can be configured to match the specific rules and requirements of different electoral processes.",
      },
    ],
    role: "Backend Developer & System Architect",
    duration: "3 months",
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
