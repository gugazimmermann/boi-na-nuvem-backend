import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiResponse as ApiResponseInterface } from '../common/interfaces/api-response.interface';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates a new user and automatically associates a subscription in the Enterprise plan (trial) with value 0 and active status.'
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            userId: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' },
            subscriptionId: { type: 'string', example: 'a1b2c3d4-e5f6-4789-a012-3456789abcde' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao.silva@email.com' },
            planName: { type: 'string', example: 'Enterprise' },
            subscriptionType: { type: 'string', example: 'trial' },
            subscriptionValue: { type: 'number', example: 0 },
            subscriptionStatus: { type: 'string', example: 'active' },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00Z' }
          }
        },
        message: { type: 'string', example: 'User created successfully' }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided'
  })
  @ApiConflictResponse({
    description: 'Email or document already in use'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponseInterface<RegisterResponseDto>> {
    return this.userService.register(registerDto);
  }
}
