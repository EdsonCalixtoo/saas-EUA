"use client"
import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Loading } from "@/components/ui/loading"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Terminal, AlertCircle, CheckCircle2, Info, Sparkles, FolderX } from "lucide-react"

export function Feedback() {
  return (
    <section className="space-y-12 pt-12 border-t border-border-subtle pb-24">
      <div className="space-y-2 pb-4">
        <h2 className="text-3xl font-semibold tracking-tight">Feedback & States</h2>
        <p className="text-muted-foreground text-lg">Alerts, Toasts, Skeletons, Loading, and Empty states.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Alerts */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Alerts</h3>
          
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>

          <Alert className="border-success text-success [&>svg]:text-success bg-success/5">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Campaign created successfully.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-ai text-ai [&>svg]:text-ai bg-ai/5 shadow-glow shadow-ai/10">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>AI Insight generated</AlertTitle>
            <AlertDescription>
              The AI found 3 new motivated sellers based on your criteria.
            </AlertDescription>
          </Alert>
        </div>

        {/* Toasts / Notifications */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Toasts & Notifications</h3>
          <p className="text-sm text-muted-foreground mb-4">Click the buttons below to trigger Sonner toasts.</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={() => toast("Event has been created", { description: "Sunday, December 03, 2023 at 9:00 AM" })}>
              Default Toast
            </Button>
            <Button variant="outline" onClick={() => toast.success("Lead updated successfully!")}>
              Success Toast
            </Button>
            <Button variant="outline" onClick={() => toast.error("Failed to update lead.", { description: "Network error occurred." })}>
              Error Toast
            </Button>
            <Button variant="outline" onClick={() => toast.info("New feature available in the dashboard.")}>
              Info Toast
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Approaching SMS limit for this month.")}>
              Warning Toast
            </Button>
          </div>
        </div>

        {/* Loading & Skeletons */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Loading & Skeletons</h3>
          
          <div className="flex gap-12 items-center p-6 border border-border-subtle rounded-xl bg-card shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <Loading size={32} />
              <span className="text-sm font-medium animate-pulse text-muted-foreground">Loading module...</span>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>

        {/* Empty States */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Empty States</h3>
          
          <div className="border border-border-subtle rounded-xl bg-card overflow-hidden shadow-sm">
            <EmptyState 
              icon={<FolderX className="w-12 h-12 text-muted-foreground/50" />}
              title="No Deals Found"
              description="There are currently no deals in this pipeline stage. Start prospecting or move deals here."
              action={<Button size="sm">Find Leads</Button>}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
