"use client"

import * as React from "react"
import { Users, ChevronDown } from "lucide-react"
import { analyticsMetrics, revenueTimeData } from "@/lib/mock-data/analytics"
import { AnalyticsMetricsGrid } from "./AnalyticsMetricsGrid"
import { RevenueChart } from "./RevenueChart"

export function AnalyticsScreen() {
  const [timeRange, setTimeRange] = React.useState("This Month")
  const [selectedAttribute, setSelectedAttribute] = React.useState<string>("all")

  return (
    <div className="flex flex-col h-full w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* ─── Top Header Row: Icon + Title + Timeframe Select ─── */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/60 shadow-2xs">
            <Users className="h-6 w-6 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Analytics
          </h1>
        </div>

        {/* Timeframe Select Box */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-2xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <span>{timeRange}</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* ─── Main Outer Card Container ─── */}
      <div className="flex flex-col gap-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
        {/* Top 4 KPI Metrics Grid */}
        <AnalyticsMetricsGrid
          metrics={analyticsMetrics}
          selectedMetricId={selectedAttribute}
          onSelectMetric={(id) => setSelectedAttribute(id)}
        />

        {/* Bottom Large Revenue Over Time Chart */}
        <RevenueChart
          data={revenueTimeData}
          selectedMetric={selectedAttribute}
          onSelectMetric={(id) => setSelectedAttribute(id)}
        />
      </div>
    </div>
  )
}
