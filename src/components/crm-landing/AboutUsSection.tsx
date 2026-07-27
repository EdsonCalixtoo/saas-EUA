"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

export function AboutUsSection() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: "10,000+", label: "Clients" },
    { value: "250+", label: "Companies" },
    { value: "2M+", label: "Leads Managed" },
    { value: "$5B+", label: "In Transactions" },
    { value: "99.9%", label: "Uptime" },
  ]

  return (
    <section id="about" className="py-32 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 right-[-20%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-[#10B981]/10 to-[#2563EB]/10 blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-8"
          >
            Helping real estate professionals <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#10B981]">sell smarter.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed mb-20"
          >
            PropFlow was created to transform real estate management. We believe that technology, artificial intelligence, and automation should empower agents, not replace them. Our mission is to build the most sophisticated, intuitive tools so you can focus on what matters most: building relationships and closing deals.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-border/50 py-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-4xl font-extrabold text-[#0F172A] dark:text-white mb-2 tracking-tighter"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
