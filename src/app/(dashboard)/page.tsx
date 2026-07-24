"use client"

import * as React from "react"
import { Plus, Building2, CheckSquare2, Megaphone, Upload, FileStack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { PipelineOverview } from "@/components/dashboard/PipelineOverview"
import { PerformanceChart } from "@/components/dashboard/PerformanceChart"
import { LeadSourceTable } from "@/components/dashboard/LeadSourceTable"
import { AiInsightsPanel } from "@/components/dashboard/AiInsightsPanel"
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed"
import { TasksWidget } from "@/components/dashboard/TasksWidget"
import { PropertyActivityWidget } from "@/components/dashboard/PropertyActivityWidget"
import { kpiData } from "@/lib/mock-data/dashboard"

const QUICK_ACTIONS = [
  { label: "Add Lead",        icon: Plus,        href: "/leads/new" },
  { label: "Add Property",   icon: Building2,   href: "/properties/new" },
  { label: "Create Task",    icon: CheckSquare2, href: "/tasks/new" },
  { label: "Start Campaign", icon: Megaphone,   href: "/campaigns/new" },
  { label: "Import List",    icon: Upload,      href: "/lists/import" },
]

function DashboardHeader() {
  const now = new Date()
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  const hour = now.getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{greeting}, John</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{dateStr}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="inline-flex items-center gap-1.5 h-8 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  // Simulate a brief loading period for skeleton demo
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col gap-8">
      {/* A. Page Header & Quick Actions */}
      <DashboardHeader />

      {/* B. Primary KPI Row */}
      <section aria-label="Key performance indicators">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.id} data={kpi} loading={loading} />
          ))}
        </div>
      </section>

      {/* C+D. Pipeline + Performance — main row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* C. Pipeline Overview */}
        <section aria-label="Deals pipeline">
          <PipelineOverview loading={loading} />
        </section>

        {/* D. Performance Chart */}
        <section aria-label="Performance chart">
          <PerformanceChart loading={loading} />
        </section>
      </div>

      {/* E. Lead Source Performance */}
      <section aria-label="Lead source performance">
        <LeadSourceTable loading={loading} />
      </section>

      {/* F+G. AI Insights + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1.6fr]">
        <section aria-label="AI insights">
          <AiInsightsPanel loading={loading} />
        </section>
        <section aria-label="Recent activity">
          <RecentActivityFeed loading={loading} />
        </section>
      </div>

      {/* H. Tasks & Appointments */}
      <section aria-label="Tasks and appointments">
        <TasksWidget loading={loading} />
      </section>

      {/* I. Property Activity */}
      <section aria-label="Property activity">
        <PropertyActivityWidget loading={loading} />
      </section>
    </div>
  )
}
