import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types & Data ────────────────────────────────────────────────────────────
type SettingsSection = {
  title: string;
  items: { id: string; label: string; isNew?: boolean }[];
};

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: "MY BUSINESS",
    items: [
      { id: "business-profile", label: "Business Profile" },
      { id: "my-profile", label: "My Profile" },
      { id: "billing", label: "Billing" },
      { id: "my-staff", label: "My Staff" },
      { id: "opportunities-pipelines", label: "Opportunities & Pipelines" },
    ],
  },
  {
    title: "BUSINESS SERVICES",
    items: [
      { id: "calendars", label: "Calendars" },
      { id: "email-services", label: "Email Services" },
      { id: "phone-system", label: "Phone System" },
      { id: "whatsapp", label: "WhatsApp" },
    ],
  },
  {
    title: "OTHER SETTINGS",
    items: [
      { id: "objects", label: "Objects" },
      { id: "custom-fields", label: "Custom Fields" },
      { id: "custom-values", label: "Custom Values" },
      { id: "import-data", label: "Import Data" },
      { id: "manage-scoring", label: "Manage Scoring" },
      { id: "domains-url-redirects", label: "Domains & URL Redirects" },
      { id: "external-tracking", label: "External Tracking" },
      { id: "integrations", label: "Integrations" },
      { id: "private-integrations", label: "Private Integrations" },
      { id: "tags", label: "Tags" },
      { id: "labs", label: "Labs", isNew: true },
      { id: "audit-logs", label: "Audit Logs" },
      { id: "brand-boards", label: "Brand Boards" },
    ],
  },
];

export function SettingsPage() {
  const [activeItem, setActiveItem] = useState("business-profile");

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      
      {/* ── Settings Sidebar ───────────────────────────────────────────────── */}
      <div className="w-[280px] bg-[#2a303c] text-white flex flex-col shrink-0 overflow-hidden">
        
        {/* Header Area */}
        <div className="p-4 space-y-4 shrink-0">
          
          {/* Logo / Org Select (Placeholder based on screenshot top left) */}
          <div className="flex items-center gap-3 bg-[#1d232a] p-2.5 rounded-lg border border-white/5">
            <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">GS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate leading-tight">Gabe SMS 1</p>
              <p className="text-[10px] text-white/50 truncate">Henderson, NV</p>
            </div>
            <div className="shrink-0">
              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-[#1d232a] border border-white/5 rounded-md py-1.5 pl-8 pr-8 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/10 rounded px-1 text-[9px] text-white/60 font-mono">
                ctrlK
              </div>
            </div>
            <button className="h-7 w-7 rounded-md bg-[#1d232a] border border-white/5 flex items-center justify-center text-emerald-400 hover:bg-white/5 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </button>
          </div>

          {/* Go Back Button */}
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          
          <h1 className="text-xl font-bold tracking-tight">Settings</h1>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-3 pb-6 custom-scrollbar">
          {SETTINGS_SECTIONS.map((section, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              <div className="flex items-center gap-3 mb-2 px-1">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider whitespace-nowrap">
                  {section.title}
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>
              
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-left",
                        isActive 
                          ? "bg-[#1d232a] text-white border-l-2 border-indigo-500 rounded-l-none pl-[10px]" 
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-yellow-500 text-[#1d232a] text-[9px] font-bold uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content Area (Placeholder) ────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-background h-full overflow-y-auto">
        <div className="p-10 max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {SETTINGS_SECTIONS.flatMap(s => s.items).find(i => i.id === activeItem)?.label || "Settings"}
          </h2>
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-xl">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="mt-4 text-sm font-semibold text-foreground">Configuration Area</h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                  This section will contain all the configurations and inputs for {SETTINGS_SECTIONS.flatMap(s => s.items).find(i => i.id === activeItem)?.label}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
