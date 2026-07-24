"use client"

import * as React from "react"
import { MetricCard } from "@/lib/mock-data/analytics"
import { Triangle } from "lucide-react"

interface AnalyticsMetricsGridProps {
  metrics: MetricCard[]
}

export function AnalyticsMetricsGrid({ metrics }: AnalyticsMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="flex flex-col gap-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-2xs transition-all duration-150 hover:shadow-xs"
        >
          {/* Label */}
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {metric.label}
          </span>

          {/* Large Value */}
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            {metric.value}
          </span>

          {/* Growth Percentage with Green Up Arrow */}
          <div className="flex items-center gap-1.5 mt-1 font-bold text-sm text-emerald-600 dark:text-emerald-400">
            <Triangle className="h-3 w-3 fill-current stroke-none" />
            <span>{metric.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
