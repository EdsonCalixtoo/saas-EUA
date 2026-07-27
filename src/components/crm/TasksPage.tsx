import { useState } from "react";
import {
  CheckSquare, Calendar as CalendarIcon, Clock, Filter, Plus, Search,
  CheckCircle2, AlertCircle, Phone, Home, Mail, FileText, User, Users,
  ChevronLeft, ChevronRight, MoreHorizontal, ArrowUpDown, Trash2, Pencil,
  X, Check, Flame, AlertTriangle, Play, Zap, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = "list" | "calendar" | "board";
type TaskPriority = "high" | "medium" | "low";
type TaskType = "call" | "walkthrough" | "offer" | "title" | "email" | "sms";

interface CrmTask {
  id: number;
  title: string;
  type: TaskType;
  priority: TaskPriority;
  dueDate: string;
  dueTime: string;
  overdue?: boolean;
  completed: boolean;
  assignedTo: string;
  assignedInitials: string;
  assignedColor: string;
  leadName: string;
  leadPhone: string;
  propertyAddress: string;
  city: string;
  description: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_TASKS: CrmTask[] = [
  {
    id: 1,
    title: "Follow-up Call on $28.5k Cash Offer",
    type: "call",
    priority: "high",
    dueDate: "Today",
    dueTime: "2:00 PM",
    overdue: true,
    completed: false,
    assignedTo: "Alex Carter",
    assignedInitials: "AC",
    assignedColor: "oklch(0.55 0.22 265)",
    leadName: "John Smith",
    leadPhone: "(813) 555-2234",
    propertyAddress: "123 Main St",
    city: "Tampa, FL",
    description: "Seller requested 2 days to discuss offer with spouse. Call back to finalize contract terms.",
  },
  {
    id: 2,
    title: "On-site Property Walkthrough & Inspection",
    type: "walkthrough",
    priority: "high",
    dueDate: "Today",
    dueTime: "4:30 PM",
    completed: false,
    assignedTo: "Alex Carter",
    assignedInitials: "AC",
    assignedColor: "oklch(0.55 0.22 265)",
    leadName: "Emily Brown",
    leadPhone: "(321) 555-3456",
    propertyAddress: "321 Elm St",
    city: "Kissimmee, FL",
    description: "Lockbox code is 4821. Inspect roof condition, HVAC age, and foundation cracks.",
  },
  {
    id: 3,
    title: "Send Formal Purchase Agreement via Docusign",
    type: "offer",
    priority: "medium",
    dueDate: "Tomorrow",
    dueTime: "10:00 AM",
    completed: false,
    assignedTo: "Lisa Martinez",
    assignedInitials: "LM",
    assignedColor: "oklch(0.68 0.19 275)",
    leadName: "David Wilson",
    leadPhone: "(407) 555-1357",
    propertyAddress: "369 Lake Dr",
    city: "Lakeland, FL",
    description: "Prepare agreement for $62,000 purchase price with 21-day closing timeline.",
  },
  {
    id: 4,
    title: "Title Search & Lien Verification Follow-up",
    type: "title",
    priority: "high",
    dueDate: "May 22, 2024",
    dueTime: "11:30 AM",
    completed: false,
    assignedTo: "Mike Davis",
    assignedInitials: "MD",
    assignedColor: "oklch(0.72 0.17 155)",
    leadName: "Robert Anderson",
    leadPhone: "(813) 555-4680",
    propertyAddress: "813 Bay Blvd",
    city: "Tampa, FL",
    description: "Check with Preferred Title for clear title commitment and tax deed status.",
  },
  {
    id: 5,
    title: "Send Automated SMS Sequence to New Lead",
    type: "sms",
    priority: "low",
    dueDate: "May 23, 2024",
    dueTime: "3:00 PM",
    completed: true,
    assignedTo: "Lisa Martinez",
    assignedInitials: "LM",
    assignedColor: "oklch(0.68 0.19 275)",
    leadName: "Mike Torres",
    leadPhone: "(407) 555-6678",
    propertyAddress: "466 Oak Ave",
    city: "Orlando, FL",
    description: "Outreach text sent automatically.",
  },
];

const TASK_STATS = [
  { label: "Total Tasks",   value: "24", delta: 12.5, up: true,  icon: CheckSquare,   color: "oklch(0.55 0.22 265)" },
  { label: "Due Today",     value: "5",  delta: 2,    up: true,  icon: Clock,         color: "oklch(0.78 0.17 75)"  },
  { label: "Overdue",       value: "1",  delta: -1,   up: false, icon: AlertTriangle, color: "oklch(0.62 0.24 27)"  },
  { label: "Completed",     value: "18", delta: 15.0, up: true,  icon: CheckCircle2,  color: "oklch(0.72 0.17 155)" },
  { label: "High Priority", value: "3",  delta: 0,    up: true,  icon: Flame,         color: "oklch(0.65 0.24 25)"  },
];

const TYPE_CONFIG: Record<TaskType, { label: string; icon: any; bg: string; text: string }> = {
  call:        { label: "Call",        icon: Phone,       bg: "bg-blue-500/10",   text: "text-blue-600" },
  walkthrough: { label: "Walkthrough", icon: Home,        bg: "bg-purple-500/10", text: "text-purple-600" },
  offer:       { label: "Offer",       icon: FileText,    bg: "bg-orange-500/10", text: "text-orange-600" },
  title:       { label: "Title Check", icon: Building2,   bg: "bg-amber-500/10",  text: "text-amber-600" },
  email:       { label: "Email",       icon: Mail,        bg: "bg-indigo-500/10", text: "text-indigo-600" },
  sms:         { label: "SMS",         icon: CheckSquare, bg: "bg-green-500/10",  text: "text-green-600" },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export function TasksPage() {
  const [tasks, setTasks]                 = useState<CrmTask[]>(MOCK_TASKS);
  const [viewMode, setViewMode]           = useState<ViewMode>("list");
  const [search, setSearch]               = useState("");
  const [statusFilter, setStatusFilter]   = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter]       = useState("all");
  const [showAddModal, setShowAddModal]   = useState(false);
  const [toastMsg, setToastMsg]           = useState<string | null>(null);

  // New task state
  const [newTaskTitle, setNewTaskTitle]     = useState("");
  const [newTaskType, setNewTaskType]       = useState<TaskType>("call");
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>("high");
  const [newTaskLead, setNewTaskLead]       = useState("");
  const [newTaskProperty, setNewTaskProperty] = useState("");
  const [newTaskDate, setNewTaskDate]       = useState("");
  const [newTaskDesc, setNewTaskDesc]       = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const toggleComplete = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const next = !t.completed;
        showToast(next ? "Task marked as completed!" : "Task marked as pending");
        return { ...t, completed: next, overdue: next ? false : t.overdue };
      }
      return t;
    }));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast("Task deleted");
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;

    const created: CrmTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      type: newTaskType,
      priority: newTaskPriority,
      dueDate: newTaskDate || "Today",
      dueTime: "2:00 PM",
      completed: false,
      assignedTo: "Alex Carter",
      assignedInitials: "AC",
      assignedColor: "oklch(0.55 0.22 265)",
      leadName: newTaskLead || "John Smith",
      leadPhone: "(813) 555-0000",
      propertyAddress: newTaskProperty || "123 Main St",
      city: "Tampa, FL",
      description: newTaskDesc.trim() || "Follow up on real estate lead details.",
    };

    setTasks(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewTaskTitle("");
    setNewTaskDesc("");
    showToast("New task created successfully!");
  };

  const filteredTasks = tasks.filter(t => {
    const matchSearch = search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.leadName.toLowerCase().includes(search.toLowerCase()) ||
      t.propertyAddress.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" ||
      (statusFilter === "pending" && !t.completed) ||
      (statusFilter === "completed" && t.completed) ||
      (statusFilter === "overdue" && t.overdue);
    const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
    const matchType     = typeFilter === "all" || t.type === typeFilter;
    return matchSearch && matchStatus && matchPriority && matchType;
  });

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-background">
      {/* ── Header & Stats ────────────────────────────────────────── */}
      <div className="flex flex-col border-b border-border bg-card">
        {/* Title + Action buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Tasks & Calendar</h1>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">5 Pending Today</span>
            </div>
            <p className="text-xs text-muted-foreground">Manage your seller follow-ups, walkthrough appointments, and deal milestones.</p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex rounded-xl border border-border bg-background p-1">
              {(["list", "calendar"] as ViewMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors",
                    viewMode === m ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {m === "list" ? <CheckSquare className="h-3.5 w-3.5" /> : <CalendarIcon className="h-3.5 w-3.5" />}
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-primary/90 shadow-sm transition"
            >
              <Plus className="h-4 w-4" />
              Add New Task
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-none">
          {TASK_STATS.map(s => (
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
      </div>

      {/* ── Toolbar / Filters ───────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter tasks..."
              className="h-8 w-44 rounded-lg border border-border bg-background pl-8 pr-3 text-xs outline-none focus:border-primary"
            />
          </div>

          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground outline-none">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="completed">Completed</option>
          </select>

          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground outline-none">
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground outline-none">
            <option value="all">All Types</option>
            <option value="call">Calls</option>
            <option value="walkthrough">Walkthroughs</option>
            <option value="offer">Offers</option>
            <option value="title">Title Checks</option>
          </select>
        </div>

        <span className="text-xs text-muted-foreground font-medium">Showing {filteredTasks.length} tasks</span>
      </div>

      {/* ── Main View Content ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === "list" && (
          <div className="space-y-3 max-w-5xl mx-auto">
            {filteredTasks.length === 0 ? (
              <div className="py-20 text-center text-sm text-muted-foreground">No tasks found matching your filters.</div>
            ) : (
              filteredTasks.map(task => {
                const TypeIcon = TYPE_CONFIG[task.type].icon;
                return (
                  <div
                    key={task.id}
                    className={cn(
                      "group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/40",
                      task.completed && "opacity-60 bg-muted/20",
                      task.overdue && !task.completed && "border-red-300 bg-red-500/5",
                    )}
                  >
                    {/* Checkbox Button */}
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition",
                        task.completed
                          ? "bg-primary border-primary text-white"
                          : "border-border bg-background hover:border-primary text-transparent",
                      )}
                    >
                      <Check className="h-4 w-4 stroke-[3]" />
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold", TYPE_CONFIG[task.type].bg, TYPE_CONFIG[task.type].text)}>
                          <TypeIcon className="h-3 w-3" />
                          {TYPE_CONFIG[task.type].label}
                        </span>

                        <span className={cn(
                          "rounded-md px-2 py-0.5 text-[10px] font-bold capitalize",
                          task.priority === "high" ? "bg-red-100 text-red-700" : task.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700",
                        )}>
                          {task.priority} Priority
                        </span>

                        {task.overdue && !task.completed && (
                          <span className="rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white animate-pulse">
                            OVERDUE
                          </span>
                        )}
                      </div>

                      <h3 className={cn("text-sm font-bold text-foreground mt-1.5", task.completed && "line-through text-muted-foreground")}>
                        {task.title}
                      </h3>

                      <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>

                      {/* Details row */}
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5 text-primary" />
                          <span className="font-semibold text-foreground">{task.leadName}</span>
                          <span>({task.leadPhone})</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Home className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{task.propertyAddress}, {task.city}</span>
                        </div>

                        <div className="flex items-center gap-1 ml-auto">
                          <Clock className="h-3.5 w-3.5" />
                          <span className="font-medium">{task.dueDate} at {task.dueTime}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: task.assignedColor }}>
                            {task.assignedInitials}
                          </div>
                          <span className="text-[11px] font-medium">{task.assignedTo}</span>
                        </div>

                        <button onClick={() => deleteTask(task.id)} className="text-muted-foreground hover:text-red-500 transition">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {viewMode === "calendar" && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">May 2024 Schedule</h2>
              <div className="flex items-center gap-1">
                <button className="rounded-lg border border-border p-1.5 hover:bg-accent"><ChevronLeft className="h-4 w-4" /></button>
                <span className="text-xs font-semibold px-2">May 19 – May 25, 2024</span>
                <button className="rounded-lg border border-border p-1.5 hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Calendar Grid Days */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-muted-foreground border-b border-border pb-2">
              <span>Sun 19</span>
              <span>Mon 20</span>
              <span className="text-primary font-extrabold">Tue 21 (Today)</span>
              <span>Wed 22</span>
              <span>Thu 23</span>
              <span>Fri 24</span>
              <span>Sat 25</span>
            </div>

            <div className="grid grid-cols-7 gap-2 min-h-80">
              {["19", "20", "21", "22", "23", "24", "25"].map((day, idx) => (
                <div key={day} className={cn("rounded-xl border border-border/60 p-2 space-y-2 min-h-64", idx === 2 && "bg-primary/5 border-primary/40")}>
                  <p className="text-xs font-bold text-foreground">{day}</p>
                  {idx === 2 && (
                    <div className="rounded-lg bg-blue-500/10 border border-blue-200 p-2 text-[10px] space-y-1">
                      <p className="font-bold text-blue-700">2:00 PM · Follow-up Call</p>
                      <p className="text-blue-900 truncate">John Smith (123 Main St)</p>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="rounded-lg bg-purple-500/10 border border-purple-200 p-2 text-[10px] space-y-1">
                      <p className="font-bold text-purple-700">4:30 PM · Walkthrough</p>
                      <p className="text-purple-900 truncate">Emily Brown (321 Elm St)</p>
                    </div>
                  )}
                  {idx === 3 && (
                    <div className="rounded-lg bg-orange-500/10 border border-orange-200 p-2 text-[10px] space-y-1">
                      <p className="font-bold text-orange-700">10:00 AM · Send Agreement</p>
                      <p className="text-orange-900 truncate">David Wilson</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Add Task Modal ─────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Create New Task / Reminder</h3>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Task Title</label>
                <input
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Call John Smith to close offer..."
                  className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Task Type</label>
                  <select value={newTaskType} onChange={e => setNewTaskType(e.target.value as TaskType)} className="h-9 w-full rounded-xl border border-border bg-background px-2 text-xs outline-none focus:border-primary">
                    <option value="call">Call Seller</option>
                    <option value="walkthrough">Walkthrough / Inspection</option>
                    <option value="offer">Send Offer / Contract</option>
                    <option value="title">Title Check</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Priority</label>
                  <select value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value as TaskPriority)} className="h-9 w-full rounded-xl border border-border bg-background px-2 text-xs outline-none focus:border-primary">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Related Lead</label>
                  <input
                    value={newTaskLead}
                    onChange={e => setNewTaskLead(e.target.value)}
                    placeholder="John Smith"
                    className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Property Address</label>
                  <input
                    value={newTaskProperty}
                    onChange={e => setNewTaskProperty(e.target.value)}
                    placeholder="123 Main St"
                    className="h-9 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Description / Notes</label>
                <textarea
                  value={newTaskDesc}
                  onChange={e => setNewTaskDesc(e.target.value)}
                  rows={3}
                  placeholder="Notes about this task..."
                  className="w-full resize-none rounded-xl border border-border bg-background p-3 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
              <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold hover:bg-accent">
                Cancel
              </button>
              <button onClick={handleCreateTask} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90">
                Save Task
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
