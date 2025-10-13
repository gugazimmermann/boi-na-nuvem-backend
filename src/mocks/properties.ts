export enum PropertyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface PasturePlanning {
  month: string;
  precipitation: number;
  temperature: number;
  state: 'Good' | 'Medium' | 'Poor';
}

export interface Property {
  id: string;
  code: string;
  name: string;
  description?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  status: PropertyStatus;
  createdAt?: string;
  deletedAt?: string | null;
  pasturePlanning?: PasturePlanning[];
}

export const PROPERTIES: Property[] = [
  {
    id: 'allprop-550e8400-e29b-41d4-a716-446655440000',
    code: 'ALL',
    name: 'Todas as Propriedades',
    status: PropertyStatus.ACTIVE,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: 'FAZ-001',
    name: 'Fazenda do Juca',
    description: 'Propriedade principal para criação de gado',
    street: 'Rua Simão Piaz',
    number: 'S/N',
    neighborhood: 'Porto',
    city: 'São João do Itaperiú',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88395-000',
    latitude: -26.5593843,
    longitude: -48.7587542,
    status: PropertyStatus.ACTIVE,
    createdAt: '2024-01-15T10:00:00Z',
    pasturePlanning: [
      { month: 'January', precipitation: 4894.2, temperature: 24.9, state: 'Good' },
      { month: 'February', precipitation: 4270.2, temperature: 24.9, state: 'Good' },
      { month: 'March', precipitation: 3485.4, temperature: 24.1, state: 'Good' },
      { month: 'April', precipitation: 2395.9, temperature: 22.1, state: 'Medium' },
      { month: 'May', precipitation: 2449.4, temperature: 19.2, state: 'Medium' },
      { month: 'June', precipitation: 2493.3, temperature: 17.6, state: 'Medium' },
      { month: 'July', precipitation: 1916.7, temperature: 16.6, state: 'Medium' },
      { month: 'August', precipitation: 2125.5, temperature: 17.4, state: 'Medium' },
      { month: 'September', precipitation: 2844.4, temperature: 18.7, state: 'Medium' },
      { month: 'October', precipitation: 3150.9, temperature: 20.5, state: 'Medium' },
      { month: 'November', precipitation: 3277.4, temperature: 22.0, state: 'Good' },
      { month: 'December', precipitation: 3396.1, temperature: 23.8, state: 'Good' }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    code: 'FAZ-002',
    name: 'Fazenda Boa Vista',
    description: 'Propriedade para agricultura e pecuária',
    street: 'Rodovia BR-163',
    number: 'Km 45',
    neighborhood: 'Zona Rural',
    city: 'Dourados',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79804-970',
    latitude: -22.2208,
    longitude: -54.8058,
    status: PropertyStatus.ACTIVE,
    createdAt: '2024-02-20T14:30:00Z',
    pasturePlanning: [
      { month: 'January', precipitation: 185.2, temperature: 26.8, state: 'Poor' },
      { month: 'February', precipitation: 165.4, temperature: 26.5, state: 'Poor' },
      { month: 'March', precipitation: 142.8, temperature: 25.9, state: 'Poor' },
      { month: 'April', precipitation: 98.6, temperature: 23.4, state: 'Poor' },
      { month: 'May', precipitation: 67.3, temperature: 20.1, state: 'Poor' },
      { month: 'June', precipitation: 45.2, temperature: 18.7, state: 'Poor' },
      { month: 'July', precipitation: 38.9, temperature: 18.2, state: 'Poor' },
      { month: 'August', precipitation: 52.1, temperature: 20.8, state: 'Poor' },
      { month: 'September', precipitation: 89.4, temperature: 23.1, state: 'Poor' },
      { month: 'October', precipitation: 124.7, temperature: 25.3, state: 'Poor' },
      { month: 'November', precipitation: 156.8, temperature: 26.2, state: 'Poor' },
      { month: 'December', precipitation: 178.3, temperature: 26.6, state: 'Poor' }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    code: 'FAZ-003',
    name: 'Sítio Esperança',
    description: 'Pequena propriedade familiar',
    street: 'Estrada da Esperança',
    number: '123',
    neighborhood: 'Zona Rural',
    city: 'Três Lagoas',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79601-000',
    latitude: -20.7845,
    longitude: -51.7147,
    status: PropertyStatus.ACTIVE,
    createdAt: '2024-03-10T09:15:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    code: 'FAZ-004',
    name: 'Fazenda Santa Maria',
    description: 'Propriedade temporariamente inativa',
    street: 'Estrada do Campo',
    number: '456',
    neighborhood: 'Zona Rural',
    city: 'Ponta Porã',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79900-000',
    latitude: -22.5361,
    longitude: -55.7256,
    status: PropertyStatus.INACTIVE,
    createdAt: '2023-11-05T16:45:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    code: 'FAZ-005',
    name: 'Chácara do Sol',
    description: 'Propriedade em manutenção',
    street: 'Rua das Flores',
    number: '789',
    neighborhood: 'Zona Rural',
    city: 'Corumbá',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79300-000',
    latitude: -19.0086,
    longitude: -57.6517,
    status: PropertyStatus.INACTIVE,
    createdAt: '2023-12-12T11:20:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    code: 'FAZ-006',
    name: 'Fazenda Antiga',
    description: 'Propriedade que foi vendida',
    street: 'Estrada Velha',
    number: '321',
    neighborhood: 'Zona Rural',
    city: 'Aquidauana',
    state: 'MS',
    country: 'Brasil',
    zipCode: '79200-000',
    latitude: -20.4706,
    longitude: -55.7878,
    status: PropertyStatus.INACTIVE,
    createdAt: '2023-08-15T13:00:00Z',
    deletedAt: '2024-04-01T10:30:00Z',
  },
];

export const STATUS_INDICATORS = {
  active: '🟢',
  inactive: '⚫',
} as const;

export const STATUS_LABELS = {
  active: 'Ativo',
  inactive: 'Inativo',
} as const;
