"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { leadSourceChartData } from "@/lib/mock-data/dashboard"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Vibrant color palette matching the reference image
const COLORS_LIGHT = ["#7C3AED", "#3B82F6", "#06B6D4", "#EC4899", "#F97316"]
const COLORS_DARK = ["#8B5CF6", "#60A5FA", "#22D3EE", "#F472B6", "#FB923C"]

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background/98 backdrop-blur p-2.5 shadow-lg text-xs min-w-[120px]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-muted-foreground">{payload[0].name}</span>
        <span className="font-semibold text-foreground tabular-nums">{payload[0].value}%</span>
      </div>
    </div>
  )
}

interface LeadSourceChartProps {
  loading?: boolean
}

export function LeadSourceChart({ loading }: LeadSourceChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT

  if (loading) {
    return (
      <Card className="shadow-sm h-full flex flex-col">
        <CardHeader className="pb-4">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-6">
          <Skeleton className="h-[140px] w-[140px] rounded-full flex-shrink-0" />
          <div className="space-y-3 flex-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const total = leadSourceChartData.reduce((sum, item) => sum + item.value, 0)

  // Calculate SVG stroke dashes for the donut
  const radius = 55
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-6 px-6 pb-6 mt-4">
        
        {/* Custom SVG Donut Chart */}
        <div className="relative h-[160px] w-[160px] flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
            {leadSourceChartData.map((item, index) => {
              const strokeDasharray = `${(item.value / total) * circumference} ${circumference}`
              const strokeDashoffset = -currentOffset
              currentOffset += (item.value / total) * circumference
              return (
                <circle
                  key={item.name}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={colors[index % colors.length]}
                  strokeWidth="24"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 ease-in-out hover:opacity-80"
                />
              )
            })}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold tracking-tight text-foreground tabular-nums">{total}</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Leads</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 flex flex-col gap-3 w-full xl:w-auto mt-2 xl:mt-0">
          {leadSourceChartData.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                <span className="text-muted-foreground truncate max-w-[100px]">{item.name}</span>
              </div>
              <span className="font-semibold text-foreground tabular-nums">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
