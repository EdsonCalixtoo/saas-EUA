"use client"

import * as React from "react"
import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { ShoppingBag, Tag, UserCheck, Building2, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PersonaCardsSection() {
  const personas = [
    {
      id: "comprar",
      icon: ShoppingBag,
      title: "Comprar",
      description: "Encontre imóveis exclusivos de alto padrão com busca por inteligência artificial e curadoria personalizada.",
      buttonText: "Ver Imóveis à Venda",
      href: "/properties",
      badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
    },
    {
      id: "vender",
      icon: Tag,
      title: "Vender",
      description: "Anuncie seu imóvel com visibilidade nacional, avaliação com IA e receba propostas diretas de compradores qualificados.",
      buttonText: "Anunciar meu Imóvel",
      href: "/properties",
      badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    },
    {
      id: "corretores",
      icon: UserCheck,
      title: "Corretores",
      description: "Acelere seu trabalho com CRM integrado, discador automático de chamadas, WhatsApp e automações de email/SMS.",
      buttonText: "Painel do Corretor",
      href: "/crm",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
    },
    {
      id: "imobiliarias",
      icon: Building2,
      title: "Imobiliárias",
      description: "Gestão completa de equipe, relatórios avançados de analytics, funil de vendas e assinatura digital centralizada.",
      buttonText: "Soluções Corporativas",
      href: "/analytics",
      badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
    },
  ]

  return (
    <section id="personas" className="py-20 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1 rounded-full border border-indigo-200/50">
            Para Todo o Ecossistema
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Soluções sob medida para você
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl">
            Tecnologia desenvolvida para conectar compradores, proprietários, corretores e imobiliárias em uma só plataforma.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p, idx) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200"
              >
                <div className="flex flex-col gap-4">
                  <div className={`h-12 w-12 rounded-2xl ${p.badgeColor} flex items-center justify-center shrink-0`}>
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-sm font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link href={p.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between font-bold text-sm text-slate-800 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-0 h-10 px-3"
                    >
                      <span>{p.buttonText}</span>
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
