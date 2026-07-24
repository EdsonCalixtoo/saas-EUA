// =============================================================================
// DASHBOARD MOCK DATA — US Real Estate Investing Market  v2
// =============================================================================

export type TrendDirection = "up" | "down" | "neutral"

export interface KpiData {
  id: string
  label: string
  value: string
  rawValue: number
  change: string
  changeValue: number
  direction: TrendDirection
  period: string
  tooltip: string
  description: string
  sparkline: number[]  // last 12 data points
}

export interface PipelineStage {
  id: string
  name: string
  count: number
  value: number
  conversionRate: number | null
  health: "strong" | "normal" | "weak"
}

export interface PerformanceDataPoint {
  date: string
  leadsCreated: number
  leadsContacted: number
  appointments: number
  offersSent: number
  dealsClosed: number
}

export interface LeadSource {
  id: string
  source: string
  leads: number
  contactRate: number
  appointmentRate: number
  conversionRate: number
  costPerLead: number
  revenueGenerated: number
}

export interface AiInsight {
  id: string
  priority: "high" | "medium" | "low"
  title: string
  reason: string
  action: string
  actionLabel: string
  dismissed: boolean
}

export interface ActivityEvent {
  id: string
  type: "call" | "sms" | "email" | "note" | "stage_change" | "property_added" | "task_complete" | "campaign_response"
  lead?: string
  property?: string
  agent: string
  agentInitials: string
  timestamp: string
  outcome?: string
  status: "completed" | "missed" | "pending"
  details: string
}

export interface Task {
  id: string
  title: string
  due: string
  assignee: string
  priority: "high" | "medium" | "low"
  status: "overdue" | "due_today" | "upcoming" | "completed"
  type: "call" | "appointment" | "followup" | "task"
  lead?: string
}

export interface PropertyActivity {
  label: string
  value: number
  icon: string
  change: string
  direction: TrendDirection
}

// ─── KPI Data ─────────────────────────────────────────────────────────────────

export const kpiData: KpiData[] = [
  {
    id: "new-leads",
    label: "New Leads",
    value: "128",
    rawValue: 128,
    change: "+24%",
    changeValue: 24,
    direction: "up",
    period: "vs last 7 days",
    tooltip: "New leads added",
    description: "",
    sparkline: [],
  },
  {
    id: "calls-made",
    label: "Calls Made",
    value: "342",
    rawValue: 342,
    change: "+18%",
    changeValue: 18,
    direction: "up",
    period: "vs last 7 days",
    tooltip: "Outbound calls",
    description: "",
    sparkline: [],
  },
  {
    id: "sms-sent",
    label: "SMS Sent",
    value: "1,248",
    rawValue: 1248,
    change: "+32%",
    changeValue: 32,
    direction: "up",
    period: "vs last 7 days",
    tooltip: "Outbound texts",
    description: "",
    sparkline: [],
  },
  {
    id: "emails-sent",
    label: "Emails Sent",
    value: "876",
    rawValue: 876,
    change: "+27%",
    changeValue: 27,
    direction: "up",
    period: "vs last 7 days",
    tooltip: "Outbound emails",
    description: "",
    sparkline: [],
  },
  {
    id: "deals-closed",
    label: "Deals Closed",
    value: "9",
    rawValue: 9,
    change: "+80%",
    changeValue: 80,
    direction: "up",
    period: "vs last 7 days",
    tooltip: "Successfully closed",
    description: "",
    sparkline: [],
  },
  {
    id: "revenue",
    label: "Revenue",
    value: "$186,500",
    rawValue: 186500,
    change: "+42%",
    changeValue: 42,
    direction: "up",
    period: "vs last 7 days",
    tooltip: "Total estimated revenue",
    description: "",
    sparkline: [],
  },
]

// ─── Pipeline Stages ──────────────────────────────────────────────────────────

export const pipelineStages: PipelineStage[] = [
  { id: "new-lead",       name: "New Lead",       count: 89,  value: 11200000, conversionRate: null,  health: "strong" },
  { id: "contacted",      name: "Contacted",      count: 61,  value: 8050000,  conversionRate: 68.5,  health: "strong" },
  { id: "qualified",      name: "Qualified",      count: 38,  value: 5350000,  conversionRate: 62.3,  health: "normal" },
  { id: "appointment",    name: "Appointment",    count: 22,  value: 3200000,  conversionRate: 57.9,  health: "normal" },
  { id: "offer-sent",     name: "Offer Sent",     count: 15,  value: 2100000,  conversionRate: 68.2,  health: "strong" },
  { id: "negotiation",    name: "Negotiation",    count: 9,   value: 1380000,  conversionRate: 60.0,  health: "normal" },
  { id: "under-contract", name: "Under Contract", count: 5,   value: 890000,   conversionRate: 55.6,  health: "weak"   },
  { id: "closed",         name: "Closed",         count: 8,   value: 1240000,  conversionRate: null,  health: "strong" },
  { id: "lost",           name: "Lost",           count: 12,  value: 0,        conversionRate: null,  health: "weak"   },
]

export const pipelineFunnelData = [
  { name: "New",         value: 128 },
  { name: "Contacted",   value: 64 },
  { name: "Interested",  value: 32 },
  { name: "Offer Sent",  value: 16 },
  { name: "Negotiation", value: 9 },
  { name: "Closed",      value: 9 },
]

// ─── Performance Chart Data ───────────────────────────────────────────────────

function generateDays(count: number): PerformanceDataPoint[] {
  const now = new Date()
  let leads = 14
  let contacted = 9
  let appts = 4
  let offers = 2
  let closed = 0

  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (count - 1 - i))
    const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    // Trending upward with natural variance
    leads = Math.max(5, leads + Math.floor((Math.random() - 0.4) * 4))
    contacted = Math.max(3, contacted + Math.floor((Math.random() - 0.4) * 3))
    appts = Math.max(1, appts + Math.floor((Math.random() - 0.45) * 2))
    offers = Math.max(0, offers + Math.floor((Math.random() - 0.5) * 1))
    closed = Math.random() > 0.7 ? 1 : 0

    return {
      date: dateStr,
      leadsCreated: leads,
      leadsContacted: Math.min(contacted, leads),
      appointments: Math.min(appts, contacted),
      offersSent: Math.min(offers, appts),
      dealsClosed: closed,
    }
  })
}

export const performanceData: Record<string, PerformanceDataPoint[]> = {
  "7d":  generateDays(7),
  "30d": generateDays(30),
  "90d": generateDays(90),
  "12m": generateDays(365),
}

// ─── Lead Source Performance ──────────────────────────────────────────────────

export const leadSources: LeadSource[] = [
  { id: "ref",    source: "Referral",            leads: 18,  contactRate: 94,  appointmentRate: 72, conversionRate: 44, costPerLead: 0,    revenueGenerated: 148000 },
  { id: "web",    source: "Website",             leads: 29,  contactRate: 81,  appointmentRate: 48, conversionRate: 24, costPerLead: 65,   revenueGenerated: 91000  },
  { id: "dfd",    source: "Driving for Dollars", leads: 62,  contactRate: 72,  appointmentRate: 38, conversionRate: 14, costPerLead: 0,    revenueGenerated: 86000  },
  { id: "mail",   source: "Direct Mail",         leads: 48,  contactRate: 45,  appointmentRate: 22, conversionRate: 10, costPerLead: 42,   revenueGenerated: 62000  },
  { id: "sms",    source: "SMS Campaign",        leads: 134, contactRate: 38,  appointmentRate: 15, conversionRate: 6,  costPerLead: 8,    revenueGenerated: 52000  },
  { id: "cold",   source: "Cold Calling",        leads: 81,  contactRate: 55,  appointmentRate: 18, conversionRate: 8,  costPerLead: 12,   revenueGenerated: 44000  },
  { id: "list",   source: "Purchased List",      leads: 55,  contactRate: 28,  appointmentRate: 8,  conversionRate: 3,  costPerLead: 22,   revenueGenerated: 18000  },
]

export const leadSourceChartData = [
  { name: "Property Radar", value: 42 },
  { name: "Skip Trace",     value: 28 },
  { name: "Driving for $",  value: 16 },
  { name: "Referrals",      value: 8  },
  { name: "Other",          value: 6  },
]

// ─── AI Insights ──────────────────────────────────────────────────────────────

export const aiInsights: AiInsight[] = [
  {
    id: "ai-1",
    priority: "high",
    title: "3 hot leads haven't been contacted in 7+ days",
    reason: "Robert Johnson, Patricia Williams, and David Chen match your top seller profile but risk going cold.",
    action: "/leads?filter=high-probability-stale",
    actionLabel: "View Leads",
    dismissed: false,
  },
  {
    id: "ai-2",
    priority: "high",
    title: "Deal with Marcus T. stalled at Negotiation (18 days)",
    reason: "Similar deals in your pipeline close or fall off within 12 days at this stage. Act now.",
    action: "/deals/marcus-thompson",
    actionLabel: "Open Deal",
    dismissed: false,
  },
  {
    id: "ai-3",
    priority: "medium",
    title: "Memphis SMS Campaign response rate dropped 22%",
    reason: "Your 'Memphis Absentee Owners' campaign is 22% below its 30-day baseline this week.",
    action: "/campaigns/memphis-absentee",
    actionLabel: "Review Campaign",
    dismissed: false,
  },
  {
    id: "ai-4",
    priority: "low",
    title: "7 properties show strong equity signals in 38103",
    reason: "Based on ownership duration (12+ yrs), tax delinquency status, and current market comps.",
    action: "/properties?filter=high-equity-38103",
    actionLabel: "View Properties",
    dismissed: false,
  },
]

// ─── Recent Activity ──────────────────────────────────────────────────────────

export const recentActivity: ActivityEvent[] = [
  {
    id: "act-1",
    type: "call",
    lead: "Robert Johnson",
    agent: "You",
    agentInitials: "JD",
    timestamp: "2 min ago",
    outcome: "Answered — motivated seller",
    status: "completed",
    details: "Discussed property at 2847 Oak Hollow Dr. Seller open to offer around $118K.",
  },
  {
    id: "act-2",
    type: "stage_change",
    lead: "Patricia Williams",
    agent: "You",
    agentInitials: "JD",
    timestamp: "14 min ago",
    outcome: "Moved to Offer Sent",
    status: "completed",
    details: "Offer of $124,000 submitted for 451 Westfield Ave, Memphis, TN 38109.",
  },
  {
    id: "act-3",
    type: "sms",
    lead: "David Chen",
    agent: "You",
    agentInitials: "JD",
    timestamp: "32 min ago",
    outcome: "No reply yet",
    status: "pending",
    details: "Follow-up SMS sent: 'Hey David, still interested in the property at 114 Maple Ave?'",
  },
  {
    id: "act-4",
    type: "email",
    lead: "Sandra Lopez",
    agent: "James R.",
    agentInitials: "JR",
    timestamp: "1 hr ago",
    outcome: "Opened, no click",
    status: "completed",
    details: "Initial outreach email sent — property condition questionnaire attached.",
  },
  {
    id: "act-5",
    type: "task_complete",
    lead: "Marcus Thompson",
    agent: "You",
    agentInitials: "JD",
    timestamp: "1 hr ago",
    outcome: "Task marked complete",
    status: "completed",
    details: "Pulled comps for 501 River Bend Ct. ARV estimated at $198K, repairs ~$32K.",
  },
  {
    id: "act-6",
    type: "property_added",
    property: "9812 Elmwood Blvd, Nashville, TN 37209",
    agent: "You",
    agentInitials: "JD",
    timestamp: "3 hrs ago",
    outcome: "Added to watch list",
    status: "completed",
    details: "Distress signal detected: 3 years delinquent taxes, high equity, absentee owner.",
  },
  {
    id: "act-7",
    type: "call",
    lead: "Harold Burke",
    agent: "James R.",
    agentInitials: "JR",
    timestamp: "4 hrs ago",
    outcome: "Voicemail left",
    status: "missed",
    details: "Second attempt on 1209 Crestwood Blvd — no answer, voicemail #2 sent.",
  },
  {
    id: "act-8",
    type: "campaign_response",
    lead: "Teresa Walton",
    agent: "System",
    agentInitials: "SY",
    timestamp: "5 hrs ago",
    outcome: "Replied to SMS",
    status: "completed",
    details: "Responded to Memphis Absentee Owners campaign: 'Yes, I'm interested in selling.'",
  },
]

// ─── Tasks & Appointments ─────────────────────────────────────────────────────

export const tasks: Task[] = [
  { id: "t-1", title: "Call back Patricia Williams",           due: "Today, 2:00 PM",     assignee: "You",       priority: "high",   status: "due_today",  type: "call",        lead: "Patricia Williams" },
  { id: "t-2", title: "Review offer for 2847 Oak Hollow Dr",  due: "Today, 4:00 PM",     assignee: "You",       priority: "high",   status: "due_today",  type: "task",        lead: "Robert Johnson" },
  { id: "t-3", title: "Send contract to Marcus Thompson",      due: "Yesterday, 5:00 PM", assignee: "You",       priority: "high",   status: "overdue",    type: "task",        lead: "Marcus Thompson" },
  { id: "t-4", title: "Appointment: David Chen property walk", due: "Tomorrow, 10:00 AM", assignee: "You",       priority: "medium", status: "upcoming",   type: "appointment", lead: "David Chen" },
  { id: "t-5", title: "Follow up with Sandra Lopez",           due: "Tomorrow, 3:00 PM",  assignee: "James R.",  priority: "medium", status: "upcoming",   type: "followup",    lead: "Sandra Lopez" },
  { id: "t-6", title: "Review Memphis SMS campaign analytics", due: "Jul 25, 9:00 AM",    assignee: "You",       priority: "low",    status: "upcoming",   type: "task" },
  { id: "t-7", title: "Pulled comps for 501 River Bend Ct",   due: "Today, 11:00 AM",    assignee: "You",       priority: "medium", status: "completed",  type: "task",        lead: "Marcus Thompson" },
]

// ─── Property Activity ────────────────────────────────────────────────────────

export const propertyActivity: PropertyActivity[] = [
  { label: "Properties Added",      value: 34,   icon: "Building2",     change: "+12%", direction: "up" },
  { label: "Properties Scanned",    value: 1842, icon: "ScanSearch",    change: "+8%",  direction: "up" },
  { label: "Saved Properties",      value: 127,  icon: "Bookmark",      change: "+23%", direction: "up" },
  { label: "New Distress Signals",  value: 18,   icon: "AlertTriangle", change: "+5",   direction: "up" },
  { label: "Skip Traces Completed", value: 56,   icon: "UserSearch",    change: "-3",   direction: "down" },
]
