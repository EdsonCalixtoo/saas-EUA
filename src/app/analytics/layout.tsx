import { AppLayout } from "@/components/layout/AppLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analytics | Real Estate SaaS",
  description: "Métricas de desempenho, receita, negociações e conversões.",
}

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}
