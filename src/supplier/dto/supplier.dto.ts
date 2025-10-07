import { ApiProperty } from '@nestjs/swagger';

export class SupplierDto {
  @ApiProperty({
    description: 'ID único do fornecedor',
    example: 'sup-123'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do fornecedor',
    example: 'Ração Premium Ltda'
  })
  name: string;

  @ApiProperty({
    description: 'Email do fornecedor',
    example: 'vendas@racaopremium.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do fornecedor',
    example: '+55 11 66666-6666'
  })
  phone: string;

  @ApiProperty({
    description: 'CNPJ do fornecedor',
    example: '98.765.432/0001-10'
  })
  cnpj: string;

  @ApiProperty({
    description: 'Endereço do fornecedor',
    example: 'Av. Industrial, 789, São Paulo - SP'
  })
  address: string;

  @ApiProperty({
    description: 'Tipo de produto fornecido',
    example: 'Ração',
    enum: ['Ração', 'Medicamento', 'Equipamento', 'Sementes', 'Fertilizante', 'Outro']
  })
  productType: string;

  @ApiProperty({
    description: 'Categoria do fornecedor',
    example: 'Alimentação',
    enum: ['Alimentação', 'Saúde', 'Equipamentos', 'Agricultura', 'Outro']
  })
  category: string;

  @ApiProperty({
    description: 'Status do fornecedor',
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
    description: 'Observações sobre o fornecedor',
    example: 'Fornecedor confiável com produtos de qualidade',
    required: false
  })
  notes?: string;
}

export class CreateSupplierDto {
  @ApiProperty({
    description: 'Nome do fornecedor',
    example: 'Ração Premium Ltda'
  })
  name: string;

  @ApiProperty({
    description: 'Email do fornecedor',
    example: 'vendas@racaopremium.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do fornecedor',
    example: '+55 11 66666-6666'
  })
  phone: string;

  @ApiProperty({
    description: 'CNPJ do fornecedor',
    example: '98.765.432/0001-10'
  })
  cnpj: string;

  @ApiProperty({
    description: 'Endereço do fornecedor',
    example: 'Av. Industrial, 789, São Paulo - SP'
  })
  address: string;

  @ApiProperty({
    description: 'Tipo de produto fornecido',
    example: 'Ração',
    enum: ['Ração', 'Medicamento', 'Equipamento', 'Sementes', 'Fertilizante', 'Outro']
  })
  productType: string;

  @ApiProperty({
    description: 'Categoria do fornecedor',
    example: 'Alimentação',
    enum: ['Alimentação', 'Saúde', 'Equipamentos', 'Agricultura', 'Outro']
  })
  category: string;

  @ApiProperty({
    description: 'Observações sobre o fornecedor',
    example: 'Fornecedor confiável com produtos de qualidade',
    required: false
  })
  notes?: string;
}

export class UpdateSupplierDto {
  @ApiProperty({
    description: 'Nome do fornecedor',
    example: 'Ração Premium Ltda',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Email do fornecedor',
    example: 'vendas@racaopremium.com',
    required: false
  })
  email?: string;

  @ApiProperty({
    description: 'Telefone do fornecedor',
    example: '+55 11 66666-6666',
    required: false
  })
  phone?: string;

  @ApiProperty({
    description: 'CNPJ do fornecedor',
    example: '98.765.432/0001-10',
    required: false
  })
  cnpj?: string;

  @ApiProperty({
    description: 'Endereço do fornecedor',
    example: 'Av. Industrial, 789, São Paulo - SP',
    required: false
  })
  address?: string;

  @ApiProperty({
    description: 'Tipo de produto fornecido',
    example: 'Ração',
    enum: ['Ração', 'Medicamento', 'Equipamento', 'Sementes', 'Fertilizante', 'Outro'],
    required: false
  })
  productType?: string;

  @ApiProperty({
    description: 'Categoria do fornecedor',
    example: 'Alimentação',
    enum: ['Alimentação', 'Saúde', 'Equipamentos', 'Agricultura', 'Outro'],
    required: false
  })
  category?: string;

  @ApiProperty({
    description: 'Status do fornecedor',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Suspenso'],
    required: false
  })
  status?: string;

  @ApiProperty({
    description: 'Observações sobre o fornecedor',
    example: 'Fornecedor confiável com produtos de qualidade',
    required: false
  })
  notes?: string;
}
