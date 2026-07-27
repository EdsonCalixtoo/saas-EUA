import { useState, useRef, useEffect } from "react";
import {
  Search, Phone, MessageCircle, Mail, PhoneIncoming, PhoneOutgoing,
  PhoneMissed, Play, Send, ChevronDown, MoreHorizontal,
  Star, Archive, CheckCheck, Check, Plus, X,
  TrendingUp, Inbox, Pause, SkipBack, Download,
  Pencil, Trash2, Filter, RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type ChannelFilter = "all" | "sms" | "call" | "email";
type Direction = "inbound" | "outbound";
type ComposeType = "sms" | "email";

interface Conversation {
  id: number;
  leadName: string;
  leadInitials: string;
  leadColor: string;
  address: string;
  city: string;
  state: string;
  stage: string;
  stageColor: string;
  phone: string;
  email: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  channel: "sms" | "call" | "email";
  starred: boolean;
  archived: boolean;
}

interface Message {
  id: number;
  type: "sms" | "call" | "email";
  direction: Direction;
  content: string;
  time: string;
  date: string;
  duration?: string;
  subject?: string;
  repName?: string;
  read: boolean;
  status?: "sent" | "delivered" | "read";
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
const INIT_CONVS: Conversation[] = [
  { id:1, leadName:"John Smith",      leadInitials:"JS", leadColor:"oklch(0.55 0.22 265)", address:"123 Main St",  city:"Tampa",          state:"FL", stage:"Qualified",        stageColor:"#a855f7", phone:"(813) 555-2234", email:"john.smith@email.com",    lastMessage:"Can we negotiate a bit on the price?",         lastTime:"2m",       unread:2, channel:"sms",   starred:true,  archived:false },
  { id:2, leadName:"Sarah Johnson",   leadInitials:"SJ", leadColor:"oklch(0.68 0.19 195)", address:"456 Oak Ave",  city:"Orlando",        state:"FL", stage:"Contacted",         stageColor:"#22c55e", phone:"(407) 555-5678", email:"sarah.j@email.com",       lastMessage:"Missed call — (407) 555-5678",                 lastTime:"15m",      unread:1, channel:"call",  starred:false, archived:false },
  { id:3, leadName:"Mike Davis",      leadInitials:"MD", leadColor:"oklch(0.72 0.17 155)", address:"789 Pine Rd",  city:"Lakeland",       state:"FL", stage:"New Lead",          stageColor:"#3b82f6", phone:"(863) 555-9092", email:"mike.davis@email.com",    lastMessage:"I'm available Tuesday afternoon.",              lastTime:"1h",       unread:0, channel:"email", starred:false, archived:false },
  { id:4, leadName:"Emily Brown",     leadInitials:"EB", leadColor:"oklch(0.65 0.24 25)",  address:"321 Elm St",   city:"Kissimmee",      state:"FL", stage:"Offer Made",        stageColor:"#f97316", phone:"(321) 555-3456", email:"emily.b@email.com",       lastMessage:"Sounds good! What time works for you?",         lastTime:"3h",       unread:0, channel:"sms",   starred:true,  archived:false },
  { id:5, leadName:"David Wilson",    leadInitials:"DW", leadColor:"oklch(0.78 0.17 75)",  address:"654 Maple Dr", city:"Tampa",          state:"FL", stage:"Under Contract",    stageColor:"#6366f1", phone:"(813) 555-7890", email:"d.wilson@email.com",      lastMessage:"Called — 4m 12s",                              lastTime:"5h",       unread:0, channel:"call",  starred:false, archived:false },
  { id:6, leadName:"Jennifer Taylor", leadInitials:"JT", leadColor:"oklch(0.55 0.22 265)", address:"987 Palm Ln",  city:"Sarasota",       state:"FL", stage:"Attempting Contact",stageColor:"#f59e0b", phone:"(941) 555-2468", email:"jen.taylor@email.com",    lastMessage:"I have another investor interested too.",       lastTime:"Yesterday",unread:3, channel:"email", starred:false, archived:false },
  { id:7, leadName:"Robert Anderson", leadInitials:"RA", leadColor:"oklch(0.68 0.19 275)", address:"147 Cedar St", city:"Orlando",        state:"FL", stage:"Closed (Won)",      stageColor:"#10b981", phone:"(407) 555-1357", email:"rob.anderson@email.com",  lastMessage:"Thanks, the closing was smooth!",               lastTime:"2d",       unread:0, channel:"sms",   starred:false, archived:false },
  { id:8, leadName:"Lisa Martinez",   leadInitials:"LM", leadColor:"oklch(0.72 0.17 155)", address:"258 Beach Rd", city:"Clearwater",     state:"FL", stage:"Contacted",         stageColor:"#22c55e", phone:"(727) 555-6842", email:"lisa.m@email.com",        lastMessage:"I'll call you back tomorrow morning",           lastTime:"3d",       unread:0, channel:"sms",   starred:false, archived:false },
];

const INIT_MESSAGES: Record<number, Message[]> = {
  1: [
    { id:1, type:"call",  direction:"outbound", content:"Outbound call",          time:"9:12 AM",  date:"May 18", duration:"2m 34s",  repName:"Sarah Johnson", read:true  },
    { id:2, type:"sms",   direction:"outbound", content:"Hi John! This is Sarah from Acme Investments. We'd love to discuss your property at 123 Main St.", time:"9:30 AM", date:"May 18", read:true, status:"read" },
    { id:3, type:"sms",   direction:"inbound",  content:"Oh hey! Yeah I've been thinking about selling. What's the offer?", time:"10:05 AM", date:"May 18", read:true },
    { id:4, type:"sms",   direction:"outbound", content:"We're looking at around $28,500 cash, fast close, no repairs needed on your end.", time:"10:08 AM", date:"May 18", read:true, status:"delivered" },
    { id:5, type:"email", direction:"outbound", content:"Please find attached our formal offer letter for 123 Main St, Tampa FL 33602.", time:"11:00 AM", date:"May 18", subject:"Formal Offer — 123 Main St, Tampa FL", repName:"Sarah Johnson", read:true },
    { id:6, type:"sms",   direction:"inbound",  content:"Got the email. Let me talk to my wife and get back to you.", time:"2:30 PM",  date:"May 18", read:true },
    { id:7, type:"call",  direction:"inbound",  content:"Inbound call", time:"4:15 PM", date:"May 19", duration:"5m 48s", read:true },
    { id:8, type:"sms",   direction:"inbound",  content:"Hey, I'm interested in the offer you sent", time:"10:22 AM", date:"May 20", read:false },
    { id:9, type:"sms",   direction:"inbound",  content:"Can we negotiate a bit on the price?", time:"10:23 AM", date:"May 20", read:false },
  ],
  2: [
    { id:1, type:"sms",  direction:"outbound", content:"Hi Sarah, this is Alex from Acme Investments. Would you be open to a cash offer for 456 Oak Ave?", time:"3:00 PM", date:"May 17", read:true, status:"delivered" },
    { id:2, type:"call", direction:"outbound", content:"Outbound call — no answer", time:"10:00 AM", date:"May 18", duration:"voicemail", repName:"Mike Davis", read:true },
    { id:3, type:"call", direction:"inbound",  content:"Missed call", time:"2:15 PM", date:"May 20", duration:"—", read:false },
  ],
  3: [
    { id:1, type:"email", direction:"outbound", content:"Dear Mike, we came across your property at 789 Pine Rd and are interested in making a cash offer.", time:"9:00 AM", date:"May 15", subject:"Interested in Your Property at 789 Pine Rd", repName:"Emily Brown", read:true },
    { id:2, type:"email", direction:"inbound",  content:"Hi, thanks for reaching out. I've been considering selling. I'm available Tuesday afternoon.", time:"6:30 PM", date:"May 18", subject:"Re: Interested in Your Property — Available Tuesday", read:false },
  ],
  4: [
    { id:1, type:"sms", direction:"outbound", content:"Hi Emily! We'd like to make an offer on your property at 321 Elm St. Is now a good time?", time:"9:00 AM", date:"May 19", read:true, status:"read" },
    { id:2, type:"sms", direction:"inbound",  content:"Hi! Yes I'm interested. Tell me more.", time:"9:15 AM", date:"May 19", read:true },
    { id:3, type:"sms", direction:"outbound", content:"We're offering $65,000 cash, close in 21 days, you pay no fees.", time:"9:20 AM", date:"May 19", read:true, status:"read" },
    { id:4, type:"sms", direction:"inbound",  content:"Sounds good! What time works for you?", time:"11:30 AM", date:"May 19", read:false },
  ],
  5: [
    { id:1, type:"call", direction:"outbound", content:"Outbound call — Connected", time:"2:00 PM", date:"May 18", duration:"4m 12s", repName:"Alex Carter", read:true },
  ],
  6: [
    { id:1, type:"email", direction:"outbound", content:"Dear Jennifer, we sent you a letter about your property at 987 Palm Ln. We'd love to make a fair cash offer.", time:"—", date:"May 10", subject:"Cash Offer for Your Property at 987 Palm Ln", repName:"Lisa Martinez", read:true },
    { id:2, type:"email", direction:"inbound",  content:"Hi, I saw your letter. I'm curious about the offer. How does this process work?", time:"8:44 AM", date:"May 20", subject:"Re: About your letter...", read:false },
    { id:3, type:"email", direction:"inbound",  content:"Also, would you cover closing costs?", time:"8:46 AM", date:"May 20", subject:"Re: Closing costs", read:false },
    { id:4, type:"email", direction:"inbound",  content:"I have another investor interested too, just so you know.", time:"9:02 AM", date:"May 20", subject:"Re: Other offer", read:false },
  ],
  7: [
    { id:1, type:"sms", direction:"outbound", content:"Robert, congratulations on the close! It was a pleasure working with you.", time:"3:00 PM", date:"May 15", read:true, status:"read" },
    { id:2, type:"sms", direction:"inbound",  content:"Thanks, the closing was smooth!", time:"4:30 PM", date:"May 15", read:true },
  ],
  8: [
    { id:1, type:"sms", direction:"outbound", content:"Hi Lisa! We're interested in your property at 258 Beach Rd. Open to a cash offer?", time:"10:00 AM", date:"May 17", read:true, status:"delivered" },
    { id:2, type:"sms", direction:"inbound",  content:"I'll call you back tomorrow morning", time:"6:00 PM", date:"May 17", read:true },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const CHANNEL_STYLE = {
  sms:   { icon: MessageCircle, color: "text-green-600",  bg: "bg-green-50",   label: "SMS"   },
  call:  { icon: Phone,         color: "text-blue-600",   bg: "bg-blue-50",    label: "Call"  },
  email: { icon: Mail,          color: "text-purple-600", bg: "bg-purple-50",  label: "Email" },
};

const now = () => {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2,"0")} ${d.getHours()<12?"AM":"PM"}`;
};

// ─── Waveform (for call messages) ─────────────────────────────────────────────
const WAVE = Array.from({length:40}, () => 15 + Math.random() * 85);

function MiniWaveform() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<NodeJS.Timeout|null>(null);
  useEffect(() => {
    if (playing) { ref.current = setInterval(() => setProgress(p => { if(p>=100){setPlaying(false);return 0;} return p+1; }), 80); }
    else { if(ref.current) clearInterval(ref.current); }
    return () => { if(ref.current) clearInterval(ref.current); };
  }, [playing]);
  return (
    <div className="flex items-center gap-2 mt-2">
      <button onClick={() => setPlaying(!playing)} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90">
        {playing ? <Pause className="h-3 w-3"/> : <Play className="h-3 w-3 translate-x-px"/>}
      </button>
      <div className="flex flex-1 cursor-pointer items-end gap-px" style={{height:24}} onClick={e => { const r=e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX-r.left)/r.width)*100); }}>
        {WAVE.map((h,i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ height:`${h}%`, backgroundColor: (i/WAVE.length)*100<=progress ? "oklch(0.55 0.22 265)" : "oklch(0.82 0.01 260)" }} />
        ))}
      </div>
      <button className="text-muted-foreground hover:text-foreground transition"><Download className="h-3.5 w-3.5"/></button>
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
  const isOut = msg.direction === "outbound";

  if (msg.type === "call") {
    const missed = msg.content.toLowerCase().includes("missed") || msg.content.toLowerCase().includes("no answer");
    const Icon = missed ? PhoneMissed : isOut ? PhoneOutgoing : PhoneIncoming;
    const color = missed ? "text-red-500" : isOut ? "text-blue-500" : "text-green-500";
    const hasAudio = !missed && msg.duration && msg.duration !== "—" && !msg.duration.includes("voicemail");
    return (
      <div className="flex justify-center my-2">
        <div className="flex flex-col items-center w-full max-w-sm rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 w-full">
            <Icon className={cn("h-4 w-4 shrink-0", color)} />
            <span className="text-sm font-medium text-foreground flex-1">{msg.content}</span>
            {msg.duration && <span className="text-xs text-muted-foreground">{msg.duration}</span>}
            {msg.repName && <span className="text-xs text-muted-foreground">· {msg.repName}</span>}
          </div>
          {hasAudio && <MiniWaveform />}
          <span className="mt-1 self-end text-[10px] text-muted-foreground">{msg.date} · {msg.time}</span>
        </div>
      </div>
    );
  }

  if (msg.type === "email") {
    return (
      <div className={cn("flex my-2", isOut ? "justify-end" : "justify-start")}>
        <div className={cn(
          "max-w-[80%] rounded-2xl border p-4 shadow-sm",
          isOut ? "bg-primary/5 border-primary/20 rounded-tr-sm" : "bg-card border-border rounded-tl-sm",
        )}>
          <div className="mb-2 flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-[11px] font-semibold text-muted-foreground">
              {isOut ? `Email sent${msg.repName ? ` · ${msg.repName}` : ""}` : "Email received"}
            </span>
          </div>
          {msg.subject && <p className="mb-1 text-xs font-bold text-foreground">{msg.subject}</p>}
          <p className="text-sm text-foreground/90">{msg.content}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">{msg.date} · {msg.time}</span>
            {isOut && (
              <span className="text-[10px] text-primary flex items-center gap-0.5">
                {msg.status === "read" ? <><CheckCheck className="h-3 w-3" /> Read</> : <><Check className="h-3 w-3" /> Sent</>}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // SMS
  return (
    <div className={cn("flex my-1", isOut ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[72%] rounded-2xl px-4 py-2.5",
        isOut ? "bg-primary text-white rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm shadow-sm",
      )}>
        <p className="text-sm leading-relaxed">{msg.content}</p>
        <div className={cn("mt-1 flex items-center justify-end gap-1", isOut ? "text-white/70" : "text-muted-foreground")}>
          <span className="text-[10px]">{msg.time}</span>
          {isOut && (msg.status==="read" ? <CheckCheck className="h-3 w-3"/> : <Check className="h-3 w-3 opacity-70"/>)}
        </div>
      </div>
    </div>
  );
}

// ─── Date Divider ─────────────────────────────────────────────────────────────
function DateDivider({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-border" />
      <span className="text-[11px] font-medium text-muted-foreground px-2 bg-background">{date}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── Dialer Modal ─────────────────────────────────────────────────────────────
function DialerModal({ open, name, phone, onClose }: { open: boolean; name: string; phone: string; onClose: () => void }) {
  const [num, setNum] = useState(phone);
  const [calling, setCalling] = useState(false);
  const timerRef = useRef<NodeJS.Timeout|null>(null);
  const [elapsed, setElapsed] = useState(0);

  const startCall = () => {
    setCalling(true);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(e => e+1), 1000);
  };
  const endCall = () => {
    setCalling(false);
    if(timerRef.current) clearInterval(timerRef.current);
    setElapsed(0);
    onClose();
  };
  useEffect(() => () => { if(timerRef.current) clearInterval(timerRef.current); }, []);

  const min = Math.floor(elapsed/60).toString().padStart(2,"0");
  const sec = (elapsed%60).toString().padStart(2,"0");

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-72 rounded-2xl border border-border bg-card p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">{calling ? "On Call" : "Make a Call"}</h2>
          {!calling && <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-accent"><X className="h-4 w-4 text-muted-foreground"/></button>}
        </div>

        {calling ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white animate-pulse">
              {name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{num}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">{min}:{sec}</p>
            </div>
            <button onClick={endCall} className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600">
              <Phone className="h-5 w-5 rotate-135" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-xl border border-border bg-muted/40 px-4 py-3 text-center text-lg font-bold tracking-widest text-foreground min-h-[48px]">
              {num || <span className="text-muted-foreground text-sm font-normal">Enter number</span>}
            </div>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {["1","2","3","4","5","6","7","8","9","*","0","#"].map(k=>(
                <button key={k} onClick={()=>setNum(p=>p+k)} className="flex h-11 items-center justify-center rounded-xl border border-border bg-background text-lg font-semibold transition hover:bg-accent">{k}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium transition hover:bg-accent">Cancel</button>
              <button onClick={startCall} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600">
                <Phone className="h-4 w-4"/> Call
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const INBOX_STATS = [
  { label:"Unread",          value:"6",   icon:Inbox,         color:"oklch(0.55 0.22 265)" },
  { label:"Today's Calls",   value:"14",  icon:Phone,         color:"oklch(0.72 0.17 155)" },
  { label:"SMS Today",       value:"38",  icon:MessageCircle, color:"oklch(0.72 0.2 155)"  },
  { label:"Emails Today",    value:"12",  icon:Mail,          color:"oklch(0.65 0.24 300)" },
  { label:"Response Rate",   value:"68%", icon:TrendingUp,    color:"oklch(0.78 0.17 75)"  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function CommunicationsInbox() {
  const [convs, setConvs]                 = useState<Conversation[]>(INIT_CONVS);
  const [allMessages, setAllMessages]     = useState<Record<number,Message[]>>(INIT_MESSAGES);
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [threadFilter, setThreadFilter]   = useState<ChannelFilter>("all");
  const [search, setSearch]               = useState("");
  const [selectedId, setSelectedId]       = useState<number>(1);
  const [composeType, setComposeType]     = useState<ComposeType>("sms");
  const [smsText, setSmsText]             = useState("");
  const [emailSubject, setEmailSubject]   = useState("");
  const [emailBody, setEmailBody]         = useState("");
  const [dialerOpen, setDialerOpen]       = useState(false);
  const threadEndRef                      = useRef<HTMLDivElement>(null);

  const selectedConv = convs.find(c => c.id === selectedId)!;
  const rawMessages  = allMessages[selectedId] ?? [];
  const messages     = threadFilter === "all" ? rawMessages : rawMessages.filter(m => m.type === threadFilter);

  // Group messages by date
  const grouped: {date: string; msgs: Message[]}[] = [];
  messages.forEach(m => {
    const g = grouped.find(g => g.date === m.date);
    g ? g.msgs.push(m) : grouped.push({date: m.date, msgs: [m]});
  });

  // Scroll to bottom when messages change
  useEffect(() => { threadEndRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages.length, selectedId]);

  // Select conversation — mark as read
  const selectConv = (id: number) => {
    setSelectedId(id);
    setThreadFilter("all");
    setConvs(prev => prev.map(c => c.id === id ? {...c, unread: 0} : c));
    setAllMessages(prev => ({...prev, [id]: (prev[id]??[]).map(m => ({...m, read:true}))}));
  };

  // Toggle star
  const toggleStar = (id: number) => setConvs(prev => prev.map(c => c.id === id ? {...c, starred: !c.starred} : c));

  // Archive
  const archiveConv = (id: number) => {
    setConvs(prev => prev.map(c => c.id === id ? {...c, archived: !c.archived} : c));
  };

  // Send SMS
  const sendSms = () => {
    if (!smsText.trim()) return;
    const newMsg: Message = {
      id: (allMessages[selectedId]?.length ?? 0) + 1,
      type: "sms", direction: "outbound", content: smsText.trim(),
      time: now(), date: "May 20", read: true, status: "sent",
    };
    setAllMessages(prev => ({...prev, [selectedId]: [...(prev[selectedId]??[]), newMsg]}));
    setConvs(prev => prev.map(c => c.id === selectedId ? {...c, lastMessage: smsText.trim(), lastTime: "Just now"} : c));
    setSmsText("");
  };

  // Send Email
  const sendEmail = () => {
    if (!emailBody.trim()) return;
    const newMsg: Message = {
      id: (allMessages[selectedId]?.length ?? 0) + 1,
      type: "email", direction: "outbound", content: emailBody.trim(),
      time: now(), date: "May 20", subject: emailSubject || "(No subject)", read: true, status: "sent",
      repName: "Alex Carter",
    };
    setAllMessages(prev => ({...prev, [selectedId]: [...(prev[selectedId]??[]), newMsg]}));
    setConvs(prev => prev.map(c => c.id === selectedId ? {...c, lastMessage: emailBody.trim(), lastTime: "Just now", channel: "email"} : c));
    setEmailBody(""); setEmailSubject("");
  };

  const totalUnread = convs.reduce((s,c) => s + c.unread, 0);

  const filteredConvs = convs.filter(c => {
    if (c.archived) return false;
    const matchCh   = channelFilter === "all" || c.channel === channelFilter;
    const matchSrch = search === "" || c.leadName.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase());
    return matchCh && matchSrch;
  });

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden">

      {/* Stats bar */}
      <div className="flex items-center gap-3 overflow-x-auto border-b border-border px-6 py-3">
        {INBOX_STATS.map(s => (
          <div key={s.label} className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{backgroundColor: s.color+"22"}}>
              <s.icon className="h-4 w-4" style={{color: s.color}} />
            </div>
            <div>
              <p className="text-lg font-bold leading-tight text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
        <button className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* 2-panel */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: conversation list ──────────────────────────── */}
        <div className="flex w-80 shrink-0 flex-col border-r border-border">
          {/* Search + New */}
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-primary hover:text-white hover:border-primary">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Channel filter tabs */}
          <div className="flex border-b border-border px-2 pt-1">
            {(["all","sms","call","email"] as ChannelFilter[]).map(ch => {
              const Icon = ch === "all" ? Inbox : CHANNEL_STYLE[ch as "sms"|"call"|"email"].icon;
              return (
                <button
                  key={ch}
                  onClick={() => setChannelFilter(ch)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1 py-2 text-xs font-semibold transition-colors border-b-2",
                    channelFilter === ch ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {ch === "all" ? (
                    <span className="flex items-center gap-1">
                      All
                      {totalUnread > 0 && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">{totalUnread}</span>}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 capitalize">
                      <Icon className={cn("h-3.5 w-3.5", CHANNEL_STYLE[ch as "sms"|"call"|"email"].color)} />
                      {ch.toUpperCase()}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.length === 0 ? (
              <div className="py-16 text-center text-sm text-muted-foreground">No conversations found</div>
            ) : (
              filteredConvs.map(conv => {
                const ChIcon = CHANNEL_STYLE[conv.channel].icon;
                return (
                  <button
                    key={conv.id}
                    onClick={() => selectConv(conv.id)}
                    className={cn(
                      "group flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors border-b border-border/50",
                      selectedId === conv.id
                        ? "bg-primary/8 border-l-2 border-l-primary"
                        : "hover:bg-accent/50 border-l-2 border-l-transparent",
                    )}
                  >
                    {/* Avatar */}
                    <div className="relative mt-0.5 shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{backgroundColor: conv.leadColor}}>
                        {conv.leadInitials}
                      </div>
                      <div className={cn("absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card", CHANNEL_STYLE[conv.channel].bg)}>
                        <ChIcon className={cn("h-2.5 w-2.5", CHANNEL_STYLE[conv.channel].color)} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={cn("truncate text-sm", conv.unread > 0 ? "font-bold text-foreground" : "font-semibold text-foreground/80")}>
                          {conv.leadName}
                        </span>
                        <div className="flex shrink-0 items-center gap-1.5">
                          {conv.starred && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                          <span className="text-[10px] text-muted-foreground">{conv.lastTime}</span>
                        </div>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{conv.address} · {conv.city}</p>
                      <p className={cn("mt-0.5 truncate text-xs", conv.unread > 0 ? "font-medium text-foreground" : "text-muted-foreground")}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {conv.unread > 0 && (
                      <div className="mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                        {conv.unread}
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT: thread ──────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Thread header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{backgroundColor: selectedConv.leadColor}}>
                {selectedConv.leadInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-foreground">{selectedConv.leadName}</h2>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{backgroundColor: selectedConv.stageColor+"22", color: selectedConv.stageColor}}>
                    {selectedConv.stage}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{selectedConv.address}, {selectedConv.city}, {selectedConv.state}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3"/>{selectedConv.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3"/>{selectedConv.email}</span>
                </div>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-1.5">
              {/* Thread type filter */}
              <div className="flex gap-0.5 rounded-xl border border-border bg-muted/40 p-0.5 mr-1">
                {(["all","sms","call","email"] as ChannelFilter[]).map(f => (
                  <button key={f} onClick={() => setThreadFilter(f)}
                    className={cn("rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors capitalize",
                      threadFilter===f ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f === "all" ? "All" : f.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setDialerOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                title="Call"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                onClick={() => { setComposeType("sms"); }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600 transition hover:bg-green-100"
                title="SMS"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => { setComposeType("email"); }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition hover:bg-purple-100"
                title="Email"
              >
                <Mail className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleStar(selectedId)}
                className={cn("flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-accent", selectedConv.starred ? "text-amber-400" : "text-muted-foreground")}
                title={selectedConv.starred ? "Unstar" : "Star"}
              >
                <Star className={cn("h-4 w-4", selectedConv.starred && "fill-amber-400")} />
              </button>
              <button
                onClick={() => archiveConv(selectedId)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-accent hover:text-foreground"
                title="Archive"
              >
                <Archive className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-accent hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 bg-muted/20">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                <MessageCircle className="mb-3 h-12 w-12 opacity-20" />
                <p className="text-sm">No {threadFilter === "all" ? "" : threadFilter+" "}messages yet.</p>
              </div>
            ) : (
              grouped.map(group => (
                <div key={group.date}>
                  <DateDivider date={group.date} />
                  {group.msgs.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
                </div>
              ))
            )}
            <div ref={threadEndRef} />
          </div>

          {/* Compose bar */}
          <div className="border-t border-border bg-card p-4">
            {/* Channel switcher */}
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Send via:</span>
              <button
                onClick={() => setComposeType("sms")}
                className={cn("inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                  composeType==="sms" ? "bg-green-100 text-green-700" : "text-muted-foreground hover:bg-accent"
                )}
              >
                <MessageCircle className="h-3.5 w-3.5" /> SMS
              </button>
              <button
                onClick={() => setComposeType("email")}
                className={cn("inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                  composeType==="email" ? "bg-purple-100 text-purple-700" : "text-muted-foreground hover:bg-accent"
                )}
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </button>
              <button
                onClick={() => setDialerOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-blue-500" /> Call
              </button>
              <div className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
                <Phone className="h-3 w-3" />{selectedConv.phone}
              </div>
            </div>

            {/* Compose SMS */}
            {composeType === "sms" && (
              <div className="flex items-end gap-2">
                <textarea
                  value={smsText}
                  onChange={e => setSmsText(e.target.value)}
                  onKeyDown={e => { if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); sendSms(); } }}
                  placeholder={`Message ${selectedConv.leadName}... (Enter to send)`}
                  rows={2}
                  className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={sendSms}
                  className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition",
                    smsText.trim() ? "bg-primary text-white hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Compose Email */}
            {composeType === "email" && (
              <div className="space-y-2">
                <input
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  placeholder="Subject"
                  className="h-9 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex items-end gap-2">
                  <textarea
                    value={emailBody}
                    onChange={e => setEmailBody(e.target.value)}
                    placeholder={`Write email to ${selectedConv.email}...`}
                    rows={3}
                    className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={sendEmail}
                    className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition",
                      emailBody.trim() ? "bg-primary text-white hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed"
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

      {/* Dialer */}
      <DialerModal
        open={dialerOpen}
        name={selectedConv.leadName}
        phone={selectedConv.phone}
        onClose={() => setDialerOpen(false)}
      />
    </div>
  );
}
