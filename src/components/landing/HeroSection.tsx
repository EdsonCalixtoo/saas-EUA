"use client"

import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Image } from "@/components/ui/image"
import { motion } from "framer-motion"
import {
  Search,
  PlusCircle,
  Star,
  CheckCircle2,
  TrendingUp,
  PhoneCall,
  MessageSquare,
  MapPin,
  Bot,
  Layers,
  Sparkles,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const badges = [
    { icon: Bot, label: "IA Integrada" },
    { icon: Users, label: "CRM" },
    { icon: MessageSquare, label: "WhatsApp" },
    { icon: Layers, label: "Assinatura Digital" },
    { icon: MapPin, label: "Mapa Interativo" },
  ]

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-blue-500/15 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ─── LEFT COLUMN ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col gap-8 text-left"
          >
            {/* Top Pill Announcement */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-slate-900/5 dark:bg-white/10 px-4 py-1.5 border border-slate-200/80 dark:border-white/15 shadow-2xs backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide flex items-center gap-1">
                Nova versão PropFlow AI 3.0 disponível
                <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Encontre, anuncie e venda imóveis com{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                inteligência.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              A plataforma completa para compradores, vendedores, corretores e imobiliárias. Busca inteligente, CRM, automações, mapas, IA e gestão completa em um único lugar.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="#buscar">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base h-13 px-8 rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5">
                  <Search className="h-5 w-5 stroke-[2.5]" />
                  <span>Encontrar Imóveis</span>
                </Button>
              </a>

              <a href="#diferenciais">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-13 px-7 rounded-2xl font-bold text-base text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5"
                >
                  <PlusCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 stroke-[2.2]" />
                  <span>Anunciar Imóvel</span>
                </Button>
              </a>
            </div>

            {/* Ratings & Trust Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span>Mais de <strong>15.000</strong> imóveis cadastrados</span>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">98% de satisfação</span>
              </div>
            </div>

            {/* Small Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {badges.map((b) => {
                const Icon = b.icon
                return (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-900/80 px-3 py-1.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{b.label}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>


          {/* ─── RIGHT COLUMN (SHOWCASE COMPOSITION) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Main Glassmorphism Frame */}
            <div className="relative rounded-[32px] p-6 lg:p-8 bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800/80 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden min-h-[520px] flex flex-col justify-between">

              {/* Decorative Header Bar inside Frame */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/50 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="text-xs font-bold text-slate-400 ml-2">PropFlow OS • CRM & Analytics</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/50">
                  ● Sistema Ativo
                </span>
              </div>

              {/* Central Property & Analytics Composition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                
                {/* Property Card Mock */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl bg-white dark:bg-slate-950 p-3.5 border border-slate-100 dark:border-slate-800 shadow-md flex flex-col gap-3"
                >
                  <div className="relative h-36 w-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80"
                      alt="Property Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      R$ 4.850.000
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      Mansão Alphaville Luxo
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <MapPin className="h-3 w-3 text-indigo-500" />
                      São Paulo - SP
                    </span>
                  </div>
                </motion.div>

                {/* Mini Analytics Chart Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl bg-white dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-800 shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Receita Mensal</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" /> +42%
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    $186,500
                  </span>
                  
                  {/* Decorative Mini Sparkline */}
                  <div className="h-14 w-full mt-3 flex items-end gap-1">
                    {[35, 45, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ─── FLOATING GLASS CARDS (Parallax & Hover) ─── */}

              {/* Floating Card 1: Active Call (Dialer) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 sm:top-6 sm:right-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-3.5 shadow-xl backdrop-blur-xl flex items-center gap-3 z-20 max-w-[240px]"
              >
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Sarah Williams
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Chamada Ativa 01:32
                  </span>
                </div>
              </motion.div>

              {/* Floating Card 2: CRM Lead Notification */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-3.5 shadow-xl backdrop-blur-xl flex items-center gap-3 z-20 max-w-[260px]"
              >
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Novo Lead Qualificado IA
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Robert Johnson • $5.000 Deal
                  </span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
