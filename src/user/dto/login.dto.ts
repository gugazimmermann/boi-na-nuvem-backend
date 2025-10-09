import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'joao.silva@email.com'
  })
  @IsEmail({}, { message: 'Email must have a valid format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'minhasenha123'
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    description: 'Remember me option - if true, token will expire in 30 days, otherwise 1 day',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Remember me must be a boolean' })
  rememberMe?: boolean;
}
