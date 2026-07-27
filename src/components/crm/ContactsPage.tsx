import { useState } from "react";
import {
  Contact, Search, Plus, Filter, Phone, Mail, User, Building2,
  DollarSign, Home, Star, ShieldCheck, Tag, MoreHorizontal,
  ChevronLeft, ChevronRight, Download, Upload, ArrowUpDown,
  CheckCircle2, X, Eye, Hammer, Briefcase, FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type ContactType = "all" | "seller" | "buyer" | "vendor" | "lender";

interface CrmContact {
  id: number;
  name: string;
  initials: string;
  color: string;
  type: "Seller" | "Cash Buyer" | "Vendor/Contractor" | "Lender/Title";
  email: string;
  phone: string;
  city: string;
  state: string;
  dealsCount: number;
  buyBoxMax?: number;
  preferredMarkets?: string;
  companyName?: string;
  rating?: number;
  tags: string[];
  status: "Active" | "VIP" | "Lead" | "Inactive";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CONTACTS: CrmContact[] = [
  {
    id: 1,
    name: "John Smith",
    initials: "JS",
    color: "oklch(0.55 0.22 265)",
    type: "Seller",
    email: "john.smith@gmail.com",
    phone: "(813) 555-2234",
    city: "Tampa",
    state: "FL",
    dealsCount: 1,
    tags: ["Motivated Seller", "High Equity", "123 Main St"],
    status: "Active",
  },
  {
    id: 2,
    name: "Marcus Vance",
    initials: "MV",
    color: "oklch(0.7 0.18 155)",
    type: "Cash Buyer",
    email: "marcus@vancecapital.com",
    phone: "(813) 555-9012",
    city: "Tampa",
    state: "FL",
    dealsCount: 5,
    buyBoxMax: 250000,
    preferredMarkets: "Tampa, St. Petersburg, Brandon (33602, 33701)",
    companyName: "Vance Real Estate Holdings",
    rating: 5.0,
    tags: ["VIP Buyer", "Fast Closing", "Multi-Family"],
    status: "VIP",
  },
  {
    id: 3,
    name: "Emily Brown",
    initials: "EB",
    color: "oklch(0.65 0.24 25)",
    type: "Seller",
    email: "emily.brown@yahoo.com",
    phone: "(321) 555-3456",
    city: "Kissimmee",
    state: "FL",
    dealsCount: 1,
    tags: ["Absentee Owner", "321 Elm St"],
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    initials: "SJ",
    color: "oklch(0.68 0.19 275)",
    type: "Lender/Title",
    email: "sarah@preferredtitlefl.com",
    phone: "(813) 555-4422",
    city: "Tampa",
    state: "FL",
    dealsCount: 12,
    companyName: "Preferred Title & Escrow FL",
    rating: 4.9,
    tags: ["Investor Friendly", "Fast Escrow"],
    status: "VIP",
  },
  {
    id: 5,
    name: "Carlos Rodriguez",
    initials: "CR",
    color: "oklch(0.78 0.17 75)",
    type: "Vendor/Contractor",
    email: "carlos@rodriguezrenovations.com",
    phone: "(407) 555-8899",
    city: "Orlando",
    state: "FL",
    dealsCount: 8,
    companyName: "Rodriguez General Renovations LLC",
    rating: 4.8,
    tags: ["GC License", "Roofing & Rehab"],
    status: "Active",
  },
];

const CONTACT_STATS = [
  { label: "Total Contacts",    value: "148", delta: 12.2, up: true, icon: Contact,      color: "oklch(0.55 0.22 265)" },
  { label: "Motivated Sellers", value: "86",  delta: 8.4,  up: true, icon: Home,         color: "oklch(0.65 0.24 25)"  },
  { label: "VIP Cash Buyers",   value: "42",  delta: 15.0, up: true, icon: DollarSign,   color: "oklch(0.7 0.18 155)"  },
  { label: "Title & Lenders",   value: "12",  delta: 0,    up: true, icon: ShieldCheck,  color: "oklch(0.68 0.19 275)" },
  { label: "Contractors",       value: "8",   delta: 4.2,  up: true, icon: Hammer,       color: "oklch(0.78 0.17 75)"  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function ContactsPage() {
  const [contacts, setContacts]           = useState<CrmContact[]>(MOCK_CONTACTS);
  const [selectedContact, setSelectedContact] = useState<CrmContact | null>(null);
  const [activeType, setActiveType]       = useState<ContactType>("all");
  const [search, setSearch]               = useState("");
  const [showAddModal, setShowAddModal]   = useState(false);
  const [toastMsg, setToastMsg]           = useState<string | null>(null);

  // New Contact form
  const [newName, setNewName]             = useState("");
  const [newEmail, setNewEmail]           = useState("");
  const [newPhone, setNewPhone]           = useState("");
  const [newType, setNewType]             = useState<CrmContact["type"]>("Cash Buyer");
  const [newCompany, setNewCompany]       = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreateContact = () => {
    if (!newName.trim()) return;

    const initials = newName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
    const created: CrmContact = {
      id: Date.now(),
      name: newName.trim(),
      initials,
      color: "oklch(0.55 0.22 265)",
      type: newType,
      email: newEmail.trim() || "contact@email.com",
      phone: newPhone.trim() || "(813) 555-0000",
      city: "Tampa",
      state: "FL",
      dealsCount: 0,
      companyName: newCompany.trim() || undefined,
      tags: [newType],
      status: "Active",
    };

    setContacts(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    showToast("New contact added to directory!");
  };

  const filteredContacts = contacts.filter(c => {
    const matchSearch = search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.companyName && c.companyName.toLowerCase().includes(search.toLowerCase()));

    const matchType = activeType === "all" ||
      (activeType === "seller" && c.type === "Seller") ||
      (activeType === "buyer" && c.type === "Cash Buyer") ||
      (activeType === "vendor" && c.type === "Vendor/Contractor") ||
      (activeType === "lender" && c.type === "Lender/Title");

    return matchSearch && matchType;
  });

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-background">
      {/* ── Top Header + Stats ────────────────────────────────────── */}
      <div className="flex flex-col border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Contacts Directory</h1>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">148 Active Contacts</span>
            </div>
            <p className="text-xs text-muted-foreground">Consolidated database of sellers, cash buyers, title companies, and preferred contractors.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast("Exporting CSV contact directory...")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent transition"
            >
              <Download className="h-3.5 w-3.5" />
              Export Directory
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-primary/90 shadow-sm transition"
            >
              <Plus className="h-4 w-4" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-none">
          {CONTACT_STATS.map(s => (
            <div key={s.label} className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-background/50 px-3.5 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: s.color + "22" }}>
                <s.icon className="h-4 w-4" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xs font-bold leading-none text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex border-t border-border px-6">
          {[
            { key: "all",    label: "All Contacts", icon: Contact },
            { key: "seller", label: "Motivated Sellers", icon: Home },
            { key: "buyer",  label: "Cash Buyers & Investors", icon: DollarSign },
            { key: "lender", label: "Title & Lenders", icon: ShieldCheck },
            { key: "vendor", label: "Vendors & Contractors", icon: Hammer },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveType(t.key as ContactType)}
              className={cn(
                "relative flex items-center gap-2 py-3 px-4 text-xs font-semibold transition-colors",
                activeType === t.key
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Toolbar & Table Content ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search contact name, company, email, phone..."
              className="h-9 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <span className="text-xs text-muted-foreground font-medium">Showing {filteredContacts.length} contacts</span>
        </div>

        {/* Contacts Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Contact Name</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Company / Buy Box Criteria</th>
                  <th className="p-3.5">Deals</th>
                  <th className="p-3.5">Tags</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredContacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-accent/30 transition-colors group">
                    {/* Name + Avatar */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shrink-0" style={{ backgroundColor: contact.color }}>
                          {contact.initials}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-xs group-hover:text-primary transition-colors">{contact.name}</p>
                          <p className="text-[10px] text-muted-foreground">{contact.city}, {contact.state}</p>
                        </div>
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td className="p-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold",
                        contact.type === "Seller" ? "bg-amber-100 text-amber-700" :
                        contact.type === "Cash Buyer" ? "bg-emerald-100 text-emerald-700" :
                        contact.type === "Lender/Title" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700",
                      )}>
                        {contact.type}
                      </span>
                    </td>

                    {/* Contact Details */}
                    <td className="p-3.5 space-y-0.5">
                      <p className="text-muted-foreground text-[11px] font-medium">{contact.email}</p>
                      <p className="text-foreground text-[11px] font-semibold">{contact.phone}</p>
                    </td>

                    {/* Buy Box / Company */}
                    <td className="p-3.5 max-w-xs">
                      {contact.companyName && <p className="font-bold text-foreground text-[11px]">{contact.companyName}</p>}
                      {contact.preferredMarkets && (
                        <p className="text-[10px] text-muted-foreground truncate" title={contact.preferredMarkets}>
                          {contact.preferredMarkets}
                        </p>
                      )}
                      {contact.buyBoxMax && (
                        <p className="text-[10px] font-bold text-emerald-600">Max Budget: ${contact.buyBoxMax.toLocaleString()}</p>
                      )}
                      {!contact.companyName && !contact.buyBoxMax && <span className="text-muted-foreground text-[11px]">—</span>}
                    </td>

                    {/* Deals count */}
                    <td className="p-3.5">
                      <span className="font-bold text-foreground">{contact.dealsCount}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">deals</span>
                    </td>

                    {/* Tags */}
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map(tag => (
                          <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => showToast(`Calling ${contact.name}...`)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-primary hover:text-white transition" title="Call">
                          <Phone className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => showToast(`Sending SMS to ${contact.name}...`)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-primary hover:text-white transition" title="Send SMS">
                          <Mail className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setSelectedContact(contact)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition" title="View Full Details">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Contact Detail Drawer ────────────────────────────────────── */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border-l border-border h-full p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-base font-bold text-foreground">Contact Profile</h3>
              <button onClick={() => setSelectedContact(null)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full text-base font-bold text-white shadow-md" style={{ backgroundColor: selectedContact.color }}>
                {selectedContact.initials}
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{selectedContact.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedContact.companyName || selectedContact.type}</p>
                <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{selectedContact.status}</span>
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-4 text-xs">
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">{selectedContact.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">Phone</p>
                <p className="font-semibold text-foreground">{selectedContact.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">{selectedContact.city}, {selectedContact.state}</p>
              </div>
              {selectedContact.buyBoxMax && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-500/10 p-3">
                  <p className="text-[10px] font-bold uppercase text-emerald-700">Cash Buy Box Budget</p>
                  <p className="text-base font-extrabold text-emerald-600">${selectedContact.buyBoxMax.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{selectedContact.preferredMarkets}</p>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <button onClick={() => setSelectedContact(null)} className="w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-white hover:bg-primary/90">
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Contact Modal ────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Add New Contact</h3>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Full Name</label>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Contact Category</label>
                  <select value={newType} onChange={e => setNewType(e.target.value as CrmContact["type"])} className="h-9 w-full rounded-xl border border-border bg-background px-2 text-xs outline-none focus:border-primary">
                    <option value="Cash Buyer">Cash Buyer / Investor</option>
                    <option value="Seller">Motivated Seller</option>
                    <option value="Lender/Title">Title Company / Lender</option>
                    <option value="Vendor/Contractor">Vendor / Contractor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Company Name (Optional)</label>
                  <input
                    value={newCompany}
                    onChange={e => setNewCompany(e.target.value)}
                    placeholder="Vance Capital LLC"
                    className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email Address</label>
                  <input
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="marcus@vance.com"
                    className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Phone Number</label>
                  <input
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="(813) 555-0000"
                    className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
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
