import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseDto {
  @ApiProperty({
    description: 'Success message indicating that reset instructions were sent',
    example: 'Password reset instructions have been sent to your email'
  })
  message: string;

  @ApiProperty({
    description: 'Email address where the reset instructions were sent',
    example: 'user@example.com'
  })
  email: string;
}
