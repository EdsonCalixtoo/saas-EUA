import { createFileRoute } from '@tanstack/react-router';
import { PaymentsPage } from '@/components/crm/PaymentsPage';
import { Sidebar } from '@/components/crm/Sidebar';
import { Topbar } from '@/components/crm/Topbar';

export const Route = createFileRoute('/payments')({
  head: () => ({
    meta: [
      { title: "Payments — DealVanta CRM" },
      { name: "description", content: "Manage invoices, subscriptions, payment links, and transactions." },
    ],
  }),
  component: PaymentsRouteLayout,
});

function PaymentsRouteLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-hidden relative">
          <PaymentsPage />
        </main>
      </div>
    </div>
  );
}
