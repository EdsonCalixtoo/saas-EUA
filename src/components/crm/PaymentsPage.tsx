import { useState } from "react";
import {
  CreditCard, Search, Filter, Plus, Download, Settings, ChevronDown,
  DollarSign, FileText, CheckCircle2, Clock, AlertTriangle, FileSpreadsheet,
  Link as LinkIcon, ExternalLink, RefreshCw, Send, ShieldCheck, Zap,
  X, Copy, Check, ArrowUpRight, ArrowDownRight, Layers, Tag, User,
  Building, Calendar, SlidersHorizontal, Eye, MoreHorizontal, ShoppingBag,
  Percent, FileCode, CheckSquare, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────────
type MainTab =
  | "invoices"
  | "documents"
  | "orders"
  | "subscriptions"
  | "payment_links"
  | "transactions"
  | "products"
  | "integrations";

type InvoiceStatus = "Paid" | "Due" | "Overdue" | "Draft";

interface Invoice {
  id: string;
  number: string;
  name: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}

interface PaymentLink {
  id: string;
  title: string;
  amount: number;
  link: string;
  salesCount: number;
  totalRevenue: number;
  status: "Active" | "Paused";
}

interface Subscription {
  id: string;
  customer: string;
  planName: string;
  billingCycle: "Monthly" | "Annual";
  amount: number;
  nextBilling: string;
  status: "Active" | "Past Due" | "Canceled";
}

interface Transaction {
  id: string;
  txHash: string;
  customer: string;
  type: "Invoice Payment" | "Subscription" | "Payment Link";
  gateway: "Stripe" | "PayPal" | "Plaid ACH";
  amount: number;
  fee: number;
  net: number;
  date: string;
  status: "Succeeded" | "Processing" | "Failed";
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-101",
    number: "INV-2026-001",
    name: "Assignment Fee - 123 Main St",
    customerName: "Apex Real Estate Holdings LLC",
    customerEmail: "acquisitions@apexholdings.com",
    issueDate: "Jul 20, 2026",
    dueDate: "Aug 05, 2026",
    amount: 15000.0,
    status: "Paid",
  },
  {
    id: "inv-102",
    number: "INV-2026-002",
    name: "Earnest Money Deposit - 456 Oak Ave",
    customerName: "Marcus Vance",
    customerEmail: "marcus@vancecapital.com",
    issueDate: "Jul 22, 2026",
    dueDate: "Jul 29, 2026",
    amount: 5000.0,
    status: "Due",
  },
  {
    id: "inv-103",
    number: "INV-2026-003",
    name: "Wholesale Finder's Fee",
    customerName: "Sunbelt Investment Group",
    customerEmail: "finance@sunbeltig.com",
    issueDate: "Jul 10, 2026",
    dueDate: "Jul 20, 2026",
    amount: 8500.0,
    status: "Overdue",
  },
  {
    id: "inv-104",
    number: "INV-2026-004",
    name: "Property Inspection & Skip-Trace Retainer",
    customerName: "Elena Rodriguez",
    customerEmail: "elena@rodriguezinvest.com",
    issueDate: "Jul 25, 2026",
    dueDate: "Aug 10, 2026",
    amount: 2200.0,
    status: "Draft",
  },
  {
    id: "inv-105",
    number: "INV-2026-005",
    name: "Novation Deal Consultation",
    customerName: "David Wallace",
    customerEmail: "d.wallace@dundermifflin.com",
    issueDate: "Jul 18, 2026",
    dueDate: "Jul 25, 2026",
    amount: 3500.0,
    status: "Paid",
  },
];

const MOCK_PAYMENT_LINKS: PaymentLink[] = [
  {
    id: "pl-1",
    title: "Wholesale EMD Deposit ($5,000)",
    amount: 5000,
    link: "https://pay.dealvanta.com/pl/emd-5k-9912",
    salesCount: 14,
    totalRevenue: 70000,
    status: "Active",
  },
  {
    id: "pl-2",
    title: "Vip Investor Club Annual Access",
    amount: 1499,
    link: "https://pay.dealvanta.com/pl/vip-access-2026",
    salesCount: 38,
    totalRevenue: 56962,
    status: "Active",
  },
  {
    id: "pl-3",
    title: "Deal Evaluation & Rehab Estimate",
    amount: 499,
    link: "https://pay.dealvanta.com/pl/rehab-eval-499",
    salesCount: 9,
    totalRevenue: 4491,
    status: "Active",
  },
];

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub-1",
    customer: "Apex Real Estate Holdings LLC",
    planName: "Platinum Deal Flow Plan",
    billingCycle: "Monthly",
    amount: 999.0,
    nextBilling: "Aug 15, 2026",
    status: "Active",
  },
  {
    id: "sub-2",
    customer: "Marcus Vance",
    planName: "Pro Wholesaler Suite",
    billingCycle: "Monthly",
    amount: 299.0,
    nextBilling: "Aug 02, 2026",
    status: "Active",
  },
  {
    id: "sub-3",
    customer: "Sunbelt Investment Group",
    planName: "Enterprise Skip-Trace API Access",
    billingCycle: "Annual",
    amount: 4999.0,
    nextBilling: "Dec 01, 2026",
    status: "Active",
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    txHash: "ch_3N8x92L1k...901A",
    customer: "Apex Real Estate Holdings LLC",
    type: "Invoice Payment",
    gateway: "Stripe",
    amount: 15000.0,
    fee: 435.0,
    net: 14565.0,
    date: "Jul 20, 2026 14:32",
    status: "Succeeded",
  },
  {
    id: "tx-2",
    txHash: "ch_3N8y11M9k...332B",
    customer: "Marcus Vance",
    type: "Payment Link",
    gateway: "Stripe",
    amount: 5000.0,
    fee: 145.0,
    net: 4855.0,
    date: "Jul 19, 2026 11:15",
    status: "Succeeded",
  },
  {
    id: "tx-3",
    txHash: "ach_9821034491",
    customer: "Sunbelt Investment Group",
    type: "Subscription",
    gateway: "Plaid ACH",
    amount: 4999.0,
    fee: 15.0,
    net: 4984.0,
    date: "Jul 18, 2026 09:00",
    status: "Succeeded",
  },
];

const STATUS_BADGES: Record<InvoiceStatus, string> = {
  Paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Due: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Overdue: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Draft: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
};

// ── Component ─────────────────────────────────────────────────────────────────
export function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<MainTab>("invoices");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showGatewayBanner, setShowGatewayBanner] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Invoice Form state
  const [newInvCustomer, setNewInvCustomer] = useState("");
  const [newInvName, setNewInvName] = useState("");
  const [newInvAmount, setNewInvAmount] = useState("");
  const [newInvDueDate, setNewInvDueDate] = useState("");

  const [invoicesList, setInvoicesList] = useState<Invoice[]>(MOCK_INVOICES);

  // Calculations
  const draftInvoices = invoicesList.filter((i) => i.status === "Draft");
  const dueInvoices = invoicesList.filter((i) => i.status === "Due");
  const paidInvoices = invoicesList.filter((i) => i.status === "Paid");
  const overdueInvoices = invoicesList.filter((i) => i.status === "Overdue");

  const totalDraft = draftInvoices.reduce((s, i) => s + i.amount, 0);
  const totalDue = dueInvoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = paidInvoices.reduce((s, i) => s + i.amount, 0);
  const totalOverdue = overdueInvoices.reduce((s, i) => s + i.amount, 0);

  const filteredInvoices = invoicesList.filter((inv) => {
    const matchesSearch =
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvName || !newInvAmount) return;

    const created: Invoice = {
      id: `inv-${Date.now()}`,
      number: `INV-2026-00${invoicesList.length + 1}`,
      name: newInvName,
      customerName: newInvCustomer || "Valued Client",
      customerEmail: "client@example.com",
      issueDate: "Today",
      dueDate: newInvDueDate || "In 14 days",
      amount: parseFloat(newInvAmount) || 0,
      status: "Due",
    };

    setInvoicesList([created, ...invoicesList]);
    setShowCreateModal(false);
    setNewInvName("");
    setNewInvCustomer("");
    setNewInvAmount("");
    setNewInvDueDate("");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      {/* ── Top Header & Sub-Nav ───────────────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-border bg-card">
        {/* Title + Global Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payments
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage invoices, subscriptions, contracts, and payment gateways in one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("integrations")}
              className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3.5 text-xs font-semibold text-foreground hover:bg-accent transition"
            >
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              Gateway Settings
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              + New Payment
            </button>
          </div>
        </div>

        {/* GHL Sub-Tabs Bar */}
        <div className="flex items-center overflow-x-auto px-6 scrollbar-none">
          {[
            { id: "invoices", label: "Invoices & Estimates", icon: FileText },
            { id: "documents", label: "Documents & Contracts", icon: FileText },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "subscriptions", label: "Subscriptions", icon: RefreshCw },
            { id: "payment_links", label: "Payment Links", icon: LinkIcon },
            { id: "transactions", label: "Transactions", icon: DollarSign },
            { id: "products", label: "Products & Coupons", icon: Tag },
            { id: "integrations", label: "Integrations", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MainTab)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-3.5 text-xs font-semibold whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Scrollable Body ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Gateway Alert Banner */}
        {showGatewayBanner && (
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 text-blue-900 dark:text-blue-200">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Payment Gateway Connection
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Connect Stripe, PayPal, or Plaid ACH to start accepting online payments and earnest deposits.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab("integrations")}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-sm"
              >
                Integrate Payment Gateway
              </button>
              <button
                onClick={() => setShowGatewayBanner(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-blue-500/10 hover:text-foreground transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── VIEW: INVOICES & ESTIMATES ───────────────────────────────── */}
        {activeTab === "invoices" && (
          <>
            {/* KPI Metric Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40">
                <p className="text-[11px] font-semibold text-muted-foreground">
                  {draftInvoices.length} Invoice(s) in Draft
                </p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  ${totalDraft.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h3>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-amber-500/40">
                <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  {dueInvoices.length} Invoice(s) Due / Outstanding
                </p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  ${totalDue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h3>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-emerald-500/40">
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {paidInvoices.length} Invoice(s) Received
                </p>
                <h3 className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h3>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-rose-500/40">
                <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {overdueInvoices.length} Invoice(s) Overdue
                </p>
                <h3 className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">
                  ${totalOverdue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h3>
              </div>
            </div>

            {/* Invoices Data Table Container */}
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              {/* Toolbar */}
              <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Date Range Picker */}
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Start Date</span>
                    <span>→</span>
                    <span>End Date</span>
                  </div>

                  {/* Search */}
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search invoice or customer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background py-1.5 pl-9 pr-3 text-xs outline-none focus:border-primary"
                    />
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-primary font-medium"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Paid">Paid</option>
                    <option value="Due">Due</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex h-8 items-center gap-2 rounded-xl border border-border px-3 text-xs font-semibold text-foreground hover:bg-accent transition">
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/40 border-b border-border uppercase tracking-wider text-[10px] font-bold text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3.5">Invoice Name</th>
                      <th className="px-5 py-3.5">Number</th>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Issue Date</th>
                      <th className="px-5 py-3.5">Due Date</th>
                      <th className="px-5 py-3.5 text-right">Amount</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((inv) => (
                        <tr
                          key={inv.id}
                          className="hover:bg-accent/40 transition-colors"
                        >
                          <td className="px-5 py-3.5 font-bold text-foreground">
                            {inv.name}
                          </td>
                          <td className="px-5 py-3.5 font-mono text-muted-foreground">
                            {inv.number}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                {inv.customerName[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">
                                  {inv.customerName}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {inv.customerEmail}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground">
                            {inv.issueDate}
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground">
                            {inv.dueDate}
                          </td>
                          <td className="px-5 py-3.5 text-right font-bold text-foreground">
                            ${inv.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                STATUS_BADGES[inv.status]
                              )}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                title="Copy Link"
                                onClick={() =>
                                  copyToClipboard(
                                    `https://pay.dealvanta.com/inv/${inv.id}`,
                                    inv.id
                                  )
                                }
                                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition"
                              >
                                {copiedId === inv.id ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                              <button
                                title="Send Email"
                                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition"
                              >
                                <Send className="h-3.5 w-3.5" />
                              </button>
                              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-12 text-center">
                          <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                          <p className="font-semibold text-foreground">
                            No invoices found
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Try adjusting your filter or create a new invoice.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── VIEW: DOCUMENTS & CONTRACTS ────────────────────────────────── */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Documents & E-Contracts
                </h3>
                <p className="text-xs text-muted-foreground">
                  Send Purchase Agreements, Assignment Contracts, and NDAs for digital signature.
                </p>
              </div>
              <button className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm">
                <Plus className="h-4 w-4" /> Send New Contract
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { title: "Standard Wholesale Assignment", count: 12, status: "Template Ready" },
                { title: "Purchase & Sale Agreement (FL)", count: 8, status: "Template Ready" },
                { title: "Non-Disclosure Agreement (NDA)", count: 24, status: "Template Ready" },
              ].map((doc, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-primary/40 transition cursor-pointer"
                >
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-bold text-foreground text-sm">{doc.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {doc.count} signed documents
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VIEW: ORDERS ─────────────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <h3 className="text-base font-bold text-foreground">Customer Orders</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Track real-time orders generated via your checkout links and investor portal.
            </p>
          </div>
        )}

        {/* ── VIEW: SUBSCRIPTIONS ────────────────────────────────────────── */}
        {activeTab === "subscriptions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Recurring Subscriptions
                </h3>
                <p className="text-xs text-muted-foreground">
                  Manage monthly retaners, buyers club access, and automated recurring billing.
                </p>
              </div>
              <button className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 transition">
                <Plus className="h-4 w-4" /> Create Subscription Plan
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 border-b border-border uppercase tracking-wider text-[10px] font-bold text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Plan Name</th>
                    <th className="px-5 py-3.5">Billing Cycle</th>
                    <th className="px-5 py-3.5">Amount</th>
                    <th className="px-5 py-3.5">Next Billing</th>
                    <th className="px-5 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_SUBSCRIPTIONS.map((sub) => (
                    <tr key={sub.id} className="hover:bg-accent/40 transition">
                      <td className="px-5 py-3.5 font-bold text-foreground">
                        {sub.customer}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {sub.planName}
                      </td>
                      <td className="px-5 py-3.5">{sub.billingCycle}</td>
                      <td className="px-5 py-3.5 font-bold text-foreground">
                        ${sub.amount.toLocaleString()}/mo
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {sub.nextBilling}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── VIEW: PAYMENT LINKS ───────────────────────────────────────── */}
        {activeTab === "payment_links" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Payment Links</h3>
                <p className="text-xs text-muted-foreground">
                  Share direct checkout links via SMS, Email, or WhatsApp for earnest money & fee collection.
                </p>
              </div>
              <button className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm">
                <Plus className="h-4 w-4" /> Create Payment Link
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {MOCK_PAYMENT_LINKS.map((pl) => (
                <div
                  key={pl.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                      {pl.status}
                    </span>
                    <p className="text-lg font-bold text-foreground">
                      ${pl.amount.toLocaleString()}
                    </p>
                  </div>

                  <h4 className="font-bold text-foreground text-sm">{pl.title}</h4>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-2">
                    <span>{pl.salesCount} Payments received</span>
                    <span className="font-bold text-foreground">
                      ${pl.totalRevenue.toLocaleString()} Total
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(pl.link, pl.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-2 text-xs font-bold text-foreground hover:bg-accent transition"
                  >
                    {copiedId === pl.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied Link!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" /> Copy Checkout Link
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VIEW: TRANSACTIONS ────────────────────────────────────────── */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Transaction Audit Log
                </h3>
                <p className="text-xs text-muted-foreground">
                  Live feed of processed transactions, fees, and net payouts across all gateways.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 border-b border-border uppercase tracking-wider text-[10px] font-bold text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3.5">Transaction ID</th>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Type</th>
                    <th className="px-5 py-3.5">Gateway</th>
                    <th className="px-5 py-3.5 text-right">Gross</th>
                    <th className="px-5 py-3.5 text-right">Fee</th>
                    <th className="px-5 py-3.5 text-right">Net</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-accent/40 transition">
                      <td className="px-5 py-3.5 font-mono text-muted-foreground">
                        {tx.txHash}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-foreground">
                        {tx.customer}
                      </td>
                      <td className="px-5 py-3.5">{tx.type}</td>
                      <td className="px-5 py-3.5 font-semibold text-foreground">
                        {tx.gateway}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-foreground">
                        ${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-5 py-3.5 text-right text-rose-500">
                        -${tx.fee.toFixed(2)}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-emerald-600">
                        ${tx.net.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">{tx.date}</td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── VIEW: PRODUCTS & COUPONS ─────────────────────────────────── */}
        {activeTab === "products" && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Tag className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <h3 className="text-base font-bold text-foreground">Products & Discount Coupons</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Configure product catalogs, assignment fee packages, and promotional discount codes.
            </p>
          </div>
        )}

        {/* ── VIEW: INTEGRATIONS & GATEWAYS ─────────────────────────────── */}
        {activeTab === "integrations" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Payment Gateways & Merchant Accounts
              </h3>
              <p className="text-xs text-muted-foreground">
                Connect your processing accounts to accept Credit Cards, Apple Pay, and ACH Bank Transfers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Stripe", desc: "Credit Cards, Apple Pay, Google Pay", connected: true, logo: "💳" },
                { name: "Plaid ACH Direct", desc: "Low-fee Bank Transfers & Wire Sync", connected: true, logo: "🏦" },
                { name: "PayPal Commerce", desc: "PayPal, Venmo & Pay in 4", connected: false, logo: "🅿️" },
                { name: "Authorize.Net", desc: "Traditional Merchant Gateway", connected: false, logo: "🛡️" },
              ].map((gw, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{gw.logo}</span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                          gw.connected
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : "bg-zinc-500/10 text-zinc-600 border-zinc-500/20"
                        )}
                      >
                        {gw.connected ? "Connected" : "Not Connected"}
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground text-sm">{gw.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{gw.desc}</p>
                  </div>

                  <button
                    className={cn(
                      "mt-5 w-full rounded-xl py-2 text-xs font-bold transition",
                      gw.connected
                        ? "border border-border bg-background text-foreground hover:bg-accent"
                        : "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    {gw.connected ? "Configure Account" : "Connect Gateway"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Slide-out Creation Drawer Modal ──────────────────────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex h-full w-full max-w-md flex-col bg-card shadow-2xl animate-in slide-in-from-right duration-300 border-l border-border">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="text-base font-bold text-foreground">Create New Invoice</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateInvoice} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Customer / Lead Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Real Estate Holdings LLC"
                  value={newInvCustomer}
                  onChange={(e) => setNewInvCustomer(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Invoice / Item Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Assignment Fee - 123 Main St"
                  value={newInvName}
                  onChange={(e) => setNewInvName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    placeholder="15000"
                    value={newInvAmount}
                    onChange={(e) => setNewInvAmount(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newInvDueDate}
                    onChange={(e) => setNewInvDueDate(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2 text-xs">
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Automatic Notifications
                </p>
                <p className="text-muted-foreground">
                  An email and SMS with the payment link will be sent automatically to the customer upon creation.
                </p>
              </div>

              <div className="pt-4 border-t border-border flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-border py-2.5 text-xs font-bold text-foreground hover:bg-accent transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary py-2.5 text-xs font-bold text-white hover:bg-primary/90 transition shadow-sm"
                >
                  Create & Send Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
