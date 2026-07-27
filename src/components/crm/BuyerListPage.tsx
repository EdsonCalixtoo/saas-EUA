"use client"

import * as React from "react"
import {
  Users,
  Search,
  Plus,
  Filter,
  DollarSign,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  Send,
  ShieldCheck,
  Zap,
  MapPin,
  TrendingUp,
  Award,
  Sparkles,
  LayoutGrid,
  List as ListIcon,
  Tag,
  Briefcase,
  FileCheck,
  ExternalLink,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export interface CashBuyer {
  id: string
  name: string
  company: string
  avatar: string
  tier: "VIP Buyer" | "Verified POF" | "Standard Investor"
  phone: string
  email: string
  location: string
  pofAmount: string
  strategy: "Fix & Flip" | "Buy & Hold" | "Wholesale / Assignment" | "Multi-Family"
  maxPrice: string
  targetDiscount: string
  closedDealsCount: number
  avgClosingDays: number
  targetZipCodes: string[]
  propertyTypes: string[]
  pofVerified: boolean
}

const mockBuyers: CashBuyer[] = [
  {
    id: "buyer-1",
    name: "Marcus Vance",
    company: "Vance Capital Group LLC",
    avatar: "MV",
    tier: "VIP Buyer",
    phone: "+1 (305) 892-4410",
    email: "marcus@vancecapital.com",
    location: "Miami, FL",
    pofAmount: "$3,500,000",
    strategy: "Fix & Flip",
    maxPrice: "$750,000",
    targetDiscount: "70% MAO",
    closedDealsCount: 18,
    avgClosingDays: 5,
    targetZipCodes: ["33139", "33140", "33141"],
    propertyTypes: ["Single Family", "Townhouse"],
    pofVerified: true,
  },
  {
    id: "buyer-2",
    name: "Elena Rostova",
    company: "Apex Equity Partners",
    avatar: "ER",
    tier: "VIP Buyer",
    phone: "+1 (407) 551-9238",
    email: "elena@apexequity.io",
    location: "Orlando, FL",
    pofAmount: "$5,200,000",
    strategy: "Buy & Hold",
    maxPrice: "$1,200,000",
    targetDiscount: "75% MAO",
    closedDealsCount: 24,
    avgClosingDays: 7,
    targetZipCodes: ["32801", "32803", "32804"],
    propertyTypes: ["Multi-Family 2-4", "Single Family"],
    pofVerified: true,
  },
  {
    id: "buyer-3",
    name: "David Sterling",
    company: "Sterling Real Estate Funds",
    avatar: "DS",
    tier: "Verified POF",
    phone: "+1 (813) 449-1102",
    email: "david@sterlingfunds.com",
    location: "Tampa, FL",
    pofAmount: "$1,800,000",
    strategy: "Fix & Flip",
    maxPrice: "$450,000",
    targetDiscount: "68% MAO",
    closedDealsCount: 9,
    avgClosingDays: 6,
    targetZipCodes: ["33602", "33606", "33609"],
    propertyTypes: ["Single Family"],
    pofVerified: true,
  },
  {
    id: "buyer-4",
    name: "Samantha Wright",
    company: "Wright Holdings & Acquisitions",
    avatar: "SW",
    tier: "VIP Buyer",
    phone: "+1 (404) 778-3920",
    email: "sam@wrightholdings.com",
    location: "Atlanta, GA",
    pofAmount: "$8,500,000",
    strategy: "Multi-Family",
    maxPrice: "$3,500,000",
    targetDiscount: "72% MAO",
    closedDealsCount: 31,
    avgClosingDays: 8,
    targetZipCodes: ["30305", "30309", "30318"],
    propertyTypes: ["Multi-Family 5+", "Commercial"],
    pofVerified: true,
  },
  {
    id: "buyer-5",
    name: "Carlos Rivera",
    company: "SunState Residential Solutions",
    avatar: "CR",
    tier: "Standard Investor",
    phone: "+1 (954) 302-8819",
    email: "crivera@sunstatere.com",
    location: "Fort Lauderdale, FL",
    pofAmount: "$950,000",
    strategy: "Wholesale / Assignment",
    maxPrice: "$380,000",
    targetDiscount: "65% MAO",
    closedDealsCount: 5,
    avgClosingDays: 10,
    targetZipCodes: ["33301", "33304", "33308"],
    propertyTypes: ["Single Family", "Condo"],
    pofVerified: false,
  },
  {
    id: "buyer-6",
    name: "Jason Thorne",
    company: "Thorne Asset Management",
    avatar: "JT",
    tier: "Verified POF",
    phone: "+1 (512) 884-2109",
    email: "jason@thorneassets.com",
    location: "Austin, TX",
    pofAmount: "$4,100,000",
    strategy: "Buy & Hold",
    maxPrice: "$850,000",
    targetDiscount: "75% MAO",
    closedDealsCount: 14,
    avgClosingDays: 7,
    targetZipCodes: ["78701", "78702", "78704"],
    propertyTypes: ["Single Family", "Multi-Family 2-4"],
    pofVerified: true,
  },
]

export function BuyerListPage() {
  const [buyers, setBuyers] = React.useState<CashBuyer[]>(mockBuyers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [strategyFilter, setStrategyFilter] = React.useState("all")
  const [tierFilter, setTierFilter] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid")

  // Modals state
  const [isAddBuyerOpen, setIsAddBuyerOpen] = React.useState(false)
  const [isSendDealOpen, setIsSendDealOpen] = React.useState(false)
  const [selectedBuyerForDeal, setSelectedBuyerForDeal] = React.useState<CashBuyer | null>(null)

  // Form State for New Buyer
  const [newBuyerName, setNewBuyerName] = React.useState("")
  const [newCompany, setNewCompany] = React.useState("")
  const [newPhone, setNewPhone] = React.useState("")
  const [newEmail, setNewEmail] = React.useState("")
  const [newLocation, setNewLocation] = React.useState("")
  const [newPofAmount, setNewPofAmount] = React.useState("")
  const [newStrategy, setNewStrategy] = React.useState<CashBuyer["strategy"]>("Fix & Flip")
  const [newMaxPrice, setNewMaxPrice] = React.useState("")

  // Filtered Buyers List
  const filteredBuyers = buyers.filter((buyer) => {
    const matchesSearch =
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.phone.includes(searchTerm)

    const matchesStrategy = strategyFilter === "all" || buyer.strategy === strategyFilter
    const matchesTier = tierFilter === "all" || buyer.tier === tierFilter

    return matchesSearch && matchesStrategy && matchesTier
  })

  const handleAddBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBuyerName.trim() || !newEmail.trim()) {
      toast.error("Por favor, preencha o nome e e-mail do comprador.")
      return
    }

    const initials = newBuyerName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()

    const newBuyer: CashBuyer = {
      id: `buyer-${Date.now()}`,
      name: newBuyerName,
      company: newCompany || `${newBuyerName} Investments`,
      avatar: initials || "CB",
      tier: "Verified POF",
      phone: newPhone || "+1 (555) 000-0000",
      email: newEmail,
      location: newLocation || "Miami, FL",
      pofAmount: newPofAmount || "$500,000",
      strategy: newStrategy,
      maxPrice: newMaxPrice || "$500,000",
      targetDiscount: "70% MAO",
      closedDealsCount: 0,
      avgClosingDays: 7,
      targetZipCodes: ["33101"],
      propertyTypes: ["Single Family"],
      pofVerified: true,
    }

    setBuyers([newBuyer, ...buyers])
    toast.success(`Comprador VIP ${newBuyerName} adicionado à lista com sucesso!`)

    // Reset Form
    setNewBuyerName("")
    setNewCompany("")
    setNewPhone("")
    setNewEmail("")
    setNewLocation("")
    setNewPofAmount("")
    setNewMaxPrice("")
    setIsAddBuyerOpen(false)
  }

  const handleBroadcastDeal = () => {
    toast.success(`Proposta de imóvel transmitida via SMS/E-mail para ${filteredBuyers.length} compradores VIPs selecionados!`)
    setIsSendDealOpen(false)
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header Bar */}
      <div className="border-b border-border bg-card px-6 py-5 sticky top-0 z-10 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-md shadow-emerald-500/20">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Rede de Compradores VIP (Cash Buyers)
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3 w-3" /> POF Verificado
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Diretório de investidores qualificados com capital em dinheiro pronto para fechamentos rápidos.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setIsSendDealOpen(true)}
              variant="outline"
              className="h-9 rounded-xl border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 font-semibold text-xs px-3.5 gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Enviar Imóvel aos Compradores</span>
            </Button>

            <Button
              onClick={() => setIsAddBuyerOpen(true)}
              className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 gap-1.5 shadow-sm shadow-emerald-600/20"
            >
              <Plus className="h-4 w-4" />
              <span>+ Adicionar Comprador Cash</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* KPI Summary Performance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total de Compradores VIP
              </span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">{buyers.length} Investidores</span>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> 100% Contatos Ativos
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Capital Disponível (POF)
              </span>
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">$23,950,000</span>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Comprovantes de Fundos Auditados
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Velocidade Média de Fechamento
              </span>
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Zap className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">6.8 Dias</span>
              <p className="text-xs text-amber-600 font-semibold mt-1 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Fechamento Cash sem Financiamento
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Investidores Nível VIP
              </span>
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                {buyers.filter((b) => b.tier === "VIP Buyer").length} VIPs
              </span>
              <p className="text-xs text-purple-600 font-semibold mt-1">
                +10 Imóveis Comprados este Ano
              </p>
            </div>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do investidor, empresa LLC, cidade ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-background border-border text-xs"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Select value={strategyFilter} onValueChange={setStrategyFilter}>
              <SelectTrigger className="w-[160px] h-10 text-xs font-semibold rounded-xl bg-background border-border">
                <Briefcase className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
                <SelectValue placeholder="Estratégia" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">Todas Estratégias</SelectItem>
                <SelectItem value="Fix & Flip">Fix & Flip</SelectItem>
                <SelectItem value="Buy & Hold">Buy & Hold (Aluguel)</SelectItem>
                <SelectItem value="Wholesale / Assignment">Wholesale / Assignment</SelectItem>
                <SelectItem value="Multi-Family">Multi-Family</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[150px] h-10 text-xs font-semibold rounded-xl bg-background border-border">
                <Award className="h-3.5 w-3.5 mr-1.5 text-purple-600" />
                <SelectValue placeholder="Nível / Tier" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="VIP Buyer">VIP Buyer</SelectItem>
                <SelectItem value="Verified POF">POF Verificado</SelectItem>
                <SelectItem value="Standard Investor">Investidor Padrão</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-border p-0.5 bg-background">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "table" ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Directory View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
              >
                <div>
                  {/* Top Row: Avatar & Badges */}
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                        {buyer.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-foreground group-hover:text-emerald-600 transition-colors">
                          {buyer.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium truncate max-w-[170px]">
                          {buyer.company}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        buyer.tier === "VIP Buyer"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                          : buyer.tier === "Verified POF"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20"
                      }`}
                    >
                      {buyer.tier === "VIP Buyer" && <Award className="h-3 w-3" />}
                      {buyer.tier}
                    </span>
                  </div>

                  {/* Buy Box Criteria Details */}
                  <div className="py-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Fundos Comprovados (POF):</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{buyer.pofAmount}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Estratégia Preferida:</span>
                      <span className="font-semibold text-foreground bg-secondary px-2 py-0.5 rounded-md">
                        {buyer.strategy}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Teto Máximo de Compra:</span>
                      <span className="font-bold text-foreground">{buyer.maxPrice} ({buyer.targetDiscount})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Localização / Mercados:</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-indigo-500" />
                        {buyer.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Histórico de Fechamento:</span>
                      <span className="font-semibold text-foreground">
                        {buyer.closedDealsCount} Fechados ({buyer.avgClosingDays} dias médios)
                      </span>
                    </div>
                  </div>

                  {/* Property Type Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                    {buyer.propertyTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-md"
                      >
                        <Tag className="h-2.5 w-2.5 mr-1 text-emerald-600" />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-border flex items-center justify-between gap-2 mt-3">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${buyer.phone}`}
                      className="p-2 rounded-xl bg-secondary hover:bg-emerald-500/10 hover:text-emerald-600 text-muted-foreground transition-colors"
                      title="Ligar para Comprador"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`mailto:${buyer.email}`}
                      className="p-2 rounded-xl bg-secondary hover:bg-indigo-500/10 hover:text-indigo-600 text-muted-foreground transition-colors"
                      title="Enviar E-mail"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedBuyerForDeal(buyer)
                      setIsSendDealOpen(true)
                    }}
                    className="h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 gap-1"
                  >
                    <Send className="h-3 w-3" />
                    <span>Enviar Oferta</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="py-3.5 px-4">Investidor / Empresa</th>
                    <th className="py-3.5 px-4">Tier / Status</th>
                    <th className="py-3.5 px-4">POF Disponível</th>
                    <th className="py-3.5 px-4">Estratégia</th>
                    <th className="py-3.5 px-4">Preço Máx / Desconto</th>
                    <th className="py-3.5 px-4">Localização</th>
                    <th className="py-3.5 px-4">Fechamentos</th>
                    <th className="py-3.5 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  {filteredBuyers.map((buyer) => (
                    <tr key={buyer.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                            {buyer.avatar}
                          </div>
                          <div>
                            <span className="font-bold text-foreground block">{buyer.name}</span>
                            <span className="text-[10px] text-muted-foreground block">{buyer.company}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            buyer.tier === "VIP Buyer"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {buyer.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-600">{buyer.pofAmount}</td>
                      <td className="py-3.5 px-4 font-medium">{buyer.strategy}</td>
                      <td className="py-3.5 px-4 font-semibold">{buyer.maxPrice} ({buyer.targetDiscount})</td>
                      <td className="py-3.5 px-4 font-medium">{buyer.location}</td>
                      <td className="py-3.5 px-4 font-medium">{buyer.closedDealsCount} imóveis ({buyer.avgClosingDays}d)</td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          onClick={() => {
                            setSelectedBuyerForDeal(buyer)
                            setIsSendDealOpen(true)
                          }}
                          size="sm"
                          className="h-8 rounded-xl bg-emerald-600 text-white text-xs font-semibold px-3"
                        >
                          Enviar Oferta
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Add Cash Buyer Modal */}
      <Dialog open={isAddBuyerOpen} onOpenChange={setIsAddBuyerOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-emerald-600" />
              Cadastrar Novo Comprador Cash (VIP)
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddBuyerSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Nome Completo</label>
                <Input
                  placeholder="Ex: Marcus Vance"
                  value={newBuyerName}
                  onChange={(e) => setNewBuyerName(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Empresa / LLC</label>
                <Input
                  placeholder="Ex: Vance Capital LLC"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Telefone de Contato</label>
                <Input
                  placeholder="+1 (305) 000-0000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">E-mail Principal</label>
                <Input
                  type="email"
                  placeholder="marcus@vancecapital.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Cidade / Estado Alvo</label>
                <Input
                  placeholder="Ex: Miami, FL"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Estratégia de Investimento</label>
                <Select value={newStrategy} onValueChange={(val: any) => setNewStrategy(val)}>
                  <SelectTrigger className="rounded-xl h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Fix & Flip">Fix & Flip</SelectItem>
                    <SelectItem value="Buy & Hold">Buy & Hold (Aluguel)</SelectItem>
                    <SelectItem value="Wholesale / Assignment">Wholesale / Assignment</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Comprovante de Fundos (POF)</label>
                <Input
                  placeholder="Ex: $1,500,000"
                  value={newPofAmount}
                  onChange={(e) => setNewPofAmount(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Teto Máximo de Compra ($)</label>
                <Input
                  placeholder="Ex: $650,000"
                  value={newMaxPrice}
                  onChange={(e) => setNewMaxPrice(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>
            </div>

            <DialogFooter className="pt-4 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddBuyerOpen(false)}
                className="rounded-xl h-10 font-semibold"
              >
                Cancelar
              </Button>
              <Button type="submit" className="rounded-xl h-10 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white">
                Cadastrar Comprador
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Broadcast Deal Modal */}
      <Dialog open={isSendDealOpen} onOpenChange={setIsSendDealOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <Send className="h-5 w-5 text-emerald-600" />
              Transmitir Oportunidade Imobiliária
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <p className="text-muted-foreground">
              Selecione o imóvel que deseja disparar para os compradores cadastrados com perfil compatível:
            </p>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Imóvel Selecionado</label>
              <Select defaultValue="prop-1">
                <SelectTrigger className="rounded-xl h-10 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="prop-1">742 Evergreen Terrace — $320,000 (ARV $480,000)</SelectItem>
                  <SelectItem value="prop-2">1204 Ocean Drive — $890,000 (ARV $1,250,000)</SelectItem>
                  <SelectItem value="prop-3">458 Biscayne Blvd — $410,000 (ARV $600,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {selectedBuyerForDeal ? `Disparo Direto para: ${selectedBuyerForDeal.name}` : `Disparo em Massa: ${filteredBuyers.length} Compradores`}
              </span>
              <p className="text-[11px] opacity-90">
                O envio incluirá fotos, relatório de margem de lucro (ARV), custos de reforma estimados e contato para proposta.
              </p>
            </div>

            <DialogFooter className="pt-2 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSendDealOpen(false)}
                className="rounded-xl h-10 font-semibold"
              >
                Cancelar
              </Button>
              <Button onClick={handleBroadcastDeal} className="rounded-xl h-10 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white">
                Disparar Oferta Agora
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BuyerListPage
