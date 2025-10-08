import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    register: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    getAllUsers: jest.fn(),
    getUserSubscription: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-00',
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

      const mockResponseData: RegisterResponseDto = {
        userId: '550e8400-e29b-41d4-a716-446655440001',
        subscriptionId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        planName: 'Enterprise',
        subscriptionType: 'trial',
        subscriptionValue: 0,
        subscriptionStatus: 'active',
        createdAt: new Date('2024-01-15T10:30:00Z'),
      };

      const mockResponse: ApiResponse<RegisterResponseDto> = {
        success: true,
        data: mockResponseData,
        message: 'User created successfully',
      };

      mockUserService.register.mockResolvedValue(mockResponse);

      const result = await controller.register(registerDto);

      expect(result).toEqual(mockResponse);
      expect(mockUserService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should handle email already in use error', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'existing@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-00',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const error = new ConflictException('Email is already in use');
      mockUserService.register.mockRejectedValue(error);

      await expect(controller.register(registerDto)).rejects.toThrow(ConflictException);
      await expect(controller.register(registerDto)).rejects.toThrow('Email is already in use');
      expect(mockUserService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should handle document already in use error', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-00',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const error = new ConflictException('Document is already in use');
      mockUserService.register.mockRejectedValue(error);

      await expect(controller.register(registerDto)).rejects.toThrow(ConflictException);
      await expect(controller.register(registerDto)).rejects.toThrow('Document is already in use');
      expect(mockUserService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should handle internal server error', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-00',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const error = new InternalServerErrorException('Internal server error while creating user');
      mockUserService.register.mockRejectedValue(error);

      await expect(controller.register(registerDto)).rejects.toThrow(InternalServerErrorException);
      await expect(controller.register(registerDto)).rejects.toThrow('Internal server error while creating user');
      expect(mockUserService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should handle register with minimal required fields', async () => {
      const registerDto: RegisterDto = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '+55 11 99999-1234',
        document: '123.456.789-00',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      const mockResponseData: RegisterResponseDto = {
        userId: '550e8400-e29b-41d4-a716-446655440001',
        subscriptionId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        planName: 'Enterprise',
        subscriptionType: 'trial',
        subscriptionValue: 0,
        subscriptionStatus: 'active',
        createdAt: new Date('2024-01-15T10:30:00Z'),
      };

      const mockResponse: ApiResponse<RegisterResponseDto> = {
        success: true,
        data: mockResponseData,
        message: 'User created successfully',
      };

      mockUserService.register.mockResolvedValue(mockResponse);

      const result = await controller.register(registerDto);

      expect(result).toEqual(mockResponse);
      expect(mockUserService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('controller initialization', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should be an instance of UserController', () => {
      expect(controller).toBeInstanceOf(UserController);
    });

    it('should have UserService injected', () => {
      expect(service).toBeDefined();
    });
  });
});
