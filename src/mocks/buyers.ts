export interface Buyer {
  id: string;
  name: string;
  cnpj?: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  status: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface BuyerHasProperty {
  buyerId: string;
  propertyId: string;
}

export const BUYERS: Buyer[] = [
  {
    id: 'b550e8400-e29b-41d4-a716-446655440001',
    name: 'Agropecuária Juca LTDA',
    cnpj: '12.345.678/0001-90',
    phone: '+55 47 91234-5678',
    email: 'contato@agrojuca.com.br',
    street: 'Rua Simão Piaz',
    number: '100',
    neighborhood: 'Centro',
    city: 'São João do Itaperiú',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88395-000',
    latitude: -26.5593843,
    longitude: -48.7587542,
    status: 'active',
    createdAt: '2024-01-20T10:00:00Z',
    deletedAt: null,
  },
  {
    id: 'b550e8400-e29b-41d4-a716-446655440002',
    name: 'Cooperativa Boa Vista',
    cnpj: '98.765.432/0001-10',
    phone: '+55 67 99876-5432',
    email: 'vendas@coopboavista.coop.br',
    street: 'Rodovia BR-163',
    number: 'Km 45',
    neighborhood: 'Zona Rural',
    city: 'Dourados',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79800-000',
    latitude: -22.2208,
    longitude: -54.8058,
    status: 'active',
    createdAt: '2024-02-25T14:30:00Z',
    deletedAt: null,
  },
  {
    id: 'b550e8400-e29b-41d4-a716-446655440003',
    name: 'Mercado do Produtor',
    phone: '+55 67 93456-1122',
    email: 'compras@mercadoprodutor.com',
    street: 'Rua das Flores',
    number: '789',
    neighborhood: 'Jardim Europa',
    city: 'Corumbá',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79300-000',
    latitude: -19.0086,
    longitude: -57.6517,
    status: 'inactive',
    createdAt: '2023-12-12T11:20:00Z',
    deletedAt: null,
  },
  {
    id: 'b550e8400-e29b-41d4-a716-446655440004',
    name: 'Distribuidora Pantaneira',
    cnpj: '21.987.654/0001-55',
    phone: '+55 67 97654-3210',
    email: 'contato@pantaneira.com.br',
    street: 'Estrada Velha',
    number: '321',
    neighborhood: 'Zona Rural',
    city: 'Aquidauana',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79200-000',
    latitude: -20.4706,
    longitude: -55.7878,
    status: 'active',
    createdAt: '2024-03-05T09:00:00Z',
    deletedAt: null,
  },
  {
    id: 'b550e8400-e29b-41d4-a716-446655440005',
    name: 'Comercial Esperança',
    phone: '+55 67 98888-7777',
    email: 'suporte@comercialesperanca.com',
    street: 'Estrada da Esperança',
    number: '123',
    neighborhood: 'Zona Rural',
    city: 'Três Lagoas',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79600-000',
    latitude: -20.7845,
    longitude: -51.7147,
    status: 'active',
    createdAt: '2024-03-15T08:15:00Z',
    deletedAt: null,
  },
  {
    id: 'b550e8400-e29b-41d4-a716-446655440006',
    name: 'Atacado Santa Maria',
    cnpj: '11.222.333/0001-44',
    phone: '+55 67 97777-6666',
    email: 'compras@atacadosantamaria.com',
    street: 'Estrada do Campo',
    number: '456',
    neighborhood: 'Zona Rural',
    city: 'Ponta Porã',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79900-000',
    latitude: -22.5361,
    longitude: -55.7256,
    status: 'inactive',
    createdAt: '2023-11-05T16:45:00Z',
    deletedAt: '2024-04-01T10:30:00Z',
  },
];

export const PROPERTYHASBUYER: BuyerHasProperty[] = [
  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440001',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440001',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
  },

  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440002',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
  },
  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440002',
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
  },

  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440003',
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
  },

  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440004',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440004',
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
  },

  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440005',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
  },

  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440006',
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
  },
  {
    buyerId: 'b550e8400-e29b-41d4-a716-446655440006',
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
  },
];
