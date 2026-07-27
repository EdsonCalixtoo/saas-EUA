import { ResponsiveContainer, LineChart, Line } from "recharts";
import { ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  delta: number;
  compare: string;
  icon: LucideIcon;
  color: string; // stroke
  data: { v: number }[];
};

export function StatCard({ label, value, delta, compare, icon: Icon, color, data }: Props) {
  const up = delta >= 0;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-bold tracking-tight text-foreground">{value}</div>
            <div className={cn("flex items-center gap-0.5 text-xs font-semibold", up ? "text-[var(--success)]" : "text-destructive")}>
              {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(delta)}%
            </div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">vs {compare}</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, ${color} 12%, transparent)` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </div>
      <div className="mt-3 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}