import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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
import { User } from '../mocks/users';
import { Subscription } from '../mocks/subscriptions';
import { Plan } from '../mocks/plans';
import users from '../mocks/users';
import subscriptions from '../mocks/subscriptions';
import plans from '../mocks/plans';
import { ResponseHelper } from '../common/helpers/response.helper';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private users: User[] = [...users];
  private subscriptions: Subscription[] = [...subscriptions];

  constructor(
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async register(registerDto: RegisterDto): Promise<ApiResponse<RegisterResponseDto>> {
    try {
      // Check if email already exists
      const existingUser = this.users.find(user => user.email === registerDto.email);
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      // Check if document already exists
      const existingDocument = this.users.find(user => user.document === registerDto.document);
      if (existingDocument) {
        throw new ConflictException('Document is already in use');
      }

      // Generate unique ID for user
      const userId = uuidv4();

      // Encrypt password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

      // Create user
      const newUser: User = {
        id: userId,
        password: hashedPassword,
        name: registerDto.name,
        email: registerDto.email,
        phone: registerDto.phone,
        document: registerDto.document,
        street: registerDto.street,
        number: registerDto.number || '',
        complement: registerDto.complement || '',
        neighborhood: registerDto.neighborhood || '',
        city: registerDto.city,
        state: registerDto.state,
        country: registerDto.country,
        zipCode: registerDto.zipCode,
        createdAt: new Date()
      };

      // Add user to list
      this.users.push(newUser);

      // Find Enterprise plan
      const enterprisePlan = plans.find(plan => plan.name === 'Enterprise');
      if (!enterprisePlan) {
        throw new InternalServerErrorException('Enterprise plan not found');
      }

      // Create subscription in Enterprise plan (trial)
      const subscriptionId = uuidv4();
      const newSubscription: Subscription = {
        id: subscriptionId,
        userId: userId,
        planId: enterprisePlan.id,
        type: 'trial',
        value: 0,
        createdAt: new Date(),
        status: 'active'
      };

      // Add subscription to list
      this.subscriptions.push(newSubscription);

      // Return response
      const responseData: RegisterResponseDto = {
        userId: newUser.id,
        subscriptionId: newSubscription.id,
        name: newUser.name,
        email: newUser.email,
        planName: enterprisePlan.name,
        subscriptionType: newSubscription.type,
        subscriptionValue: newSubscription.value,
        subscriptionStatus: newSubscription.status,
        createdAt: newUser.createdAt
      };

      return ResponseHelper.successSingle(responseData, 'User created successfully');
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error while creating user');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserSubscription(userId: string): Promise<Subscription | undefined> {
    return this.subscriptions.find(sub => sub.userId === userId);
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<LoginResponseDto>> {
    try {
      // Find user by email
      const user = await this.findByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Get user subscription
      const subscription = await this.getUserSubscription(user.id);
      if (!subscription) {
        throw new InternalServerErrorException('User subscription not found');
      }

      // Get plan information
      const plan = plans.find(p => p.id === subscription.planId);
      if (!plan) {
        throw new InternalServerErrorException('Plan not found');
      }

      // Determine token expiration based on rememberMe option
      const rememberMe = loginDto.rememberMe || false;
      const accessTokenExpiresIn = rememberMe ? '30d' : '1d';
      const refreshTokenExpiresIn = rememberMe ? '60d' : '7d';
      
      // Calculate expiration dates
      const now = new Date();
      const accessTokenExpirationDate = new Date(now.getTime() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000));
      const refreshTokenExpirationDate = new Date(now.getTime() + (rememberMe ? 60 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000));

      // Generate access token with all user information
      const accessTokenPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        userId: user.id,
        planName: plan.name,
        subscriptionType: subscription.type,
        subscriptionStatus: subscription.status,
        subscriptionCreatedAt: subscription.createdAt,
        rememberMe: rememberMe,
        type: 'access'
      };
      const accessToken = this.jwtService.sign(accessTokenPayload, { expiresIn: accessTokenExpiresIn });

      // Generate refresh token
      const refreshTokenPayload = {
        sub: user.id,
        type: 'refresh'
      };
      const refreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: refreshTokenExpiresIn });

      // Return response with tokens and expiration info
      const responseData: LoginResponseDto = {
        token: accessToken,
        refreshToken,
        expiresAt: accessTokenExpirationDate.toISOString(),
        refreshExpiresAt: refreshTokenExpirationDate.toISOString(),
        rememberMe
      };

      return ResponseHelper.successSingle(responseData, 'Login successful');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error during login');
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<ApiResponse<RefreshResponseDto>> {
    try {
      // Verify refresh token
      let decodedToken;
      try {
        decodedToken = this.jwtService.verify(refreshTokenDto.refreshToken);
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // Check if it's a refresh token
      if (decodedToken.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Find user by ID from token
      const user = await this.findById(decodedToken.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Get user subscription
      const subscription = await this.getUserSubscription(user.id);
      if (!subscription) {
        throw new InternalServerErrorException('User subscription not found');
      }

      // Get plan information
      const plan = plans.find(p => p.id === subscription.planId);
      if (!plan) {
        throw new InternalServerErrorException('Plan not found');
      }

      // Determine token expiration based on rememberMe from original token
      const rememberMe = decodedToken.rememberMe || false;
      const accessTokenExpiresIn = rememberMe ? '30d' : '1d';
      const refreshTokenExpiresIn = rememberMe ? '60d' : '7d';
      
      // Calculate expiration dates
      const now = new Date();
      const accessTokenExpirationDate = new Date(now.getTime() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000));
      const refreshTokenExpirationDate = new Date(now.getTime() + (rememberMe ? 60 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000));

      // Generate new access token
      const accessTokenPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        userId: user.id,
        planName: plan.name,
        subscriptionType: subscription.type,
        subscriptionStatus: subscription.status,
        subscriptionCreatedAt: subscription.createdAt,
        rememberMe: rememberMe,
        type: 'access'
      };
      const newAccessToken = this.jwtService.sign(accessTokenPayload, { expiresIn: accessTokenExpiresIn });

      // Generate new refresh token
      const refreshTokenPayload = {
        sub: user.id,
        type: 'refresh',
        rememberMe: rememberMe
      };
      const newRefreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: refreshTokenExpiresIn });

      // Return response with new tokens
      const responseData: RefreshResponseDto = {
        token: newAccessToken,
        refreshToken: newRefreshToken,
        expiresAt: accessTokenExpirationDate.toISOString(),
        refreshExpiresAt: refreshTokenExpirationDate.toISOString()
      };

      return ResponseHelper.successSingle(responseData, 'Token refreshed successfully');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error during token refresh');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<ApiResponse<ForgotPasswordResponseDto>> {
    try {
      // Find user by email
      const user = await this.findByEmail(forgotPasswordDto.email);
      if (!user) {
        // For security reasons, we don't reveal if the email exists or not
        // We return success even if user doesn't exist
        const responseData: ForgotPasswordResponseDto = {
          message: 'If the email exists in our system, password reset code has been sent',
          email: forgotPasswordDto.email
        };
        return ResponseHelper.successSingle(responseData, 'Password reset code sent');
      }

      // Generate reset code (8 digits)
      const resetCode = Math.floor(10000000 + Math.random() * 90000000).toString();
      const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Update user with reset code and expiration
      const userIndex = this.users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        this.users[userIndex] = {
          ...this.users[userIndex],
          passwordResetCode: resetCode,
          passwordResetExpires: resetCodeExpires
        };
      }

      // Send password reset email
      const emailSent = await this.emailService.sendPasswordResetEmail(
        user.email,
        resetCode,
        user.name
      );

      if (!emailSent) {
        this.logger.warn(`Failed to send password reset email to ${user.email}`);
        // Still return success for security reasons
      }

      const responseData: ForgotPasswordResponseDto = {
        message: 'Password reset code has been sent to your email',
        email: user.email
      };

      return ResponseHelper.successSingle(responseData, 'Password reset code sent');
    } catch (error) {
      throw new InternalServerErrorException('Internal server error during password reset request');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<ApiResponse<ResetPasswordResponseDto>> {
    try {
      // Find user by reset code
      const user = this.users.find(u => 
        u.passwordResetCode === resetPasswordDto.code && 
        u.passwordResetExpires && 
        u.passwordResetExpires > new Date()
      );

      if (!user) {
        throw new BadRequestException('Invalid or expired reset code');
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, saltRounds);

      // Update user password and clear reset code
      const userIndex = this.users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        this.users[userIndex] = {
          ...this.users[userIndex],
          password: hashedPassword,
          passwordResetCode: undefined,
          passwordResetExpires: undefined
        };
      }

      // Send confirmation email
      const emailSent = await this.emailService.sendPasswordResetConfirmationEmail(
        user.email,
        user.name
      );

      if (!emailSent) {
        this.logger.warn(`Failed to send password reset confirmation email to ${user.email}`);
      }

      const responseData: ResetPasswordResponseDto = {
        message: 'Password has been reset successfully',
        userId: user.id,
        email: user.email
      };

      return ResponseHelper.successSingle(responseData, 'Password reset successfully');
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error during password reset');
    }
  }

  async validateResetCode(code: string): Promise<boolean> {
    try {
      const user = this.users.find(u => 
        u.passwordResetCode === code && 
        u.passwordResetExpires && 
        u.passwordResetExpires > new Date()
      );
      return !!user;
    } catch (error) {
      return false;
    }
  }
}
