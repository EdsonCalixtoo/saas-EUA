"use client"

import * as React from "react"
import { Image } from "@/components/ui/image"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { testimonialsData } from "@/lib/mock-data/landing"

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-200/50">
            Histórias de Sucesso
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quem usa e aprova o PropFlow
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl">
            Veja como nossa tecnologia está transformando a experiência de comprar, vender e gerenciar imóveis.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between p-6 rounded-3xl bg-[#F8F9FC] dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 shadow-2xs relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-indigo-200 dark:text-indigo-900/40" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-4 border-t border-slate-200/60 dark:border-slate-800">
                <div className="relative h-11 w-11 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {t.author}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
