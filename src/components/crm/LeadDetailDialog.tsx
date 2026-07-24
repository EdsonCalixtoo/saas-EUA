"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { crmColumns, Lead } from "@/lib/mock-data/crm"
import { Mail, Phone, Building2, Trash2, ArrowRight } from "lucide-react"
import { toast } from "sonner"

interface LeadDetailDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateStatus: (leadId: string, newStatus: Lead["status"]) => void
  onDeleteLead: (leadId: string) => void
}

export function LeadDetailDialog({
  lead,
  open,
  onOpenChange,
  onUpdateStatus,
  onDeleteLead,
}: LeadDetailDialogProps) {
  if (!lead) return null

  const handleStatusChange = (newStatus: Lead["status"]) => {
    onUpdateStatus(lead.id, newStatus)
    const columnObj = crmColumns.find((c) => c.id === newStatus)
    toast.success(`Lead movido para a coluna "${columnObj?.title || newStatus}"`)
  }

  const handleDelete = () => {
    onDeleteLead(lead.id)
    toast.success(`Lead ${lead.name} removido`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] rounded-2xl p-6">
        <DialogHeader className="flex flex-row items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-slate-100 dark:border-slate-800 shadow-sm shrink-0">
            <Image
              src={lead.avatarUrl}
              alt={lead.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col text-left">
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {lead.name}
            </DialogTitle>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold mt-0.5">
              <Building2 className="h-4 w-4" />
              <span>{lead.company}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4 py-2 border-y border-slate-100 dark:border-slate-800">
          {/* Change Stage */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Estágio Atual no Pipeline
            </label>
            <Select value={lead.status} onValueChange={(val) => handleStatusChange(val as Lead["status"])}>
              <SelectTrigger className="rounded-xl h-10 font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {crmColumns.map((col) => (
                  <SelectItem key={col.id} value={col.id} className="font-medium">
                    {col.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <Mail className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="truncate">{lead.email || "Não informado"}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <Phone className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="truncate">{lead.phone || "Não informado"}</span>
            </div>
          </div>

          {/* Value */}
          <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300">
            <span className="text-xs font-bold uppercase tracking-wider">Valor Estimado</span>
            <span className="text-lg font-bold">${lead.value.toLocaleString()}</span>
          </div>
        </div>

        <DialogFooter className="mt-2 flex items-center justify-between sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl h-10 gap-1.5 px-3"
          >
            <Trash2 className="h-4 w-4" />
            Remover Lead
          </Button>

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl h-10 px-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
