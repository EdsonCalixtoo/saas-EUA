"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { pipelineStages, type PipelineStage } from "@/lib/mock-data/dashboard"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function formatValue(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

const healthColors: Record<PipelineStage["health"], string> = {
  strong: "bg-success",
  normal: "bg-foreground/25",
  weak:   "bg-warning",
}

const healthLabels: Record<PipelineStage["health"], string> = {
  strong: "Healthy",
  normal: "Normal",
  weak:   "Needs attention",
}

interface StageRowProps {
  stage: PipelineStage
  maxCount: number
  totalActive: number
}

function StageRow({ stage, maxCount, totalActive }: StageRowProps) {
  const widthPct = maxCount > 0 ? (stage.count / maxCount) * 100 : 0
  const sharePct = totalActive > 0 ? ((stage.count / totalActive) * 100).toFixed(0) : "0"
  const isLost = stage.id === "lost"
  const isClosed = stage.id === "closed"
  const isSpecial = isLost || isClosed

  return (
    <Tooltip>
      <TooltipTrigger className="w-full text-left">
        <div className="group flex items-center gap-3 rounded-md px-1 py-2 hover:bg-muted/40 transition-colors cursor-default">
          {/* Health dot */}
          <div className="flex items-center justify-center w-4 flex-shrink-0">
            {!isSpecial && (
              <div className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0", healthColors[stage.health])} />
            )}
          </div>

          {/* Stage name */}
          <div className="w-[108px] flex-shrink-0">
            <span className={cn(
              "text-xs font-medium truncate block",
              isLost ? "text-muted-foreground/60" : "text-foreground"
            )}>
              {stage.name}
            </span>
          </div>

          {/* Bar */}
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <div className="h-5 flex-1 overflow-hidden rounded-sm bg-muted/50 relative">
              <div
                className={cn(
                  "h-full rounded-sm transition-all duration-700 ease-out",
                  isLost    ? "bg-muted-foreground/20" :
                  isClosed  ? "bg-success/50" :
                  stage.health === "strong" ? "bg-foreground/30" :
                  stage.health === "weak" ? "bg-warning/40" : "bg-foreground/20"
                )}
                style={{ width: `${widthPct}%` }}
              />
              {/* Count inside bar */}
              <span className="absolute inset-0 flex items-center pl-1.5 text-[10px] font-semibold text-foreground/70 select-none pointer-events-none">
                {stage.count}
              </span>
            </div>
          </div>

          {/* Value */}
          <div className="w-[70px] text-right flex-shrink-0">
            {!isLost ? (
              <span className="text-xs text-muted-foreground tabular-nums">{formatValue(stage.value)}</span>
            ) : (
              <span className="text-xs text-muted-foreground/40">—</span>
            )}
          </div>

          {/* Conversion */}
          <div className="w-[44px] text-right flex-shrink-0">
            {stage.conversionRate !== null ? (
              <span className={cn(
                "text-[11px] tabular-nums font-medium",
                stage.conversionRate >= 65 ? "text-success" :
                stage.conversionRate >= 50 ? "text-foreground/60" :
                "text-warning"
              )}>
                {stage.conversionRate}%
              </span>
            ) : (
              <span className="text-[11px] text-muted-foreground/30">—</span>
            )}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="left">
        <div className="space-y-1 text-xs">
          <p className="font-semibold">{stage.name}</p>
          <p>{stage.count} deals · {formatValue(stage.value)}</p>
          {stage.conversionRate !== null && <p>Conversion from prev: {stage.conversionRate}%</p>}
          {!isSpecial && <p className="capitalize">Health: <span className={cn(stage.health === "strong" ? "text-success" : stage.health === "weak" ? "text-warning" : "")}>{healthLabels[stage.health]}</span></p>}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

interface PipelineOverviewProps {
  loading?: boolean
}

export function PipelineOverview({ loading }: PipelineOverviewProps) {
  const activeStages = pipelineStages.filter(s => s.id !== "lost" && s.id !== "closed")
  const maxCount = Math.max(...pipelineStages.map((s) => s.count))
  const totalActive = activeStages.reduce((sum, s) => sum + s.count, 0)
  const totalValue = activeStages.reduce((sum, s) => sum + s.value, 0)
  const closedStage = pipelineStages.find(s => s.id === "closed")
  const lostStage = pipelineStages.find(s => s.id === "lost")

  if (loading) {
    return (
      <Card className="shadow-sm h-full">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-40 mb-1" />
          <Skeleton className="h-3.5 w-56" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Deals Pipeline</CardTitle>
            <CardDescription className="mt-0.5 text-xs">
              {totalActive} active · {formatValue(totalValue)} estimated
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-0.5">
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
              {closedStage?.count} closed
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
              {lostStage?.count} lost
            </div>
          </div>
        </div>

        {/* Column headers */}
        <div className="flex items-center gap-3 pt-3 border-t border-border-subtle mt-3">
          <div className="w-4 flex-shrink-0" />
          <div className="w-[108px] text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50 flex-shrink-0">Stage</div>
          <div className="flex-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">Volume</div>
          <div className="w-[70px] text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">Value</div>
          <div className="w-[44px] text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">Conv.</div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1">
        <div className="space-y-0.5">
          {pipelineStages.map((stage) => (
            <StageRow key={stage.id} stage={stage} maxCount={maxCount} totalActive={totalActive} />
          ))}
        </div>

        {/* Pipeline health summary */}
        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success inline-block" />Strong</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-foreground/25 inline-block" />Normal</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-warning inline-block" />Needs attention</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
