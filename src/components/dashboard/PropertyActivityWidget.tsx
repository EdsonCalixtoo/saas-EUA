"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Building2, ScanSearch, Bookmark, AlertTriangle, UserSearch } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { propertyActivity } from "@/lib/mock-data/dashboard"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  Building2, ScanSearch, Bookmark, AlertTriangle, UserSearch,
}

interface PropertyActivityWidgetProps {
  loading?: boolean
}

export function PropertyActivityWidget({ loading }: PropertyActivityWidgetProps) {
  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Property Activity</CardTitle>
        <a href="/properties" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium">
          View all →
        </a>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 pt-0">
        {propertyActivity.map((item) => {
          const Icon = iconMap[item.icon] ?? Building2
          const isUp = item.direction === "up"
          const TrendIcon = isUp ? TrendingUp : TrendingDown

          return (
            <div
              key={item.label}
              className={cn(
                "flex flex-col gap-3 rounded-lg border border-border-subtle p-4",
                "bg-card hover:bg-muted/40 transition-all duration-150 cursor-default group",
                "hover:shadow-sm hover:-translate-y-px"
              )}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden />
                <span className={cn(
                  "inline-flex items-center gap-0.5 text-[10px] font-medium",
                  isUp ? "text-success" : "text-destructive"
                )}>
                  <TrendIcon className="h-2.5 w-2.5" />
                  {item.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-foreground leading-none">
                  {item.value.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-tight">{item.label}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
