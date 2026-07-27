import { useState } from "react";
import {
  Search, Filter, Plus, Home, MapPin, Building2, User,
  DollarSign, TrendingUp, ChevronRight, X, Phone, Mail, CheckCircle2,
  ShieldCheck, Zap, Star, MoreHorizontal, ChevronDown, Map,
  LayoutList, SlidersHorizontal, Download, Upload, RefreshCw,
  Eye, Building, Clock, Tag, Users, FileText, Activity, Briefcase,
  AlertCircle, PlusCircle, MessageSquare, Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────────
type PropertyStatus = "New Lead" | "Skip Traced" | "Contacted" | "Dead";
type PropTab = "search" | "my_properties" | "saved_lists" | "watchlist" | "recently_viewed";
type DetailTab = "overview" | "owner" | "financials" | "contacts" | "activity" | "deal";

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  ownerName: string;
  ownerType: "Individual" | "LLC" | "Trust";
  estValue: number;
  equityPct: number;
  equityDollar: number;
  loanBalance: number;
  lastSalePrice: number;
  lastSaleDate: string;
  status: PropertyStatus;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  lot: number;
  yearBuilt: number;
  propertyType: string;
  tags: string[];
  annualTaxes: number;
  taxAssessedValue: number;
  taxRate: string;
  apn: string;
  seller: string;
  starred?: boolean;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1", address: "123 Main St", city: "Tampa", state: "FL", zip: "33602",
    ownerName: "John Smith", ownerType: "Individual",
    estValue: 285000, equityPct: 68, equityDollar: 193800, loanBalance: 91200,
    lastSalePrice: 142000, lastSaleDate: "May 20, 2019",
    status: "New Lead", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    beds: 3, baths: 2, sqft: 1450, lot: 0.2, yearBuilt: 1998,
    propertyType: "Single Family", tags: ["Absentee Owner", "Long-Term Owner", "High Equity"],
    annualTaxes: 2582, taxAssessedValue: 186542, taxRate: "1.40%",
    apn: "A-23-29-18-3XY-000123-00001.0", seller: "Mark Johnson",
  },
  {
    id: "p2", address: "456 Oak Ave", city: "Tampa", state: "FL", zip: "33607",
    ownerName: "Rodriguez LLC", ownerType: "LLC",
    estValue: 412000, equityPct: 72, equityDollar: 296640, loanBalance: 115360,
    lastSalePrice: 210000, lastSaleDate: "Jan 10, 2018",
    status: "Skip Traced", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    beds: 4, baths: 2, sqft: 1820, lot: 0.3, yearBuilt: 2004,
    propertyType: "Single Family", tags: ["Absentee Owner", "High Equity"],
    annualTaxes: 3100, taxAssessedValue: 310000, taxRate: "1.00%",
    apn: "B-11-33-22-4AB-000456-00002.0", seller: "Carlos Rodriguez",
  },
  {
    id: "p3", address: "789 Pine St", city: "Tampa", state: "FL", zip: "33603",
    ownerName: "Williams Trust", ownerType: "Trust",
    estValue: 198000, equityPct: 65, equityDollar: 128700, loanBalance: 69300,
    lastSalePrice: 98000, lastSaleDate: "Mar 5, 2015",
    status: "New Lead", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
    beds: 2, baths: 1, sqft: 980, lot: 0.15, yearBuilt: 1975,
    propertyType: "Single Family", tags: ["Absentee Owner"],
    annualTaxes: 1800, taxAssessedValue: 150000, taxRate: "1.20%",
    apn: "C-05-17-19-7CD-000789-00003.0", seller: "Thomas Williams",
  },
  {
    id: "p4", address: "321 Sunset Blvd", city: "Tampa", state: "FL", zip: "33629",
    ownerName: "Elena Rodriguez", ownerType: "Individual",
    estValue: 365000, equityPct: 61, equityDollar: 222650, loanBalance: 142350,
    lastSalePrice: 198000, lastSaleDate: "Aug 22, 2020",
    status: "Contacted", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
    beds: 3, baths: 2, sqft: 1620, lot: 0.25, yearBuilt: 2001,
    propertyType: "Single Family", tags: ["Long-Term Owner"],
    annualTaxes: 2900, taxAssessedValue: 280000, taxRate: "1.04%",
    apn: "D-18-21-15-2EF-000321-00004.0", seller: "Ana Martinez",
  },
  {
    id: "p5", address: "654 Maple Dr", city: "Tampa", state: "FL", zip: "33614",
    ownerName: "Davis Properties LLC", ownerType: "LLC",
    estValue: 275000, equityPct: 58, equityDollar: 159500, loanBalance: 115500,
    lastSalePrice: 165000, lastSaleDate: "Nov 15, 2017",
    status: "New Lead", image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=600&q=80",
    beds: 3, baths: 2, sqft: 1350, lot: 0.2, yearBuilt: 1990,
    propertyType: "Single Family", tags: ["Absentee Owner", "High Equity"],
    annualTaxes: 2200, taxAssessedValue: 220000, taxRate: "1.00%",
    apn: "E-29-10-08-5GH-000654-00005.0", seller: "Mike Davis",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(2)}M` : `$${v.toLocaleString()}`;

const TAG_COLORS: Record<string, string> = {
  "Absentee Owner":   "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "Long-Term Owner":  "bg-blue-500/10   text-blue-600   border-blue-500/20",
  "High Equity":      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const STATUS_DOT: Record<PropertyStatus, string> = {
  "New Lead":    "bg-blue-500",
  "Skip Traced": "bg-emerald-500",
  "Contacted":   "bg-purple-500",
  "Dead":        "bg-zinc-400",
};

// ── Sub-components ────────────────────────────────────────────────────────────
function TagBadge({ tag }: { tag: string }) {
  const cls = TAG_COLORS[tag] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold", cls)}>
      {tag}
    </span>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition">
        {title}
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", !open && "-rotate-90")} />
      </button>
      {open && children}
    </div>
  );
}

function RangeRow({ label, minPh, maxPh }: { label: string; minPh: string; maxPh: string }) {
  return (
    <div className="mb-2">
      <p className="text-[10px] font-medium text-muted-foreground mb-1">{label}</p>
      <div className="flex gap-1.5">
        <input placeholder={minPh} className="flex-1 rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary" />
        <input placeholder={maxPh} className="flex-1 rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary" />
      </div>
    </div>
  );
}

// ── Left Sidebar Filters ──────────────────────────────────────────────────────
function FilterSidebar() {
  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-card overflow-y-auto">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">Search Filters</span>
        <button className="text-xs text-primary hover:underline">Clear</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-0">

        <FilterSection title="Search Location">
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">State</p>
              <select className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary">
                <option>Florida</option>
                <option>Georgia</option>
                <option>Texas</option>
              </select>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">County</p>
              <select className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary">
                <option>Hillsborough</option>
                <option>Pinellas</option>
              </select>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">City</p>
              <select className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary">
                <option>Tampa</option>
                <option>St. Pete</option>
              </select>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">ZIP Code</p>
              <input placeholder="33602" className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5">Radius</p>
            <select className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary">
              <option>5 miles</option><option>10 miles</option><option>25 miles</option>
            </select>
          </div>
        </FilterSection>

        <FilterSection title="Property">
          <div className="mb-2">
            <p className="text-[10px] text-muted-foreground mb-1">Property Type</p>
            <select className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary">
              <option>Single Family</option><option>Multi-Family</option><option>Condo</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">Beds</p>
              <select className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary">
                <option>Any</option><option>1+</option><option>2+</option><option>3+</option>
              </select>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-0.5">Baths</p>
              <select className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary">
                <option>Any</option><option>1+</option><option>2+</option>
              </select>
            </div>
          </div>
          <RangeRow label="Sqft" minPh="Min 1,000" maxPh="Max 3,000" />
          <RangeRow label="Year Built" minPh="Min 1990" maxPh="Max 2024" />
          <RangeRow label="Estimated Value" minPh="$100,000" maxPh="$1,000,000+" />
        </FilterSection>

        <FilterSection title="Owner">
          <div className="mb-3 flex gap-1">
            {["Individual", "LLC", "Trust"].map(t => (
              <button key={t} className={cn("flex-1 rounded-lg border py-1 text-[10px] font-semibold transition",
                t === "Individual" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-accent")}>
                {t}
              </button>
            ))}
          </div>
          {[
            { label: "Absentee Owner", defaultOn: true },
            { label: "Out-of-State Owner", defaultOn: true },
            { label: "Owner Occupied", defaultOn: false },
          ].map(opt => (
            <label key={opt.label} className="flex items-center justify-between py-1.5 cursor-pointer">
              <span className="text-xs text-foreground">{opt.label}</span>
              <div className={cn("relative h-5 w-9 rounded-full transition-colors", opt.defaultOn ? "bg-primary" : "bg-muted")}>
                <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform", opt.defaultOn ? "translate-x-4" : "translate-x-0.5")} />
              </div>
            </label>
          ))}
          <RangeRow label="Ownership Length" minPh="2+ years" maxPh="Max" />
        </FilterSection>

        <FilterSection title="Financial">
          <RangeRow label="Equity %" minPh="Min 50%" maxPh="Max 100%" />
          <RangeRow label="Equity $" minPh="$50,000" maxPh="No Max" />
          <RangeRow label="Mortgage Balance" minPh="$0" maxPh="$500,000" />
          <RangeRow label="Last Sale Price" minPh="$50,000" maxPh="No Max" />
          <div className="mb-2">
            <p className="text-[10px] font-medium text-muted-foreground mb-1">Last Sale Date</p>
            <input type="date" className="w-full rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary" />
          </div>
        </FilterSection>

        <FilterSection title="Motivation">
          {["High Equity", "Vacant / Likely Vacant", "Long-Term Owner (5+ yrs)", "Absentee Owner", "Pre-Foreclosure"].map(m => (
            <label key={m} className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" defaultChecked={["High Equity", "Vacant / Likely Vacant"].includes(m)} className="h-3.5 w-3.5 rounded accent-primary" />
              <span className="text-xs text-foreground">{m}</span>
            </label>
          ))}
        </FilterSection>
      </div>

      <div className="shrink-0 border-t border-border p-4 space-y-2">
        <button className="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm flex items-center justify-center gap-2">
          <Search className="h-3.5 w-3.5" /> Search Properties
        </button>
        <button className="w-full rounded-xl border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-accent transition">
          Save Search
        </button>
      </div>
    </div>
  );
}

// ── Property Row Card ─────────────────────────────────────────────────────────
function PropertyCard({ prop, selected, onClick }: { prop: Property; selected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex gap-4 p-4 cursor-pointer border-b border-border transition-all hover:bg-accent/50",
        selected && "bg-primary/5 border-l-2 border-l-primary",
      )}
    >
      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img src={prop.image} alt={prop.address} className="h-full w-full object-cover" />
        <button className="absolute top-1.5 right-1.5 rounded-full bg-black/20 p-1 text-white backdrop-blur-md hover:text-yellow-400 transition">
          <Star className={cn("h-3 w-3", prop.starred && "fill-yellow-400 text-yellow-400")} />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="text-sm font-bold text-foreground">{prop.address}</p>
            <p className="text-xs text-muted-foreground">{prop.city}, {prop.state} {prop.zip}</p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <p className="text-sm font-bold text-foreground">{fmt(prop.estValue)}</p>
            <p className="text-[10px] font-semibold text-emerald-600">Equity {prop.equityPct}%</p>
            <p className="text-[10px] text-muted-foreground">{fmt(prop.equityDollar)}</p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mb-2">
          {prop.propertyType} &nbsp;·&nbsp; {prop.beds} bd / {prop.baths} ba / {prop.sqft.toLocaleString()} sqft
        </p>

        <div className="flex flex-wrap gap-1 mb-2">
          {prop.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary hover:bg-primary/20 transition">
            View Details
          </button>
          <button className="rounded-lg bg-primary px-3 py-1 text-[10px] font-semibold text-white hover:bg-primary/90 transition">
            Add to CRM
          </button>
          <button className="ml-auto rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Map Placeholder ───────────────────────────────────────────────────────────
function MapView({ properties }: { properties: Property[] }) {
  return (
    <div className="relative flex-1 bg-muted/30 overflow-hidden">
      {/* Fake map grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-green-50/20 dark:from-blue-950/10 dark:to-green-950/10" />

      {/* Fake pins */}
      {[
        { top: "30%", left: "25%", val: "$285K", id: "p1" },
        { top: "55%", left: "40%", val: "$412K", id: "p2" },
        { top: "70%", left: "60%", val: "$198K", id: "p3" },
        { top: "45%", left: "70%", val: "$365K", id: "p4" },
        { top: "20%", left: "55%", val: "$275K", id: "p5" },
      ].map(pin => (
        <div key={pin.id} className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group" style={{ top: pin.top, left: pin.left }}>
          <div className="flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
            <MapPin className="h-2.5 w-2.5" />{pin.val}
          </div>
          <div className="mx-auto h-2 w-0.5 bg-primary" />
        </div>
      ))}

      {/* Map controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1">
        {["+", "−"].map(sign => (
          <button key={sign} className="flex h-7 w-7 items-center justify-center rounded-lg bg-card border border-border text-sm font-bold text-foreground hover:bg-accent transition shadow-sm">
            {sign}
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-card/80 backdrop-blur-md border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
        <Map className="h-3.5 w-3.5" /> Map powered by DealMachine API
      </div>
    </div>
  );
}

// ── Property Detail Panel ─────────────────────────────────────────────────────
function DetailPanel({ prop, onClose }: { prop: Property; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [isTracing, setIsTracing] = useState(false);
  const [traceResult, setTraceResult] = useState<any>(null);

  const handleSkipTrace = () => {
    setIsTracing(true);
    setTimeout(() => {
      setIsTracing(false);
      setTraceResult({
        phones: ["(555) 123-4567 (Mobile)", "(555) 987-6543 (Landline)"],
        emails: ["owner@example.com", "alt.owner@gmail.com"],
        age: "45-50",
        mailingAddress: "P.O. Box 123, Clearwater FL 33755",
        score: "High Intent",
      });
    }, 2000);
  };

  const TABS: { key: DetailTab; label: string }[] = [
    { key: "overview",  label: "Overview"  },
    { key: "owner",     label: "Owner"     },
    { key: "financials",label: "Financials"},
    { key: "contacts",  label: "Contacts"  },
    { key: "activity",  label: "Activity"  },
    { key: "deal",      label: "Deal"      },
  ];

  return (
    <div className="flex h-full w-[380px] shrink-0 flex-col border-l border-border bg-card overflow-hidden">
      {/* Header Image */}
      <div className="relative h-52 w-full shrink-0">
        <img src={prop.image} alt={prop.address} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <button onClick={onClose} className="absolute top-3 right-3 rounded-full bg-black/20 p-1.5 text-white backdrop-blur-md hover:bg-black/40 transition">
          <X className="h-4 w-4" />
        </button>
        <button className="absolute top-3 left-3 rounded-full bg-black/20 p-1.5 text-white backdrop-blur-md hover:text-yellow-400 transition">
          <Star className={cn("h-4 w-4", prop.starred && "fill-yellow-400 text-yellow-400")} />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-bold text-white drop-shadow">{prop.address}</h2>
          <p className="text-sm text-white/80">{prop.city}, {prop.state} {prop.zip}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-foreground">{prop.propertyType}</span>
            <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-foreground">{prop.beds} bd</span>
            <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-foreground">{prop.baths} ba</span>
            <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-foreground">{prop.sqft.toLocaleString()} sqft</span>
            <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-foreground">Built {prop.yearBuilt}</span>
          </div>
        </div>
      </div>

      {/* Value strip */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-muted/30">
        <div className="p-3">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Est. Value</p>
          <p className="text-sm font-bold text-foreground">{fmt(prop.estValue)}</p>
        </div>
        <div className="p-3">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Est. Equity</p>
          <p className="text-sm font-bold text-emerald-600">{prop.equityPct}%</p>
          <p className="text-[10px] text-muted-foreground">{fmt(prop.equityDollar)}</p>
        </div>
        <div className="p-3">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Mortgage Bal.</p>
          <p className="text-sm font-bold text-foreground">{fmt(prop.loanBalance)}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-border">
        {prop.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
      </div>

      {/* CTA buttons */}
      <div className="flex gap-2 px-4 py-3 border-b border-border">
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm">
          <PlusCircle className="h-3.5 w-3.5" /> Add to CRM
        </button>
        <button
          onClick={handleSkipTrace}
          disabled={isTracing || !!traceResult}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition",
            traceResult
              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
              : "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          {isTracing ? (
            <><svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Tracing...</>
          ) : traceResult ? (
            <><CheckCircle2 className="h-3.5 w-3.5" /> Skip Traced</>
          ) : (
            <><Eye className="h-3.5 w-3.5" /> Reveal Owner</>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border bg-muted/20 shrink-0">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={cn("whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold transition-colors border-b-2",
              activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 text-sm">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Property Details</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Property Type", value: prop.propertyType },
                  { label: "Lot Size", value: `${prop.lot} acres` },
                  { label: "Year Built", value: prop.yearBuilt },
                  { label: "Bedrooms", value: prop.beds },
                  { label: "Bathrooms", value: prop.baths },
                  { label: "Sqft", value: prop.sqft.toLocaleString() },
                ].map(row => (
                  <div key={row.label} className="rounded-lg bg-muted/40 p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{row.label}</p>
                    <p className="text-xs font-bold text-foreground">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Tax Information</p>
              <div className="space-y-1.5 rounded-xl border border-border bg-muted/20 p-3">
                {[
                  { label: "Tax Assessed Value", value: fmt(prop.taxAssessedValue) },
                  { label: "Annual Taxes", value: `$${prop.annualTaxes.toLocaleString()}` },
                  { label: "Tax Year", value: "2024" },
                  { label: "Tax Rate", value: prop.taxRate },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className="text-xs font-semibold text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Sale</p>
              <div className="space-y-1.5 rounded-xl border border-border bg-muted/20 p-3">
                {[
                  { label: "Sale Date", value: prop.lastSaleDate },
                  { label: "Sale Price", value: fmt(prop.lastSalePrice) },
                  { label: "APN", value: prop.apn },
                  { label: "Seller", value: prop.seller },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className="text-xs font-semibold text-foreground truncate max-w-[140px] text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "owner" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                {prop.ownerName[0]}
              </div>
              <div>
                <p className="font-bold text-foreground">{prop.ownerName}</p>
                <p className="text-xs text-muted-foreground">{prop.ownerType} · Owner</p>
              </div>
            </div>
            {!traceResult ? (
              <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-5 text-center">
                <ShieldCheck className="mx-auto mb-3 h-9 w-9 text-primary/60" />
                <p className="mb-1 font-bold text-foreground">Run Skip Trace</p>
                <p className="mb-4 text-xs text-muted-foreground">Reveal phone, email, and demographic data for this owner via DealMachine API.</p>
                <button onClick={handleSkipTrace} disabled={isTracing} className="relative w-full overflow-hidden rounded-xl bg-primary py-3 text-xs font-bold text-white hover:bg-primary/90 disabled:opacity-70 transition flex items-center justify-center gap-2">
                  {isTracing ? (
                    <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Searching Public Records...</>
                  ) : (
                    <><Zap className="h-4 w-4" /> Run Skip Trace (1 Credit)</>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-bold">Skip Trace Successful</span>
                </div>
                {[
                  { label: "Phone Numbers", items: traceResult.phones, icon: Phone },
                  { label: "Email Addresses", items: traceResult.emails, icon: Mail },
                ].map(group => (
                  <div key={group.label} className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{group.label}</p>
                    {group.items.map((item: string) => (
                      <div key={item} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                        <span className="text-xs text-foreground">{item}</span>
                        <button className="rounded-lg bg-accent p-1.5 text-muted-foreground hover:text-primary transition">
                          <group.icon className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-[9px] uppercase text-muted-foreground font-bold">Age</p>
                    <p className="text-xs font-bold text-foreground">{traceResult.age}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-[9px] uppercase text-muted-foreground font-bold">Match Score</p>
                    <p className="text-xs font-bold text-emerald-600">{traceResult.score}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-3">
                  <p className="text-[9px] uppercase text-muted-foreground font-bold mb-1">Mailing Address</p>
                  <p className="text-xs text-foreground">{traceResult.mailingAddress}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "financials" && (
          <div className="space-y-2">
            {[
              { label: "Estimated Value", value: fmt(prop.estValue), highlight: false },
              { label: "Equity Amount", value: fmt(prop.equityDollar), highlight: true },
              { label: "Equity %", value: `${prop.equityPct}%`, highlight: true },
              { label: "Mortgage Balance", value: fmt(prop.loanBalance), highlight: false },
              { label: "Last Sale Price", value: fmt(prop.lastSalePrice), highlight: false },
              { label: "Annual Taxes", value: `$${prop.annualTaxes.toLocaleString()}`, highlight: false },
              { label: "Tax Assessed Value", value: fmt(prop.taxAssessedValue), highlight: false },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between rounded-xl border border-border bg-muted/20 px-3.5 py-3">
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className={cn("text-xs font-bold", row.highlight ? "text-emerald-600" : "text-foreground")}>{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 text-xs font-medium text-muted-foreground hover:bg-accent transition">
              <Plus className="h-4 w-4" /> Add Contact
            </button>
            <p className="text-center text-xs text-muted-foreground pt-4">No contacts linked yet. Run a Skip Trace to reveal owner contact info.</p>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-2">
            {[
              { icon: Eye, text: "Property viewed", time: "2 hours ago" },
              { icon: Search, text: "Added to search results", time: "Today" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-muted/30 p-3">
                <item.icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "deal" && (
          <div className="text-center py-8">
            <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">No deal linked</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">Add this property to your Opportunities pipeline.</p>
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition">
              <Plus className="h-4 w-4" /> Create Opportunity
            </button>
          </div>
        )}

        {/* Notes */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notes</p>
            <button className="text-xs text-primary hover:underline flex items-center gap-1">
              <PlusCircle className="h-3 w-3" /> Add Note
            </button>
          </div>
          <textarea placeholder="Add a note about this property..." className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground outline-none focus:border-primary resize-none" rows={3} />
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<PropTab>("search");
  const [selectedProp, setSelectedProp] = useState<Property | null>(MOCK_PROPERTIES[0]);

  const filtered = MOCK_PROPERTIES.filter(p =>
    p.address.toLowerCase().includes(search.toLowerCase()) ||
    p.ownerName.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = filtered.reduce((s, p) => s + p.estValue, 0);
  const avgEquity  = Math.round(filtered.reduce((s, p) => s + p.equityPct, 0) / filtered.length);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">

      {/* ── Top header ──────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Properties</h1>
            <div className="flex gap-0">
              {([
                { key: "search",          label: "Search"           },
                { key: "my_properties",   label: "My Properties"    },
                { key: "saved_lists",     label: "Saved Lists"      },
                { key: "watchlist",       label: "Watchlist"        },
                { key: "recently_viewed", label: "Recently Viewed"  },
              ] as { key: PropTab; label: string }[]).map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={cn("px-4 py-2 text-sm font-semibold border-b-2 transition-colors",
                    activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-8 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-foreground hover:bg-accent transition">
              <Upload className="h-3.5 w-3.5" /> Import List
            </button>
            <button className="flex h-8 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-foreground hover:bg-accent transition">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button className="flex h-8 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 transition">
              <Search className="h-3.5 w-3.5" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-border bg-muted/20 px-6 py-3">
        <div className="flex items-center gap-6">
          {[
            { icon: Home,      label: "Properties Found", value: filtered.length.toLocaleString(), sub: "Estimated" },
            { icon: DollarSign,label: "Total Value",       value: fmt(totalValue),                  sub: "Avg $299K" },
            { icon: TrendingUp,label: "Avg. Equity",       value: `${avgEquity}%`,                  sub: "Avg $180K" },
            { icon: User,      label: "Absentee Owners",   value: filtered.filter(p => p.tags.includes("Absentee Owner")).length.toString(), sub: "93.9% of results" },
            { icon: Zap,       label: "Estimated Cost",    value: `${filtered.length} credits`,     sub: "0 Deduplication on ✓" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none text-foreground">{s.value}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{s.label}</p>
                <p className="text-[9px] text-muted-foreground/70">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Filter Sidebar */}
        <FilterSidebar />

        {/* Center: List + search bar */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* List toolbar */}
          <div className="flex-shrink-0 flex items-center justify-between border-b border-border px-4 py-2.5 bg-card">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">{filtered.length.toLocaleString()} properties found</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Sorted by:</span>
                <button className="flex items-center gap-0.5 font-semibold text-foreground hover:text-primary">
                  Highest Equity % <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  placeholder="Search address or owner..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-52 rounded-lg border border-border bg-background py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary"
                />
              </div>
              <button className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-accent"><LayoutList className="h-3.5 w-3.5" /></button>
              <button className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-accent"><Map className="h-3.5 w-3.5" /></button>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-accent">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Columns
              </button>
            </div>
          </div>

          {/* Property cards list */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map(prop => (
              <PropertyCard
                key={prop.id}
                prop={prop}
                selected={selectedProp?.id === prop.id}
                onClick={() => setSelectedProp(prop)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex-shrink-0 flex items-center justify-between border-t border-border px-4 py-3 bg-card">
            <div className="flex items-center gap-1">
              {[1,2,3,"...",65].map((p, i) => (
                <button key={i} className={cn("flex h-7 w-7 items-center justify-center rounded-lg text-xs transition",
                  p === 1 ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent"
                )}>{p}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              Rows per page:
              <select className="rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary">
                <option>20</option><option>50</option><option>100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Map (visible when no detail open, but here shown below) */}
        <div className="flex w-[420px] shrink-0 flex-col border-l border-border overflow-hidden">
          {selectedProp ? (
            <DetailPanel prop={selectedProp} onClose={() => setSelectedProp(null)} />
          ) : (
            <MapView properties={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}
