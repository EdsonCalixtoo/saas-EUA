"use client"

import * as React from "react"
import { SmsTemplate } from "@/lib/mock-data/sms"
import { Copy, MessageSquareCode, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface TemplatesTabProps {
  templates: SmsTemplate[]
}

export function TemplatesTab({ templates }: TemplatesTabProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleCopy = (tpl: SmsTemplate) => {
    navigator.clipboard.writeText(tpl.body)
    setCopiedId(tpl.id)
    toast.success(`Template "${tpl.title}" copiado para a área de transferência!`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Modelos de SMS (Templates)
        </h2>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {templates.length} modelos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 gap-3"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  {tpl.title}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/40">
                  {tpl.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 leading-relaxed font-mono">
                "{tpl.body}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-400">
                Usado {tpl.usedCount} vezes
              </span>
              <Button
                onClick={() => handleCopy(tpl)}
                variant="outline"
                size="sm"
                className="h-8 rounded-xl text-xs gap-1.5 font-semibold text-slate-700 dark:text-slate-200"
              >
                {copiedId === tpl.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
