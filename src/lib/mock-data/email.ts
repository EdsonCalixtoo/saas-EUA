export interface EmailCampaign {
  id: string
  name: string
  sentCount: number
  openRate: number // e.g. 81%
  clickRate: number // e.g. 8%
  subject?: string
  status: 'active' | 'completed' | 'scheduled' | 'draft'
  createdAt: string
  audience?: string
}

export interface EmailTemplate {
  id: string
  title: string
  subject: string
  category: string
  previewText: string
  usedCount: number
}

export const initialEmailCampaigns: EmailCampaign[] = [
  {
    id: 'email-1',
    name: 'Monthly Property Newsletter',
    sentCount: 2300,
    openRate: 81,
    clickRate: 8,
    subject: 'Principais oportunidades imobiliárias do mês de Julho 🏠',
    status: 'completed',
    createdAt: '2026-07-01',
    audience: 'Newsletter Subscribers',
  },
  {
    id: 'email-2',
    name: 'New Properties Alert',
    sentCount: 1850,
    openRate: 81,
    clickRate: 6,
    subject: 'Alerta: 5 novos imóveis abaixo do valor de mercado adicionados!',
    status: 'completed',
    createdAt: '2026-07-08',
    audience: 'Active Buyers',
  },
  {
    id: 'email-3',
    name: 'Real Buyers Email Series',
    sentCount: 3400,
    openRate: 81,
    clickRate: 9,
    subject: 'Como fechar sua compra de imóvel à vista em menos de 10 dias',
    status: 'completed',
    createdAt: '2026-07-15',
    audience: 'Cash Buyers List',
  },
  {
    id: 'email-4',
    name: 'Follow Up Sequence',
    sentCount: 2600,
    openRate: 81,
    clickRate: 5,
    subject: 'Ainda interessado na avaliação gratuita da sua casa?',
    status: 'completed',
    createdAt: '2026-07-20',
    audience: 'Motivated Sellers',
  },
  {
    id: 'email-5',
    name: 'Off-Market Deal Announcement',
    sentCount: 1950,
    openRate: 84,
    clickRate: 11,
    subject: 'Oportunidade Exclusiva Off-Market em Spring Valley',
    status: 'completed',
    createdAt: '2026-07-22',
    audience: 'VIP Investors',
  },
  {
    id: 'email-6',
    name: 'Market Report Q3',
    sentCount: 4100,
    openRate: 79,
    clickRate: 7,
    subject: 'Relatório Trimestral do Mercado Imobiliário - Análise Q3',
    status: 'completed',
    createdAt: '2026-07-23',
    audience: 'All Contacts',
  },
]

export const initialEmailTemplates: EmailTemplate[] = [
  {
    id: 'tpl-email-1',
    title: 'Monthly Investor Digest',
    subject: 'Resumo Mensal de Investimentos - {Month}',
    category: 'Newsletter',
    previewText: 'Confira as métricas de rentabilidade e melhores imóveis selecionados para o seu portfólio.',
    usedCount: 1540,
  },
  {
    id: 'tpl-email-2',
    title: 'Property Listing Alert',
    subject: 'Novo Imóvel Disponível: {Property_Address}',
    category: 'Listing Alert',
    previewText: 'Veja os detalhes completos, fotos em HD e estimativa de retorno do novo imóvel recém cadastrado.',
    usedCount: 1120,
  },
  {
    id: 'tpl-email-3',
    title: 'Cold Seller Offer Letter',
    subject: 'Oferta em Dinheiro para o Imóvel em {Property_Address}',
    category: 'Acquisitions',
    previewText: 'Estamos interessados na compra direta da sua propriedade sem comissão de imobiliária.',
    usedCount: 890,
  },
  {
    id: 'tpl-email-4',
    title: 'Post-Meeting Follow Up',
    subject: 'Obrigado pela reunião / Próximos passos',
    category: 'Follow Up',
    previewText: 'Foi um prazer conversar. Conforme combinado, envio em anexo a proposta formal de aquisição.',
    usedCount: 670,
  },
]
