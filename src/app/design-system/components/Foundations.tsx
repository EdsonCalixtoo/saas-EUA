import * as React from "react"
import { Badge } from "@/components/ui/badge"

export function Foundations() {
  return (
    <section className="space-y-12">
      <div className="space-y-2 border-b border-border-subtle pb-4">
        <h2 className="text-3xl font-semibold tracking-tight">Foundations</h2>
        <p className="text-muted-foreground text-lg">Typography, Colors, Elevation, and Spacing.</p>
      </div>

      {/* Typography */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Typography Scale</h3>
        <div className="space-y-8 bg-secondary p-8 rounded-2xl border border-border-subtle">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
            <span className="text-sm text-muted-foreground font-mono">Display</span>
            <h1 className="col-span-3 text-5xl md:text-7xl font-bold tracking-tighter">Premium UI</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline border-t border-border-subtle pt-6">
            <span className="text-sm text-muted-foreground font-mono">Heading 1</span>
            <h1 className="col-span-3 text-4xl font-semibold tracking-tight">The quick brown fox</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline border-t border-border-subtle pt-6">
            <span className="text-sm text-muted-foreground font-mono">Heading 2</span>
            <h2 className="col-span-3 text-3xl font-semibold tracking-tight">The quick brown fox</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline border-t border-border-subtle pt-6">
            <span className="text-sm text-muted-foreground font-mono">Heading 3</span>
            <h3 className="col-span-3 text-2xl font-semibold tracking-tight">The quick brown fox</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline border-t border-border-subtle pt-6">
            <span className="text-sm text-muted-foreground font-mono">Body Large</span>
            <p className="col-span-3 text-lg leading-relaxed text-secondary-foreground">The quick brown fox jumps over the lazy dog. A meticulous approach to real estate investing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline border-t border-border-subtle pt-6">
            <span className="text-sm text-muted-foreground font-mono">Body Base</span>
            <p className="col-span-3 text-base leading-relaxed">The quick brown fox jumps over the lazy dog. A meticulous approach to real estate investing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline border-t border-border-subtle pt-6">
            <span className="text-sm text-muted-foreground font-mono">Body Small</span>
            <p className="col-span-3 text-sm text-muted-foreground">The quick brown fox jumps over the lazy dog. A meticulous approach to real estate investing.</p>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Color Philosophy</h3>
        <p className="text-sm text-muted-foreground">Neutral primary foundation with precise semantic accents.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <ColorSwatch name="Background" className="bg-background border border-border" hex="var(--background)" />
          <ColorSwatch name="Secondary" className="bg-secondary border border-border" hex="var(--secondary)" />
          <ColorSwatch name="Card" className="bg-card border border-border" hex="var(--card)" />
          <ColorSwatch name="Primary" className="bg-primary text-primary-foreground border border-primary" hex="var(--primary)" />
          <ColorSwatch name="Muted" className="bg-muted border border-border" hex="var(--muted)" />
          <ColorSwatch name="Border" className="bg-border border border-border-strong" hex="var(--border)" />
        </div>

        <h4 className="text-lg font-medium mt-8">Semantic Accents</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <ColorSwatch name="Info" className="bg-info text-info-foreground" hex="var(--info)" />
          <ColorSwatch name="Success" className="bg-success text-success-foreground" hex="var(--success)" />
          <ColorSwatch name="Warning" className="bg-warning text-warning-foreground" hex="var(--warning)" />
          <ColorSwatch name="Error" className="bg-destructive text-destructive-foreground" hex="var(--destructive)" />
          <ColorSwatch name="AI Features" className="bg-ai text-ai-foreground" hex="var(--ai)" />
        </div>
      </div>

      {/* Shadows & Elevation */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Elevation & Shadows</h3>
        <p className="text-sm text-muted-foreground">Apple-style multi-layered soft shadows.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-12 bg-secondary rounded-2xl border border-border-subtle">
          <div className="h-32 bg-card rounded-xl flex items-center justify-center text-sm font-medium shadow-sm border border-border">shadow-sm</div>
          <div className="h-32 bg-card rounded-xl flex items-center justify-center text-sm font-medium shadow-md border border-border">shadow-md</div>
          <div className="h-32 bg-card rounded-xl flex items-center justify-center text-sm font-medium shadow-lg border border-border">shadow-lg</div>
          <div className="h-32 bg-card rounded-xl flex items-center justify-center text-sm font-medium shadow-xl border border-border">shadow-xl</div>
          <div className="h-32 bg-card rounded-xl flex items-center justify-center text-sm font-medium shadow-2xl border border-border">shadow-2xl</div>
        </div>
      </div>

      {/* Glassmorphism */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Glassmorphism</h3>
        <p className="text-sm text-muted-foreground">Used sparingly for contextual overlays and floating navigation.</p>
        <div className="h-64 rounded-2xl relative flex items-center justify-center overflow-hidden bg-gradient-to-tr from-info via-ai to-primary">
          <div className="absolute inset-0 opacity-50 mix-blend-overlay pattern-grid-lg" />
          <div className="glass px-8 py-6 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-2xl z-10 w-80">
            <h4 className="font-semibold text-lg text-foreground">Floating Panel</h4>
            <p className="text-sm text-muted-foreground text-center">Backdrop blur 24px with very subtle border opacity.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ColorSwatch({ name, className, hex }: { name: string, className: string, hex?: string }) {
  return (
    <div className="space-y-3 group cursor-pointer">
      <div className={`h-24 w-full rounded-xl shadow-sm transition-transform group-hover:scale-105 group-hover:shadow-md ${className}`} />
      <div>
        <p className="text-sm font-semibold">{name}</p>
        {hex && <p className="text-xs text-muted-foreground font-mono mt-0.5">{hex}</p>}
      </div>
    </div>
  )
}
