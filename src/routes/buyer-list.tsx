import { createFileRoute } from '@tanstack/react-router';
import { BuyerListPage } from '@/components/crm/BuyerListPage';
import { Sidebar } from '@/components/crm/Sidebar';
import { Topbar } from '@/components/crm/Topbar';

export const Route = createFileRoute('/buyer-list')({
  head: () => ({
    meta: [
      { title: "VIP Buyer List & Cash Investor Network — DealVanta CRM" },
      { name: "description", content: "Directory of verified cash buyers, buy box criteria, and instant deal dispatch." },
    ],
  }),
  component: BuyerListRouteLayout,
});

function BuyerListRouteLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-hidden relative">
          <BuyerListPage />
        </main>
      </div>
    </div>
  );
}
