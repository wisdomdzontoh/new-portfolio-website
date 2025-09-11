"use client"

import React, { useState, useEffect } from 'react'
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Star, GitFork, Eye, Calendar, Code, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { GitHubRepository, GitHubLanguage } from "@/app/types"

interface GitHubReposProps {
  username?: string
  maxRepos?: number
}

const GitHubRepos: React.FC<GitHubReposProps> = ({ 
  username = "wisdomdzontoh", 
  maxRepos = 12 
}) => {
  const { ref, isVisible } = useScrollAnimation()
  const [repos, setRepos] = useState<GitHubRepository[]>([])
  const [languages, setLanguages] = useState<Record<string, GitHubLanguage>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'created'>('updated')
  const [rateLimited, setRateLimited] = useState(false)

  // Fallback data when API is rate limited
  const fallbackRepos: GitHubRepository[] = [
    {
      id: 1,
      name: "new-portfolio-website",
      full_name: "wisdomdzontoh/new-portfolio-website",
      description: "My personal portfolio website built with Next.js and TypeScript, showcasing my projects and skills",
      html_url: "https://github.com/wisdomdzontoh/new-portfolio-website",
      clone_url: "https://github.com/wisdomdzontoh/new-portfolio-website.git",
      homepage: "https://wisdomdzontoh.vercel.app",
      language: "TypeScript",
      languages_url: "https://api.github.com/repos/wisdomdzontoh/new-portfolio-website/languages",
      stargazers_count: 2,
      forks_count: 1,
      watchers_count: 2,
      size: 7074,
      created_at: "2025-04-04T23:44:39Z",
      updated_at: "2025-05-15T10:36:34Z",
      pushed_at: "2025-05-15T10:36:30Z",
      topics: ["portfolio", "nextjs", "typescript", "tailwindcss"],
      visibility: "public",
      fork: false,
      archived: false,
      disabled: false,
      default_branch: "main"
    },
    {
      id: 2,
      name: "ExpensesTracker-Frontend",
      full_name: "wisdomdzontoh/ExpensesTracker-Frontend",
      description: "A responsive web application for tracking personal and business expenses with interactive charts and analytics",
      html_url: "https://github.com/wisdomdzontoh/ExpensesTracker-Frontend",
      clone_url: "https://github.com/wisdomdzontoh/ExpensesTracker-Frontend.git",
      homepage: null,
      language: "TypeScript",
      languages_url: "https://api.github.com/repos/wisdomdzontoh/ExpensesTracker-Frontend/languages",
      stargazers_count: 1,
      forks_count: 0,
      watchers_count: 1,
      size: 440,
      created_at: "2025-04-19T20:47:56Z",
      updated_at: "2025-05-11T13:25:28Z",
      pushed_at: "2025-04-20T13:04:48Z",
      topics: ["expense-tracker", "react", "typescript", "finance"],
      visibility: "public",
      fork: false,
      archived: false,
      disabled: false,
      default_branch: "main"
    },
    {
      id: 3,
      name: "I-CAST_Voting_Platform_frontend",
      full_name: "wisdomdzontoh/I-CAST_Voting_Platform_frontend",
      description: "Frontend for I-Cast voting platform built with Next.js, enabling secure and transparent voting processes",
      html_url: "https://github.com/wisdomdzontoh/I-CAST_Voting_Platform_frontend",
      clone_url: "https://github.com/wisdomdzontoh/I-CAST_Voting_Platform_frontend.git",
      homepage: null,
      language: "TypeScript",
      languages_url: "https://api.github.com/repos/wisdomdzontoh/I-CAST_Voting_Platform_frontend/languages",
      stargazers_count: 1,
      forks_count: 0,
      watchers_count: 1,
      size: 463,
      created_at: "2024-11-02T21:38:20Z",
      updated_at: "2025-05-05T00:56:45Z",
      pushed_at: "2024-11-06T18:24:14Z",
      topics: ["voting", "nextjs", "typescript", "democracy"],
      visibility: "public",
      fork: false,
      archived: false,
      disabled: false,
      default_branch: "main"
    },
    {
      id: 4,
      name: "AI-assistant-bot-frontend",
      full_name: "wisdomdzontoh/AI-assistant-bot-frontend",
      description: "AI Chatbot SAAS application frontend - Create, train, and deploy custom chatbots with OpenAI integration",
      html_url: "https://github.com/wisdomdzontoh/AI-assistant-bot-frontend",
      clone_url: "https://github.com/wisdomdzontoh/AI-assistant-bot-frontend.git",
      homepage: "https://chatwise-ai.vercel.app",
      language: "TypeScript",
      languages_url: "https://api.github.com/repos/wisdomdzontoh/AI-assistant-bot-frontend/languages",
      stargazers_count: 3,
      forks_count: 1,
      watchers_count: 3,
      size: 1200,
      created_at: "2024-08-15T10:30:00Z",
      updated_at: "2025-05-10T15:20:00Z",
      pushed_at: "2025-05-10T15:20:00Z",
      topics: ["ai", "chatbot", "openai", "saas", "nextjs"],
      visibility: "public",
      fork: false,
      archived: false,
      disabled: false,
      default_branch: "main"
    },
    {
      id: 5,
      name: "dataviz-frontend",
      full_name: "wisdomdzontoh/dataviz-frontend",
      description: "Data visualization dashboard that enables users to create visualizations from CSV/Excel files or database connections",
      html_url: "https://github.com/wisdomdzontoh/dataviz-frontend",
      clone_url: "https://github.com/wisdomdzontoh/dataviz-frontend.git",
      homepage: null,
      language: "TypeScript",
      languages_url: "https://api.github.com/repos/wisdomdzontoh/dataviz-frontend/languages",
      stargazers_count: 2,
      forks_count: 0,
      watchers_count: 2,
      size: 890,
      created_at: "2024-09-20T14:15:00Z",
      updated_at: "2025-05-08T12:30:00Z",
      pushed_at: "2025-05-08T12:30:00Z",
      topics: ["data-visualization", "dashboard", "charts", "analytics"],
      visibility: "public",
      fork: false,
      archived: false,
      disabled: false,
      default_branch: "main"
    },
    {
      id: 6,
      name: "invoice-generator",
      full_name: "wisdomdzontoh/invoice-generator",
      description: "Automated invoice generation system that integrates with sevDesk API for streamlined billing processes",
      html_url: "https://github.com/wisdomdzontoh/invoice-generator",
      clone_url: "https://github.com/wisdomdzontoh/invoice-generator.git",
      homepage: null,
      language: "Python",
      languages_url: "https://api.github.com/repos/wisdomdzontoh/invoice-generator/languages",
      stargazers_count: 1,
      forks_count: 0,
      watchers_count: 1,
      size: 650,
      created_at: "2024-10-05T09:45:00Z",
      updated_at: "2025-05-12T11:20:00Z",
      pushed_at: "2025-05-12T11:20:00Z",
      topics: ["invoice", "automation", "python", "api-integration"],
      visibility: "public",
      fork: false,
      archived: false,
      disabled: false,
      default_branch: "main"
    }
  ]

  // Fetch repositories from GitHub API
  const fetchRepositories = async () => {
    try {
      setLoading(true)
      setError(null)
      setRateLimited(false)
      
      // Check cache first
      const cacheKey = `github-repos-${username}-${sortBy}-${maxRepos}`
      const cached = localStorage.getItem(cacheKey)
      const cacheTime = localStorage.getItem(`${cacheKey}-time`)
      
      // Use cache if it's less than 10 minutes old
      if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 10 * 60 * 1000) {
        console.log('Using cached GitHub data')
        const data = JSON.parse(cached)
        setRepos(data)
        setLoading(false)
        return
      }
      
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=${sortBy}&per_page=${maxRepos}&type=public`
      )
      
      if (!response.ok) {
        if (response.status === 403) {
          // Check if it's a rate limit error
          const errorData = await response.json().catch(() => ({}))
          if (errorData.message?.includes('rate limit') || errorData.message?.includes('API rate limit')) {
            setRateLimited(true)
            // Use fallback data instead of throwing error
            console.log('GitHub API rate limit exceeded, using fallback data')
            setRepos(fallbackRepos)
            setLoading(false)
            return
          }
        }
        
        // For other errors, also use fallback data as a graceful degradation
        if (response.status >= 500 || response.status === 429) {
          console.log('GitHub API error, using fallback data')
          setRateLimited(true)
          setRepos(fallbackRepos)
          setLoading(false)
          return
        }
        
        throw new Error(`Failed to fetch repositories: ${response.status}`)
      }
      
      const data: GitHubRepository[] = await response.json()
      
      // Filter out forks and archived repos, sort by stars
      const filteredRepos = data
        .filter(repo => !repo.fork && !repo.archived && !repo.disabled)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, maxRepos)
      
      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(filteredRepos))
      localStorage.setItem(`${cacheKey}-time`, Date.now().toString())
      
      setRepos(filteredRepos)
      
      // Fetch languages for each repository
      const languagePromises = filteredRepos.map(async (repo) => {
        try {
          const langResponse = await fetch(repo.languages_url)
          if (langResponse.ok) {
            const langData: GitHubLanguage = await langResponse.json()
            return { repoId: repo.id, languages: langData }
          }
        } catch (error) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, error)
        }
        return { repoId: repo.id, languages: {} }
      })
      
      const languageResults = await Promise.all(languagePromises)
      const languageMap: Record<string, GitHubLanguage> = {}
      languageResults.forEach(({ repoId, languages }) => {
        languageMap[repoId] = languages
      })
      
      setLanguages(languageMap)
    } catch (err) {
      console.error('Error fetching repositories:', err)
      // Use fallback data as graceful degradation
      setRateLimited(true)
      setRepos(fallbackRepos)
      setError(null) // Clear error since we're using fallback data
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [username, maxRepos, sortBy])

  // Test function to simulate rate limiting (for demonstration)
  const simulateRateLimit = () => {
    setRateLimited(true)
    setRepos(fallbackRepos)
    setLoading(false)
    setError(null)
  }

  // Get primary language for a repository
  const getPrimaryLanguage = (repoId: number): string | null => {
    const repoLanguages = languages[repoId]
    if (!repoLanguages || Object.keys(repoLanguages).length === 0) return null
    
    return Object.entries(repoLanguages)
      .sort(([,a], [,b]) => b - a)[0][0]
  }

  // Get all unique languages for filtering
  const getAllLanguages = (): string[] => {
    const allLangs = new Set<string>()
    Object.values(languages).forEach(langData => {
      Object.keys(langData).forEach(lang => allLangs.add(lang))
    })
    return Array.from(allLangs).sort()
  }

  // Filter repositories by language
  const filteredRepos = filter 
    ? repos.filter(repo => {
        const repoLanguages = languages[repo.id]
        return repoLanguages && Object.keys(repoLanguages).includes(filter)
      })
    : repos

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Format number with K suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
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

  const allLanguages = getAllLanguages()

  if (loading) {
    return (
      <section id="github-repos" className="section-container py-20 bg-background/50 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              GitHub Repositories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Open Source Projects</h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
            <p className="max-w-2xl text-muted-foreground text-lg">
              A collection of my public repositories showcasing various technologies and projects.
            </p>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading repositories...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="github-repos" className="section-container py-20 bg-background/50 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              GitHub Repositories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Open Source Projects</h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
            <p className="max-w-2xl text-muted-foreground text-lg">
              A collection of my public repositories showcasing various technologies and projects.
            </p>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <h3 className="text-xl font-semibold">
                {rateLimited ? 'API Rate Limit Exceeded' : 'Failed to Load Repositories'}
              </h3>
              <p className="text-muted-foreground max-w-md">{error}</p>
              {rateLimited ? (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    GitHub API has a rate limit of 60 requests per hour for unauthenticated requests.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please wait a while before trying again, or visit my GitHub profile directly:
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <a
                      href={`https://github.com/${username}?tab=repositories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github size={16} />
                      <span>View on GitHub</span>
                      <ExternalLink size={16} />
                    </a>
                  </Button>
                </div>
              ) : (
                <Button onClick={fetchRepositories} variant="outline" className="mt-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github-repos" className="section-container py-20 bg-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            GitHub Repositories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Open Source Projects</h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="max-w-2xl text-muted-foreground text-lg">
            A collection of my public repositories showcasing various technologies and projects. 
            Auto-updated whenever I push new code.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
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
              All Languages
            </Badge>
            {allLanguages.slice(0, 8).map((lang, index) => (
              <Badge
                key={index}
                variant={filter === lang ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer",
                  filter === lang
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20",
                )}
                onClick={() => setFilter(lang)}
              >
                {lang}
              </Badge>
            ))}
            {allLanguages.length > 8 && (
              <Badge variant="outline" className="text-muted-foreground">
                +{allLanguages.length - 8} more
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant={sortBy === 'updated' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('updated')}
            >
              Recently Updated
            </Button>
            <Button
              variant={sortBy === 'stars' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('stars')}
            >
              Most Stars
            </Button>
            <Button
              variant={sortBy === 'created' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('created')}
            >
              Newest
            </Button>
          </div>
        </div>

        {/* Test Rate Limit Button (for demonstration) */}
        {!rateLimited && (
          <div className="mb-4 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={simulateRateLimit}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Test Rate Limit Fallback
            </Button>
          </div>
        )}

        {/* Rate Limit Notice */}
        {rateLimited && (
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    GitHub API Rate Limit Reached
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Showing cached/fallback repository data. The GitHub API allows 60 requests per hour for unauthenticated access.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setRateLimited(false)
                        fetchRepositories()
                      }}
                      className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-600 dark:hover:bg-amber-900/30"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Try Again
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-600 dark:hover:bg-amber-900/30"
                    >
                      <a
                        href={`https://github.com/${username}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Repositories Grid */}
        {filteredRepos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No repositories found.</p>
            <p className="text-muted-foreground text-sm mt-2">
              {filter ? `No repositories found for language: ${filter}` : 'No public repositories available.'}
            </p>
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRepos.map((repo, index) => {
            const primaryLang = getPrimaryLanguage(repo.id)
            const repoLanguages = languages[repo.id] || {}
            
            return (
              <motion.div key={repo.id} variants={itemVariants}>
                <Card
                  className={cn(
                    "overflow-hidden transition-all duration-300 border-border/50 bg-card h-full flex flex-col",
                    hoveredIndex === index
                      ? "transform scale-[1.02] shadow-xl border-primary/20"
                      : "transform scale-100 shadow-md",
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg text-primary truncate">
                          {repo.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-1">
                          {repo.description || "No description available"}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span className="text-sm">{formatNumber(repo.stargazers_count)}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-2 flex-grow">
                    {/* Language and Stats */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {primaryLang && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            <Code className="h-3 w-3 mr-1" />
                            {primaryLang}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          <span>{formatNumber(repo.forks_count)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{formatNumber(repo.watchers_count)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Languages */}
                    {Object.keys(repoLanguages).length > 1 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {Object.keys(repoLanguages)
                          .slice(0, 3)
                          .filter(lang => lang !== primaryLang)
                          .map((lang, langIndex) => (
                            <Badge
                              key={langIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {lang}
                            </Badge>
                          ))}
                        {Object.keys(repoLanguages).length > 4 && (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            +{Object.keys(repoLanguages).length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Last Updated */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Updated {formatDate(repo.updated_at)}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-2">
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </a>
                    </Button>

                    {repo.homepage && (
                      <Button asChild variant="default" size="sm">
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
          </motion.div>
        )}

        {/* Show more button if there are more repos */}
        {repos.length >= maxRepos && (
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <a
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github size={16} />
                <span>View All Repositories on GitHub</span>
                <ExternalLink size={16} />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default GitHubRepos
