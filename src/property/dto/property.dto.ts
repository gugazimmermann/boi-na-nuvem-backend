import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, Min, Max, Length, Matches, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { PropertyStatus, PropertyPhase } from '../../mocks/properties';

export class PropertyDto {
  @ApiProperty({
    description: 'ID único da propriedade',
    example: 'prop-123'
  })
  id: string;

  @ApiProperty({
    description: 'Nome da propriedade',
    example: 'Fazenda São José'
  })
  name: string;

  @ApiProperty({
    description: 'Área total da propriedade em hectares',
    example: 100.5
  })
  totalArea: number;

  @ApiProperty({
    description: 'Endereço da propriedade',
    example: 'Rodovia BR-163, Km 45, Zona Rural'
  })
  address: string;

  @ApiProperty({
    description: 'Cidade da propriedade',
    example: 'Ribeirão Preto'
  })
  city: string;

  @ApiProperty({
    description: 'Estado da propriedade',
    example: 'São Paulo'
  })
  state: string;

  @ApiProperty({
    description: 'CEP da propriedade',
    example: '14000-000'
  })
  zipCode: string;

  @ApiProperty({
    description: 'Coordenadas GPS (latitude)',
    example: -21.1775
  })
  latitude: number;

  @ApiProperty({
    description: 'Coordenadas GPS (longitude)',
    example: -47.8103
  })
  longitude: number;

  @ApiProperty({
    description: 'Tipo de propriedade',
    example: 'Fazenda',
    enum: ['Fazenda', 'Sítio', 'Chácara', 'Haras', 'Outro']
  })
  type: string;

  @ApiProperty({
    description: 'Atividade principal da propriedade',
    example: 'Pecuária de Corte',
    enum: ['Pecuária de Corte', 'Pecuária Leiteira', 'Agricultura', 'Misto', 'Outro']
  })
  mainActivity: string;

  @ApiProperty({
    description: 'Status da propriedade',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Vendido', 'Alugado']
  })
  status: string;

  @ApiProperty({
    description: 'Fases da propriedade',
    example: ['cria', 'recria', 'engorda'],
    enum: ['cria', 'recria', 'engorda', 'ciclo_completo'],
    isArray: true
  })
  phases: PropertyPhase[];

  @ApiProperty({
    description: 'Data de aquisição',
    example: '2020-03-15'
  })
  acquisitionDate: string;

  @ApiProperty({
    description: 'Observações sobre a propriedade',
    example: 'Propriedade com boa infraestrutura e acesso facilitado',
    required: false
  })
  description?: string;
}

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Código único da propriedade',
    example: 'FAZ-001'
  })
  @IsString({ message: 'Código deve ser uma string' })
  @Length(2, 20, { message: 'Código deve ter entre 2 e 20 caracteres' })
  @Transform(({ value }) => value?.trim())
  code: string;

  @ApiProperty({
    description: 'Nome da propriedade',
    example: 'Fazenda São José'
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  name: string;


  @ApiProperty({
    description: 'Rua da propriedade',
    example: 'Rodovia BR-163'
  })
  @IsString({ message: 'Rua deve ser uma string' })
  @Length(2, 200, { message: 'Rua deve ter entre 2 e 200 caracteres' })
  @Transform(({ value }) => value?.trim())
  street: string;

  @ApiProperty({
    description: 'Número da propriedade',
    example: 'Km 45',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Número deve ser uma string' })
  @Length(1, 20, { message: 'Número deve ter entre 1 e 20 caracteres' })
  @Transform(({ value }) => value?.trim())
  number?: string;

  @ApiProperty({
    description: 'Bairro da propriedade',
    example: 'Zona Rural',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Bairro deve ser uma string' })
  @Length(2, 100, { message: 'Bairro deve ter entre 2 e 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  neighborhood?: string;

  @ApiProperty({
    description: 'Cidade da propriedade',
    example: 'Ribeirão Preto'
  })
  @IsString({ message: 'Cidade deve ser uma string' })
  @Length(2, 50, { message: 'Cidade deve ter entre 2 e 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  city: string;

  @ApiProperty({
    description: 'Estado da propriedade',
    example: 'São Paulo'
  })
  @IsString({ message: 'Estado deve ser uma string' })
  @Length(2, 50, { message: 'Estado deve ter entre 2 e 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  state: string;

  @ApiProperty({
    description: 'País da propriedade',
    example: 'Brasil',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'País deve ser uma string' })
  @Length(2, 50, { message: 'País deve ter entre 2 e 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  country?: string;

  @ApiProperty({
    description: 'CEP da propriedade',
    example: '14000-000'
  })
  @IsString({ message: 'CEP deve ser uma string' })
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP deve estar no formato 00000-000' })
  @Transform(({ value }) => value?.trim())
  zipCode: string;

  @ApiProperty({
    description: 'Coordenadas GPS (latitude)',
    example: -21.1775
  })
  @IsNumber({}, { message: 'Latitude deve ser um número' })
  @Min(-90, { message: 'Latitude deve estar entre -90 e 90' })
  @Max(90, { message: 'Latitude deve estar entre -90 e 90' })
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @ApiProperty({
    description: 'Coordenadas GPS (longitude)',
    example: -47.8103
  })
  @IsNumber({}, { message: 'Longitude deve ser um número' })
  @Min(-180, { message: 'Longitude deve estar entre -180 e 180' })
  @Max(180, { message: 'Longitude deve estar entre -180 e 180' })
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @ApiProperty({
    description: 'Status da propriedade',
    example: 'active',
    enum: PropertyStatus
  })
  @IsEnum(PropertyStatus, { 
    message: 'Status deve ser "active" ou "inactive"' 
  })
  status: PropertyStatus;

  @ApiProperty({
    description: 'Fases da propriedade',
    example: ['cria', 'recria', 'engorda'],
    enum: PropertyPhase,
    isArray: true
  })
  @IsArray({ message: 'Fases deve ser um array' })
  @IsEnum(PropertyPhase, { 
    each: true,
    message: 'Cada fase deve ser "cria", "recria", "engorda" ou "ciclo_completo"' 
  })
  phases: PropertyPhase[];

  @ApiProperty({
    description: 'Observações sobre a propriedade',
    example: 'Propriedade com boa infraestrutura e acesso facilitado',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  @Length(0, 500, { message: 'Observações devem ter no máximo 500 caracteres' })
  @Transform(({ value }) => value?.trim())
  description?: string;
}

export class UpdatePropertyDto {
  @ApiProperty({
    description: 'Nome da propriedade',
    example: 'Fazenda São José',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  name?: string;

  @ApiProperty({
    description: 'Área total da propriedade em hectares',
    example: 100.5,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'Área total deve ser um número' })
  @Min(0.1, { message: 'Área total deve ser maior que 0' })
  @Max(100000, { message: 'Área total deve ser menor que 100.000 hectares' })
  @Transform(({ value }) => parseFloat(value))
  totalArea?: number;

  @ApiProperty({
    description: 'Endereço da propriedade',
    example: 'Rodovia BR-163, Km 45, Zona Rural',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Endereço deve ser uma string' })
  @Length(5, 200, { message: 'Endereço deve ter entre 5 e 200 caracteres' })
  @Transform(({ value }) => value?.trim())
  address?: string;

  @ApiProperty({
    description: 'Cidade da propriedade',
    example: 'Ribeirão Preto',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Cidade deve ser uma string' })
  @Length(2, 50, { message: 'Cidade deve ter entre 2 e 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  city?: string;

  @ApiProperty({
    description: 'Estado da propriedade',
    example: 'São Paulo',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Estado deve ser uma string' })
  @Length(2, 50, { message: 'Estado deve ter entre 2 e 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  state?: string;

  @ApiProperty({
    description: 'CEP da propriedade',
    example: '14000-000',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP deve estar no formato 00000-000' })
  @Transform(({ value }) => value?.trim())
  zipCode?: string;

  @ApiProperty({
    description: 'Coordenadas GPS (latitude)',
    example: -21.1775,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'Latitude deve ser um número' })
  @Min(-90, { message: 'Latitude deve estar entre -90 e 90' })
  @Max(90, { message: 'Latitude deve estar entre -90 e 90' })
  @Transform(({ value }) => parseFloat(value))
  latitude?: number;

  @ApiProperty({
    description: 'Coordenadas GPS (longitude)',
    example: -47.8103,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'Longitude deve ser um número' })
  @Min(-180, { message: 'Longitude deve estar entre -180 e 180' })
  @Max(180, { message: 'Longitude deve estar entre -180 e 180' })
  @Transform(({ value }) => parseFloat(value))
  longitude?: number;

  @ApiProperty({
    description: 'Tipo de propriedade',
    example: 'Fazenda',
    enum: ['Fazenda', 'Sítio', 'Chácara', 'Haras', 'Outro'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Fazenda', 'Sítio', 'Chácara', 'Haras', 'Outro'], { 
    message: 'Tipo deve ser "Fazenda", "Sítio", "Chácara", "Haras" ou "Outro"' 
  })
  type?: string;

  @ApiProperty({
    description: 'Atividade principal da propriedade',
    example: 'Pecuária de Corte',
    enum: ['Pecuária de Corte', 'Pecuária Leiteira', 'Agricultura', 'Misto', 'Outro'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Pecuária de Corte', 'Pecuária Leiteira', 'Agricultura', 'Misto', 'Outro'], { 
    message: 'Atividade principal deve ser "Pecuária de Corte", "Pecuária Leiteira", "Agricultura", "Misto" ou "Outro"' 
  })
  mainActivity?: string;

  @ApiProperty({
    description: 'Status da propriedade',
    example: 'Ativo',
    enum: ['Ativo', 'Inativo', 'Vendido', 'Alugado'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Ativo', 'Inativo', 'Vendido', 'Alugado'], { 
    message: 'Status deve ser "Ativo", "Inativo", "Vendido" ou "Alugado"' 
  })
  status?: string;

  @ApiProperty({
    description: 'Fases da propriedade',
    example: ['cria', 'recria', 'engorda'],
    enum: PropertyPhase,
    isArray: true,
    required: false
  })
  @IsOptional()
  @IsArray({ message: 'Fases deve ser um array' })
  @IsEnum(PropertyPhase, { 
    each: true,
    message: 'Cada fase deve ser "cria", "recria", "engorda" ou "ciclo_completo"' 
  })
  phases?: PropertyPhase[];

  @ApiProperty({
    description: 'Data de aquisição',
    example: '2020-03-15',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de aquisição deve estar no formato ISO 8601' })
  acquisitionDate?: string;

  @ApiProperty({
    description: 'Observações sobre a propriedade',
    example: 'Propriedade com boa infraestrutura e acesso facilitado',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  @Length(0, 500, { message: 'Observações devem ter no máximo 500 caracteres' })
  @Transform(({ value }) => value?.trim())
  description?: string;
}
