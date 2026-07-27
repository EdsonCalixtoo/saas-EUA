"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingUp, Clock, Users2, Rocket } from "lucide-react"

const benefits = [
  {
    title: "Increase Sales",
    description: "Convert more leads into clients with smart routing, follow-up reminders, and AI-driven insights that tell you who to call next.",
    icon: TrendingUp,
  },
  {
    title: "Save Time",
    description: "Automate repetitive processes like email drips, task assignments, and data entry, giving you hours back every week.",
    icon: Clock,
  },
  {
    title: "Better Team Collaboration",
    description: "Keep everything centralized. Share notes, assign leads, and monitor team pipelines from a single, unified workspace.",
    icon: Users2,
  },
  {
    title: "Grow Faster",
    description: "Scale your brokerage efficiently with predictable systems, advanced reporting, and tools built for high volume.",
    icon: Rocket,
  },
]

export function BenefitsSection() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-6">
              Why top teams choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">PropFlow</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              We built our platform from the ground up to solve the most painful problems real estate professionals face every day.
            </p>
            
            <div className="space-y-10">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-border flex items-center justify-center text-[#2563EB]">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] w-full rounded-3xl bg-gradient-to-tr from-[#F8FAFC] to-white dark:from-white/5 dark:to-transparent border border-border flex items-center justify-center overflow-hidden shadow-2xl"
          >
             {/* Minimalist abstract illustration for benefits */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="w-[400px] h-[400px] rounded-full border border-[#2563EB]/20 border-dashed absolute"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="w-[250px] h-[250px] rounded-full border border-[#7C3AED]/30 border-dashed absolute"
             />
             
             <div className="relative z-10 w-24 h-24 rounded-2xl bg-white dark:bg-[#0F172A] border border-border shadow-2xl flex items-center justify-center text-[#2563EB]">
               <Rocket className="w-12 h-12" />
             </div>

             {/* Floating mini cards */}
             <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 left-1/4 w-32 h-12 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 flex items-center px-3 gap-2"
             >
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <div className="h-2 w-16 bg-muted rounded-full" />
             </motion.div>

             <motion.div 
               animate={{ y: [10, -10, 10] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-1/4 right-1/4 w-40 h-16 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 flex items-center px-3 gap-3"
             >
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7C3AED]" />
               <div className="space-y-2">
                 <div className="h-2 w-20 bg-muted rounded-full" />
                 <div className="h-2 w-12 bg-muted rounded-full" />
               </div>
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
