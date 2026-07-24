"use client"

import * as React from "react"
import { Check, Phone, Calendar, ArrowRight, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { tasks, type Task } from "@/lib/mock-data/dashboard"
import { cn } from "@/lib/utils"

const typeIcon: Record<Task["type"], React.ElementType> = {
  call: Phone,
  appointment: Calendar,
  followup: ArrowRight,
  task: Check,
}

const typeColor: Record<Task["type"], string> = {
  call: "text-info bg-info/10",
  appointment: "text-ai bg-ai/10",
  followup: "text-warning bg-warning/10",
  task: "text-muted-foreground bg-muted",
}

interface TasksWidgetProps {
  loading?: boolean
}

export function TasksWidget({ loading }: TasksWidgetProps) {
  if (loading) {
    return (
      <Card className="shadow-sm h-full">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
              <div className="space-y-1.5 flex-1 pt-1">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  // Filter to upcoming tasks
  const displayTasks = tasks.filter(t => t.status !== "completed").slice(0, 4)

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          {displayTasks.map((task) => {
            const Icon = typeIcon[task.type] || Check
            return (
              <div key={task.id} className="flex items-start gap-3 group">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", typeColor[task.type])}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-snug line-clamp-1">{task.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {task.due}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-border-subtle">
          <a href="/tasks" className="text-[11px] font-medium text-foreground hover:underline">
            View all
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
