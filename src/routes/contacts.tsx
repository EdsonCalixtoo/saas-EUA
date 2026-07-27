import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { ContactsPage } from "@/components/crm/ContactsPage";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts Directory — DealVanta CRM" },
      { name: "description", content: "Consolidated contacts directory for sellers, cash buyers, title companies, and contractors." },
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
