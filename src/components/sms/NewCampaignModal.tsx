"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SmsCampaign } from "@/lib/mock-data/sms"
import { toast } from "sonner"

interface NewCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCampaign: (campaign: SmsCampaign) => void
}

export function NewCampaignModal({
  open,
  onOpenChange,
  onAddCampaign,
}: NewCampaignModalProps) {
  const [name, setName] = React.useState("")
  const [audience, setAudience] = React.useState("Motivated Sellers")
  const [message, setMessage] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Por favor, informe o nome da campanha")
      return
    }

    const newCampaign: SmsCampaign = {
      id: `sms-${Date.now()}`,
      name: name.trim(),
      sentCount: Math.floor(Math.random() * 1500) + 500,
      deliveryRate: Math.floor(Math.random() * 8) + 92, // 92% - 99%
      status: "completed",
      createdAt: new Date().toISOString().split("T")[0],
      audience: audience,
      messageSnippet: message.trim() || "Campanha de disparo de SMS em lote.",
    }

    onAddCampaign(newCampaign)
    toast.success(`Campanha "${newCampaign.name}" criada e enviada com sucesso!`)

    setName("")
    setMessage("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Nova Campanha de SMS
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nome da Campanha *
            </label>
            <Input
              placeholder="Ex: Spring Property Outreach"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl h-10"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Público-Alvo / Lista
            </label>
            <Select value={audience} onValueChange={(val) => val && setAudience(val)}>
              <SelectTrigger className="rounded-xl h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Motivated Sellers">Motivated Sellers</SelectItem>
                <SelectItem value="Vacant Property List">Vacant Property List</SelectItem>
                <SelectItem value="VIP Investors">VIP Investors</SelectItem>
                <SelectItem value="Absentee Owners">Absentee Owners</SelectItem>
                <SelectItem value="Pre-Foreclosure">Pre-Foreclosure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Mensagem de SMS
            </label>
            <Textarea
              placeholder="Digite a mensagem do SMS que será enviada para o grupo..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl min-h-[100px] text-sm"
            />
          </div>

          <DialogFooter className="mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl h-10"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#00965e] hover:bg-[#008050] text-white rounded-xl h-10 font-semibold px-5"
            >
              Disparar Campanha
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
