export enum ResponsibleType {
  EMPLOYEE = 'employee',
  SERVICE_PROVIDER = 'serviceProvider',
}

export interface ServiceProvider {
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

export interface ServiceProviderHasProperty {
  serviceProvider_id: string;
  property_id: string;
}

export enum ServiceProviderMovimentType {
  SERVICE = 'SERVICE',
  MAINTENANCE = 'MAINTENANCE',
  CONSULTATION = 'CONSULTATION',
  DELIVERY = 'DELIVERY',
  INSTALLATION = 'INSTALLATION',
  REPAIR = 'REPAIR',
  INSPECTION = 'INSPECTION',
  TRAINING = 'TRAINING',
  OTHER = 'OTHER',
}

export interface ServiceProviderMoviment {
  id: string;
  serviceProviderId: string;
  type: ServiceProviderMovimentType;
  description?: string;
  locationId?: string;
  propertyId?: string;
  responsibleType: ResponsibleType;
  employeeId?: string;
  createdAt: string;
  updatedAt: string;
}

export const SERVICEPROVIDERS: ServiceProvider[] = [
  {
    id: 'sp550e8400-e29b-41d4-a716-446655440001',
    name: 'Veterinária Juca',
    cnpj: '78.123.456/0001-00',
    phone: '+55 47 97777-8888',
    email: 'contato@veterinariajuca.com.br',
    street: 'Rua Simão Piaz',
    number: '400',
    neighborhood: 'Centro',
    city: 'São João do Itaperiú',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88395-000',
    latitude: -26.5593843,
    longitude: -48.7587542,
    status: 'active',
    createdAt: '2024-01-30T10:00:00Z',
    deletedAt: null,
  },
  {
    id: 'sp550e8400-e29b-41d4-a716-446655440002',
    name: 'Agro Consultoria Boa Vista',
    phone: '+55 67 98888-9999',
    email: 'consultoria@agroboavista.com.br',
    street: 'Rodovia BR-163',
    number: 'Km 51',
    neighborhood: 'Zona Rural',
    city: 'Dourados',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79800-000',
    latitude: -22.2208,
    longitude: -54.8058,
    status: 'active',
    createdAt: '2024-03-02T14:30:00Z',
    deletedAt: null,
  },
  {
    id: 'sp550e8400-e29b-41d4-a716-446655440003',
    name: 'Manutenção Esperança',
    cnpj: '33.444.555/0001-66',
    phone: '+55 67 99999-0000',
    email: 'manutencao@esperanca.com',
    street: 'Estrada da Esperança',
    number: '127',
    neighborhood: 'Zona Rural',
    city: 'Três Lagoas',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79600-000',
    latitude: -20.7845,
    longitude: -51.7147,
    status: 'inactive',
    createdAt: '2023-12-18T11:20:00Z',
    deletedAt: null,
  },
  {
    id: 'sp550e8400-e29b-41d4-a716-446655440004',
    name: 'Transporte Pantaneiro',
    phone: '+55 67 90000-1111',
    email: 'transporte@pantaneiro.com',
    street: 'Estrada Velha',
    number: '325',
    neighborhood: 'Zona Rural',
    city: 'Aquidauana',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79200-000',
    latitude: -20.4706,
    longitude: -55.7878,
    status: 'active',
    createdAt: '2024-03-10T09:00:00Z',
    deletedAt: null,
  },
  {
    id: 'sp550e8400-e29b-41d4-a716-446655440005',
    name: 'Limpeza Santa Maria',
    cnpj: '44.555.666/0001-77',
    phone: '+55 67 91111-2222',
    email: 'limpeza@santamaria.com',
    street: 'Estrada do Campo',
    number: '460',
    neighborhood: 'Zona Rural',
    city: 'Ponta Porã',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79900-000',
    latitude: -22.5361,
    longitude: -55.7256,
    status: 'inactive',
    createdAt: '2023-11-12T16:45:00Z',
    deletedAt: '2024-04-05T10:30:00Z',
  },
  {
    id: 'sp550e8400-e29b-41d4-a716-446655440006',
    name: 'Segurança Chácara do Sol',
    phone: '+55 67 92222-3333',
    email: 'seguranca@chacarasol.com',
    street: 'Rua das Flores',
    number: '793',
    neighborhood: 'Zona Rural',
    city: 'Corumbá',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79300-000',
    latitude: -19.0086,
    longitude: -57.6517,
    status: 'active',
    createdAt: '2024-03-25T08:15:00Z',
    deletedAt: null,
  },
];

export const SERVICEPROVIDERHASPROPERTY: ServiceProviderHasProperty[] = [
  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440001',
    property_id: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440001',
    property_id: '550e8400-e29b-41d4-a716-446655440002',
  },

  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440002',
    property_id: '550e8400-e29b-41d4-a716-446655440002',
  },
  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440002',
    property_id: '550e8400-e29b-41d4-a716-446655440003',
  },

  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440003',
    property_id: '550e8400-e29b-41d4-a716-446655440003',
  },

  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440004',
    property_id: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440004',
    property_id: '550e8400-e29b-41d4-a716-446655440004',
  },

  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440005',
    property_id: '550e8400-e29b-41d4-a716-446655440004',
  },
  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440005',
    property_id: '550e8400-e29b-41d4-a716-446655440005',
  },

  {
    serviceProvider_id: 'sp550e8400-e29b-41d4-a716-446655440006',
    property_id: '550e8400-e29b-41d4-a716-446655440005',
  },
];
