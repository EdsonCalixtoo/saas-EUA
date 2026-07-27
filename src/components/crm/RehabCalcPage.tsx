"use client"

import * as React from "react"
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
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Home,
  Info,
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
import { toast } from "sonner"

interface ScopeItem {
  id: string
  name: string
  category: "Exterior" | "Interior" | "Cozinha & Banheiros" | "MEP & Estrutura" | "Outros"
  cost: number
}

const defaultItems: ScopeItem[] = [
  { id: "roof", name: "Telhado & Calhas", category: "Exterior", cost: 8500 },
  { id: "siding", name: "Pintura Externa & Facade", category: "Exterior", cost: 4200 },
  { id: "windows", name: "Janelas (Substituição 8x)", category: "Exterior", cost: 3800 },
  { id: "kitchen_cab", name: "Armários de Cozinha Shaker", category: "Cozinha & Banheiros", cost: 6500 },
  { id: "kitchen_top", name: "Bancada de Quartzo", category: "Cozinha & Banheiros", cost: 3200 },
  { id: "appliances", name: "Eletrodomésticos Inox", category: "Cozinha & Banheiros", cost: 2800 },
  { id: "baths", name: "Reforma de 2 Banheiros", category: "Cozinha & Banheiros", cost: 7500 },
  { id: "flooring", name: "Piso Vinílico LVP (1,800 sqft)", category: "Interior", cost: 5400 },
  { id: "paint_int", name: "Pintura Interna Completa", category: "Interior", cost: 3600 },
  { id: "hvac", name: "Novo Sistema de Ar HVAC", category: "MEP & Estrutura", cost: 6200 },
  { id: "electrical", name: "Quadro Elétrico & Fiação", category: "MEP & Estrutura", cost: 3500 },
  { id: "permits", name: "Licenças de Obra & Caçambas", category: "Outros", cost: 2200 },
]

export function RehabCalcPage() {
  // Main Deal Variables
  const [sqft, setSqft] = React.useState<number>(1800)
  const [arv, setArv] = React.useState<number>(450000)
  const [purchasePrice, setPurchasePrice] = React.useState<number>(265000)
  const [targetRule, setTargetRule] = React.useState<number>(70) // 70% Rule
  const [assignmentFee, setAssignmentFee] = React.useState<number>(15000)
  const [holdingMonths, setHoldingMonths] = React.useState<number>(4)
  const [monthlyHoldingCost, setMonthlyHoldingCost] = React.useState<number>(1200)
  const [closingCosts, setClosingCosts] = React.useState<number>(8500)
  const [contingencyPercent, setContingencyPercent] = React.useState<number>(10) // 10% contingency

  // Scope Items State
  const [items, setItems] = React.useState<ScopeItem[]>(defaultItems)
  const [rehabPreset, setRehabPreset] = React.useState<string>("custom")

  // Calculate Base Rehab Cost from items sum
  const baseRehabCost = items.reduce((acc, item) => acc + item.cost, 0)
  const contingencyAmount = Math.round((baseRehabCost * contingencyPercent) / 100)
  const totalRehabCost = baseRehabCost + contingencyAmount

  // Financial Formulas
  // MAO = (ARV * (TargetRule / 100)) - TotalRehabCost - AssignmentFee
  const mao = Math.round(arv * (targetRule / 100) - totalRehabCost - assignmentFee)

  const totalHoldingCost = holdingMonths * monthlyHoldingCost
  const totalInvestment = purchasePrice + totalRehabCost + closingCosts + totalHoldingCost + assignmentFee
  const projectedProfit = arv - totalInvestment
  const projectedRoi = totalInvestment > 0 ? ((projectedProfit / totalInvestment) * 100).toFixed(1) : "0"

  // Cost per SqFt
  const costPerSqft = sqft > 0 ? (totalRehabCost / sqft).toFixed(2) : "0"

  // Handle Preset Quality Selection
  const applyPreset = (preset: string) => {
    setRehabPreset(preset)
    let rate = 30
    if (preset === "light") rate = 20
    if (preset === "medium") rate = 40
    if (preset === "heavy") rate = 70

    if (preset !== "custom") {
      const estimatedTotal = sqft * rate
      const ratio = estimatedTotal / (baseRehabCost || 1)
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          cost: Math.round(item.cost * ratio),
        }))
      )
      toast.success(`Orçamento atualizado para padrão ${preset.toUpperCase()} ($${rate}/sqft)`)
    }
  }

  const handleItemCostChange = (id: string, newCost: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cost: Math.max(0, newCost) } : item))
    )
    setRehabPreset("custom")
  }

  const handleExportPDF = () => {
    toast.success("Relatório de Reforma Scope of Work exportado em PDF!")
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header Bar */}
      <div className="border-b border-border bg-card px-6 py-5 sticky top-0 z-10 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-600 text-white shadow-md shadow-indigo-500/20">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Calculadora de Reforma & Análise MAO (Rehab Calc)
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <Sparkles className="h-3 w-3" /> Regra dos 70% & ARV
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Simule o custo da reforma por m², determine a oferta máxima permitida (MAO) e projete o lucro líquido do investimento.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportPDF}
              variant="outline"
              className="h-9 rounded-xl font-semibold text-xs px-3.5 gap-1.5 border-border"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Exportar PDF / Imprimir</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* Financial KPI Results Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* MAO Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Oferta Máxima (MAO 70%)
              </span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
                ${mao.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Oferta sugerida para garantir o lucro.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Preço Proposto:</span>
              <span className={`font-bold ${purchasePrice <= mao ? "text-emerald-600" : "text-rose-500"}`}>
                ${purchasePrice.toLocaleString()} {purchasePrice <= mao ? "✓ Aprovado" : "⚠ Acima do MAO"}
              </span>
            </div>
          </div>

          {/* Custo Total de Reforma Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Orçamento de Reforma Total
              </span>
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Hammer className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                ${totalRehabCost.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Estimativa: <span className="font-bold text-foreground">${costPerSqft}/sqft</span>
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Margem Contingência (10%):</span>
              <span className="font-bold text-indigo-600">${contingencyAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Lucro Líquido Projetado */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Lucro Líquido Projetado
              </span>
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-2xl font-extrabold tracking-tight ${projectedProfit >= 30000 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                ${projectedProfit.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Retorno sobre Investimento: <span className="font-bold text-purple-600">{projectedRoi}% ROI</span>
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Investimento Total:</span>
              <span className="font-bold text-foreground">${totalInvestment.toLocaleString()}</span>
            </div>
          </div>

          {/* ARV Expected Value */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Valor Pós-Reforma (ARV)
              </span>
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                ${arv.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Área Total: <span className="font-bold text-foreground">{sqft.toLocaleString()} sqft</span>
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Taxa de Compra (MAO):</span>
              <span className="font-bold text-amber-600">{targetRule}% do ARV</span>
            </div>
          </div>

        </div>

        {/* Core Inputs & Scope Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Property & Deal Inputs */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Sliders className="h-5 w-5 text-indigo-600" />
                Parâmetros Financeiros do Imóvel
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              {/* ARV */}
              <div className="space-y-1.5">
                <label className="font-semibold text-muted-foreground">Valor Pós-Reforma estimado (ARV $)</label>
                <Input
                  type="number"
                  value={arv}
                  onChange={(e) => setArv(Number(e.target.value))}
                  className="rounded-xl h-10 font-extrabold text-sm"
                />
              </div>

              {/* Purchase Price */}
              <div className="space-y-1.5">
                <label className="font-semibold text-muted-foreground">Preço de Compra Proposto ($)</label>
                <Input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="rounded-xl h-10 font-bold"
                />
              </div>

              {/* SqFt */}
              <div className="space-y-1.5">
                <label className="font-semibold text-muted-foreground">Área Total do Imóvel (Square Feet)</label>
                <Input
                  type="number"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="rounded-xl h-10 font-medium"
                />
              </div>

              {/* Target Rule Selector */}
              <div className="space-y-1.5">
                <label className="font-semibold text-muted-foreground">Regra de Desconto Alvo (Target Rule %)</label>
                <Select value={targetRule.toString()} onValueChange={(val) => setTargetRule(Number(val))}>
                  <SelectTrigger className="rounded-xl h-10 font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="70">Regra 70% (Investidor Padrão)</SelectItem>
                    <SelectItem value="75">Regra 75% (Mercado de Alta Demanda)</SelectItem>
                    <SelectItem value="65">Regra 65% (Conservador / Alto Risco)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assignment Fee */}
              <div className="space-y-1.5">
                <label className="font-semibold text-muted-foreground">Taxa de Atribuição / Wholesale Fee ($)</label>
                <Input
                  type="number"
                  value={assignmentFee}
                  onChange={(e) => setAssignmentFee(Number(e.target.value))}
                  className="rounded-xl h-10 font-medium"
                />
              </div>

              {/* Holding Costs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-muted-foreground">Meses de Obra/Holding</label>
                  <Input
                    type="number"
                    value={holdingMonths}
                    onChange={(e) => setHoldingMonths(Number(e.target.value))}
                    className="rounded-xl h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-muted-foreground">Custo Mensal ($)</label>
                  <Input
                    type="number"
                    value={monthlyHoldingCost}
                    onChange={(e) => setMonthlyHoldingCost(Number(e.target.value))}
                    className="rounded-xl h-10"
                  />
                </div>
              </div>

              {/* Closing Costs */}
              <div className="space-y-1.5">
                <label className="font-semibold text-muted-foreground">Custos de Fechamento / Cartório ($)</label>
                <Input
                  type="number"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(Number(e.target.value))}
                  className="rounded-xl h-10 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Right Columns: Scope of Work Line Items */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Hammer className="h-5 w-5 text-emerald-600" />
                    Escopo Detalhado da Reforma (Scope of Work)
                  </h3>
                  <p className="text-xs text-muted-foreground">Ajuste os valores por item ou selecione um perfil de acabamento pronto.</p>
                </div>

                {/* Preset Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Preset:</span>
                  <Select value={rehabPreset} onValueChange={applyPreset}>
                    <SelectTrigger className="w-[160px] h-9 text-xs font-bold rounded-xl bg-background border-border">
                      <SelectValue placeholder="Preset Reforma" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="light">Cosmética ($20/sqft)</SelectItem>
                      <SelectItem value="medium">Média ($40/sqft)</SelectItem>
                      <SelectItem value="heavy">Pesada ($70/sqft)</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="divide-y divide-border text-xs mt-4">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4 hover:bg-muted/20 px-2 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center font-bold text-muted-foreground">
                        <Layers className="h-4 w-4 text-indigo-500" />
                      </div>
                      <div>
                        <span className="font-bold text-foreground block">{item.name}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold bg-secondary/80 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={item.cost}
                        onChange={(e) => handleItemCostChange(item.id, Number(e.target.value))}
                        className="w-32 h-9 rounded-xl font-bold text-right text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Footer Summary */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-indigo-500 shrink-0" />
                <span className="text-muted-foreground">
                  Subtotal dos Itens: <strong className="text-foreground">${baseRehabCost.toLocaleString()}</strong> + 10% Reserva Contingência (${contingencyAmount.toLocaleString()})
                </span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground block text-[10px]">Custo Total da Reforma:</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${totalRehabCost.toLocaleString()}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default RehabCalcPage
