// GitHub API Types
export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  homepage: string | null
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  size: number
  created_at: string
  updated_at: string
  pushed_at: string
  topics: string[]
  visibility: 'public' | 'private'
  fork: boolean
  archived: boolean
  disabled: boolean
  default_branch: string
}

export interface GitHubLanguage {
  [key: string]: number
}

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}
