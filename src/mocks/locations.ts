export enum LocationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}

export enum LocationType {
  CULTIVATION = 'cultivation',
  LIVESTOCK = 'livestock',
  STORAGE = 'storage',
  CONFINEMENT = 'confinement',
  SEMI_CONFINEMENT = 'semi-confinement',
}

export enum LocationMovimentType {
  ENTRY = 'entry',
  EXIT = 'exit',
  SUPPLEMENTATION = 'supplementation',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
  CONSTRUCTION = 'construction',
  EQUIPMENT_INSTALLATION = 'equipment_installation',
}

export enum LocationQualityType {
  GOOD = 'good',
  REGULAR = 'regular',
  BAD = 'bad',
}

export enum ResponsibleType {
  EMPLOYEE = 'employee',
  SERVICE_PROVIDER = 'serviceProvider',
}

export interface Location {
  id: string;
  code: string;
  name: string;
  description: string;
  type: LocationType;
  area: number;
  areaType: string;
  capacity: number;
  status: LocationStatus;
  createdAt: string;
  deletedAt: string | null;
  propertyId: string;
}

export interface LocationMoviment {
  id: string;
  type: LocationMovimentType;
  description?: string;
  quantity?: number;
  createdAt: string;
  deletedAt: string | null;
  responsibleType: ResponsibleType;
  locationId: string;
  employeeId: string | null;
  serviceProviderId: string | null;
}

export interface LocationObservation {
  id: string;
  observation: string;
  createdAt: string;
  deletedAt: string | null;
  locationId: string;
}

export interface LocationQuality {
  id: string;
  quality: LocationQualityType;
  createdAt: string;
  deletedAt: string | null;
  locationId: string;
}

export const LOCATIONS: Location[] = [
  {
    id: 'l550e8400-e29b-41d4-a716-446655440001',
    code: 'FAZ-001-CUL-001',
    name: 'Campo de Milho - Fazenda do Juca',
    description: 'Área destinada ao cultivo de campo de milho',
    type: LocationType.CULTIVATION,
    area: 50,
    areaType: 'hectares',
    capacity: 0,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-01-15T10:00:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440002',
    code: 'FAZ-001-LIV-001',
    name: 'Pasto Principal - Fazenda do Juca',
    description: 'Área para criação e manejo de gado - Pasto Principal',
    type: LocationType.LIVESTOCK,
    area: 80,
    areaType: 'hectares',
    capacity: 40,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-01-20T14:30:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440003',
    code: 'FAZ-001-STO-001',
    name: 'Galpão Principal - Fazenda do Juca',
    description: 'Estrutura para armazenamento - Galpão Principal',
    type: LocationType.STORAGE,
    area: 2000,
    areaType: 'm²',
    capacity: 0,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-02-01T09:15:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440004',
    code: 'FAZ-001-CON-001',
    name: 'Confinamento A - Fazenda do Juca',
    description: 'Sistema de confinamento para gado - Confinamento A',
    type: LocationType.CONFINEMENT,
    area: 3000,
    areaType: 'm²',
    capacity: 45,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-02-10T11:45:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440005',
    code: 'FAZ-001-SEM-001',
    name: 'Semi-Confinamento A - Fazenda do Juca',
    description: 'Sistema semi-confinado para gado - Semi-Confinamento A',
    type: LocationType.SEMI_CONFINEMENT,
    area: 60,
    areaType: 'hectares',
    capacity: 48,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-02-15T16:20:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440006',
    code: 'FAZ-001-CUL-002',
    name: 'Plantação de Soja - Fazenda do Juca',
    description: 'Área destinada ao cultivo de plantação de soja',
    type: LocationType.CULTIVATION,
    area: 40,
    areaType: 'hectares',
    capacity: 0,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-03-01T08:30:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440007',
    code: 'FAZ-001-LIV-002',
    name: 'Área de Reprodução - Fazenda do Juca',
    description: 'Área para criação e manejo de gado - Área de Reprodução',
    type: LocationType.LIVESTOCK,
    area: 50,
    areaType: 'hectares',
    capacity: 25,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-03-10T13:15:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440008',
    code: 'FAZ-001-STO-002',
    name: 'Silo de Grãos - Fazenda do Juca',
    description: 'Estrutura para armazenamento - Silo de Grãos',
    type: LocationType.STORAGE,
    area: 1500,
    areaType: 'm²',
    capacity: 0,
    status: LocationStatus.MAINTENANCE,
    createdAt: '2024-03-20T10:45:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440009',
    code: 'FAZ-002-CUL-001',
    name: 'Campo de Trigo - Fazenda Boa Vista',
    description: 'Área destinada ao cultivo de campo de trigo',
    type: LocationType.CULTIVATION,
    area: 60,
    areaType: 'hectares',
    capacity: 0,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-02-20T14:30:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
  },
  {
    id: 'l550e8400-e29b-41d4-a716-446655440010',
    code: 'FAZ-002-LIV-001',
    name: 'Campo de Engorda - Fazenda Boa Vista',
    description: 'Área para criação e manejo de gado - Campo de Engorda',
    type: LocationType.LIVESTOCK,
    area: 80,
    areaType: 'hectares',
    capacity: 40,
    status: LocationStatus.ACTIVE,
    createdAt: '2024-02-25T09:00:00Z',
    deletedAt: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
  },
];

export const LOCATION_MOVIMENTS: LocationMoviment[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440173',
    type: LocationMovimentType.ENTRY,
    description: 'Entrada de animais no pasto principal',
    quantity: 15,
    createdAt: '2024-01-15T08:00:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.EMPLOYEE,
    locationId: 'l550e8400-e29b-41d4-a716-446655440002',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440001',
    serviceProviderId: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440174',
    type: LocationMovimentType.EXIT,
    description: 'Saída de animais do confinamento',
    quantity: 8,
    createdAt: '2024-01-18T15:30:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.EMPLOYEE,
    locationId: 'l550e8400-e29b-41d4-a716-446655440004',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440001',
    serviceProviderId: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440175',
    type: LocationMovimentType.ENTRY,
    description: 'Entrada de animais no semi-confinamento',
    quantity: 12,
    createdAt: '2024-01-20T09:30:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.EMPLOYEE,
    locationId: 'l550e8400-e29b-41d4-a716-446655440005',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440002',
    serviceProviderId: null,
  },
  // Movimentações adicionais para a propriedade 550e8400-e29b-41d4-a716-446655440001
  {
    id: '550e8400-e29b-41d4-a716-446655440176',
    type: LocationMovimentType.SUPPLEMENTATION,
    description: 'Suplementação mineral no pasto principal',
    quantity: 0,
    createdAt: '2024-01-22T14:00:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.EMPLOYEE,
    locationId: 'l550e8400-e29b-41d4-a716-446655440002',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440001',
    serviceProviderId: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440177',
    type: LocationMovimentType.MAINTENANCE,
    description: 'Manutenção do sistema de irrigação',
    quantity: 0,
    createdAt: '2024-01-25T10:30:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.SERVICE_PROVIDER,
    locationId: 'l550e8400-e29b-41d4-a716-446655440003',
    employeeId: null,
    serviceProviderId: 'sp550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440178',
    type: LocationMovimentType.CLEANING,
    description: 'Limpeza do confinamento',
    quantity: 0,
    createdAt: '2024-01-28T08:00:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.EMPLOYEE,
    locationId: 'l550e8400-e29b-41d4-a716-446655440004',
    employeeId: 'e550e8400-e29b-41d4-a716-446655440002',
    serviceProviderId: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440179',
    type: LocationMovimentType.CONSTRUCTION,
    description: 'Construção de novo bebedouro',
    quantity: 0,
    createdAt: '2024-02-01T07:00:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.SERVICE_PROVIDER,
    locationId: 'l550e8400-e29b-41d4-a716-446655440005',
    employeeId: null,
    serviceProviderId: 'sp550e8400-e29b-41d4-a716-446655440002',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440180',
    type: LocationMovimentType.EQUIPMENT_INSTALLATION,
    description: 'Instalação de sistema de monitoramento',
    quantity: 0,
    createdAt: '2024-02-05T16:00:00Z',
    deletedAt: null,
    responsibleType: ResponsibleType.SERVICE_PROVIDER,
    locationId: 'l550e8400-e29b-41d4-a716-446655440006',
    employeeId: null,
    serviceProviderId: 'sp550e8400-e29b-41d4-a716-446655440003',
  },
];

export const LOCATION_OBSERVATIONS: LocationObservation[] = [
  {
    id: 'obs-001',
    observation: 'Pasto em bom estado, grama verde e abundante',
    createdAt: '2024-01-15T10:00:00Z',
    deletedAt: null,
    locationId: 'l550e8400-e29b-41d4-a716-446655440002',
  },
  {
    id: 'obs-002',
    observation: 'Confinamento necessita limpeza urgente',
    createdAt: '2024-01-18T14:30:00Z',
    deletedAt: null,
    locationId: 'l550e8400-e29b-41d4-a716-446655440004',
  },
  {
    id: 'obs-003',
    observation: 'Silo apresentando problemas de ventilação',
    createdAt: '2024-03-20T11:00:00Z',
    deletedAt: null,
    locationId: 'l550e8400-e29b-41d4-a716-446655440008',
  },
];

export const LOCATION_QUALITIES: LocationQuality[] = [
  {
    id: 'qual-001',
    quality: LocationQualityType.GOOD,
    createdAt: '2024-01-15T10:00:00Z',
    deletedAt: null,
    locationId: 'l550e8400-e29b-41d4-a716-446655440002',
  },
  {
    id: 'qual-002',
    quality: LocationQualityType.REGULAR,
    createdAt: '2024-01-18T14:30:00Z',
    deletedAt: null,
    locationId: 'l550e8400-e29b-41d4-a716-446655440004',
  },
  {
    id: 'qual-003',
    quality: LocationQualityType.BAD,
    createdAt: '2024-03-20T11:00:00Z',
    deletedAt: null,
    locationId: 'l550e8400-e29b-41d4-a716-446655440008',
  },
];
