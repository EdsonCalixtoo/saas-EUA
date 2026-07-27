import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ArrowUp } from "lucide-react";

const data = [
  { d: "May 12", Leads: 620, Contacted: 420, "Deals Closed": 180, Revenue: 300 },
  { d: "May 13", Leads: 720, Contacted: 470, "Deals Closed": 220, Revenue: 340 },
  { d: "May 14", Leads: 690, Contacted: 500, "Deals Closed": 260, Revenue: 320 },
  { d: "May 15", Leads: 830, Contacted: 560, "Deals Closed": 300, Revenue: 400 },
  { d: "May 16", Leads: 780, Contacted: 540, "Deals Closed": 280, Revenue: 380 },
  { d: "May 17", Leads: 910, Contacted: 620, "Deals Closed": 340, Revenue: 460 },
  { d: "May 18", Leads: 980, Contacted: 690, "Deals Closed": 380, Revenue: 500 },
];

const kpis = [
  { label: "Total Leads", value: "1,253", delta: "+18.6%" },
  { label: "Contact Rate", value: "42%", delta: "+8.2%" },
  { label: "Deals Closed", value: "23", delta: "+21.1%" },
  { label: "Revenue", value: "$96,500", delta: "+15.3%" },
];

const colors = {
  Leads: "oklch(0.55 0.22 265)",
  Contacted: "oklch(0.65 0.19 300)",
  "Deals Closed": "oklch(0.7 0.18 155)",
  Revenue: "oklch(0.75 0.18 55)",
};

export function PerformanceOverview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Performance Overview</h3>
        <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">This Month ▾</button>
      </div>
      <div className="mb-4 grid grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <div className="text-lg font-bold text-foreground">{k.value}</div>
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[var(--success)]">
                <ArrowUp className="h-2.5 w-2.5" />{k.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 250)" vertical={false} />
            <XAxis dataKey="d" tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 255)", fontSize: 12 }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            {(Object.keys(colors) as (keyof typeof colors)[]).map((k) => (
              <Line key={k} type="monotone" dataKey={k} stroke={colors[k]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}