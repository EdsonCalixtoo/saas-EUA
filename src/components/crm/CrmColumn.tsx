"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { ColumnData, Lead } from "@/lib/mock-data/crm"
import { CrmCard } from "./CrmCard"
import { cn } from "@/lib/utils"

interface CrmColumnProps {
  column: ColumnData
  leads: Lead[]
  onCardClick: (lead: Lead) => void
  onAddLeadToColumn: (columnId: ColumnData["id"]) => void
}

export function CrmColumn({
  column,
  leads,
  onCardClick,
  onAddLeadToColumn,
}: CrmColumnProps) {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 min-w-[240px] max-w-[320px] rounded-[24px] p-4 gap-3.5 border transition-all duration-200",
        column.bgClass
      )}
    >
      {/* Header Info */}
      <div className="flex flex-col px-1 pt-1 pb-1">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {column.title}
        </h3>
        <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200 mt-1">
          {leads.length} Leads
        </span>
        <span className="text-[15px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
          {column.totalValue}
        </span>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-0.5 min-h-[350px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
        {leads.map((lead) => (
          <CrmCard
            key={lead.id}
            lead={lead}
            onClick={onCardClick}
          />
        ))}

        {leads.length === 0 && (
          <div className="flex flex-1 items-center justify-center p-6 border-2 border-dashed border-slate-200/80 dark:border-slate-800 rounded-2xl text-slate-400 text-xs font-medium text-center">
            Nenhum lead nesta coluna
          </div>
        )}
      </div>

      {/* Bottom Add (+) Button */}
      <button
        onClick={() => onAddLeadToColumn(column.id)}
        className="mt-auto flex h-11 w-full items-center justify-center rounded-xl bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-150 shadow-2xs hover:shadow-xs group"
        aria-label={`Adicionar lead em ${column.title}`}
      >
        <Plus className="h-5 w-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
      </button>
    </div>
  )
}
