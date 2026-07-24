import { AppLayout } from "@/components/layout/AppLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SMS Campaign | Real Estate SaaS",
  description: "Gerencie suas campanhas de SMS e templates de mensagens.",
}

export default function SmsLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}
