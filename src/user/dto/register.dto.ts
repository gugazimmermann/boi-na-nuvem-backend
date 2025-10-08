import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User full name',
    example: 'João Silva'
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'joao.silva@email.com'
  })
  @IsEmail({}, { message: 'Email must have a valid format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+55 11 99999-1234'
  })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @ApiProperty({
    description: 'User CPF or CNPJ',
    example: '123.456.789-00'
  })
  @IsNotEmpty({ message: 'Document is required' })
  @IsString({ message: 'Document must be a string' })
  document: string;

  @ApiProperty({
    description: 'Address street',
    example: 'Rua das Flores'
  })
  @IsNotEmpty({ message: 'Street is required' })
  @IsString({ message: 'Street must be a string' })
  street: string;

  @ApiPropertyOptional({
    description: 'Address number',
    example: '123'
  })
  @IsOptional()
  @IsString({ message: 'Number must be a string' })
  number?: string;

  @ApiPropertyOptional({
    description: 'Address complement',
    example: 'Apto 45'
  })
  @IsOptional()
  @IsString({ message: 'Complement must be a string' })
  complement?: string;

  @ApiPropertyOptional({
    description: 'Address neighborhood',
    example: 'Centro'
  })
  @IsOptional()
  @IsString({ message: 'Neighborhood must be a string' })
  neighborhood?: string;

  @ApiProperty({
    description: 'Address city',
    example: 'São Paulo'
  })
  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  city: string;

  @ApiProperty({
    description: 'Address state',
    example: 'SP'
  })
  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State must be a string' })
  state: string;

  @ApiProperty({
    description: 'Address country',
    example: 'Brasil'
  })
  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  country: string;

  @ApiProperty({
    description: 'Address zip code',
    example: '01234-567'
  })
  @IsNotEmpty({ message: 'Zip code is required' })
  @IsString({ message: 'Zip code must be a string' })
  zipCode: string;

  @ApiProperty({
    description: 'User password',
    example: 'minhasenha123',
    minLength: 6
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;
}
