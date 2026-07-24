export interface SmsCampaign {
  id: string
  name: string
  sentCount: number
  deliveryRate: number
  status: 'active' | 'completed' | 'scheduled' | 'draft'
  createdAt: string
  audience?: string
  messageSnippet?: string
}

export interface SmsTemplate {
  id: string
  title: string
  category: string
  body: string
  usedCount: number
}

export const initialSmsCampaigns: SmsCampaign[] = [
  {
    id: 'sms-1',
    name: 'Spring Property Outreach',
    sentCount: 2450,
    deliveryRate: 98,
    status: 'completed',
    createdAt: '2026-04-12',
    audience: 'Motivated Sellers',
    messageSnippet: 'Olá! Notamos seu imóvel em Spring Valley. Estaria interessado em uma oferta em dinheiro toda à vista?',
  },
  {
    id: 'sms-2',
    name: 'Vacant Homes Follow Up',
    sentCount: 1680,
    deliveryRate: 94,
    status: 'completed',
    createdAt: '2026-05-01',
    audience: 'Vacant Property List',
    messageSnippet: 'Oi! Temos compradores procurando casas vazias na sua região. Gostaria de receber uma proposta sem compromisso?',
  },
  {
    id: 'sms-3',
    name: 'Cash Buyers List',
    sentCount: 3120,
    deliveryRate: 97,
    status: 'completed',
    createdAt: '2026-06-15',
    audience: 'VIP Investors',
    messageSnippet: 'Nova oportunidade off-market disponível! 3 quartos / 2 banheiros com 35% de desconto abaixo do mercado.',
  },
  {
    id: 'sms-4',
    name: 'No Response Follow Up',
    sentCount: 2050,
    deliveryRate: 91,
    status: 'completed',
    createdAt: '2026-07-02',
    audience: 'Unresponsive Leads',
    messageSnippet: 'Ainda pensando em vender seu imóvel este mês? Tenho um comprador pronto para fechar rápido.',
  },
  {
    id: 'sms-5',
    name: 'Absentee Owner Blast',
    sentCount: 1890,
    deliveryRate: 96,
    status: 'completed',
    createdAt: '2026-07-10',
    audience: 'Absentee Owners',
    messageSnippet: 'Proprietário ausente? Podemos gerenciar ou comprar seu imóvel sem taxas de corretagem.',
  },
  {
    id: 'sms-6',
    name: 'Pre-Foreclosure Outreach',
    sentCount: 1240,
    deliveryRate: 93,
    status: 'completed',
    createdAt: '2026-07-18',
    audience: 'Distressed Properties',
    messageSnippet: 'Podemos te ajudar a evitar o leilão com uma venda rápida em dinheiro. Fale conosco em sigilo.',
  },
]

export const initialSmsTemplates: SmsTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Cold Outreach - Direct Cash Offer',
    category: 'Acquisitions',
    body: 'Olá {First_Name}, sou interessado na sua casa em {Property_Address}. Aceitaria uma oferta 100% em dinheiro esta semana?',
    usedCount: 1420,
  },
  {
    id: 'tpl-2',
    title: 'Follow Up #1 - Gentle Nudge',
    category: 'Follow Up',
    body: 'Oi {First_Name}, só passando para ver se você recebeu minha mensagem sobre o imóvel em {Property_Address}. Qual o melhor horário para conversar?',
    usedCount: 980,
  },
  {
    id: 'tpl-3',
    title: 'Investor VIP Alert',
    category: 'Disposition',
    body: 'Atenção Investidor! Novo imóvel em {City} com cap rate estimado em 12%. Responda VIP para receber a ficha completa.',
    usedCount: 750,
  },
  {
    id: 'tpl-4',
    title: 'Price Drop Alert',
    category: 'Promotions',
    body: 'Baixou o preço! O imóvel em {Property_Address} teve redução de $15.000. Agende sua visita hoje mesmo.',
    usedCount: 620,
  },
]
