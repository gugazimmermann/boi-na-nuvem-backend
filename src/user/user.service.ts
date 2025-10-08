import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { User } from '../mocks/users';
import { Subscription } from '../mocks/subscriptions';
import { Plan } from '../mocks/plans';
import users from '../mocks/users';
import subscriptions from '../mocks/subscriptions';
import plans from '../mocks/plans';
import { ResponseHelper } from '../common/helpers/response.helper';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Injectable()
export class UserService {
  private users: User[] = [...users];
  private subscriptions: Subscription[] = [...subscriptions];

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
}
