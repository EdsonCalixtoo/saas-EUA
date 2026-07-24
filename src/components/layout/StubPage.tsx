import { AppLayout } from "@/components/layout/AppLayout"

// Stub pages for sidebar destinations — not functional modules yet
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-2 text-sm">This module is coming in a future phase.</p>
    </div>
  )
}

export function createStubLayout(children: React.ReactNode) {
  return <AppLayout>{children}</AppLayout>
}
