import { useState } from "react";
import { ArrowLeft, Search, Building2, User, CreditCard, Users, Briefcase, Calendar, Mail, Phone, MessageCircle, Database, LayoutTemplate, SlidersHorizontal, UploadCloud, Target, Globe, Activity, Link, Shield, Tags, FlaskConical, ClipboardList, Palette, ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types & Data ────────────────────────────────────────────────────────────
type SettingsSection = {
  title: string;
  items: { id: string; label: string; icon: any; isNew?: boolean }[];
};

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: "My Business",
    items: [
      { id: "business-profile", label: "Business Profile", icon: Building2 },
      { id: "my-profile", label: "My Profile", icon: User },
      { id: "billing", label: "Billing", icon: CreditCard },
      { id: "my-staff", label: "My Staff", icon: Users },
      { id: "opportunities-pipelines", label: "Opportunities & Pipelines", icon: Briefcase },
    ],
  },
  {
    title: "Business Services",
    items: [
      { id: "calendars", label: "Calendars", icon: Calendar },
      { id: "email-services", label: "Email Services", icon: Mail },
      { id: "phone-system", label: "Phone System", icon: Phone },
      { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
    ],
  },
  {
    title: "Other Settings",
    items: [
      { id: "objects", label: "Objects", icon: Database },
      { id: "custom-fields", label: "Custom Fields", icon: LayoutTemplate },
      { id: "custom-values", label: "Custom Values", icon: SlidersHorizontal },
      { id: "import-data", label: "Import Data", icon: UploadCloud },
      { id: "manage-scoring", label: "Manage Scoring", icon: Target },
      { id: "domains-url-redirects", label: "Domains & URL Redirects", icon: Globe },
      { id: "external-tracking", label: "External Tracking", icon: Activity },
      { id: "integrations", label: "Integrations", icon: Link },
      { id: "private-integrations", label: "Private Integrations", icon: Shield },
      { id: "tags", label: "Tags", icon: Tags },
      { id: "labs", label: "Labs", icon: FlaskConical, isNew: true },
      { id: "audit-logs", label: "Audit Logs", icon: ClipboardList },
      { id: "brand-boards", label: "Brand Boards", icon: Palette },
    ],
  },
];

export function SettingsPage() {
  const [activeItem, setActiveItem] = useState("business-profile");
  const [search, setSearch] = useState("");

  const activeLabel = SETTINGS_SECTIONS.flatMap(s => s.items).find(i => i.id === activeItem)?.label || "Settings";

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      
      {/* ── Settings Sidebar ───────────────────────────────────────────────── */}
      <div className="w-[300px] bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col shrink-0 overflow-hidden shadow-xl z-10">
        
        {/* Header Area */}
        <div className="p-5 space-y-5 shrink-0 bg-sidebar/50 backdrop-blur-sm border-b border-sidebar-border/50">
          
          {/* Workspace Selector */}
          <div className="flex items-center gap-3 bg-sidebar-accent/30 p-2.5 rounded-xl border border-sidebar-border/40 hover:bg-sidebar-accent/50 transition-colors cursor-pointer group">
            <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-xs font-bold text-white shadow-sm">GS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-sidebar-foreground truncate leading-tight group-hover:text-primary transition-colors">Gabe SMS 1</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate mt-0.5 font-medium">Henderson, NV</p>
            </div>
            <div className="shrink-0">
              <Settings className="w-4 h-4 text-sidebar-foreground/40 group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sidebar-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search settings..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-sidebar-accent/20 border border-sidebar-border/50 rounded-lg py-2 pl-9 pr-9 text-xs text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-sidebar-accent/40 transition-all shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-sidebar-accent border border-sidebar-border/50 rounded px-1.5 py-0.5 text-[9px] text-sidebar-foreground/60 font-mono shadow-sm">
                ctrlK
              </div>
            </div>
          </div>

          {/* Go Back & Title */}
          <div className="pt-2">
            <a href="/" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sidebar-foreground/60 hover:text-primary transition-colors uppercase tracking-wider mb-3">
              <ArrowLeft className="h-3.5 w-3.5" />
              Go Back to CRM
            </a>
            <h1 className="text-2xl font-bold tracking-tight text-sidebar-foreground">Settings</h1>
          </div>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          {SETTINGS_SECTIONS.map((section, idx) => (
            <div key={idx} className="mb-7 last:mb-0">
              <div className="flex items-center gap-3 mb-3 px-1">
                <span className="text-[10px] font-extrabold text-sidebar-foreground/40 uppercase tracking-widest whitespace-nowrap">
                  {section.title}
                </span>
                <div className="h-px bg-sidebar-border/50 flex-1" />
              </div>
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  if (search && !item.label.toLowerCase().includes(search.toLowerCase())) return null;
                  
                  const isActive = activeItem === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 text-left group",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn(
                          "h-4 w-4 shrink-0 transition-colors", 
                          isActive ? "text-primary" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70"
                        )} />
                        {item.label}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider">
                            New
                          </span>
                        )}
                        {isActive && <ChevronRight className="h-3.5 w-3.5 text-primary opacity-70" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-background h-full overflow-y-auto relative">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="p-10 max-w-5xl w-full mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-end justify-between mb-8 pb-6 border-b border-border/50">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                {activeLabel}
              </h2>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Manage and configure your {activeLabel.toLowerCase()} preferences and integrations.
              </p>
            </div>
            
            <button className="h-10 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-primary/20 transition-all flex items-center gap-2">
              Save Changes
            </button>
          </div>
          
          {/* Content Mockup */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-border/60 rounded-2xl bg-muted/20">
              <div className="p-4 bg-background rounded-full border border-border shadow-sm mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Configuration Area</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md text-center font-medium">
                This section will contain all the configurations, inputs, and toggle switches for <span className="text-foreground font-semibold">{activeLabel}</span>.
              </p>
              <button className="mt-6 px-4 py-2 bg-background border border-border hover:bg-accent text-xs font-semibold rounded-lg transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
