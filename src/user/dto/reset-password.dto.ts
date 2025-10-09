import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Reset code received via email (8 digits)',
    example: '12345678',
  })
  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Code is required' })
  @Matches(/^\d{8}$/, { message: 'Code must be exactly 8 digits' })
  code: string;

  @ApiProperty({
    description: 'New password for the user account',
    example: 'MinhaSenha123',
    minLength: 8
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])/,
    {
      message: 'Password must contain at least one lowercase letter and one uppercase letter'
    }
  )
  newPassword: string;
}
