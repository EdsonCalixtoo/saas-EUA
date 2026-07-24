"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function StatsSection() {
  const stats = [
    { value: "120.000+", label: "Imóveis cadastrados" },
    { value: "35.000+", label: "Clientes ativos" },
    { value: "R$ 8 bi", label: "Em negociações" },
    { value: "1.200+", label: "Imobiliárias parceiras" },
    { value: "98%", label: "Clientes satisfeitos" },
  ]

  return (
    <section id="estatisticas" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-4 pt-6 md:pt-4"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
