import { CrmLandingPage } from "@/components/crm-landing/CrmLandingPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PropFlow | The Smartest CRM for Real Estate Teams",
  description: "Manage leads, automate follow-ups, close more deals and grow your business using AI-powered workflows, marketing automation and a complete real estate CRM.",
}

export default function HomePage() {
  return <CrmLandingPage />
}
