"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { crmColumns, Lead } from "@/lib/mock-data/crm"
import { toast } from "sonner"

interface AddLeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddLead: (lead: Lead) => void
  defaultStatus?: Lead["status"]
}

const defaultAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
]

export function AddLeadDialog({
  open,
  onOpenChange,
  onAddLead,
  defaultStatus = 'new',
}: AddLeadDialogProps) {
  const [name, setName] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [status, setStatus] = React.useState<Lead["status"]>(defaultStatus)
  const [value, setValue] = React.useState("5000")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState(defaultAvatars[0])

  React.useEffect(() => {
    if (open) {
      setStatus(defaultStatus)
    }
  }, [open, defaultStatus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Por favor, preencha o nome do lead")
      return
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      company: company.trim() || "Empresa Sem Nome",
      status: status,
      value: Number(value) || 0,
      avatarUrl: avatarUrl || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@empresa.com`,
      phone: phone.trim() || '+1 (555) 000-0000',
    }

    onAddLead(newLead)
    toast.success(`Lead ${newLead.name} adicionado com sucesso!`)

    // Reset form
    setName("")
    setCompany("")
    setEmail("")
    setPhone("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Adicionar Novo Lead
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nome Completo *
            </label>
            <Input
              placeholder="Ex: Robert Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl h-10"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Empresa / Organização
            </label>
            <Input
              placeholder="Ex: Baker Johnson Ltda"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Estágio / Coluna
              </label>
              <Select value={status} onValueChange={(val) => setStatus(val as Lead["status"])}>
                <SelectTrigger className="rounded-xl h-10">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {crmColumns.map((col) => (
                    <SelectItem key={col.id} value={col.id}>
                      {col.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Valor Estimado ($)
              </label>
              <Input
                type="number"
                placeholder="5000"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="rounded-xl h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                E-mail
              </label>
              <Input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl h-10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Telefone
              </label>
              <Input
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl h-10"
              />
            </div>
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
              Salvar Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
