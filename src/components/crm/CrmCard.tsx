"use client"

import * as React from "react"
import Image from "next/image"
import { Lead } from "@/lib/mock-data/crm"
import { cn } from "@/lib/utils"

interface CrmCardProps {
  lead: Lead
  onClick: (lead: Lead) => void
  isDragging?: boolean
}

export function CrmCard({ lead, onClick, isDragging }: CrmCardProps) {
  // Handle image error fallback
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      onClick={() => onClick(lead)}
      className={cn(
        "group relative flex items-center gap-3.5 rounded-2xl bg-white dark:bg-slate-900 p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "border border-slate-100 dark:border-slate-800/80 transition-all duration-150 cursor-pointer select-none",
        "hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 active:scale-[0.99]",
        isDragging && "opacity-50 scale-105 shadow-xl ring-2 ring-emerald-500 z-50"
      )}
    >
      {/* Avatar Container */}
      <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-slate-100 dark:border-slate-800 shadow-2xs">
        {imgError || !lead.avatarUrl ? (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm">
            {lead.name.slice(0, 2).toUpperCase()}
          </div>
        ) : (
          <Image
            src={lead.avatarUrl}
            alt={lead.name}
            fill
            sizes="44px"
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        )}
      </div>

      {/* Info Container */}
      <div className="flex flex-col min-w-0 flex-1 justify-center leading-tight">
        <span className="font-bold text-[14px] text-slate-800 dark:text-slate-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {lead.name}
        </span>
        <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 truncate mt-0.5">
          {lead.company}
        </span>
      </div>
    </div>
  )
}
