import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsUUID, IsDateString, Min, Max, IsArray, ArrayNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class AnimalDto {
  @ApiProperty({
    description: 'ID único do animal',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do animal',
    example: 'Boi Nelore #001'
  })
  name: string;

  @ApiProperty({
    description: 'Espécie do animal',
    example: 'Bovino'
  })
  species: string;

  @ApiProperty({
    description: 'Raça do animal',
    example: 'Nelore'
  })
  breed: string;

  @ApiProperty({
    description: 'Data de nascimento do animal',
    example: '2020-05-15'
  })
  birthDate: string;

  @ApiProperty({
    description: 'Peso do animal em kg',
    example: 450.5
  })
  weight: number;

  @ApiProperty({
    description: 'Sexo do animal',
    example: 'Macho',
    enum: ['Macho', 'Fêmea']
  })
  gender: string;

  @ApiProperty({
    description: 'ID da propriedade onde o animal está',
    example: 'prop-123'
  })
  propertyId: string;

  @ApiProperty({
    description: 'ID da localização específica na propriedade',
    example: 'loc-456'
  })
  locationId: string;

  @ApiProperty({
    description: 'Status de saúde do animal',
    example: 'Saudável',
    enum: ['Saudável', 'Doente', 'Em tratamento', 'Recuperando']
  })
  healthStatus: string;

  @ApiProperty({
    description: 'Observações sobre o animal',
    example: 'Animal em bom estado, vacinado recentemente',
    required: false
  })
  notes?: string;
}

export class CreateAnimalDto {
  @ApiProperty({
    description: 'Nome do animal',
    example: 'Boi Nelore #001'
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({
    description: 'Espécie do animal',
    example: 'Bovino'
  })
  @IsString({ message: 'Espécie deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  species: string;

  @ApiProperty({
    description: 'Raça do animal',
    example: 'Nelore'
  })
  @IsString({ message: 'Raça deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  breed: string;

  @ApiProperty({
    description: 'Data de nascimento do animal',
    example: '2020-05-15'
  })
  @IsDateString({}, { message: 'Data de nascimento deve estar no formato ISO 8601' })
  birthDate: string;

  @ApiProperty({
    description: 'Peso do animal em kg',
    example: 450.5
  })
  @IsNumber({}, { message: 'Peso deve ser um número' })
  @Min(0, { message: 'Peso deve ser maior ou igual a 0' })
  @Max(2000, { message: 'Peso deve ser menor ou igual a 2000 kg' })
  @Transform(({ value }) => parseFloat(value))
  weight: number;

  @ApiProperty({
    description: 'Sexo do animal',
    example: 'Macho',
    enum: ['Macho', 'Fêmea']
  })
  @IsEnum(['Macho', 'Fêmea'], { message: 'Sexo deve ser "Macho" ou "Fêmea"' })
  gender: string;

  @ApiProperty({
    description: 'ID da propriedade onde o animal está',
    example: 'prop-123'
  })
  @IsString({ message: 'ID da propriedade deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  propertyId: string;

  @ApiProperty({
    description: 'ID da localização específica na propriedade',
    example: 'loc-456'
  })
  @IsString({ message: 'ID da localização deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  locationId: string;

  @ApiProperty({
    description: 'Status de saúde do animal',
    example: 'Saudável',
    enum: ['Saudável', 'Doente', 'Em tratamento', 'Recuperando']
  })
  @IsEnum(['Saudável', 'Doente', 'Em tratamento', 'Recuperando'], { 
    message: 'Status de saúde deve ser "Saudável", "Doente", "Em tratamento" ou "Recuperando"' 
  })
  healthStatus: string;

  @ApiProperty({
    description: 'Observações sobre o animal',
    example: 'Animal em bom estado, vacinado recentemente',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  @Transform(({ value }) => value?.trim())
  notes?: string;
}

export class UpdateAnimalDto {
  @ApiProperty({
    description: 'Nome do animal',
    example: 'Boi Nelore #001',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  name?: string;

  @ApiProperty({
    description: 'Espécie do animal',
    example: 'Bovino',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Espécie deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  species?: string;

  @ApiProperty({
    description: 'Raça do animal',
    example: 'Nelore',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Raça deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  breed?: string;

  @ApiProperty({
    description: 'Data de nascimento do animal',
    example: '2020-05-15',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve estar no formato ISO 8601' })
  birthDate?: string;

  @ApiProperty({
    description: 'Peso do animal em kg',
    example: 450.5,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'Peso deve ser um número' })
  @Min(0, { message: 'Peso deve ser maior ou igual a 0' })
  @Max(2000, { message: 'Peso deve ser menor ou igual a 2000 kg' })
  @Transform(({ value }) => parseFloat(value))
  weight?: number;

  @ApiProperty({
    description: 'Sexo do animal',
    example: 'Macho',
    enum: ['Macho', 'Fêmea'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Macho', 'Fêmea'], { message: 'Sexo deve ser "Macho" ou "Fêmea"' })
  gender?: string;

  @ApiProperty({
    description: 'ID da propriedade onde o animal está',
    example: 'prop-123',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'ID da propriedade deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  propertyId?: string;

  @ApiProperty({
    description: 'ID da localização específica na propriedade',
    example: 'loc-456',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'ID da localização deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  locationId?: string;

  @ApiProperty({
    description: 'Status de saúde do animal',
    example: 'Saudável',
    enum: ['Saudável', 'Doente', 'Em tratamento', 'Recuperando'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Saudável', 'Doente', 'Em tratamento', 'Recuperando'], { 
    message: 'Status de saúde deve ser "Saudável", "Doente", "Em tratamento" ou "Recuperando"' 
  })
  healthStatus?: string;

  @ApiProperty({
    description: 'Observações sobre o animal',
    example: 'Animal em bom estado, vacinado recentemente',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  @Transform(({ value }) => value?.trim())
  notes?: string;
}
