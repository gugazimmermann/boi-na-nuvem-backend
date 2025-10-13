export interface Supplier {
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

export interface SupplierHasProperty {
  supplierId: string;
  propertyId: string;
}

export const SUPPLIERS: Supplier[] = [
  {
    id: 's550e8400-e29b-41d4-a716-446655440001',
    name: 'Agro Suprimentos Juca',
    cnpj: '45.123.456/0001-00',
    phone: '+55 47 90000-1111',
    email: 'contato@agrosuprimentosjuca.com.br',
    street: 'Rua Simão Piaz',
    number: '200',
    neighborhood: 'Centro',
    city: 'São João do Itaperiú',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88395-000',
    latitude: -26.5593843,
    longitude: -48.7587542,
    status: 'active',
    createdAt: '2024-01-22T10:00:00Z',
    deletedAt: null,
  },
  {
    id: 's550e8400-e29b-41d4-a716-446655440002',
    name: 'Insumos Boa Vista',
    phone: '+55 67 95555-2222',
    email: 'vendas@insumosboavista.com.br',
    street: 'Rodovia BR-163',
    number: 'Km 47',
    neighborhood: 'Zona Rural',
    city: 'Dourados',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79800-000',
    latitude: -22.2208,
    longitude: -54.8058,
    status: 'active',
    createdAt: '2024-02-26T14:30:00Z',
    deletedAt: null,
  },
  {
    id: 's550e8400-e29b-41d4-a716-446655440003',
    name: 'Sementes Esperança',
    cnpj: '22.333.444/0001-55',
    phone: '+55 67 96666-3333',
    email: 'suporte@sementesesperanca.com',
    street: 'Estrada da Esperança',
    number: '123',
    neighborhood: 'Zona Rural',
    city: 'Três Lagoas',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79600-000',
    latitude: -20.7845,
    longitude: -51.7147,
    status: 'inactive',
    createdAt: '2023-12-12T11:20:00Z',
    deletedAt: null,
  },
  {
    id: 's550e8400-e29b-41d4-a716-446655440004',
    name: 'Ferragens Pantaneiras',
    phone: '+55 67 97777-4444',
    email: 'compras@ferragenspantaneiras.com',
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
    createdAt: '2024-03-06T09:00:00Z',
    deletedAt: null,
  },
  {
    id: 's550e8400-e29b-41d4-a716-446655440005',
    name: 'Atacado Santa Maria',
    cnpj: '11.222.333/0001-44',
    phone: '+55 67 98888-5555',
    email: 'contato@atacadosantamaria.com',
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

export const PROPERTYHASSUPPLIER: SupplierHasProperty[] = [
  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440001',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440001',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
  },

  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440002',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
  },
  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440002',
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
  },

  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440003',
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
  },

  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440004',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440004',
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
  },

  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440005',
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
  },
  {
    supplierId: 's550e8400-e29b-41d4-a716-446655440005',
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
  },
];
