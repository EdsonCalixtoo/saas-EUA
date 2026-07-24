import { LandingPage } from "@/components/landing/LandingPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PropFlow | Plataforma Imobiliária SaaS de Alto Padrão",
  description: "Encontre, anuncie e venda imóveis com inteligência artificial, CRM, mapas, discador e automações.",
}

export default function HomePage() {
  return <LandingPage />
}
