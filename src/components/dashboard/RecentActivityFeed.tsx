"use client"

import * as React from "react"
import {
  Phone, MessageSquare, Mail, StickyNote, ArrowRightLeft,
  Building2, CheckSquare, Megaphone
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { recentActivity, type ActivityEvent } from "@/lib/mock-data/dashboard"
import { cn } from "@/lib/utils"

const typeConfig: Record<ActivityEvent["type"], {
  icon: React.ElementType
  label: string
  bgColor: string
  iconColor: string
}> = {
  call:              { icon: Phone,          label: "Call",     bgColor: "bg-info/10",        iconColor: "text-info" },
  sms:               { icon: MessageSquare,  label: "SMS",      bgColor: "bg-success/10",     iconColor: "text-success" },
  email:             { icon: Mail,           label: "Email",    bgColor: "bg-muted",           iconColor: "text-muted-foreground" },
  note:              { icon: StickyNote,     label: "Note",     bgColor: "bg-warning/10",     iconColor: "text-warning" },
  stage_change:      { icon: ArrowRightLeft, label: "Stage",    bgColor: "bg-ai/10",          iconColor: "text-ai" },
  property_added:    { icon: Building2,      label: "Property", bgColor: "bg-muted",           iconColor: "text-muted-foreground" },
  task_complete:     { icon: CheckSquare,    label: "Task",     bgColor: "bg-success/10",     iconColor: "text-success" },
  campaign_response: { icon: Megaphone,      label: "Campaign", bgColor: "bg-info/10",        iconColor: "text-info" },
}

const statusStyles: Record<ActivityEvent["status"], string> = {
  completed: "text-success",
  pending:   "text-warning",
  missed:    "text-destructive",
}

interface ActivityRowProps {
  event: ActivityEvent
}

function ActivityRow({ event }: ActivityRowProps) {
  const cfg = typeConfig[event.type]
  const Icon = cfg.icon
  const subject = event.lead || event.property || "—"

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-0 group">
      {/* Icon */}
      <div className={cn(
        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg mt-0.5",
        cfg.bgColor
      )}>
        <Icon className={cn("h-3.5 w-3.5", cfg.iconColor)} aria-hidden />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-foreground leading-snug truncate">{subject}</p>
          <span className={cn("text-[10px] font-medium flex-shrink-0 mt-0.5", statusStyles[event.status])}>
            {event.outcome}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5 line-clamp-1 leading-relaxed">
          {event.details}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground flex-shrink-0">
            {event.agentInitials}
          </span>
          <span className="text-[10px] text-muted-foreground/60">{event.agent}</span>
          <span className="text-muted-foreground/30">·</span>
          <span className="text-[10px] text-muted-foreground/60">{event.timestamp}</span>
        </div>
      </div>
    </div>
  )
}

interface RecentActivityFeedProps {
  loading?: boolean
}

export function RecentActivityFeed({ loading }: RecentActivityFeedProps) {
  const [openModal, setOpenModal] = React.useState(false)

  if (loading) {
    return (
      <Card className="shadow-sm h-full">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-0 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  // Display top 4 clean items matching reference image
  const displayItems = recentActivity.slice(0, 4)

  return (
    <>
      <Card className="shadow-sm h-full flex flex-col">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          <button
            onClick={() => setOpenModal(true)}
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium focus-visible:outline-none"
          >
            View all →
          </button>
        </CardHeader>
        <CardContent className="pt-2 flex-1 flex flex-col justify-around">
          {displayItems.map((event) => {
            const cfg = typeConfig[event.type]
            const Icon = cfg.icon
            const title = event.lead ? `${cfg.label} with ${event.lead}` : event.details

            return (
              <div key={event.id} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0 text-xs">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", cfg.bgColor)}>
                    <Icon className={cn("h-4 w-4", cfg.iconColor)} aria-hidden />
                  </div>
                  <span className="font-medium text-foreground truncate">{title}</span>
                </div>
                <span className="text-[10px] text-muted-foreground flex-shrink-0 tabular-nums">{event.timestamp}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* View All Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">All Recent Activity</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-2 space-y-1">
            {recentActivity.map((event) => (
              <ActivityRow key={event.id} event={event} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
