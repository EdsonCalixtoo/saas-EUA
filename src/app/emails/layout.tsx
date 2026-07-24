import { AppLayout } from "@/components/layout/AppLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Email Campaign | Real Estate SaaS",
  description: "Gerencie suas campanhas de e-mail marketing e modelos de e-mail.",
}

export default function EmailsLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}
