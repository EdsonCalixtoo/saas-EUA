import { Sparkles, TrendingUp, Clock, TrendingDown } from "lucide-react";

const items = [
  { icon: TrendingUp, title: "High Conversion Opportunity", desc: "123 leads show high intent based on recent activity and score.", tone: "oklch(0.55 0.22 265)" },
  { icon: Clock, title: "Follow-up Reminder", desc: "28 leads haven't been contacted in over 7 days.", tone: "oklch(0.7 0.18 155)" },
  { icon: TrendingDown, title: "Price Drop Alert", desc: "15 properties in your list have recently reduced their price.", tone: "oklch(0.65 0.24 25)" },
];

export function AIInsights() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-base font-semibold text-foreground">AI Insights</h3>
        </div>
        <button className="text-xs font-semibold text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, ${i.tone} 12%, transparent)` }}>
              <i.icon className="h-4 w-4" style={{ color: i.tone }} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">{i.title}</div>
              <div className="text-xs leading-relaxed text-muted-foreground">{i.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-elegant)] transition hover:opacity-95">
        View All Insights
      </button>
    </div>
  );
}