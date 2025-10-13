export enum AnimalBreed {
  SRD = 'SRD',
  ANGUS = 'Angus',
  NELORE = 'Nelore',
}

export enum BloodDegree {
  SRD = 'SRD',
  PO = 'PO', // Puro de Origem
  PC = 'PC', // Puro por Cruza
  F1 = 'F1', // 1ª geração (50%)
  F2 = 'F2', // 2ª geração (75%)
  F3 = 'F3', // 3ª geração (87.5%)
  F4 = 'F4', // 4ª geração (93.75%)
}

export enum AnimalSex {
  FEMEA = 'Fêmea',
  MACHO = 'Macho',
  TOURO = 'Touro',
}

export enum AnimalPurpose {
  CORTE = 'Corte',
  MATRIZ = 'Matriz',
  REPRODUTOR = 'Reprodutor',
}

export interface Animal {
  id: string;
  code: string;
  registrationNumber: string;
  breed: AnimalBreed;
  bloodDegree: BloodDegree;
  bloodPercentage: number;
  sex: AnimalSex;
  purpose: AnimalPurpose;
  birthDate: string;
  acquisitionDate: string;
  fatherId: string | null;
  motherId: string | null;
  propertyId: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface AnimalLocation {
  id: string;
  animalId: string;
  locationMovimentId: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface Pedigree {
  id: string;
  animalId: string;
  fatherId: string | null;
  motherId: string | null;
}

const updateGenerationGenealogy = (animals: Animal[], parentIds: string[]): Animal[] => {
  const propertyIds = [
    '550e8400-e29b-41d4-a716-446655440001', // Fazenda do Juca
    '550e8400-e29b-41d4-a716-446655440002', // Fazenda Boa Vista
    '550e8400-e29b-41d4-a716-446655440003', // Sítio Esperança
    '550e8400-e29b-41d4-a716-446655440004', // Fazenda Santa Maria
    '550e8400-e29b-41d4-a716-446655440005', // Chácara do Sol
  ];

  return animals.map((animal, index) => {
    const fatherId = parentIds[index % parentIds.length];
    const motherId = parentIds[(index + 1) % parentIds.length];
    const propertyId = propertyIds[index % propertyIds.length];

    return {
      ...animal,
      fatherId,
      motherId,
      propertyId,
    };
  });
};

const FOUNDERS: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: '001',
    registrationNumber: '123456789012',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.TOURO,
    purpose: AnimalPurpose.REPRODUTOR,
    birthDate: '2020-01-15T00:00:00Z',
    acquisitionDate: '2020-02-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2020-02-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    code: '002',
    registrationNumber: '234567890123',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2020-03-20T00:00:00Z',
    acquisitionDate: '2020-04-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2020-04-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    code: '003',
    registrationNumber: '345678901234',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.TOURO,
    purpose: AnimalPurpose.REPRODUTOR,
    birthDate: '2020-02-10T00:00:00Z',
    acquisitionDate: '2020-03-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2020-03-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    code: '004',
    registrationNumber: '456789012345',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2020-04-05T00:00:00Z',
    acquisitionDate: '2020-05-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2020-05-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    code: '005',
    registrationNumber: '567890123456',
    breed: AnimalBreed.SRD,
    bloodDegree: BloodDegree.SRD,
    bloodPercentage: 0,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2019-12-15T00:00:00Z',
    acquisitionDate: '2020-01-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
    createdAt: '2020-01-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    code: '006',
    registrationNumber: '678901234567',
    breed: AnimalBreed.SRD,
    bloodDegree: BloodDegree.SRD,
    bloodPercentage: 0,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2020-01-20T00:00:00Z',
    acquisitionDate: '2020-02-15T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
    createdAt: '2020-02-15T00:00:00Z',
    deletedAt: null,
  },
];

const F1_GENERATION: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    code: '007',
    registrationNumber: '789012345678',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2021-03-15T00:00:00Z',
    acquisitionDate: '2021-03-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440001',
    motherId: '550e8400-e29b-41d4-a716-446655440005',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2021-03-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    code: '008',
    registrationNumber: '890123456789',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2021-04-20T00:00:00Z',
    acquisitionDate: '2021-04-20T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440001',
    motherId: '550e8400-e29b-41d4-a716-446655440006',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2021-04-20T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    code: '009',
    registrationNumber: '901234567890',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2021-05-10T00:00:00Z',
    acquisitionDate: '2021-05-10T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440003',
    motherId: '550e8400-e29b-41d4-a716-446655440005',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2021-05-10T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    code: '010',
    registrationNumber: '012345678901',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2021-06-15T00:00:00Z',
    acquisitionDate: '2021-06-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440003',
    motherId: '550e8400-e29b-41d4-a716-446655440006',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2021-06-15T00:00:00Z',
    deletedAt: null,
  },
];

const F2_GENERATION_RAW: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    code: '011',
    registrationNumber: '111111111111',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F2,
    bloodPercentage: 75,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2022-02-15T00:00:00Z',
    acquisitionDate: '2022-02-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440007',
    motherId: '550e8400-e29b-41d4-a716-446655440008',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2022-02-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    code: '012',
    registrationNumber: '222222222222',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F2,
    bloodPercentage: 75,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2022-03-20T00:00:00Z',
    acquisitionDate: '2022-03-20T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440002',
    motherId: '550e8400-e29b-41d4-a716-446655440007',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2022-03-20T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    code: '013',
    registrationNumber: '333333333333',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F2,
    bloodPercentage: 75,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2022-04-10T00:00:00Z',
    acquisitionDate: '2022-04-10T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440003',
    motherId: '550e8400-e29b-41d4-a716-446655440010',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2022-04-10T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440014',
    code: '014',
    registrationNumber: '444444444444',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F2,
    bloodPercentage: 75,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2022-05-15T00:00:00Z',
    acquisitionDate: '2022-05-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440004',
    motherId: '550e8400-e29b-41d4-a716-446655440009',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2022-05-15T00:00:00Z',
    deletedAt: null,
  },
];

const F2_GENERATION = updateGenerationGenealogy(F2_GENERATION_RAW, [
  '550e8400-e29b-41d4-a716-446655440007',
  '550e8400-e29b-41d4-a716-446655440008',
  '550e8400-e29b-41d4-a716-446655440009',
  '550e8400-e29b-41d4-a716-446655440010',
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004',
]);

const F3_GENERATION_RAW: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440015',
    code: '015',
    registrationNumber: '555555555555',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F3,
    bloodPercentage: 87.5,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2023-01-15T00:00:00Z',
    acquisitionDate: '2023-01-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440001',
    motherId: '550e8400-e29b-41d4-a716-446655440012',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2023-01-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440016',
    code: '016',
    registrationNumber: '666666666666',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F3,
    bloodPercentage: 87.5,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2023-02-20T00:00:00Z',
    acquisitionDate: '2023-02-20T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440002',
    motherId: '550e8400-e29b-41d4-a716-446655440011',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2023-02-20T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440017',
    code: '017',
    registrationNumber: '777777777777',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F3,
    bloodPercentage: 87.5,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2023-03-10T00:00:00Z',
    acquisitionDate: '2023-03-10T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440003',
    motherId: '550e8400-e29b-41d4-a716-446655440014',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2023-03-10T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440018',
    code: '018',
    registrationNumber: '888888888888',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F3,
    bloodPercentage: 87.5,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2023-04-15T00:00:00Z',
    acquisitionDate: '2023-04-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440004',
    motherId: '550e8400-e29b-41d4-a716-446655440013',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2023-04-15T00:00:00Z',
    deletedAt: null,
  },
];

const F3_GENERATION = updateGenerationGenealogy(F3_GENERATION_RAW, [
  '550e8400-e29b-41d4-a716-446655440011',
  '550e8400-e29b-41d4-a716-446655440012',
  '550e8400-e29b-41d4-a716-446655440013',
  '550e8400-e29b-41d4-a716-446655440014',
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004',
]);

const F4_GENERATION_RAW: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440019',
    code: '019',
    registrationNumber: '999999999999',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F4,
    bloodPercentage: 93.75,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2024-01-15T00:00:00Z',
    acquisitionDate: '2024-01-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440001',
    motherId: '550e8400-e29b-41d4-a716-446655440016',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2024-01-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440020',
    code: '020',
    registrationNumber: '101010101010',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F4,
    bloodPercentage: 93.75,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2024-02-20T00:00:00Z',
    acquisitionDate: '2024-02-20T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440002',
    motherId: '550e8400-e29b-41d4-a716-446655440015',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2024-02-20T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440021',
    code: '021',
    registrationNumber: '121212121212',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F4,
    bloodPercentage: 93.75,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2024-03-10T00:00:00Z',
    acquisitionDate: '2024-03-10T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440003',
    motherId: '550e8400-e29b-41d4-a716-446655440018',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2024-03-10T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440022',
    code: '022',
    registrationNumber: '131313131313',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F4,
    bloodPercentage: 93.75,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2024-04-15T00:00:00Z',
    acquisitionDate: '2024-04-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440004',
    motherId: '550e8400-e29b-41d4-a716-446655440017',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2024-04-15T00:00:00Z',
    deletedAt: null,
  },
];

const F4_GENERATION = updateGenerationGenealogy(F4_GENERATION_RAW, [
  '550e8400-e29b-41d4-a716-446655440015',
  '550e8400-e29b-41d4-a716-446655440016',
  '550e8400-e29b-41d4-a716-446655440017',
  '550e8400-e29b-41d4-a716-446655440018',
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004',
]);

const PC_GENERATION_RAW: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440023',
    code: '023',
    registrationNumber: '141414141414',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.PC,
    bloodPercentage: 96.875,
    sex: AnimalSex.TOURO,
    purpose: AnimalPurpose.REPRODUTOR,
    birthDate: '2024-05-15T00:00:00Z',
    acquisitionDate: '2024-05-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440001',
    motherId: '550e8400-e29b-41d4-a716-446655440020',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2024-05-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440024',
    code: '024',
    registrationNumber: '151515151515',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.PC,
    bloodPercentage: 96.875,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2024-06-20T00:00:00Z',
    acquisitionDate: '2024-06-20T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440002',
    motherId: '550e8400-e29b-41d4-a716-446655440019',
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2024-06-20T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440025',
    code: '025',
    registrationNumber: '161616161616',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.PC,
    bloodPercentage: 96.875,
    sex: AnimalSex.TOURO,
    purpose: AnimalPurpose.REPRODUTOR,
    birthDate: '2024-07-10T00:00:00Z',
    acquisitionDate: '2024-07-10T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440003',
    motherId: '550e8400-e29b-41d4-a716-446655440022',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2024-07-10T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440026',
    code: '026',
    registrationNumber: '171717171717',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.PC,
    bloodPercentage: 96.875,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2024-08-15T00:00:00Z',
    acquisitionDate: '2024-08-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440004',
    motherId: '550e8400-e29b-41d4-a716-446655440021',
    propertyId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2024-08-15T00:00:00Z',
    deletedAt: null,
  },
];

const PC_GENERATION = updateGenerationGenealogy(PC_GENERATION_RAW, [
  '550e8400-e29b-41d4-a716-446655440019',
  '550e8400-e29b-41d4-a716-446655440020',
  '550e8400-e29b-41d4-a716-446655440021',
  '550e8400-e29b-41d4-a716-446655440022',
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004',
]);

const SRD_ANIMALS: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440027',
    code: '027',
    registrationNumber: '181818181818',
    breed: AnimalBreed.SRD,
    bloodDegree: BloodDegree.SRD,
    bloodPercentage: 0,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2023-09-15T00:00:00Z',
    acquisitionDate: '2023-09-15T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
    createdAt: '2023-09-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440028',
    code: '028',
    registrationNumber: '191919191919',
    breed: AnimalBreed.SRD,
    bloodDegree: BloodDegree.SRD,
    bloodPercentage: 0,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2023-10-20T00:00:00Z',
    acquisitionDate: '2023-10-20T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440003',
    createdAt: '2023-10-20T00:00:00Z',
    deletedAt: null,
  },
];

const ADDITIONAL_FOUNDERS: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440029',
    code: '029',
    registrationNumber: '202020202020',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.TOURO,
    purpose: AnimalPurpose.REPRODUTOR,
    birthDate: '2019-08-15T00:00:00Z',
    acquisitionDate: '2019-09-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
    createdAt: '2019-09-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440030',
    code: '030',
    registrationNumber: '212121212121',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2019-10-20T00:00:00Z',
    acquisitionDate: '2019-11-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
    createdAt: '2019-11-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440031',
    code: '031',
    registrationNumber: '222222222222',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.TOURO,
    purpose: AnimalPurpose.REPRODUTOR,
    birthDate: '2019-09-10T00:00:00Z',
    acquisitionDate: '2019-10-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
    createdAt: '2019-10-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440032',
    code: '032',
    registrationNumber: '232323232323',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.PO,
    bloodPercentage: 100,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2019-11-05T00:00:00Z',
    acquisitionDate: '2019-12-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
    createdAt: '2019-12-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440033',
    code: '033',
    registrationNumber: '242424242424',
    breed: AnimalBreed.SRD,
    bloodDegree: BloodDegree.SRD,
    bloodPercentage: 0,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2019-07-15T00:00:00Z',
    acquisitionDate: '2019-08-01T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2019-08-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440034',
    code: '034',
    registrationNumber: '252525252525',
    breed: AnimalBreed.SRD,
    bloodDegree: BloodDegree.SRD,
    bloodPercentage: 0,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2019-08-20T00:00:00Z',
    acquisitionDate: '2019-09-15T00:00:00Z',
    fatherId: null,
    motherId: null,
    propertyId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2019-09-15T00:00:00Z',
    deletedAt: null,
  },
];

const ADDITIONAL_F1: Animal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440035',
    code: '035',
    registrationNumber: '262626262626',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2021-07-15T00:00:00Z',
    acquisitionDate: '2021-07-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440029',
    motherId: '550e8400-e29b-41d4-a716-446655440033',
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
    createdAt: '2021-07-15T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440036',
    code: '036',
    registrationNumber: '272727272727',
    breed: AnimalBreed.ANGUS,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2021-08-20T00:00:00Z',
    acquisitionDate: '2021-08-20T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440029',
    motherId: '550e8400-e29b-41d4-a716-446655440034',
    propertyId: '550e8400-e29b-41d4-a716-446655440004',
    createdAt: '2021-08-20T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440037',
    code: '037',
    registrationNumber: '282828282828',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.MACHO,
    purpose: AnimalPurpose.CORTE,
    birthDate: '2021-09-10T00:00:00Z',
    acquisitionDate: '2021-09-10T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440031',
    motherId: '550e8400-e29b-41d4-a716-446655440033',
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
    createdAt: '2021-09-10T00:00:00Z',
    deletedAt: null,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440038',
    code: '038',
    registrationNumber: '292929292929',
    breed: AnimalBreed.NELORE,
    bloodDegree: BloodDegree.F1,
    bloodPercentage: 50,
    sex: AnimalSex.FEMEA,
    purpose: AnimalPurpose.MATRIZ,
    birthDate: '2021-10-15T00:00:00Z',
    acquisitionDate: '2021-10-15T00:00:00Z',
    fatherId: '550e8400-e29b-41d4-a716-446655440031',
    motherId: '550e8400-e29b-41d4-a716-446655440034',
    propertyId: '550e8400-e29b-41d4-a716-446655440005',
    createdAt: '2021-10-15T00:00:00Z',
    deletedAt: null,
  },
];

const generateBulkAnimals = (
  startId: number,
  count: number,
  baseAnimal: Partial<Animal>,
): Animal[] => {
  const animals: Animal[] = [];
  const breeds = [AnimalBreed.ANGUS, AnimalBreed.NELORE, AnimalBreed.SRD];
  const sexes = [AnimalSex.MACHO, AnimalSex.FEMEA, AnimalSex.TOURO];
  const purposes = [AnimalPurpose.CORTE, AnimalPurpose.MATRIZ, AnimalPurpose.REPRODUTOR];
  const bloodDegrees = [
    BloodDegree.F1,
    BloodDegree.F2,
    BloodDegree.F3,
    BloodDegree.F4,
    BloodDegree.PC,
  ];

  const founderIds = [
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004',
  ];

  const parentIds = [
    '550e8400-e29b-41d4-a716-446655440007',
    '550e8400-e29b-41d4-a716-446655440008',
    '550e8400-e29b-41d4-a716-446655440009',
    '550e8400-e29b-41d4-a716-446655440010',
    '550e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440006',
  ];

  for (let i = 0; i < count; i++) {
    const currentId = startId + i;
    const breed = breeds[i % breeds.length];
    const sex = sexes[i % sexes.length];
    const purpose = purposes[i % purposes.length];
    const bloodDegree = bloodDegrees[i % bloodDegrees.length];

    let bloodPercentage = 0;
    switch (bloodDegree) {
      case BloodDegree.F1:
        bloodPercentage = 50;
        break;
      case BloodDegree.F2:
        bloodPercentage = 75;
        break;
      case BloodDegree.F3:
        bloodPercentage = 87.5;
        break;
      case BloodDegree.F4:
        bloodPercentage = 93.75;
        break;
      case BloodDegree.PC:
        bloodPercentage = 96.875;
        break;
      case BloodDegree.SRD:
        bloodPercentage = 0;
        break;
    }

    const birthYear = 2020 + (i % 5);
    const birthMonth = (i % 12) + 1;
    const birthDay = (i % 28) + 1;

    let fatherId: string | null = null;
    let motherId: string | null = null;

    if (breed === AnimalBreed.ANGUS) {
      fatherId = parentIds[0];
      motherId = parentIds[1];
    } else if (breed === AnimalBreed.NELORE) {
      fatherId = parentIds[2];
      motherId = parentIds[3];
    } else {
      if (i % 3 === 0) {
        fatherId = parentIds[4];
        motherId = parentIds[5];
      } else if (i % 3 === 1) {
        fatherId = parentIds[0];
        motherId = parentIds[3];
      } else {
        fatherId = parentIds[2];
        motherId = parentIds[1];
      }
    }

    const propertyIds = [
      '550e8400-e29b-41d4-a716-446655440001', // Fazenda do Juca
      '550e8400-e29b-41d4-a716-446655440002', // Fazenda Boa Vista
      '550e8400-e29b-41d4-a716-446655440003', // Sítio Esperança
      '550e8400-e29b-41d4-a716-446655440004', // Fazenda Santa Maria
      '550e8400-e29b-41d4-a716-446655440005', // Chácara do Sol
    ];

    animals.push({
      id: `550e8400-e29b-41d4-a716-44665544${currentId.toString().padStart(4, '0')}`,
      code: currentId.toString().padStart(3, '0'),
      registrationNumber: `${currentId}${currentId}${currentId}${currentId}${currentId}${currentId}`,
      breed,
      bloodDegree,
      bloodPercentage,
      sex,
      purpose,
      birthDate: `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}T00:00:00Z`,
      acquisitionDate: `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}T00:00:00Z`,
      fatherId,
      motherId,
      propertyId: propertyIds[i % propertyIds.length],
      createdAt: `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}T00:00:00Z`,
      deletedAt: null,
      ...baseAnimal,
    });
  }

  return animals;
};

const BULK_ANIMALS = generateBulkAnimals(39, 222, {});

const ANIMALS_FINAL: Animal[] = [
  ...FOUNDERS,
  ...F1_GENERATION,
  ...F2_GENERATION,
  ...F3_GENERATION,
  ...F4_GENERATION,
  ...PC_GENERATION,
  ...SRD_ANIMALS,
  ...ADDITIONAL_FOUNDERS,
  ...ADDITIONAL_F1,
  ...BULK_ANIMALS,
];

export { ANIMALS_FINAL };
export { ANIMALS_FINAL as ANIMALS };

export const ANIMAL_LOCATIONS: AnimalLocation[] = [
  ...ANIMALS_FINAL.slice(0, 15).map((animal) => ({
    id: `al-${animal.id}-001`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440177',
    createdAt: '2024-04-05T10:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(15, 33).map((animal) => ({
    id: `al-${animal.id}-002`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440185',
    createdAt: '2024-05-05T09:45:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(33, 38).map((animal) => ({
    id: `al-${animal.id}-003`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440187',
    createdAt: '2024-02-20T08:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(38, 45).map((animal) => ({
    id: `al-${animal.id}-004`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440190',
    createdAt: '2024-03-15T09:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(45, 65).map((animal) => ({
    id: `al-${animal.id}-005`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440196',
    createdAt: '2024-04-25T12:45:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(65, 90).map((animal) => ({
    id: `al-${animal.id}-006`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440201',
    createdAt: '2024-05-15T16:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(90, 105).map((animal) => ({
    id: `al-${animal.id}-007`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440206',
    createdAt: '2024-05-10T09:15:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(105, 117).map((animal) => ({
    id: `al-${animal.id}-008`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440208',
    createdAt: '2024-04-20T11:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(117, 135).map((animal) => ({
    id: `al-${animal.id}-009`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440212',
    createdAt: '2024-05-28T14:45:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(135, 145).map((animal) => ({
    id: `al-${animal.id}-010`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440215',
    createdAt: '2024-05-22T10:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(145, 153).map((animal) => ({
    id: `al-${animal.id}-011`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440217',
    createdAt: '2024-05-30T08:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(0, 12).map((animal) => ({
    id: `al-${animal.id}-exit-001`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440178',
    createdAt: '2024-04-20T15:15:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(20, 35).map((animal) => ({
    id: `al-${animal.id}-exit-002`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440194',
    createdAt: '2024-04-01T15:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(40, 48).map((animal) => ({
    id: `al-${animal.id}-exit-003`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440195',
    createdAt: '2024-04-15T13:45:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(50, 65).map((animal) => ({
    id: `al-${animal.id}-entry-001`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440173',
    createdAt: '2024-01-15T08:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(70, 82).map((animal) => ({
    id: `al-${animal.id}-entry-002`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440175',
    createdAt: '2024-01-20T09:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(85, 105).map((animal) => ({
    id: `al-${animal.id}-entry-003`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440179',
    createdAt: '2024-02-10T10:15:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(110, 125).map((animal) => ({
    id: `al-${animal.id}-entry-004`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440180',
    createdAt: '2024-02-15T11:45:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(130, 142).map((animal) => ({
    id: `al-${animal.id}-entry-005`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440183',
    createdAt: '2024-03-01T12:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(150, 175).map((animal) => ({
    id: `al-${animal.id}-entry-006`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440187',
    createdAt: '2024-02-20T08:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(180, 195).map((animal) => ({
    id: `al-${animal.id}-entry-007`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440190',
    createdAt: '2024-03-15T09:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(200, 218).map((animal) => ({
    id: `al-${animal.id}-entry-008`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440192',
    createdAt: '2024-03-20T14:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(220, 232).map((animal) => ({
    id: `al-${animal.id}-entry-009`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440193',
    createdAt: '2024-03-15T11:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(240, 270).map((animal) => ({
    id: `al-${animal.id}-entry-010`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440197',
    createdAt: '2024-05-20T16:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(275, 300).map((animal) => ({
    id: `al-${animal.id}-entry-011`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440198',
    createdAt: '2024-05-25T13:15:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(0, 8).map((animal) => ({
    id: `al-${animal.id}-exit-004`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440174',
    createdAt: '2024-01-18T15:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(8, 13).map((animal) => ({
    id: `al-${animal.id}-exit-005`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440176',
    createdAt: '2024-01-25T10:45:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(13, 23).map((animal) => ({
    id: `al-${animal.id}-exit-006`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440181',
    createdAt: '2024-02-12T14:20:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(23, 31).map((animal) => ({
    id: `al-${animal.id}-exit-007`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440182',
    createdAt: '2024-02-18T11:15:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(31, 46).map((animal) => ({
    id: `al-${animal.id}-exit-008`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440184',
    createdAt: '2024-03-05T16:45:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(46, 58).map((animal) => ({
    id: `al-${animal.id}-exit-009`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440186',
    createdAt: '2024-03-10T09:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(58, 70).map((animal) => ({
    id: `al-${animal.id}-exit-010`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440188',
    createdAt: '2024-02-25T13:00:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(70, 78).map((animal) => ({
    id: `al-${animal.id}-exit-011`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440189',
    createdAt: '2024-03-01T12:30:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(78, 86).map((animal) => ({
    id: `al-${animal.id}-exit-012`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440191',
    createdAt: '2024-03-18T15:15:00Z',
    deletedAt: null,
  })),

  ...ANIMALS_FINAL.slice(86, 106).map((animal) => ({
    id: `al-${animal.id}-exit-013`,
    animalId: animal.id,
    locationMovimentId: '550e8400-e29b-41d4-a716-446655440199',
    createdAt: '2024-05-30T17:00:00Z',
    deletedAt: null,
  })),
];
