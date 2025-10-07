import { ApiProperty } from '@nestjs/swagger';

export class ServiceProviderDto {
  @ApiProperty({
    description: 'ID único do prestador de serviço',
    example: 'sp-123'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do prestador de serviço',
    example: 'Veterinária Dr. João'
  })
  name: string;

  @ApiProperty({
    description: 'Email do prestador de serviço',
    example: 'contato@veterinariadrjoao.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do prestador de serviço',
    example: '+55 11 77777-7777'
  })
  phone: string;

  @ApiProperty({
    description: 'CPF/CNPJ do prestador de serviço',
    example: '12.345.678/0001-90'
  })
  document: string;

  @ApiProperty({
    description: 'Endereço do prestador de serviço',
    example: 'Rua dos Veterinários, 456, São Paulo - SP'
  })
  address: string;

  @ApiProperty({
    description: 'Tipo de serviço oferecido',
    example: 'Veterinário',
    enum: ['Veterinário', 'Inseminação', 'Transporte', 'Alimentação', 'Medicamento', 'Outro']
  })
  serviceType: string;

  @ApiProperty({
    description: 'Especialidade do prestador',
    example: 'Clínica Geral',
    required: false
  })
  specialty?: string;

  @ApiProperty({
    description: 'Tipo de pessoa',
    example: 'Pessoa Jurídica',
    enum: ['Pessoa Física', 'Pessoa Jurídica']
  })
  type: string;

  @ApiProperty({
    description: 'Status do prestador',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Suspenso']
  })
  status: string;

  @ApiProperty({
    description: 'Data de cadastro',
    example: '2024-01-15T10:30:00Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Observações sobre o prestador',
    example: 'Prestador confiável com 10 anos de experiência',
    required: false
  })
  notes?: string;
}

export class CreateServiceProviderDto {
  @ApiProperty({
    description: 'Nome do prestador de serviço',
    example: 'Veterinária Dr. João'
  })
  name: string;

  @ApiProperty({
    description: 'Email do prestador de serviço',
    example: 'contato@veterinariadrjoao.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do prestador de serviço',
    example: '+55 11 77777-7777'
  })
  phone: string;

  @ApiProperty({
    description: 'CPF/CNPJ do prestador de serviço',
    example: '12.345.678/0001-90'
  })
  document: string;

  @ApiProperty({
    description: 'Endereço do prestador de serviço',
    example: 'Rua dos Veterinários, 456, São Paulo - SP'
  })
  address: string;

  @ApiProperty({
    description: 'Tipo de serviço oferecido',
    example: 'Veterinário',
    enum: ['Veterinário', 'Inseminação', 'Transporte', 'Alimentação', 'Medicamento', 'Outro']
  })
  serviceType: string;

  @ApiProperty({
    description: 'Especialidade do prestador',
    example: 'Clínica Geral',
    required: false
  })
  specialty?: string;

  @ApiProperty({
    description: 'Tipo de pessoa',
    example: 'Pessoa Jurídica',
    enum: ['Pessoa Física', 'Pessoa Jurídica']
  })
  type: string;

  @ApiProperty({
    description: 'Observações sobre o prestador',
    example: 'Prestador confiável com 10 anos de experiência',
    required: false
  })
  notes?: string;
}

export class UpdateServiceProviderDto {
  @ApiProperty({
    description: 'Nome do prestador de serviço',
    example: 'Veterinária Dr. João',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Email do prestador de serviço',
    example: 'contato@veterinariadrjoao.com',
    required: false
  })
  email?: string;

  @ApiProperty({
    description: 'Telefone do prestador de serviço',
    example: '+55 11 77777-7777',
    required: false
  })
  phone?: string;

  @ApiProperty({
    description: 'CPF/CNPJ do prestador de serviço',
    example: '12.345.678/0001-90',
    required: false
  })
  document?: string;

  @ApiProperty({
    description: 'Endereço do prestador de serviço',
    example: 'Rua dos Veterinários, 456, São Paulo - SP',
    required: false
  })
  address?: string;

  @ApiProperty({
    description: 'Tipo de serviço oferecido',
    example: 'Veterinário',
    enum: ['Veterinário', 'Inseminação', 'Transporte', 'Alimentação', 'Medicamento', 'Outro'],
    required: false
  })
  serviceType?: string;

  @ApiProperty({
    description: 'Especialidade do prestador',
    example: 'Clínica Geral',
    required: false
  })
  specialty?: string;

  @ApiProperty({
    description: 'Tipo de pessoa',
    example: 'Pessoa Jurídica',
    enum: ['Pessoa Física', 'Pessoa Jurídica'],
    required: false
  })
  type?: string;

  @ApiProperty({
    description: 'Status do prestador',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Suspenso'],
    required: false
  })
  status?: string;

  @ApiProperty({
    description: 'Observações sobre o prestador',
    example: 'Prestador confiável com 10 anos de experiência',
    required: false
  })
  notes?: string;
}
