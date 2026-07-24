"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Bot,
  MapPin,
  Users,
  MessageSquare,
  Mail,
  Send,
  BarChart3,
  FileCheck,
  CreditCard,
  Zap,
} from "lucide-react"

export function DifferentialsSection() {
  const differentials = [
    {
      icon: Bot,
      title: "Inteligência Artificial",
      description: "Recomendação preditiva de imóveis e qualificação automática de leads 24/7.",
      color: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60",
    },
    {
      icon: MapPin,
      title: "Busca por Mapa",
      description: "Exploração geográfica interativa com raio de busca e marcação de pontos de interesse.",
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60",
    },
    {
      icon: Users,
      title: "CRM Integrado",
      description: "Gestão completa do pipeline de vendas, tarefas e histórico em quadros Kanban.",
      color: "text-[#00965e] dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Integrado",
      description: "Conversas sincronizadas, respostas automáticas e disparos diretos de propostas.",
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Campanhas de e-mail personalizadas com rastreamento de aberturas e cliques.",
      color: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60",
    },
    {
      icon: Send,
      title: "SMS Marketing",
      description: "Notificações e avisos urgentes com taxa de entrega superior a 98%.",
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60",
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Métricas detalhadas de faturamento, chamadas, conversão e desempenho da equipe.",
      color: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60",
    },
    {
      icon: FileCheck,
      title: "Assinatura Digital",
      description: "Contratos de compra, venda e locação com validade jurídica e assinatura online.",
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60",
    },
    {
      icon: CreditCard,
      title: "Pagamentos Seguros",
      description: "Recebimento de reserva, taxa de corretagem e split de comissões automatizado.",
      color: "text-[#00965e] dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60",
    },
    {
      icon: Zap,
      title: "Automações Inteligentes",
      description: "Gatilhos de follow-up, mudança de status e avisos sem necessidade de código.",
      color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60",
    },
  ]

  return (
    <section id="diferenciais" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1 rounded-full border border-purple-200/50">
            Diferenciais Exclusivos
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tudo o que seu negócio imobiliário precisa
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl">
            Substitua dezenas de ferramentas isoladas por um ecossistema completo e conectado.
          </p>
        </div>

        {/* 10 Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {differentials.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md"
              >
                <div className={`h-11 w-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                  <Icon className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {item.title}
                </h3>
                <p className="text-xs font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
