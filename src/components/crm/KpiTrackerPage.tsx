"use client"

import * as React from "react"
import {
  TrendingUp,
  Target,
  DollarSign,
  Award,
  Users,
  PhoneCall,
  Calendar,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Filter,
  Layers,
  Sparkles,
  Zap,
  Building2,
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

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

// Mock Data for Charts
const revenueTrendData = [
  { month: "Jan", realizado: 82000, meta: 75000 },
  { month: "Fev", realizado: 95000, meta: 80000 },
  { month: "Mar", realizado: 110000, meta: 90000 },
  { month: "Abr", realizado: 105000, meta: 100000 },
  { month: "Mai", realizado: 128000, meta: 110000 },
  { month: "Jun", realizado: 148500, meta: 125000 },
]

const funnelData = [
  { stage: "Leads Frios", quantidade: 1450, meta: 1200 },
  { stage: "Qualificados", quantidade: 680, meta: 600 },
  { stage: "Propostas Enviadas", quantidade: 185, meta: 150 },
  { stage: "Contratos Assinados", quantidade: 38, meta: 30 },
  { stage: "Vendas Fechadas", quantidade: 24, meta: 20 },
]

const agentLeaderboard = [
  { id: 1, name: "Edson Calixto", avatar: "EC", deals: 8, revenue: "$64,200", calls: 420, goalCompletion: 128, status: "Top Producer" },
  { id: 2, name: "Alex Morgan", avatar: "AM", deals: 6, revenue: "$48,500", calls: 380, goalCompletion: 112, status: "Acima da Meta" },
  { id: 3, name: "Sarah Jenkins", avatar: "SJ", deals: 5, revenue: "$35,800", calls: 310, goalCompletion: 98, status: "Na Meta" },
  { id: 4, name: "Lucas Miller", avatar: "LM", deals: 3, revenue: "$24,100", calls: 290, goalCompletion: 82, status: "Em Evolução" },
]

interface KpiMetric {
  id: string
  name: string
  category: "Vendas" | "Marketing" | "Operações"
  actual: string
  target: string
  progress: number
  trend: string
  isPositive: boolean
}

const defaultKpis: KpiMetric[] = [
  { id: "1", name: "Faturamento Bruto ($)", category: "Vendas", actual: "$148,500", target: "$125,000", progress: 118, trend: "+18.8%", isPositive: true },
  { id: "2", name: "Volume de Contratos Fechados", category: "Vendas", actual: "24", target: "20", progress: 120, trend: "+20.0%", isPositive: true },
  { id: "3", name: "Ticket Médio por Imóvel ($)", category: "Vendas", actual: "$6,187", target: "$6,250", progress: 99, trend: "-1.0%", isPositive: false },
  { id: "4", name: "Custo por Lead (CPL)", category: "Marketing", actual: "$18.50", target: "$22.00", progress: 115, trend: "-15.9%", isPositive: true },
  { id: "5", name: "Taxa de Resposta SMS/Ligação", category: "Marketing", actual: "34.2%", target: "30.0%", progress: 114, trend: "+4.2%", isPositive: true },
  { id: "6", name: "Tempo Médio para Fechamento", category: "Operações", actual: "18 Dias", target: "21 Dias", progress: 114, trend: "-3 Dias", isPositive: true },
  { id: "7", name: "Taxa de Sucesso Skip Trace", category: "Operações", actual: "88.4%", target: "85.0%", progress: 104, trend: "+3.4%", isPositive: true },
]

export function KpiTrackerPage() {
  const [timeframe, setTimeframe] = React.useState("month")
  const [agentFilter, setAgentFilter] = React.useState("all")
  const [kpis, setKpis] = React.useState<KpiMetric[]>(defaultKpis)
  const [isGoalModalOpen, setIsGoalModalOpen] = React.useState(false)

  // Goal Form State
  const [newMetricName, setNewMetricName] = React.useState("")
  const [newCategory, setNewCategory] = React.useState<"Vendas" | "Marketing" | "Operações">("Vendas")
  const [newActual, setNewActual] = React.useState("")
  const [newTarget, setNewTarget] = React.useState("")

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMetricName.trim() || !newTarget.trim()) return

    const actualVal = parseFloat(newActual.replace(/[^0-9.]/g, "")) || 0
    const targetVal = parseFloat(newTarget.replace(/[^0-9.]/g, "")) || 1
    const computedProgress = Math.min(Math.round((actualVal / targetVal) * 100), 200)

    const newKpi: KpiMetric = {
      id: Date.now().toString(),
      name: newMetricName,
      category: newCategory,
      actual: newActual || "0",
      target: newTarget,
      progress: computedProgress || 100,
      trend: "+0.0%",
      isPositive: true,
    }

    setKpis([newKpi, ...kpis])
    setNewMetricName("")
    setNewActual("")
    setNewTarget("")
    setIsGoalModalOpen(false)
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Top Header */}
      <div className="border-b border-border bg-card px-6 py-5 sticky top-0 z-10 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-md shadow-emerald-500/20">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  KPI Tracker & Métricas de Desempenho
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="h-3 w-3" /> Metas em Tempo Real
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Acompanhe o faturamento, conversão de leads e volume de fechamentos da sua operação imobiliária.
              </p>
            </div>
          </div>

          {/* Action & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={timeframe} onValueChange={(val) => setTimeframe(val || 'week')}>
              <SelectTrigger className="w-[140px] h-9 text-xs font-semibold rounded-xl bg-background border-border">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Este Trimestre</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
              </SelectContent>
            </Select>

            <Select value={agentFilter} onValueChange={(val) => setAgentFilter(val || 'all')}>
              <SelectTrigger className="w-[160px] h-9 text-xs font-semibold rounded-xl bg-background border-border">
                <Users className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
                <SelectValue placeholder="Corretor / Time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">Toda a Equipe</SelectItem>
                <SelectItem value="edson">Edson Calixto</SelectItem>
                <SelectItem value="alex">Alex Morgan</SelectItem>
                <SelectItem value="sarah">Sarah Jenkins</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setIsGoalModalOpen(true)}
              className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 gap-1.5 shadow-sm shadow-emerald-600/20"
            >
              <Plus className="h-4 w-4" />
              <span>Nova Meta KPI</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* KPI Performance Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Faturamento Bruto */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Faturamento Bruto
              </span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">$148,500</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +18.8%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Meta do Mês: <span className="font-semibold text-foreground">$125,000</span>
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                <span>Progresso</span>
                <span className="text-emerald-600 font-bold">118%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[100%]" />
              </div>
            </div>
          </div>

          {/* Card 2: Contratos Fechados */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Contratos Fechados
              </span>
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">24 Imóveis</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +20%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Meta do Mês: <span className="font-semibold text-foreground">20 Imóveis</span>
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                <span>Progresso</span>
                <span className="text-indigo-600 font-bold">120%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[100%]" />
              </div>
            </div>
          </div>

          {/* Card 3: Taxa de Conversão */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Taxa de Conversão
              </span>
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Target className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">18.2%</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +2.4%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Bench Target: <span className="font-semibold text-foreground">15.0%</span>
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                <span>Progresso</span>
                <span className="text-purple-600 font-bold">121%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[100%]" />
              </div>
            </div>
          </div>

          {/* Card 4: Volume de Prospecção */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-sky-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Volume de Prospecção
              </span>
              <div className="h-9 w-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                <PhoneCall className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">1,840 Ações</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +12%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Chamadas: <span className="font-semibold text-foreground">1,200</span> | SMS: <span className="font-semibold text-foreground">640</span>
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                <span>Progresso</span>
                <span className="text-sky-600 font-bold">96%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full w-[96%]" />
              </div>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue vs Target Area Chart */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  Evolução do Faturamento vs Meta ($)
                </h3>
                <p className="text-xs text-muted-foreground">Comparativo de faturamento real acumulado contra a meta projetada.</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                +18.8% MoM
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", color: "#fff" }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="realizado" name="Faturamento Realizado" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRealizado)" />
                  <Area type="monotone" dataKey="meta" name="Meta Projetada" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorMeta)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Funnel Conversion Bar Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  Funil de Conversão
                </h3>
                <p className="text-xs text-muted-foreground">Volume por etapa de vendas.</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={funnelData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis dataKey="stage" type="category" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} width={110} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", color: "#fff" }} />
                  <Bar dataKey="quantidade" name="Realizado" fill="#6366f1" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Detailed KPI Benchmark Matrix Table */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between bg-card">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-600" />
                Matriz de Metas & Indicadores KPI
              </h3>
              <p className="text-xs text-muted-foreground">Acompanhamento detalhado das metas por categoria comercial.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4">Indicador KPI</th>
                  <th className="py-3 px-4">Categoria</th>
                  <th className="py-3 px-4">Realizado</th>
                  <th className="py-3 px-4">Meta Projetada</th>
                  <th className="py-3 px-4">Atingimento (%)</th>
                  <th className="py-3 px-4">Tendência</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {kpis.map((kpi) => (
                  <tr key={kpi.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-foreground">{kpi.name}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          kpi.category === "Vendas"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : kpi.category === "Marketing"
                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                            : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                        }`}
                      >
                        {kpi.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-foreground">{kpi.actual}</td>
                    <td className="py-3.5 px-4 font-medium text-muted-foreground">{kpi.target}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              kpi.progress >= 100 ? "bg-emerald-500" : kpi.progress >= 80 ? "bg-amber-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                          />
                        </div>
                        <span className="font-bold text-foreground">{kpi.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center font-bold text-xs ${kpi.isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                        {kpi.isPositive ? <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> : <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />}
                        {kpi.trend}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {kpi.progress >= 100 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg">
                          <CheckCircle2 className="h-3 w-3" /> Superada
                        </span>
                      ) : kpi.progress >= 80 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg">
                          <AlertCircle className="h-3 w-3" /> Na Média
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-lg">
                          <AlertCircle className="h-3 w-3" /> Atenção
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agent Leaderboard Ranking */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Ranking de Corretores & Produtividade
              </h3>
              <p className="text-xs text-muted-foreground">Desempenho da equipe comercial em fechamentos e prospecção.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentLeaderboard.map((agent) => (
              <div key={agent.id} className="rounded-xl border border-border bg-background p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                      {agent.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground truncate">{agent.name}</h4>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        {agent.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Contratos</span>
                    <span className="font-extrabold text-foreground">{agent.deals} Fechados</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Faturamento</span>
                    <span className="font-extrabold text-emerald-600">{agent.revenue}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                    <span>Atingimento da Meta</span>
                    <span className="font-bold text-indigo-600">{agent.goalCompletion}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${Math.min(agent.goalCompletion, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Goal Modal */}
      <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <Target className="h-5 w-5 text-emerald-600" />
              Adicionar Nova Meta KPI
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddGoal} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Nome do Indicador / Meta</label>
              <Input
                placeholder="Ex: Conversão de Cold Calls"
                value={newMetricName}
                onChange={(e) => setNewMetricName(e.target.value)}
                className="rounded-xl h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Categoria</label>
              <Select value={newCategory} onValueChange={(val: any) => setNewCategory(val)}>
                <SelectTrigger className="rounded-xl h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Vendas">Vendas</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operações">Operações</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Valor Realizado Atual</label>
                <Input
                  placeholder="Ex: $45,000 ou 15"
                  value={newActual}
                  onChange={(e) => setNewActual(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Meta Alvo (Target)</label>
                <Input
                  placeholder="Ex: $50,000 ou 20"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>
            </div>

            <DialogFooter className="pt-4 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsGoalModalOpen(false)}
                className="rounded-xl h-10 font-semibold"
              >
                Cancelar
              </Button>
              <Button type="submit" className="rounded-xl h-10 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white">
                Salvar Meta
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default KpiTrackerPage
