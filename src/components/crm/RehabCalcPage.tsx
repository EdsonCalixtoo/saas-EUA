"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Building2,
  Hammer,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  Percent,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sliders,
  Plus,
  Trash2,
  Info,
  BadgePercent,
  CircleDollarSign,
  PieChart as PieChartIcon,
  Home,
  Check,
  Zap,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  Share2,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { toast } from "sonner"

interface ScopeItem {
  id: string
  name: string
  category: "Exterior" | "Interior" | "Cozinha & Banheiro" | "MEP & Elétrica" | "Estrutura & Licenças"
  quantity: number
  unitCost: number
  enabled: boolean
}

const initialItems: ScopeItem[] = [
  { id: "roof", name: "Telhado Arquitetônico & Calhas", category: "Exterior", quantity: 1, unitCost: 8500, enabled: true },
  { id: "siding", name: "Pintura Externa & Acabamento Facade", category: "Exterior", quantity: 1, unitCost: 4200, enabled: true },
  { id: "windows", name: "Substituição de Janelas Impact-Resistant", category: "Exterior", quantity: 10, unitCost: 380, enabled: true },
  { id: "kitchen_cab", name: "Armários de Cozinha Shaker Custom", category: "Cozinha & Banheiro", quantity: 1, unitCost: 6500, enabled: true },
  { id: "kitchen_top", name: "Bancada de Quartzo Calacatta", category: "Cozinha & Banheiro", quantity: 1, unitCost: 3400, enabled: true },
  { id: "appliances", name: "Kit Eletrodomésticos Inox Premium", category: "Cozinha & Banheiro", quantity: 1, unitCost: 3200, enabled: true },
  { id: "baths", name: "Reforma Completa de 2 Banheiros", category: "Cozinha & Banheiro", quantity: 2, unitCost: 3800, enabled: true },
  { id: "flooring", name: "Piso Vinílico LVP Waterproof", category: "Interior", quantity: 1800, unitCost: 3.2, enabled: true },
  { id: "paint_int", name: "Pintura Interna Premium Neutra", category: "Interior", quantity: 1, unitCost: 3800, enabled: true },
  { id: "hvac", name: "Sistema Central de Ar HVAC 3.5 Tons", category: "MEP & Elétrica", quantity: 1, unitCost: 6400, enabled: true },
  { id: "electrical", name: "Quadro Elétrico 200A & Iluminação LED", category: "MEP & Elétrica", quantity: 1, unitCost: 3800, enabled: true },
  { id: "plumbing", name: "Revisão Encanamento PVC/PEX", category: "MEP & Elétrica", quantity: 1, unitCost: 2900, enabled: true },
  { id: "permits", name: "Licenças Municipais & Caçamba de Entulho", category: "Estrutura & Licenças", quantity: 1, unitCost: 2400, enabled: true },
]

export function RehabCalcPage() {
  const [activeTab, setActiveTab] = React.useState("calc")
  
  // Primary Parameters
  const [propertyAddress, setPropertyAddress] = React.useState("742 Evergreen Terrace, Miami, FL")
  const [sqft, setSqft] = React.useState<number>(1800)
  const [arv, setArv] = React.useState<number>(480000)
  const [purchasePrice, setPurchasePrice] = React.useState<number>(275000)
  const [targetRule, setTargetRule] = React.useState<number>(70) // 70% rule
  const [wholesaleFee, setWholesaleFee] = React.useState<number>(15000)
  const [holdingMonths, setHoldingMonths] = React.useState<number>(4)
  const [monthlyHolding, setMonthlyHolding] = React.useState<number>(1250)
  const [closingCosts, setClosingCosts] = React.useState<number>(8500)
  const [contingencyPercent, setContingencyPercent] = React.useState<number>(10)

  // Rental BRRRR Assumptions
  const [monthlyRent, setMonthlyRent] = React.useState<number>(3200)
  const [propertyTaxAnnual, setPropertyTaxAnnual] = React.useState<number>(4200)
  const [insuranceAnnual, setInsuranceAnnual] = React.useState<number>(1800)

  // Scope Items
  const [items, setItems] = React.useState<ScopeItem[]>(initialItems)

  // Add Item State
  const [newItemName, setNewItemName] = React.useState("")
  const [newItemCategory, setNewItemCategory] = React.useState<ScopeItem["category"]>("Interior")
  const [newItemCost, setNewItemCost] = React.useState<string>("")

  // Calculations
  const baseRehabSum = items
    .filter((item) => item.enabled)
    .reduce((acc, item) => acc + item.quantity * item.unitCost, 0)
  
  const contingencyAmount = Math.round((baseRehabSum * contingencyPercent) / 100)
  const totalRehabCost = Math.round(baseRehabSum + contingencyAmount)

  // MAO Formula: (ARV * (TargetRule / 100)) - TotalRehab - WholesaleFee
  const mao = Math.round(arv * (targetRule / 100) - totalRehabCost - wholesaleFee)

  const totalHoldingCost = holdingMonths * monthlyHolding
  const totalCapitalRequired = purchasePrice + totalRehabCost + closingCosts + totalHoldingCost + wholesaleFee
  const netProfit = arv - totalCapitalRequired
  const roi = totalCapitalRequired > 0 ? ((netProfit / totalCapitalRequired) * 100).toFixed(1) : "0"
  const costPerSqft = sqft > 0 ? (totalRehabCost / sqft).toFixed(2) : "0"

  // BRRRR Rental Calculations
  const annualGrossRent = monthlyRent * 12
  const totalAnnualOperatingExpenses = propertyTaxAnnual + insuranceAnnual + monthlyRent * 12 * 0.1 // 10% management/maintenance
  const noi = annualGrossRent - totalAnnualOperatingExpenses
  const capRate = arv > 0 ? ((noi / arv) * 100).toFixed(2) : "0"
  const monthlyCashflow = Math.round((noi / 12) - 1450) // Assuming $1,450 mortgage

  // Deal Score Calculation (0 to 100)
  const dealScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (purchasePrice <= mao ? 50 : 25) +
        (Number(roi) > 20 ? 30 : Number(roi) > 10 ? 15 : 5) +
        (netProfit > 40000 ? 20 : 10)
      )
    )
  )

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast.success("Item removido do escopo de reforma.")
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim() || !newItemCost.trim()) return

    const costVal = parseFloat(newItemCost.replace(/[^0-9.]/g, "")) || 0
    const newItem: ScopeItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      quantity: 1,
      unitCost: costVal,
      enabled: true,
    }

    setItems([...items, newItem])
    setNewItemName("")
    setNewItemCost("")
    toast.success(`Item "${newItemName}" adicionado ao escopo de reforma!`)
  }

  const applyPreset = (preset: string) => {
    let rate = 30
    if (preset === "light") rate = 20
    if (preset === "medium") rate = 40
    if (preset === "heavy") rate = 70

    const targetTotal = sqft * rate
    const ratio = targetTotal / (baseRehabSum || 1)

    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        unitCost: Math.round(item.unitCost * ratio * 100) / 100,
      }))
    )
    toast.success(`Escopo ajustado para padrão ${preset.toUpperCase()} ($${rate}/sqft)`)
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto min-w-0 w-full">
      {/* Header Bar */}
      <div className="border-b border-border bg-card/80 backdrop-blur-md px-6 py-5 sticky top-0 z-20 shadow-xs min-w-0 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-md shadow-emerald-500/20">
              <Calculator className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-foreground truncate">
                  Rehab Calc & MAO Deal Analyzer
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Flame className="h-3.5 w-3.5" /> Score: {dealScore}/100
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium mt-0.5 truncate">
                Simulador avançado de custos de obra, margem de segurança MAO 70% e comparativo Flip vs. Rental.
              </p>
            </div>
          </div>

          {/* Action Header */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => toast.success("Relatório de Reforma exportado com sucesso!")}
              variant="outline"
              className="h-9 rounded-xl font-semibold text-xs px-3.5 gap-1.5 border-border hover:bg-muted"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Exportar Scope PDF</span>
            </Button>
            <Button
              onClick={() => toast.success("Link do escopo compartilhado com a equipe!")}
              className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 gap-1.5 shadow-sm shadow-emerald-600/20"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Compartilhar Proposta</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full min-w-0">

        {/* Hero KPI Summary Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
          
          {/* Card 1: MAO Offer Target */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition-all min-w-0">
            <div className="flex items-center justify-between min-w-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                Oferta Máxima (MAO 70%)
              </span>
              <div className="h-9 w-9 shrink-0 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 block truncate">
                ${mao.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1 truncate">
                Teto recomendado para garantir a margem.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs min-w-0">
              <span className="text-muted-foreground font-medium truncate">Preço Proposto:</span>
              <span className={`font-bold shrink-0 ${purchasePrice <= mao ? "text-emerald-600" : "text-rose-500"}`}>
                ${purchasePrice.toLocaleString()} {purchasePrice <= mao ? "✓ Lucrativo" : "⚠ Acima do Teto"}
              </span>
            </div>
          </div>

          {/* Card 2: Total Rehab Budget */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/50 transition-all min-w-0">
            <div className="flex items-center justify-between min-w-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                Custo Total de Reforma
              </span>
              <div className="h-9 w-9 shrink-0 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Hammer className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black tracking-tight text-foreground block truncate">
                ${totalRehabCost.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1 truncate">
                Custo por Área: <span className="font-bold text-indigo-600">${costPerSqft}/sqft</span>
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs min-w-0">
              <span className="text-muted-foreground font-medium truncate">Contingência ({contingencyPercent}%):</span>
              <span className="font-bold text-indigo-600 shrink-0">${contingencyAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Card 3: Projected Net Profit & ROI */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition-all min-w-0">
            <div className="flex items-center justify-between min-w-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                Lucro Líquido Projetado
              </span>
              <div className="h-9 w-9 shrink-0 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-2xl font-black tracking-tight block truncate ${netProfit >= 35000 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                ${netProfit.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1 truncate">
                Retorno do Capital: <span className="font-bold text-purple-600">{roi}% ROI</span>
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs min-w-0">
              <span className="text-muted-foreground font-medium truncate">Capital Total Exigido:</span>
              <span className="font-bold text-foreground shrink-0">${totalCapitalRequired.toLocaleString()}</span>
            </div>
          </div>

          {/* Card 4: ARV Expected Market Value */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all min-w-0">
            <div className="flex items-center justify-between min-w-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                Valor Pós-Reforma (ARV)
              </span>
              <div className="h-9 w-9 shrink-0 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black tracking-tight text-foreground block truncate">
                ${arv.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1 truncate">
                Metragem: <span className="font-bold text-foreground">{sqft.toLocaleString()} sqft</span>
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs min-w-0">
              <span className="text-muted-foreground font-medium truncate">Desconto Alvo:</span>
              <span className="font-bold text-amber-600 shrink-0">{targetRule}% do ARV</span>
            </div>
          </div>

        </div>

        {/* Interactive Tabs Navigation */}
        <Tabs defaultValue="calc" className="w-full min-w-0" onValueChange={setActiveTab}>
          <TabsList className="bg-card border border-border p-1 rounded-2xl h-12 w-full justify-start gap-1 overflow-x-auto">
            <TabsTrigger value="calc" className="rounded-xl font-bold text-xs h-10 px-4 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shrink-0">
              <Sliders className="h-4 w-4" />
              <span>Calculadora MAO & Parâmetros</span>
            </TabsTrigger>
            <TabsTrigger value="scope" className="rounded-xl font-bold text-xs h-10 px-4 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shrink-0">
              <Hammer className="h-4 w-4" />
              <span>Escopo de Reforma por Item ({items.length})</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="rounded-xl font-bold text-xs h-10 px-4 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shrink-0">
              <PieChartIcon className="h-4 w-4" />
              <span>Comparativo Flip vs. BRRRR Rental</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: CALCULADORA MAO & PARÂMETROS */}
          <TabsContent value="calc" className="mt-6 space-y-6 min-w-0 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">

              {/* Left Column (2 Cards Grid) */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full min-w-0">
                
                {/* Parâmetros Básicos */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5 min-w-0">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-bold text-base text-foreground flex items-center gap-2 truncate">
                      <Home className="h-5 w-5 text-indigo-600 shrink-0" />
                      Dados Básicos do Imóvel
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Endereço do Imóvel</label>
                      <Input
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        className="rounded-xl h-10 font-medium text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Valor Pós-Reforma Estimado (ARV $)</label>
                      <Input
                        type="number"
                        value={arv}
                        onChange={(e) => setArv(Number(e.target.value))}
                        className="rounded-xl h-10 font-extrabold text-sm text-emerald-600 dark:text-emerald-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Preço de Oferta Proposto ($)</label>
                      <Input
                        type="number"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(Number(e.target.value))}
                        className="rounded-xl h-10 font-bold text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Área Útil do Imóvel (SqFt)</label>
                      <Input
                        type="number"
                        value={sqft}
                        onChange={(e) => setSqft(Number(e.target.value))}
                        className="rounded-xl h-10 font-medium text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Regra de Desconto Alvo (Target Rule %)</label>
                      <Select value={targetRule.toString()} onValueChange={(val) => setTargetRule(Number(val))}>
                        <SelectTrigger className="rounded-xl h-10 font-semibold text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="70">Regra 70% (Investidor Padrão)</SelectItem>
                          <SelectItem value="75">Regra 75% (Mercado Aquecido)</SelectItem>
                          <SelectItem value="65">Regra 65% (Conservador)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Custos Financeiros & Holding */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5 min-w-0">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-bold text-base text-foreground flex items-center gap-2 truncate">
                      <CircleDollarSign className="h-5 w-5 text-emerald-600 shrink-0" />
                      Custos Financeiros & Holding
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Taxa de Atribuição (Wholesale Fee $)</label>
                      <Input
                        type="number"
                        value={wholesaleFee}
                        onChange={(e) => setWholesaleFee(Number(e.target.value))}
                        className="rounded-xl h-10 font-bold text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-muted-foreground">Meses Holding</label>
                        <Input
                          type="number"
                          value={holdingMonths}
                          onChange={(e) => setHoldingMonths(Number(e.target.value))}
                          className="rounded-xl h-10 text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-muted-foreground">Custo Mensal ($)</label>
                        <Input
                          type="number"
                          value={monthlyHolding}
                          onChange={(e) => setMonthlyHolding(Number(e.target.value))}
                          className="rounded-xl h-10 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Custos de Fechamento / Cartório ($)</label>
                      <Input
                        type="number"
                        value={closingCosts}
                        onChange={(e) => setClosingCosts(Number(e.target.value))}
                        className="rounded-xl h-10 font-medium text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-muted-foreground">Margem de Contingência de Obra (%)</label>
                      <Select value={contingencyPercent.toString()} onValueChange={(val) => setContingencyPercent(Number(val))}>
                        <SelectTrigger className="rounded-xl h-10 font-semibold text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="5">5% (Baixo Risco)</SelectItem>
                          <SelectItem value="10">10% (Recomendado)</SelectItem>
                          <SelectItem value="15">15% (Estrutura Antiga)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Diagnóstico de Viabilidade */}
              <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between space-y-4 min-w-0 w-full">
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2 border-b border-border pb-3 min-w-0">
                    <ShieldCheck className="h-5 w-5 text-purple-600 shrink-0" />
                    <span className="truncate">Diagnóstico do Negócio</span>
                  </h3>

                  <div className="py-4 space-y-3 text-xs min-w-0">
                    <div className="flex justify-between items-center pb-2 border-b border-border min-w-0">
                      <span className="text-muted-foreground truncate">Preço de Compra:</span>
                      <span className="font-bold text-foreground shrink-0">${purchasePrice.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-border min-w-0">
                      <span className="text-muted-foreground truncate">Custo Total de Reforma:</span>
                      <span className="font-bold text-indigo-600 shrink-0">${totalRehabCost.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-border min-w-0">
                      <span className="text-muted-foreground truncate font-medium">Holding & Cartório:</span>
                      <span className="font-bold text-foreground shrink-0">${(totalHoldingCost + closingCosts).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-border min-w-0">
                      <span className="text-muted-foreground truncate font-semibold">Teto da Oferta (MAO 70%):</span>
                      <span className="font-extrabold text-emerald-600 shrink-0">${mao.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 min-w-0 ${
                      purchasePrice <= mao
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    {purchasePrice <= mao ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs truncate">
                        {purchasePrice <= mao ? "Compra Aprovada & Lucrativa!" : "Atenção: Preço Acima do MAO"}
                      </h4>
                      <p className="text-[11px] opacity-90 mt-1 leading-snug break-words">
                        {purchasePrice <= mao
                          ? `Oferta dentro do teto seguro. Projeção de lucro de $${netProfit.toLocaleString()} (${roi}% ROI).`
                          : `Para manter a margem de 70%, renegocie o preço para no máximo $${mao.toLocaleString()}.`}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => toast.success("Oferta gerada com os parâmetros do MAO!")}
                  className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 shrink-0"
                >
                  Gerar Carta de Oferta (LOI)
                </Button>
              </div>

            </div>
          </TabsContent>

          {/* TAB 2: ESCOPO DE REFORMA POR ITEM */}
          <TabsContent value="scope" className="mt-6 space-y-6 min-w-0 w-full">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6 min-w-0 w-full">
              
              {/* Presets and Add Form Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-5 min-w-0">
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2 truncate">
                    <Hammer className="h-5 w-5 text-emerald-600 shrink-0" />
                    Detalhamento dos Itens de Obra (Scope of Work)
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">Marque os itens inclusos na reforma para recalcular o custo total.</p>
                </div>

                {/* Preset Quality Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-muted-foreground">Qualidade:</span>
                  <Button onClick={() => applyPreset("light")} variant="outline" size="sm" className="h-8 rounded-xl text-xs font-bold">
                    Cosmética ($20/sqft)
                  </Button>
                  <Button onClick={() => applyPreset("medium")} variant="outline" size="sm" className="h-8 rounded-xl text-xs font-bold">
                    Média ($40/sqft)
                  </Button>
                  <Button onClick={() => applyPreset("heavy")} variant="outline" size="sm" className="h-8 rounded-xl text-xs font-bold">
                    Pesada ($70/sqft)
                  </Button>
                </div>
              </div>

              {/* Form to Add Custom Item */}
              <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-muted/30 p-4 rounded-xl border border-border min-w-0">
                <Input
                  placeholder="Nome do Item (Ex: Kit Spots LED)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="rounded-xl h-9 text-xs bg-background"
                />
                <Select value={newItemCategory} onValueChange={(val: any) => setNewItemCategory(val)}>
                  <SelectTrigger className="rounded-xl h-9 text-xs bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Exterior">Exterior</SelectItem>
                    <SelectItem value="Interior">Interior</SelectItem>
                    <SelectItem value="Cozinha & Banheiro">Cozinha & Banheiro</SelectItem>
                    <SelectItem value="MEP & Elétrica">MEP & Elétrica</SelectItem>
                    <SelectItem value="Estrutura & Licenças">Estrutura & Licenças</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Custo Categoria ($)"
                  value={newItemCost}
                  onChange={(e) => setNewItemCost(e.target.value)}
                  className="rounded-xl h-9 text-xs bg-background"
                />
                <Button type="submit" className="h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Item</span>
                </Button>
              </form>

              {/* Items List Table */}
              <div className="overflow-x-auto min-w-0">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4">Incluso</th>
                      <th className="py-3 px-4">Descrição do Serviço / Item</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4 text-center">Qtd.</th>
                      <th className="py-3 px-4 text-right">Custo Unitário ($)</th>
                      <th className="py-3 px-4 text-right">Subtotal ($)</th>
                      <th className="py-3 px-4 text-right">Remover</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-xs">
                    {items.map((item) => (
                      <tr key={item.id} className={`hover:bg-muted/30 transition-colors ${!item.enabled ? "opacity-40 bg-muted/20" : ""}`}>
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={() => toggleItem(item.id)}
                            className="h-4 w-4 rounded-md text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 font-bold text-foreground">{item.name}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-secondary text-muted-foreground">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-semibold">{item.quantity}</td>
                        <td className="py-3 px-4 text-right font-medium">${item.unitCost.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-extrabold text-emerald-600">
                          ${(item.quantity * item.unitCost).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Footer Banner */}
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs min-w-0">
                <span className="font-semibold text-muted-foreground">
                  Subtotal ({items.filter((i) => i.enabled).length} itens ativos): <strong className="text-foreground">${baseRehabSum.toLocaleString()}</strong> + 10% Contingência (${contingencyAmount.toLocaleString()})
                </span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  Total Final: ${totalRehabCost.toLocaleString()}
                </span>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: COMPARATIVO FLIP VS BRRRR RENTAL */}
          <TabsContent value="scenarios" className="mt-6 space-y-6 min-w-0 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">

              {/* Strategy 1: Fix & Flip */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5 relative overflow-hidden min-w-0">
                <div className="flex items-center justify-between border-b border-border pb-4 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-base text-foreground truncate">Estratégia Fix & Flip</h3>
                      <p className="text-xs text-muted-foreground truncate">Revenda rápida pós-reforma.</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-xl shrink-0">
                    Ganho Rápido
                  </span>
                </div>

                <div className="space-y-3 text-xs min-w-0">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Preço de Revenda (ARV):</span>
                    <span className="font-bold text-foreground">${arv.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Investimento Total Exigido:</span>
                    <span className="font-bold text-foreground">${totalCapitalRequired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tempo de Obra + Venda:</span>
                    <span className="font-bold text-foreground">{holdingMonths} Meses</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground font-semibold">Lucro Líquido Final:</span>
                    <span className="font-black text-emerald-600 text-sm">${netProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground font-semibold">Retorno sobre Capital (ROI):</span>
                    <span className="font-black text-purple-600 text-sm">{roi}% ROI</span>
                  </div>
                </div>
              </div>

              {/* Strategy 2: BRRRR Rental */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5 relative overflow-hidden min-w-0">
                <div className="flex items-center justify-between border-b border-border pb-4 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                      <Home className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-base text-foreground truncate">Estratégia BRRRR (Locação)</h3>
                      <p className="text-xs text-muted-foreground truncate">Aluguel de longo prazo com fluxo de caixa.</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-xl shrink-0">
                    Renda Passiva
                  </span>
                </div>

                <div className="space-y-3 text-xs min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Aluguel Mensal Estimado ($):</span>
                    <Input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-28 h-8 rounded-xl text-right font-bold text-xs"
                    />
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Receita Operacional Líquida (NOI):</span>
                    <span className="font-bold text-foreground">${noi.toLocaleString()}/ano</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Cap Rate Projetado:</span>
                    <span className="font-black text-indigo-600 text-sm">{capRate}% Cap Rate</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground font-semibold">Cash Flow Mensal Líquido:</span>
                    <span className="font-black text-emerald-600 text-sm">${monthlyCashflow.toLocaleString()}/mês</span>
                  </div>
                </div>
              </div>

            </div>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  )
}

export default RehabCalcPage
