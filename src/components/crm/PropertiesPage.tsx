import { useState } from "react";
import {
  Search, Filter, Plus, Home, MapPin, Building2, User,
  DollarSign, TrendingUp, ChevronRight, X, Phone, Mail, CheckCircle2,
  AlertCircle, ShieldCheck, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

type PropertyStatus = "New Lead" | "Skip Traced" | "Contacted" | "Dead";

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  ownerName: string;
  estValue: number;
  equityPct: number;
  loanBalance: number;
  status: PropertyStatus;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  lot: number;
  yearBuilt: number;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1", address: "123 Palm Tree Ln", city: "Clearwater", state: "FL", zip: "33755",
    ownerName: "John Smith", estValue: 350000, equityPct: 85, loanBalance: 52500,
    status: "New Lead", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    beds: 3, baths: 2, sqft: 1800, lot: 0.25, yearBuilt: 1985
  },
  {
    id: "p2", address: "456 Ocean View Dr", city: "Naples", state: "FL", zip: "34102",
    ownerName: "Sarah Connor", estValue: 850000, equityPct: 40, loanBalance: 510000,
    status: "Skip Traced", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    beds: 4, baths: 3.5, sqft: 3200, lot: 0.4, yearBuilt: 2005
  },
  {
    id: "p3", address: "789 Gulf Stream Way", city: "Tampa", state: "FL", zip: "33601",
    ownerName: "Michael Scott", estValue: 275000, equityPct: 100, loanBalance: 0,
    status: "New Lead", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
    beds: 3, baths: 2, sqft: 1500, lot: 0.15, yearBuilt: 1970
  },
  {
    id: "p4", address: "321 Bayside Blvd", city: "Sarasota", state: "FL", zip: "34242",
    ownerName: "Elena Rodriguez", estValue: 520000, equityPct: 65, loanBalance: 182000,
    status: "Contacted", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
    beds: 4, baths: 2.5, sqft: 2400, lot: 0.3, yearBuilt: 1998
  },
  {
    id: "p5", address: "555 Sunset Strip", city: "Miami", state: "FL", zip: "33101",
    ownerName: "David Wallace", estValue: 1250000, equityPct: 20, loanBalance: 1000000,
    status: "Dead", image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=600&q=80",
    beds: 5, baths: 4, sqft: 4500, lot: 0.5, yearBuilt: 2015
  },
  {
    id: "p6", address: "888 Harbor Dr", city: "St. Pete", state: "FL", zip: "33701",
    ownerName: "Jim Halpert", estValue: 420000, equityPct: 90, loanBalance: 42000,
    status: "New Lead", image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=600&q=80",
    beds: 3, baths: 2, sqft: 2100, lot: 0.2, yearBuilt: 1988
  }
];

const STATUS_COLORS: Record<PropertyStatus, string> = {
  "New Lead": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Skip Traced": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Contacted": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Dead": "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
};

export function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [selectedProp, setSelectedProp] = useState<Property | null>(null);
  
  // Skip Trace Simulation State
  const [isTracing, setIsTracing] = useState(false);
  const [traceResult, setTraceResult] = useState<any>(null);

  const filtered = MOCK_PROPERTIES.filter(p => 
    p.address.toLowerCase().includes(search.toLowerCase()) ||
    p.ownerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSkipTrace = () => {
    setIsTracing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsTracing(false);
      setTraceResult({
        phones: ["(555) 123-4567 (Mobile)", "(555) 987-6543 (Landline)"],
        emails: ["owner@example.com", "alt.owner@gmail.com"],
        age: "45-50",
        mailingAddress: "Different from property (P.O. Box 123, Clearwater FL)",
        score: "High Intent",
      });
    }, 2000);
  };

  const closePanel = () => {
    setSelectedProp(null);
    setTraceResult(null);
    setIsTracing(false);
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-muted/20">
      
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Properties</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage and skip trace your real estate leads.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search address or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button className="flex h-9 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground hover:bg-accent transition">
              <Filter className="h-4 w-4" /> Filters
            </button>
            <button className="flex h-9 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm">
              <Plus className="h-4 w-4" /> Add Property
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content (Grid) ──────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(prop => (
            <div 
              key={prop.id} 
              onClick={() => setSelectedProp(prop)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
            >
              {/* Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                <img src={prop.image} alt={prop.address} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-background/90", STATUS_COLORS[prop.status])}>
                    {prop.status}
                  </span>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-bold text-sm truncate">{prop.address}</p>
                  <p className="text-xs text-white/80">{prop.city}, {prop.state} {prop.zip}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {prop.ownerName}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="rounded-xl bg-muted/50 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Est. Value</p>
                    <p className="text-sm font-bold text-foreground">${prop.estValue.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Equity</p>
                    <p className="text-sm font-bold text-emerald-600">{prop.equityPct}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {prop.beds}b / {prop.baths}ba</span>
                  <span>•</span>
                  <span>{prop.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skip Trace Side Panel (Sheet) ──────────────────────────────── */}
      {selectedProp && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={closePanel} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300 sm:w-[480px]">
            
            {/* Panel Header Image */}
            <div className="relative h-64 w-full shrink-0">
              <img src={selectedProp.image} alt={selectedProp.address} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
              
              <button onClick={closePanel} className="absolute top-4 right-4 rounded-full bg-black/20 p-2 text-white backdrop-blur-md transition hover:bg-black/40">
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6">
                <span className={cn("mb-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-background/90", STATUS_COLORS[selectedProp.status])}>
                  {selectedProp.status}
                </span>
                <h2 className="text-2xl font-bold text-white drop-shadow-md">{selectedProp.address}</h2>
                <p className="text-sm text-white/80">{selectedProp.city}, {selectedProp.state} {selectedProp.zip}</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* Skip Trace Action Area */}
              <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-5">
                {!traceResult ? (
                  <div className="text-center">
                    <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-primary opacity-80" />
                    <h3 className="text-lg font-bold text-foreground">Skip Trace Owner</h3>
                    <p className="mb-4 mt-1 text-sm text-muted-foreground">Find phone numbers, emails, and demographic data for {selectedProp.ownerName}.</p>
                    
                    <button 
                      onClick={handleSkipTrace}
                      disabled={isTracing}
                      className="group relative w-full overflow-hidden rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isTracing ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Searching Public Records...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Zap className="h-4 w-4" /> Run Skip Trace (1 Credit)
                        </span>
                      )}
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </button>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="mb-4 flex items-center gap-2 border-b border-primary/20 pb-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <h3 className="font-bold text-foreground">Skip Trace Successful</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Phone Numbers</p>
                        {traceResult.phones.map((phone: string, i: number) => (
                          <div key={i} className="flex items-center justify-between py-1">
                            <span className="text-sm font-medium text-foreground">{phone}</span>
                            <div className="flex gap-1">
                              <button className="rounded bg-accent p-1.5 text-muted-foreground hover:text-primary"><Phone className="h-3.5 w-3.5" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Email Addresses</p>
                        {traceResult.emails.map((email: string, i: number) => (
                          <div key={i} className="flex items-center justify-between py-1">
                            <span className="text-sm font-medium text-foreground">{email}</span>
                            <div className="flex gap-1">
                              <button className="rounded bg-accent p-1.5 text-muted-foreground hover:text-primary"><Mail className="h-3.5 w-3.5" /></button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="rounded-lg bg-background p-3 border border-border">
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">Age</p>
                          <p className="text-sm font-bold text-foreground">{traceResult.age}</p>
                        </div>
                        <div className="rounded-lg bg-background p-3 border border-border">
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">Match Score</p>
                          <p className="text-sm font-bold text-emerald-600">{traceResult.score}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-background p-3 border border-border">
                         <p className="text-[10px] uppercase text-muted-foreground font-semibold">Mailing Address</p>
                         <p className="text-sm font-medium text-foreground">{traceResult.mailingAddress}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Property Details Grid */}
              <div>
                <h3 className="mb-3 text-sm font-bold text-foreground">Property Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-xs font-medium text-muted-foreground">Estimated Value</p>
                    <p className="text-lg font-bold text-foreground">${selectedProp.estValue.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-xs font-medium text-muted-foreground">Equity</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-lg font-bold text-emerald-600">{selectedProp.equityPct}%</p>
                      <p className="text-xs text-muted-foreground">(${((selectedProp.equityPct/100)*selectedProp.estValue).toLocaleString()})</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-xs font-medium text-muted-foreground">Loan Balance</p>
                    <p className="text-lg font-bold text-foreground">${selectedProp.loanBalance.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-xs font-medium text-muted-foreground">Specs</p>
                    <p className="text-sm font-bold text-foreground">{selectedProp.beds} Bed / {selectedProp.baths} Bath</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedProp.sqft.toLocaleString()} sqft</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
}
