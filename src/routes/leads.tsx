import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { LeadsTable } from "@/components/crm/LeadsTable";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads — DealVanta CRM" },
      { name: "description", content: "Manage and track all your real estate leads in one place." },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activePage="leads" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="rounded-xl mx-6 my-6 bg-card shadow-[var(--shadow-card)] border border-border overflow-hidden">
            <LeadsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
