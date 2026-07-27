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
  Share2,
  Settings2,
  Home,
  Plus,
  Trash2,
  Briefcase,
  Flame,
  ArrowRight,
  Target
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
  category: string
  quantity: number
  unitCost: number
  enabled: boolean
}

const initialItems: ScopeItem[] = [
  { id: "roof", name: "Architectural Roof & Gutters", category: "Exterior", quantity: 1, unitCost: 8500, enabled: true },
  { id: "windows", name: "Impact-Resistant Windows", category: "Exterior", quantity: 10, unitCost: 380, enabled: true },
  { id: "kitchen_cab", name: "Custom Shaker Cabinets", category: "Interior", quantity: 1, unitCost: 6500, enabled: true },
  { id: "baths", name: "Complete Bathroom Remodel", category: "Interior", quantity: 2, unitCost: 3800, enabled: true },
  { id: "flooring", name: "LVP Flooring", category: "Interior", quantity: 1800, unitCost: 3.2, enabled: true },
  { id: "hvac", name: "3.5 Ton HVAC System", category: "MEP", quantity: 1, unitCost: 6400, enabled: true },
]

export function RehabCalcPage() {
  // Deal Inputs
  const [arv, setArv] = React.useState<number>(480000)
  const [purchasePrice, setPurchasePrice] = React.useState<number>(275000)
  const [sqft, setSqft] = React.useState<number>(1800)
  const [targetRule, setTargetRule] = React.useState<number>(70)
  const [wholesaleFee, setWholesaleFee] = React.useState<number>(15000)
  const [holdingMonths, setHoldingMonths] = React.useState<number>(4)
  const [monthlyHolding, setMonthlyHolding] = React.useState<number>(1250)
  const [closingCosts, setClosingCosts] = React.useState<number>(8500)
  const [contingencyPercent, setContingencyPercent] = React.useState<number>(10)

  // Scope Items
  const [items, setItems] = React.useState<ScopeItem[]>(initialItems)
  const [newItemName, setNewItemName] = React.useState("")
  const [newItemCost, setNewItemCost] = React.useState("")

  // Calculations
  const baseRehabSum = items
    .filter((item) => item.enabled)
    .reduce((acc, item) => acc + item.quantity * item.unitCost, 0)
  
  const contingencyAmount = Math.round((baseRehabSum * contingencyPercent) / 100)
  const totalRehabCost = Math.round(baseRehabSum + contingencyAmount)

  // MAO = (ARV * (TargetRule / 100)) - TotalRehab - WholesaleFee
  const mao = Math.round(arv * (targetRule / 100) - totalRehabCost - wholesaleFee)
  
  const totalHoldingCost = holdingMonths * monthlyHolding
  const totalCapitalRequired = purchasePrice + totalRehabCost + closingCosts + totalHoldingCost + wholesaleFee
  const netProfit = arv - totalCapitalRequired
  const roi = totalCapitalRequired > 0 ? ((netProfit / totalCapitalRequired) * 100).toFixed(1) : "0"
  
  const purchaseToMaoRatio = Math.min((purchasePrice / (mao || 1)) * 100, 100)
  const isProfitable = purchasePrice <= mao

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim() || !newItemCost.trim()) return
    const costVal = parseFloat(newItemCost) || 0
    setItems([
      ...items,
      { id: `item-${Date.now()}`, name: newItemName, category: "General", quantity: 1, unitCost: costVal, enabled: true }
    ])
    setNewItemName("")
    setNewItemCost("")
  }

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0A0A0A] overflow-y-auto">
      
      {/* Premium Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-indigo-600/20 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="relative p-8 md:p-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold backdrop-blur-md">
              <Calculator className="h-4 w-4 text-emerald-400" />
              Real Estate Investment Analysis
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Rehab Calc <span className="text-emerald-400">& MAO</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm md:text-base">
              High-precision financial simulator for Fix & Flip. Evaluate rehab costs, calculate your maximum allowable offer (MAO), and secure your profit margin.
            </p>
          </div>
          
          {/* Hero Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl h-11 px-5 transition-all">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl h-11 px-5 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Download className="h-4 w-4 mr-2" /> Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col xl:flex-row gap-8">
        
        {/* Left Column: Inputs & Parameters (40% width) */}
        <div className="w-full xl:w-[400px] flex-shrink-0 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-card rounded-3xl border border-slate-200 dark:border-border shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-indigo-500" />
                Deal Parameters
              </h3>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">After Repair Value (ARV)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    type="number" 
                    value={arv} 
                    onChange={e => setArv(Number(e.target.value))}
                    className="pl-10 h-12 rounded-xl text-lg font-bold bg-slate-50 dark:bg-background border-slate-200 dark:border-border"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Purchase Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    type="number" 
                    value={purchasePrice} 
                    onChange={e => setPurchasePrice(Number(e.target.value))}
                    className="pl-10 h-12 rounded-xl text-lg font-bold bg-slate-50 dark:bg-background border-slate-200 dark:border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Area (SqFt)</label>
                  <Input 
                    type="number" 
                    value={sqft} 
                    onChange={e => setSqft(Number(e.target.value))}
                    className="h-11 rounded-xl font-semibold bg-slate-50 dark:bg-background border-slate-200 dark:border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Rule (%)</label>
                  <Select value={targetRule.toString()} onValueChange={(val) => setTargetRule(Number(val))}>
                    <SelectTrigger className="h-11 rounded-xl font-semibold bg-slate-50 dark:bg-background border-slate-200 dark:border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="70">70% Rule</SelectItem>
                      <SelectItem value="75">75% Rule</SelectItem>
                      <SelectItem value="65">65% Rule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card rounded-3xl border border-slate-200 dark:border-border shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-amber-500" />
                Financial Costs
              </h3>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wholesale Fee</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    type="number" 
                    value={wholesaleFee} 
                    onChange={e => setWholesaleFee(Number(e.target.value))}
                    className="pl-10 h-10 rounded-xl font-semibold bg-slate-50 dark:bg-background border-slate-200 dark:border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Holding Months</label>
                  <Input 
                    type="number" 
                    value={holdingMonths} 
                    onChange={e => setHoldingMonths(Number(e.target.value))}
                    className="h-10 rounded-xl font-semibold bg-slate-50 dark:bg-background border-slate-200 dark:border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Cost</label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      type="number" 
                      value={monthlyHolding} 
                      onChange={e => setMonthlyHolding(Number(e.target.value))}
                      className="pl-8 h-10 rounded-xl font-semibold bg-slate-50 dark:bg-background border-slate-200 dark:border-border"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Closing Costs</label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      type="number" 
                      value={closingCosts} 
                      onChange={e => setClosingCosts(Number(e.target.value))}
                      className="pl-8 h-10 rounded-xl font-semibold bg-slate-50 dark:bg-background border-slate-200 dark:border-border"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contingency %</label>
                  <Select value={contingencyPercent.toString()} onValueChange={(val) => setContingencyPercent(Number(val))}>
                    <SelectTrigger className="h-10 rounded-xl font-semibold bg-slate-50 dark:bg-background border-slate-200 dark:border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Dashboard & Results (60% width) */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* Financial KPI Dashboard - Modern Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MAO Indicator Card */}
            <div className="bg-white dark:bg-card rounded-3xl border border-slate-200 dark:border-border shadow-sm p-6 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Target className="w-32 h-32" />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Maximum Offer (MAO {targetRule}%)</p>
              <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                ${mao.toLocaleString()}
              </div>
              
              {/* Progress Bar for Purchase Price vs MAO */}
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Your Offer: ${purchasePrice.toLocaleString()}</span>
                  <span className={isProfitable ? "text-emerald-500" : "text-rose-500"}>
                    {isProfitable ? "Safe" : "High Risk"}
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isProfitable ? "bg-emerald-500" : "bg-rose-500"}`} 
                    style={{ width: `${purchaseToMaoRatio}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Profit & ROI Card */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl border border-indigo-900/50 shadow-xl p-6 relative overflow-hidden text-white flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <TrendingUp className="w-32 h-32" />
              </div>
              <p className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-2">Projected Net Profit</p>
              <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tighter mb-4">
                ${netProfit.toLocaleString()}
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/5">
                  <p className="text-xs text-indigo-300 font-medium">ROI Return</p>
                  <p className="text-lg font-bold">{roi}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/5">
                  <p className="text-xs text-indigo-300 font-medium">Total Capital</p>
                  <p className="text-lg font-bold">${(totalCapitalRequired/1000).toFixed(0)}k</p>
                </div>
              </div>
            </div>

          </div>

          {/* Scope of Work Section */}
          <div className="bg-white dark:bg-card rounded-3xl border border-slate-200 dark:border-border shadow-sm flex flex-col flex-1 overflow-hidden min-h-[500px]">
            
            <div className="p-6 border-b border-slate-100 dark:border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Hammer className="h-6 w-6 text-emerald-500" />
                  Scope of Work
                </h3>
                <p className="text-sm text-slate-500 mt-1">Total projected cost: <strong className="text-slate-900 dark:text-white">${totalRehabCost.toLocaleString()}</strong> (inc. {contingencyPercent}% contingency)</p>
              </div>
              
              <div className="flex bg-slate-100 dark:bg-muted p-1 rounded-xl">
                <Button variant="ghost" size="sm" className="rounded-lg h-8 text-xs font-bold">Summary</Button>
                <Button variant="secondary" size="sm" className="rounded-lg h-8 text-xs font-bold bg-white dark:bg-background shadow-sm">Detailed</Button>
              </div>
            </div>

            {/* List Header */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-muted/30 border-b border-slate-100 dark:border-border/50 flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="w-12">Active</div>
              <div className="flex-1">Service Description</div>
              <div className="w-24 text-center">Qty</div>
              <div className="w-32 text-right">Unit Cost</div>
              <div className="w-32 text-right">Subtotal</div>
              <div className="w-16"></div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex items-center px-4 py-3 rounded-2xl transition-all ${item.enabled ? 'hover:bg-slate-50 dark:hover:bg-muted/50' : 'opacity-50 grayscale'}`}
                >
                  <div className="w-12 flex justify-start">
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${item.enabled ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-border'}`}
                    >
                      {item.enabled && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex-1 pr-4 min-w-0">
                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                  </div>
                  <div className="w-24 text-center font-medium text-sm">{item.quantity}</div>
                  <div className="w-32 text-right font-medium text-sm text-slate-600 dark:text-slate-400">${item.unitCost.toLocaleString()}</div>
                  <div className="w-32 text-right font-bold text-sm text-slate-900 dark:text-white">${(item.quantity * item.unitCost).toLocaleString()}</div>
                  <div className="w-16 flex justify-end">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-xl hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/20 text-slate-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Item Row */}
            <div className="p-4 border-t border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/10">
              <form onSubmit={handleAddItem} className="flex gap-3">
                <Input 
                  placeholder="New service..." 
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="flex-1 h-11 rounded-xl bg-white dark:bg-background border-slate-200 dark:border-border text-sm"
                />
                <Input 
                  placeholder="Cost $" 
                  type="number"
                  value={newItemCost}
                  onChange={e => setNewItemCost(e.target.value)}
                  className="w-32 h-11 rounded-xl bg-white dark:bg-background border-slate-200 dark:border-border text-sm"
                />
                <Button type="submit" className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 font-bold shadow-sm">
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default RehabCalcPage
