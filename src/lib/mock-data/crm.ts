export interface Lead {
  id: string;
  name: string;
  company: string;
  avatarUrl: string;
  status: 'new' | 'contacted' | 'interested' | 'offer_sent' | 'negotiation';
  value: number;
  email?: string;
  phone?: string;
  createdAt?: string;
}

export interface ColumnData {
  id: 'new' | 'contacted' | 'interested' | 'offer_sent' | 'negotiation';
  title: string;
  leadsCount: number;
  totalValue: string;
  bgClass: string;
  headerBgClass: string;
  accentColor: string;
}

export const crmColumns: ColumnData[] = [
  {
    id: 'new',
    title: 'New',
    leadsCount: 36,
    totalValue: '$23K',
    bgClass: 'bg-[#F6F7FB] dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800',
    headerBgClass: 'bg-[#F6F7FB]',
    accentColor: '#64748B',
  },
  {
    id: 'contacted',
    title: 'Contacted',
    leadsCount: 64,
    totalValue: '$86K',
    bgClass: 'bg-[#EEF3FF] dark:bg-blue-950/20 border-blue-100/80 dark:border-blue-900/30',
    headerBgClass: 'bg-[#EEF3FF]',
    accentColor: '#3B82F6',
  },
  {
    id: 'interested',
    title: 'Interested',
    leadsCount: 32,
    totalValue: '$72K',
    bgClass: 'bg-[#F3EFFE] dark:bg-purple-950/20 border-purple-100/80 dark:border-purple-900/30',
    headerBgClass: 'bg-[#F3EFFE]',
    accentColor: '#8B5CF6',
  },
  {
    id: 'offer_sent',
    title: 'Offer Sent',
    leadsCount: 18,
    totalValue: '$45K',
    bgClass: 'bg-[#FFF4ED] dark:bg-orange-950/20 border-orange-100/80 dark:border-orange-900/30',
    headerBgClass: 'bg-[#FFF4ED]',
    accentColor: '#F97316',
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    leadsCount: 9,
    totalValue: '$28K',
    bgClass: 'bg-[#FAF0F8] dark:bg-pink-950/20 border-pink-100/80 dark:border-pink-900/30',
    headerBgClass: 'bg-[#FAF0F8]',
    accentColor: '#EC4899',
  },
];

export const initialLeads: Lead[] = [
  // ─── NEW (5 cards matching screenshot) ───
  {
    id: 'lead-1',
    name: 'Robert',
    company: 'Baker Johnson',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'new',
    value: 5000,
    email: 'robert@bakerjohnson.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 'lead-2',
    name: 'Sophia Davis',
    company: 'Ibarra HOME',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'new',
    value: 4500,
    email: 'sophia@ibarrahome.com',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'lead-3',
    name: 'David Brown',
    company: 'Green Forest',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'new',
    value: 4800,
    email: 'david@greenforest.com',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 'lead-4',
    name: 'Laura Vickers',
    company: 'Zoom Tours',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'new',
    value: 4200,
    email: 'laura@zoomtours.com',
    phone: '+1 (555) 567-8901',
  },
  {
    id: 'lead-5',
    name: 'James Stevens',
    company: 'Nova KEM',
    avatarUrl: 'https={images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'new',
    value: 4500,
    email: 'james@novakem.com',
    phone: '+1 (555) 678-9012',
  },

  // ─── CONTACTED (5 cards matching screenshot) ───
  {
    id: 'lead-6',
    name: 'Sarah Williams',
    company: 'Exata Ltda',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'contacted',
    value: 18000,
    email: 'sarah@exata.com',
    phone: '+1 (555) 789-0123',
  },
  {
    id: 'lead-7',
    name: 'Daniel Thompson',
    company: 'Animex Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'contacted',
    value: 16500,
    email: 'daniel@animex.com',
    phone: '+1 (555) 890-1234',
  },
  {
    id: 'lead-8',
    name: 'David Williams',
    company: 'Borex Ltda',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    status: 'contacted',
    value: 17200,
    email: 'david.w@borex.com',
    phone: '+1 (555) 901-2345',
  },
  {
    id: 'lead-9',
    name: 'Carol Ben',
    company: 'Evane Tours',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'contacted',
    value: 15300,
    email: 'carol@evane.com',
    phone: '+1 (555) 012-3456',
  },
  {
    id: 'lead-10',
    name: 'Gonzál Álvarez',
    company: 'Bando S.A',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    status: 'contacted',
    value: 19000,
    email: 'gonzal@bando.com',
    phone: '+1 (555) 123-4567',
  },

  // ─── INTERESTED (5 cards matching screenshot) ───
  {
    id: 'lead-11',
    name: 'Isabela',
    company: 'Inova Tech',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'interested',
    value: 15000,
    email: 'isabela@inovatech.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 'lead-12',
    name: 'Rian Tava',
    company: 'Nexa Ltda',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    status: 'interested',
    value: 14000,
    email: 'rian@nexa.com',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'lead-13',
    name: 'João Teixeira',
    company: 'Base Fast',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    status: 'interested',
    value: 14500,
    email: 'joao@basefast.com',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 'lead-14',
    name: 'Maria Müller',
    company: 'Zeen Ateliê',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    status: 'interested',
    value: 13800,
    email: 'maria@zeen.com',
    phone: '+1 (555) 567-8901',
  },
  {
    id: 'lead-15',
    name: 'Pedro Siqueira',
    company: 'Dacxo SMN',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'interested',
    value: 14700,
    email: 'pedro@dacxo.com',
    phone: '+1 (555) 678-9012',
  },

  // ─── OFFER SENT (5 cards matching screenshot) ───
  {
    id: 'lead-16',
    name: 'Luke Thompson',
    company: 'Exima Toned',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'offer_sent',
    value: 9000,
    email: 'luke@exima.com',
    phone: '+1 (555) 789-0123',
  },
  {
    id: 'lead-17',
    name: 'Sofia Lo',
    company: 'Delta Dunia',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'offer_sent',
    value: 8500,
    email: 'sofia@deltadunia.com',
    phone: '+1 (555) 890-1234',
  },
  {
    id: 'lead-18',
    name: 'Lena Thompson',
    company: 'Hexa Valor',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'offer_sent',
    value: 9200,
    email: 'lena@hexavalor.com',
    phone: '+1 (555) 901-2345',
  },
  {
    id: 'lead-19',
    name: 'Kara Walter',
    company: 'Forma Fast',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'offer_sent',
    value: 8800,
    email: 'kara@formafast.com',
    phone: '+1 (555) 012-3456',
  },
  {
    id: 'lead-20',
    name: 'Ezra Ferguson',
    company: 'emina Ltda',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'offer_sent',
    value: 9500,
    email: 'ezra@emina.com',
    phone: '+1 (555) 123-4567',
  },

  // ─── NEGOTIATION (5 cards matching screenshot) ───
  {
    id: 'lead-21',
    name: 'Delen Clark',
    company: 'Gama Tech',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    status: 'negotiation',
    value: 6000,
    email: 'delen@gamatech.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 'lead-22',
    name: 'Nate',
    company: 'Duen Cast',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    status: 'negotiation',
    value: 5500,
    email: 'nate@duencast.com',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'lead-23',
    name: 'Stuart',
    company: 'Dutra Kust',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'negotiation',
    value: 5200,
    email: 'stuart@dutrakust.com',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 'lead-24',
    name: 'Tulia Carvo',
    company: 'Bossar Aress',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'negotiation',
    value: 5800,
    email: 'tulia@bossar.com',
    phone: '+1 (555) 567-8901',
  },
  {
    id: 'lead-25',
    name: 'Nara Saad',
    company: 'Salaz Deal',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    status: 'negotiation',
    value: 5500,
    email: 'nara@salazdeal.com',
    phone: '+1 (555) 678-9012',
  },
];
