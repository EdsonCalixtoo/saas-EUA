import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { CallsPage } from "@/components/crm/CallsPage";

export const Route = createFileRoute("/calls")({
  head: () => ({
    meta: [
      { title: "Calls — DealVanta CRM" },
      { name: "description", content: "Manage all your calls, recordings, voicemails and follow-ups." },
    ],
  }),
  component: CallsRoute,
});

function CallsRoute() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <CallsPage />
      </div>
    </div>
  );
}
