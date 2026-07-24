"use client"

import * as React from "react"
import { Sparkles, ChevronRight, X, AlertCircle, Info, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { aiInsights, type AiInsight } from "@/lib/mock-data/dashboard"
import { cn } from "@/lib/utils"

const priorityConfig = {
  high:   { label: "High",   icon: AlertCircle,  color: "text-destructive", badgeClass: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Medium", icon: Info,         color: "text-warning",     badgeClass: "bg-warning/10 text-warning border-warning/20" },
  low:    { label: "Low",    icon: CheckCircle2, color: "text-muted-foreground", badgeClass: "bg-muted text-muted-foreground" },
}

interface InsightCardProps {
  insight: AiInsight
  onDismiss: (id: string) => void
}

function InsightCard({ insight, onDismiss }: InsightCardProps) {
  const cfg = priorityConfig[insight.priority]
  const PriorityIcon = cfg.icon

  return (
    <div className={cn(
      "group relative flex flex-col gap-2 rounded-lg p-3.5 border transition-all duration-150",
      "border-border-subtle bg-card hover:bg-muted/30",
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-ai mt-0.5" />
          <p className="text-sm font-medium text-foreground leading-snug">{insight.title}</p>
        </div>
        <button
          onClick={() => onDismiss(insight.id)}
          className="flex-shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring opacity-0 group-hover:opacity-100"
          aria-label={`Dismiss insight: ${insight.title}`}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground pl-6 leading-relaxed">{insight.reason}</p>

      <div className="flex items-center justify-between pl-6 pt-1">
        <Badge
          variant="outline"
          className={cn("text-[10px] py-0 h-4 border font-medium", cfg.badgeClass)}
        >
          <PriorityIcon className="h-2.5 w-2.5 mr-1" />
          {cfg.label} Priority
        </Badge>
        <a
          href={insight.action}
          className="inline-flex items-center gap-0.5 h-6 px-2 text-xs text-ai hover:text-ai hover:bg-ai/10 font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {insight.actionLabel}
          <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

interface AiInsightsPanelProps {
  loading?: boolean
}

export function AiInsightsPanel({ loading }: AiInsightsPanelProps) {
  const [insights, setInsights] = React.useState(aiInsights)

  const dismiss = (id: string) => {
    setInsights((prev) => prev.filter((i) => i.id !== id))
  }

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ai" aria-hidden />
            <CardTitle className="text-base font-semibold">AI Insights</CardTitle>
            {insights.length > 0 && (
              <Badge className="bg-ai/10 text-ai border-ai/20 border text-[10px] py-0 h-4">
                {insights.length}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5 pt-0">
        {insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-8 w-8 text-success mb-3" />
            <p className="text-sm font-medium text-foreground">All clear</p>
            <p className="text-xs text-muted-foreground mt-1">No active insights right now. Keep up the great work!</p>
          </div>
        ) : (
          insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} onDismiss={dismiss} />
          ))
        )}
      </CardContent>
    </Card>
  )
}
