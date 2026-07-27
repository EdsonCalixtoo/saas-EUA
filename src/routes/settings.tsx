import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/crm/SettingsPage";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — DealVanta CRM" },
      { name: "description", content: "Configure your business, services, integrations, and CRM settings." },
    ],
  }),
  component: SettingsRoute,
});

function SettingsRoute() {
  return <SettingsPage />;
}
