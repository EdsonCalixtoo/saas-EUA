import { useState, useRef, useEffect } from "react";
import {
  MessageCircle, Search, Send, Plus, CheckCheck, Check,
  Clock, Filter, Phone, Mail, MoreHorizontal, User,
  Building2, Sparkles, Zap, FileText, Settings, Copy,
  CheckCircle2, AlertCircle, ChevronRight, X, ArrowLeft,
  Users, SendHorizontal, Paperclip, Smile, RefreshCw,
  TrendingUp, Ban, ShieldCheck, Play, ArrowUpDown, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type SmsTab = "inbox" | "broadcast" | "templates" | "optouts";

interface SmsMessage {
  id: number;
  direction: "inbound" | "outbound";
  content: string;
  time: string;
  date: string;
  status?: "sent" | "delivered" | "read" | "failed";
}

interface SmsConversation {
  id: number;
  leadName: string;
  leadInitials: string;
  leadColor: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  stage: string;
  stageColor: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  starred: boolean;
  optedOut?: boolean;
}

interface SmsTemplate {
  id: number;
  title: string;
  category: "Cold Outreach" | "Follow Up" | "Offer Sent" | "Appointment";
  text: string;
  useCount: number;
}

interface BroadcastCampaign {
  id: number;
  name: string;
  audience: string;
  sentCount: number;
  deliveredPct: number;
  responsePct: number;
  status: "active" | "completed" | "scheduled";
  date: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CONVERSATIONS: SmsConversation[] = [
  { id:1, leadName:"John Smith",       leadInitials:"JS", leadColor:"oklch(0.55 0.22 265)", phone:"(813) 555-2234", address:"123 Main St",     city:"Tampa",       state:"FL", stage:"Qualified",      stageColor:"#a855f7", lastMessage:"Can we negotiate a bit on the price?",         lastTime:"2m",  unread:2, starred:true  },
  { id:2, leadName:"Emily Brown",      leadInitials:"EB", leadColor:"oklch(0.65 0.24 25)",  phone:"(321) 555-3456", address:"321 Elm St",      city:"Kissimmee",   state:"FL", stage:"Offer Made",     stageColor:"#f97316", lastMessage:"Sounds good! What time works for you?",               lastTime:"3h",  unread:0, starred:true  },
  { id:3, leadName:"Robert Anderson",  leadInitials:"RA", leadColor:"oklch(0.68 0.19 275)", phone:"(407) 555-1357", address:"147 Cedar St",    city:"Orlando",     state:"FL", stage:"Closed (Won)",   stageColor:"#10b981", lastMessage:"Thanks, the closing was smooth!",                     lastTime:"2d",  unread:0, starred:false },
  { id:4, leadName:"Lisa Martinez",    leadInitials:"LM", leadColor:"oklch(0.72 0.17 155)", phone:"(727) 555-6842", address:"258 Beach Rd",    city:"Clearwater",  state:"FL", stage:"Contacted",      stageColor:"#22c55e", lastMessage:"I'll call you back tomorrow morning",                  lastTime:"3d",  unread:0, starred:false },
  { id:5, leadName:"Michael Scott",    leadInitials:"MS", leadColor:"oklch(0.62 0.22 240)", phone:"(570) 555-9988", address:"1725 Slough Ave",city:"Scranton",    state:"PA", stage:"New Lead",       stageColor:"#3b82f6", lastMessage:"Would you buy my office building cash?",              lastTime:"4d",  unread:1, starred:false },
  { id:6, leadName:"Sarah Johnson",    leadInitials:"SJ", leadColor:"oklch(0.68 0.19 195)", phone:"(407) 555-5678", address:"456 Oak Ave",     city:"Orlando",     state:"FL", stage:"Attempting",     stageColor:"#f59e0b", lastMessage:"STOP",                                                  lastTime:"5d",  unread:0, starred:false, optedOut:true },
];

const MOCK_MESSAGES: Record<number, SmsMessage[]> = {
  1: [
    { id:1, direction:"outbound", content:"Hi John! This is Sarah from DealVanta Investments. We'd love to discuss your property at 123 Main St.", time:"9:30 AM", date:"May 18", status:"read" },
    { id:2, direction:"inbound",  content:"Oh hey! Yeah I've been thinking about selling. What's the cash offer?", time:"10:05 AM", date:"May 18" },
    { id:3, direction:"outbound", content:"We're looking at around $28,500 cash, fast 14-day close, zero closing costs for you.", time:"10:08 AM", date:"May 18", status:"read" },
    { id:4, direction:"inbound",  content:"Got your email offer too. Let me talk to my wife and get back to you.", time:"2:30 PM", date:"May 18" },
    { id:5, direction:"inbound",  content:"Hey, I'm interested in the offer you sent", time:"10:22 AM", date:"May 20" },
    { id:6, direction:"inbound",  content:"Can we negotiate a bit on the price?", time:"10:23 AM", date:"May 20" },
  ],
  2: [
    { id:1, direction:"outbound", content:"Hi Emily! We'd like to make a cash offer on your property at 321 Elm St. Is now a good time?", time:"9:00 AM", date:"May 19", status:"read" },
    { id:2, direction:"inbound",  content:"Hi! Yes I'm open to offers. How much are you offering?", time:"9:15 AM", date:"May 19" },
    { id:3, direction:"outbound", content:"We can offer $65,000 cash, close in 21 days, as-is condition.", time:"9:20 AM", date:"May 19", status:"read" },
    { id:4, direction:"inbound",  content:"Sounds good! What time works for you for a walkthrough?", time:"11:30 AM", date:"May 19" },
  ],
  6: [
    { id:1, direction:"outbound", content:"Hi Sarah, are you open to a cash offer for 456 Oak Ave?", time:"10:00 AM", date:"May 15", status:"delivered" },
    { id:2, direction:"inbound",  content:"STOP", time:"10:02 AM", date:"May 15" },
  ],
};

const TEMPLATES: SmsTemplate[] = [
  { id:1, title:"Initial Cash Offer Outreach", category:"Cold Outreach", text:"Hi {First_Name}, I came across your property at {Address}. Are you open to a quick cash offer with no agent fees or repairs required?", useCount:142 },
  { id:2, title:"Follow Up - Motivated Seller", category:"Follow Up", text:"Hey {First_Name}, just following up on our offer for {Address}. Did you have a chance to review the terms? Let me know if you have any questions!", useCount:98 },
  { id:3, title:"Walkthrough Confirmation", category:"Appointment", text:"Hi {First_Name}, confirming our property walkthrough tomorrow at {Time} for {Address}. Please reply YES to confirm!", useCount:64 },
  { id:4, title:"Contract Sent Reminder", category:"Offer Sent", text:"Hi {First_Name}, I just emailed over the purchase agreement for {Address}. Please take a look and let me know if everything looks good to sign!", useCount:41 },
];

const CAMPAIGN_BLASTS: BroadcastCampaign[] = [
  { id:1, name:"Tampa High-Equity Absentee Blast", audience:"Tampa Lead List (450 contacts)", sentCount:450, deliveredPct:98.2, responsePct:24.5, status:"completed", date:"May 16, 2024" },
  { id:2, name:"Orlando Code Violations Drip", audience:"Orlando Violations (180 contacts)", sentCount:180, deliveredPct:96.8, responsePct:31.0, status:"active", date:"May 19, 2024" },
  { id:3, name:"Re-engagement Disqualified Sellers", audience:"Disqualified 90d (320 contacts)", sentCount:0, deliveredPct:0, responsePct:0, status:"scheduled", date:"May 24, 2024" },
];

const SMS_STATS = [
  { label:"Total SMS Sent",    value:"4,892", delta:18.4, up:true,  icon:MessageCircle, color:"oklch(0.55 0.22 265)" },
  { label:"Delivery Rate",     value:"98.4%", delta:1.2,  up:true,  icon:ShieldCheck,   color:"oklch(0.72 0.17 155)" },
  { label:"Response Rate",     value:"28.6%", delta:4.5,  up:true,  icon:TrendingUp,    color:"oklch(0.65 0.24 300)" },
  { label:"Opt-Out Rate",      value:"1.8%",  delta:0.4,  up:false, icon:Ban,           color:"oklch(0.62 0.24 27)"  },
  { label:"Active Campaigns",  value:"3",     delta:0,    up:true,  icon:Zap,           color:"oklch(0.78 0.17 75)"  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function SmsPage() {
  const [activeTab, setActiveTab]         = useState<SmsTab>("inbox");
  const [convs, setConvs]                 = useState<SmsConversation[]>(MOCK_CONVERSATIONS);
  const [allMessages, setAllMessages]     = useState<Record<number, SmsMessage[]>>(MOCK_MESSAGES);
  const [selectedId, setSelectedId]       = useState<number>(1);
  const [search, setSearch]               = useState("");
  const [smsInput, setSmsInput]           = useState("");
  const [mobileView, setMobileView]       = useState<"list" | "thread">("list");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [toastMsg, setToastMsg]           = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedConv   = convs.find(c => c.id === selectedId) || convs[0];
  const messages       = allMessages[selectedId] || [];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, selectedId]);

  const handleSelectConv = (id: number) => {
    setSelectedId(id);
    setMobileView("thread");
    setConvs(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const handleSend = () => {
    if (!smsInput.trim()) return;
    if (selectedConv?.optedOut) {
      showToast("Cannot send SMS: Lead has opted out (STOP).");
      return;
    }

    const d = new Date();
    const timeStr = `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${d.getHours() >= 12 ? "PM" : "AM"}`;
    const newMsg: SmsMessage = {
      id: Date.now(),
      direction: "outbound",
      content: smsInput.trim(),
      time: timeStr,
      date: "Today",
      status: "delivered",
    };

    setAllMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg],
    }));

    setConvs(prev => prev.map(c => c.id === selectedId ? {
      ...c,
      lastMessage: smsInput.trim(),
      lastTime: "Just now",
    } : c));

    setSmsInput("");
  };

  const insertTemplate = (text: string) => {
    let replaced = text
      .replace("{First_Name}", selectedConv.leadName.split(" ")[0])
      .replace("{Address}", selectedConv.address)
      .replace("{Time}", "2:00 PM");
    setSmsInput(replaced);
    setShowTemplateModal(false);
  };

  const filteredConvs = convs.filter(c => {
    const matchSearch = search === "" ||
      c.leadName.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.address.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-background">
      {/* ── Top Bar with Tabs & Stats ───────────────────────────────── */}
      <div className="flex flex-col border-b border-border bg-card">
        {/* Title + Header buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">SMS Center</h1>
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600">Twilio Active</span>
            </div>
            <p className="text-xs text-muted-foreground">Manage SMS conversations, broadcast campaigns, and automated templates.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTemplateModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Templates
            </button>

            <button
              onClick={() => setShowBroadcastModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-primary/90 shadow-sm transition"
            >
              <SendHorizontal className="h-3.5 w-3.5" />
              New Broadcast Blast
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-none">
          {SMS_STATS.map(s => (
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

        {/* Nav Tabs */}
        <div className="flex border-t border-border px-6">
          {[
            { key: "inbox",     label: "Conversations", icon: MessageCircle, count: convs.reduce((s, c) => s + c.unread, 0) },
            { key: "broadcast", label: "Broadcast Blasts", icon: Zap },
            { key: "templates", label: "SMS Templates", icon: FileText },
            { key: "optouts",   label: "Opt-Outs / DNC", icon: Ban, count: convs.filter(c => c.optedOut).length },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as SmsTab)}
              className={cn(
                "relative flex items-center gap-2 py-3 px-4 text-xs font-semibold transition-colors",
                activeTab === t.key
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className="rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-bold text-primary">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Tab Content ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {activeTab === "inbox" && (
          <div className="flex flex-1 overflow-hidden">
            {/* LEFT: Conversation List */}
            <div className={cn("flex w-full md:w-80 shrink-0 flex-col border-r border-border bg-card", mobileView === "thread" ? "hidden md:flex" : "flex")}>
              {/* Search */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search name, phone, address..."
                    className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConvs.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border/50 px-4 py-3.5 text-left transition-colors",
                      selectedId === conv.id ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-accent/40",
                    )}
                  >
                    <div className="relative mt-0.5 shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: conv.leadColor }}>
                        {conv.leadInitials}
                      </div>
                      {conv.optedOut && (
                        <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white" title="Opted Out (STOP)">
                          <Ban className="h-2.5 w-2.5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs font-bold text-foreground">{conv.leadName}</span>
                        <span className="text-[10px] text-muted-foreground">{conv.lastTime}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{conv.address} · {conv.city}</p>
                      <p className={cn("mt-1 truncate text-xs", conv.unread > 0 ? "font-semibold text-foreground" : "text-muted-foreground")}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {conv.unread > 0 && (
                      <span className="mt-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white px-1">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Chat Thread */}
            <div className={cn("flex flex-1 flex-col overflow-hidden bg-muted/10", mobileView === "list" ? "hidden md:flex" : "flex")}>
              {/* Thread Header */}
              <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <button onClick={() => setMobileView("list")} className="md:hidden rounded-lg p-1 hover:bg-accent">
                    <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                  </button>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: selectedConv.leadColor }}>
                    {selectedConv.leadInitials}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-foreground">{selectedConv.leadName}</h2>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: selectedConv.stageColor + "22", color: selectedConv.stageColor }}>
                        {selectedConv.stage}
                      </span>
                      {selectedConv.optedOut && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">Opted Out (STOP)</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{selectedConv.phone} · {selectedConv.address}, {selectedConv.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground">
                    <Phone className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground">
                    <Mail className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex flex-col", msg.direction === "outbound" ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm text-xs leading-relaxed",
                        msg.direction === "outbound"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-card border border-border text-foreground rounded-bl-none",
                      )}
                    >
                      <p>{msg.content}</p>
                      <div className={cn("mt-1 flex items-center justify-end gap-1 text-[10px]", msg.direction === "outbound" ? "text-white/70" : "text-muted-foreground")}>
                        <span>{msg.time}</span>
                        {msg.direction === "outbound" && (
                          msg.status === "read" ? <CheckCheck className="h-3 w-3 text-white" /> : <Check className="h-3 w-3 opacity-70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Compose Area */}
              <div className="border-t border-border bg-card p-4">
                {selectedConv.optedOut ? (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    This recipient has unsubscribed via STOP. Outbound SMS is disabled.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Quick variables bar */}
                    <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-muted-foreground">
                      <span className="font-semibold text-xs">Insert Tag:</span>
                      <button onClick={() => setSmsInput(p => p + " " + selectedConv.leadName.split(" ")[0])} className="rounded-md border border-border px-2 py-0.5 hover:bg-accent">
                        {`{First_Name}`}
                      </button>
                      <button onClick={() => setSmsInput(p => p + " " + selectedConv.address)} className="rounded-md border border-border px-2 py-0.5 hover:bg-accent">
                        {`{Address}`}
                      </button>
                      <button onClick={() => setSmsInput(p => p + " $28,500")} className="rounded-md border border-border px-2 py-0.5 hover:bg-accent">
                        {`{Offer_Price}`}
                      </button>
                      <button onClick={() => setShowTemplateModal(true)} className="ml-auto text-primary font-semibold hover:underline">
                        Use Template →
                      </button>
                    </div>

                    {/* Text input */}
                    <div className="flex items-end gap-2">
                      <textarea
                        value={smsInput}
                        onChange={e => setSmsInput(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder={`Send SMS to ${selectedConv.leadName}... (Press Enter to send)`}
                        rows={2}
                        className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        onClick={handleSend}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl transition shadow-sm",
                          smsInput.trim() ? "bg-primary text-white hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed",
                        )}
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Broadcast Tab */}
        {activeTab === "broadcast" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Bulk SMS Campaigns</h2>
                <p className="text-xs text-muted-foreground">Send mass SMS blasts to filtered lead lists with carrier compliance throttle.</p>
              </div>
              <button onClick={() => setShowBroadcastModal(true)} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90">
                + Launch New Campaign
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CAMPAIGN_BLASTS.map(c => (
                <div key={c.id} className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{c.name}</h3>
                      <p className="text-xs text-muted-foreground">{c.audience}</p>
                    </div>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold capitalize",
                      c.status === "completed" ? "bg-green-100 text-green-700" : c.status === "active" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700",
                    )}>
                      {c.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center rounded-xl bg-muted/40 p-3">
                    <div>
                      <p className="text-xs font-bold text-foreground">{c.sentCount}</p>
                      <p className="text-[10px] text-muted-foreground">Sent</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-600">{c.deliveredPct}%</p>
                      <p className="text-[10px] text-muted-foreground">Delivered</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">{c.responsePct}%</p>
                      <p className="text-[10px] text-muted-foreground">Response</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>{c.date}</span>
                    <button className="font-semibold text-primary hover:underline">View Analytics →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">SMS Quick Templates</h2>
                <p className="text-xs text-muted-foreground">Pre-formatted text messages with dynamic tags for fast responses.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATES.map(t => (
                <div key={t.id} className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">{t.title}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{t.category}</span>
                  </div>
                  <p className="rounded-xl bg-muted/40 p-3 text-xs text-foreground/90 font-mono leading-relaxed">{t.text}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>Used {t.useCount} times</span>
                    <button onClick={() => { insertTemplate(t.text); setActiveTab("inbox"); }} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition">
                      Use in Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Opt-outs Tab */}
        {activeTab === "optouts" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Do Not Contact (DNC / Opt-outs)</h2>
              <p className="text-xs text-muted-foreground">List of leads who responded with STOP or requested no further SMS communications.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-3">Lead Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Property</th>
                    <th className="p-3">Opt-out Reason</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {convs.filter(c => c.optedOut).map(c => (
                    <tr key={c.id} className="border-b border-border/50">
                      <td className="p-3 font-semibold text-foreground">{c.leadName}</td>
                      <td className="p-3 text-muted-foreground">{c.phone}</td>
                      <td className="p-3 text-muted-foreground">{c.address}, {c.city}</td>
                      <td className="p-3"><span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">STOP Auto-Reply</span></td>
                      <td className="p-3 text-muted-foreground">May 15, 2024</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────────────── */}
      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Select SMS Template</h3>
              <button onClick={() => setShowTemplateModal(false)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {TEMPLATES.map(t => (
                <div key={t.id} onClick={() => insertTemplate(t.text)} className="cursor-pointer rounded-xl border border-border p-3.5 hover:border-primary hover:bg-primary/5 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground">{t.title}</span>
                    <span className="text-[10px] text-muted-foreground">{t.category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.text}</p>
                </div>
              ))}
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
