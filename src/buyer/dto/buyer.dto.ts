import { ApiProperty } from '@nestjs/swagger';

export class BuyerDto {
  @ApiProperty({
    description: 'ID único do comprador',
    example: 'buyer-123'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do comprador',
    example: 'João Silva'
  })
  name: string;

  @ApiProperty({
    description: 'Email do comprador',
    example: 'joao.silva@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do comprador',
    example: '+55 11 99999-9999'
  })
  phone: string;

  @ApiProperty({
    description: 'CPF/CNPJ do comprador',
    example: '123.456.789-00'
  })
  document: string;

  @ApiProperty({
    description: 'Endereço do comprador',
    example: 'Rua das Flores, 123, São Paulo - SP'
  })
  address: string;

  @ApiProperty({
    description: 'Tipo de comprador',
    example: 'Pessoa Física',
    enum: ['Pessoa Física', 'Pessoa Jurídica']
  })
  type: string;

  @ApiProperty({
    description: 'Data de cadastro',
    example: '2024-01-15T10:30:00Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Status do comprador',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Suspenso']
  })
  status: string;
}

export class CreateBuyerDto {
  @ApiProperty({
    description: 'Nome do comprador',
    example: 'João Silva'
  })
  name: string;

  @ApiProperty({
    description: 'Email do comprador',
    example: 'joao.silva@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do comprador',
    example: '+55 11 99999-9999'
  })
  phone: string;

  @ApiProperty({
    description: 'CPF/CNPJ do comprador',
    example: '123.456.789-00'
  })
  document: string;

  @ApiProperty({
    description: 'Endereço do comprador',
    example: 'Rua das Flores, 123, São Paulo - SP'
  })
  address: string;

  @ApiProperty({
    description: 'Tipo de comprador',
    example: 'Pessoa Física',
    enum: ['Pessoa Física', 'Pessoa Jurídica']
  })
  type: string;
}

export class UpdateBuyerDto {
  @ApiProperty({
    description: 'Nome do comprador',
    example: 'João Silva',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Email do comprador',
    example: 'joao.silva@email.com',
    required: false
  })
  email?: string;

  @ApiProperty({
    description: 'Telefone do comprador',
    example: '+55 11 99999-9999',
    required: false
  })
  phone?: string;

  @ApiProperty({
    description: 'CPF/CNPJ do comprador',
    example: '123.456.789-00',
    required: false
  })
  document?: string;

  @ApiProperty({
    description: 'Endereço do comprador',
    example: 'Rua das Flores, 123, São Paulo - SP',
    required: false
  })
  address?: string;

  @ApiProperty({
    description: 'Tipo de comprador',
    example: 'Pessoa Física',
    enum: ['Pessoa Física', 'Pessoa Jurídica'],
    required: false
  })
  type?: string;

  @ApiProperty({
    description: 'Status do comprador',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Suspenso'],
    required: false
  })
  status?: string;
}
