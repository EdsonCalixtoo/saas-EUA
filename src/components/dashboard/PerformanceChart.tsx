"use client"

import * as React from "react"
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, Legend, Area, AreaChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { performanceData } from "@/lib/mock-data/dashboard"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

type Period = "7d" | "30d" | "90d" | "12m"

const periodLabels: Record<Period, string> = {
  "7d":  "7D",
  "30d": "30D",
  "90d": "90D",
  "12m": "1Y",
}

const seriesConfig = [
  { key: "leadsCreated",   label: "Leads",        color: "#52525B", dashed: false },
  { key: "leadsContacted", label: "Contacted",    color: "#A1A1AA", dashed: false },
  { key: "appointments",  label: "Appointments", color: "#2563EB", dashed: false },
  { key: "offersSent",    label: "Offers",       color: "#EA580C", dashed: false },
  { key: "dealsClosed",   label: "Closed",       color: "#16A34A", dashed: false },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const filtered = payload.filter((p: any) => p.value > 0)
  return (
    <div className="rounded-lg border border-border bg-background/98 backdrop-blur p-3 shadow-lg text-xs min-w-[140px]">
      <p className="font-semibold text-foreground mb-2 pb-1.5 border-b border-border-subtle">{label}</p>
      <div className="space-y-1.5">
        {filtered.map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
              <span className="text-muted-foreground">{p.name}</span>
            </div>
            <span className="font-semibold text-foreground tabular-nums">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomLegend({ payload }: any) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 pl-8">
      {payload?.map((entry: any) => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <span
            className="block h-[2px] w-4 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-[11px] text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

interface PerformanceChartProps {
  loading?: boolean
}

export function PerformanceChart({ loading }: PerformanceChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const data = performanceData["7d"]

  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "#F0F0F0"
  const axisColor = isDark ? "#52525B" : "#A1A1AA"
  const areaColor = "#6366F1"

  if (loading) {
    return (
      <Card className="shadow-sm h-full">
        <CardHeader className="pb-4">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[220px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Calls Over Time</CardTitle>
      </CardHeader>

      <CardContent className="pt-0 flex-1">
        <div className="h-[220px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={areaColor} stopOpacity={isDark ? 0.3 : 0.1} />
                  <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: axisColor }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                tickFormatter={(val) => {
                  const day = new Date(val).toLocaleDateString('en-US', { weekday: 'short' })
                  return day !== "Invalid Date" ? day : val
                }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: axisColor }}
                tickLine={false}
                axisLine={false}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: gridColor, strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="leadsContacted"
                name="Calls Made"
                stroke={areaColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCalls)"
                activeDot={{ r: 4, strokeWidth: 0, fill: areaColor }}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
