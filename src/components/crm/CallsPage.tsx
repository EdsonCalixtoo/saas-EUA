import { useState, useRef, useEffect, useCallback } from "react";
import {
  Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed,
  Play, Pause, Download, SkipBack,
  Search, Filter, ChevronDown, Upload, MoreHorizontal,
  X, MessageCircle, Mail, CheckCircle2, Calendar, Clock,
  ArrowUpRight, ArrowDownLeft, FileText, Voicemail,
  Users, ChevronLeft, ChevronRight, SlidersHorizontal,
  Home, Trash2, ArrowUpDown, Send, Pencil, Save,
  AlertCircle, CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type CallOutcome = "connected" | "no_answer" | "voicemail" | "busy";
type CallDirection = "inbound" | "outbound";
type TabKey = "all" | "my" | "missed" | "voicemails";
type DetailTab = "details" | "activity" | "notes" | "files";
type SortDir = "asc" | "desc" | null;

interface CallRecord {
  id: number;
  leadName: string;
  leadInitials: string;
  leadColor: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  direction: CallDirection;
  outcome: CallOutcome;
  duration: string;
  dateTime: string;
  calledBy: string;
  calledByInitials: string;
  calledByColor: string;
  recordingAvailable: boolean;
  recordingDuration?: string;
  notes: string;
  nextStep: string;
  followUpDate: string;
  disposition: string;
  estValue: number;
  gradient: string;
}

interface Toast { id: number; message: string; type: "success" | "error" | "info" }

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INIT_CALLS: CallRecord[] = [
  { id:1,  leadName:"John Smith",      leadInitials:"JS",leadColor:"oklch(0.55 0.22 265)",address:"123 Main St",     city:"Tampa",          state:"FL",phone:"(813) 555-2234",direction:"outbound",outcome:"connected", duration:"06:24",dateTime:"May 18, 2024 · 10:24 AM",calledBy:"Alex Carter",   calledByInitials:"AC",calledByColor:"oklch(0.55 0.22 265)",recordingAvailable:true, recordingDuration:"06:24",notes:"Interested in cash offer. Call back next week with more details.",nextStep:"Follow-up Call",followUpDate:"May 22, 2024",disposition:"Interested",     estValue:28500,gradient:"linear-gradient(135deg,#667eea,#764ba2)" },
  { id:2,  leadName:"Emily Brown",     leadInitials:"EB",leadColor:"oklch(0.65 0.24 25)", address:"258 Beach Rd",    city:"Clearwater",     state:"FL",phone:"(727) 555-6842",direction:"outbound",outcome:"connected", duration:"04:15",dateTime:"May 18, 2024 · 9:45 AM", calledBy:"Lisa Martinez", calledByInitials:"LM",calledByColor:"oklch(0.68 0.19 275)",recordingAvailable:true, recordingDuration:"04:15",notes:"Wants a formal offer letter sent by email.",nextStep:"Send Email",followUpDate:"May 20, 2024",disposition:"Warm Lead",      estValue:48000,gradient:"linear-gradient(135deg,#4facfe,#00f2fe)" },
  { id:3,  leadName:"David Wilson",    leadInitials:"DW",leadColor:"oklch(0.78 0.17 75)", address:"369 Lake Dr",     city:"Lakeland",       state:"FL",phone:"(407) 555-1357",direction:"inbound", outcome:"connected", duration:"07:12",dateTime:"May 18, 2024 · 9:12 AM", calledBy:"Alex Carter",   calledByInitials:"AC",calledByColor:"oklch(0.55 0.22 265)",recordingAvailable:true, recordingDuration:"07:12",notes:"Very motivated seller. Wants to close in 30 days.",nextStep:"Schedule Walkthrough",followUpDate:"May 21, 2024",disposition:"Very Motivated",estValue:62000,gradient:"linear-gradient(135deg,#43e97b,#38f9d7)" },
  { id:4,  leadName:"Mike Torres",     leadInitials:"MT",leadColor:"oklch(0.72 0.17 155)",address:"466 Oak Ave",     city:"Orlando",        state:"FL",phone:"(407) 555-6678",direction:"outbound",outcome:"no_answer", duration:"—",   dateTime:"May 18, 2024 · 8:58 AM", calledBy:"Mike Davis",    calledByInitials:"MD",calledByColor:"oklch(0.72 0.17 155)",recordingAvailable:false,             notes:"No answer. Left voicemail.",nextStep:"Call Again",followUpDate:"May 19, 2024",disposition:"Attempted",     estValue:35000,gradient:"linear-gradient(135deg,#fa709a,#fee140)" },
  { id:5,  leadName:"Lisa Martinez",   leadInitials:"LM",leadColor:"oklch(0.68 0.19 275)",address:"987 Palm Ln",    city:"Sarasota",       state:"FL",phone:"(941) 555-2468",direction:"outbound",outcome:"voicemail",  duration:"00:32",dateTime:"May 17, 2024 · 4:30 PM",calledBy:"Lisa Martinez", calledByInitials:"LM",calledByColor:"oklch(0.68 0.19 275)",recordingAvailable:true, recordingDuration:"00:32",notes:"Left voicemail with callback number.",nextStep:"Follow-up SMS",followUpDate:"May 19, 2024",disposition:"No Contact",    estValue:55000,gradient:"linear-gradient(135deg,#a18cd1,#fbc2eb)" },
  { id:6,  leadName:"Amanda Clark",    leadInitials:"AC",leadColor:"oklch(0.68 0.19 195)",address:"753 Ocean Ave",  city:"St. Petersburg", state:"FL",phone:"(727) 555-9092",direction:"inbound", outcome:"connected", duration:"05:41",dateTime:"May 17, 2024 · 3:15 PM",calledBy:"Alex Carter",   calledByInitials:"AC",calledByColor:"oklch(0.55 0.22 265)",recordingAvailable:true, recordingDuration:"05:41",notes:"Agreed to receive a written offer.",nextStep:"Prepare Offer",followUpDate:"May 20, 2024",disposition:"Interested",     estValue:57500,gradient:"linear-gradient(135deg,#f77062,#fe5196)" },
  { id:7,  leadName:"Kevin Harris",    leadInitials:"KH",leadColor:"oklch(0.72 0.2 45)",  address:"852 Island Rd",  city:"Marco Island",   state:"FL",phone:"(239) 555-8801",direction:"outbound",outcome:"busy",      duration:"—",   dateTime:"May 17, 2024 · 2:05 PM",calledBy:"Mike Davis",    calledByInitials:"MD",calledByColor:"oklch(0.72 0.17 155)",recordingAvailable:false,             notes:"Line busy. Try again later.",nextStep:"Call Again",followUpDate:"May 18, 2024",disposition:"Attempted",     estValue:61000,gradient:"linear-gradient(135deg,#30cfd0,#330867)" },
  { id:8,  leadName:"Robert Anderson", leadInitials:"RA",leadColor:"oklch(0.65 0.24 25)", address:"813 Bay Blvd",   city:"Tampa",          state:"FL",phone:"(813) 555-4680",direction:"outbound",outcome:"connected", duration:"08:23",dateTime:"May 17, 2024 · 1:22 PM",calledBy:"Alex Carter",   calledByInitials:"AC",calledByColor:"oklch(0.55 0.22 265)",recordingAvailable:true, recordingDuration:"08:23",notes:"Long call. Discussed terms in detail. Agreed on $72k.",nextStep:"Send Contract",followUpDate:"May 19, 2024",disposition:"Under Contract",estValue:72000,gradient:"linear-gradient(135deg,#fda085,#f6d365)" },
  { id:9,  leadName:"Susan Walker",    leadInitials:"SW",leadColor:"oklch(0.78 0.17 75)", address:"337 Harbor Dr",  city:"Clearwater",     state:"FL",phone:"(727) 555-6842",direction:"outbound",outcome:"no_answer", duration:"—",   dateTime:"May 16, 2024 · 11:41 AM",calledBy:"Lisa Martinez",calledByInitials:"LM",calledByColor:"oklch(0.68 0.19 275)",recordingAvailable:false,             notes:"No answer, second attempt.",nextStep:"SMS Follow-up",followUpDate:"May 17, 2024",disposition:"Attempted",     estValue:52000,gradient:"linear-gradient(135deg,#89f7fe,#66a6ff)" },
  { id:10, leadName:"Emily Brown",     leadInitials:"EB",leadColor:"oklch(0.65 0.24 25)", address:"258 Palm Dr",    city:"Orlando",        state:"FL",phone:"(863) 555-2468",direction:"outbound",outcome:"voicemail",  duration:"00:45",dateTime:"May 16, 2024 · 10:02 AM",calledBy:"Mike Davis",   calledByInitials:"MD",calledByColor:"oklch(0.72 0.17 155)",recordingAvailable:true, recordingDuration:"00:45",notes:"Left detailed voicemail with offer info.",nextStep:"Wait for callback",followUpDate:"May 18, 2024",disposition:"No Contact",  estValue:64500,gradient:"linear-gradient(135deg,#d4fc79,#96e6a1)" },
];

// ─── Outcome config ────────────────────────────────────────────────────────────
const OUTCOME_CFG: Record<CallOutcome, { label: string; bg: string; text: string; dot: string }> = {
  connected: { label:"Connected",  bg:"bg-emerald-50", text:"text-emerald-700", dot:"bg-emerald-500" },
  no_answer: { label:"No Answer",  bg:"bg-orange-50",  text:"text-orange-600",  dot:"bg-orange-500"  },
  voicemail: { label:"Voicemail",  bg:"bg-purple-50",  text:"text-purple-700",  dot:"bg-purple-500"  },
  busy:      { label:"Busy",       bg:"bg-red-50",     text:"text-red-600",     dot:"bg-red-500"     },
};

const STATS = [
  { label:"Total Calls",       value:"1,248", delta:15.3, up:true,  icon:Phone,         color:"oklch(0.55 0.22 265)" },
  { label:"Connected Calls",   value:"342",   delta:12.8, up:true,  icon:CheckCircle2,  color:"oklch(0.72 0.17 155)" },
  { label:"Missed Calls",      value:"126",   delta:8.2,  up:false, icon:PhoneMissed,   color:"oklch(0.62 0.24 27)"  },
  { label:"Voicemails",        value:"42",    delta:5.0,  up:true,  icon:Voicemail,     color:"oklch(0.68 0.19 275)" },
  { label:"Avg. Call Duration",value:"04:32", delta:9.4,  up:true,  icon:Clock,         color:"oklch(0.78 0.17 75)"  },
];

// ─── Dropdown helper ─────────────────────────────────────────────────────────
function DropdownMenu({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 min-w-[180px] overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
}

// ─── Waveform Player ──────────────────────────────────────────────────────────
const WAVE = Array.from({length:80}, () => 15 + Math.random() * 85);

function WaveformPlayer({ duration }: { duration: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const ref = useRef<NodeJS.Timeout|null>(null);

  useEffect(() => {
    if (playing) {
      ref.current = setInterval(() => setProgress(p => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 0.5 * speed;
      }), 100);
    } else { if (ref.current) clearInterval(ref.current); }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [playing, speed]);

  const parts = duration.split(":");
  const totalSec = parseInt(parts[0])*60 + parseInt(parts[1]||"0");
  const elapsed  = (progress/100) * totalSec;
  const elMin    = Math.floor(elapsed/60).toString().padStart(2,"0");
  const elSec    = Math.floor(elapsed%60).toString().padStart(2,"0");

  return (
    <div className="mt-3 rounded-xl border border-border bg-muted/40 p-3">
      <div className="flex items-center gap-3">
        <button onClick={() => setPlaying(!playing)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary/90">
          {playing ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4 translate-x-0.5"/>}
        </button>
        <div className="flex flex-1 cursor-pointer items-end gap-px overflow-hidden" style={{height:36}}
          onClick={e => { const r=e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX-r.left)/r.width)*100); }}
        >
          {WAVE.map((h,i) => (
            <div key={i} className="w-1 rounded-sm transition-colors" style={{ height:`${h}%`, backgroundColor: (i/WAVE.length)*100<=progress ? "oklch(0.55 0.22 265)" : "oklch(0.82 0.01 260)" }} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => setProgress(0)} className="text-muted-foreground transition hover:text-foreground"><SkipBack className="h-3.5 w-3.5"/></button>
          <button className="text-muted-foreground transition hover:text-foreground"><Download className="h-3.5 w-3.5"/></button>
          <button onClick={() => setSpeed(s => s===1?1.5:s===1.5?2:1)} className="rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-semibold text-foreground transition hover:bg-accent">{speed}x</button>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{elMin}:{elSec}</span><span>{duration}</span>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function ToastList({ toasts, remove }: { toasts: Toast[]; remove: (id:number)=>void }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2 items-center">
      {toasts.map(t => (
        <div key={t.id} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl text-sm font-medium text-white animate-in slide-in-from-bottom-2 duration-300",
          t.type==="success" ? "bg-emerald-600" : t.type==="error" ? "bg-red-600" : "bg-foreground"
        )}>
          {t.type==="success" ? <CheckCheck className="h-4 w-4"/> : t.type==="error" ? <AlertCircle className="h-4 w-4"/> : <AlertCircle className="h-4 w-4"/>}
          {t.message}
          <button onClick={()=>remove(t.id)} className="ml-2 opacity-70 hover:opacity-100"><X className="h-3.5 w-3.5"/></button>
        </div>
      ))}
    </div>
  );
}

// ─── Dialer Modal ─────────────────────────────────────────────────────────────
function DialerModal({ open, name, phone, onClose }: { open:boolean; name:string; phone:string; onClose:()=>void }) {
  const [num, setNum]       = useState(phone);
  const [calling, setCalling] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef<NodeJS.Timeout|null>(null);

  const startCall = () => { setCalling(true); setElapsed(0); ref.current = setInterval(() => setElapsed(e => e+1), 1000); };
  const endCall   = () => { setCalling(false); if(ref.current) clearInterval(ref.current); setElapsed(0); onClose(); };
  useEffect(() => () => { if(ref.current) clearInterval(ref.current); }, []);

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
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white ring-4 ring-emerald-200 animate-pulse">
              {name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{num}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">{min}:{sec}</p>
            </div>
            <div className="flex gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H3m15 0h3"/></svg>
              </button>
              <button onClick={endCall} className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600">
                <Phone className="h-5 w-5 rotate-[135deg]"/>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0-12C9.239 6 7 8.239 7 11s2.239 5 5 5"/></svg>
              </button>
            </div>
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

// ─── Row Context Menu ─────────────────────────────────────────────────────────
function RowMenu({ call, onDelete, onCall, showToast }: { call: CallRecord; onDelete:()=>void; onCall:()=>void; showToast:(msg:string,type?:Toast["type"])=>void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative" onClick={e => e.stopPropagation()}>
      <button onClick={() => setOpen(!open)} className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground">
        <MoreHorizontal className="h-4 w-4"/>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          <button onClick={() => { onCall(); setOpen(false); }} className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
            <Phone className="h-4 w-4 text-blue-500"/> Call {call.leadName.split(" ")[0]}
          </button>
          <button onClick={() => { showToast("Opening SMS conversation…","info"); setOpen(false); }} className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
            <MessageCircle className="h-4 w-4 text-green-500"/> Send SMS
          </button>
          <button onClick={() => { showToast("Opening email compose…","info"); setOpen(false); }} className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
            <Mail className="h-4 w-4 text-purple-500"/> Send Email
          </button>
          <div className="my-1 h-px bg-border"/>
          <button onClick={() => { showToast("Copied phone number","success"); setOpen(false); }} className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
            <Phone className="h-4 w-4 text-muted-foreground"/> Copy Number
          </button>
          <button onClick={() => { onDelete(); setOpen(false); }} className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 className="h-4 w-4"/> Delete Call
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Property Modal ─────────────────────────────────────────────────────────
function PropertyModal({ call, onClose }: { call: CallRecord; onClose: () => void }) {
  const arv          = Math.round(call.estValue * 1.45);
  const repairCost   = Math.round(call.estValue * 0.12);
  const offerAmount  = Math.round(call.estValue * 0.72);
  const profit       = arv - offerAmount - repairCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Property banner */}
        <div className="relative h-32" style={{ background: call.gradient }}>
          <div className="flex h-full items-center justify-center">
            <Home className="h-14 w-14 text-white/30"/>
          </div>
          <button onClick={onClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50">
            <X className="h-4 w-4"/>
          </button>
          <div className="absolute bottom-3 left-4">
            <p className="text-lg font-bold text-white">{call.address}</p>
            <p className="text-sm text-white/80">{call.city}, {call.state}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 space-y-4">
          {/* Key numbers */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Est. Value",    value: `$${call.estValue.toLocaleString()}`,  color: "text-foreground"   },
              { label: "After Repair Value", value: `$${arv.toLocaleString()}`,       color: "text-emerald-600" },
              { label: "Repair Cost",   value: `$${repairCost.toLocaleString()}`,     color: "text-orange-500"  },
              { label: "Est. Profit",   value: `$${profit.toLocaleString()}`,         color: "text-primary"     },
            ].map(n => (
              <div key={n.label} className="rounded-xl border border-border bg-muted/40 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{n.label}</p>
                <p className={cn("text-lg font-bold", n.color)}>{n.value}</p>
              </div>
            ))}
          </div>

          {/* Offer amount */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Suggested Offer</p>
              <p className="text-lg font-bold text-primary">${offerAmount.toLocaleString()}</p>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">70% of ARV minus repair costs</p>
          </div>

          {/* Lead */}
          <div className="flex items-center gap-3 rounded-xl border border-border p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: call.leadColor }}>
              {call.leadInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{call.leadName}</p>
              <p className="text-xs text-muted-foreground">{call.phone}</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{call.disposition}</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card py-3 text-xs font-medium text-foreground transition hover:bg-accent hover:text-primary">
              <Home className="h-4 w-4"/>
              View in Pipeline
            </button>
            <button className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card py-3 text-xs font-medium text-foreground transition hover:bg-accent hover:text-primary">
              <Users className="h-4 w-4"/>
              View Lead
            </button>
            <button
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(call.address+", "+call.city+", "+call.state)}`, "_blank")}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card py-3 text-xs font-medium text-foreground transition hover:bg-accent hover:text-primary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Open Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function CallDetailPanel({ call, onClose, onUpdate, onCall, showToast }: {
  call: CallRecord;
  onClose: () => void;
  onUpdate: (id:number, data: Partial<CallRecord>) => void;
  onCall: () => void;
  showToast: (msg:string, type?:Toast["type"]) => void;
}) {
  const [tab, setTab]                   = useState<DetailTab>("details");
  const [editingDisp, setEditingDisp]   = useState(false);
  const [dispForm, setDispForm]         = useState({ disposition: call.disposition, nextStep: call.nextStep, followUpDate: call.followUpDate });
  const [notesVal, setNotesVal]         = useState(call.notes);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody]       = useState("");
  const [showEmailCompose, setShowEmailCompose] = useState(false);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);

  useEffect(() => {
    setDispForm({ disposition: call.disposition, nextStep: call.nextStep, followUpDate: call.followUpDate });
    setNotesVal(call.notes);
  }, [call.id]);

  const saveDisposition = () => {
    onUpdate(call.id, dispForm);
    setEditingDisp(false);
    showToast("Disposition updated", "success");
  };

  const saveNotes = () => {
    onUpdate(call.id, { notes: notesVal });
    showToast("Notes saved", "success");
  };

  const sendEmail = () => {
    if (!emailBody.trim()) return;
    showToast(`Email sent to ${call.leadName}`, "success");
    setEmailBody(""); setEmailSubject(""); setShowEmailCompose(false);
  };

  const panelContent = (
    <div className="flex h-full w-full lg:w-[360px] shrink-0 flex-col border-l border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white" style={{backgroundColor:call.leadColor}}>
            {call.leadInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">{call.leadName}</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Lead</span>
            </div>
            <p className="text-xs text-muted-foreground">{call.phone} · {call.city}, {call.state}</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground">
          <X className="h-4 w-4"/>
        </button>
      </div>

      {/* Quick actions */}
      <div className="flex items-center justify-center gap-2 border-b border-border px-4 py-2.5">
        <button onClick={onCall} className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-100" title="Call">
          <Phone className="h-4 w-4"/>
        </button>
        <button onClick={() => { showToast(`Opening SMS with ${call.leadName}…`, "info"); }} className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600 transition hover:bg-green-100" title="SMS">
          <MessageCircle className="h-4 w-4"/>
        </button>
        <button onClick={() => setShowEmailCompose(!showEmailCompose)} className={cn("flex h-9 w-9 items-center justify-center rounded-xl transition", showEmailCompose ? "bg-purple-200 text-purple-700" : "bg-purple-50 text-purple-600 hover:bg-purple-100")} title="Email">
          <Mail className="h-4 w-4"/>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-accent hover:text-foreground" title="More">
          <MoreHorizontal className="h-4 w-4"/>
        </button>
      </div>

      {/* Email compose (inline) */}
      {showEmailCompose && (
        <div className="border-b border-border bg-purple-50/50 px-4 py-3 space-y-2">
          <input value={emailSubject} onChange={e=>setEmailSubject(e.target.value)} placeholder="Subject" className="h-8 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary"/>
          <div className="flex gap-2">
            <textarea value={emailBody} onChange={e=>setEmailBody(e.target.value)} placeholder={`Email to ${call.leadName}...`} rows={2} className="flex-1 resize-none rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"/>
            <button onClick={sendEmail} className={cn("flex h-8 w-8 items-center justify-center rounded-lg transition", emailBody.trim() ? "bg-primary text-white hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
              <Send className="h-3.5 w-3.5"/>
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border">
        {([{key:"details",label:"Call Details"},{key:"activity",label:"Activity"},{key:"notes",label:"Notes"},{key:"files",label:"Files"}] as {key:DetailTab;label:string}[]).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={cn("flex-1 py-2.5 text-xs font-semibold transition-colors", tab===t.key ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "details" && (
          <div className="space-y-4">
            {/* Call info */}
            <div className="space-y-2">
              {[
                { label:"Direction",   render: () => <div className="flex items-center gap-1.5">{call.direction==="outbound" ? <ArrowUpRight className="h-3.5 w-3.5 text-blue-500"/> : <ArrowDownLeft className="h-3.5 w-3.5 text-green-500"/>}<span className="text-sm font-medium text-foreground capitalize">{call.direction}</span></div> },
                { label:"Outcome",     render: () => <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", OUTCOME_CFG[call.outcome].bg, OUTCOME_CFG[call.outcome].text)}><span className={cn("h-1.5 w-1.5 rounded-full", OUTCOME_CFG[call.outcome].dot)}/>{OUTCOME_CFG[call.outcome].label}</span> },
                { label:"Duration",    render: () => <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-muted-foreground"/><span className="text-sm font-medium text-foreground">{call.duration}</span></div> },
                { label:"Date & Time", render: () => <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-muted-foreground"/><span className="text-sm font-medium text-foreground">{call.dateTime}</span></div> },
                { label:"Called By",   render: () => <div className="flex items-center gap-1.5"><div className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{backgroundColor:call.calledByColor}}>{call.calledByInitials}</div><span className="text-sm font-medium text-foreground">{call.calledBy}</span></div> },
                { label:"Recording",   render: () => <span className={cn("text-sm font-medium", call.recordingAvailable ? "text-primary" : "text-muted-foreground")}>{call.recordingAvailable ? "Available" : "Not available"}</span> },
              ].map((row,i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs font-medium text-muted-foreground">{row.label}</span>
                  {row.render()}
                </div>
              ))}
            </div>

            {/* Recording player */}
            {call.recordingAvailable && call.recordingDuration && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Call Recording</p>
                <WaveformPlayer duration={call.recordingDuration}/>
              </div>
            )}

            {/* Disposition */}
            <div className="rounded-xl border border-border bg-muted/30 p-3.5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Disposition</p>
                {editingDisp ? (
                  <div className="flex gap-1">
                    <button onClick={saveDisposition} className="flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-primary/90"><Save className="h-3 w-3"/> Save</button>
                    <button onClick={() => setEditingDisp(false)} className="rounded-lg border border-border px-2 py-1 text-[11px] font-medium transition hover:bg-accent">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingDisp(true)} className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"><Pencil className="h-3 w-3"/> Edit</button>
                )}
              </div>

              {editingDisp ? (
                <div className="space-y-2">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Outcome</label>
                    <select value={dispForm.disposition} onChange={e=>setDispForm(f=>({...f,disposition:e.target.value}))} className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm outline-none focus:border-primary">
                      {["Interested","Warm Lead","Very Motivated","Attempted","No Contact","Under Contract","Not Interested","Closed"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Next Step</label>
                    <select value={dispForm.nextStep} onChange={e=>setDispForm(f=>({...f,nextStep:e.target.value}))} className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm outline-none focus:border-primary">
                      {["Follow-up Call","Send Email","Send SMS","Schedule Walkthrough","Prepare Offer","Send Contract","Call Again","SMS Follow-up","Wait for callback"].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Follow-up Date</label>
                    <input type="date" value={dispForm.followUpDate.includes(",") ? "" : dispForm.followUpDate} onChange={e=>setDispForm(f=>({...f,followUpDate:e.target.value}))} className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm outline-none focus:border-primary"/>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Outcome</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">{call.disposition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Next Step</span>
                    <span className="text-xs font-medium text-foreground">{call.nextStep}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Follow-up Date</span>
                    <span className="text-xs font-medium text-foreground">{call.followUpDate}</span>
                  </div>
                  {call.notes && <div className="mt-2 rounded-lg bg-background p-2.5 text-xs text-foreground/80 italic">"{call.notes}"</div>}
                </div>
              )}
            </div>

            {/* Related Property */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Related Property</p>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg" style={{background:call.gradient}}>
                  <div className="flex h-full items-center justify-center"><Home className="h-6 w-6 text-white/50"/></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{call.address}</p>
                  <p className="text-xs text-muted-foreground">{call.city}, {call.state}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Est. Value <span className="font-semibold text-foreground">${call.estValue.toLocaleString()}</span></p>
                </div>
                <button
                  onClick={() => setPropertyModalOpen(true)}
                  className="shrink-0 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-semibold transition hover:bg-primary hover:text-white hover:border-primary"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div className="space-y-3">
            {[
              { icon: call.direction==="outbound" ? PhoneOutgoing : PhoneIncoming, label: `${call.direction==="outbound"?"Outbound":"Inbound"} call — ${OUTCOME_CFG[call.outcome].label}`, time: call.dateTime, color: call.direction==="outbound"?"text-blue-500":"text-green-500" },
              { icon: MessageCircle, label:"Auto-SMS sent after call", time:"Queued", color:"text-green-500" },
              { icon: FileText,     label:"Call notes auto-saved", time:"Immediately", color:"text-muted-foreground" },
            ].map((item,i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border p-3">
                <div className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted", item.color)}>
                  <item.icon className="h-3.5 w-3.5"/>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "notes" && (
          <div className="space-y-3">
            <textarea
              value={notesVal}
              onChange={e => setNotesVal(e.target.value)}
              rows={7}
              placeholder="Add notes about this call..."
              className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={saveNotes}
              className={cn("inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition", notesVal !== call.notes ? "bg-primary hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed")}
            >
              <Save className="h-3.5 w-3.5"/> Save Notes
            </button>
            {notesVal === call.notes && call.notes && (
              <p className="text-xs text-muted-foreground">Saved · last updated {call.dateTime}</p>
            )}
          </div>
        )}

        {tab === "files" && (
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-10 text-muted-foreground cursor-pointer hover:border-primary hover:bg-accent/30 transition-colors">
              <FileText className="mb-3 h-10 w-10 opacity-20"/>
              <p className="text-sm font-medium">Drop files here</p>
              <p className="text-xs">or click to upload</p>
              <button onClick={() => showToast("File upload coming soon", "info")} className="mt-3 text-xs font-medium text-primary hover:text-primary/80">Browse files</button>
            </div>
          </div>
        )}
      </div>

      {propertyModalOpen && (
        <PropertyModal call={call} onClose={() => setPropertyModalOpen(false)} />
      )}
    </div>
  );

  return (
    <>
      {/* Desktop inline panel */}
      <div className="hidden lg:block h-full shrink-0">
        {panelContent}
      </div>

      {/* Mobile / Tablet slide-over drawer */}
      <div className="fixed inset-0 z-50 flex lg:hidden">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
        <div className="relative z-10 ml-auto h-full w-full max-w-sm animate-in slide-in-from-right duration-300">
          {panelContent}
        </div>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function CallsPage() {
  const [calls, setCalls]           = useState<CallRecord[]>(INIT_CALLS);
  const [userFilter, setUserFilter]   = useState("all");
  const [dateRange, setDateRange]     = useState("May 12 – May 18, 2024");
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [filterDirection, setFilterDirection] = useState("all");
  const [filterMinDur, setFilterMinDur]       = useState("");
  const [activeTab, setActiveTab]   = useState<TabKey>("all");
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(INIT_CALLS[0]);
  const [search, setSearch]         = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [dialerOpen, setDialerOpen] = useState(false);
  const [dialerTarget, setDialerTarget] = useState<{name:string;phone:string}>({name:"",phone:""});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol]       = useState<string>("dateTime");
  const [sortDir, setSortDir]       = useState<SortDir>("desc");
  const [toasts, setToasts]         = useState<Toast[]>([]);
  const perPage = 10;

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts(t => [...t, {id, message, type}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const removeToast = (id: number) => setToasts(t => t.filter(x => x.id !== id));

  const updateCall = (id: number, data: Partial<CallRecord>) => {
    setCalls(prev => prev.map(c => c.id === id ? {...c, ...data} : c));
    if (selectedCall?.id === id) setSelectedCall(prev => prev ? {...prev, ...data} : prev);
  };

  const deleteCall = (id: number) => {
    setCalls(prev => prev.filter(c => c.id !== id));
    if (selectedCall?.id === id) setSelectedCall(null);
    setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    showToast("Call deleted", "success");
  };

  const deleteSelected = () => {
    const count = selectedIds.size;
    setCalls(prev => prev.filter(c => !selectedIds.has(c.id)));
    if (selectedCall && selectedIds.has(selectedCall.id)) setSelectedCall(null);
    setSelectedIds(new Set());
    showToast(`${count} call(s) deleted`, "success");
  };

  const openDialer = (name: string, phone: string) => { setDialerTarget({name,phone}); setDialerOpen(true); };

  // Sort
  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d==="asc"?"desc":d==="desc"?null:"asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const tabCounts = {
    all:        calls.length,
    my:         calls.filter(c => c.calledBy === "Alex Carter").length,
    missed:     calls.filter(c => c.outcome==="no_answer"||c.outcome==="busy").length,
    voicemails: calls.filter(c => c.outcome==="voicemail").length,
  };

  const filtered = calls.filter(c => {
    const matchTab =
      activeTab==="all" ||
      (activeTab==="my" && c.calledBy==="Alex Carter") ||
      (activeTab==="missed" && (c.outcome==="no_answer"||c.outcome==="busy")) ||
      (activeTab==="voicemails" && c.outcome==="voicemail");
    const matchSearch    = search==="" || c.leadName.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchOutcome   = outcomeFilter==="all" || c.outcome===outcomeFilter;
    const matchUser      = userFilter==="all" || c.calledBy===userFilter;
    const matchDirection = filterDirection==="all" || c.direction===filterDirection;
    return matchTab && matchSearch && matchOutcome && matchUser && matchDirection;
  });

  const sorted = [...filtered].sort((a,b) => {
    if (!sortDir) return 0;
    let va = "", vb = "";
    if (sortCol==="leadName")  { va=a.leadName;  vb=b.leadName; }
    if (sortCol==="outcome")   { va=a.outcome;   vb=b.outcome; }
    if (sortCol==="duration")  { va=a.duration;  vb=b.duration; }
    if (sortCol==="calledBy")  { va=a.calledBy;  vb=b.calledBy; }
    if (sortCol==="dateTime")  { va=a.dateTime;  vb=b.dateTime; }
    return sortDir==="asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated  = sorted.slice((currentPage-1)*perPage, currentPage*perPage);
  const allSelected = paginated.length > 0 && paginated.every(c => selectedIds.has(c.id));

  const toggleAll = () => {
    if (allSelected) { const n = new Set(selectedIds); paginated.forEach(c => n.delete(c.id)); setSelectedIds(n); }
    else { const n = new Set(selectedIds); paginated.forEach(c => n.add(c.id)); setSelectedIds(n); }
  };
  const toggleOne = (id: number) => { const n = new Set(selectedIds); n.has(id) ? n.delete(id) : n.add(id); setSelectedIds(n); };

  const SortTh = ({ col, label }: { col: string; label: string }) => (
    <th className="whitespace-nowrap px-3 py-3 text-left">
      <button onClick={() => handleSort(col)} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors">
        {label}
        <ArrowUpDown className={cn("h-3 w-3 opacity-30", sortCol===col && sortDir && "opacity-100 text-primary")}/>
      </button>
    </th>
  );

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden">
      {/* Header + tabs */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Calls</h1>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"/>
          </div>
          <div className="mt-1 flex gap-0">
            {(["all","my","missed","voicemails"] as TabKey[]).map(t => (
              <button key={t} onClick={() => { setActiveTab(t); setCurrentPage(1); }}
                className={cn("relative px-4 py-1.5 text-sm font-medium capitalize transition-colors", activeTab===t ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-muted-foreground hover:text-foreground")}
              >
                {t==="all"?"All Calls":t==="my"?"My Calls":t==="missed"?"Missed Calls":"Voicemails"}
                <span className="ml-1.5 text-xs text-muted-foreground">{tabCounts[t]}</span>
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => openDialer("New Contact","(813) 555-")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary pl-4 pr-1 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
          <Phone className="h-4 w-4"/> Make a Call
          <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-md bg-white/20"><ChevronDown className="h-3.5 w-3.5"/></span>
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-3 overflow-x-auto border-b border-border px-6 py-3">
        {STATS.map(s => (
          <div key={s.label} className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{backgroundColor:s.color+"22"}}>
              <s.icon className="h-4 w-4" style={{color:s.color}}/>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-foreground">{s.value}</span>
                <span className={cn("text-[10px] font-semibold", s.up?"text-emerald-600":"text-red-500")}>{s.up?"↑":"↓"}{s.delta}%</span>
              </div>
              <p className="text-[9px] text-muted-foreground">vs last 30 days</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 flex-wrap">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
              <input value={search} onChange={e=>{setSearch(e.target.value);setCurrentPage(1);}} placeholder="Search calls..."
                className="h-9 w-44 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select value={outcomeFilter} onChange={e=>{setOutcomeFilter(e.target.value);setCurrentPage(1);}} className="h-9 rounded-lg border border-border bg-card px-2.5 text-sm text-foreground outline-none focus:border-primary cursor-pointer">
              <option value="all">All Outcomes</option>
              <option value="connected">Connected</option>
              <option value="no_answer">No Answer</option>
              <option value="voicemail">Voicemail</option>
              <option value="busy">Busy</option>
            </select>
            {/* Date range dropdown */}
            <DropdownMenu trigger={
              <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent">
                <Calendar className="h-4 w-4"/> {dateRange} <ChevronDown className="h-4 w-4"/>
              </button>
            }>
              <div className="p-1">
                {["Today","Yesterday","Last 7 days","Last 14 days","May 12 – May 18, 2024","Last 30 days","This month","Last month"].map(r => (
                  <button key={r} onClick={() => { setDateRange(r); setCurrentPage(1); }}
                    className={cn("flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-accent", dateRange===r ? "font-semibold text-primary" : "text-foreground")}>
                    {dateRange===r && <CheckCircle2 className="h-3.5 w-3.5 shrink-0"/>}
                    {dateRange!==r && <span className="w-3.5"/>}
                    {r}
                  </button>
                ))}
              </div>
            </DropdownMenu>

            {/* All Users dropdown */}
            <DropdownMenu trigger={
              <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent">
                <Users className="h-4 w-4"/> {userFilter==="all" ? "All Users" : userFilter} <ChevronDown className="h-4 w-4"/>
              </button>
            }>
              <div className="p-1">
                {[{v:"all",l:"All Users"},{v:"Alex Carter",l:"Alex Carter"},{v:"Lisa Martinez",l:"Lisa Martinez"},{v:"Mike Davis",l:"Mike Davis"}].map(u => (
                  <button key={u.v} onClick={() => { setUserFilter(u.v); setCurrentPage(1); }}
                    className={cn("flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-accent", userFilter===u.v ? "font-semibold text-primary" : "text-foreground")}>
                    {userFilter===u.v && <CheckCircle2 className="h-3.5 w-3.5 shrink-0"/>}
                    {userFilter!==u.v && <span className="w-3.5"/>}
                    {u.l}
                  </button>
                ))}
              </div>
            </DropdownMenu>

            {/* More Filters */}
            <button onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
              className={cn("inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition", moreFiltersOpen ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-foreground hover:bg-accent")}>
              <SlidersHorizontal className="h-4 w-4"/> More Filters
              {(filterDirection!=="all" || filterMinDur!=="") && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">{[filterDirection!=="all",filterMinDur!==""].filter(Boolean).length}</span>}
            </button>

            <button onClick={() => showToast("Exporting CSV…","info")} className="ml-auto inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent">
              <Upload className="h-4 w-4"/> Export
            </button>
          </div>

          {/* More Filters panel */}
          {moreFiltersOpen && (
            <div className="flex items-center gap-4 border-b border-border bg-muted/30 px-4 py-3 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground">Direction</label>
                <select value={filterDirection} onChange={e=>{setFilterDirection(e.target.value);setCurrentPage(1);}} className="h-8 rounded-lg border border-border bg-card px-2 text-sm outline-none focus:border-primary">
                  <option value="all">All</option>
                  <option value="outbound">Outbound</option>
                  <option value="inbound">Inbound</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground">Min Duration</label>
                <input value={filterMinDur} onChange={e=>setFilterMinDur(e.target.value)} placeholder="e.g. 02:00" className="h-8 w-24 rounded-lg border border-border bg-card px-2 text-sm outline-none focus:border-primary"/>
              </div>
              <button onClick={() => { setFilterDirection("all"); setFilterMinDur(""); }} className="text-xs text-muted-foreground hover:text-foreground transition">
                Clear filters
              </button>
            </div>
          )}

          {/* Bulk action bar */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-4 py-2.5">
              <span className="text-sm font-semibold text-primary">{selectedIds.size} selected</span>
              <button onClick={() => showToast(`Exporting ${selectedIds.size} calls…`,"info")} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-accent">
                <Upload className="h-3.5 w-3.5"/> Export Selected
              </button>
              <button onClick={deleteSelected} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-red-50 border border-red-200 px-3 text-sm font-medium text-red-600 transition hover:bg-red-100">
                <Trash2 className="h-3.5 w-3.5"/> Delete Selected
              </button>
              <button onClick={() => setSelectedIds(new Set())} className="ml-auto text-xs text-muted-foreground hover:text-foreground transition">Clear</button>
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-border bg-muted/60">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 rounded accent-primary cursor-pointer"/>
                  </th>
                  <SortTh col="leadName" label="Contact"/>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone Number</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Direction</th>
                  <SortTh col="outcome" label="Outcome"/>
                  <SortTh col="duration" label="Duration"/>
                  <SortTh col="dateTime" label="Call Date & Time"/>
                  <SortTh col="calledBy" label="Called By"/>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recording</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((call, i) => (
                  <tr key={call.id} onClick={() => setSelectedCall(call)}
                    className={cn("group cursor-pointer border-b border-border transition-colors hover:bg-accent/30", selectedCall?.id===call.id && "bg-primary/5", i%2!==0 && "bg-muted/20")}
                  >
                    <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                      <input type="checkbox" checked={selectedIds.has(call.id)} onChange={()=>toggleOne(call.id)} className="h-4 w-4 rounded accent-primary cursor-pointer"/>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{backgroundColor:call.leadColor}}>
                          {call.leadInitials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{call.leadName}</p>
                          <p className="text-[11px] text-muted-foreground">{call.address}, {call.city}, {call.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm tabular-nums text-muted-foreground">{call.phone}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        {call.direction==="outbound" ? <ArrowUpRight className="h-3.5 w-3.5 text-blue-500"/> : <ArrowDownLeft className="h-3.5 w-3.5 text-green-500"/>}
                        <span className="text-sm text-foreground capitalize">{call.direction}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", OUTCOME_CFG[call.outcome].bg, OUTCOME_CFG[call.outcome].text)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", OUTCOME_CFG[call.outcome].dot)}/>{OUTCOME_CFG[call.outcome].label}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm tabular-nums text-foreground">{call.duration}</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground whitespace-nowrap">{call.dateTime}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{backgroundColor:call.calledByColor}}>
                          {call.calledByInitials}
                        </div>
                        <span className="text-sm text-foreground">{call.calledBy}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {call.recordingAvailable ? (
                        <div className="flex items-center gap-1.5">
                          <button onClick={e=>e.stopPropagation()} className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white">
                            <Play className="h-3 w-3 translate-x-px"/>
                          </button>
                          <span className="text-xs tabular-nums text-muted-foreground">{call.recordingDuration}</span>
                        </div>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="px-3 py-3" onClick={e=>e.stopPropagation()}>
                      <RowMenu call={call} onDelete={() => deleteCall(call.id)} onCall={() => openDialer(call.leadName, call.phone)} showToast={showToast}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <span className="text-sm text-muted-foreground">
              Showing {sorted.length===0?0:Math.min((currentPage-1)*perPage+1,sorted.length)}–{Math.min(currentPage*perPage,sorted.length)} of {sorted.length} calls
            </span>
            <div className="flex items-center gap-1">
              <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:bg-accent disabled:opacity-40">
                <ChevronLeft className="h-4 w-4"/>
              </button>
              {Array.from({length:Math.min(5,totalPages)},(_,i)=>i+1).map(p=>(
                <button key={p} onClick={()=>setCurrentPage(p)} className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition", currentPage===p?"bg-primary text-white":"border border-border bg-card text-foreground hover:bg-accent")}>{p}</button>
              ))}
              {totalPages>5 && <><span className="px-1 text-muted-foreground">…</span><button onClick={()=>setCurrentPage(totalPages)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-accent">{totalPages}</button></>}
              <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages||totalPages===0} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:bg-accent disabled:opacity-40">
                <ChevronRight className="h-4 w-4"/>
              </button>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selectedCall && (
          <CallDetailPanel
            call={selectedCall}
            onClose={() => setSelectedCall(null)}
            onUpdate={updateCall}
            onCall={() => openDialer(selectedCall.leadName, selectedCall.phone)}
            showToast={showToast}
          />
        )}
      </div>

      {/* Dialer */}
      <DialerModal open={dialerOpen} name={dialerTarget.name} phone={dialerTarget.phone} onClose={() => setDialerOpen(false)}/>

      {/* Toasts */}
      <ToastList toasts={toasts} remove={removeToast}/>
    </div>
  );
}
