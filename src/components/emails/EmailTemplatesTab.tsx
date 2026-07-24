"use client"

import * as React from "react"
import { EmailTemplate } from "@/lib/mock-data/email"
import { Copy, MailCheck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface EmailTemplatesTabProps {
  templates: EmailTemplate[]
}

export function EmailTemplatesTab({ templates }: EmailTemplatesTabProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleCopy = (tpl: EmailTemplate) => {
    navigator.clipboard.writeText(`Subject: ${tpl.subject}\n\n${tpl.previewText}`)
    setCopiedId(tpl.id)
    toast.success(`Template de e-mail "${tpl.title}" copiado!`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Modelos de E-mail (Templates)
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  {tpl.title}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-100 dark:border-purple-900/40">
                  {tpl.category}
                </span>
              </div>

              <div className="flex flex-col bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 gap-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Assunto: {tpl.subject}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                  {tpl.previewText}
                </p>
              </div>
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
                    Copiar Template
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
