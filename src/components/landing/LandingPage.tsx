"use client"

import * as React from "react"
import { LandingNavbar } from "./LandingNavbar"
import { HeroSection } from "./HeroSection"
import { SearchBarSection } from "./SearchBarSection"
import { PersonaCardsSection } from "./PersonaCardsSection"
import { StatsSection } from "./StatsSection"
import { DifferentialsSection } from "./DifferentialsSection"
import { FeaturedPropertiesSection } from "./FeaturedPropertiesSection"
import { LandingFooter } from "./LandingFooter"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Top Fixed Header */}
      <LandingNavbar />

      {/* Main Content Sections */}
      <main role="main">
        {/* 1. Hero Section (Split Column Layout) */}
        <HeroSection />

        {/* 2. Central Prominent Search Bar */}
        <SearchBarSection />

        {/* 3. Persona Cards (Comprar, Vender, Corretores, Imobiliárias) */}
        <PersonaCardsSection />

        {/* 4. Statistics Counters Banner */}
        <StatsSection />

        {/* 5. Differentials & Feature Grid */}
        <DifferentialsSection />

        {/* 6. Featured Luxury Properties Grid */}
        <FeaturedPropertiesSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}
