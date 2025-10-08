import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Unique ID of the created user',
    example: '550e8400-e29b-41d4-a716-446655440001'
  })
  userId: string;

  @ApiProperty({
    description: 'Unique ID of the created subscription',
    example: 'a1b2c3d4-e5f6-4789-a012-3456789abcde'
  })
  subscriptionId: string;

  @ApiProperty({
    description: 'User name',
    example: 'João Silva'
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'joao.silva@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Subscription plan name',
    example: 'Enterprise'
  })
  planName: string;

  @ApiProperty({
    description: 'Subscription type',
    example: 'trial'
  })
  subscriptionType: string;

  @ApiProperty({
    description: 'Subscription value',
    example: 0
  })
  subscriptionValue: number;

  @ApiProperty({
    description: 'Subscription status',
    example: 'active'
  })
  subscriptionStatus: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-15T10:30:00Z'
  })
  createdAt: Date;
}
