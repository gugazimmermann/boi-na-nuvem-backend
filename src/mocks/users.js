// Mock data for users
const users = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    password: '$2a$10$TR75LAVfgNY9muuvMZFIu.DT16sZcZVWFXYIilY3rW7LTdNcpD6W.', // plain: password123
    name: 'John Smith',
    email: 'admin@boinanuvem.com.br',
    phone: '+55 11 99999-1234',
    document: '123.456.789-00',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '01234-567',
    createdAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    password: '$2a$10$VJN0MN2wfI4sKR1MIXAw2eXhb0IxO2VQ.GgE/OPCL7sIL.333Jloq', // plain: maria456
    name: 'Maria Garcia',
    email: 'fazendeiro@boinanuvem.com.br',
    phone: '+55 21 98888-5678',
    document: '987.654.321-00',
    street: 'Avenida Paulista',
    number: '456',
    complement: 'Sala 12',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '01310-100',
    createdAt: new Date('2024-01-20T14:15:00Z')
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    password: '$2a$10$uiqQS1EL6ZMMMD0pI5dyYOWxJv875IekBO08GgXpzvOIcQfEcPSNG', // plain: carlos789
    name: 'Carlos Rodriguez',
    email: 'gerente@boinanuvem.com.br',
    phone: '+55 31 97777-9012',
    document: '456.789.123-00',
    street: 'Rua da Liberdade',
    number: '789',
    complement: '',
    neighborhood: 'Liberdade',
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'Brasil',
    zipCode: '30112-000',
    createdAt: new Date('2024-02-01T09:45:00Z')
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    password: '$2a$10$qy5Glt2oCeCjS6JPDAr8w.mYV3Qn1G78CyNWd53n9X8lrVcAU5Hz6', // plain: ana2024
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '+55 51 96666-3456',
    document: '789.123.456-00',
    street: 'Rua dos Andradas',
    number: '321',
    complement: 'Casa 2',
    neighborhood: 'Centro Histórico',
    city: 'Porto Alegre',
    state: 'RS',
    country: 'Brasil',
    zipCode: '90020-000',
    createdAt: new Date('2024-02-10T16:20:00Z')
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    password: '$2a$10$GdHyFCfZN.MKqdGkRJVfseKRtkS9RMnnDacTkEvxtXNVoUdU8su0.', // plain: roberto123
    name: 'Roberto Santos',
    email: 'roberto.santos@email.com',
    phone: '+55 85 95555-7890',
    document: '321.654.987-00',
    street: 'Avenida Beira Mar',
    number: '654',
    complement: 'Torre A',
    neighborhood: 'Meireles',
    city: 'Fortaleza',
    state: 'CE',
    country: 'Brasil',
    zipCode: '60165-121',
    createdAt: new Date('2024-02-15T11:30:00Z')
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    password: '$2a$10$apaV.zTpzLEA1RDWJn6x1.9CpP3EzT5aE8k52h99YxGEUuFb8rF6.', // plain: fernanda456
    name: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    phone: '+55 71 94444-1234',
    document: '654.321.789-00',
    street: 'Rua Chile',
    number: '987',
    complement: 'Loja 5',
    neighborhood: 'Pelourinho',
    city: 'Salvador',
    state: 'BA',
    country: 'Brasil',
    zipCode: '40026-010',
    createdAt: new Date('2024-02-20T13:45:00Z')
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    password: '$2a$10$WNZVLo0v/I47n3hgNt4Sxumf4aQsjEk7v8WbMfgl9yLWGvGxAIho2', // plain: lucas789
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@email.com',
    phone: '+55 62 93333-5678',
    document: '987.123.654-00',
    street: 'Avenida Goiás',
    number: '147',
    complement: 'Bloco B',
    neighborhood: 'Setor Central',
    city: 'Goiânia',
    state: 'GO',
    country: 'Brasil',
    zipCode: '74015-180',
    createdAt: new Date('2024-03-01T08:15:00Z')
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    password: '$2a$10$l69OQC8w5SdjlJcxEJBi3enLJdGwG5n1v6gb050JaoK8nh370DWxS', // plain: juliana2024
    name: 'Juliana Pereira',
    email: 'juliana.pereira@email.com',
    phone: '+55 81 92222-9012',
    document: '147.258.369-00',
    street: 'Rua da Aurora',
    number: '258',
    complement: 'Sobrado',
    neighborhood: 'Santo Amaro',
    city: 'Recife',
    state: 'PE',
    country: 'Brasil',
    zipCode: '50040-090',
    createdAt: new Date('2024-03-05T15:30:00Z')
  }
];

module.exports = users;
