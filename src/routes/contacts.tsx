import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { ContactsPage } from "@/components/crm/ContactsPage";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — DealVanta CRM" },
      { name: "description", content: "Manage all your real estate contacts — sellers, buyers, agents, lenders, and title companies in one place." },
    ],
  }),
  component: ContactsRoute,
});

function ContactsRoute() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <ContactsPage />
      </div>
    </div>
  );
}
