import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { PipelineBoard } from "@/components/crm/PipelineBoard";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Pipeline — DealVanta CRM" },
      { name: "description", content: "Visual Kanban pipeline to manage your real estate deals from lead to close." },
    ],
  }),
  component: PipelinePage,
});

function PipelinePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <PipelineBoard />
        </main>
      </div>
    </div>
  );
}
