import { createFileRoute } from '@tanstack/react-router';
import { KpiTrackerPage } from '@/components/crm/KpiTrackerPage';
import { Sidebar } from '@/components/crm/Sidebar';
import { Topbar } from '@/components/crm/Topbar';

export const Route = createFileRoute('/kpi-tracker')({
  head: () => ({
    meta: [
      { title: "KPI Tracker & Performance Analytics — DealVanta CRM" },
      { name: "description", content: "Track revenue goals, conversion rates, deals closed, and agent performance." },
    ],
  }),
  component: KpiTrackerRouteLayout,
});

function KpiTrackerRouteLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-hidden relative">
          <KpiTrackerPage />
        </main>
      </div>
    </div>
  );
}
