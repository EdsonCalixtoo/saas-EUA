import { createFileRoute } from '@tanstack/react-router';
import { RehabCalcPage } from '@/components/crm/RehabCalcPage';
import { Sidebar } from '@/components/crm/Sidebar';
import { Topbar } from '@/components/crm/Topbar';

export const Route = createFileRoute('/rehab-calc')({
  head: () => ({
    meta: [
      { title: "Rehab Calculator & MAO Deal Analyzer — DealVanta CRM" },
      { name: "description", content: "Calculate repair costs, Maximum Allowable Offer (MAO 70%), and net profit for real estate flips." },
    ],
  }),
  component: RehabCalcRouteLayout,
});

function RehabCalcRouteLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-hidden relative">
          <RehabCalcPage />
        </main>
      </div>
    </div>
  );
}
