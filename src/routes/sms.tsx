import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { SmsPage } from "@/components/crm/SmsPage";

export const Route = createFileRoute("/sms")({
  head: () => ({
    meta: [
      { title: "SMS Center — DealVanta CRM" },
      { name: "description", content: "Send 1-on-1 SMS messages, broadcast campaigns, and quick tag templates." },
    ],
  }),
  component: SmsRoute,
});

function SmsRoute() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <SmsPage />
      </div>
    </div>
  );
}
