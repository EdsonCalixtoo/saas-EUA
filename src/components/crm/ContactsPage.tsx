import { useState } from "react";
import {
  Contact, Search, Plus, Filter, Phone, Mail, User, Building2,
  DollarSign, Home, Star, ShieldCheck, Tag, MoreHorizontal,
  ChevronLeft, ChevronRight, Download, Upload, ArrowUpDown,
  CheckCircle2, X, Eye, Settings, SlidersHorizontal, CheckSquare,
  Building, RefreshCw, FileText, Layers, Trash2, SendHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type TopSubTab = "contacts" | "smartlists" | "bulkactions" | "customfields" | "tasks" | "companies";

interface ContactRecord {
  id: number;
  name: string;
  initials: string;
  color: string;
  phone: string;
  email: string;
  businessName: string;
  createdDate: string;
  lastActivity: string;
  lastActivityType?: "phone" | "email" | "sms";
  tags: string[];
  city: string;
  state: string;
}

interface SmartList {
  id: number;
  name: string;
  count: number;
}

interface CustomField {
  id: number;
  name: string;
  type: "Text" | "Number" | "Date" | "Dropdown";
  placeholder: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_CONTACTS: ContactRecord[] = [
  { id: 1,  name: "Leigh Keller",       initials: "LK", color: "#a855f7", phone: "(580) 713-9488", email: "leigh.keller@gmail.com", businessName: "Keller Property Group",   createdDate: "Jul 24, 2026 01:09 PM", lastActivity: "2 days ago",  lastActivityType: "phone", tags: ["lawton", "motivated-seller"], city: "Lawton", state: "OK" },
  { id: 2,  name: "Lee Carter",          initials: "LC", color: "#ec4899", phone: "(580) 591-2369", email: "lee.carter@yahoo.com",    businessName: "Carter Holdings LLC",    createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "3 hours ago", lastActivityType: "phone", tags: ["lawton"], city: "Lawton", state: "OK" },
  { id: 3,  name: "Christopher Campbell",initials: "CC", color: "#3b82f6", phone: "(580) 583-8005", email: "chris@campbellrealty.com", businessName: "Campbell Investments", createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "1 day ago",   lastActivityType: "email", tags: ["lawton", "cash-buyer"], city: "Lawton", state: "OK" },
  { id: 4,  name: "Garen Trantum",       initials: "GT", color: "#10b981", phone: "(580) 284-7633", email: "garen.t@outlook.com",     businessName: "Trantum Capital",        createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "5 hours ago", lastActivityType: "phone", tags: ["lawton"], city: "Lawton", state: "OK" },
  { id: 5,  name: "Randy Sailor",        initials: "RS", color: "#f97316", phone: "(580) 351-7632", email: "randy@sailorhomes.com",  businessName: "Sailor Properties",      createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "4 days ago",  lastActivityType: "sms",   tags: ["lawton", "absentee"], city: "Lawton", state: "OK" },
  { id: 6,  name: "Tommie Weeks",        initials: "TW", color: "#06b6d4", phone: "(580) 917-0738", email: "tommie.weeks@gmail.com",  businessName: "",                       createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "Just now",    lastActivityType: "phone", tags: ["lawton"], city: "Lawton", state: "OK" },
  { id: 7,  name: "Justin Scaffinger",   initials: "JS", color: "#8b5cf6", phone: "(580) 355-4227", email: "justin@scaffinger.net",   businessName: "Scaffinger Corp",        createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "3 days ago",  lastActivityType: "email", tags: ["lawton"], city: "Lawton", state: "OK" },
  { id: 8,  name: "Brandon Richard",     initials: "BR", color: "#6366f1", phone: "(580) 704-8477", email: "brandon@brichard.com",    businessName: "BR Real Estate",         createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "1 week ago",  lastActivityType: "phone", tags: ["lawton", "vip-buyer"], city: "Lawton", state: "OK" },
  { id: 9,  name: "Aaron Winkelman",     initials: "AW", color: "#14b8a6", phone: "(580) 647-7516", email: "aaron@winkelman.com",     businessName: "Winkelman Homes",        createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "2 hours ago", lastActivityType: "phone", tags: ["lawton"], city: "Lawton", state: "OK" },
  { id: 10, name: "Joseph Brennan",      initials: "JB", color: "#f43f5e", phone: "(580) 678-9574", email: "jbrennan@titlefl.com",    businessName: "Preferred Title LLC",    createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "Yesterday",   lastActivityType: "email", tags: ["title-company"], city: "Lawton", state: "OK" },
  { id: 11, name: "Luis Navas",          initials: "LN", color: "#eab308", phone: "(580) 483-3173", email: "luis.navas@gmail.com",    businessName: "Navas Construction",     createdDate: "Jul 24, 2026 09:18 AM", lastActivity: "3 days ago",  lastActivityType: "phone", tags: ["contractor"], city: "Lawton", state: "OK" },
];

const SMART_LISTS: SmartList[] = [
  { id: 1, name: "All", count: 8504 },
  { id: 2, name: "Motivated Sellers", count: 3210 },
  { id: 3, name: "VIP Cash Buyers", count: 1420 },
  { id: 4, name: "Lawton Leads", count: 854 },
  { id: 5, name: "Title & Closing", count: 180 },
];

const CUSTOM_FIELDS: CustomField[] = [
  { id: 1, name: "Buy Box Max Price", type: "Number", placeholder: "e.g. $250,000" },
  { id: 2, name: "Target Zip Codes", type: "Text", placeholder: "e.g. 33602, 33701" },
  { id: 3, name: "Motivated Seller Reason", type: "Dropdown", placeholder: "Inherited, Foreclosure, Relocation" },
  { id: 4, name: "Estimated Property Value", type: "Number", placeholder: "e.g. $185,000" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function ContactsPage() {
  const [topTab, setTopTab]                 = useState<TopSubTab>("contacts");
  const [activeSmartList, setActiveSmartList] = useState<number>(1);
  const [contacts, setContacts]             = useState<ContactRecord[]>(INITIAL_CONTACTS);
  const [selectedIds, setSelectedIds]       = useState<Set<number>>(new Set());
  const [search, setSearch]                 = useState("");
  const [sortCol, setSortCol]               = useState<string>("name");
  const [sortDir, setSortDir]               = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage]       = useState(1);
  const [pageSize, setPageSize]             = useState(20);

  // Modals
  const [showAddModal, setShowAddModal]     = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showManageFieldsModal, setShowManageFieldsModal] = useState(false);
  const [showSmartListModal, setShowSmartListModal] = useState(false);
  const [toastMsg, setToastMsg]             = useState<string | null>(null);

  // Add Contact Form
  const [newName, setNewName]               = useState("");
  const [newPhone, setNewPhone]             = useState("");
  const [newEmail, setNewEmail]             = useState("");
  const [newBusiness, setNewBusiness]       = useState("");
  const [newTag, setNewTag]                 = useState("lawton");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Toggle selection
  const toggleSelectAll = () => {
    if (selectedIds.size === contacts.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(contacts.map(c => c.id)));
  };

  const toggleSelectRow = (id: number) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  // Sorting
  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const handleCreateContact = () => {
    if (!newName.trim() && !newPhone.trim()) return;

    const initials = newName
      ? newName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)
      : "?";

    const created: ContactRecord = {
      id: Date.now(),
      name: newName.trim() || "-",
      initials,
      color: "#3b82f6",
      phone: newPhone.trim() || "-",
      email: newEmail.trim() || "-",
      businessName: newBusiness.trim() || "",
      createdDate: "Just now",
      lastActivity: "Just now",
      lastActivityType: "phone",
      tags: [newTag],
      city: "Lawton",
      state: "OK",
    };

    setContacts([created, ...contacts]);
    setShowAddModal(false);
    setNewName("");
    setNewPhone("");
    setNewEmail("");
    setNewBusiness("");
    showToast("Contact added successfully!");
  };

  const deleteSelected = () => {
    const count = selectedIds.size;
    setContacts(contacts.filter(c => !selectedIds.has(c.id)));
    setSelectedIds(new Set());
    showToast(`${count} contact(s) deleted.`);
  };

  // Filtered & Sorted Contacts
  const filtered = contacts.filter(c => {
    const matchSearch = search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.businessName.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    let va = "", vb = "";
    if (sortCol === "name")         { va = a.name; vb = b.name; }
    if (sortCol === "phone")        { va = a.phone; vb = b.phone; }
    if (sortCol === "email")        { va = a.email; vb = b.email; }
    if (sortCol === "businessName") { va = a.businessName; vb = b.businessName; }
    if (sortCol === "createdDate")  { va = a.createdDate; vb = b.createdDate; }
    return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-background">
      {/* ── Sub Header Navigation Bar (Matches HighLevel/Salesforce layout) ── */}
      <div className="flex flex-col border-b border-border bg-card">
        {/* Top Navigation Sub Tabs */}
        <div className="flex items-center gap-6 border-b border-border px-6 pt-3">
          {[
            { key: "contacts",     label: "Contacts" },
            { key: "smartlists",   label: "Smart Lists" },
            { key: "bulkactions",  label: "Bulk Actions" },
            { key: "customfields", label: "Custom Fields" },
            { key: "tasks",        label: "Tasks" },
            { key: "companies",    label: "Companies" },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTopTab(t.key as TopSubTab)}
              className={cn(
                "pb-3 text-sm font-semibold transition-colors border-b-2",
                topTab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Title Header Row */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-extrabold text-primary">
              8,504 Contacts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-accent transition"
            >
              <Upload className="h-3.5 w-3.5" />
              Import
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 shadow-sm transition"
            >
              <Plus className="h-4 w-4" />
              Add Contact
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Smart Lists Pills Bar */}
        <div className="flex items-center gap-2 border-t border-border px-6 py-2 overflow-x-auto">
          {SMART_LISTS.map(l => (
            <button
              key={l.id}
              onClick={() => setActiveSmartList(l.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors",
                activeSmartList === l.id
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <SlidersHorizontal className="h-3 w-3" />
              {l.name}
              <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground">{l.count}</span>
            </button>
          ))}

          <button
            onClick={() => setShowSmartListModal(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline ml-1"
          >
            + Add Smart List
          </button>
        </div>
      </div>

      {/* ── Main Tab Content ────────────────────────────────────────── */}
      {topTab === "contacts" && (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Toolbar: Filters, Sort, Search, Manage Fields */}
          <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent">
                <Filter className="h-3.5 w-3.5" />
                Filters
              </button>

              <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64 sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search Contacts"
                  className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                onClick={() => setShowManageFieldsModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent"
              >
                <Settings className="h-3.5 w-3.5" />
                Manage fields
              </button>
            </div>
          </div>

          {/* Bulk Action Bar (When Rows Selected) */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 border-b border-border bg-primary/10 px-6 py-2.5">
              <span className="text-xs font-bold text-primary">{selectedIds.size} contact(s) selected</span>

              <button onClick={() => showToast(`Sending SMS to ${selectedIds.size} contacts...`)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold hover:bg-accent">
                <SendHorizontal className="h-3.5 w-3.5 text-primary" /> Send SMS
              </button>

              <button onClick={() => showToast(`Sending Email to ${selectedIds.size} contacts...`)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold hover:bg-accent">
                <Mail className="h-3.5 w-3.5 text-primary" /> Send Email
              </button>

              <button onClick={() => showToast(`Adding tags to ${selectedIds.size} contacts...`)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold hover:bg-accent">
                <Tag className="h-3.5 w-3.5" /> Add Tag
              </button>

              <button onClick={deleteSelected} className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 ml-auto">
                <Trash2 className="h-3.5 w-3.5" /> Delete Selected
              </button>
            </div>
          )}

          {/* Contacts Data Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 sticky top-0 z-10 border-b border-border text-muted-foreground font-semibold text-[11px]">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === contacts.length && contacts.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="px-4 py-3">
                    <button onClick={() => handleSort("name")} className="inline-flex items-center gap-1 font-semibold text-foreground">
                      Contact name <ArrowUpDown className="h-3 w-3 opacity-40" />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button onClick={() => handleSort("phone")} className="inline-flex items-center gap-1 font-semibold text-foreground">
                      Phone <ArrowUpDown className="h-3 w-3 opacity-40" />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button onClick={() => handleSort("email")} className="inline-flex items-center gap-1 font-semibold text-foreground">
                      Email <ArrowUpDown className="h-3 w-3 opacity-40" />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button onClick={() => handleSort("businessName")} className="inline-flex items-center gap-1 font-semibold text-foreground">
                      Business name <ArrowUpDown className="h-3 w-3 opacity-40" />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button onClick={() => handleSort("createdDate")} className="inline-flex items-center gap-1 font-semibold text-foreground">
                      Created (PDT) <ArrowUpDown className="h-3 w-3 opacity-40" />
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold text-foreground">Last activity...</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Tags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 bg-card">
                {sorted.map(c => {
                  const isSelected = selectedIds.has(c.id);
                  return (
                    <tr key={c.id} className={cn("hover:bg-accent/40 transition-colors", isSelected && "bg-primary/5")}>
                      <td className="w-10 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(c.id)}
                          className="rounded border-border"
                        />
                      </td>

                      {/* Contact Name + Avatar */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: c.color }}>
                            {c.initials}
                          </div>
                          <span className="font-bold text-foreground text-xs">{c.name}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-foreground font-semibold">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>{c.phone}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-muted-foreground">
                        {c.email !== "-" ? c.email : ""}
                      </td>

                      {/* Business Name */}
                      <td className="px-4 py-3 font-medium text-foreground">
                        {c.businessName || ""}
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-[11px]">
                        {c.createdDate}
                      </td>

                      {/* Last Activity */}
                      <td className="px-4 py-3">
                        {c.lastActivity && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span>{c.lastActivity}</span>
                          </div>
                        )}
                      </td>

                      {/* Tags */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {c.tags.map(tag => (
                            <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination Bar (Matches image exact pagination) */}
          <div className="flex items-center justify-between border-t border-border bg-card px-6 py-3 text-xs text-muted-foreground">
            <div>
              Page <span className="font-bold text-foreground">{currentPage}</span> of <span className="font-bold text-foreground">426</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <select
                  value={pageSize}
                  onChange={e => setPageSize(Number(e.target.value))}
                  className="h-8 rounded-lg border border-border bg-background px-2 text-xs font-semibold text-foreground outline-none"
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="rounded-lg border border-border px-3 py-1.5 font-semibold hover:bg-accent disabled:opacity-40"
                >
                  Prev
                </button>

                <button
                  className="rounded-lg bg-primary px-3 py-1.5 font-bold text-white"
                >
                  1
                </button>

                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="rounded-lg border border-border px-3 py-1.5 font-semibold hover:bg-accent"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {topTab === "customfields" && (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Custom Contact Fields</h2>
              <p className="text-xs text-muted-foreground">Define custom attributes for Real Estate Wholesaling (ARV, Repair Estimates, Buy Box parameters).</p>
            </div>
            <button onClick={() => showToast("Added new custom field")} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white">
              + Add Custom Field
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CUSTOM_FIELDS.map(f => (
              <div key={f.id} className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">{f.name}</h3>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{f.type}</span>
                </div>
                <p className="text-xs text-muted-foreground">Placeholder: {f.placeholder}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modals ─────────────────────────────────────────────────── */}
      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">+ Add Contact</h3>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Contact Name</label>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Leigh Keller"
                  className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Phone</label>
                  <input
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="(580) 713-9488"
                    className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email</label>
                  <input
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="leigh@gmail.com"
                    className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Business Name</label>
                <input
                  value={newBusiness}
                  onChange={e => setNewBusiness(e.target.value)}
                  placeholder="Keller Property Group"
                  className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Tag</label>
                <input
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  placeholder="lawton"
                  className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
              <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold hover:bg-accent">
                Cancel
              </button>
              <button onClick={handleCreateContact} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90">
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-foreground px-4 py-3 text-xs font-semibold text-background shadow-2xl animate-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
