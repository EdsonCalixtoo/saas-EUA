import { useState } from "react";
import {
  Search,
  Filter,
  Columns3,
  Download,
  Plus,
  Upload,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type LeadStatus =
  | "New Lead"
  | "Attempting Contact"
  | "Contacted"
  | "Qualified"
  | "Offer Made"
  | "Under Contract"
  | "Closed"
  | "Unqualified"
  | "Archived";

interface Lead {
  id: number;
  name: string;
  address: string;
  owner: string;
  phone: string;
  status: LeadStatus;
  lastContact: string;
  source: string;
  rep: string;
  repInitials: string;
  repColor: string;
  nextFollowUp: string;
  score: number;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const ALL_LEADS: Lead[] = [
  { id: 1,  name: "John Smith",       address: "123 Main St, Tampa, FL",        owner: "John Smith",       phone: "(813) 555-2234", status: "New Lead",           lastContact: "2 days ago",  source: "DealMachine",   rep: "Sarah Johnson",   repInitials: "SJ", repColor: "oklch(0.68 0.19 195)", nextFollowUp: "May 20, 2024", score: 85 },
  { id: 2,  name: "Sarah Johnson",    address: "456 Oak Ave, Orlando, FL",      owner: "Sarah Johnson",    phone: "(407) 555-5678", status: "Attempting Contact", lastContact: "1 day ago",   source: "Facebook Ads",  rep: "Mike Davis",      repInitials: "MD", repColor: "oklch(0.72 0.17 155)", nextFollowUp: "May 22, 2024", score: 72 },
  { id: 3,  name: "Mike Davis",       address: "789 Pine Rd, Lakeland, FL",     owner: "Mike Davis",       phone: "(863) 555-9092", status: "Contacted",          lastContact: "3 days ago",  source: "DealMachine",   rep: "Emily Brown",     repInitials: "EB", repColor: "oklch(0.65 0.24 25)",  nextFollowUp: "May 24, 2024", score: 68 },
  { id: 4,  name: "Emily Brown",      address: "321 Elm St, Kissimmee, FL",     owner: "Emily Brown",      phone: "(321) 555-3456", status: "Qualified",          lastContact: "Today",       source: "Google Ads",    rep: "David Wilson",    repInitials: "DW", repColor: "oklch(0.78 0.17 75)",  nextFollowUp: "May 19, 2024", score: 91 },
  { id: 5,  name: "David Wilson",     address: "654 Maple Dr, Tampa, FL",       owner: "David Wilson",     phone: "(813) 555-7890", status: "Offer Made",         lastContact: "2 days ago",  source: "Direct Mail",   rep: "Jennifer Taylor", repInitials: "JT", repColor: "oklch(0.55 0.22 265)", nextFollowUp: "May 21, 2024", score: 78 },
  { id: 6,  name: "Jennifer Taylor",  address: "987 Palm Ln, Sarasota, FL",     owner: "Jennifer Taylor",  phone: "(941) 555-2468", status: "Under Contract",     lastContact: "5 days ago",  source: "DealMachine",   rep: "Lisa Martinez",   repInitials: "LM", repColor: "oklch(0.68 0.19 275)", nextFollowUp: "May 25, 2024", score: 88 },
  { id: 7,  name: "Robert Anderson",  address: "147 Cedar St, Orlando, FL",     owner: "Robert Anderson",  phone: "(407) 555-1357", status: "Closed",             lastContact: "1 week ago",  source: "Facebook Ads",  rep: "Mike Davis",      repInitials: "MD", repColor: "oklch(0.72 0.17 155)", nextFollowUp: "—",            score: 95 },
  { id: 8,  name: "Lisa Martinez",    address: "258 Beach Rd, Clearwater, FL",  owner: "Lisa Martinez",    phone: "(727) 555-6842", status: "Contacted",          lastContact: "4 days ago",  source: "Google Ads",    rep: "Sarah Johnson",   repInitials: "SJ", repColor: "oklch(0.68 0.19 195)", nextFollowUp: "May 23, 2024", score: 66 },
  { id: 9,  name: "James Thomas",     address: "369 Lake Dr, Lakeland, FL",     owner: "James Thomas",     phone: "(863) 555-9753", status: "Attempting Contact", lastContact: "2 days ago",  source: "DealMachine",   rep: "Emily Brown",     repInitials: "EB", repColor: "oklch(0.65 0.24 25)",  nextFollowUp: "May 20, 2024", score: 60 },
  { id: 10, name: "Patricia White",   address: "159 Garden St, Tampa, FL",      owner: "Patricia White",   phone: "(813) 555-4680", status: "New Lead",           lastContact: "1 day ago",   source: "Direct Mail",   rep: "David Wilson",    repInitials: "DW", repColor: "oklch(0.78 0.17 75)",  nextFollowUp: "May 19, 2024", score: 74 },
  { id: 11, name: "Charles Harris",   address: "741 River Blvd, St Pete, FL",   owner: "Charles Harris",   phone: "(727) 555-3310", status: "Qualified",          lastContact: "Today",       source: "Google Ads",    rep: "Jennifer Taylor", repInitials: "JT", repColor: "oklch(0.55 0.22 265)", nextFollowUp: "May 26, 2024", score: 83 },
  { id: 12, name: "Amanda Clark",     address: "852 Sunset Blvd, Naples, FL",   owner: "Amanda Clark",     phone: "(239) 555-7722", status: "Unqualified",        lastContact: "1 week ago",  source: "Facebook Ads",  rep: "Lisa Martinez",   repInitials: "LM", repColor: "oklch(0.68 0.19 275)", nextFollowUp: "—",            score: 34 },
  { id: 13, name: "Brian Lewis",      address: "963 Ocean Dr, Miami, FL",       owner: "Brian Lewis",      phone: "(305) 555-1199", status: "New Lead",           lastContact: "3 hours ago", source: "DealMachine",   rep: "Sarah Johnson",   repInitials: "SJ", repColor: "oklch(0.68 0.19 195)", nextFollowUp: "May 27, 2024", score: 79 },
  { id: 14, name: "Karen Robinson",   address: "147 Grove Ave, Ocala, FL",      owner: "Karen Robinson",   phone: "(352) 555-4433", status: "Archived",           lastContact: "2 weeks ago", source: "Direct Mail",   rep: "Mike Davis",      repInitials: "MD", repColor: "oklch(0.72 0.17 155)", nextFollowUp: "—",            score: 22 },
  { id: 15, name: "Daniel Scott",     address: "258 Palm Ave, Boca Raton, FL",  owner: "Daniel Scott",     phone: "(561) 555-8866", status: "Offer Made",         lastContact: "Yesterday",   source: "Google Ads",    rep: "Emily Brown",     repInitials: "EB", repColor: "oklch(0.65 0.24 25)",  nextFollowUp: "May 28, 2024", score: 87 },
];

// ─── Status badge config ───────────────────────────────────────────────────────
const STATUS_CONFIG: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  "New Lead":           { bg: "bg-blue-50",    text: "text-blue-700",   dot: "bg-blue-500" },
  "Attempting Contact": { bg: "bg-amber-50",   text: "text-amber-700",  dot: "bg-amber-500" },
  "Contacted":          { bg: "bg-green-50",   text: "text-green-700",  dot: "bg-green-500" },
  "Qualified":          { bg: "bg-purple-50",  text: "text-purple-700", dot: "bg-purple-500" },
  "Offer Made":         { bg: "bg-orange-50",  text: "text-orange-600", dot: "bg-orange-500" },
  "Under Contract":     { bg: "bg-indigo-50",  text: "text-indigo-700", dot: "bg-indigo-500" },
  "Closed":             { bg: "bg-emerald-50", text: "text-emerald-700",dot: "bg-emerald-500" },
  "Unqualified":        { bg: "bg-red-50",     text: "text-red-600",    dot: "bg-red-500" },
  "Archived":           { bg: "bg-gray-100",   text: "text-gray-500",   dot: "bg-gray-400" },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", cfg.bg, cfg.text)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {status}
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-emerald-600" :
    score >= 60 ? "text-amber-600" :
    "text-red-500";
  return (
    <span className={cn("text-sm font-bold tabular-nums", color)}>{score}</span>
  );
}

// ─── Tab config ────────────────────────────────────────────────────────────────
const TABS = [
  { key: "all",       label: "All Leads",    count: 2543 },
  { key: "new",       label: "New Leads",    count: 512 },
  { key: "contacted", label: "Contacted",    count: 1126 },
  { key: "qualified", label: "Qualified",    count: 256 },
  { key: "unqualified",label:"Unqualified",  count: 98 },
  { key: "archived",  label: "Archived",     count: 549 },
] as const;

// ─── Main component ────────────────────────────────────────────────────────────
export function LeadsTable() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  // Filter by search + tab
  const filtered = ALL_LEADS.filter((lead) => {
    const matchSearch =
      search === "" ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.address.toLowerCase().includes(search.toLowerCase()) ||
      lead.source.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === "all" ||
      (activeTab === "new" && lead.status === "New Lead") ||
      (activeTab === "contacted" && (lead.status === "Contacted" || lead.status === "Attempting Contact")) ||
      (activeTab === "qualified" && lead.status === "Qualified") ||
      (activeTab === "unqualified" && lead.status === "Unqualified") ||
      (activeTab === "archived" && lead.status === "Archived");
    return matchSearch && matchTab;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const allOnPageSelected = paginated.length > 0 && paginated.every((l) => selected.has(l.id));

  const toggleAll = () => {
    if (allOnPageSelected) {
      const next = new Set(selected);
      paginated.forEach((l) => next.delete(l.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      paginated.forEach((l) => next.add(l.id));
      setSelected(next);
    }
  };

  const toggleOne = (id: number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div className="flex flex-col gap-0">
      {/* ── Header ────────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 pt-8 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Leads</h1>
          <button className="mt-0.5 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
            All Leads <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent">
            <Upload className="h-4 w-4" />
            Import List
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────── */}
      <div className="border-b border-border px-8">
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
              className={cn(
                "relative flex flex-col items-start gap-0.5 px-5 py-3 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{tab.label}</span>
              <span className={cn("text-base font-bold", activeTab === tab.key ? "text-foreground" : "text-muted-foreground")}>
                {tab.count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Toolbar ───────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border bg-background/60 px-8 py-3">
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search..."
              className="h-9 w-52 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent">
            <Columns3 className="h-4 w-4" />
            Columns
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Sort: Newest</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                />
              </th>
              {[
                "Lead", "Property Address", "Owner", "Phone",
                "Status", "Last Contact", "Source", "Owner (Rep)",
                "Next Follow-up", "Lead Score",
              ].map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  <button className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                    {col}
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-20 text-center text-sm text-muted-foreground">
                  No leads found.
                </td>
              </tr>
            ) : (
              paginated.map((lead, idx) => (
                <tr
                  key={lead.id}
                  className={cn(
                    "group border-b border-border transition-colors hover:bg-accent/30 cursor-pointer",
                    selected.has(lead.id) && "bg-primary/5",
                    idx % 2 === 0 ? "" : "bg-muted/20",
                  )}
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.has(lead.id)}
                      onChange={() => toggleOne(lead.id)}
                      className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {lead.name}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-muted-foreground">
                    {lead.address}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-foreground">
                    {lead.owner}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-muted-foreground tabular-nums">
                    {lead.phone}
                  </td>
                  <td className="px-3 py-3.5">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-3 py-3.5 text-sm text-muted-foreground">
                    {lead.lastContact}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-muted-foreground">
                    {lead.source}
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white"
                        style={{ backgroundColor: lead.repColor }}
                      >
                        {lead.repInitials}
                      </div>
                      <span className="text-sm text-foreground">{lead.rep}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-muted-foreground">
                    {lead.nextFollowUp}
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <ScoreBadge score={lead.score} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-border px-8 py-4">
        <span className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–
          {Math.min(currentPage * perPage, filtered.length)} of {filtered.length} results
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition",
                  currentPage === page
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent",
                )}
              >
                {page}
              </button>
            );
          })}

          {totalPages > 5 && (
            <>
              <span className="px-1 text-muted-foreground">…</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium text-foreground transition hover:bg-accent"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>10 / page</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
