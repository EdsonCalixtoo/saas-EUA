"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { ChartDataPoint } from "@/lib/mock-data/analytics"
import { SlidersHorizontal, ChevronDown } from "lucide-react"

interface RevenueChartProps {
  data: ChartDataPoint[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs">
      {/* Header Row: Title & Filter Select */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Revenue Over Time
        </h2>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span>All Attributes</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
          {/* Subtle sliders icon underneath select */}
          <div className="pr-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <SlidersHorizontal className="h-3.5 w-3.5 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Chart Area Container */}
      <div className="h-[320px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="var(--border, #E4E4E7)"
              opacity={0.6}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 13, fontWeight: 500 }}
              ticks={["Apr 29", "May 6", "May 13", "May 20", "May 27"]}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 13, fontWeight: 500 }}
              domain={[0, 65000]}
              ticks={[0, 30000, 60000]}
              tickFormatter={(val) => (val === 0 ? "$0" : `$${val / 1000}K`)}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as ChartDataPoint
                  return (
                    <div className="rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-3 text-xs font-semibold shadow-xl flex flex-col gap-0.5">
                      <span className="text-slate-400 dark:text-slate-500 font-medium">
                        {item.displayDate}
                      </span>
                      <span className="text-base font-bold">
                        ${item.revenue.toLocaleString()}
                      </span>
                    </div>
                  )
                }
                return null
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7C3AED"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#purpleGradient)"
              dot={{
                r: 4,
                fill: "#7C3AED",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#7C3AED",
                stroke: "#FFFFFF",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
