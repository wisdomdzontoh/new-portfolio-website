"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type PortfolioDownloadProps = {
  googleDriveFileId: string
  title?: string
  description?: string
}

export default function PortfolioDownload({
  googleDriveFileId,
  title = "Download My Portfolio",
  description = "Get a comprehensive overview of my projects, skills, and experience in a downloadable PDF format.",
}: PortfolioDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    setTimeout(() => {
      setIsDownloading(false)
      setIsDownloaded(true)

      // Reset download state after 3 seconds
      setTimeout(() => {
        setIsDownloaded(false)
      }, 3000)

      // Construct Google Drive direct download URL
      const directDownloadUrl = `https://drive.google.com/uc?export=download&id=1watZAeRuLBZeCcoAMfuefS_wVUV7I9vt`

      // Create and trigger the download link
      const link = document.createElement("a")
      link.href = directDownloadUrl
      link.setAttribute("download", "portfolio.pdf")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1500)
  }

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <FileText className="text-primary" size={24} />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>

          <AnimatePresence mode="wait">
            {isDownloaded ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center text-green-500 gap-2"
              >
                <CheckCircle size={18} />
                <span>Downloaded successfully!</span>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Button onClick={handleDownload} disabled={isDownloading} className="rounded-full">
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={16} className="mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
