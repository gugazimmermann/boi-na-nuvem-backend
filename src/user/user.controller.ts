import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordResponseDto } from './dto/forgot-password-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordResponseDto } from './dto/reset-password-response.dto';
import { ValidateResetCodeDto } from './dto/validate-reset-code.dto';
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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates a user with email and password, returning a JWT token and user information including subscription details. Optionally supports remember me functionality for extended token expiration.'
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful - JWT token contains all user information (userId, name, planName, subscriptionType, subscriptionStatus, subscriptionCreatedAt) with expiration details',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            token: { 
              type: 'string', 
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJlbWFpbCI6ImFkbWluQGJvaW5hbnV2ZW0uY29tLmJyIiwibmFtZSI6IkpvaG4gU21pdGgiLCJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJwbGFuTmFtZSI6IkVudGVycHJpc2UiLCJzdWJzY3JpcHRpb25UeXBlIjoidHJpYWwiLCJzdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJzdWJzY3JpcHRpb25DcmVhdGVkQXQiOiIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsImlhdCI6MTc2MDAyMzE0NywiZXhwIjoxNzYwMTA5NTQ3fQ...',
              description: 'JWT access token containing: userId, name, planName, subscriptionType, subscriptionStatus, subscriptionCreatedAt, rememberMe'
            },
            refreshToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc2MDAyMzE0NywiZXhwIjoxNzYwMjgxNTQ3fQ...',
              description: 'JWT refresh token for renewing access token when it expires'
            },
            expiresAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-16T10:30:00.000Z',
              description: 'Access token expiration time in ISO format'
            },
            refreshExpiresAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-15T10:30:00.000Z',
              description: 'Refresh token expiration time in ISO format'
            },
            rememberMe: {
              type: 'boolean',
              example: false,
              description: 'Whether the token was created with remember me option'
            }
          }
        },
        message: { type: 'string', example: 'Login successful' }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided'
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  async login(@Body() loginDto: LoginDto): Promise<ApiResponseInterface<LoginResponseDto>> {
    return this.userService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Generates a new access token and refresh token using a valid refresh token. The new tokens will have the same expiration settings as the original login.'
  })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully - returns new access token and refresh token with updated expiration times',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            token: { 
              type: 'string', 
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJlbWFpbCI6ImFkbWluQGJvaW5hbnV2ZW0uY29tLmJyIiwibmFtZSI6IkpvaG4gU21pdGgiLCJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJwbGFuTmFtZSI6IkVudGVycHJpc2UiLCJzdWJzY3JpcHRpb25UeXBlIjoidHJpYWwiLCJzdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJzdWJzY3JpcHRpb25DcmVhdGVkQXQiOiIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsImlhdCI6MTc2MDAyMzE0NywiZXhwIjoxNzYwMTA5NTQ3fQ...',
              description: 'New JWT access token containing: userId, name, planName, subscriptionType, subscriptionStatus, subscriptionCreatedAt, rememberMe'
            },
            refreshToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDEiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc2MDAyMzE0NywiZXhwIjoxNzYwMjgxNTQ3fQ...',
              description: 'New JWT refresh token for future token renewals'
            },
            expiresAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-16T10:30:00.000Z',
              description: 'New access token expiration time in ISO format'
            },
            refreshExpiresAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-15T10:30:00.000Z',
              description: 'New refresh token expiration time in ISO format'
            }
          }
        },
        message: { type: 'string', example: 'Token refreshed successfully' }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided'
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or expired refresh token'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<ApiResponseInterface<RefreshResponseDto>> {
    return this.userService.refreshToken(refreshTokenDto);
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

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Request password reset code',
    description: 'Sends a password reset code (8 digits) to the user\'s email address. For security reasons, this endpoint always returns success even if the email doesn\'t exist.'
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset code sent successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            message: { 
              type: 'string', 
              example: 'Password reset code has been sent to your email' 
            },
            email: { 
              type: 'string', 
              example: 'user@example.com' 
            }
          }
        },
        message: { type: 'string', example: 'Password reset code sent' }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid email format'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<ApiResponseInterface<ForgotPasswordResponseDto>> {
    return this.userService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reset password with code',
    description: 'Resets the user\'s password using a valid reset code (8 digits) received via email. The code expires after 15 minutes.'
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            message: { 
              type: 'string', 
              example: 'Password has been reset successfully' 
            },
            userId: { 
              type: 'string', 
              example: '550e8400-e29b-41d4-a716-446655440001' 
            },
            email: { 
              type: 'string', 
              example: 'user@example.com' 
            }
          }
        },
        message: { type: 'string', example: 'Password reset successfully' }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid or expired reset code, or invalid password format'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<ApiResponseInterface<ResetPasswordResponseDto>> {
    return this.userService.resetPassword(resetPasswordDto);
  }

  @Post('validate-reset-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Validate reset code',
    description: 'Validates if a password reset code (8 digits) is valid and not expired. Used by frontend to check code validity before showing reset form.'
  })
  @ApiResponse({
    status: 200,
    description: 'Code validation result',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            valid: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Code is valid' }
          }
        },
        message: { type: 'string', example: 'Code validation completed' }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid code format'
  })
  async validateResetCode(@Body() validateResetCodeDto: ValidateResetCodeDto): Promise<ApiResponseInterface<{ valid: boolean; message: string }>> {
    const isValid = await this.userService.validateResetCode(validateResetCodeDto.code);
    const responseData = {
      valid: isValid,
      message: isValid ? 'Code is valid' : 'Code is invalid or expired'
    };
    return ResponseHelper.successSingle(responseData, 'Code validation completed');
  }
}
