"use client"

import * as React from "react"
import { Phone, X } from "lucide-react"
import {
  initialNextCall,
  initialCallQueue,
  initialCallHistory,
  DialerContact,
  CallHistoryItem,
} from "@/lib/mock-data/dialer"
import { PowerDialerTab } from "./PowerDialerTab"
import { CallHistoryTab } from "./CallHistoryTab"
import { KeypadModal } from "./KeypadModal"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function DialerScreen() {
  const [activeTab, setActiveTab] = React.useState<"power" | "history">("power")

  const [nextCall, setNextCall] = React.useState<DialerContact>(initialNextCall)
  const [queue, setQueue] = React.useState<DialerContact[]>(initialCallQueue)
  const [history, setHistory] = React.useState<CallHistoryItem[]>(initialCallHistory)

  // Active call state initialized at 92s (01:32) matching screenshot!
  const [activeCall, setActiveCall] = React.useState({
    contact: initialNextCall,
    duration: 92,
    isRecording: true,
    isMuted: false,
    isActive: true,
  })

  const [isKeypadOpen, setIsKeypadOpen] = React.useState(false)

  // Timer effect for active call
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeCall.isActive) {
      interval = setInterval(() => {
        setActiveCall((prev) => ({ ...prev, duration: prev.duration + 1 }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCall.isActive])

  const handleStartCall = (contact: DialerContact) => {
    setActiveCall({
      contact,
      duration: 0,
      isRecording: true,
      isMuted: false,
      isActive: true,
    })
    toast.success(`Chamando ${contact.name}...`)
  }

  const handleEndCall = () => {
    if (!activeCall.isActive) return

    toast.info(`Chamada com ${activeCall.contact.name} encerrada.`)

    // Add to history log
    const newHistoryItem: CallHistoryItem = {
      id: `hist-${Date.now()}`,
      name: activeCall.contact.name,
      phone: activeCall.contact.phone,
      avatarUrl: activeCall.contact.avatarUrl,
      timestamp: "Agora",
      duration: `${Math.floor(activeCall.duration / 60)
        .toString()
        .padStart(2, "0")}:${(activeCall.duration % 60)
        .toString()
        .padStart(2, "0")}`,
      type: "outbound",
      status: "completed",
    }
    setHistory((prev) => [newHistoryItem, ...prev])

    // Promote first item from queue to Next Call
    if (queue.length > 0) {
      const [promoted, ...remainingQueue] = queue
      setNextCall(promoted)
      setQueue(remainingQueue)
    }

    setActiveCall((prev) => ({ ...prev, isActive: false }))
  }

  const handleToggleMute = () => {
    setActiveCall((prev) => {
      const nextMuted = !prev.isMuted
      toast(nextMuted ? "Microfone silenciado" : "Microfone ativado")
      return { ...prev, isMuted: nextMuted }
    })
  }

  const handleCallCustomNumber = (num: string) => {
    const customContact: DialerContact = {
      id: `custom-${Date.now()}`,
      name: `Número ${num}`,
      phone: num,
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    }
    handleStartCall(customContact)
  }

  return (
    <div className="flex flex-col h-full w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* ─── Top Header: Icon + Title + Close X ─── */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/60 shadow-2xs">
            <Phone className="h-6 w-6 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Dialer
          </h1>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-6 w-6 stroke-[2]" />
        </button>
      </div>

      {/* ─── Top Navigation Tabs ─── */}
      <div className="flex items-end gap-2 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("power")}
          className={cn(
            "rounded-t-2xl px-6 py-3 font-bold text-sm transition-all duration-150 relative",
            activeTab === "power"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-t border-x border-slate-200/80 dark:border-slate-800 shadow-2xs -mb-px"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
          )}
        >
          Power Dialer
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={cn(
            "rounded-t-2xl px-6 py-3 font-semibold text-sm transition-all duration-150 relative",
            activeTab === "history"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-t border-x border-slate-200/80 dark:border-slate-800 shadow-2xs -mb-px font-bold"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          )}
        >
          Call History
        </button>
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="flex-1 rounded-b-3xl rounded-tr-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs mt-0">
        {activeTab === "power" ? (
          <PowerDialerTab
            nextCall={nextCall}
            queue={queue}
            activeCall={activeCall}
            onStartCall={handleStartCall}
            onEndCall={handleEndCall}
            onToggleMute={handleToggleMute}
            onOpenKeypad={() => setIsKeypadOpen(true)}
          />
        ) : (
          <CallHistoryTab
            history={history}
            onCallContact={(name, phone, avatarUrl) => {
              setActiveTab("power")
              handleStartCall({ id: `hist-call-${Date.now()}`, name, phone, avatarUrl })
            }}
          />
        )}
      </div>

      {/* Keypad Modal */}
      <KeypadModal
        open={isKeypadOpen}
        onOpenChange={setIsKeypadOpen}
        onMakeCall={handleCallCustomNumber}
      />
    </div>
  )
}
