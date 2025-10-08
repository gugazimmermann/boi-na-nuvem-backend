import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { User } from '../mocks/users';
import { Subscription } from '../mocks/subscriptions';
import { Plan } from '../mocks/plans';
import { ApiResponse } from '../common/interfaces/api-response.interface';

// Mock the external dependencies
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid-123'),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn((password: string) => Promise.resolve(`hashed_${password}`)),
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Clear the users array between tests to avoid conflicts
    (service as any).users = [];
    (service as any).subscriptions = [];
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test1@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-01',
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const result = await service.register(registerDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('User created successfully');
      expect(result.data).toMatchObject({
        name: 'João Silva',
        email: 'joao.silva.test1@email.com',
        planName: 'Enterprise',
        subscriptionType: 'trial',
        subscriptionValue: 0,
        subscriptionStatus: 'active',
      });
      expect(result.data.userId).toBeDefined();
      expect(result.data.subscriptionId).toBeDefined();
      expect(result.data.createdAt).toBeInstanceOf(Date);
    });

    it('should throw ConflictException when email already exists', async () => {
      // First, register a user
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test2@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-02',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);

      // Try to register with the same email
      const duplicateEmailDto: RegisterDto = {
        ...registerDto,
        document: '987.654.321-02', // Different document
      };

      await expect(service.register(duplicateEmailDto)).rejects.toThrow(ConflictException);
      await expect(service.register(duplicateEmailDto)).rejects.toThrow('Email is already in use');
    });

    it('should throw ConflictException when document already exists', async () => {
      // First, register a user
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test3@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-03',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);

      // Try to register with the same document
      const duplicateDocumentDto: RegisterDto = {
        ...registerDto,
        email: 'different.test3@email.com', // Different email
      };

      await expect(service.register(duplicateDocumentDto)).rejects.toThrow(ConflictException);
      await expect(service.register(duplicateDocumentDto)).rejects.toThrow('Document is already in use');
    });

    it('should handle register with minimal required fields', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test4@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-04',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const result = await service.register(registerDto);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        name: 'João Silva',
        email: 'joao.silva.test4@email.com',
        planName: 'Enterprise',
        subscriptionType: 'trial',
        subscriptionValue: 0,
        subscriptionStatus: 'active',
      });
    });

    it('should hash password correctly', async () => {
      const bcrypt = require('bcrypt');
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test5@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-05',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('minhasenha123', 10);
    });

    it('should create user with correct data structure', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test6@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-06',
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const result = await service.register(registerDto);

      expect(result.data).toMatchObject({
        name: registerDto.name,
        email: registerDto.email,
        planName: 'Enterprise',
        subscriptionType: 'trial',
        subscriptionValue: 0,
        subscriptionStatus: 'active',
      });
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test7@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-07',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);
      const user = await service.findByEmail('joao.silva.test7@email.com');

      expect(user).toBeDefined();
      expect(user?.email).toBe('joao.silva.test7@email.com');
      expect(user?.name).toBe('João Silva');
    });

    it('should return undefined for non-existent email', async () => {
      const user = await service.findByEmail('nonexistent@email.com');
      expect(user).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test8@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-08',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const result = await service.register(registerDto);
      const user = await service.findById(result.data.userId);

      expect(user).toBeDefined();
      expect(user?.id).toBe(result.data.userId);
      expect(user?.email).toBe('joao.silva.test8@email.com');
    });

    it('should return undefined for non-existent id', async () => {
      const user = await service.findById('non-existent-id');
      expect(user).toBeUndefined();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = await service.getAllUsers();
      expect(Array.isArray(users)).toBe(true);
    });

    it('should include newly registered users', async () => {
      const initialUsers = await service.getAllUsers();
      const initialCount = initialUsers.length;

      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test9@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-09',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);
      const usersAfterRegistration = await service.getAllUsers();

      expect(usersAfterRegistration.length).toBe(initialCount + 1);
    });
  });

  describe('getUserSubscription', () => {
    it('should return user subscription', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.test10@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-10',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const result = await service.register(registerDto);
      const subscription = await service.getUserSubscription(result.data.userId);

      expect(subscription).toBeDefined();
      expect(subscription?.userId).toBe(result.data.userId);
      expect(subscription?.type).toBe('trial');
      expect(subscription?.value).toBe(0);
      expect(subscription?.status).toBe('active');
    });

    it('should return undefined for non-existent user subscription', async () => {
      const subscription = await service.getUserSubscription('non-existent-id');
      expect(subscription).toBeUndefined();
    });
  });

  describe('service initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should be an instance of UserService', () => {
      expect(service).toBeInstanceOf(UserService);
    });
  });
});
