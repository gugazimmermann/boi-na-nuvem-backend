export interface Employee {
  id: string;
  name: string;
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

export interface PropertyHasEmployee {
  propertyId: string;
  employeeId: string;
}

export const EMPLOYESS: Employee[] = [
  {
    id: 'e550e8400-e29b-41d4-a716-446655440001',
    name: 'João Silva',
    phone: '+55 47 91111-2222',
    email: 'joao.silva@fazendajuca.com.br',
    street: 'Rua Simão Piaz',
    number: '300',
    neighborhood: 'Centro',
    city: 'São João do Itaperiú',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88395-000',
    latitude: -26.5593843,
    longitude: -48.7587542,
    status: 'active',
    createdAt: '2024-01-25T10:00:00Z',
    deletedAt: null,
  },
  {
    id: 'e550e8400-e29b-41d4-a716-446655440002',
    name: 'Maria Santos',
    phone: '+55 67 92222-3333',
    email: 'maria.santos@boavista.com.br',
    street: 'Rodovia BR-163',
    number: 'Km 49',
    neighborhood: 'Zona Rural',
    city: 'Dourados',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79800-000',
    latitude: -22.2208,
    longitude: -54.8058,
    status: 'active',
    createdAt: '2024-02-28T14:30:00Z',
    deletedAt: null,
  },
  {
    id: 'e550e8400-e29b-41d4-a716-446655440003',
    name: 'Pedro Oliveira',
    phone: '+55 67 93333-4444',
    email: 'pedro.oliveira@esperanca.com',
    street: 'Estrada da Esperança',
    number: '125',
    neighborhood: 'Zona Rural',
    city: 'Três Lagoas',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79600-000',
    latitude: -20.7845,
    longitude: -51.7147,
    status: 'inactive',
    createdAt: '2023-12-15T11:20:00Z',
    deletedAt: null,
  },
  {
    id: 'e550e8400-e29b-41d4-a716-446655440004',
    name: 'Ana Costa',
    phone: '+55 67 94444-5555',
    email: 'ana.costa@pantaneira.com',
    street: 'Estrada Velha',
    number: '323',
    neighborhood: 'Zona Rural',
    city: 'Aquidauana',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79200-000',
    latitude: -20.4706,
    longitude: -55.7878,
    status: 'active',
    createdAt: '2024-03-08T09:00:00Z',
    deletedAt: null,
  },
  {
    id: 'e550e8400-e29b-41d4-a716-446655440005',
    name: 'Carlos Ferreira',
    phone: '+55 67 95555-6666',
    email: 'carlos.ferreira@santamaria.com',
    street: 'Estrada do Campo',
    number: '458',
    neighborhood: 'Zona Rural',
    city: 'Ponta Porã',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79900-000',
    latitude: -22.5361,
    longitude: -55.7256,
    status: 'inactive',
    createdAt: '2023-11-08T16:45:00Z',
    deletedAt: '2024-04-03T10:30:00Z',
  },
  {
    id: 'e550e8400-e29b-41d4-a716-446655440006',
    name: 'Lucia Mendes',
    phone: '+55 67 96666-7777',
    email: 'lucia.mendes@chacarasol.com',
    street: 'Rua das Flores',
    number: '791',
    neighborhood: 'Zona Rural',
    city: 'Corumbá',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79300-000',
    latitude: -19.0086,
    longitude: -57.6517,
    status: 'active',
    createdAt: '2024-03-20T08:15:00Z',
    deletedAt: null,
  },
];

export const PROPERTYHASEMPLOYEE: PropertyHasEmployee[] = [
  {
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440001',
  },
  {
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440001',
  },

  {
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440002',
  },
  {
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440002',
  },

  {
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440003',
  },

  {
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440004',
  },
  {
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440004',
  },

  {
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440005',
  },
  {
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440005',
  },

  {
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440006',
  },
];
