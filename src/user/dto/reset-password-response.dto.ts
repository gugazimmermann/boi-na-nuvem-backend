import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponseDto {
  @ApiProperty({
    description: 'Success message indicating that password was reset successfully',
    example: 'Password has been reset successfully'
  })
  message: string;

  @ApiProperty({
    description: 'User ID whose password was reset',
    example: '550e8400-e29b-41d4-a716-446655440001'
  })
  userId: string;

  @ApiProperty({
    description: 'Email address of the user whose password was reset',
    example: 'user@example.com'
  })
  email: string;
}
