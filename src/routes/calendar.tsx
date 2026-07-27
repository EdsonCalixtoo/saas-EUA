import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { TasksPage } from "@/components/crm/TasksPage";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — DealVanta CRM" },
      { name: "description", content: "Visual calendar schedule for property inspections, seller calls, and closing milestones." },
    ],
  }),
  component: CalendarRoute,
});

function CalendarRoute() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <TasksPage defaultViewMode="calendar" />
      </div>
    </div>
  );
}
