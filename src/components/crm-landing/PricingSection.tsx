"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-6">
            Simple, transparent pricing.
          </h2>
          <p className="text-lg text-muted-foreground">
            No hidden fees. Choose the plan that best fits your team's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col p-8 rounded-3xl bg-white dark:bg-[#0F172A] border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">Starter</h3>
              <p className="text-sm text-muted-foreground">Ideal for solo agents.</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#0F172A] dark:text-white">$49</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8 flex-1">
              {['Up to 500 leads', 'CRM', 'Pipeline', 'Dashboard', 'Support'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  {feature}
                </div>
              ))}
            </div>
            
            <button className="w-full h-12 rounded-full border-2 border-border text-[#0F172A] dark:text-white font-semibold hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors">
              Get Started
            </button>
          </motion.div>

          {/* Professional Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col p-8 rounded-3xl bg-gradient-to-b from-[#2563EB]/10 to-transparent dark:from-[#2563EB]/20 border-2 border-[#2563EB] shadow-xl relative"
          >
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
              <div className="px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                ⭐ Recommended
              </div>
            </div>

            <div className="mb-8 mt-2">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">Professional</h3>
              <p className="text-sm text-muted-foreground">For growing teams.</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#0F172A] dark:text-white">$99</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8 flex-1">
              {[
                'Unlimited leads', 'CRM & Pipeline', 'Marketing Automation', 
                'AI Assistant', 'Email & SMS Campaigns', 'Analytics & Reports', 
                'API Access', 'Dialer', 'Priority Support'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-[#0F172A] dark:text-white font-medium">
                  <Check className="w-4 h-4 text-[#2563EB]" />
                  {feature}
                </div>
              ))}
            </div>
            
            <button className="w-full h-12 rounded-full bg-[#2563EB] text-white font-semibold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all">
              Start Free Trial
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col p-8 rounded-3xl bg-white dark:bg-[#0F172A] border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">Enterprise</h3>
              <p className="text-sm text-muted-foreground">For large brokerages.</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#0F172A] dark:text-white">Custom</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8 flex-1">
              {[
                'Everything unlimited', 'White Label', 'Full API Access', 
                'SSO Authentication', 'Dedicated Manager', 'Custom Integrations', 
                'Custom Workflows'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  {feature}
                </div>
              ))}
            </div>
            
            <button className="w-full h-12 rounded-full border-2 border-border text-[#0F172A] dark:text-white font-semibold hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
