import * as React from "react"
import { Foundations } from "./components/Foundations"
import { Actions } from "./components/Actions"
import { Forms } from "./components/Forms"
import { DataDisplay } from "./components/DataDisplay"
import { Overlays } from "./components/Overlays"
import { Feedback } from "./components/Feedback"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-[1400px] mx-auto p-8 lg:p-16 animate-in fade-in duration-700">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-24 max-w-3xl">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter">Design System</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The comprehensive component playground for our timeless, enterprise-grade Real Estate SaaS platform.
              Explore typography, colors, interaction states, and accessibility standards.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Component Showcase Sections */}
        <div className="space-y-24">
          <Foundations />
          <Actions />
          <Forms />
          <DataDisplay />
          <Overlays />
          <Feedback />
        </div>

      </div>
    </div>
  )
}
