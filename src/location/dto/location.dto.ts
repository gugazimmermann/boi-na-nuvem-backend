import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({
    description: 'ID único da localização',
    example: 'loc-123'
  })
  id: string;

  @ApiProperty({
    description: 'Nome da localização',
    example: 'Pasto Norte'
  })
  name: string;

  @ApiProperty({
    description: 'Tipo da localização',
    example: 'Pasto',
    enum: ['Pasto', 'Curral', 'Estábulo', 'Galpão', 'Silo', 'Outro']
  })
  type: string;

  @ApiProperty({
    description: 'Área da localização em hectares',
    example: 5.5
  })
  area: number;

  @ApiProperty({
    description: 'Capacidade máxima de animais',
    example: 50
  })
  capacity: number;

  @ApiProperty({
    description: 'ID da propriedade',
    example: 'prop-123'
  })
  propertyId: string;

  @ApiProperty({
    description: 'Coordenadas GPS (latitude)',
    example: -23.5505
  })
  latitude: number;

  @ApiProperty({
    description: 'Coordenadas GPS (longitude)',
    example: -46.6333
  })
  longitude: number;

  @ApiProperty({
    description: 'Descrição da localização',
    example: 'Pasto com grama de boa qualidade, próximo ao rio',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'Status da localização',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Manutenção']
  })
  status: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T10:30:00Z'
  })
  createdAt: string;
}

export class CreateLocationDto {
  @ApiProperty({
    description: 'Nome da localização',
    example: 'Pasto Norte'
  })
  name: string;

  @ApiProperty({
    description: 'Tipo da localização',
    example: 'Pasto',
    enum: ['Pasto', 'Curral', 'Estábulo', 'Galpão', 'Silo', 'Outro']
  })
  type: string;

  @ApiProperty({
    description: 'Área da localização em hectares',
    example: 5.5
  })
  area: number;

  @ApiProperty({
    description: 'Capacidade máxima de animais',
    example: 50
  })
  capacity: number;

  @ApiProperty({
    description: 'ID da propriedade',
    example: 'prop-123'
  })
  propertyId: string;

  @ApiProperty({
    description: 'Coordenadas GPS (latitude)',
    example: -23.5505
  })
  latitude: number;

  @ApiProperty({
    description: 'Coordenadas GPS (longitude)',
    example: -46.6333
  })
  longitude: number;

  @ApiProperty({
    description: 'Descrição da localização',
    example: 'Pasto com grama de boa qualidade, próximo ao rio',
    required: false
  })
  description?: string;
}

export class UpdateLocationDto {
  @ApiProperty({
    description: 'Nome da localização',
    example: 'Pasto Norte',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Tipo da localização',
    example: 'Pasto',
    enum: ['Pasto', 'Curral', 'Estábulo', 'Galpão', 'Silo', 'Outro'],
    required: false
  })
  type?: string;

  @ApiProperty({
    description: 'Área da localização em hectares',
    example: 5.5,
    required: false
  })
  area?: number;

  @ApiProperty({
    description: 'Capacidade máxima de animais',
    example: 50,
    required: false
  })
  capacity?: number;

  @ApiProperty({
    description: 'ID da propriedade',
    example: 'prop-123',
    required: false
  })
  propertyId?: string;

  @ApiProperty({
    description: 'Coordenadas GPS (latitude)',
    example: -23.5505,
    required: false
  })
  latitude?: number;

  @ApiProperty({
    description: 'Coordenadas GPS (longitude)',
    example: -46.6333,
    required: false
  })
  longitude?: number;

  @ApiProperty({
    description: 'Descrição da localização',
    example: 'Pasto com grama de boa qualidade, próximo ao rio',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'Status da localização',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Manutenção'],
    required: false
  })
  status?: string;
}
