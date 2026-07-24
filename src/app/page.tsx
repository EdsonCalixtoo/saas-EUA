import { redirect } from "next/navigation"

export default function RootPage() {
  // Root redirects to the dashboard (handled by the (dashboard) route group)
  redirect("/dashboard")
}
