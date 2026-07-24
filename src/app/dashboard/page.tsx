"use client"

import * as React from "react"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { PipelineFunnel } from "@/components/dashboard/PipelineFunnel"
import { PerformanceChart } from "@/components/dashboard/PerformanceChart"
import { LeadSourceChart } from "@/components/dashboard/LeadSourceChart"
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed"
import { TasksWidget } from "@/components/dashboard/TasksWidget"
import { kpiData } from "@/lib/mock-data/dashboard"

export default function DashboardPage() {
  const loading = false

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: KPI Cards (6 columns) */}
      <section aria-label="Key performance indicators" className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} loading={loading} />
        ))}
      </section>

      {/* Row 2: Lead Sources (Donut) + Pipeline (Funnel) + Upcoming Tasks */}
      <section aria-label="Middle dashboard widgets" className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <LeadSourceChart loading={loading} />
        </div>
        <div className="xl:col-span-6">
          <PipelineFunnel loading={loading} />
        </div>
        <div className="xl:col-span-3">
          <TasksWidget loading={loading} />
        </div>
      </section>

      {/* Row 3: Recent Activity + Calls Over Time (Area Chart) */}
      <section aria-label="Bottom dashboard widgets" className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <RecentActivityFeed loading={loading} />
        </div>
        <div>
          <PerformanceChart loading={loading} />
        </div>
      </section>
    </div>
  )
}
