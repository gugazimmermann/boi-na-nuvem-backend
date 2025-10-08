import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiResponse as ApiResponseInterface } from '../common/interfaces/api-response.interface';
import { ResponseHelper } from '../common/helpers/response.helper';

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

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all registered users'
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' },
              name: { type: 'string', example: 'João Silva' },
              email: { type: 'string', example: 'joao.silva@email.com' },
              phone: { type: 'string', example: '+55 11 99999-1234' },
              document: { type: 'string', example: '123.456.789-00' },
              createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00Z' }
            }
          }
        },
        message: { type: 'string', example: 'Users retrieved successfully' }
      }
    }
  })
  async getAllUsers(): Promise<ApiResponseInterface<any[]>> {
    const users = await this.userService.getAllUsers();
    return ResponseHelper.successWithCount(users, 'Users retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their ID'
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getUserById(@Param('id') id: string): Promise<ApiResponseInterface<any>> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return ResponseHelper.successSingle(user, 'User retrieved successfully');
  }

  @Get('email/:email')
  @ApiOperation({
    summary: 'Get user by email',
    description: 'Retrieves a specific user by their email address'
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getUserByEmail(@Param('email') email: string): Promise<ApiResponseInterface<any>> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return ResponseHelper.successSingle(user, 'User retrieved successfully');
  }

  @Get(':id/subscription')
  @ApiOperation({
    summary: 'Get user subscription',
    description: 'Retrieves the subscription information for a specific user'
  })
  @ApiResponse({
    status: 200,
    description: 'User subscription retrieved successfully'
  })
  @ApiNotFoundResponse({
    description: 'User subscription not found'
  })
  async getUserSubscription(@Param('id') id: string): Promise<ApiResponseInterface<any>> {
    const subscription = await this.userService.getUserSubscription(id);
    if (!subscription) {
      throw new NotFoundException('User subscription not found');
    }
    return ResponseHelper.successSingle(subscription, 'User subscription retrieved successfully');
  }
}
