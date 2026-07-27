import { createFileRoute } from '@tanstack/react-router';
import { CrmLandingPage } from '@/components/crm-landing/CrmLandingPage';

export const Route = createFileRoute('/home')({
  head: () => ({
    meta: [
      { title: "DealVanta CRM — Modern Real Estate Investor Platform" },
      { name: "description", content: "The ultimate CRM & skip-tracing platform for US Real Estate Investors." },
    ],
  }),
  component: CrmLandingPage,
});
