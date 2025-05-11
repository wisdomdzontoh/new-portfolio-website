"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Code, FileCode, PenTool, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Challenge = {
  description: string
  solution: string
}

type ProjectDetailProps = {
  title: string
  description: string
  longDescription: string
  image: string
  screenshots: string[]
  technologies: string[]
  features: string[]
  challenges: Challenge[]
  github?: string
  liveUrl?: string
  role: string
  duration: string
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetail({
  title,
  description,
  longDescription,
  image,
  screenshots,
  technologies,
  features,
  challenges,
  github,
  liveUrl,
  role,
  duration,
  isOpen,
  onClose,
}: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-card border border-border rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-64 md:h-80 w-full relative overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground rounded-full p-2 hover:bg-background transition-colors"
              aria-label="Close"
            >
              <XCircle size={24} />
            </button>
          </div>

          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{title}</h2>
            <p className="text-white/90 max-w-2xl drop-shadow-md">{description}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="col-span-1">
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                  <p className="font-medium">{role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                  <p className="font-medium">{duration}</p>
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  {github && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github size={16} />
                        <span>View Code</span>
                      </a>
                    </Button>
                  )}
                  {liveUrl && (
                    <Button asChild size="sm" className="w-full">
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="col-span-1 md:col-span-3">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="overview" className="flex items-center gap-1">
                    <FileCode size={16} />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center gap-1">
                    <CheckCircle size={16} />
                    <span>Features</span>
                  </TabsTrigger>
                  <TabsTrigger value="challenges" className="flex items-center gap-1">
                    <PenTool size={16} />
                    <span>Challenges</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-muted-foreground">{longDescription}</p>
                  </div>

                  {screenshots.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Screenshots</h3>
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
                        <Image
                          src={screenshots[activeScreenshot] || "/placeholder.svg"}
                          alt={`${title} screenshot ${activeScreenshot + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {screenshots.map((screenshot, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveScreenshot(index)}
                            className={cn(
                              "relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all",
                              activeScreenshot === index
                                ? "border-primary scale-105"
                                : "border-border opacity-70 hover:opacity-100",
                            )}
                          >
                            <Image
                              src={screenshot || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="features">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Features</h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="challenges">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Challenges & Solutions</h3>
                    {challenges.map((challenge, index) => (
                      <div key={index} className="space-y-2 pb-4 border-b border-border last:border-0">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <Code className="text-primary" size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Challenge {index + 1}</h4>
                            <p className="text-muted-foreground">{challenge.description}</p>
                          </div>
                        </div>
                        <div className="flex items-start mt-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <CheckCircle className="text-primary" size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Solution</h4>
                            <p className="text-muted-foreground">{challenge.solution}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
