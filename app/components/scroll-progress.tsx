"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const calculateScrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (scrollPx / winHeightPx) * 100
    setScrollProgress(scrolled)
  }

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollProgress)
    return () => window.removeEventListener("scroll", calculateScrollProgress)
  }, [])

  return <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
}
