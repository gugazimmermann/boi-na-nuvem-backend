import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token containing user information (userId, name, planName, subscriptionType, subscriptionStatus, subscriptionCreatedAt)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJlbWFpbCI6ImFkbWluQGJvaW5hbnV2ZW0uY29tLmJyIiwibmFtZSI6IkpvaG4gU21pdGgiLCJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJwbGFuTmFtZSI6IkVudGVycHJpc2UiLCJzdWJzY3JpcHRpb25UeXBlIjoidHJpYWwiLCJzdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJzdWJzY3JpcHRpb25DcmVhdGVkQXQiOiIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsImlhdCI6MTc2MDAyMzE0NywiZXhwIjoxNzYwMTA5NTQ3fQ...'
  })
  token: string;

  @ApiProperty({
    description: 'Refresh token for renewing access token when it expires',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc2MDAyMzE0NywiZXhwIjoxNzYwMjgxNTQ3fQ...'
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiration time in ISO format',
    example: '2024-01-16T10:30:00.000Z'
  })
  expiresAt: string;

  @ApiProperty({
    description: 'Refresh token expiration time in ISO format',
    example: '2024-02-15T10:30:00.000Z'
  })
  refreshExpiresAt: string;

  @ApiProperty({
    description: 'Whether the token was created with remember me option',
    example: false
  })
  rememberMe: boolean;
}
