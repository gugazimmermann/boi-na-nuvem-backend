import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { User } from '../mocks/users';
import { Subscription } from '../mocks/subscriptions';
import { Plan } from '../mocks/plans';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { EmailService } from '../common/services/email.service';

// Mock the external dependencies
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid-123'),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn((password: string) => Promise.resolve(`hashed_${password}`)),
  compare: jest.fn((password: string, hash: string) => Promise.resolve(hash === `hashed_${password}`)),
}));

describe('UserService', () => {
  let service: UserService;
  let jwtService: jest.Mocked<JwtService>;
  let emailService: jest.Mocked<EmailService>;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn(() => 'mocked-jwt-token'),
      verify: jest.fn(() => ({ sub: 'mocked-uuid-123', type: 'refresh' })),
    };

    const mockEmailService = {
      sendEmail: jest.fn(() => Promise.resolve(true)),
      sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
      sendPasswordResetConfirmationEmail: jest.fn(() => Promise.resolve(true)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jwtService = module.get(JwtService);
    emailService = module.get(EmailService);
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

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      // First register a user
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.login@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-login',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);

      const loginDto = {
        email: 'joao.silva.login@email.com',
        password: 'minhasenha123',
        rememberMe: false,
      };

      const result = await service.login(loginDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Login successful');
      expect(result.data).toHaveProperty('token');
      expect(result.data).toHaveProperty('refreshToken');
      expect(result.data).toHaveProperty('expiresAt');
      expect(result.data).toHaveProperty('refreshExpiresAt');
      expect(result.data.rememberMe).toBe(false);
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      const loginDto = {
        email: 'nonexistent@email.com',
        password: 'password123',
      };

      await expect(service.login(loginDto)).rejects.toThrow('Invalid email or password');
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      // First register a user
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.invalid@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-invalid',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);

      const loginDto = {
        email: 'joao.silva.invalid@email.com',
        password: 'wrongpassword',
      };

      await expect(service.login(loginDto)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      // First register and login a user
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.refresh@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-refresh',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);

      const refreshTokenDto = {
        refreshToken: 'valid-refresh-token',
      };

      const result = await service.refreshToken(refreshTokenDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Token refreshed successfully');
      expect(result.data).toHaveProperty('token');
      expect(result.data).toHaveProperty('refreshToken');
      expect(result.data).toHaveProperty('expiresAt');
      expect(result.data).toHaveProperty('refreshExpiresAt');
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      const refreshTokenDto = {
        refreshToken: 'invalid-refresh-token',
      };

      // Mock jwtService.verify to throw an error
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refreshToken(refreshTokenDto)).rejects.toThrow('Invalid or expired refresh token');
    });
  });

  describe('forgotPassword', () => {
    it('should send password reset code for existing user', async () => {
      // First register a user
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva.forgot@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-forgot',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      await service.register(registerDto);

      const forgotPasswordDto = {
        email: 'joao.silva.forgot@email.com',
      };

      const result = await service.forgotPassword(forgotPasswordDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Password reset code sent');
      expect(result.data).toHaveProperty('message');
      expect(result.data).toHaveProperty('email', 'joao.silva.forgot@email.com');
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it('should return success even for non-existent email', async () => {
      const forgotPasswordDto = {
        email: 'nonexistent@email.com',
      };

      const result = await service.forgotPassword(forgotPasswordDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Password reset code sent');
      expect(result.data).toHaveProperty('email', 'nonexistent@email.com');
    });
  });

  describe('resetPassword', () => {
    it('should throw BadRequestException for invalid reset code', async () => {
      const resetPasswordDto = {
        code: '12345678',
        newPassword: 'NewPassword123',
      };

      await expect(service.resetPassword(resetPasswordDto)).rejects.toThrow('Invalid or expired reset code');
    });
  });

  describe('validateResetCode', () => {
    it('should return false for invalid reset code', async () => {
      const isValid = await service.validateResetCode('12345678');
      expect(isValid).toBe(false);
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
