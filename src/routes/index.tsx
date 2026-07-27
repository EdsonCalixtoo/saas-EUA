import { createFileRoute } from "@tanstack/react-router";
import { Users, DollarSign, PieChart, CalendarClock } from "lucide-react";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { StatCard } from "@/components/crm/StatCard";
import { PipelineFunnel } from "@/components/crm/PipelineFunnel";
import { LeadSources } from "@/components/crm/LeadSources";
import { AIInsights } from "@/components/crm/AIInsights";
import { TasksDue } from "@/components/crm/TasksDue";
import { RecentActivity } from "@/components/crm/RecentActivity";
import { PerformanceOverview } from "@/components/crm/PerformanceOverview";
import { PropertyActivity } from "@/components/crm/PropertyActivity";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DealVanta CRM " },
      { name: "description", content: "DealVanta CRM " },
      { property: "og:title", content: "DealVanta CRM — Dashboard" },
      { property: "og:description", content: "Track leads, pipeline value, deals and AI-driven insights in one modern CRM." },
    ],
  }),
  component: Index,
});

const spark = (base: number, variance = 15) =>
  Array.from({ length: 24 }, (_, i) => ({
    v: base + Math.sin(i / 2) * variance + Math.cos(i / 3) * (variance / 2),
  }));

function Index() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Real Estate Investment Overview</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            <StatCard label="New Leads" value="1,253" delta={18.6} compare="May 5 – May 11" icon={Users} color="oklch(0.55 0.22 265)" data={spark(60)} />
            <StatCard label="Active Deals" value="96" delta={11.2} compare="May 5 – May 11" icon={DollarSign} color="oklch(0.7 0.18 155)" data={spark(50, 10)} />
            <StatCard label="Pipeline Value" value="$2.45M" delta={8.7} compare="May 5 – May 11" icon={PieChart} color="oklch(0.65 0.19 300)" data={spark(55, 12)} />
            <StatCard label="Follow-ups Due" value="28" delta={-12.5} compare="May 5 – May 11" icon={CalendarClock} color="oklch(0.65 0.24 25)" data={spark(45, 12)} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-4">
            <div className="xl:col-span-2"><PipelineFunnel /></div>
            <LeadSources />
            <AIInsights />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
            <RecentActivity />
            <div className="xl:col-span-1"><PerformanceOverview /></div>
            <PropertyActivity />
          </div>

          <div className="mt-6"><TasksDue /></div>
        </main>
      </div>
    </div>
  );
}
