import { AppLayout } from "@/components/layout/AppLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dialer | Real Estate SaaS",
  description: "Sistema de Power Dialer e histórico de chamadas.",
}

export default function DialerLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}
