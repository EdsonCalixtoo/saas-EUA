import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { TasksPage } from "@/components/crm/TasksPage";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks & Schedule — DealVanta CRM" },
      { name: "description", content: "Manage real estate deal tasks, seller follow-up calls, property walkthroughs, and contracts." },
    ],
  }),
  component: TasksRoute,
});

function TasksRoute() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <TasksPage />
      </div>
    </div>
  );
}
