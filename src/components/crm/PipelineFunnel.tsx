const stages = [
  { label: "New Lead", count: 123, value: "$245,000", color: "oklch(0.55 0.22 265)", w: 100 },
  { label: "Attempting Contact", count: 456, value: "$560,000", color: "oklch(0.6 0.2 240)", w: 88 },
  { label: "Contacted", count: 300, value: "$540,000", color: "oklch(0.65 0.18 210)", w: 76 },
  { label: "Qualified", count: 210, value: "$220,000", color: "oklch(0.7 0.18 175)", w: 64 },
  { label: "Offer Made", count: 134, value: "$285,000", color: "oklch(0.75 0.17 145)", w: 52 },
  { label: "Under Contract", count: 67, value: "$160,000", color: "oklch(0.75 0.18 75)", w: 40 },
  { label: "Closed", count: 23, value: "$100,000", color: "oklch(0.65 0.24 30)", w: 28 },
];

export function PipelineFunnel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Pipeline Overview</h3>
        <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
          This Month ▾
        </button>
      </div>
      <div className="grid grid-cols-[1fr_1.2fr] gap-6">
        <div className="flex flex-col items-center gap-1.5 py-2">
          {stages.map((s) => (
            <div key={s.label} className="h-9 rounded-md shadow-sm transition hover:scale-[1.02]" style={{ width: `${s.w}%`, background: s.color }} />
          ))}
        </div>
        <div className="space-y-2">
          {stages.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-foreground">{s.label} <span className="text-muted-foreground">({s.count})</span></span>
              </div>
              <span className="font-semibold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <div className="text-xs text-muted-foreground">Total Pipeline Value</div>
        <div className="text-2xl font-bold text-foreground">$2,450,000</div>
      </div>
    </div>
  );
}