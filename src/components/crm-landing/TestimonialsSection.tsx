"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Lead Broker",
    company: "Luxe Estates",
    content: "PropFlow completely transformed how our team operates. The AI assistant alone saves us hours every day, and our conversion rate has jumped by 30% since we switched.",
    image: "https://i.pravatar.cc/150?img=47"
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "Urban Living",
    content: "The smartest CRM I have ever used. The marketing automation is seamless, and being able to manage the entire pipeline in such a beautifully designed interface makes working a joy.",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Emily Rodriguez",
    role: "Real Estate Agent",
    company: "Prime Realty Group",
    content: "I've tried Salesforce, HubSpot, and niche real estate CRMs. Nothing comes close to PropFlow in terms of speed, design, and raw power. It's the ultimate tool for agents.",
    image: "https://i.pravatar.cc/150?img=5"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-transparent border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-6">
            Loved by top performers.
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what industry leaders have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#0F172A] border border-border shadow-sm flex flex-col"
            >
              <div className="flex text-[#F59E0B] mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-[#0F172A] dark:text-gray-300 leading-relaxed mb-8 flex-1">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border border-border"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-[#0F172A] dark:text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
