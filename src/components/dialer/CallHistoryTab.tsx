"use client"

import * as React from "react"
import Image from "next/image"
import { CallHistoryItem } from "@/lib/mock-data/dialer"
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CallHistoryTabProps {
  history: CallHistoryItem[]
  onCallContact: (name: string, phone: string, avatarUrl: string) => void
}

export function CallHistoryTab({ history, onCallContact }: CallHistoryTabProps) {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Histórico de Chamadas
        </h2>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {history.length} registros
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800 mt-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 px-2 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                <Image
                  src={item.avatarUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    {item.name}
                  </span>
                  {item.type === "outbound" && (
                    <PhoneOutgoing className="h-3.5 w-3.5 text-blue-500" />
                  )}
                  {item.type === "inbound" && (
                    <PhoneIncoming className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                  {item.type === "missed" && (
                    <PhoneMissed className="h-3.5 w-3.5 text-red-500" />
                  )}
                </div>

                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.phone} • {item.timestamp}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.duration}
                </span>
                <span className="text-[11px] font-medium capitalize text-slate-400">
                  {item.status}
                </span>
              </div>

              <Button
                onClick={() => onCallContact(item.name, item.phone, item.avatarUrl)}
                variant="outline"
                size="sm"
                className="h-9 w-9 p-0 rounded-full border-slate-200 dark:border-slate-700 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              >
                <Phone className="h-4 w-4 fill-current" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
