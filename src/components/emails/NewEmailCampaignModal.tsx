"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmailCampaign } from "@/lib/mock-data/email"
import { toast } from "sonner"

interface NewEmailCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCampaign: (campaign: EmailCampaign) => void
}

export function NewEmailCampaignModal({
  open,
  onOpenChange,
  onAddCampaign,
}: NewEmailCampaignModalProps) {
  const [name, setName] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [audience, setAudience] = React.useState("Newsletter Subscribers")
  const [body, setBody] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Por favor, informe o nome da campanha")
      return
    }

    const newCampaign: EmailCampaign = {
      id: `email-${Date.now()}`,
      name: name.trim(),
      sentCount: Math.floor(Math.random() * 1500) + 1200,
      openRate: 81,
      clickRate: Math.floor(Math.random() * 5) + 5, // 5% - 9%
      subject: subject.trim() || "Nova oportunidade de investimento",
      status: "completed",
      createdAt: new Date().toISOString().split("T")[0],
      audience: audience,
    }

    onAddCampaign(newCampaign)
    toast.success(`Campanha de e-mail "${newCampaign.name}" disparada com sucesso!`)

    setName("")
    setSubject("")
    setBody("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Nova Campanha de E-mail
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nome da Campanha *
            </label>
            <Input
              placeholder="Ex: Monthly Property Newsletter"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl h-10"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Assunto do E-mail (Subject Line)
            </label>
            <Input
              placeholder="Ex: Principais oportunidades imobiliárias do mês 🏠"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Público-Alvo / Lista de Destinatários
            </label>
            <Select value={audience} onValueChange={(val) => val && setAudience(val)}>
              <SelectTrigger className="rounded-xl h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Newsletter Subscribers">Newsletter Subscribers</SelectItem>
                <SelectItem value="Active Buyers">Active Buyers</SelectItem>
                <SelectItem value="Cash Buyers List">Cash Buyers List</SelectItem>
                <SelectItem value="Motivated Sellers">Motivated Sellers</SelectItem>
                <SelectItem value="VIP Investors">VIP Investors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Conteúdo do E-mail
            </label>
            <Textarea
              placeholder="Digite o texto principal do e-mail..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
              Disparar E-mails
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
