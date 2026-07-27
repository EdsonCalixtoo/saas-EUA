import { createFileRoute } from '@tanstack/react-router';
import { PropertiesPage } from '@/components/crm/PropertiesPage';

export const Route = createFileRoute('/properties')({
  component: PropertiesPage,
});
