import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { CommunicationsInbox } from "@/components/crm/CommunicationsInbox";

export const Route = createFileRoute("/communications")({
  head: () => ({
    meta: [
      { title: "Communications — DealVanta CRM" },
      { name: "description", content: "Unified inbox for all your lead communications: calls, SMS and emails in one place." },
    ],
  }),
  component: CommunicationsPage,
});

function CommunicationsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <CommunicationsInbox />
      </div>
    </div>
  );
}
