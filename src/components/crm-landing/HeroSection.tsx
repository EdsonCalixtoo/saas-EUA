"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, CheckCircle2, Bot, PhoneCall, BarChart3, Mail, MessageSquare, Calendar, Users, MapPin, Search } from "lucide-react"

const badges = [
  "AI Powered",
  "MLS Ready",
  "CRM",
  "Marketing Automation",
  "Email Campaigns",
  "SMS Campaigns",
  "Calling System",
  "Analytics",
]

export function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-transparent -z-20" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#2563EB]/20 to-[#7C3AED]/20 blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-[#10B981]/10 to-[#2563EB]/20 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-white/5 border border-border text-sm font-medium text-[#0F172A] dark:text-gray-300 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#2563EB] animate-pulse"></span>
            PropFlow CRM 2.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.1] mb-6">
            The smartest CRM for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">modern real estate teams.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-light">
            Manage leads, automate follow-ups, close more deals and grow your business using AI-powered workflows, marketing automation and a complete real estate CRM.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="h-14 px-8 rounded-full bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-semibold text-lg hover:bg-[#2563EB] dark:hover:bg-[#2563EB] dark:hover:text-white transition-all shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5">
              Start Free
            </button>
            <button className="h-14 px-8 rounded-full bg-white dark:bg-white/5 border border-border text-[#0F172A] dark:text-white font-semibold text-lg hover:bg-[#F8FAFC] dark:hover:bg-white/10 transition-all">
              Book a Demo
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-[#F59E0B]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#0F172A] dark:text-white">4.9/5</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by 10,000+ real estate professionals.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F8FAFC] dark:bg-white/5 border border-border text-xs font-medium text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Dashboard Composition */}
        <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
          <motion.div
            initial={{ opacity: 0, rotateY: 15, rotateX: 10, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 preserve-3d"
          >
            {/* Main CRM Dashboard Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-10 right-0 w-[550px] h-[380px] rounded-2xl bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Fake Dashboard Header */}
              <div className="h-12 border-b border-border/50 flex items-center px-4 gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 h-6 bg-muted/50 rounded-md" />
              </div>
              <div className="p-4 grid grid-cols-4 gap-4 h-full">
                {/* Sidebar */}
                <div className="col-span-1 flex flex-col gap-3">
                  <div className="h-8 bg-muted/50 rounded-md" />
                  <div className="h-8 bg-muted/50 rounded-md w-3/4" />
                  <div className="h-8 bg-muted/50 rounded-md w-5/6" />
                  <div className="h-8 bg-muted/50 rounded-md" />
                  <div className="h-8 bg-[#2563EB]/10 rounded-md border border-[#2563EB]/20 mt-auto mb-10" />
                </div>
                {/* Main Content */}
                <div className="col-span-3 flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-muted/50 rounded-xl" />
                    <div className="h-20 bg-muted/50 rounded-xl" />
                    <div className="h-20 bg-[#10B981]/10 rounded-xl border border-[#10B981]/20" />
                  </div>
                  <div className="flex-1 bg-muted/30 rounded-xl border border-border/50 p-3">
                    <div className="w-full h-full bg-gradient-to-t from-muted/50 to-transparent rounded-lg flex items-end gap-2 p-2">
                       {/* Fake chart bars */}
                       {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                         <div key={i} className="flex-1 bg-[#2563EB] rounded-t-sm opacity-80" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1 - AI Assistant */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-10 top-20 w-64 p-4 rounded-xl bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">AI Copilot</div>
                  <div className="text-xs text-muted-foreground">Drafting email response...</div>
                </div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] w-2/3" />
              </div>
            </motion.div>

            {/* Floating Card 2 - Lead Notification */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-[-20px] bottom-32 w-72 p-4 rounded-xl bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">New Hot Lead 🔥</div>
                  <div className="text-xs text-muted-foreground mt-1">Sarah Jenkins wants to view property #142 in Beverly Hills.</div>
                  <button className="mt-2 text-xs font-semibold px-3 py-1 bg-[#2563EB] text-white rounded-md">
                    Call Now
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Card 3 - Pipeline */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }}
              className="absolute left-10 bottom-10 w-56 p-3 rounded-xl bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl"
            >
              <div className="flex justify-between items-center mb-3">
                 <span className="text-xs font-bold">Smart Pipeline</span>
                 <BarChart3 className="w-4 h-4 text-[#7C3AED]" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">New</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Qualified</span>
                  <span className="font-semibold text-[#2563EB]">12</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Showing</span>
                  <span className="font-semibold text-[#7C3AED]">8</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Closing</span>
                  <span className="font-semibold text-[#10B981]">3</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
