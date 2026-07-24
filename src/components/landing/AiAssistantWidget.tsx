"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Sparkles, X, Send, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inputMsg, setInputMsg] = React.useState("")
  const [messages, setMessages] = React.useState<Array<{ sender: "ai" | "user"; text: string }>>([
    {
      sender: "ai",
      text: "Olá! Sou a IA da PropFlow. Qual tipo de imóvel você está procurando hoje?",
    },
  ])

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMsg
    if (!text.trim()) return

    setMessages((prev) => [...prev, { sender: "user", text }])
    if (!textToSend) setInputMsg("")

    // Simulated AI Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Encontrei 3 excelentes opções de imóveis para "${text}". Deseja visualizar as fotos ou agendar uma visita virtual?`,
        },
      ])
    }, 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[340px] sm:w-[380px] h-[460px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden mb-4"
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-sm flex items-center gap-1">
                    PropFlow AI
                    <Sparkles className="h-3 w-3 text-amber-400" />
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">Online 24/7</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  {m.sender === "ai" && (
                    <div className="h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl leading-relaxed ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-2xs rounded-bl-none font-medium"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto bg-white dark:bg-slate-900 text-[11px]">
              <button
                onClick={() => handleSend("Casas Alphaville 4 quartos")}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold shrink-0"
              >
                🏠 Alphaville
              </button>
              <button
                onClick={() => handleSend("Cobertura em Ipanema")}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold shrink-0"
              >
                🌊 Cobertura Ipanema
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Input
                placeholder="Pergunte qualquer coisa sobre imóveis..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="rounded-xl h-10 text-xs"
              />
              <Button onClick={() => handleSend()} className="h-10 w-10 p-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-full shadow-2xl shadow-indigo-500/40 font-bold text-sm border border-white/20"
        >
          <div className="relative">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white animate-pulse" />
          </div>
          <span>IA Imobiliária</span>
        </motion.button>
      )}
    </div>
  )
}
