import { useState, useMemo } from "react";
import {
  Search, Plus, Filter, Download, Upload, MoreHorizontal, Phone, Mail,
  MessageCircle, Star, StarOff, Trash2, Pencil, X, Check, ChevronDown,
  Building2, User, Users, Tag, SlidersHorizontal, CheckSquare,
  List, Grid3x3, ArrowUpDown, Eye, Copy, Send, Clock, Home,
  AlertCircle, Briefcase, MapPin, Hash, FileText, Calendar,
  BarChart3, Globe, Linkedin, Instagram, Facebook,
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
  company?: string;
  tags: string[];
  starred: boolean;
  selected?: boolean;
  lastContact: string;
  deals: number;
  value: string;
  notes: string;
  avatar?: string;
  initials: string;
  avatarColor: string;
  source: string;
  createdAt: string;
}

interface SmartList {
  id: number;
  name: string;
  count: number;
  icon: any;
  color: string;
  filter: Partial<{ status: ContactStatus; type: ContactType; starred: boolean }>;
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
  {
    id: 1, name: "John Smith", type: "seller", status: "hot",
    phone: "(813) 555-2234", email: "john.smith@gmail.com",
    address: "123 Main St", city: "Tampa", state: "FL",
    tags: ["Motivated", "Probate", "Off-Market"],
    starred: true, lastContact: "2h ago", deals: 1, value: "$28,500",
    notes: "Owner is 72 yrs old and motivated to sell quickly. Roof needs full replacement.",
    initials: "JS", avatarColor: "oklch(0.55 0.22 265)",
    source: "Cold Calling", createdAt: "May 1, 2024",
  },
  {
    id: 2, name: "Emily Brown", type: "seller", status: "warm",
    phone: "(321) 555-3456", email: "emily.brown@gmail.com",
    address: "321 Elm St", city: "Kissimmee", state: "FL",
    company: "Brown Properties LLC",
    tags: ["Inherited", "Motivated"],
    starred: false, lastContact: "Yesterday", deals: 0, value: "$0",
    notes: "Inherited property from parents. Would accept cash offer around $95k.",
    initials: "EB", avatarColor: "oklch(0.68 0.19 155)",
    source: "Direct Mail", createdAt: "May 5, 2024",
  },
  {
    id: 3, name: "David Wilson", type: "buyer", status: "hot",
    phone: "(407) 555-1357", email: "david.wilson@yahoo.com",
    address: "369 Lake Dr", city: "Lakeland", state: "FL",
    tags: ["Cash Buyer", "Repeat Buyer"],
    starred: true, lastContact: "3h ago", deals: 4, value: "$248,000",
    notes: "Active cash buyer — can close in 7 days. Buys distressed single family.",
    initials: "DW", avatarColor: "oklch(0.72 0.17 30)",
    source: "Referral", createdAt: "Jan 12, 2024",
  },
  {
    id: 4, name: "Sarah Martinez", type: "agent", status: "warm",
    phone: "(813) 555-4680", email: "sarah.m@realty.com",
    address: "813 Bay Blvd", city: "Tampa", state: "FL",
    company: "Bay Area Realty",
    tags: ["Agent", "Referral Partner"],
    starred: false, lastContact: "3 days ago", deals: 2, value: "$62,000",
    notes: "Sends us 2-3 distressed leads per month. Works foreclosures heavily.",
    initials: "SM", avatarColor: "oklch(0.66 0.19 275)",
    source: "Networking", createdAt: "Mar 3, 2024",
  },
  {
    id: 5, name: "Robert Anderson", type: "seller", status: "cold",
    phone: "(727) 555-7890", email: "r.anderson@outlook.com",
    address: "555 Pine Ave", city: "St. Petersburg", state: "FL",
    tags: ["Absentee Owner", "Tax Delinquent"],
    starred: false, lastContact: "2 weeks ago", deals: 0, value: "$0",
    notes: "Has not responded to 3 attempts. Left voicemail twice.",
    initials: "RA", avatarColor: "oklch(0.60 0.15 210)",
    source: "Skip Tracing", createdAt: "Apr 15, 2024",
  },
  {
    id: 6, name: "Mike Torres", type: "seller", status: "dnc",
    phone: "(407) 555-6678", email: "mike.torres@gmail.com",
    address: "466 Oak Ave", city: "Orlando", state: "FL",
    tags: ["DNC"],
    starred: false, lastContact: "1 month ago", deals: 0, value: "$0",
    notes: "Requested to not be contacted again. Remove from all campaigns.",
    initials: "MT", avatarColor: "oklch(0.55 0.20 15)",
    source: "Direct Mail", createdAt: "Feb 20, 2024",
  },
  {
    id: 7, name: "Linda Chen", type: "lender", status: "warm",
    phone: "(813) 555-1122", email: "linda.chen@firstcapital.com",
    address: "1200 Corporate Dr", city: "Tampa", state: "FL",
    company: "First Capital Lending",
    tags: ["Private Lender", "Hard Money"],
    starred: true, lastContact: "5 days ago", deals: 6, value: "$415,000",
    notes: "Lends at 10% interest for fix-and-flip. 70% LTV max. Fast closings.",
    initials: "LC", avatarColor: "oklch(0.65 0.20 170)",
    source: "Networking", createdAt: "Dec 1, 2023",
  },
  {
    id: 8, name: "James White", type: "title", status: "closed",
    phone: "(407) 555-5533", email: "james.white@preferredtitle.com",
    address: "789 Congress Ave", city: "Orlando", state: "FL",
    company: "Preferred Title & Escrow",
    tags: ["Title Company", "Partner"],
    starred: false, lastContact: "1 week ago", deals: 11, value: "$820,500",
    notes: "Our go-to title company for central FL. 5-day turnaround guaranteed.",
    initials: "JW", avatarColor: "oklch(0.58 0.15 240)",
    source: "Referral", createdAt: "Oct 12, 2023",
  },
];

const MOCK_COMPANIES: Company[] = [
  { id: 1, name: "Bay Area Realty", type: "Real Estate Agency", contacts: 3, deals: 5, value: "$284,000", phone: "(813) 555-9900", website: "bayarearealty.com", city: "Tampa", state: "FL" },
  { id: 2, name: "First Capital Lending", type: "Hard Money Lender", contacts: 2, deals: 6, value: "$415,000", phone: "(813) 555-1100", website: "firstcapitallending.com", city: "Tampa", state: "FL" },
  { id: 3, name: "Preferred Title & Escrow", type: "Title Company", contacts: 2, deals: 11, value: "$820,500", phone: "(407) 555-5500", website: "preferredtitle.com", city: "Orlando", state: "FL" },
  { id: 4, name: "Brown Properties LLC", type: "Property Owner", contacts: 1, deals: 0, value: "$0", phone: "(321) 555-3456", website: "—", city: "Kissimmee", state: "FL" },
];

const SMART_LISTS: SmartList[] = [
  { id: 1, name: "All Contacts", count: 8, icon: Users, color: "oklch(0.55 0.22 265)", filter: {} },
  { id: 2, name: "Hot Leads", count: 2, icon: AlertCircle, color: "oklch(0.62 0.24 27)", filter: { status: "hot" } },
  { id: 3, name: "Sellers", count: 4, icon: Home, color: "oklch(0.68 0.19 155)", filter: { type: "seller" } },
  { id: 4, name: "Cash Buyers", count: 1, icon: Briefcase, color: "oklch(0.72 0.17 30)", filter: { type: "buyer" } },
  { id: 5, name: "Starred", count: 3, icon: Star, color: "oklch(0.78 0.17 75)", filter: { starred: true } },
  { id: 6, name: "DNC List", count: 1, icon: AlertCircle, color: "oklch(0.62 0.22 15)", filter: { status: "dnc" } },
];

const CUSTOM_FIELDS = [
  { id: 1, name: "Property ARV", type: "Currency", section: "Property", required: false },
  { id: 2, name: "Asking Price", type: "Currency", section: "Property", required: false },
  { id: 3, name: "Repair Estimate", type: "Currency", section: "Property", required: false },
  { id: 4, name: "Lead Source", type: "Dropdown", section: "Lead", required: true },
  { id: 5, name: "Motivation Level", type: "Rating (1-10)", section: "Lead", required: false },
  { id: 6, name: "Occupancy Status", type: "Dropdown", section: "Property", required: false },
  { id: 7, name: "Year Built", type: "Number", section: "Property", required: false },
  { id: 8, name: "Sq Footage", type: "Number", section: "Property", required: false },
  { id: 9, name: "Bedrooms", type: "Number", section: "Property", required: false },
  { id: 10, name: "Bathrooms", type: "Number", section: "Property", required: false },
];

const STATUS_CONFIG: Record<ContactStatus, { label: string; bg: string; text: string; dot: string }> = {
  hot:    { label: "Hot",    bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500"    },
  warm:   { label: "Warm",   bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-500"  },
  cold:   { label: "Cold",   bg: "bg-slate-100",  text: "text-slate-600",  dot: "bg-slate-400"  },
  dnc:    { label: "DNC",    bg: "bg-gray-200",   text: "text-gray-600",   dot: "bg-gray-500"   },
  closed: { label: "Closed", bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500"  },
};

const TYPE_CONFIG: Record<ContactType, { label: string; bg: string; text: string }> = {
  seller:  { label: "Seller",  bg: "bg-blue-100",   text: "text-blue-700"   },
  buyer:   { label: "Buyer",   bg: "bg-purple-100", text: "text-purple-700" },
  agent:   { label: "Agent",   bg: "bg-indigo-100", text: "text-indigo-700" },
  title:   { label: "Title",   bg: "bg-teal-100",   text: "text-teal-700"   },
  lender:  { label: "Lender",  bg: "bg-orange-100", text: "text-orange-700" },
  other:   { label: "Other",   bg: "bg-gray-100",   text: "text-gray-600"   },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [activeTab, setActiveTab] = useState<ActiveTab>("smartlists");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeSmartList, setActiveSmartList] = useState<SmartList>(SMART_LISTS[0]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [detailContact, setDetailContact] = useState<Contact | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New contact form
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<ContactType>("seller");
  const [newStatus, setNewStatus] = useState<ContactStatus>("warm");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const toggleStar = (id: number) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, starred: !c.starred } : c));
  };

  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    if (detailContact?.id === id) setDetailContact(null);
    showToast("Contact deleted");
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredContacts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredContacts.map(c => c.id)));
    }
  };

  const handleAddContact = () => {
    if (!newName.trim()) return;
    const initials = newName.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const colors = ["oklch(0.55 0.22 265)", "oklch(0.68 0.19 155)", "oklch(0.72 0.17 30)", "oklch(0.66 0.19 275)"];
    const created: Contact = {
      id: Date.now(), name: newName.trim(), type: newType, status: newStatus,
      phone: newPhone, email: newEmail, address: newAddress, city: newCity, state: "FL",
      tags: [], starred: false, lastContact: "Just now", deals: 0, value: "$0",
      notes: newNotes, initials, avatarColor: colors[Math.floor(Math.random() * colors.length)],
      source: "Manual Entry", createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setContacts(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewName(""); setNewPhone(""); setNewEmail(""); setNewAddress(""); setNewCity(""); setNewNotes("");
    showToast("Contact added successfully!");
  };

  const filteredContacts = useMemo(() => {
    let list = contacts;
    // Apply smart list filter
    if (activeSmartList.filter.status) list = list.filter(c => c.status === activeSmartList.filter.status);
    if (activeSmartList.filter.type)   list = list.filter(c => c.type === activeSmartList.filter.type);
    if (activeSmartList.filter.starred !== undefined) list = list.filter(c => c.starred === activeSmartList.filter.starred);
    // Apply search
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "all") list = list.filter(c => c.status === statusFilter);
    if (typeFilter   !== "all") list = list.filter(c => c.type === typeFilter);
    return list;
  }, [contacts, search, statusFilter, typeFilter, activeSmartList]);

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "smartlists", label: "Smart Lists" },
    { key: "bulkactions", label: "Bulk Actions" },
    { key: "customfields", label: "Custom Fields" },
    { key: "tasks", label: "Tasks" },
    { key: "companies", label: "Companies" },
  ];

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-background">
      {/* ── Left Panel: Smart Lists (sidebar inside the page) ───────────── */}
      <div className="hidden lg:flex w-56 shrink-0 flex-col border-r border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Smart Lists</h3>
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {SMART_LISTS.map(list => (
            <button
              key={list.id}
              onClick={() => { setActiveSmartList(list); setActiveTab("smartlists"); }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                activeSmartList.id === list.id && activeTab === "smartlists"
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-accent",
              )}
            >
              <div className="flex items-center gap-2.5">
                <list.icon className="h-3.5 w-3.5" style={{ color: list.color }} />
                <span>{list.name}</span>
              </div>
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                {list.count}
              </span>
            </button>
          ))}

          <div className="my-2 border-t border-border" />

          <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-primary hover:bg-primary/5 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            New Smart List
          </button>
        </div>

        {/* Companies quick list */}
        <div className="border-t border-border px-4 py-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Companies</h3>
          <div className="space-y-0.5">
            {MOCK_COMPANIES.slice(0, 3).map(co => (
              <button
                key={co.id}
                onClick={() => setActiveTab("companies")}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-accent transition-colors"
              >
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate">{co.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Area ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div className="border-b border-border bg-card px-5 py-3.5 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-foreground">Contacts</h1>
              <p className="text-xs text-muted-foreground">Sellers, buyers, agents, lenders &amp; partners — all in one place.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-accent transition-colors">
                <Upload className="h-3.5 w-3.5" />
                Import CSV
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-accent transition-colors">
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-primary/90 shadow-sm transition"
              >
                <Plus className="h-4 w-4" />
                New Contact
              </button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex items-center gap-0 border-b border-transparent -mb-3.5">
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

        {/* ── Tab Content ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">

          {/* SMART LISTS / MAIN CONTACTS LIST */}
          {activeTab === "smartlists" && (
            <div className="flex flex-col h-full">
              {/* Sub-toolbar */}
              <div className="flex items-center justify-between border-b border-border bg-card px-5 py-2 flex-shrink-0 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search contacts..."
                      className="h-8 w-44 rounded-lg border border-border bg-background pl-8 pr-3 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2 text-xs outline-none">
                    <option value="all">All Status</option>
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                    <option value="dnc">DNC</option>
                    <option value="closed">Closed</option>
                  </select>
                  <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2 text-xs outline-none">
                    <option value="all">All Types</option>
                    <option value="seller">Sellers</option>
                    <option value="buyer">Buyers</option>
                    <option value="agent">Agents</option>
                    <option value="lender">Lenders</option>
                    <option value="title">Title</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">{filteredContacts.length} contacts</span>
                  <div className="flex rounded-lg border border-border bg-background p-0.5">
                    <button onClick={() => setViewMode("list")} className={cn("rounded-md p-1.5", viewMode === "list" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground")}>
                      <List className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setViewMode("grid")} className={cn("rounded-md p-1.5", viewMode === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground")}>
                      <Grid3x3 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contacts List View */}
              {viewMode === "list" && (
                <div className="flex-1 overflow-y-auto">
                  {/* Table Header */}
                  <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-muted/50 px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <button onClick={selectAll} className={cn("flex h-4 w-4 items-center justify-center rounded border border-border bg-background shrink-0 text-transparent transition", selectedIds.size > 0 && "bg-primary border-primary text-white")}>
                      <Check className="h-3 w-3 stroke-[3]" />
                    </button>
                    <span className="w-40">Name</span>
                    <span className="w-20">Type</span>
                    <span className="w-16">Status</span>
                    <span className="w-32">Phone</span>
                    <span className="flex-1">Address</span>
                    <span className="w-20 text-right">Value</span>
                    <span className="w-20 text-right">Last Contact</span>
                    <span className="w-16 text-center">Actions</span>
                  </div>

                  <div className="divide-y divide-border/50">
                    {filteredContacts.map(contact => (
                      <div
                        key={contact.id}
                        className={cn(
                          "flex items-center gap-3 px-5 py-3 hover:bg-accent/30 cursor-pointer transition-colors",
                          selectedIds.has(contact.id) && "bg-primary/5",
                          contact.status === "dnc" && "opacity-60",
                        )}
                        onClick={() => setDetailContact(contact)}
                      >
                        {/* Checkbox */}
                        <button
                          onClick={e => { e.stopPropagation(); toggleSelect(contact.id); }}
                          className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded border transition text-transparent", selectedIds.has(contact.id) ? "bg-primary border-primary text-white" : "border-border bg-background")}
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </button>

                        {/* Avatar + Name */}
                        <div className="flex items-center gap-2.5 w-40 shrink-0">
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: contact.avatarColor }}
                          >
                            {contact.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-semibold text-foreground truncate">{contact.name}</span>
                              {contact.starred && <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400 shrink-0" />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate">{contact.company || contact.email}</span>
                          </div>
                        </div>

                        {/* Type */}
                        <div className="w-20 shrink-0">
                          <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-bold", TYPE_CONFIG[contact.type].bg, TYPE_CONFIG[contact.type].text)}>
                            {TYPE_CONFIG[contact.type].label}
                          </span>
                        </div>

                        {/* Status */}
                        <div className="w-16 shrink-0">
                          <div className={cn("flex items-center gap-1 rounded-md px-1.5 py-0.5 w-fit", STATUS_CONFIG[contact.status].bg)}>
                            <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[contact.status].dot)} />
                            <span className={cn("text-[10px] font-bold", STATUS_CONFIG[contact.status].text)}>
                              {STATUS_CONFIG[contact.status].label}
                            </span>
                          </div>
                        </div>

                        {/* Phone */}
                        <span className="w-32 shrink-0 text-xs text-muted-foreground">{contact.phone}</span>

                        {/* Address */}
                        <span className="flex-1 text-xs text-muted-foreground truncate">{contact.address}, {contact.city}, {contact.state}</span>

                        {/* Value */}
                        <span className="w-20 shrink-0 text-right text-xs font-bold text-foreground">{contact.value}</span>

                        {/* Last Contact */}
                        <span className="w-20 shrink-0 text-right text-[10px] text-muted-foreground">{contact.lastContact}</span>

                        {/* Actions */}
                        <div className="flex w-16 shrink-0 items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                          <button onClick={() => toggleStar(contact.id)} className="rounded-md p-1 hover:bg-accent text-muted-foreground hover:text-amber-500 transition-colors">
                            {contact.starred ? <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> : <StarOff className="h-3.5 w-3.5" />}
                          </button>
                          <button onClick={() => deleteContact(contact.id)} className="rounded-md p-1 hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredContacts.length === 0 && (
                    <div className="py-20 text-center text-sm text-muted-foreground">No contacts found.</div>
                  )}
                </div>
              )}

              {/* Contacts Grid View */}
              {viewMode === "grid" && (
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredContacts.map(contact => (
                      <div
                        key={contact.id}
                        onClick={() => setDetailContact(contact)}
                        className="cursor-pointer rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: contact.avatarColor }}>
                              {contact.initials}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-foreground flex items-center gap-1">
                                {contact.name}
                                {contact.starred && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                              </div>
                              <span className="text-[10px] text-muted-foreground">{contact.company || contact.source}</span>
                            </div>
                          </div>
                          <div className={cn("flex items-center gap-1 rounded-md px-1.5 py-0.5", STATUS_CONFIG[contact.status].bg)}>
                            <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[contact.status].dot)} />
                            <span className={cn("text-[10px] font-bold", STATUS_CONFIG[contact.status].text)}>{STATUS_CONFIG[contact.status].label}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {contact.phone}</div>
                          <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> <span className="truncate">{contact.email}</span></div>
                          <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {contact.city}, {contact.state}</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-bold", TYPE_CONFIG[contact.type].bg, TYPE_CONFIG[contact.type].text)}>
                            {TYPE_CONFIG[contact.type].label}
                          </span>
                          <span className="text-xs font-bold text-foreground">{contact.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BULK ACTIONS TAB */}
          {activeTab === "bulkactions" && (
            <div className="p-6 max-w-3xl space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="text-sm font-bold text-foreground mb-1">Bulk Actions</h2>
                <p className="text-xs text-muted-foreground mb-4">Select contacts from the list and apply mass actions instantly.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Tag,           label: "Add Tag",               desc: "Tag selected contacts with a custom label.", color: "text-primary" },
                    { icon: Send,          label: "Send SMS Blast",         desc: "Send a one-time SMS to all selected contacts.", color: "text-blue-600" },
                    { icon: Mail,          label: "Send Email Campaign",    desc: "Enroll contacts in an email drip sequence.", color: "text-indigo-600" },
                    { icon: Users,         label: "Assign to Agent",        desc: "Reassign contacts to a different team member.", color: "text-purple-600" },
                    { icon: Download,      label: "Export Selected",        desc: "Download contact data as a .CSV file.", color: "text-green-600" },
                    { icon: Trash2,        label: "Delete Selected",        desc: "Permanently delete all selected contacts.", color: "text-red-600" },
                    { icon: AlertCircle,   label: "Mark as DNC",            desc: "Add selected contacts to the Do Not Contact list.", color: "text-gray-600" },
                    { icon: CheckSquare,   label: "Create Tasks for All",   desc: "Bulk-create a task reminder for each contact.", color: "text-amber-600" },
                  ].map(action => (
                    <button
                      key={action.label}
                      onClick={() => showToast(`${action.label} applied to ${selectedIds.size} contacts`)}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background p-3.5 text-left hover:border-primary/40 hover:bg-accent/30 transition-all"
                    >
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
            <div className="p-6 max-w-3xl space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-foreground">Custom Fields</h2>
                    <p className="text-xs text-muted-foreground">Define extra data fields for your real estate contacts and properties.</p>
                  </div>
                  <button onClick={() => showToast("Custom field added")} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 transition">
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
            <div className="p-6 max-w-3xl space-y-3">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-foreground">Contact Tasks</h2>
                    <p className="text-xs text-muted-foreground">Tasks linked to contacts for follow-ups, calls and offers.</p>
                  </div>
                  <button onClick={() => showToast("Task created")} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 transition">
                    <Plus className="h-3.5 w-3.5" /> New Task
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    { contact: "John Smith", task: "Follow-up call on $28.5k offer", due: "Today 2:00 PM", priority: "high", done: false },
                    { contact: "Emily Brown", task: "Send purchase agreement via Docusign", due: "Tomorrow 10:00 AM", priority: "medium", done: false },
                    { contact: "David Wilson", task: "Confirm property walkthrough address", due: "Today 4:30 PM", priority: "high", done: false },
                    { contact: "Linda Chen", task: "Confirm loan terms for Kissimmee deal", due: "May 22, 2024", priority: "medium", done: true },
                  ].map((t, idx) => (
                    <div key={idx} className={cn("flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/20 transition", t.done && "opacity-50")}>
                      <div className={cn("flex h-5 w-5 items-center justify-center rounded-lg border shrink-0", t.done ? "bg-primary border-primary text-white" : "border-border bg-background")}>
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
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-foreground">Companies</h2>
                  <p className="text-xs text-muted-foreground">Agencies, lenders, title companies and property owners.</p>
                </div>
                <button onClick={() => showToast("Company added")} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 transition">
                  <Plus className="h-3.5 w-3.5" /> Add Company
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                      <div className="text-center">
                        <p className="text-xs font-bold text-foreground">{company.deals}</p>
                        <p className="text-[10px] text-muted-foreground">Deals</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-primary">{company.value}</p>
                        <p className="text-[10px] text-muted-foreground">Total Value</p>
                      </div>
                      <button className="rounded-lg border border-border px-2.5 py-1.5 text-[10px] font-semibold hover:bg-accent transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Contact Detail Panel ────────────────────────────────────── */}
      {detailContact && (
        <div className="hidden xl:flex w-80 shrink-0 flex-col border-l border-border bg-card overflow-y-auto">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-bold text-foreground">Contact Details</h3>
            <button onClick={() => setDetailContact(null)} className="rounded-lg p-1.5 hover:bg-accent text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Avatar Header */}
            <div className="flex flex-col items-center text-center py-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white mb-3" style={{ backgroundColor: detailContact.avatarColor }}>
                {detailContact.initials}
              </div>
              <h4 className="font-bold text-foreground">{detailContact.name}</h4>
              <p className="text-xs text-muted-foreground">{detailContact.company || detailContact.source}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold", TYPE_CONFIG[detailContact.type].bg, TYPE_CONFIG[detailContact.type].text)}>
                  {TYPE_CONFIG[detailContact.type].label}
                </span>
                <span className={cn("flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold", STATUS_CONFIG[detailContact.status].bg, STATUS_CONFIG[detailContact.status].text)}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[detailContact.status].dot)} />
                  {STATUS_CONFIG[detailContact.status].label}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Phone, label: "Call", color: "text-blue-600 bg-blue-50" },
                { icon: MessageCircle, label: "SMS", color: "text-green-600 bg-green-50" },
                { icon: Mail, label: "Email", color: "text-indigo-600 bg-indigo-50" },
              ].map(action => (
                <button key={action.label} onClick={() => showToast(`${action.label} initiated`)} className={cn("flex flex-col items-center gap-1 rounded-xl p-2.5 text-[10px] font-semibold transition hover:brightness-95", action.color)}>
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </button>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 rounded-xl border border-border bg-background p-3">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact Info</h5>
              {[
                { icon: Phone, value: detailContact.phone },
                { icon: Mail, value: detailContact.email },
                { icon: MapPin, value: `${detailContact.address}, ${detailContact.city}, ${detailContact.state}` },
                { icon: Calendar, value: `Added: ${detailContact.createdAt}` },
                { icon: Clock, value: `Last Contact: ${detailContact.lastContact}` },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <item.icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
                  <span className="break-all">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Deal Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-border bg-background p-3 text-center">
                <p className="text-lg font-bold text-foreground">{detailContact.deals}</p>
                <p className="text-[10px] text-muted-foreground">Deals</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-3 text-center">
                <p className="text-lg font-bold text-primary">{detailContact.value}</p>
                <p className="text-[10px] text-muted-foreground">Total Value</p>
              </div>
            </div>

            {/* Tags */}
            {detailContact.tags.length > 0 && (
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Tags</h5>
                <div className="flex flex-wrap gap-1.5">
                  {detailContact.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{tag}</span>
                  ))}
                  <button className="rounded-full border border-dashed border-primary/40 px-2 py-0.5 text-[10px] font-semibold text-primary hover:bg-primary/5">
                    + Tag
                  </button>
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Notes</h5>
              <div className="rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground leading-relaxed">
                {detailContact.notes}
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteContact(detailContact.id)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 transition"
            >
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
