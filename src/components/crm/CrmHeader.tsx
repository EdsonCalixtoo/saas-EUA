"use client"

import * as React from "react"
import { ChevronLeft, Plus, Calendar, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CrmHeaderProps {
  onAddLeadClick: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function CrmHeader({ onAddLeadClick, searchQuery, setSearchQuery }: CrmHeaderProps) {
  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        {/* Title with Calendar/Kanban Icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <Calendar className="h-6 w-6 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            CRM – Pipeline
          </h1>
        </div>
      </div>

      {/* Action Sub-Row: Back Arrow & Add Lead Button + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Back button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-transparent text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
          </button>

          {/* Search bar */}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar lead ou empresa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-sm shadow-2xs focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        {/* Right action button (+ Add Lead) */}
        <Button
          onClick={onAddLeadClick}
          className="w-full sm:w-auto bg-[#00965e] hover:bg-[#008050] text-white font-semibold h-11 px-6 rounded-xl shadow-xs transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="h-5 w-5 stroke-[2.5]" />
          Add Lead
        </Button>
      </div>
    </div>
  )
}
