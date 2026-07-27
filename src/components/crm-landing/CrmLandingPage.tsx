"use client"

import * as React from "react"
import { Navbar } from "./Navbar"
import { HeroSection } from "./HeroSection"
import { TrustedBySection } from "./TrustedBySection"
import { ProductsSection } from "./ProductsSection"
import { BenefitsSection } from "./BenefitsSection"
import { DashboardShowcase } from "./DashboardShowcase"
import { PricingSection } from "./PricingSection"
import { TestimonialsSection } from "./TestimonialsSection"
import { AboutUsSection } from "./AboutUsSection"
import { FinalCtaSection } from "./FinalCtaSection"
import { Footer } from "./Footer"

export function CrmLandingPage() {
  return (
    <div className="dark min-h-screen text-slate-200 font-sans antialiased overflow-x-hidden selection:bg-[#2563EB] selection:text-white relative bg-[#0F172A]">
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0F172A] to-[#0B1120]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2563EB]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-400/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-sky-400/5 blur-[150px] rounded-full"></div>
      </div>
      <Navbar />
      <main role="main">
        <HeroSection />
        <TrustedBySection />
        <ProductsSection />
        <BenefitsSection />
        <DashboardShowcase />
        <PricingSection />
        <TestimonialsSection />
        <AboutUsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
