import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ValidateResetCodeDto {
  @ApiProperty({
    description: 'Reset code to validate (8 digits)',
    example: '12345678',
  })
  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Code is required' })
  @Matches(/^\d{8}$/, { message: 'Code must be exactly 8 digits' })
  code: string;
}
