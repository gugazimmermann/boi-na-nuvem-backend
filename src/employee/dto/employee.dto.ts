import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
  @ApiProperty({
    description: 'ID único do funcionário',
    example: 'emp-123'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Maria Santos'
  })
  name: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'maria.santos@fazenda.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do funcionário',
    example: '+55 11 88888-8888'
  })
  phone: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    example: '987.654.321-00'
  })
  cpf: string;

  @ApiProperty({
    description: 'Cargo do funcionário',
    example: 'Vaqueiro'
  })
  position: string;

  @ApiProperty({
    description: 'Salário do funcionário',
    example: 2500.00
  })
  salary: number;

  @ApiProperty({
    description: 'Data de contratação',
    example: '2023-06-01'
  })
  hireDate: string;

  @ApiProperty({
    description: 'ID da propriedade onde trabalha',
    example: 'prop-123'
  })
  propertyId: string;

  @ApiProperty({
    description: 'Status do funcionário',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Férias', 'Afastado']
  })
  status: string;

  @ApiProperty({
    description: 'Observações sobre o funcionário',
    example: 'Funcionário experiente com 5 anos de trabalho',
    required: false
  })
  notes?: string;
}

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Maria Santos'
  })
  name: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'maria.santos@fazenda.com'
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do funcionário',
    example: '+55 11 88888-8888'
  })
  phone: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    example: '987.654.321-00'
  })
  cpf: string;

  @ApiProperty({
    description: 'Cargo do funcionário',
    example: 'Vaqueiro'
  })
  position: string;

  @ApiProperty({
    description: 'Salário do funcionário',
    example: 2500.00
  })
  salary: number;

  @ApiProperty({
    description: 'Data de contratação',
    example: '2023-06-01'
  })
  hireDate: string;

  @ApiProperty({
    description: 'ID da propriedade onde trabalha',
    example: 'prop-123'
  })
  propertyId: string;

  @ApiProperty({
    description: 'Observações sobre o funcionário',
    example: 'Funcionário experiente com 5 anos de trabalho',
    required: false
  })
  notes?: string;
}

export class UpdateEmployeeDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Maria Santos',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'maria.santos@fazenda.com',
    required: false
  })
  email?: string;

  @ApiProperty({
    description: 'Telefone do funcionário',
    example: '+55 11 88888-8888',
    required: false
  })
  phone?: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    example: '987.654.321-00',
    required: false
  })
  cpf?: string;

  @ApiProperty({
    description: 'Cargo do funcionário',
    example: 'Vaqueiro',
    required: false
  })
  position?: string;

  @ApiProperty({
    description: 'Salário do funcionário',
    example: 2500.00,
    required: false
  })
  salary?: number;

  @ApiProperty({
    description: 'Data de contratação',
    example: '2023-06-01',
    required: false
  })
  hireDate?: string;

  @ApiProperty({
    description: 'ID da propriedade onde trabalha',
    example: 'prop-123',
    required: false
  })
  propertyId?: string;

  @ApiProperty({
    description: 'Status do funcionário',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Férias', 'Afastado'],
    required: false
  })
  status?: string;

  @ApiProperty({
    description: 'Observações sobre o funcionário',
    example: 'Funcionário experiente com 5 anos de trabalho',
    required: false
  })
  notes?: string;
}
