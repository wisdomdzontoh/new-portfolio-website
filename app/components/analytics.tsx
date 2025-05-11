"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would add your analytics tracking code
    // For example, Google Analytics or Plausible
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

    // Example: Track page view
    console.log(`Page viewed: ${url}`)

    // You would typically call your analytics service here
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: url })
  }, [pathname, searchParams])

  return null
}
