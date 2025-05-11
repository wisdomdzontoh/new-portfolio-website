"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, X, Volume2, VolumeX } from "lucide-react"

type VideoIntroProps = {
  videoUrl: string
  thumbnailUrl: string
  title: string
  duration: string
}

export default function VideoIntro({ videoUrl, thumbnailUrl, title, duration }: VideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const openVideo = () => {
    setIsOpen(true)
  }

  const closeVideo = () => {
    setIsOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <div
        className="relative group cursor-pointer rounded-xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={openVideo}
      >
        <div className="aspect-video relative">
          <img
            src={thumbnailUrl || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
              <Play size={30} className="ml-1" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-white/80 text-sm">{duration}</p>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-card border border-border rounded-xl shadow-xl max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="aspect-video rounded-t-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    poster={thumbnailUrl}
                    className="w-full h-full object-cover"
                    onClick={togglePlay}
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-white"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>

                    <div className="text-white text-sm">{title}</div>
                  </div>
                </div>

                <button
                  onClick={closeVideo}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
