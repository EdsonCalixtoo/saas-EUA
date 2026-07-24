"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { ChartDataPoint } from "@/lib/mock-data/analytics"
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface RevenueChartProps {
  data: ChartDataPoint[]
  selectedMetric?: string
  onSelectMetric?: (metric: string) => void
}

const attributeOptions = [
  { id: "all", label: "All Attributes", key: "revenue" },
  { id: "revenue", label: "Revenue ($)", key: "revenue" },
  { id: "deals", label: "Deals Closed", key: "deals" },
  { id: "calls", label: "Calls", key: "calls" },
  { id: "conversion", label: "Conversion Rate (%)", key: "conversion" },
]

export function RevenueChart({ data, selectedMetric = "all", onSelectMetric }: RevenueChartProps) {
  const [currentAttr, setCurrentAttr] = React.useState<string>(selectedMetric)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    setCurrentAttr(selectedMetric)
  }, [selectedMetric])

  const activeOption = attributeOptions.find((o) => o.id === currentAttr) || attributeOptions[0]

  const handleSelect = (id: string) => {
    setCurrentAttr(id)
    if (onSelectMetric) onSelectMetric(id)
    setDropdownOpen(false)
  }

  const getYConfig = () => {
    switch (currentAttr) {
      case "deals":
        return {
          dataKey: "deals",
          domain: [0, 12],
          ticks: [0, 6, 12],
          formatter: (v: number) => `${v}`,
          tooltipLabel: (v: number) => `${v} Deals`,
          strokeColor: "#7C3AED",
        }
      case "calls":
        return {
          dataKey: "calls",
          domain: [0, 50],
          ticks: [0, 25, 50],
          formatter: (v: number) => `${v}`,
          tooltipLabel: (v: number) => `${v} Chamadas`,
          strokeColor: "#2563EB",
        }
      case "conversion":
        return {
          dataKey: "conversion",
          domain: [0, 10],
          ticks: [0, 5, 10],
          formatter: (v: number) => `${v}%`,
          tooltipLabel: (v: number) => `${v}% Taxa`,
          strokeColor: "#16A34A",
        }
      case "revenue":
      case "all":
      default:
        return {
          dataKey: "revenue",
          domain: [0, 65000],
          ticks: [0, 30000, 60000],
          formatter: (v: number) => (v === 0 ? "$0" : `$${v / 1000}K`),
          tooltipLabel: (v: number) => `$${v.toLocaleString()}`,
          strokeColor: "#7C3AED",
        }
    }
  }

  const yConfig = getYConfig()

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs">
      {/* Header Row: Title & Filter Select Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Revenue Over Time
        </h2>

        <div className="flex flex-col items-end gap-1">
          <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span>{activeOption.label}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="w-52 p-1 rounded-2xl shadow-xl border-slate-200 dark:border-slate-800">
              <div className="flex flex-col gap-0.5">
                {attributeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left",
                      currentAttr === opt.id
                        ? "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <span>{opt.label}</span>
                    {currentAttr === opt.id && <Check className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Sliders icon underneath select */}
          <div className="pr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
            <SlidersHorizontal className="h-3.5 w-3.5 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Chart Area Container */}
      <div className="h-[340px] min-h-[320px] w-full pt-2 relative">
        {!isMounted ? (
          <div className="h-full w-full flex items-center justify-center p-4">
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320} minHeight={300}>
            <AreaChart data={data} margin={{ top: 15, right: 15, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsPurpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={yConfig.strokeColor} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={yConfig.strokeColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>

              {/* Grid with vertical dashed lines matching screenshot */}
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={true}
                horizontal={true}
                stroke="#E4E4E7"
                opacity={0.6}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 13, fontWeight: 500 }}
                ticks={["Apr 29", "May 6", "May 13", "May 20", "May 27"]}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 13, fontWeight: 500 }}
                domain={yConfig.domain}
                ticks={yConfig.ticks}
                tickFormatter={yConfig.formatter}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as ChartDataPoint
                    const val = payload[0].value as number
                    return (
                      <div className="rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-3 text-xs font-semibold shadow-xl flex flex-col gap-0.5 border border-slate-700 dark:border-slate-300">
                        <span className="text-slate-400 dark:text-slate-500 font-medium">
                          {item.displayDate}
                        </span>
                        <span className="text-base font-bold">
                          {yConfig.tooltipLabel(val)}
                        </span>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Area
                type="monotone"
                dataKey={yConfig.dataKey}
                stroke={yConfig.strokeColor}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#analyticsPurpleGradient)"
                dot={{
                  r: 4.5,
                  fill: yConfig.strokeColor,
                  stroke: "#FFFFFF",
                  strokeWidth: 2.5,
                }}
                activeDot={{
                  r: 7.5,
                  fill: yConfig.strokeColor,
                  stroke: "#FFFFFF",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
