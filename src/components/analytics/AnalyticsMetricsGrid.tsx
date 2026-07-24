"use client"

import * as React from "react"
import { MetricCard } from "@/lib/mock-data/analytics"
import { Triangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsMetricsGridProps {
  metrics: MetricCard[]
  selectedMetricId?: string
  onSelectMetric?: (id: string) => void
}

export function AnalyticsMetricsGrid({
  metrics,
  selectedMetricId = "revenue",
  onSelectMetric,
}: AnalyticsMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const isSelected = selectedMetricId === metric.id || (selectedMetricId === "all" && metric.id === "revenue")

        return (
          <div
            key={metric.id}
            onClick={() => onSelectMetric && onSelectMetric(metric.id)}
            className={cn(
              "flex flex-col gap-2 rounded-2xl bg-white dark:bg-slate-900 border p-5 shadow-2xs transition-all duration-150 cursor-pointer select-none",
              isSelected
                ? "border-purple-500/80 ring-2 ring-purple-500/20 shadow-sm"
                : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            )}
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
        )
      })}
    </div>
  )
}
