"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Users, Filter, BarChart3, Building, Bot, PhoneCall, MessageSquare, Mail, LineChart, Calendar, ShieldCheck, Zap } from "lucide-react"

const products = [
  {
    title: "CRM",
    description: "Manage every client from first contact to closing.",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Lead Management",
    description: "Capture, organize and qualify leads automatically.",
    icon: Filter,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Smart Pipeline",
    description: "Drag and drop opportunities through every stage.",
    icon: BarChart3,
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "Property Management",
    description: "Manage listings, images, documents and availability.",
    icon: Building,
    color: "from-orange-400 to-red-500",
  },
  {
    title: "AI Assistant",
    description: "Automate repetitive tasks and improve conversions using AI.",
    icon: Bot,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Dialer",
    description: "Call leads directly from the CRM.",
    icon: PhoneCall,
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "SMS Marketing",
    description: "Create personalized campaigns.",
    icon: MessageSquare,
    color: "from-green-400 to-emerald-600",
  },
  {
    title: "Email Marketing",
    description: "Professional email campaigns with automation.",
    icon: Mail,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Analytics",
    description: "Revenue, commissions, conversion rates and team performance.",
    icon: LineChart,
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "Calendar",
    description: "Appointments, meetings and reminders.",
    icon: Calendar,
    color: "from-rose-400 to-pink-600",
  },
  {
    title: "Team Management",
    description: "Control permissions and monitor agent performance.",
    icon: ShieldCheck,
    color: "from-slate-500 to-gray-700",
  },
  {
    title: "Automation",
    description: "Create workflows without coding.",
    icon: Zap,
    color: "from-amber-400 to-yellow-600",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#2563EB]/5 to-transparent rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-6">
            Everything you need to close more deals.
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete ecosystem of tools designed specifically for high-performing real estate professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => {
            const Icon = product.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-border hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-1"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 from-[#2563EB] to-[#7C3AED]" />
                
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${product.color} text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2 group-hover:text-[#2563EB] dark:group-hover:text-[#2563EB] transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
