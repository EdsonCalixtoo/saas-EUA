"use client"

import * as React from "react"
import { ChartDataPoint } from "@/lib/mock-data/analytics"
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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

// Smooth Catmull-Rom spline curve generator for SVG
function getCatmullRomPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ""
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6

    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

export function RevenueChart({ data, selectedMetric = "all", onSelectMetric }: RevenueChartProps) {
  const [currentAttr, setCurrentAttr] = React.useState<string>(selectedMetric)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

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
          getValue: (d: ChartDataPoint) => d.deals,
          maxVal: 12,
          yTicks: [
            { val: 12, label: "12" },
            { val: 6, label: "6" },
            { val: 0, label: "0" },
          ],
          formatTooltip: (v: number) => `${v} Negócios Fechados`,
          strokeColor: "#7C3AED",
        }
      case "calls":
        return {
          getValue: (d: ChartDataPoint) => d.calls,
          maxVal: 50,
          yTicks: [
            { val: 50, label: "50" },
            { val: 25, label: "25" },
            { val: 0, label: "0" },
          ],
          formatTooltip: (v: number) => `${v} Chamadas`,
          strokeColor: "#2563EB",
        }
      case "conversion":
        return {
          getValue: (d: ChartDataPoint) => d.conversion,
          maxVal: 10,
          yTicks: [
            { val: 10, label: "10%" },
            { val: 5, label: "5%" },
            { val: 0, label: "0%" },
          ],
          formatTooltip: (v: number) => `${v}% Conversão`,
          strokeColor: "#16A34A",
        }
      case "revenue":
      case "all":
      default:
        return {
          getValue: (d: ChartDataPoint) => d.revenue,
          maxVal: 65000,
          yTicks: [
            { val: 60000, label: "$60K" },
            { val: 30000, label: "$30K" },
            { val: 0, label: "$0" },
          ],
          formatTooltip: (v: number) => `$${v.toLocaleString()}`,
          strokeColor: "#7C3AED",
        }
    }
  }

  const yConfig = getYConfig()

  // SVG Geometry Dimensions
  const width = 800
  const height = 280
  const paddingLeft = 55
  const paddingRight = 20
  const paddingTop = 25
  const paddingBottom = 40

  const chartWidth = width - paddingLeft - paddingRight
  const chartHeight = height - paddingTop - paddingBottom

  // Map data points to SVG coordinates
  const points = data.map((d, i) => {
    const val = yConfig.getValue(d)
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth
    const y = paddingTop + chartHeight - (val / yConfig.maxVal) * chartHeight
    return { x, y, val, item: d }
  })

  const linePath = getCatmullRomPath(points)
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(paddingTop + chartHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(paddingTop + chartHeight).toFixed(1)} Z`
    : ""

  // X Axis Ticks matching screenshot: Apr 29, May 6, May 13, May 20, May 27
  const xAxisTicks = [
    { label: "Apr 29", index: 0 },
    { label: "May 6", index: 7 },
    { label: "May 13", index: 14 },
    { label: "May 20", index: 21 },
    { label: "May 27", index: 28 },
  ]

  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null

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
            <PopoverContent side="bottom" align="end" className="w-52 p-1 rounded-2xl shadow-xl border-slate-200 dark:border-slate-800 z-50">
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

      {/* ─── Ultra-Reliable Native SVG Chart Area ─── */}
      <div className="w-full relative select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="areaPurpleFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={yConfig.strokeColor} stopOpacity={0.28} />
              <stop offset="100%" stopColor={yConfig.strokeColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* Horizontal Dashed Grid Lines & Y-Axis Labels */}
          {yConfig.yTicks.map((tick) => {
            const yPos = paddingTop + chartHeight - (tick.val / yConfig.maxVal) * chartHeight
            return (
              <g key={tick.val}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={width - paddingRight}
                  y2={yPos}
                  stroke="#E4E4E7"
                  strokeDasharray={tick.val === 0 ? "none" : "4 4"}
                  strokeWidth={1}
                  opacity={0.7}
                />
                <text
                  x={paddingLeft - 12}
                  y={yPos + 4}
                  textAnchor="end"
                  fill="#64748B"
                  fontSize="13"
                  fontWeight="600"
                >
                  {tick.label}
                </text>
              </g>
            )
          })}

          {/* Vertical Grid Lines Under Points (Matching Image) */}
          {points.map((pt, idx) => (
            <line
              key={`vert-${idx}`}
              x1={pt.x}
              y1={pt.y}
              x2={pt.x}
              y2={paddingTop + chartHeight}
              stroke="#E4E4E7"
              strokeDasharray="2 3"
              strokeWidth={1}
              opacity={0.45}
            />
          ))}

          {/* Area Fill Gradient */}
          <path
            d={areaPath}
            fill="url(#areaPurpleFill)"
          />

          {/* Curve Line */}
          <path
            d={linePath}
            fill="none"
            stroke={yConfig.strokeColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Dots for Data Points */}
          {points.map((pt, idx) => (
            <circle
              key={`dot-${idx}`}
              cx={pt.x}
              cy={pt.y}
              r={hoveredIndex === idx ? 6.5 : 4}
              fill={yConfig.strokeColor}
              stroke="#FFFFFF"
              strokeWidth={2.5}
              className="transition-all duration-150 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}

          {/* X Axis Labels */}
          {xAxisTicks.map((xt) => {
            const pt = points[xt.index]
            if (!pt) return null
            return (
              <text
                key={xt.label}
                x={pt.x}
                y={height - 10}
                textAnchor="middle"
                fill="#64748B"
                fontSize="13"
                fontWeight="500"
              >
                {xt.label}
              </text>
            )
          })}

          {/* Transparent Hover Hit Boxes for smooth mouseover */}
          {points.map((pt, idx) => {
            const colWidth = chartWidth / (points.length - 1)
            return (
              <rect
                key={`hit-${idx}`}
                x={pt.x - colWidth / 2}
                y={paddingTop}
                width={colWidth}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            )
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 z-30"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
            }}
          >
            <div className="rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-2.5 px-3.5 text-xs font-semibold shadow-xl flex flex-col gap-0.5 border border-slate-700 dark:border-slate-300">
              <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px]">
                {hoveredPoint.item.displayDate}
              </span>
              <span className="text-sm font-bold text-white dark:text-slate-900">
                {yConfig.formatTooltip(hoveredPoint.val)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
