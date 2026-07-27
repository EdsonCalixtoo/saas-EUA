"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function FinalCtaSection() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1e1b4b] to-[#0F172A] -z-20" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#2563EB]/40 to-[#7C3AED]/40 blur-[120px] -z-10"
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-8 leading-tight">
            Ready to grow your real estate business?
          </h2>
          <p className="text-xl text-slate-300 mb-12 font-light">
            Join thousands of top-performing agents and brokerages who use PropFlow to automate their workflows and close more deals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="h-14 px-8 rounded-full bg-white text-[#0F172A] font-bold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Start Free Trial
            </button>
            <button className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
