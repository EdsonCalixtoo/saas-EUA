"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, Delete } from "lucide-react"

interface KeypadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMakeCall?: (number: string) => void
}

export function KeypadModal({ open, onOpenChange, onMakeCall }: KeypadModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState("")

  const handleKeyPress = (digit: string) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber((prev) => prev + digit)
    }
  }

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1))
  }

  const handleCall = () => {
    if (phoneNumber.trim() && onMakeCall) {
      onMakeCall(phoneNumber)
      onOpenChange(false)
      setPhoneNumber("")
    }
  }

  const keys = [
    { num: "1", sub: "" },
    { num: "2", sub: "ABC" },
    { num: "3", sub: "DEF" },
    { num: "4", sub: "GHI" },
    { num: "5", sub: "JKL" },
    { num: "6", sub: "MNO" },
    { num: "7", sub: "PQRS" },
    { num: "8", sub: "TUV" },
    { num: "9", sub: "WXYZ" },
    { num: "*", sub: "" },
    { num: "0", sub: "+" },
    { num: "#", sub: "" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[360px] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-slate-900 dark:text-slate-100">
            Teclado Numérico
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 mt-2">
          {/* Display */}
          <div className="flex items-center justify-between w-full h-12 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xl font-bold tracking-wider">
            <span className="truncate flex-1 text-center">{phoneNumber || "Digite o número"}</span>
            {phoneNumber && (
              <button
                onClick={handleDelete}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1"
                aria-label="Apagar"
              >
                <Delete className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {keys.map((k) => (
              <button
                key={k.num}
                onClick={() => handleKeyPress(k.num)}
                className="flex flex-col items-center justify-center h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-all duration-150 active:scale-95 border border-slate-100 dark:border-slate-800 shadow-2xs"
              >
                <span className="text-xl font-bold leading-none">{k.num}</span>
                {k.sub && (
                  <span className="text-[9px] font-semibold text-slate-400 mt-0.5 tracking-widest">
                    {k.sub}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Call Action Button */}
          <Button
            onClick={handleCall}
            disabled={!phoneNumber}
            className="w-full h-12 rounded-2xl bg-[#00965e] hover:bg-[#008050] text-white font-semibold text-base shadow-sm gap-2"
          >
            <Phone className="h-5 w-5 fill-current" />
            Ligar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
