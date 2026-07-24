"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { leadSources } from "@/lib/mock-data/dashboard"
import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"

function formatCurrency(val: number): string {
  if (val === 0) return "Free"
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
  return `$${val}`
}

function formatRevenue(val: number): string {
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
  return `$${val}`
}

function RateBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-full max-w-[60px] overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground/50"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-foreground">{value}%</span>
    </div>
  )
}

interface LeadSourceTableProps {
  loading?: boolean
}

export function LeadSourceTable({ loading }: LeadSourceTableProps) {
  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Lead Source Performance</CardTitle>
        <CardDescription>Contact, appointment, and conversion rates per channel</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Lead source performance table">
            <thead>
              <tr className="border-b border-border-subtle">
                <th scope="col" className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60">Source</th>
                <th scope="col" className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60">Leads</th>
                <th scope="col" className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60 hidden md:table-cell">Contact Rate</th>
                <th scope="col" className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60 hidden lg:table-cell">Appt. Rate</th>
                <th scope="col" className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60 hidden md:table-cell">Conv. Rate</th>
                <th scope="col" className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60 hidden lg:table-cell">CPL</th>
                <th scope="col" className="px-6 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {leadSources.map((src, idx) => (
                <tr
                  key={src.id}
                  className={cn(
                    "border-b border-border-subtle last:border-0",
                    "hover:bg-muted/40 transition-colors duration-100"
                  )}
                >
                  <td className="px-6 py-3.5 font-medium text-foreground">{src.source}</td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-muted-foreground font-mono text-xs">{src.leads}</td>
                  <td className="px-4 py-3.5 hidden md:table-cell"><RateBar value={src.contactRate} /></td>
                  <td className="px-4 py-3.5 hidden lg:table-cell"><RateBar value={src.appointmentRate} /></td>
                  <td className="px-4 py-3.5 hidden md:table-cell"><RateBar value={src.conversionRate} /></td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-xs text-muted-foreground hidden lg:table-cell">{formatCurrency(src.costPerLead)}</td>
                  <td className="px-6 py-3.5 text-right tabular-nums text-xs font-semibold text-foreground">{formatRevenue(src.revenueGenerated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
