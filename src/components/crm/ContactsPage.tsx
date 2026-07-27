import { useState, useMemo } from "react";
import {
  Search, Plus, Filter, Download, Upload, X, Check, ChevronDown,
  Building2, User, Users, Tag, CheckSquare, ArrowUpDown, Trash2,
  Pencil, Phone, Mail, Clock, Home, AlertCircle, Briefcase, MapPin,
  Star, StarOff, MoreHorizontal, Globe, RefreshCw, ChevronLeft,
  ChevronRight, SlidersHorizontal, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type ContactType = "seller" | "buyer" | "agent" | "title" | "lender" | "other";
type ContactStatus = "hot" | "warm" | "cold" | "dnc" | "closed";
type ActiveTab = "smartlists" | "bulkactions" | "customfields" | "tasks" | "companies";

interface Contact {
  id: number;
  name: string;
  type: ContactType;
  status: ContactStatus;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  businessName?: string;
  tags: string[];
  starred: boolean;
  lastActivity: string;
  createdAt: string;
  deals: number;
  value: string;
  notes: string;
  initials: string;
  avatarColor: string;
  source: string;
}

interface Company {
  id: number;
  name: string;
  type: string;
  contacts: number;
  deals: number;
  value: string;
  phone: string;
  website: string;
  city: string;
  state: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CONTACTS: Contact[] = [
  { id: 1,  name: "John Smith",        type: "seller", status: "hot",    phone: "(813) 555-2234", email: "john.smith@gmail.com",     address: "123 Main St",     city: "Tampa",       state: "FL", businessName: "",                    tags: ["Motivated", "Probate"],       starred: true,  lastActivity: "2 minutes ago", createdAt: "Jul 27, 2026", deals: 1, value: "$28,500", notes: "Owner is 72 and motivated. Roof needs full replacement.", initials: "JS", avatarColor: "oklch(0.55 0.22 265)", source: "DealMachine" },
  { id: 2,  name: "Emily Brown",       type: "seller", status: "warm",   phone: "(321) 555-3456", email: "emily.brown@gmail.com",     address: "321 Elm St",      city: "Kissimmee",   state: "FL", businessName: "Brown Properties LLC", tags: ["Inherited"],                  starred: false, lastActivity: "4 hours ago",   createdAt: "Jul 27, 2026", deals: 0, value: "$0",      notes: "Inherited property. Would accept around $95k.",          initials: "EB", avatarColor: "oklch(0.68 0.19 155)", source: "DealMachine" },
  { id: 3,  name: "David Wilson",      type: "buyer",  status: "hot",    phone: "(407) 555-1357", email: "david.wilson@yahoo.com",    address: "369 Lake Dr",     city: "Lakeland",    state: "FL", businessName: "Wilson Investments",   tags: ["Cash Buyer", "Repeat"],       starred: true,  lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 4, value: "$248k",   notes: "Active cash buyer. Can close in 7 days.",                initials: "DW", avatarColor: "oklch(0.72 0.17 30)",  source: "Referral" },
  { id: 4,  name: "Sarah Martinez",    type: "agent",  status: "warm",   phone: "(813) 555-4680", email: "sarah.m@realty.com",        address: "813 Bay Blvd",    city: "Tampa",       state: "FL", businessName: "Bay Area Realty",      tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 2, value: "$62k",    notes: "Sends 2-3 distressed leads/mo. Works foreclosures.",     initials: "SM", avatarColor: "oklch(0.66 0.19 275)", source: "Networking" },
  { id: 5,  name: "Robert Anderson",   type: "seller", status: "cold",   phone: "(727) 555-7890", email: "r.anderson@outlook.com",    address: "555 Pine Ave",    city: "St. Pete",    state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "No response after 3 attempts.",                          initials: "RA", avatarColor: "oklch(0.60 0.15 210)", source: "DealMachine" },
  { id: 6,  name: "Mike Torres",       type: "seller", status: "dnc",    phone: "(407) 555-6678", email: "mike.torres@gmail.com",     address: "466 Oak Ave",     city: "Orlando",     state: "FL", businessName: "",                    tags: ["DNC"],                        starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "Requested no contact.",                                  initials: "MT", avatarColor: "oklch(0.55 0.20 15)",  source: "DealMachine" },
  { id: 7,  name: "Linda Chen",        type: "lender", status: "warm",   phone: "(813) 555-1122", email: "linda.chen@firstcapital.com",address: "1200 Corporate Dr",city: "Tampa",      state: "FL", businessName: "First Capital Lending",tags: ["lawton"],                     starred: true,  lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 6, value: "$415k",   notes: "Lends at 10% interest. 70% LTV max.",                    initials: "LC", avatarColor: "oklch(0.65 0.20 170)", source: "Networking" },
  { id: 8,  name: "James White",       type: "title",  status: "closed", phone: "(407) 555-5533", email: "james.white@preferredtitle.com",address:"789 Congress Ave",city: "Orlando",  state: "FL", businessName: "Preferred Title",      tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals:11, value: "$820k",   notes: "Go-to title company for central FL.",                    initials: "JW", avatarColor: "oklch(0.58 0.15 240)", source: "Referral" },
  { id: 9,  name: "Garen Tranium",     type: "seller", status: "warm",   phone: "(580) 204-7633", email: "garen.t@gmail.com",         address: "100 Oak Blvd",    city: "Tampa",       state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "GT", avatarColor: "oklch(0.62 0.18 60)",  source: "DealMachine" },
  { id: 10, name: "Randy Sailor",      type: "seller", status: "cold",   phone: "(580) 351-7657", email: "",                          address: "222 River Rd",    city: "St. Pete",    state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "RS", avatarColor: "oklch(0.58 0.17 200)", source: "DealMachine" },
  { id: 11, name: "Tommie Weeks",      type: "seller", status: "cold",   phone: "(580) 917-0738", email: "",                          address: "77 Maple Ave",    city: "Brandon",     state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "TW", avatarColor: "oklch(0.67 0.15 145)", source: "DealMachine" },
  { id: 12, name: "Justin Scaffinger", type: "seller", status: "cold",   phone: "(580) 355-4177", email: "",                          address: "33 Harbor Blvd",  city: "Clearwater",  state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "JS", avatarColor: "oklch(0.70 0.18 310)", source: "DealMachine" },
  { id: 13, name: "Brandon Richard",   type: "seller", status: "warm",   phone: "(580) 704-8477", email: "",                          address: "15 Palm Dr",      city: "Lakeland",    state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "BR", avatarColor: "oklch(0.63 0.21 35)",  source: "DealMachine" },
  { id: 14, name: "Aaron Winkelman",   type: "seller", status: "cold",   phone: "(580) 647-7516", email: "",                          address: "890 Sunset Blvd", city: "Orlando",     state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "AW", avatarColor: "oklch(0.56 0.19 255)", source: "DealMachine" },
  { id: 15, name: "Joseph Brennan",    type: "seller", status: "warm",   phone: "(580) 678-9574", email: "j.brennan@hotmail.com",     address: "601 Elm Ct",      city: "Kissimmee",   state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "JB", avatarColor: "oklch(0.65 0.22 90)",  source: "DealMachine" },
  { id: 16, name: "Luis Navas",        type: "seller", status: "cold",   phone: "(580) 483-3173", email: "",                          address: "120 Cove Ln",     city: "Tampa",       state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "LN", avatarColor: "oklch(0.60 0.16 180)", source: "DealMachine" },
  { id: 17, name: "Robert Meade",      type: "seller", status: "warm",   phone: "(805) 923-3144", email: "",                          address: "44 Oak Park Rd",  city: "Sarasota",    state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "RM", avatarColor: "oklch(0.68 0.20 50)",  source: "DealMachine" },
  { id: 18, name: "Frankie Simmons",   type: "seller", status: "cold",   phone: "(805) 487-7159", email: "",                          address: "8 Birch Ct",      city: "Ocala",       state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "FS", avatarColor: "oklch(0.61 0.17 340)", source: "DealMachine" },
  { id: 19, name: "James Mcnult",      type: "seller", status: "cold",   phone: "(580) 585-0307", email: "",                          address: "5 Sand Key Way",  city: "St. Pete",    state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "JM", avatarColor: "oklch(0.64 0.14 215)", source: "DealMachine" },
  { id: 20, name: "Sue Hodge",         type: "seller", status: "warm",   phone: "(580) 591-3312", email: "",                          address: "303 Cypress Dr",  city: "Gainesville", state: "FL", businessName: "",                    tags: ["lawton"],                     starred: false, lastActivity: "2 days ago",    createdAt: "Jul 24, 2026", deals: 0, value: "$0",      notes: "",                                                       initials: "SH", avatarColor: "oklch(0.66 0.21 270)", source: "DealMachine" },
];

const MOCK_COMPANIES: Company[] = [
  { id: 1, name: "Bay Area Realty",       type: "Real Estate Agency", contacts: 3, deals: 5,  value: "$284,000", phone: "(813) 555-9900", website: "bayarearealty.com",     city: "Tampa",   state: "FL" },
  { id: 2, name: "First Capital Lending", type: "Hard Money Lender",  contacts: 2, deals: 6,  value: "$415,000", phone: "(813) 555-1100", website: "firstcapitallending.com",city: "Tampa",   state: "FL" },
  { id: 3, name: "Preferred Title",       type: "Title Company",      contacts: 2, deals: 11, value: "$820,500", phone: "(407) 555-5500", website: "preferredtitle.com",    city: "Orlando", state: "FL" },
  { id: 4, name: "Brown Properties LLC",  type: "Property Owner",     contacts: 1, deals: 0,  value: "$0",       phone: "(321) 555-3456", website: "—",                     city: "Kissimmee",state:"FL" },
];

const STATUS_CONFIG: Record<ContactStatus, { label: string; dot: string; text: string }> = {
  hot:    { label: "Hot",    dot: "bg-red-500",    text: "text-red-600"    },
  warm:   { label: "Warm",   dot: "bg-amber-400",  text: "text-amber-600"  },
  cold:   { label: "Cold",   dot: "bg-slate-400",  text: "text-slate-500"  },
  dnc:    { label: "DNC",    dot: "bg-gray-400",   text: "text-gray-500"   },
  closed: { label: "Closed", dot: "bg-green-500",  text: "text-green-600"  },
};

const TYPE_COLORS: Record<ContactType, string> = {
  seller:  "bg-blue-100 text-blue-700",
  buyer:   "bg-purple-100 text-purple-700",
  agent:   "bg-indigo-100 text-indigo-700",
  title:   "bg-teal-100 text-teal-700",
  lender:  "bg-orange-100 text-orange-700",
  other:   "bg-gray-100 text-gray-600",
};

const CUSTOM_FIELDS = [
  { id: 1,  name: "Property ARV",       type: "Currency",     section: "Property", required: false },
  { id: 2,  name: "Asking Price",       type: "Currency",     section: "Property", required: false },
  { id: 3,  name: "Repair Estimate",    type: "Currency",     section: "Property", required: false },
  { id: 4,  name: "Lead Source",        type: "Dropdown",     section: "Lead",     required: true  },
  { id: 5,  name: "Motivation Level",   type: "Rating (1-10)",section: "Lead",     required: false },
  { id: 6,  name: "Occupancy Status",   type: "Dropdown",     section: "Property", required: false },
  { id: 7,  name: "Year Built",         type: "Number",       section: "Property", required: false },
  { id: 8,  name: "Sq Footage",         type: "Number",       section: "Property", required: false },
  { id: 9,  name: "Bedrooms",           type: "Number",       section: "Property", required: false },
  { id: 10, name: "Bathrooms",          type: "Number",       section: "Property", required: false },
];

const PAGE_SIZE = 20;

// ─── Main Component ───────────────────────────────────────────────────────────
export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [activeTab, setActiveTab] = useState<ActiveTab>("smartlists");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [detailContact, setDetailContact] = useState<Contact | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Contact | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // New contact form
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<ContactType>("seller");
  const [newStatus, setNewStatus] = useState<ContactStatus>("warm");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newBusiness, setNewBusiness] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 3000); };

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setContacts(prev => prev.map(c => c.id === id ? { ...c, starred: !c.starred } : c));
  };

  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    if (detailContact?.id === id) setDetailContact(null);
    showToast("Contact deleted");
  };

  const toggleSelect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const selectAll = () => {
    if (selectedIds.size === pageContacts.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(pageContacts.map(c => c.id)));
  };

  const handleSort = (field: keyof Contact) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const handleAddContact = () => {
    if (!newName.trim()) return;
    const initials = newName.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const colors = ["oklch(0.55 0.22 265)", "oklch(0.68 0.19 155)", "oklch(0.72 0.17 30)", "oklch(0.66 0.19 275)"];
    const created: Contact = {
      id: Date.now(), name: newName.trim(), type: newType, status: newStatus,
      phone: newPhone, email: newEmail, address: newAddress, city: newCity, state: "FL",
      businessName: newBusiness,
      tags: [], starred: false, lastActivity: "Just now",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      deals: 0, value: "$0", notes: newNotes,
      initials, avatarColor: colors[Math.floor(Math.random() * colors.length)],
      source: "Manual Entry",
    };
    setContacts(prev => [created, ...prev]);
    setShowAddModal(false);
    [setNewName, setNewPhone, setNewEmail, setNewAddress, setNewCity, setNewBusiness, setNewNotes].forEach(fn => fn(""));
    showToast("Contact added successfully!");
  };

  const filtered = useMemo(() => {
    let list = contacts;
    if (search)                list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "all") list = list.filter(c => c.status === statusFilter);
    if (typeFilter   !== "all") list = list.filter(c => c.type === typeFilter);
    if (sortField) {
      list = [...list].sort((a, b) => {
        const av = String(a[sortField] ?? "").toLowerCase();
        const bv = String(b[sortField] ?? "").toLowerCase();
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return list;
  }, [contacts, search, statusFilter, typeFilter, sortField, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageContacts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "smartlists",  label: "Smart Lists"   },
    { key: "bulkactions", label: "Bulk Actions"   },
    { key: "customfields",label: "Custom Fields"  },
    { key: "tasks",       label: "Tasks"          },
    { key: "companies",   label: "Companies"      },
  ];

  const SortIcon = ({ field }: { field: keyof Contact }) => (
    <ArrowUpDown
      className={cn("ml-1 h-3 w-3 inline shrink-0 transition-opacity", sortField === field ? "opacity-100 text-primary" : "opacity-30")}
    />
  );

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-background">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-card px-5 py-3 flex-shrink-0">
        {/* DealMachine sync badge + title row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">Contacts</h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {filtered.length.toLocaleString()} Contacts
            </span>
            {/* DealMachine sync indicator */}
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <Zap className="h-3 w-3 text-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-700">DealMachine Sync</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => showToast("Syncing from DealMachine API...")} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync Now
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent transition-colors">
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 shadow-sm transition">
              <Plus className="h-4 w-4" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center border-b border-transparent -mb-3">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-2 text-xs font-semibold transition-colors relative whitespace-nowrap",
                activeTab === tab.key
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">

        {/* SMART LISTS — Contacts Table */}
        {activeTab === "smartlists" && (
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border bg-card px-5 py-2 flex-shrink-0 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Filter chips */}
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent transition-colors">
                  <Filter className="h-3.5 w-3.5" /> Filters
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent transition-colors">
                  <ArrowUpDown className="h-3.5 w-3.5" /> Sort
                </button>
                <div className="h-5 w-px bg-border" />
                <select
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="h-8 rounded-lg border border-border bg-background px-2 text-xs outline-none focus:border-primary"
                >
                  <option value="all">All Status</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                  <option value="dnc">DNC</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                  className="h-8 rounded-lg border border-border bg-background px-2 text-xs outline-none focus:border-primary"
                >
                  <option value="all">All Types</option>
                  <option value="seller">Sellers</option>
                  <option value="buyer">Buyers</option>
                  <option value="agent">Agents</option>
                  <option value="lender">Lenders</option>
                  <option value="title">Title</option>
                </select>

                {selectedIds.size > 0 && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1.5">
                    <span className="text-xs font-bold text-primary">{selectedIds.size} selected</span>
                    <button onClick={() => setSelectedIds(new Set())} className="text-primary hover:text-primary/70">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                    placeholder="Search Contacts"
                    className="h-8 w-48 rounded-lg border border-border bg-background pl-8 pr-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <button onClick={() => showToast("Manage Fields")} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent transition-colors">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Manage fields
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-xs border-collapse min-w-[900px]">
                <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
                  <tr className="border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {/* Checkbox col */}
                    <th className="w-10 px-3 py-3 text-left">
                      <button
                        onClick={selectAll}
                        className={cn("flex h-4 w-4 items-center justify-center rounded border transition text-transparent", selectedIds.size > 0 && selectedIds.size === pageContacts.length ? "bg-primary border-primary text-white" : "border-border bg-background hover:border-primary")}
                      >
                        <Check className="h-3 w-3 stroke-[3]" />
                      </button>
                    </th>
                    <th className="px-3 py-3 text-left w-56 cursor-pointer hover:text-foreground select-none" onClick={() => handleSort("name")}>
                      Contact name <SortIcon field="name" />
                    </th>
                    <th className="px-3 py-3 text-left w-36 cursor-pointer hover:text-foreground select-none" onClick={() => handleSort("phone")}>
                      Phone <SortIcon field="phone" />
                    </th>
                    <th className="px-3 py-3 text-left w-44 cursor-pointer hover:text-foreground select-none" onClick={() => handleSort("email")}>
                      Email <SortIcon field="email" />
                    </th>
                    <th className="px-3 py-3 text-left flex-1 cursor-pointer hover:text-foreground select-none" onClick={() => handleSort("businessName")}>
                      Business name <SortIcon field="businessName" />
                    </th>
                    <th className="px-3 py-3 text-left w-36 cursor-pointer hover:text-foreground select-none" onClick={() => handleSort("createdAt")}>
                      Created <SortIcon field="createdAt" />
                    </th>
                    <th className="px-3 py-3 text-left w-36 cursor-pointer hover:text-foreground select-none" onClick={() => handleSort("lastActivity")}>
                      Last activity <SortIcon field="lastActivity" />
                    </th>
                    <th className="px-3 py-3 text-left w-32">Tags</th>
                    <th className="px-3 py-3 text-center w-14">·</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {pageContacts.map(contact => (
                    <tr
                      key={contact.id}
                      onClick={() => setDetailContact(detailContact?.id === contact.id ? null : contact)}
                      className={cn(
                        "group cursor-pointer transition-colors hover:bg-accent/30",
                        selectedIds.has(contact.id) && "bg-primary/5",
                        detailContact?.id === contact.id && "bg-primary/5 ring-1 ring-inset ring-primary/20",
                        contact.status === "dnc" && "opacity-60",
                      )}
                    >
                      {/* Checkbox */}
                      <td className="px-3 py-2.5" onClick={e => toggleSelect(contact.id, e)}>
                        <div className={cn("flex h-4 w-4 items-center justify-center rounded border transition text-transparent", selectedIds.has(contact.id) ? "bg-primary border-primary text-white" : "border-border bg-background group-hover:border-primary/50")}>
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      </td>

                      {/* Name + avatar */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: contact.avatarColor }}>
                            {contact.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-foreground truncate max-w-[130px]">{contact.name}</span>
                              {contact.starred && <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400 shrink-0" />}
                              <span className={cn("hidden group-hover:inline-flex items-center gap-1 rounded-md px-1 py-0 text-[9px] font-bold", STATUS_CONFIG[contact.status].text)}>
                                <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[contact.status].dot)} />
                                {STATUS_CONFIG[contact.status].label}
                              </span>
                            </div>
                            <span className={cn("text-[10px] rounded-md px-1 py-0", TYPE_COLORS[contact.type])}>{contact.type}</span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-3 py-2.5">
                        {contact.phone ? (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3 shrink-0" />
                            <span>{contact.phone}</span>
                          </div>
                        ) : <span className="text-muted-foreground/40">—</span>}
                      </td>

                      {/* Email */}
                      <td className="px-3 py-2.5">
                        {contact.email ? (
                          <span className="text-muted-foreground truncate max-w-[160px] block">{contact.email}</span>
                        ) : <span className="text-muted-foreground/40">—</span>}
                      </td>

                      {/* Business */}
                      <td className="px-3 py-2.5">
                        {contact.businessName ? (
                          <span className="text-muted-foreground truncate max-w-[160px] block">{contact.businessName}</span>
                        ) : <span className="text-muted-foreground/40">—</span>}
                      </td>

                      {/* Created */}
                      <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">{contact.createdAt}</td>

                      {/* Last Activity */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
                          <Clock className="h-3 w-3 shrink-0" />
                          <span>{contact.lastActivity}</span>
                        </div>
                      </td>

                      {/* Tags */}
                      <td className="px-3 py-2.5">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map(tag => (
                            <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">{tag}</span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={e => toggleStar(contact.id, e)} className="rounded p-1 hover:bg-accent text-muted-foreground hover:text-amber-500">
                            {contact.starred ? <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> : <Star className="h-3.5 w-3.5" />}
                          </button>
                          <button onClick={() => deleteContact(contact.id)} className="rounded p-1 hover:bg-red-50 text-muted-foreground hover:text-red-500">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {pageContacts.length === 0 && (
                <div className="py-20 text-center text-sm text-muted-foreground">No contacts found matching your criteria.</div>
              )}
            </div>

            {/* ── Pagination Footer ──────────────────────────────────── */}
            <div className="flex items-center justify-between border-t border-border bg-card px-5 py-2.5 flex-shrink-0">
              <span className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages} &nbsp;·&nbsp; {filtered.length.toLocaleString()} total contacts
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-xs font-semibold hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed border-r border-border"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>

                  {/* Page number pills */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "px-3 py-1.5 text-xs font-semibold border-r border-border last:border-r-0 transition-colors",
                          page === currentPage ? "bg-primary text-white" : "hover:bg-accent text-muted-foreground",
                        )}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-xs font-semibold hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed border-l border-border"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="text-xs text-muted-foreground">Next</span>
              </div>
            </div>
          </div>
        )}

        {/* BULK ACTIONS TAB */}
        {activeTab === "bulkactions" && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-bold text-foreground mb-1">Bulk Actions</h2>
              <p className="text-xs text-muted-foreground mb-4">Select contacts from the list and apply mass actions instantly.</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Tag,          label: "Add Tag",              desc: "Tag all selected contacts with a custom label.",      color: "text-primary" },
                  { icon: Mail,         label: "Send Email Campaign",   desc: "Enroll contacts in an email drip sequence.",          color: "text-indigo-600" },
                  { icon: Phone,        label: "Send SMS Blast",        desc: "Send a one-time SMS to all selected contacts.",       color: "text-blue-600" },
                  { icon: Users,        label: "Assign to Agent",       desc: "Reassign contacts to a different team member.",       color: "text-purple-600" },
                  { icon: Download,     label: "Export Selected",       desc: "Download contact data as a .CSV file.",               color: "text-green-600" },
                  { icon: Trash2,       label: "Delete Selected",       desc: "Permanently delete all selected contacts.",           color: "text-red-600" },
                  { icon: AlertCircle,  label: "Mark as DNC",           desc: "Add selected contacts to the Do Not Contact list.",   color: "text-gray-600" },
                  { icon: CheckSquare,  label: "Create Tasks for All",  desc: "Bulk-create a task reminder for each contact.",       color: "text-amber-600" },
                ].map(action => (
                  <button key={action.label} onClick={() => showToast(`${action.label} applied to ${selectedIds.size} contacts`)} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3.5 text-left hover:border-primary/40 hover:bg-accent/30 transition-all">
                    <action.icon className={cn("h-4 w-4 mt-0.5 shrink-0", action.color)} />
                    <div>
                      <p className="text-xs font-bold text-foreground">{action.label}</p>
                      <p className="text-[10px] text-muted-foreground">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              {selectedIds.size > 0 && (
                <div className="mt-4 rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 text-xs font-semibold text-primary">
                  ✓ {selectedIds.size} contact{selectedIds.size > 1 ? "s" : ""} currently selected from the contacts list.
                </div>
              )}
            </div>
          </div>
        )}

        {/* CUSTOM FIELDS TAB */}
        {activeTab === "customfields" && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-foreground">Custom Fields</h2>
                  <p className="text-xs text-muted-foreground">Define extra data fields synced from DealMachine or entered manually.</p>
                </div>
                <button onClick={() => showToast("Custom field added")} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90">
                  <Plus className="h-3.5 w-3.5" /> Add Field
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-2.5 text-left">Field Name</th>
                      <th className="px-4 py-2.5 text-left">Type</th>
                      <th className="px-4 py-2.5 text-left">Section</th>
                      <th className="px-4 py-2.5 text-center">Required</th>
                      <th className="px-4 py-2.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {CUSTOM_FIELDS.map(field => (
                      <tr key={field.id} className="hover:bg-accent/30">
                        <td className="px-4 py-2.5 font-semibold text-foreground">{field.name}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{field.type}</td>
                        <td className="px-4 py-2.5">
                          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{field.section}</span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {field.required ? <Check className="h-3.5 w-3.5 text-green-600 mx-auto" /> : <X className="h-3.5 w-3.5 text-muted-foreground mx-auto" />}
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-center gap-1">
                            <button className="rounded-md p-1 hover:bg-accent text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                            <button className="rounded-md p-1 hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === "tasks" && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-foreground">Contact Tasks</h2>
                  <p className="text-xs text-muted-foreground">Tasks linked to contacts for follow-ups, calls and offers.</p>
                </div>
                <button onClick={() => showToast("Task created")} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90">
                  <Plus className="h-3.5 w-3.5" /> New Task
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { contact: "John Smith",   task: "Follow-up call on $28.5k offer",         due: "Today 2:00 PM",    priority: "high",   done: false },
                  { contact: "Emily Brown",  task: "Send purchase agreement via Docusign",    due: "Tomorrow 10:00 AM",priority: "medium",  done: false },
                  { contact: "David Wilson", task: "Confirm property walkthrough address",     due: "Today 4:30 PM",    priority: "high",   done: false },
                  { contact: "Linda Chen",   task: "Confirm loan terms for Kissimmee deal",   due: "May 22, 2024",     priority: "medium",  done: true  },
                ].map((t, idx) => (
                  <div key={idx} className={cn("flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/20 transition", t.done && "opacity-50")}>
                    <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border", t.done ? "bg-primary border-primary text-white" : "border-border bg-background")}>
                      {t.done && <Check className="h-3 w-3 stroke-[3] text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-semibold text-foreground", t.done && "line-through text-muted-foreground")}>{t.task}</p>
                      <p className="text-[10px] text-muted-foreground">{t.contact}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-bold", t.priority === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700")}>{t.priority}</span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="h-3 w-3" />{t.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMPANIES TAB */}
        {activeTab === "companies" && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-foreground">Companies</h2>
                <p className="text-xs text-muted-foreground">Agencies, lenders, title companies and property owners.</p>
              </div>
              <button onClick={() => showToast("Company added")} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90">
                <Plus className="h-3.5 w-3.5" /> Add Company
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 max-w-4xl">
              {MOCK_COMPANIES.map(company => (
                <div key={company.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-primary/40 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">{company.name}</p>
                      <p className="text-xs text-muted-foreground">{company.type}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3 w-3" /><span>{company.phone}</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Globe className="h-3 w-3" /><span className="truncate">{company.website}</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3 w-3" /><span>{company.city}, {company.state}</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-3 w-3" /><span>{company.contacts} contacts</span></div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div className="text-center"><p className="text-xs font-bold text-foreground">{company.deals}</p><p className="text-[10px] text-muted-foreground">Deals</p></div>
                    <div className="text-center"><p className="text-xs font-bold text-primary">{company.value}</p><p className="text-[10px] text-muted-foreground">Total Value</p></div>
                    <button className="rounded-lg border border-border px-2.5 py-1.5 text-[10px] font-semibold hover:bg-accent">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Contact Detail Drawer (right side) ──────────────────────── */}
      {detailContact && (
        <div className="hidden xl:flex w-72 shrink-0 flex-col border-l border-border bg-card overflow-y-auto">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-bold text-foreground">Contact Details</h3>
            <button onClick={() => setDetailContact(null)} className="rounded-lg p-1.5 hover:bg-accent text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center py-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white mb-2" style={{ backgroundColor: detailContact.avatarColor }}>
                {detailContact.initials}
              </div>
              <h4 className="font-bold text-foreground">{detailContact.name}</h4>
              <p className="text-xs text-muted-foreground">{detailContact.businessName || detailContact.source}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold", TYPE_COLORS[detailContact.type])}>{detailContact.type}</span>
                <div className={cn("flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold")}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[detailContact.status].dot)} />
                  <span className={STATUS_CONFIG[detailContact.status].text}>{STATUS_CONFIG[detailContact.status].label}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Phone, label: "Call", color: "text-blue-600 bg-blue-50" },
                { icon: Mail,  label: "Email", color: "text-indigo-600 bg-indigo-50" },
                { icon: CheckSquare, label: "Task",  color: "text-amber-600 bg-amber-50" },
              ].map(a => (
                <button key={a.label} onClick={() => showToast(`${a.label} initiated`)} className={cn("flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-semibold hover:brightness-95 transition", a.color)}>
                  <a.icon className="h-4 w-4" />{a.label}
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="space-y-2 rounded-xl border border-border bg-background p-3">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact Info</h5>
              {[
                { icon: Phone,    value: detailContact.phone || "—" },
                { icon: Mail,     value: detailContact.email || "—" },
                { icon: MapPin,   value: `${detailContact.address}, ${detailContact.city}, ${detailContact.state}` },
                { icon: Building2,value: detailContact.businessName || "—" },
                { icon: Clock,    value: `Last active: ${detailContact.lastActivity}` },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <item.icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
                  <span className="break-all">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {detailContact.tags.length > 0 && (
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Tags</h5>
                <div className="flex flex-wrap gap-1.5">
                  {detailContact.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {detailContact.notes && (
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Notes</h5>
                <div className="rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground leading-relaxed">{detailContact.notes}</div>
              </div>
            )}

            <button onClick={() => deleteContact(detailContact.id)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 transition">
              <Trash2 className="h-3.5 w-3.5" /> Delete Contact
            </button>
          </div>
        </div>
      )}

      {/* ── Add Contact Modal ─────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Add New Contact</h3>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Full Name *</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. John Smith" className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Contact Type</label>
                  <select value={newType} onChange={e => setNewType(e.target.value as ContactType)} className="h-9 w-full rounded-xl border border-border bg-background px-2 text-xs outline-none focus:border-primary">
                    <option value="seller">Seller</option>
                    <option value="buyer">Cash Buyer</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="lender">Private Lender</option>
                    <option value="title">Title Company</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Status</label>
                  <select value={newStatus} onChange={e => setNewStatus(e.target.value as ContactStatus)} className="h-9 w-full rounded-xl border border-border bg-background px-2 text-xs outline-none focus:border-primary">
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                    <option value="dnc">DNC</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Phone</label>
                  <input value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="(813) 555-0000" className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email</label>
                  <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="email@example.com" className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Business Name</label>
                <input value={newBusiness} onChange={e => setNewBusiness(e.target.value)} placeholder="e.g. Smith Properties LLC" className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Address</label>
                  <input value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="123 Main St" className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">City</label>
                  <input value={newCity} onChange={e => setNewCity(e.target.value)} placeholder="Tampa" className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Notes</label>
                <textarea value={newNotes} onChange={e => setNewNotes(e.target.value)} rows={2} placeholder="Key details about this contact..." className="w-full resize-none rounded-xl border border-border bg-background p-3 text-xs outline-none focus:border-primary" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
              <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold hover:bg-accent">Cancel</button>
              <button onClick={handleAddContact} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90">Save Contact</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-foreground px-4 py-3 text-xs font-semibold text-background shadow-2xl animate-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
