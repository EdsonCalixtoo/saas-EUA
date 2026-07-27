import { createFileRoute } from '@tanstack/react-router';
import { TitleCompaniesPage } from '@/components/crm/TitleCompaniesPage';
import { Sidebar } from '@/components/crm/Sidebar';
import { Topbar } from '@/components/crm/Topbar';

export const Route = createFileRoute('/title-companies')({
  head: () => ({
    meta: [
      { title: "Title Company Directory — DealVanta CRM" },
      { name: "description", content: "Directory of investor-friendly title companies, closing attorneys, and escrow offices." },
    ],
  }),
  component: TitleCompaniesRouteLayout,
});

function TitleCompaniesRouteLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-hidden relative">
          <TitleCompaniesPage />
        </main>
      </div>
    </div>
  );
}
