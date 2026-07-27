const items = [
  { addr: "123 Main St, Tampa, FL", sub: "Price reduced to $245,000", when: "2h ago", hue: 260 },
  { addr: "456 Oak Ave, Orlando, FL", sub: "New images added", when: "4h ago", hue: 155 },
  { addr: "789 Pine Rd, Lakeland, FL", sub: "Status changed to Under Contract", when: "6h ago", hue: 75 },
  { addr: "321 Elm St, Kissimmee, FL", sub: "Price reduced to $195,000", when: "8h ago", hue: 25 },
  { addr: "654 Maple Dr, Tampa, FL", sub: "New lead assigned", when: "1d ago", hue: 300 },
];

export function PropertyActivity() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Property Activity</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-11 w-14 shrink-0 rounded-lg" style={{ background: `linear-gradient(135deg, oklch(0.78 0.1 ${it.hue}), oklch(0.55 0.18 ${it.hue}))` }} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">{it.addr}</div>
              <div className="truncate text-xs text-muted-foreground">{it.sub}</div>
            </div>
            <span className="text-xs text-muted-foreground">{it.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}