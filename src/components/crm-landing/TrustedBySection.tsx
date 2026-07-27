"use client"

import * as React from "react"
import { motion } from "framer-motion"

const companies = [
  "Luxe Estates",
  "Prime Realty Group",
  "Urban Living",
  "Horizon Brokers",
  "Oasis Properties",
  "Pinnacle Real Estate",
]

export function TrustedBySection() {
  return (
    <section className="py-12 border-b border-border/20 bg-transparent">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by top real estate agencies across the United States.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-xl md:text-2xl font-bold font-serif tracking-tight text-[#0F172A] dark:text-white"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
