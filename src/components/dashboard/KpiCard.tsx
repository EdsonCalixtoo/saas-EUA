"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { KpiData } from "@/lib/mock-data/dashboard"
import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

interface KpiCardProps {
  data: KpiData
  loading?: boolean
  error?: boolean
}

function Sparkline({ data, direction }: { data: number[]; direction: string }) {
  const chartData = data.map((v, i) => ({ v, i }))
  const color = direction === "up"
    ? "var(--color-success, #16A34A)"
    : direction === "down"
    ? "var(--color-destructive, #DC2626)"
    : "var(--color-muted-foreground, #71717A)"

  return (
    <div className="h-12 w-24 flex-shrink-0" aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function KpiCard({ data, loading, error }: KpiCardProps) {
  const isPositive = data.direction === "up" || (data.id === "followups-due" && data.direction === "down")
  const isNegative = data.direction !== "up" && !(data.id === "followups-due" && data.direction === "down") && data.direction !== "neutral"
  const TrendIcon = data.direction === "up" ? TrendingUp : data.direction === "down" ? TrendingDown : Minus

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-4 flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-24" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="shadow-sm border-destructive/30">
        <CardContent className="flex h-[90px] items-center justify-center p-4">
          <p className="text-xs text-destructive">Failed to load</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger className="w-full text-left">
        <Card className={cn(
          "shadow-sm transition-all duration-200 cursor-default group",
          "hover:shadow-md hover:-translate-y-px",
        )}>
          <CardContent className="p-4 flex flex-col justify-between h-[100px]">
            <p className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase leading-none">
              {data.label}
            </p>

            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums leading-none">
                {data.value}
              </p>
              <span className={cn(
                "inline-flex items-center text-[11px] font-semibold",
                isPositive && "text-success",
                isNegative && "text-destructive",
                !isPositive && !isNegative && "text-muted-foreground",
              )}>
                <TrendIcon className="h-3 w-3 mr-0.5" />
                {data.change}
              </span>
            </div>

            <p className="text-[10px] text-muted-foreground mt-2">
              {data.period}
            </p>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <p className="text-xs">{data.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
