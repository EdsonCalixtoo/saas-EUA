import { UserPlus, Voicemail, Mail, PhoneCall, FileEdit } from "lucide-react";

const items = [
  { icon: UserPlus, title: "John Smith", sub: "New lead added", when: "2m ago", color: "oklch(0.55 0.22 265)" },
  { icon: Voicemail, title: "Sarah Johnson", sub: "Voicemail received", when: "15m ago", color: "oklch(0.7 0.18 155)" },
  { icon: Mail, title: "Mike Davis", sub: "Email opened", when: "32m ago", color: "oklch(0.65 0.19 300)" },
  { icon: PhoneCall, title: "Emily Brown", sub: "Call completed", when: "45m ago", color: "oklch(0.75 0.18 75)" },
  { icon: FileEdit, title: "David Wilson", sub: "Deal updated to Offer Made", when: "1h ago", color: "oklch(0.65 0.24 25)" },
];

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `color-mix(in oklab, ${it.color} 12%, transparent)` }}>
              <it.icon className="h-4 w-4" style={{ color: it.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-foreground">{it.title}</div>
              <div className="text-xs text-muted-foreground">{it.sub}</div>
            </div>
            <span className="text-xs text-muted-foreground">{it.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}