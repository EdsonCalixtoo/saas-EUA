import { useState, useRef, useEffect } from "react";
import {
  Phone, MessageCircle, Mail, CheckCircle2, Plus, MoreHorizontal,
  TrendingUp, TrendingDown, LayoutGrid, List, Table2,
  Filter, Settings2, Zap, Home, ChevronDown, DollarSign,
  Target, Award, XCircle, BarChart3, X, Check, ArrowUpDown,
  SlidersHorizontal, Eye, EyeOff, ChevronRight,
  Download, Users, Tag, Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────
type Stage = "new_lead" | "attempting" | "contacted" | "qualified" | "offer_made" | "under_contract" | "closed_won";
type ActionIconType = "phone" | "sms" | "email" | "check";
type ViewMode = "board" | "list" | "table";
type GroupBy = "stage" | "rep" | "source";
type SortBy = "custom" | "newest" | "oldest" | "value_high" | "value_low";

interface Deal {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  stage: Stage;
  estValue: number;
  soldFor?: number;
  repName: string;
  repInitials: string;
  repColor: string;
  timeLabel: string;
  gradient: string;
  actionIcon: ActionIconType;
  won?: boolean;
  source: string;
}

interface ActiveFilters {
  stages: Stage[];
  reps: string[];
  sources: string[];
  minValue: string;
  maxValue: string;
}

// ─── Stage Config ─────────────────────────────────────────────────────────────
export const STAGE_ORDER: Stage[] = [
  "new_lead", "attempting", "contacted", "qualified",
  "offer_made", "under_contract", "closed_won",
];

export const STAGE_META: Record<Stage, { label: string; dot: string; bar: string; pct: number }> = {
  new_lead:       { label: "New Lead",          dot: "#3b82f6", bar: "bg-blue-500",    pct: 9  },
  attempting:     { label: "Attempting Contact", dot: "#f59e0b", bar: "bg-amber-400",   pct: 11 },
  contacted:      { label: "Contacted",          dot: "#f97316", bar: "bg-orange-500",  pct: 18 },
  qualified:      { label: "Qualified",          dot: "#22c55e", bar: "bg-green-500",   pct: 26 },
  offer_made:     { label: "Offer Made",         dot: "#a855f7", bar: "bg-purple-500",  pct: 18 },
  under_contract: { label: "Under Contract",     dot: "#6366f1", bar: "bg-indigo-500",  pct: 9  },
  closed_won:     { label: "Closed (Won)",       dot: "#10b981", bar: "bg-emerald-500", pct: 9  },
};

const ALL_REPS   = ["Sarah Johnson", "Mike Davis", "Emily Brown", "David Wilson", "Jennifer Taylor", "Lisa Martinez", "Alex Carter"];
const ALL_SOURCES = ["DealMachine", "Facebook Ads", "Google Ads", "Direct Mail", "Cold Call", "Referral"];

// ─── Mock Deals ───────────────────────────────────────────────────────────────
export const DEALS: Deal[] = [
  { id:1,  address:"123 Main St",     city:"Tampa",          state:"FL",zip:"33602",stage:"new_lead",       estValue:28500, repName:"Sarah Johnson",  repInitials:"SJ",repColor:"oklch(0.68 0.19 195)",timeLabel:"Added 2 days ago",      gradient:"linear-gradient(135deg,#667eea,#764ba2)",actionIcon:"phone", source:"DealMachine"   },
  { id:2,  address:"456 Oak Ave",     city:"Orlando",        state:"FL",zip:"32801",stage:"new_lead",       estValue:42000, repName:"Mike Davis",      repInitials:"MD",repColor:"oklch(0.72 0.17 155)",timeLabel:"Added 1 day ago",       gradient:"linear-gradient(135deg,#f093fb,#f5576c)",actionIcon:"phone", source:"Facebook Ads"  },
  { id:3,  address:"789 Pine Rd",     city:"Lakeland",       state:"FL",zip:"33801",stage:"new_lead",       estValue:35000, repName:"Emily Brown",     repInitials:"EB",repColor:"oklch(0.65 0.24 25)", timeLabel:"Added 3 days ago",      gradient:"linear-gradient(135deg,#4facfe,#00f2fe)",actionIcon:"phone", source:"Google Ads"    },
  { id:4,  address:"321 Elm St",      city:"Kissimmee",      state:"FL",zip:"34741",stage:"attempting",     estValue:31000, repName:"David Wilson",    repInitials:"DW",repColor:"oklch(0.78 0.17 75)", timeLabel:"Last call 1 day ago",   gradient:"linear-gradient(135deg,#43e97b,#38f9d7)",actionIcon:"phone", source:"DealMachine"   },
  { id:5,  address:"987 Palm Ln",     city:"Sarasota",       state:"FL",zip:"34236",stage:"attempting",     estValue:55000, repName:"Lisa Martinez",   repInitials:"LM",repColor:"oklch(0.68 0.19 275)",timeLabel:"Last SMS 2 days ago",   gradient:"linear-gradient(135deg,#fa709a,#fee140)",actionIcon:"sms",   source:"Direct Mail"   },
  { id:6,  address:"654 Maple Dr",    city:"Tampa",          state:"FL",zip:"33614",stage:"attempting",     estValue:29500, repName:"Jennifer Taylor", repInitials:"JT",repColor:"oklch(0.55 0.22 265)",timeLabel:"Last call 3 days ago",  gradient:"linear-gradient(135deg,#a18cd1,#fbc2eb)",actionIcon:"phone", source:"Cold Call"     },
  { id:7,  address:"258 Beach Rd",    city:"Clearwater",     state:"FL",zip:"33767",stage:"contacted",      estValue:48000, repName:"Sarah Johnson",   repInitials:"SJ",repColor:"oklch(0.68 0.19 195)",timeLabel:"Last contact today",    gradient:"linear-gradient(135deg,#ffecd2,#fcb69f)",actionIcon:"email", source:"DealMachine"   },
  { id:8,  address:"369 Lake Dr",     city:"Lakeland",       state:"FL",zip:"33803",stage:"contacted",      estValue:62000, repName:"Mike Davis",      repInitials:"MD",repColor:"oklch(0.72 0.17 155)",timeLabel:"Last contact yesterday", gradient:"linear-gradient(135deg,#a1c4fd,#c2e9fb)",actionIcon:"email", source:"Facebook Ads"  },
  { id:9,  address:"753 Sunset Blvd", city:"Cape Coral",     state:"FL",zip:"33914",stage:"contacted",      estValue:41000, repName:"Lisa Martinez",   repInitials:"LM",repColor:"oklch(0.68 0.19 275)",timeLabel:"Last contact 1 day ago", gradient:"linear-gradient(135deg,#d4fc79,#96e6a1)",actionIcon:"email", source:"Google Ads"    },
  { id:10, address:"147 Cedar St",    city:"Orlando",        state:"FL",zip:"32803",stage:"qualified",      estValue:78500, repName:"Emily Brown",     repInitials:"EB",repColor:"oklch(0.65 0.24 25)", timeLabel:"Qualified 2 days ago",  gradient:"linear-gradient(135deg,#f77062,#fe5196)",actionIcon:"check", source:"Google Ads"    },
  { id:11, address:"159 Garden St",   city:"Tampa",          state:"FL",zip:"33609",stage:"qualified",      estValue:65000, repName:"Alex Carter",     repInitials:"AC",repColor:"oklch(0.55 0.22 265)",timeLabel:"Qualified 1 day ago",   gradient:"linear-gradient(135deg,#0fd850,#f9f047)",actionIcon:"check", source:"Referral"      },
  { id:12, address:"852 River Rd",    city:"Fort Myers",     state:"FL",zip:"33901",stage:"qualified",      estValue:95000, repName:"Jennifer Taylor", repInitials:"JT",repColor:"oklch(0.55 0.22 265)",timeLabel:"Qualified today",       gradient:"linear-gradient(135deg,#30cfd0,#330867)",actionIcon:"check", source:"Direct Mail"   },
  { id:13, address:"753 Ocean Ave",   city:"St. Petersburg", state:"FL",zip:"33701",stage:"offer_made",     estValue:57500, repName:"David Wilson",    repInitials:"DW",repColor:"oklch(0.78 0.17 75)", timeLabel:"Offered 2 days ago",    gradient:"linear-gradient(135deg,#e0c3fc,#8ec5fc)",actionIcon:"phone", source:"DealMachine"   },
  { id:14, address:"951 Bay Blvd",    city:"Clearwater",     state:"FL",zip:"33602",stage:"offer_made",     estValue:66000, repName:"Sarah Johnson",   repInitials:"SJ",repColor:"oklch(0.68 0.19 195)",timeLabel:"Offered 1 day ago",     gradient:"linear-gradient(135deg,#fddb92,#d1fdff)",actionIcon:"phone", source:"Facebook Ads"  },
  { id:15, address:"337 Harbor Dr",   city:"Clearwater",     state:"FL",zip:"33755",stage:"offer_made",     estValue:52000, repName:"Alex Carter",     repInitials:"AC",repColor:"oklch(0.55 0.22 265)",timeLabel:"Offered today",         gradient:"linear-gradient(135deg,#89f7fe,#66a6ff)",actionIcon:"phone", source:"Google Ads"    },
  { id:16, address:"456 Gulf Way",    city:"Naples",         state:"FL",zip:"34102",stage:"under_contract", estValue:72000, repName:"Lisa Martinez",   repInitials:"LM",repColor:"oklch(0.68 0.19 275)",timeLabel:"Contract 3 days ago",   gradient:"linear-gradient(135deg,#fda085,#f6d365)",actionIcon:"check", source:"DealMachine"   },
  { id:17, address:"852 Island Rd",   city:"Marco Island",   state:"FL",zip:"34145",stage:"under_contract", estValue:61000, repName:"Mike Davis",      repInitials:"MD",repColor:"oklch(0.72 0.17 155)",timeLabel:"Contract 2 days ago",   gradient:"linear-gradient(135deg,#84fab0,#8fd3f4)",actionIcon:"check", source:"Referral"      },
  { id:18, address:"753 Shore Dr",    city:"Sarasota",       state:"FL",zip:"34242",stage:"under_contract", estValue:58000, repName:"Emily Brown",     repInitials:"EB",repColor:"oklch(0.65 0.24 25)", timeLabel:"Contract yesterday",    gradient:"linear-gradient(135deg,#a18cd1,#fbc2eb)",actionIcon:"check", source:"Cold Call"     },
  { id:19, address:"789 Victory Ln",  city:"Tampa",          state:"FL",zip:"33601",stage:"closed_won",     estValue:71000, soldFor:71000, repName:"David Wilson",    repInitials:"DW",repColor:"oklch(0.78 0.17 75)", timeLabel:"Closed 3 days ago",     gradient:"linear-gradient(135deg,#f6d365,#fda085)",actionIcon:"check", source:"DealMachine",  won:true },
  { id:20, address:"258 Palm Dr",     city:"Orlando",        state:"FL",zip:"32804",stage:"closed_won",     estValue:64500, soldFor:64500, repName:"Sarah Johnson",   repInitials:"SJ",repColor:"oklch(0.68 0.19 195)",timeLabel:"Closed 5 days ago",     gradient:"linear-gradient(135deg,#43e97b,#38f9d7)",actionIcon:"check", source:"Facebook Ads", won:true },
  { id:21, address:"369 Central Ave", city:"St. Pete",       state:"FL",zip:"33701",stage:"closed_won",     estValue:59000, soldFor:59000, repName:"Alex Carter",     repInitials:"AC",repColor:"oklch(0.55 0.22 265)",timeLabel:"Closed 1 week ago",     gradient:"linear-gradient(135deg,#667eea,#764ba2)",actionIcon:"check", source:"Google Ads",   won:true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (v: number) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(2)}M` : `$${v.toLocaleString()}`;

function ActionIcon({ type }: { type: ActionIconType }) {
  const cls = "h-3.5 w-3.5";
  if (type === "phone") return <Phone className={cls} />;
  if (type === "sms")   return <MessageCircle className={cls} />;
  if (type === "email") return <Mail className={cls} />;
  return <CheckCircle2 className={cls} />;
}

function StageBadge({ stage }: { stage: Stage }) {
  const m = STAGE_META[stage];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ backgroundColor: m.dot + "22", color: m.dot }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.dot }} />
      {m.label}
    </span>
  );
}

// ─── Deal Card (Board) ────────────────────────────────────────────────────────
function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer">
      <div className="relative h-28 w-full overflow-hidden" style={{ background: deal.gradient }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <Home className="absolute right-3 top-3 h-7 w-7 text-white/20" />
        {deal.won && (
          <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">WON</span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-[11px] font-bold leading-tight text-white drop-shadow">{deal.address}</p>
          <p className="text-[10px] text-white/80">{deal.city}, {deal.state} {deal.zip}</p>
        </div>
      </div>
      <div className="p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{deal.won ? "Sold For" : "Est. Value"}</p>
            <p className="text-base font-bold text-foreground">{fmt(deal.soldFor ?? deal.estValue)}</p>
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition hover:bg-primary hover:text-white hover:border-primary">
            <ActionIcon type={deal.actionIcon} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ring-1 ring-white/50" style={{ backgroundColor: deal.repColor }}>
            {deal.repInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-foreground">{deal.repName}</p>
            <p className="truncate text-[10px] text-muted-foreground">{deal.timeLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────
function Column({ stage, deals }: { stage: Stage; deals: Deal[] }) {
  const meta = STAGE_META[stage];
  return (
    <div className="flex w-72 shrink-0 flex-col rounded-2xl bg-muted/50 border border-border/60">
      <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.dot }} />
          <span className="text-sm font-semibold text-foreground">{meta.label}</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white" style={{ backgroundColor: meta.dot }}>
            {deals.length}
          </span>
        </div>
        <button className="rounded-md p-1 text-muted-foreground transition hover:bg-background hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <p className="px-3.5 pb-2 text-xs font-medium text-muted-foreground">
        {fmt(deals.reduce((s, d) => s + d.estValue, 0))}
      </p>
      <div className="flex flex-col gap-2.5 overflow-y-auto px-3 pb-3" style={{ maxHeight: "calc(100vh - 340px)" }}>
        {deals.map((d) => <DealCard key={d.id} deal={d} />)}
        <button className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary">
          <Plus className="h-3.5 w-3.5" /> Add Deal
        </button>
      </div>
    </div>
  );
}

// ─── List View ────────────────────────────────────────────────────────────────
function PipelineListView({ deals }: { deals: Deal[] }) {
  const [sortCol, setSortCol] = useState<string>("address");
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = [...deals].sort((a, b) => {
    let va: string | number = "";
    let vb: string | number = "";
    if (sortCol === "address")  { va = a.address;  vb = b.address; }
    if (sortCol === "stage")    { va = a.stage;    vb = b.stage; }
    if (sortCol === "value")    { va = a.estValue; vb = b.estValue; }
    if (sortCol === "rep")      { va = a.repName;  vb = b.repName; }
    if (sortCol === "source")   { va = a.source;   vb = b.source; }
    if (typeof va === "string") return sortAsc ? va.localeCompare(vb as string) : (vb as string).localeCompare(va);
    return sortAsc ? (va as number) - (vb as number) : (vb as number) - (va as number);
  });

  const Th = ({ col, label }: { col: string; label: string }) => (
    <th className="px-4 py-3 text-left">
      <button
        onClick={() => { if (sortCol === col) setSortAsc(!sortAsc); else { setSortCol(col); setSortAsc(true); } }}
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
        <ArrowUpDown className={cn("h-3 w-3 opacity-40", sortCol === col && "opacity-100 text-primary")} />
      </button>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="w-10 px-4 py-3">
              <input type="checkbox" className="h-4 w-4 rounded accent-primary" />
            </th>
            <Th col="address" label="Property" />
            <Th col="stage"   label="Stage" />
            <Th col="value"   label="Est. Value" />
            <Th col="rep"     label="Rep" />
            <Th col="source"  label="Source" />
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Last Activity</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((deal, i) => (
            <tr key={deal.id} className={cn("border-b border-border transition-colors hover:bg-accent/30 cursor-pointer", i % 2 !== 0 && "bg-muted/20")}>
              <td className="px-4 py-3.5">
                <input type="checkbox" className="h-4 w-4 rounded accent-primary" />
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden" style={{ background: deal.gradient }}>
                    <div className="h-full w-full flex items-center justify-center">
                      <Home className="h-5 w-5 text-white/60" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground hover:text-primary">{deal.address}</p>
                    <p className="text-xs text-muted-foreground">{deal.city}, {deal.state} {deal.zip}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5"><StageBadge stage={deal.stage} /></td>
              <td className="px-4 py-3.5">
                <span className="text-sm font-bold text-foreground">{fmt(deal.soldFor ?? deal.estValue)}</span>
                {deal.won && <span className="ml-1.5 text-[10px] font-bold text-emerald-600">WON</span>}
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: deal.repColor }}>
                    {deal.repInitials}
                  </div>
                  <span className="text-sm text-foreground">{deal.repName}</span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-sm text-muted-foreground">{deal.source}</td>
              <td className="px-4 py-3.5 text-sm text-muted-foreground">{deal.timeLabel}</td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors">
                    <ActionIcon type={deal.actionIcon} />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent transition-colors">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Table View ───────────────────────────────────────────────────────────────
function PipelineTableView({ deals }: { deals: Deal[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {["Stage","Deals","Total Value","Avg Value","% of Total","Won"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STAGE_ORDER.map((stage, i) => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const total = stageDeals.reduce((s, d) => s + d.estValue, 0);
            const avg   = stageDeals.length ? total / stageDeals.length : 0;
            const pct   = deals.length ? Math.round(stageDeals.length / deals.length * 100) : 0;
            const won   = stageDeals.filter(d => d.won).length;
            const meta  = STAGE_META[stage];
            return (
              <tr key={stage} className={cn("border-b border-border hover:bg-accent/30 transition-colors", i % 2 !== 0 && "bg-muted/20")}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.dot }} />
                    <span className="font-semibold text-foreground">{meta.label}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-bold text-foreground">{stageDeals.length}</td>
                <td className="px-4 py-3.5 font-bold text-foreground">{fmt(total)}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{avg ? fmt(Math.round(avg)) : "—"}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                      <div className={cn("h-full rounded-full", meta.bar)} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {won > 0 ? <span className="font-semibold text-emerald-600">{won}</span> : <span className="text-muted-foreground">—</span>}
                </td>
              </tr>
            );
          })}
          {/* Total row */}
          <tr className="border-t-2 border-border bg-muted/60 font-semibold">
            <td className="px-4 py-3 text-foreground">Total</td>
            <td className="px-4 py-3 text-foreground">{deals.length}</td>
            <td className="px-4 py-3 text-foreground">{fmt(deals.reduce((s,d)=>s+d.estValue,0))}</td>
            <td className="px-4 py-3 text-muted-foreground">{fmt(Math.round(deals.reduce((s,d)=>s+d.estValue,0)/deals.length))}</td>
            <td className="px-4 py-3 text-muted-foreground">100%</td>
            <td className="px-4 py-3 text-emerald-600">{deals.filter(d=>d.won).length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Filters Panel ────────────────────────────────────────────────────────────
function FiltersPanel({ open, onClose, filters, onChange }: {
  open: boolean;
  onClose: () => void;
  filters: ActiveFilters;
  onChange: (f: ActiveFilters) => void;
}) {
  const toggleStage = (s: Stage) => {
    const next = filters.stages.includes(s) ? filters.stages.filter(x=>x!==s) : [...filters.stages, s];
    onChange({ ...filters, stages: next });
  };
  const toggleRep = (r: string) => {
    const next = filters.reps.includes(r) ? filters.reps.filter(x=>x!==r) : [...filters.reps, r];
    onChange({ ...filters, reps: next });
  };
  const toggleSource = (s: string) => {
    const next = filters.sources.includes(s) ? filters.sources.filter(x=>x!==s) : [...filters.sources, s];
    onChange({ ...filters, sources: next });
  };

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-card shadow-2xl transition-transform duration-300 border-l border-border",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onChange({ stages:[], reps:[], sources:[], minValue:"", maxValue:"" })} className="text-xs text-muted-foreground hover:text-primary">Clear all</button>
            <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-accent transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Stage */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stage</p>
            <div className="space-y-1.5">
              {STAGE_ORDER.map(stage => {
                const meta = STAGE_META[stage];
                const active = filters.stages.includes(stage);
                return (
                  <button key={stage} onClick={() => toggleStage(stage)}
                    className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-primary/10 text-primary" : "hover:bg-accent text-foreground")}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.dot }} />
                    <span className="flex-1 text-left">{meta.label}</span>
                    {active && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rep */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Assigned Rep</p>
            <div className="space-y-1.5">
              {ALL_REPS.map(rep => {
                const active = filters.reps.includes(rep);
                return (
                  <button key={rep} onClick={() => toggleRep(rep)}
                    className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-primary/10 text-primary" : "hover:bg-accent text-foreground")}
                  >
                    <span className="flex-1 text-left">{rep}</span>
                    {active && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Source */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Source</p>
            <div className="space-y-1.5">
              {ALL_SOURCES.map(src => {
                const active = filters.sources.includes(src);
                return (
                  <button key={src} onClick={() => toggleSource(src)}
                    className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-primary/10 text-primary" : "hover:bg-accent text-foreground")}
                  >
                    <span className="flex-1 text-left">{src}</span>
                    {active && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Value range */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Est. Value Range</p>
            <div className="flex items-center gap-2">
              <input
                type="number" placeholder="Min $"
                value={filters.minValue}
                onChange={e => onChange({ ...filters, minValue: e.target.value })}
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-muted-foreground">–</span>
              <input
                type="number" placeholder="Max $"
                value={filters.maxValue}
                onChange={e => onChange({ ...filters, maxValue: e.target.value })}
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <button onClick={onClose} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Board Settings Panel ─────────────────────────────────────────────────────
function BoardSettingsPanel({ open, onClose, hiddenStages, toggleHiddenStage }: {
  open: boolean;
  onClose: () => void;
  hiddenStages: Stage[];
  toggleHiddenStage: (s: Stage) => void;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-card shadow-2xl transition-transform duration-300 border-l border-border",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Board Settings</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-accent transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Column visibility */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Column Visibility</p>
            <p className="mb-3 text-xs text-muted-foreground">Show or hide stages from the board.</p>
            <div className="space-y-2">
              {STAGE_ORDER.map(stage => {
                const meta = STAGE_META[stage];
                const hidden = hiddenStages.includes(stage);
                return (
                  <div key={stage} className="flex items-center justify-between rounded-xl border border-border bg-background px-3.5 py-3 transition hover:bg-accent/50">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.dot }} />
                      <span className="text-sm font-medium text-foreground">{meta.label}</span>
                    </div>
                    <button onClick={() => toggleHiddenStage(stage)} className={cn("rounded-lg p-1.5 transition-colors", hidden ? "text-muted-foreground hover:text-foreground" : "text-primary hover:text-primary/70")}>
                      {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Display options */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Display Options</p>
            <div className="space-y-2">
              {[
                { label: "Show property thumbnail", defaultOn: true },
                { label: "Show est. value",          defaultOn: true },
                { label: "Show rep avatar",          defaultOn: true },
                { label: "Compact cards",            defaultOn: false },
              ].map(opt => (
                <label key={opt.label} className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background px-3.5 py-3">
                  <span className="text-sm text-foreground">{opt.label}</span>
                  <input type="checkbox" defaultChecked={opt.defaultOn} className="h-4 w-4 accent-primary rounded" />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <button onClick={onClose} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Add Deal Modal ────────────────────────────────────────────────────────────
function AddDealModal({ open, onClose, onAdd }: {
  open: boolean;
  onClose: () => void;
  onAdd: (deal: Omit<Deal, "id" | "gradient" | "actionIcon" | "repInitials" | "repColor" | "timeLabel">) => void;
}) {
  const [form, setForm] = useState({
    address:"", city:"", state:"FL", zip:"", stage:"new_lead" as Stage,
    estValue:"", repName:"Sarah Johnson", source:"DealMachine",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address || !form.city || !form.zip || !form.estValue) return;
    const rep = ALL_REPS.find(r => r === form.repName) ?? ALL_REPS[0];
    const initials = rep.split(" ").map(n => n[0]).join("");
    onAdd({
      address: form.address, city: form.city, state: form.state, zip: form.zip,
      stage: form.stage, estValue: parseInt(form.estValue.replace(/\D/g, "")) || 0,
      repName: form.repName, source: form.source,
    });
    setForm({ address:"",city:"",state:"FL",zip:"",stage:"new_lead",estValue:"",repName:"Sarah Johnson",source:"DealMachine" });
    onClose();
  };

  if (!open) return null;

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="mb-1 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
  const inputCls = "h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
  const selectCls = inputCls + " cursor-pointer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Add New Deal</h2>
            <p className="text-xs text-muted-foreground">Fill in the property details below</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 transition hover:bg-accent">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Field label="Property Address">
            <input required placeholder="123 Main St" value={form.address} onChange={e=>set("address",e.target.value)} className={inputCls} />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <Field label="City">
                <input required placeholder="Tampa" value={form.city} onChange={e=>set("city",e.target.value)} className={inputCls} />
              </Field>
            </div>
            <div>
              <Field label="State">
                <select value={form.state} onChange={e=>set("state",e.target.value)} className={selectCls}>
                  {["FL","TX","GA","NC","SC","TN","AZ","NV"].map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <div>
              <Field label="ZIP">
                <input required placeholder="33602" value={form.zip} onChange={e=>set("zip",e.target.value)} className={inputCls} maxLength={5} />
              </Field>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Estimated Value ($)">
              <input required type="number" placeholder="50000" value={form.estValue} onChange={e=>set("estValue",e.target.value)} className={inputCls} />
            </Field>
            <Field label="Stage">
              <select value={form.stage} onChange={e=>set("stage",e.target.value as Stage)} className={selectCls}>
                {STAGE_ORDER.map(s => <option key={s} value={s}>{STAGE_META[s].label}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Assigned Rep">
              <select value={form.repName} onChange={e=>set("repName",e.target.value)} className={selectCls}>
                {ALL_REPS.map(r => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Source">
              <select value={form.source} onChange={e=>set("source",e.target.value)} className={selectCls}>
                {ALL_SOURCES.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-accent">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90">
              Add Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown<T extends string>({ label, value, options, onChange }: {
  label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  const current = options.find(o => o.value === value)?.label ?? value;
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent">
        <span className="text-muted-foreground">{label}:</span>
        <span>{current}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-1.5 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          {options.map(o => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }}
              className={cn("flex w-full items-center justify-between px-3.5 py-2.5 text-sm transition hover:bg-accent", value===o.value && "text-primary font-semibold")}
            >
              {o.label}
              {value === o.value && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Stats + Progress ─────────────────────────────────────────────────────────
const STATS = [
  { label:"Total Pipeline Value", value:"$4,782,350", delta:12.4, up:true,  icon:DollarSign, color:"oklch(0.55 0.22 265)" },
  { label:"Active Deals",         value:"136",        delta:8.7,  up:true,  icon:BarChart3,  color:"oklch(0.72 0.17 155)" },
  { label:"Avg. Deal Value",      value:"$35,163",    delta:5.2,  up:true,  icon:Target,     color:"oklch(0.68 0.19 275)" },
  { label:"Deals Won (30d)",      value:"23",         delta:21.1, up:true,  icon:Award,      color:"oklch(0.78 0.17 75)"  },
  { label:"Deals Lost (30d)",     value:"7",          delta:12.5, up:false, icon:XCircle,    color:"oklch(0.62 0.24 27)"  },
];

function StatBar() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {STATS.map(s => (
        <div key={s.label} className="flex min-w-40 shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: s.color+"22" }}>
            <s.icon className="h-5 w-5" style={{ color: s.color }} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">{s.label}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-foreground">{s.value}</span>
              <span className={cn("flex items-center gap-0.5 text-xs font-semibold", s.up ? "text-emerald-600" : "text-red-500")}>
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{s.delta}%
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">vs last 30 days</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ deals }: { deals: Deal[] }) {
  const total = deals.length;
  if (total === 0) return null;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
      <span className="shrink-0 text-xs font-semibold text-muted-foreground">Total: {total} deals</span>
      <div className="flex flex-1 overflow-hidden rounded-full h-2.5 gap-px">
        {STAGE_ORDER.map(stage => {
          const count = deals.filter(d => d.stage === stage).length;
          const pct = Math.round(count / total * 100);
          const meta = STAGE_META[stage];
          return <div key={stage} title={`${meta.label}: ${pct}%`} className={cn("h-full transition-all hover:opacity-80", meta.bar)} style={{ width: `${pct}%` }} />;
        })}
      </div>
      <div className="flex shrink-0 gap-3">
        {STAGE_ORDER.map(stage => {
          const count = deals.filter(d => d.stage === stage).length;
          const pct = Math.round(count / total * 100);
          const meta = STAGE_META[stage];
          return (
            <div key={stage} className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.dot }} />
              <span className="text-[10px] font-medium text-muted-foreground">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
type OppTab = "opportunities" | "pipelines" | "bulkactions";

const PIPELINES = [
  { id: "main",       label: "Main Pipeline"       },
  { id: "wholesale",  label: "Wholesale Pipeline"  },
  { id: "novation",   label: "Novation Pipeline"   },
  { id: "buyers",     label: "Buyers Pipeline"     },
];

export function PipelineBoard() {
  const [view, setView]               = useState<ViewMode>("board");
  const [groupBy, setGroupBy]         = useState<GroupBy>("stage");
  const [sortBy, setSortBy]           = useState<SortBy>("custom");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addOpen, setAddOpen]         = useState(false);
  const [hiddenStages, setHiddenStages] = useState<Stage[]>([]);
  const [deals, setDeals]             = useState<Deal[]>(DEALS);
  const [oppTab, setOppTab]           = useState<OppTab>("opportunities");
  const [activePipeline, setActivePipeline] = useState(PIPELINES[0]);
  const [pipelineDropOpen, setPipelineDropOpen] = useState(false);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (pipelineRef.current && !pipelineRef.current.contains(e.target as Node))
        setPipelineDropOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const [filters, setFilters] = useState<ActiveFilters>({
    stages: [], reps: [], sources: [], minValue: "", maxValue: "",
  });

  // Apply filters
  const filteredDeals = deals.filter(d => {
    if (filters.stages.length  && !filters.stages.includes(d.stage))    return false;
    if (filters.reps.length    && !filters.reps.includes(d.repName))    return false;
    if (filters.sources.length && !filters.sources.includes(d.source))  return false;
    if (filters.minValue && d.estValue < parseInt(filters.minValue))     return false;
    if (filters.maxValue && d.estValue > parseInt(filters.maxValue))     return false;
    return true;
  });

  // Apply sort (for list/table views)
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === "value_high") return b.estValue - a.estValue;
    if (sortBy === "value_low")  return a.estValue - b.estValue;
    return 0;
  });

  const activeFilterCount =
    filters.stages.length + filters.reps.length + filters.sources.length +
    (filters.minValue ? 1 : 0) + (filters.maxValue ? 1 : 0);

  const toggleHiddenStage = (s: Stage) =>
    setHiddenStages(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  // Group by for board view
  const getGroupedDeals = (stage: Stage) => {
    if (groupBy === "stage") return filteredDeals.filter(d => d.stage === stage);
    return filteredDeals.filter(d => d.stage === stage);
  };

  const handleAddDeal = (partial: any) => {
    const gradients = [
      "linear-gradient(135deg,#667eea,#764ba2)",
      "linear-gradient(135deg,#f093fb,#f5576c)",
      "linear-gradient(135deg,#4facfe,#00f2fe)",
      "linear-gradient(135deg,#43e97b,#38f9d7)",
      "linear-gradient(135deg,#fa709a,#fee140)",
    ];
    const rep = partial.repName;
    const initials = rep.split(" ").map((n: string) => n[0]).join("");
    const colors = ["oklch(0.68 0.19 195)","oklch(0.72 0.17 155)","oklch(0.65 0.24 25)","oklch(0.78 0.17 75)","oklch(0.68 0.19 275)","oklch(0.55 0.22 265)"];
    const repColor = colors[Math.floor(Math.random() * colors.length)];
    const newDeal: Deal = {
      ...partial,
      id: Math.max(...deals.map(d => d.id)) + 1,
      repInitials: initials,
      repColor,
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      actionIcon: "phone",
      timeLabel: "Added just now",
    };
    setDeals(prev => [newDeal, ...prev]);
  };

  return (
    <div className="relative flex flex-col overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>

      {/* ── GHL-style top bar ──────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6">
        {/* Title row + action buttons */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Opportunities</h1>
            {/* Tab bar */}
            <div className="flex items-center gap-0">
              {([
                { key: "opportunities", label: "Opportunities" },
                { key: "pipelines",     label: "Pipelines"     },
                { key: "bulkactions",   label: "Bulk Actions"  },
              ] as { key: OppTab; label: string }[]).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setOppTab(tab.key)}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold transition-colors relative whitespace-nowrap",
                    oppTab === tab.key
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground border-b-2 border-transparent",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition",
                activeFilterCount > 0
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:bg-accent"
              )}
            >
              <Filter className="h-3.5 w-3.5" />
              {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : "Filters"}
            </button>
            <button onClick={() => setSettingsOpen(true)} className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground transition hover:bg-accent">
              <Settings2 className="h-3.5 w-3.5" /> Settings
            </button>
            <button className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground transition hover:bg-accent">
              <Download className="h-3.5 w-3.5" /> Import
            </button>
            <button onClick={() => setAddOpen(true)} className="inline-flex h-8 items-center gap-2 rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
              <Plus className="h-3.5 w-3.5" /> Add Opportunity
            </button>
          </div>
        </div>

        {/* Pipeline selector + view count + view toggle */}
        {oppTab === "opportunities" && (
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-3">
              {/* Pipeline dropdown */}
              <div ref={pipelineRef} className="relative">
                <button
                  onClick={() => setPipelineDropOpen(!pipelineDropOpen)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-accent transition"
                >
                  {activePipeline.label}
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                {pipelineDropOpen && (
                  <div className="absolute left-0 top-full z-30 mt-1.5 w-52 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                    {PIPELINES.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setActivePipeline(p); setPipelineDropOpen(false); }}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-accent",
                          activePipeline.id === p.id && "text-primary font-semibold",
                        )}
                      >
                        {p.label}
                        {activePipeline.id === p.id && <Check className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                    <div className="border-t border-border">
                      <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-accent transition">
                        <Plus className="h-3.5 w-3.5" /> New Pipeline
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Open count */}
              <button className="flex items-center gap-1.5 rounded-xl border-b-2 border-primary px-3 py-1.5 text-sm font-semibold text-primary">
                Open opportunities
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
                  {filteredDeals.length}
                </span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition">
                <Plus className="h-3.5 w-3.5" /> List
              </button>
            </div>

            {/* View toggle + Group/Sort */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 rounded-lg border border-border bg-card p-0.5">
                {(["board","list","table"] as ViewMode[]).map(v => {
                  const Icon = v === "board" ? LayoutGrid : v === "list" ? List : Table2;
                  return (
                    <button key={v} onClick={() => setView(v)}
                      className={cn("flex items-center justify-center rounded-md px-2.5 py-1.5 transition-all",
                        view===v ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground")}
                      title={v}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>
              <Dropdown<GroupBy>
                label="Group"
                value={groupBy}
                onChange={setGroupBy}
                options={[
                  { value:"stage",  label:"Stage"  },
                  { value:"rep",    label:"Rep"    },
                  { value:"source", label:"Source" },
                ]}
              />
              <Dropdown<SortBy>
                label="Sort"
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value:"custom",     label:"Custom"         },
                  { value:"newest",     label:"Newest"         },
                  { value:"oldest",     label:"Oldest"         },
                  { value:"value_high", label:"Value: High→Low" },
                  { value:"value_low",  label:"Value: Low→High" },
                ]}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-auto p-6 pb-8 gap-5">

      {/* Opportunities tab */}
      {oppTab === "opportunities" && (<>
      {/* Stats */}
      <StatBar />

      {view === "board" && (
        <div className="overflow-x-auto pb-3">
          <div className="flex gap-3" style={{ minWidth: "max-content" }}>
            {STAGE_ORDER
              .filter(s => !hiddenStages.includes(s))
              .map(stage => (
                <Column key={stage} stage={stage} deals={getGroupedDeals(stage)} />
              ))
            }
          </div>
        </div>
      )}

      {view === "list" && (
        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <PipelineListView deals={sortedDeals} />
        </div>
      )}

      {view === "table" && (
        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <PipelineTableView deals={filteredDeals} />
        </div>
      )}

      {/* Progress bar */}
      <ProgressBar deals={filteredDeals} />
      </>)}

      {/* Pipelines tab */}
      {oppTab === "pipelines" && (
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Your Pipelines</h2>
              <p className="text-xs text-muted-foreground">Manage multiple deal pipelines for different strategies.</p>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90">
              <Plus className="h-3.5 w-3.5" /> New Pipeline
            </button>
          </div>
          {PIPELINES.map(p => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-sm hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{DEALS.length} opportunities &nbsp;·&nbsp; ${DEALS.reduce((s,d)=>s+d.estValue,0).toLocaleString()} total value</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setActivePipeline(p); setOppTab("opportunities"); }} className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition">View Pipeline</button>
                <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent transition">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bulk Actions tab */}
      {oppTab === "bulkactions" && (
        <div className="max-w-3xl">
          <div className="mb-4">
            <h2 className="text-base font-bold text-foreground">Bulk Actions</h2>
            <p className="text-xs text-muted-foreground">Select opportunities from the board and apply actions in bulk.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Filter,    label: "Move Stage",       desc: "Move all selected deals to a specific stage."          },
              { icon: Users,     label: "Reassign Rep",      desc: "Assign selected opportunities to a different rep."      },
              { icon: Tag,       label: "Add Tag",           desc: "Apply a tag label to all selected deals."               },
              { icon: Mail,      label: "Send Email Sequence",desc: "Enroll contacts in an email drip campaign."            },
              { icon: Download,  label: "Export CSV",        desc: "Download selected deals as a spreadsheet file."         },
              { icon: Trash2,    label: "Delete Selected",   desc: "Permanently remove selected opportunities."             },
              { icon: Target,    label: "Mark as Won",       desc: "Close all selected deals as Closed (Won)."              },
              { icon: XCircle,   label: "Mark as Lost",      desc: "Archive all selected deals as Closed (Lost)."           },
            ].map(action => (
              <button key={action.label} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left hover:border-primary/40 hover:bg-accent/30 transition-all">
                <action.icon className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-bold text-foreground">{action.label}</p>
                  <p className="text-[10px] text-muted-foreground">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      </div> {/* end scrollable content */}

      {/* Panels & Modal */}
      <FiltersPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
      />
      <BoardSettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        hiddenStages={hiddenStages}
        toggleHiddenStage={toggleHiddenStage}
      />
      <AddDealModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddDeal}
      />

      {/* AI Assistant FAB */}
      <button className="fixed bottom-8 right-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_oklch(0.55_0.22_265_/_0.45)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_oklch(0.55_0.22_265_/_0.55)] z-30">
        <Zap className="h-4 w-4" />
        AI Assistant
      </button>
    </div>
  );
}
