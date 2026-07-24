import { AppLayout } from "@/components/layout/AppLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CRM – Pipeline | Real Estate SaaS",
  description: "Gerencie o pipeline de vendas e negociações de leads.",
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}
