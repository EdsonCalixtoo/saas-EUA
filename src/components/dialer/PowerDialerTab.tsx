"use client"

import * as React from "react"
import { Image } from "@/components/ui/image"
import { Phone, Mic, MicOff, Grid, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialerContact } from "@/lib/mock-data/dialer"
import { cn } from "@/lib/utils"

interface PowerDialerTabProps {
  nextCall: DialerContact
  queue: DialerContact[]
  activeCall: {
    contact: DialerContact
    duration: number
    isRecording: boolean
    isMuted: boolean
    isActive: boolean
  }
  onStartCall: (contact: DialerContact) => void
  onEndCall: () => void
  onToggleMute: () => void
  onOpenKeypad: () => void
}

export function PowerDialerTab({
  nextCall,
  queue,
  activeCall,
  onStartCall,
  onEndCall,
  onToggleMute,
  onOpenKeypad,
}: PowerDialerTabProps) {
  // Format timer duration seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Generate smooth animated height values for waveform
  const waveformHeights = [
    12, 24, 42, 65, 30, 18, 12, 28, 48, 32, 20, 36, 72, 80, 50, 24, 38, 58, 40,
    22, 14, 28, 52, 34, 18, 10,
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ─── LEFT PANEL (Next Call & Call Queue) ─── */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Next Call Section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Next Call
          </h2>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                <Image
                  src={nextCall.avatarUrl}
                  alt={nextCall.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex flex-col justify-center leading-tight">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {nextCall.name}
                </span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {nextCall.phone}
                </span>
              </div>
            </div>

            <Button
              onClick={() => onStartCall(nextCall)}
              className="w-full h-11 rounded-xl bg-[#00965e] hover:bg-[#008050] text-white font-semibold text-base shadow-2xs gap-2 transition-all active:scale-[0.99]"
            >
              <Phone className="h-4 w-4 fill-current" />
              Call
            </Button>
          </div>
        </div>

        {/* Call Queue Section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Call Queue ({queue.length})
          </h2>

          <div className="flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-[#F8F9FC] dark:bg-slate-800/40 divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden">
            {queue.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-3.5 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="relative h-11 w-11 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                  <Image
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex flex-col justify-center leading-tight">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {item.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.phone}
                  </span>
                </div>
              </div>
            ))}

            {queue.length === 0 && (
              <div className="p-6 text-center text-xs font-semibold text-slate-400">
                Fila de chamadas vazia
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL (Active Call) ─── */}
      <div className="lg:col-span-7 flex flex-col gap-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Active Call
        </h2>

        <div className="flex flex-col justify-between items-center text-center min-h-[440px] rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs">
          {/* Active Call Contact Title (if call active) */}
          <div className="flex flex-col items-center">
            {activeCall.isActive && (
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Em chamada com {activeCall.contact.name}
              </span>
            )}

            {/* Timer */}
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-2">
              {formatTime(activeCall.duration)}
            </div>
          </div>

          {/* Audio Waveform Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-20 my-4 w-full max-w-[320px]">
            {waveformHeights.map((h, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-1 rounded-full transition-all duration-300",
                  activeCall.isActive
                    ? "bg-slate-400 dark:bg-slate-500 animate-pulse"
                    : "bg-slate-300 dark:bg-slate-700"
                )}
                style={{
                  height: activeCall.isActive
                    ? `${Math.max(10, (h * (idx % 2 === 0 ? 1 : 0.7)))}%`
                    : `${Math.max(15, h * 0.4)}%`,
                  animationDelay: `${idx * 50}ms`,
                }}
              />
            ))}
          </div>

          {/* Recording indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span>Recording</span>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-slate-100 dark:border-slate-800 my-2" />

          {/* Controls Row: Mute, Keypad, End Call */}
          <div className="flex items-center justify-center gap-8 sm:gap-10 pt-2">
            {/* Mute Button */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={onToggleMute}
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-150 active:scale-95 shadow-2xs",
                  activeCall.isMuted
                    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                )}
                aria-label="Mute"
              >
                {activeCall.isMuted ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6 stroke-[2]" />
                )}
              </button>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {activeCall.isMuted ? "Muted" : "Mute"}
              </span>
            </div>

            {/* Keypad Button */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={onOpenKeypad}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-150 active:scale-95 shadow-2xs"
                aria-label="Keypad"
              >
                <Grid className="h-6 w-6 stroke-[2]" />
              </button>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Keypad
              </span>
            </div>

            {/* End Call Button */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={onEndCall}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-md transition-all duration-150 active:scale-95"
                aria-label="End Call"
              >
                <PhoneOff className="h-6 w-6 stroke-[2.2]" />
              </button>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                End Call
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
