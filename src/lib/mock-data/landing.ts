export interface FeaturedProperty {
  id: string
  title: string
  price: string
  city: string
  neighborhood: string
  bedrooms: number
  bathrooms: number
  parkingSpots: number
  area: number // m²
  imageUrl: string
  gallery: string[]
  videoUrl?: string
  tag: string
  featured?: boolean
  description?: string
  brokerName?: string
  brokerAvatar?: string
}

export const featuredPropertiesData: FeaturedProperty[] = [
  {
    id: 'prop-1',
    title: 'Mansão Contemporânea Alphaville',
    price: 'R$ 4.850.000',
    city: 'São Paulo',
    neighborhood: 'Alphaville Industrial',
    bedrooms: 5,
    bathrooms: 6,
    parkingSpots: 4,
    area: 580,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-architectural-design-41005-large.mp4',
    tag: 'Venda de Luxo',
    featured: true,
    description: 'Mansão espetacular em condomínio fechado com piscina aquecida, automação residencial completa, sauna e área gourmet integrada.',
    brokerName: 'Ricardo Silveira',
    brokerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'prop-2',
    title: 'Cobertura Duplex Vista Mar Ipanema',
    price: 'R$ 6.200.000',
    city: 'Rio de Janeiro',
    neighborhood: 'Ipanema',
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 3,
    area: 420,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1000&auto=format&fit=crop&q=80',
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-view-of-a-luxurious-modern-house-and-its-pool-42861-large.mp4',
    tag: 'Frente Mar',
    featured: true,
    description: 'Cobertura exclusiva com vista panorâmica para a praia de Ipanema, piscina privativa no terraço e acabamento em mármore importado.',
    brokerName: 'Amanda Castro',
    brokerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'prop-3',
    title: 'Villa Minimalista Jardins',
    price: 'R$ 3.900.000',
    city: 'São Paulo',
    neighborhood: 'Jardim Europa',
    bedrooms: 4,
    bathrooms: 4,
    parkingSpots: 3,
    area: 390,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&auto=format&fit=crop&q=80',
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-in-a-modern-house-41006-large.mp4',
    tag: 'Arquitetura Assinada',
    featured: true,
    description: 'Projeto arquitetônico premiado com conceito aberto, amplas esquadrias de vidro e jardim tropical interno.',
    brokerName: 'Fernando Mendes',
    brokerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'prop-4',
    title: 'Residência Integrada à Natureza',
    price: 'R$ 2.750.000',
    city: 'Curitiba',
    neighborhood: 'Batel',
    bedrooms: 3,
    bathrooms: 4,
    parkingSpots: 2,
    area: 310,
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-house-with-a-swimming-pool-42862-large.mp4',
    tag: 'Lançamento Exclusivo',
    featured: true,
    description: 'Casa conceito no bairro Batel cercada por área verde preservada, com energia solar e reaproveitamento de água.',
    brokerName: 'Camila Torres',
    brokerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
]

export const videoTourFeatured = {
  title: 'Conheça o Tour Virtual 360° com Inteligência Artificial',
  subtitle: 'Experimente a sensação de caminhar pelas melhores mansões e coberturas sem sair de casa.',
  videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-architectural-design-41005-large.mp4',
  poster: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
}

export const testimonialsData = [
  {
    id: 't-1',
    quote: 'O PropFlow revolucionou nossa imobiliária. Vendemos R$ 12 milhões em imóveis no primeiro trimestre utilizando as automações e a busca preditiva de IA.',
    author: 'Eduardo Martins',
    role: 'CEO da Martins Luxury Real Estate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't-2',
    quote: 'Encontrei a cobertura dos meus sonhos em Ipanema em apenas 3 dias. O tour virtual e a busca inteligente economizaram semanas de visitas presenciais.',
    author: 'Beatriz Vasconcelos',
    role: 'Compradora de Imóvel de Luxo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't-3',
    quote: 'O CRM com discador automático e WhatsApp me deu um ganho de produtividade incrível. Consigo gerenciar 50+ leads sem perder nenhuma oportunidade.',
    author: 'Lucas Fontes',
    role: 'Corretor Autônomo Top Producer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
]

export const cityOptions = [
  'São Paulo - SP',
  'Rio de Janeiro - RJ',
  'Curitiba - PR',
  'Belo Horizonte - MG',
  'Florianópolis - SC',
  'Brasília - DF',
  'Porto Alegre - RS',
  'Salvador - BA',
]

export const propertyTypeOptions = [
  'Todos os Tipos',
  'Apartamento',
  'Casa de Luxo',
  'Cobertura Duplex',
  'Terreno / Condomínio',
  'Imóvel Comercial',
]

export const priceRangeOptions = [
  'Qualquer Preço',
  'Até R$ 1.000.000',
  'R$ 1.000.000 - R$ 3.000.000',
  'R$ 3.000.000 - R$ 6.000.000',
  'Acima de R$ 6.000.000',
]
