import { useState, useRef, useEffect } from "react";
import {
  Mail, Search, Send, Plus, CheckCheck, Check, Clock, Filter, Phone,
  MoreHorizontal, User, Building2, Sparkles, Zap, FileText, Settings,
  Copy, CheckCircle2, AlertCircle, ChevronRight, X, ArrowLeft, Users,
  SendHorizontal, Paperclip, Smile, RefreshCw, TrendingUp, Ban, Star,
  Archive, Trash2, Eye, ExternalLink, CornerUpLeft, Reply, Forward,
  FileSpreadsheet, ShieldCheck, Inbox, ChevronDown, CheckSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type EmailTab = "inbox" | "sent" | "templates" | "sequences";

interface EmailMessage {
  id: number;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  direction: "inbound" | "outbound";
  subject: string;
  body: string;
  time: string;
  date: string;
  opened?: boolean;
  openedCount?: number;
  clickedCount?: number;
  attachments?: { name: string; size: string; type: string }[];
}

interface EmailThread {
  id: number;
  leadName: string;
  leadInitials: string;
  leadColor: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  stage: string;
  stageColor: string;
  subject: string;
  lastSnippet: string;
  lastTime: string;
  unread: number;
  starred: boolean;
  archived: boolean;
  messages: EmailMessage[];
}

interface EmailTemplate {
  id: number;
  title: string;
  category: "Offer Letter" | "Follow Up" | "Contract" | "Walkthrough";
  subject: string;
  body: string;
  useCount: number;
}

interface EmailSequence {
  id: number;
  name: string;
  targetAudience: string;
  stepCount: number;
  activeEnrolled: number;
  openRatePct: number;
  replyRatePct: number;
  status: "active" | "paused";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_THREADS: EmailThread[] = [
  {
    id: 1,
    leadName: "John Smith",
    leadInitials: "JS",
    leadColor: "oklch(0.55 0.22 265)",
    email: "john.smith@gmail.com",
    phone: "(813) 555-2234",
    address: "123 Main St",
    city: "Tampa",
    state: "FL",
    stage: "Qualified",
    stageColor: "#a855f7",
    subject: "Formal Cash Offer — 123 Main St, Tampa FL",
    lastSnippet: "Hi Alex, thanks for sending over the offer. I looked over the terms...",
    lastTime: "10:24 AM",
    unread: 1,
    starred: true,
    archived: false,
    messages: [
      {
        id: 101,
        senderName: "Alex Carter (DealVanta)",
        senderEmail: "alex@dealvanta.com",
        recipientName: "John Smith",
        recipientEmail: "john.smith@gmail.com",
        direction: "outbound",
        subject: "Formal Cash Offer — 123 Main St, Tampa FL",
        body: "Hi John,\n\nIt was great speaking with you earlier! As discussed, DealVanta Investments is pleased to present a formal written cash offer for your property at 123 Main St, Tampa, FL 33602.\n\nOffer Details:\n- Purchase Price: $28,500 USD (Cash)\n- Closing Timeline: 14 Days (or date of your choice)\n- Closing Costs: 100% covered by buyer\n- Repairs Required: None (As-Is condition)\n\nPlease review the attached Purchase Agreement draft. Feel free to reply directly to this email or call me at (813) 555-0199.",
        time: "9:15 AM",
        date: "May 18, 2024",
        opened: true,
        openedCount: 4,
        clickedCount: 2,
        attachments: [
          { name: "123_Main_St_Offer_Agreement.pdf", size: "245 KB", type: "pdf" }
        ],
      },
      {
        id: 102,
        senderName: "John Smith",
        senderEmail: "john.smith@gmail.com",
        recipientName: "Alex Carter",
        recipientEmail: "alex@dealvanta.com",
        direction: "inbound",
        subject: "Re: Formal Cash Offer — 123 Main St, Tampa FL",
        body: "Hi Alex, thanks for sending over the offer. I looked over the terms with my wife. The $28,500 cash price is close to what we wanted. Is there any flexibility to push it to $30,000 if we close by the end of next week?\n\nLet me know if that works for your team.",
        time: "10:24 AM",
        date: "May 18, 2024",
      },
    ],
  },
  {
    id: 2,
    leadName: "Emily Brown",
    leadInitials: "EB",
    leadColor: "oklch(0.65 0.24 25)",
    email: "emily.brown@yahoo.com",
    phone: "(321) 555-3456",
    address: "321 Elm St",
    city: "Kissimmee",
    state: "FL",
    stage: "Offer Made",
    stageColor: "#f97316",
    subject: "Walkthrough Confirmation & Property Access — 321 Elm St",
    lastSnippet: "Perfect! I will leave the lockbox code on the front door for tomorrow...",
    lastTime: "Yesterday",
    unread: 0,
    starred: true,
    archived: false,
    messages: [
      {
        id: 201,
        senderName: "Alex Carter (DealVanta)",
        senderEmail: "alex@dealvanta.com",
        recipientName: "Emily Brown",
        recipientEmail: "emily.brown@yahoo.com",
        direction: "outbound",
        subject: "Walkthrough Confirmation & Property Access — 321 Elm St",
        body: "Hi Emily,\n\nConfirming our team walkthrough for 321 Elm St tomorrow afternoon at 2:00 PM. Will someone be on site to let our inspector in, or should we use the lockbox?",
        time: "2:00 PM",
        date: "May 17, 2024",
        opened: true,
        openedCount: 2,
      },
      {
        id: 202,
        senderName: "Emily Brown",
        senderEmail: "emily.brown@yahoo.com",
        recipientName: "Alex Carter",
        recipientEmail: "alex@dealvanta.com",
        direction: "inbound",
        subject: "Re: Walkthrough Confirmation & Property Access — 321 Elm St",
        body: "Perfect! I will leave the lockbox code on the front door for tomorrow. Code is 4821. Call me if you have any trouble getting in.",
        time: "4:15 PM",
        date: "May 17, 2024",
      },
    ],
  },
  {
    id: 3,
    leadName: "Lisa Martinez",
    leadInitials: "LM",
    leadColor: "oklch(0.72 0.17 155)",
    email: "lisa.martinez@outlook.com",
    phone: "(727) 555-6842",
    address: "258 Beach Rd",
    city: "Clearwater",
    state: "FL",
    stage: "Contacted",
    stageColor: "#22c55e",
    subject: "Cash Buyer Introduction — DealVanta Investments",
    lastSnippet: "Hi Lisa, following up on our phone conversation regarding your property...",
    lastTime: "May 15",
    unread: 0,
    starred: false,
    archived: false,
    messages: [
      {
        id: 301,
        senderName: "Lisa Martinez (DealVanta)",
        senderEmail: "lisa@dealvanta.com",
        recipientName: "Lisa Martinez",
        recipientEmail: "lisa.martinez@outlook.com",
        direction: "outbound",
        subject: "Cash Buyer Introduction — DealVanta Investments",
        body: "Hi Lisa,\n\nFollowing up on our phone conversation regarding your vacant parcel at 258 Beach Rd, Clearwater. As promised, here is our company information and recent property purchases in Pinellas County.\n\nLooking forward to working together!",
        time: "11:00 AM",
        date: "May 15, 2024",
        opened: true,
        openedCount: 1,
      },
    ],
  },
];

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 1,
    title: "Official Written Cash Offer",
    category: "Offer Letter",
    subject: "Formal Cash Offer for {Address} — DealVanta Investments",
    body: "Hi {First_Name},\n\nThank you for taking the time to share details about your property at {Address}.\n\nWe are pleased to submit a formal cash offer of {Offer_Amount} with no repairs needed, no inspection contingencies, and no real estate commissions.\n\nKey Terms:\n- Offer Price: {Offer_Amount}\n- Earnest Deposit: $2,500\n- Closing Date: Within 14-21 days\n\nPlease let me know if you would like us to send the electronic contract for signature.",
    useCount: 184,
  },
  {
    id: 2,
    title: "Unresponsive Seller Follow Up",
    category: "Follow Up",
    subject: "Checking in on {Address}",
    body: "Hi {First_Name},\n\nI tried reaching you earlier regarding your property at {Address}. Are you still interested in selling for a cash offer, or have your plans changed?\n\nIf you're still open to offers, let me know when you have 5 minutes to chat.",
    useCount: 126,
  },
  {
    id: 3,
    title: "Title & Closing Instructions",
    category: "Contract",
    subject: "Closing Instructions & Title Company Intro — {Address}",
    body: "Hi {First_Name},\n\nGreat news! We have opened escrow with Preferred Title Company for {Address}.\n\nThe escrow officer will reach out shortly to gather your preferred payout details (wire transfer or cashier's check).\n\nFeel free to contact me with any questions!",
    useCount: 75,
  },
];

const EMAIL_SEQUENCES: EmailSequence[] = [
  { id: 1, name: "Cold Off-Market Absentee Seller Sequence", targetAudience: "Absentee Owners (350 leads)", stepCount: 4, activeEnrolled: 142, openRatePct: 48.5, replyRatePct: 18.2, status: "active" },
  { id: 2, name: "Pre-Foreclosure Motivated Seller Drip", targetAudience: "Lis Pendens Leads (85 leads)", stepCount: 5, activeEnrolled: 42, openRatePct: 62.0, replyRatePct: 24.8, status: "active" },
  { id: 3, name: "Post-Offer 30-Day Nurture Campaign", targetAudience: "Offer Made - Pending Reply (95 leads)", stepCount: 3, activeEnrolled: 28, openRatePct: 54.1, replyRatePct: 15.0, status: "paused" },
];

const EMAIL_STATS = [
  { label: "Emails Sent",      value: "3,420", delta: 14.2, up: true,  icon: Mail,         color: "oklch(0.55 0.22 265)" },
  { label: "Open Rate",        value: "52.4%", delta: 3.8,  up: true,  icon: Eye,          color: "oklch(0.72 0.17 155)" },
  { label: "Reply Rate",       value: "19.8%", delta: 2.5,  up: true,  icon: Reply,        color: "oklch(0.65 0.24 300)" },
  { label: "Click Rate",       value: "11.4%", delta: 0.9,  up: true,  icon: ExternalLink, color: "oklch(0.78 0.17 75)"  },
  { label: "Active Sequences", value: "2",     delta: 0,    up: true,  icon: Zap,          color: "oklch(0.68 0.19 275)" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function EmailPage() {
  const [activeTab, setActiveTab]         = useState<EmailTab>("inbox");
  const [threads, setThreads]             = useState<EmailThread[]>(MOCK_THREADS);
  const [selectedId, setSelectedId]       = useState<number>(1);
  const [search, setSearch]               = useState("");
  const [mobileView, setMobileView]       = useState<"list" | "thread">("list");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [replyText, setReplyText]         = useState("");
  const [toastMsg, setToastMsg]           = useState<string | null>(null);

  // Compose form state
  const [composeTo, setComposeTo]         = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody]     = useState("");

  const selectedThread = threads.find(t => t.id === selectedId) || threads[0];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSelectThread = (id: number) => {
    setSelectedId(id);
    setMobileView("thread");
    setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: 0 } : t));
  };

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads(prev => prev.map(t => t.id === id ? { ...t, starred: !t.starred } : t));
  };

  const archiveThread = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads(prev => prev.map(t => t.id === id ? { ...t, archived: true } : t));
    showToast("Email thread archived");
  };

  const sendReply = () => {
    if (!replyText.trim()) return;

    const d = new Date();
    const timeStr = `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${d.getHours() >= 12 ? "PM" : "AM"}`;
    const newMsg: EmailMessage = {
      id: Date.now(),
      senderName: "Alex Carter (DealVanta)",
      senderEmail: "alex@dealvanta.com",
      recipientName: selectedThread.leadName,
      recipientEmail: selectedThread.email,
      direction: "outbound",
      subject: `Re: ${selectedThread.subject}`,
      body: replyText.trim(),
      time: timeStr,
      date: "Today",
      opened: false,
    };

    setThreads(prev => prev.map(t => t.id === selectedId ? {
      ...t,
      lastSnippet: replyText.trim(),
      lastTime: "Just now",
      messages: [...t.messages, newMsg],
    } : t));

    setReplyText("");
    showToast(`Reply sent to ${selectedThread.leadName}`);
  };

  const handleComposeSend = () => {
    if (!composeTo.trim() || !composeBody.trim()) return;

    const newThread: EmailThread = {
      id: Date.now(),
      leadName: composeTo.split("@")[0].replace(".", " "),
      leadInitials: composeTo.substring(0, 2).toUpperCase(),
      leadColor: "oklch(0.55 0.22 265)",
      email: composeTo,
      phone: "(555) 000-0000",
      address: "Property Address",
      city: "City",
      state: "FL",
      stage: "New Lead",
      stageColor: "#3b82f6",
      subject: composeSubject || "(No subject)",
      lastSnippet: composeBody.trim(),
      lastTime: "Just now",
      unread: 0,
      starred: false,
      archived: false,
      messages: [
        {
          id: Date.now() + 1,
          senderName: "Alex Carter (DealVanta)",
          senderEmail: "alex@dealvanta.com",
          recipientName: composeTo,
          recipientEmail: composeTo,
          direction: "outbound",
          subject: composeSubject || "(No subject)",
          body: composeBody.trim(),
          time: "Just now",
          date: "Today",
          opened: false,
        },
      ],
    };

    setThreads(prev => [newThread, ...prev]);
    setSelectedId(newThread.id);
    setShowComposeModal(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    showToast("New email campaign sent!");
  };

  const insertTemplate = (template: EmailTemplate) => {
    const replacedSubject = template.subject
      .replace("{Address}", selectedThread.address);

    const replacedBody = template.body
      .replace("{First_Name}", selectedThread.leadName.split(" ")[0])
      .replace("{Address}", selectedThread.address)
      .replace("{Offer_Amount}", "$28,500 Cash");

    if (showComposeModal) {
      setComposeSubject(replacedSubject);
      setComposeBody(replacedBody);
    } else {
      setReplyText(replacedBody);
    }

    setShowTemplateModal(false);
  };

  const filteredThreads = threads.filter(t => {
    if (t.archived) return false;
    const matchSearch = search === "" ||
      t.leadName.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-background">
      {/* ── Top Bar with Header + Stats + Tabs ──────────────────────── */}
      <div className="flex flex-col border-b border-border bg-card">
        {/* Title + Action buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Email Center</h1>
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-primary">Google Workspace Sync</span>
            </div>
            <p className="text-xs text-muted-foreground">Manage official offer letters, contract emails, and drip sequences.</p>
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
              onClick={() => {
                setComposeTo(selectedThread.email);
                setComposeSubject(`DealVanta Offer: ${selectedThread.address}`);
                setShowComposeModal(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-primary/90 shadow-sm transition"
            >
              <Plus className="h-4 w-4" />
              Compose New Email
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-none">
          {EMAIL_STATS.map(s => (
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
            { key: "inbox",     label: "Email Inbox", icon: Inbox, count: threads.reduce((s, t) => s + t.unread, 0) },
            { key: "sent",      label: "Sent Emails", icon: Send },
            { key: "templates", label: "Offer Templates", icon: FileText },
            { key: "sequences", label: "Automated Drip Sequences", icon: Zap },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as EmailTab)}
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
            {/* LEFT: Email Threads List */}
            <div className={cn("flex w-full md:w-80 shrink-0 flex-col border-r border-border bg-card", mobileView === "thread" ? "hidden md:flex" : "flex")}>
              {/* Search */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search subject, email, address..."
                    className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Thread List */}
              <div className="flex-1 overflow-y-auto">
                {filteredThreads.map(thread => (
                  <div
                    key={thread.id}
                    onClick={() => handleSelectThread(thread.id)}
                    className={cn(
                      "group flex w-full cursor-pointer flex-col gap-1 border-b border-border/50 px-4 py-3.5 text-left transition-colors",
                      selectedId === thread.id ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-accent/40",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: thread.leadColor }}>
                          {thread.leadInitials}
                        </div>
                        <span className="truncate text-xs font-bold text-foreground">{thread.leadName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={(e) => toggleStar(thread.id, e)} className="text-muted-foreground hover:text-amber-500">
                          <Star className={cn("h-3.5 w-3.5", thread.starred && "fill-amber-400 text-amber-400")} />
                        </button>
                        <span className="text-[10px] text-muted-foreground">{thread.lastTime}</span>
                      </div>
                    </div>

                    <p className="truncate text-xs font-bold text-foreground/90 mt-1">{thread.subject}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{thread.lastSnippet}</p>

                    <div className="flex items-center justify-between mt-2 text-[10px]">
                      <span className="rounded-full px-2 py-0.5 font-bold" style={{ backgroundColor: thread.stageColor + "22", color: thread.stageColor }}>
                        {thread.stage}
                      </span>
                      <span className="text-muted-foreground truncate">{thread.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Thread Detail & Messages */}
            <div className={cn("flex flex-1 flex-col overflow-hidden bg-muted/10", mobileView === "list" ? "hidden md:flex" : "flex")}>
              {/* Thread Header */}
              <div className="flex flex-col border-b border-border bg-card px-6 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setMobileView("list")} className="md:hidden rounded-lg p-1 hover:bg-accent">
                      <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <h2 className="text-base font-bold text-foreground">{selectedThread.subject}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={(e) => archiveThread(selectedThread.id, e)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground" title="Archive">
                      <Archive className="h-3.5 w-3.5" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">{selectedThread.leadName}</span>
                    <span>&lt;{selectedThread.email}&gt;</span>
                  </div>
                  <span>{selectedThread.address}, {selectedThread.city}</span>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {selectedThread.messages.map((msg, i) => (
                  <div key={msg.id} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                    {/* Message Card Header */}
                    <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white bg-primary">
                          {msg.senderName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">{msg.senderName}</p>
                          <p className="text-[11px] text-muted-foreground">to {msg.recipientName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {msg.opened && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                            <Eye className="h-3 w-3" /> Opened {msg.openedCount}x
                          </span>
                        )}
                        <span>{msg.date} · {msg.time}</span>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="p-5 text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.body}
                    </div>

                    {/* Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="border-t border-border/50 bg-muted/20 px-5 py-3">
                        <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Attachments ({msg.attachments.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.attachments.map(att => (
                            <div key={att.name} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-xs">
                              <FileText className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-xs font-medium text-foreground">{att.name}</p>
                                <p className="text-[10px] text-muted-foreground">{att.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reply Compose Bar */}
              <div className="border-t border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">Replying to {selectedThread.email}</span>
                  <button onClick={() => setShowTemplateModal(true)} className="text-primary font-semibold hover:underline">
                    Insert Offer Template →
                  </button>
                </div>

                <div className="flex items-start gap-2">
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Write your email reply..."
                    rows={3}
                    className="flex-1 resize-none rounded-xl border border-border bg-background p-3 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                      <Paperclip className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={sendReply}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm transition",
                      replyText.trim() ? "bg-primary hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed",
                    )}
                  >
                    <Send className="h-3.5 w-3.5" /> Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Email Offer Templates</h2>
                <p className="text-xs text-muted-foreground">Standardized contract letters and follow-up templates for real estate acquisitions.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EMAIL_TEMPLATES.map(t => (
                <div key={t.id} className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">{t.title}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{t.category}</span>
                  </div>
                  <p className="text-xs font-bold text-foreground">{t.subject}</p>
                  <p className="rounded-xl bg-muted/40 p-3 text-xs text-foreground/90 font-mono leading-relaxed whitespace-pre-wrap">{t.body}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>Used {t.useCount} times</span>
                    <button onClick={() => { insertTemplate(t); setActiveTab("inbox"); }} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition">
                      Use in Inbox
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sequences Tab */}
        {activeTab === "sequences" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Automated Drip Email Sequences</h2>
                <p className="text-xs text-muted-foreground">Multi-step automated email workflows for off-market seller lead nurture.</p>
              </div>
              <button onClick={() => showToast("Sequence builder coming soon")} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90">
                + Create New Sequence
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {EMAIL_SEQUENCES.map(seq => (
                <div key={seq.id} className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{seq.name}</h3>
                      <p className="text-xs text-muted-foreground">{seq.targetAudience}</p>
                    </div>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold capitalize",
                      seq.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700",
                    )}>
                      {seq.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center rounded-xl bg-muted/40 p-3">
                    <div>
                      <p className="text-xs font-bold text-foreground">{seq.activeEnrolled}</p>
                      <p className="text-[10px] text-muted-foreground">Enrolled</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-600">{seq.openRatePct}%</p>
                      <p className="text-[10px] text-muted-foreground">Open Rate</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">{seq.replyRatePct}%</p>
                      <p className="text-[10px] text-muted-foreground">Reply Rate</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>{seq.stepCount} Automated Email Steps</span>
                    <button className="font-semibold text-primary hover:underline">Edit Workflow →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Compose Modal ───────────────────────────────────────────── */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Compose Email</h3>
              <button onClick={() => setShowComposeModal(false)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">To (Recipient Email)</label>
                <input
                  value={composeTo}
                  onChange={e => setComposeTo(e.target.value)}
                  placeholder="seller@gmail.com"
                  className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Subject</label>
                <input
                  value={composeSubject}
                  onChange={e => setComposeSubject(e.target.value)}
                  placeholder="Formal Cash Offer for Property..."
                  className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email Message Body</label>
                <textarea
                  value={composeBody}
                  onChange={e => setComposeBody(e.target.value)}
                  rows={6}
                  placeholder="Type your official email message..."
                  className="w-full resize-none rounded-xl border border-border bg-background p-3 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <button onClick={() => setShowTemplateModal(true)} className="text-xs font-semibold text-primary hover:underline">
                + Select Offer Template
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowComposeModal(false)} className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold hover:bg-accent">
                  Cancel
                </button>
                <button onClick={handleComposeSend} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90">
                  Send Email Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Select Email Offer Template</h3>
              <button onClick={() => setShowTemplateModal(false)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {EMAIL_TEMPLATES.map(t => (
                <div key={t.id} onClick={() => insertTemplate(t)} className="cursor-pointer rounded-xl border border-border p-3.5 hover:border-primary hover:bg-primary/5 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground">{t.title}</span>
                    <span className="text-[10px] text-muted-foreground">{t.category}</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground/80 mb-1">{t.subject}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.body}</p>
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
