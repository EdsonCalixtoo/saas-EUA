import { useState } from "react";
import {
  Search, Filter, Plus, Building, MapPin, Phone, Mail, ExternalLink,
  CheckCircle2, Star, ShieldCheck, ChevronDown, X, Globe, User, Clock,
  Sparkles, Check, Copy, Tag, Compass
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────────
type ViewTab = "directory" | "find_by_state";

export interface TitleCompany {
  id: string;
  name: string;
  grade: "A" | "B" | "A+";
  location: string;
  states: string[];
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  turnaround?: string;
  recommendedBy: string;
  capabilities: string[];
  notes: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_TITLE_COMPANIES: TitleCompany[] = [
  {
    id: "tc-1",
    name: "Blueprint Title",
    grade: "A",
    location: "TN, multi-state · Nashville",
    states: ["TN", "FL", "GA", "TX", "NC"],
    contactPhone: "(615) 555-0192",
    contactEmail: "closings@blueprinttitle.com",
    website: "https://blueprinttitle.com",
    recommendedBy: "Wholesalers Toolbox",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
      "Transactional funding",
      "Dry / mail-away",
      "Investor desk",
    ],
    notes: "Tech-enabled, operates in many states with dedicated investor closing teams.",
  },
  {
    id: "tc-2",
    name: "CLOSED Title",
    grade: "A",
    location: "FL, TX, GA, multi-state",
    states: ["FL", "TX", "GA", "TN"],
    contactPhone: "(800) 555-9831",
    contactEmail: "investors@closedtitle.com",
    website: "https://closedtitle.com",
    turnaround: "24hr possible",
    recommendedBy: "RealEstateSkills",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
      "Transactional funding",
      "Dry / mail-away",
      "Investor desk",
    ],
    notes: "Fast/tech-forward; same- or next-day title commitments, dedicated investor desk.",
  },
  {
    id: "tc-3",
    name: "Title Clearing & Escrow, LLC",
    grade: "A",
    location: "Nationwide",
    states: ["FL", "TX", "GA", "TN", "NC", "OH", "SC", "MI", "MO"],
    contactName: "Walter DeVenne III",
    contactPhone: "(888) 555-4321",
    contactEmail: "wdevenne@titleclearing.com",
    website: "https://titleclearing.com",
    recommendedBy: "Wholesalers Toolbox",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
      "Transactional funding",
      "Dry / mail-away",
      "Investor desk",
    ],
    notes: "Nationwide wholesaler-friendly closings; assignments + double closes.",
  },
  {
    id: "tc-4",
    name: "Palmetto State Title & Escrow",
    grade: "B",
    location: "SC · Columbia",
    states: ["SC", "NC", "GA"],
    contactPhone: "(803) 555-7712",
    contactEmail: "closings@palmettotitle.com",
    website: "https://palmettotitle.com",
    recommendedBy: "Wholesalers Toolbox",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
      "Dry / mail-away",
    ],
    notes: "Specialized in South Carolina wholesale assignments and blind double closings.",
  },
  {
    id: "tc-5",
    name: "Embassy Title Agency",
    grade: "B",
    location: "MI · Livonia",
    states: ["MI", "OH", "IN"],
    contactPhone: "(734) 555-8820",
    contactEmail: "info@embassytitle.com",
    website: "https://embassytitle.com",
    recommendedBy: "Wholesalers Toolbox",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
      "Dry / mail-away",
    ],
    notes: "Experienced Midwest title team supporting creative financing & novations.",
  },
  {
    id: "tc-6",
    name: "Aureo Title",
    grade: "B",
    location: "MO, KS, IN, MI · St. Louis, Kansas City, Indianapolis, Detroit",
    states: ["MO", "KS", "IN", "MI"],
    contactPhone: "(314) 555-9000",
    contactEmail: "team@aureotitle.com",
    website: "https://aureotitle.com",
    recommendedBy: "RealEstateSkills",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
      "Transactional funding",
      "Dry / mail-away",
      "Investor desk",
    ],
    notes: "Multi-market investor closings.",
  },
  {
    id: "tc-7",
    name: "Greater Metropolitan Title Co",
    grade: "B",
    location: "OH · Toledo",
    states: ["OH", "MI"],
    contactPhone: "(419) 555-3344",
    contactEmail: "orders@metrotitle.com",
    website: "https://metrotitle.com",
    recommendedBy: "Wholesalers Toolbox",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
    ],
    notes: "Local investor-friendly closing attorney desk.",
  },
  {
    id: "tc-8",
    name: "Halperin Lyman, LLC",
    grade: "B",
    location: "GA · Atlanta",
    states: ["GA", "FL", "TN", "NC", "SC"],
    contactPhone: "(404) 555-1212",
    contactEmail: "closings@halperinlyman.com",
    website: "https://halperinlyman.com",
    recommendedBy: "Wholesalers Toolbox",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
    ],
    notes: "Premier Georgia closing attorney firm for wholesalers and flippers.",
  },
  {
    id: "tc-9",
    name: "Excel Title Group",
    grade: "B",
    location: "TX · San Antonio",
    states: ["TX"],
    contactPhone: "(210) 555-6677",
    contactEmail: "info@exceltitlegroup.com",
    website: "https://exceltitlegroup.com",
    recommendedBy: "Wholesalers Toolbox",
    capabilities: [
      "Assignments",
      "Double close",
      "Separate HUDs",
      "Holds EMD",
    ],
    notes: "Texas-wide title & escrow officer specializing in wholesale assignments.",
  },
];

const ALL_STATES = [
  "All states", "FL", "TX", "GA", "TN", "NC", "SC", "OH", "MI", "MO", "KS", "IN"
];

const ALL_CAPABILITIES = [
  "All Capabilities",
  "Assignments",
  "Double close",
  "Separate HUDs",
  "Holds EMD",
  "Transactional funding",
  "Dry / mail-away",
  "Investor desk",
];

// ── Component ─────────────────────────────────────────────────────────────────
export function TitleCompaniesPage() {
  const [activeTab, setActiveTab] = useState<ViewTab>("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All states");
  const [selectedCapability, setSelectedCapability] = useState("All Capabilities");
  const [showAddModal, setShowAddModal] = useState(false);
  const [titleCompanies, setTitleCompanies] = useState<TitleCompany[]>(MOCK_TITLE_COMPANIES);

  // Form State
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState<"A" | "B" | "A+">("A");
  const [newLocation, setNewLocation] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newRecBy, setNewRecBy] = useState("Wholesalers Toolbox");
  const [newNotes, setNewNotes] = useState("");

  const filteredCompanies = titleCompanies.filter((tc) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      tc.name.toLowerCase().includes(query) ||
      tc.location.toLowerCase().includes(query) ||
      tc.notes.toLowerCase().includes(query) ||
      (tc.contactName && tc.contactName.toLowerCase().includes(query));

    const matchesState =
      selectedState === "All states" ||
      tc.location.includes(selectedState) ||
      tc.states.includes(selectedState) ||
      tc.location.includes("Nationwide");

    const matchesCap =
      selectedCapability === "All Capabilities" ||
      tc.capabilities.includes(selectedCapability);

    return matchesQuery && matchesState && matchesCap;
  });

  const handleAddTitleCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation) return;

    const created: TitleCompany = {
      id: `tc-${Date.now()}`,
      name: newName,
      grade: newGrade,
      location: newLocation,
      states: [newLocation.substring(0, 2).toUpperCase()],
      contactName: newContactName || undefined,
      contactPhone: newContactPhone || "(555) 000-1234",
      contactEmail: newContactEmail || "contact@titleco.com",
      website: newWebsite || "https://titleco.com",
      recommendedBy: newRecBy || "Investor Network",
      capabilities: [
        "Assignments",
        "Double close",
        "Separate HUDs",
        "Holds EMD",
        "Investor desk",
      ],
      notes: newNotes || "Investor-friendly title office submitted by user.",
    };

    setTitleCompanies([created, ...titleCompanies]);
    setShowAddModal(false);

    setNewName("");
    setNewLocation("");
    setNewContactName("");
    setNewContactPhone("");
    setNewContactEmail("");
    setNewWebsite("");
    setNewNotes("");
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      
      {/* ── Top Bar Header ────────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Title Company Directory
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Wholesaler-friendly title companies, closing attorneys & escrow desks across all 50 states.
              </p>
            </div>
          </div>

          {/* Sub-Nav View Tabs (Directory vs Find by State) */}
          <div className="flex items-center gap-1 rounded-xl bg-muted/60 p-1 border border-border">
            <button
              onClick={() => setActiveTab("directory")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all",
                activeTab === "directory"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
            >
              <Building className="h-3.5 w-3.5" /> Directory
            </button>
            <button
              onClick={() => setActiveTab("find_by_state")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all",
                activeTab === "find_by_state"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
            >
              <Compass className="h-3.5 w-3.5" /> Find by State
            </button>
          </div>
        </div>
      </div>

      {/* ── Search & Filters Header Bar ───────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-border bg-card/50 px-6 py-3.5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search company, contact, state, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary"
              />
            </div>

            {/* State Filter Dropdown */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary"
            >
              {ALL_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* Capabilities Filter Dropdown */}
            <select
              value={selectedCapability}
              onChange={(e) => setSelectedCapability(e.target.value)}
              className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary"
            >
              {ALL_CAPABILITIES.map((cap) => (
                <option key={cap} value={cap}>
                  {cap}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm shrink-0"
          >
            <Plus className="h-4 w-4" /> + Add Title Co
          </button>
        </div>
      </div>

      {/* ── Main Body Content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
        
        {/* VIEW: DIRECTORY GRID */}
        {activeTab === "directory" && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((tc) => (
              <div
                key={tc.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  {/* Card Title & Grade */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition">
                      {tc.name}
                    </h3>
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs",
                        tc.grade === "A" || tc.grade === "A+"
                          ? "bg-emerald-500"
                          : "bg-blue-600"
                      )}
                    >
                      {tc.grade}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-xs text-muted-foreground mb-2 font-medium">
                    {tc.location}
                  </p>

                  {/* Optional Contact or Turnaround info */}
                  {tc.contactName && (
                    <p className="text-xs font-semibold text-foreground mb-1">
                      <span className="text-muted-foreground font-normal">Contact: </span>
                      {tc.contactName}
                    </p>
                  )}
                  {tc.turnaround && (
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                      <span className="text-muted-foreground font-normal">Turnaround: </span>
                      {tc.turnaround}
                    </p>
                  )}

                  {/* Recommended By Badge */}
                  <div className="mb-3">
                    <span className="text-xs text-muted-foreground">Rec by: </span>
                    <span className="text-xs font-semibold text-foreground">
                      {tc.recommendedBy}
                    </span>
                  </div>

                  {/* Capabilities Badges Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tc.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold text-primary"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  {/* Notes */}
                  {tc.notes && (
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {tc.notes}
                    </p>
                  )}
                </div>

                {/* Bottom Card Actions: Call, Email, Site */}
                <div className="pt-4 border-t border-border/60 grid grid-cols-3 gap-2">
                  <a
                    href={tc.contactPhone ? `tel:${tc.contactPhone}` : "#"}
                    className="flex items-center justify-center rounded-xl border border-border bg-background py-2 text-xs font-bold text-foreground hover:bg-accent hover:border-primary/40 transition"
                  >
                    Call
                  </a>
                  <a
                    href={tc.contactEmail ? `mailto:${tc.contactEmail}` : "#"}
                    className="flex items-center justify-center rounded-xl border border-border bg-background py-2 text-xs font-bold text-foreground hover:bg-accent hover:border-primary/40 transition"
                  >
                    Email
                  </a>
                  <a
                    href={tc.website || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-xl border border-border bg-background py-2 text-xs font-bold text-foreground hover:bg-accent hover:border-primary/40 transition"
                  >
                    Site
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: FIND BY STATE */}
        {activeTab === "find_by_state" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-foreground">Select State</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Click any US state below to isolate investor-friendly title companies and closing attorneys.
              </p>
            </div>

            {/* State Grid Pills */}
            <div className="flex flex-wrap gap-2">
              {ALL_STATES.filter((st) => st !== "All states").map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setSelectedState(st);
                    setActiveTab("directory");
                  }}
                  className="flex h-12 w-20 flex-col items-center justify-center rounded-xl border border-border bg-card text-sm font-bold text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary transition shadow-xs"
                >
                  <span>{st}</span>
                  <span className="text-[9px] font-normal text-muted-foreground">
                    {titleCompanies.filter(
                      (tc) =>
                        tc.states.includes(st) ||
                        tc.location.includes("Nationwide")
                    ).length}{" "}
                    Co.
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Add Title Company Modal / Drawer ────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex h-full w-full max-w-md flex-col bg-card border-l border-border shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                Add Investor Title Co
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleAddTitleCompany} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div>
                <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nationwide Title & Escrow"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                    Grade Rating
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary font-bold"
                  >
                    <option value="A">Grade A</option>
                    <option value="A+">Grade A+</option>
                    <option value="B">Grade B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                    Location / States
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. FL, TX, GA"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                  Contact Escrow Officer
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="(555) 123-4567"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="closings@titleco.com"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  placeholder="https://titleco.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">
                  Notes / Wholesaler Features
                </label>
                <textarea
                  placeholder="e.g. Dedicated investor desk, handles double closings & earnest money holds."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary resize-none"
                  rows={3}
                />
              </div>

              <div className="pt-4 border-t border-border flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-border py-2.5 text-xs font-bold text-foreground hover:bg-accent transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary py-2.5 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm"
                >
                  Save Title Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
