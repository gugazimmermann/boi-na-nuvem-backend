import { ApiProperty } from '@nestjs/swagger';

export class PlanDto {
  @ApiProperty({
    description: 'ID único do plano',
    example: 'a3a3f8e3-5f8d-4b1c-9a2b-1a2b3c4d5e6f'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do plano',
    example: 'Intro'
  })
  name: string;

  @ApiProperty({
    description: 'Preço mensal do plano',
    example: 24.99
  })
  price: number;

  @ApiProperty({
    description: 'Preço anual do plano',
    example: 239.90
  })
  annualPrice: number;

  @ApiProperty({
    description: 'Descrição do plano',
    example: 'Para pequenas propriedades que querem começar a otimizar o gerenciamento rural.'
  })
  description: string;

  @ApiProperty({
    description: 'Lista de funcionalidades do plano',
    example: ['1 propriedade', 'Até 5 localizações', 'Até 50 animais']
  })
  features: string[];

  @ApiProperty({
    description: 'Indica se o plano é popular',
    example: false,
    required: false
  })
  isPopular?: boolean;
}

export class PlansResponseDto {
  @ApiProperty({
    description: 'Indica se a operação foi bem-sucedida',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Lista de planos',
    type: [PlanDto]
  })
  data: PlanDto[];

  @ApiProperty({
    description: 'Quantidade total de planos',
    example: 4
  })
  count: number;
}
