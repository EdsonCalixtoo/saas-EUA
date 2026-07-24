"use client"

import * as React from "react"
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { pipelineFunnelData } from "@/lib/mock-data/dashboard"
import { useTheme } from "next-themes"

const COLORS_LIGHT = ["#3B82F6", "#2563EB", "#0284C7", "#0D9488", "#059669", "#10B981"]
const COLORS_DARK = ["#60A5FA", "#3B82F6", "#38BDF8", "#14B8A6", "#34D399", "#4ADE80"]

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-background/98 backdrop-blur p-2.5 shadow-lg text-xs min-w-[140px]">
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium text-foreground">{data.name}</span>
        <span className="font-semibold text-foreground tabular-nums">{data.value} deals</span>
      </div>
    </div>
  )
}

interface PipelineFunnelProps {
  loading?: boolean
}

export function PipelineFunnel({ loading }: PipelineFunnelProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT

  if (loading) {
    return (
      <Card className="shadow-sm h-full flex flex-col">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent className="h-[260px] flex flex-col items-center justify-center gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10" style={{ width: `${100 - i * 15}%` }} />
          ))}
        </CardContent>
      </Card>
    )
  }

  // Calculate max width for percentage scaling
  const maxVal = pipelineFunnelData[0].value

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Pipeline Overview</CardTitle>
        <CardDescription className="text-sm font-semibold mt-1 text-foreground">
          $2.4M <span className="text-xs font-normal text-muted-foreground ml-1">Total Deal Pipeline</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-6 pb-6 h-[260px] flex flex-col items-center justify-center gap-1.5 overflow-hidden w-full max-w-md mx-auto">
        {pipelineFunnelData.map((stage, i) => {
          // Progressively narrow the width to simulate a funnel.
          // First is 100%, last is 40%.
          const funnelWidthPercentage = 100 - (i * (60 / (pipelineFunnelData.length - 1)))
          const color = colors[i % colors.length]
          
          return (
            <div 
              key={stage.name}
              className="relative h-10 flex items-center justify-between px-4 transition-all duration-300 hover:opacity-90 rounded-sm"
              style={{ 
                width: `${funnelWidthPercentage}%`, 
                backgroundColor: color,
                color: isDark && i < 2 ? "#000" : (isDark ? "#fff" : (i < 1 ? "#fff" : "#fff")) // Contrast handling
              }}
            >
              <span className="text-xs font-medium tracking-wide z-10 drop-shadow-sm text-white">
                {stage.name}
              </span>
              <span className="text-xs font-bold tabular-nums z-10 drop-shadow-sm text-white">
                {stage.value} <span className="opacity-70 font-medium ml-1">({Math.round((stage.value / maxVal) * 100)}%)</span>
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
