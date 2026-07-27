import { Phone, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  { title: "Follow up with John Smith", sub: "SMS follow up", priority: "High", when: "Today", icon: Circle },
  { title: "Call Robert Johnson", sub: "Initial call", priority: "High", when: "Today", icon: Circle },
  { title: "Send offer to Mike Davis", sub: "Property offer", priority: "Medium", when: "Tomorrow", icon: Circle },
  { title: "Follow up with Sarah Brown", sub: "SMS follow up", priority: "Low", when: "May 19", icon: Circle },
  { title: "Check voicemail", sub: "Voicemails", priority: "Low", when: "May 19", icon: Phone },
];

const badge = (p: string) =>
  p === "High" ? "bg-destructive/10 text-destructive"
  : p === "Medium" ? "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[oklch(0.5_0.16_60)]"
  : "bg-[color-mix(in_oklab,var(--primary)_12%,transparent)] text-primary";

export function TasksDue() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Tasks Due</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            <t.icon className="h-4 w-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-foreground">{t.title}</div>
              <div className="text-xs text-muted-foreground">{t.sub}</div>
            </div>
            <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold", badge(t.priority))}>{t.priority}</span>
            <span className="w-16 text-right text-xs text-muted-foreground">{t.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}