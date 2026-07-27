import { createFileRoute } from '@tanstack/react-router';
import { PropertiesPage } from '@/components/crm/PropertiesPage';
import { Sidebar } from '@/components/crm/Sidebar';
import { Topbar } from '@/components/crm/Topbar';

export const Route = createFileRoute('/properties')({
  head: () => ({
    meta: [
      { title: "Properties — DealVanta CRM" },
      { name: "description", content: "Manage and skip trace your properties." },
    ],
  }),
  component: PropertiesRouteLayout,
});

function PropertiesRouteLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-hidden relative">
          <PropertiesPage />
        </main>
      </div>
    </div>
  );
}
