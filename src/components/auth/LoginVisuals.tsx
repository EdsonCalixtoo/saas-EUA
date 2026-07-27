"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BarChart3, Bot, MapPin, Mail, MessageSquare, PhoneCall, CheckCircle2 } from "lucide-react"

export function LoginVisuals() {
  return (
    <div className="relative w-full h-full bg-[#0F172A] overflow-hidden hidden lg:flex items-center justify-center">
      {/* Background Abstract Shapes & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0F172A] to-[#0B1120]"></div>
      
      {/* Dynamic Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#2563EB]/20 to-[#7C3AED]/20 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-[#10B981]/10 to-[#2563EB]/10 blur-[100px] rounded-full"
      />
      
      {/* Geometric Lines / Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Floating 3D Composition */}
      <div className="relative w-full max-w-2xl h-[600px] perspective-1000">
        <motion.div
          initial={{ opacity: 0, rotateY: 15, rotateX: 10, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 preserve-3d"
        >
          {/* Main CRM Dashboard Card */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] w-[450px] h-[320px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="h-10 border-b border-white/5 flex items-center px-4 gap-3 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="h-3 w-32 bg-white/10 rounded-full" />
            </div>
            <div className="p-5 flex gap-4 h-[calc(100%-40px)]">
              {/* Sidebar Skeleton */}
              <div className="w-1/4 flex flex-col gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-6 bg-white/5 rounded-md w-full" />
                ))}
                <div className="mt-auto h-8 bg-[#2563EB]/20 rounded-md" />
              </div>
              {/* Main Content Skeleton */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="flex-1 h-16 bg-white/5 rounded-lg border border-white/5 flex items-center p-3">
                     <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                       <BarChart3 className="w-4 h-4" />
                     </div>
                     <div className="ml-3 space-y-1.5">
                       <div className="h-2 w-16 bg-white/20 rounded-full" />
                       <div className="h-2 w-10 bg-white/10 rounded-full" />
                     </div>
                  </div>
                  <div className="flex-1 h-16 bg-white/5 rounded-lg border border-white/5" />
                </div>
                <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3 flex items-end gap-2">
                   {[40, 70, 45, 90, 65, 100].map((h, i) => (
                     <div key={i} className="flex-1 bg-gradient-to-t from-[#2563EB] to-transparent rounded-t-sm opacity-60" style={{ height: `${h}%` }} />
                   ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating AI Assistant */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="absolute -right-10 top-[20%] w-64 p-4 rounded-xl bg-[#0B1120]/80 backdrop-blur-md border border-[#7C3AED]/30 shadow-[0_0_40px_rgba(124,58,237,0.15)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">AI Copilot</div>
                <div className="text-xs text-slate-400">Qualifying new lead...</div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] w-3/4 animate-pulse" />
            </div>
          </motion.div>

          {/* Floating Pipeline Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }}
            className="absolute left-[-20px] bottom-[25%] w-72 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl"
          >
            <div className="text-sm font-bold text-white mb-4 flex justify-between items-center">
              <span>Hot Leads</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981]">3 New</span>
            </div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-slate-700" />
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-white/20 rounded-full mb-1.5" />
                    <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
