"use client"

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation"
import { motion } from "framer-motion"
import VideoIntro from "@/app/components/video-intro"
import PortfolioDownload from "@/app/components/portfolio-download"

export default function PortfolioIntro() {
  const { ref, isVisible } = useScrollAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="py-16 bg-background/50 relative overflow-hidden">
      {/* Background visual effects */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Video Section */}
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <VideoIntro
              videoUrl="/assets/portfolio-intro.mp4"
              thumbnailUrl="/assets/video-thumbnail.png"
              title="Watch My Portfolio Introduction"
              duration="2:15"
            />
          </motion.div>

          {/* Text and Download Section */}
          <motion.div variants={itemVariants} className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold">Let Me Introduce Myself</h2>

            <p className="text-muted-foreground leading-relaxed">
              I'm a Full-Stack Developer with a passion for creating robust, scalable applications that solve
              real-world problems. With expertise in backend development, API integrations, and data automation,
              I bring a unique blend of technical skills and business understanding to every project.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Watch my introduction video to learn more about my approach to software development, or download
              my comprehensive portfolio PDF for a detailed overview of my projects and skills.
            </p>

            {/* 📥 Download Button */}
            <div className="pt-4">
              <PortfolioDownload
                googleDriveFileId="1watZAeRuLBZeCcoAMfuefS_wVUV7I9vt" // Replace with your real file ID if needed
                title="Download My Portfolio"
                description="Get a comprehensive overview of my projects, skills, and experience in a downloadable PDF format."
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
