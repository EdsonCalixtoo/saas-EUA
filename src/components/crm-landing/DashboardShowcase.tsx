"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LayoutDashboard, Users, Calendar, BarChart3, Settings, Mail, MessageSquare } from "lucide-react"

export function DashboardShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])

  return (
    <section ref={containerRef} className="py-32 bg-transparent relative overflow-hidden flex items-center justify-center min-h-[120vh]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#2563EB]/20 to-[#7C3AED]/20 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            A command center for your entire business.
          </h2>
          <p className="text-lg text-slate-300">
            Say goodbye to clunky interfaces. PropFlow offers a stunning, lightning-fast dashboard that you and your team will actually love using.
          </p>
        </div>

        <motion.div 
          style={{ y, opacity, scale }}
          className="w-full max-w-6xl aspect-[16/10] rounded-2xl bg-[#0B1120] border border-slate-800 shadow-[0_0_100px_rgba(37,99,235,0.2)] overflow-hidden flex"
        >
          {/* Sidebar */}
          <div className="w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <div className="w-4 h-4 text-white font-bold text-xs">PF</div>
              </div>
              <span className="text-white font-bold text-lg">PropFlow</span>
            </div>
            
            <nav className="space-y-1 flex-1">
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: Users, label: "Leads CRM" },
                { icon: BarChart3, label: "Pipeline" },
                { icon: Mail, label: "Email Marketing" },
                { icon: MessageSquare, label: "SMS Campaigns" },
                { icon: Calendar, label: "Calendar" },
                { icon: Settings, label: "Settings" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      item.active ? "bg-[#2563EB]/10 text-[#2563EB]" : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </div>
                )
              })}
            </nav>
            
            <div className="mt-auto flex items-center gap-3 px-3 py-2 border-t border-slate-800 pt-4">
              <div className="w-8 h-8 rounded-full bg-slate-700" />
              <div>
                <div className="text-sm text-white font-medium">Alex Broker</div>
                <div className="text-xs text-slate-500">Pro Plan</div>
              </div>
            </div>
          </div>
          
          {/* Main Area */}
          <div className="flex-1 bg-[#0B1120] p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Overview</h1>
              <div className="flex gap-3">
                <div className="h-9 w-64 bg-slate-800/50 rounded-lg border border-slate-700" />
                <div className="h-9 px-4 bg-[#2563EB] text-white rounded-lg flex items-center justify-center text-sm font-medium">
                  Add Lead
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Revenue", value: "$425,000", trend: "+12%" },
                { label: "Active Deals", value: "48", trend: "+4%" },
                { label: "Conversion Rate", value: "8.4%", trend: "-1%" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#0F172A] border border-slate-800 p-4 rounded-xl">
                  <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className={`text-xs mt-2 ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.trend} vs last month
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-6 flex-1">
              <div className="col-span-2 bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex flex-col">
                <div className="text-sm font-bold text-white mb-4">Pipeline Value</div>
                <div className="flex-1 bg-gradient-to-t from-slate-800/50 to-transparent rounded-lg flex items-end gap-2 p-2">
                   {/* Fake chart */}
                   {[20, 40, 30, 70, 50, 90, 60, 100].map((h, i) => (
                     <div key={i} className="flex-1 bg-[#2563EB] rounded-t-sm" style={{ height: `${h}%` }} />
                   ))}
                </div>
              </div>
              <div className="col-span-1 bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex flex-col">
                <div className="text-sm font-bold text-white mb-4">Recent Leads</div>
                <div className="space-y-3 flex-1 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700" />
                      <div className="flex-1">
                        <div className="h-3 w-20 bg-slate-700 rounded-full mb-1" />
                        <div className="h-2 w-16 bg-slate-800 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
