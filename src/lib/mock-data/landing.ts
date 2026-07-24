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
  tag: string
  featured?: boolean
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
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    tag: 'Venda de Luxo',
    featured: true,
  },
  {
    id: 'prop-2',
    title: 'Cobertura Duplex Vista Mar',
    price: 'R$ 6.200.000',
    city: 'Rio de Janeiro',
    neighborhood: 'Ipanema',
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 3,
    area: 420,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    tag: 'Frente Mar',
    featured: true,
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
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    tag: 'Arquitetura Assinada',
    featured: true,
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
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80',
    tag: 'Lançamento Exclusivo',
    featured: true,
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
