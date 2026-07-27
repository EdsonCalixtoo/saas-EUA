import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "DealMachine", value: 567, color: "oklch(0.55 0.22 265)", pct: "45.2%" },
  { name: "Facebook Ads", value: 277, color: "oklch(0.6 0.24 25)", pct: "22.1%" },
  { name: "Google Ads", value: 192, color: "oklch(0.7 0.18 55)", pct: "15.3%" },
  { name: "Direct Mail", value: 109, color: "oklch(0.7 0.18 155)", pct: "8.7%" },
  { name: "Other", value: 108, color: "oklch(0.65 0.19 300)", pct: "8.7%" },
];

export function LeadSources() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="mb-2 text-base font-semibold text-foreground">Lead Sources</h3>
      <div className="relative mx-auto h-44 w-44">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={55} outerRadius={82} dataKey="value" stroke="none" paddingAngle={2}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-foreground">1,253</div>
          <div className="text-xs text-muted-foreground">Total Leads</div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              <span className="text-foreground">{d.name}</span>
            </div>
            <span className="text-muted-foreground">{d.pct} <span className="text-foreground/50">({d.value})</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}