import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { EmailPage } from "@/components/crm/EmailPage";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Center — DealVanta CRM" },
      { name: "description", content: "Send formal cash offer letters, track opens/clicks, and manage automated email drip sequences." },
    ],
  }),
  component: EmailRoute,
});

function EmailRoute() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <EmailPage />
      </div>
    </div>
  );
}
