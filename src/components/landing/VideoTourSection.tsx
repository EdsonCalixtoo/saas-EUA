"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play, Sparkles, ShieldCheck, Video, X } from "lucide-react"
import { videoTourFeatured } from "@/lib/mock-data/landing"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function VideoTourSection() {
  const [isPlayingModalOpen, setIsPlayingModalOpen] = React.useState(false)

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-purple-400 bg-purple-950/60 px-4 py-1.5 rounded-full border border-purple-800/60">
            <Video className="h-3.5 w-3.5" />
            Vídeos 4K & Tour Virtual 360°
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Sinta a experiência de estar dentro dos melhores imóveis
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl">
            Tours cinematográficos gravados em 4K com narração inteligente e navegação interativa em 360 graus.
          </p>
        </div>

        {/* Big Video Card Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group max-w-5xl mx-auto"
        >
          <div className="relative h-[380px] sm:h-[480px] w-full">
            {/* Background HTML5 Video Loop */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              poster={videoTourFeatured.poster}
            >
              <source src={videoTourFeatured.videoUrl} type="video/mp4" />
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <button
                onClick={() => setIsPlayingModalOpen(true)}
                className="relative group/play flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/90 hover:bg-white text-indigo-600 shadow-2xl shadow-indigo-500/50 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Assistir Vídeo"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current ml-1" />
              </button>

              <div className="flex flex-col items-center gap-1 mt-2">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Assistir Tour Completo em 4K
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Imóvel Verificado • Mansão Alphaville
                </span>
              </div>
            </div>

            {/* Top Right HD Badge */}
            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Ultra HD 4K
            </div>
          </div>
        </motion.div>

      </div>

      {/* Video Player Modal */}
      <Dialog open={isPlayingModalOpen} onOpenChange={setIsPlayingModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-slate-950 border-slate-800 rounded-3xl overflow-hidden">
          <div className="relative aspect-video w-full">
            {isPlayingModalOpen && (
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                <source src={videoTourFeatured.videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
