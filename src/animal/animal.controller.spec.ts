import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { CreateAnimalDto, UpdateAnimalDto } from './dto/animal.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';

describe('AnimalController', () => {
  let controller: AnimalController;
  let service: jest.Mocked<AnimalService>;

  const mockAnimalService = {
    getAllAnimals: jest.fn(),
    getAnimalById: jest.fn(),
    createAnimal: jest.fn(),
    updateAnimal: jest.fn(),
    deleteAnimal: jest.fn(),
  };

  // Mock logger to suppress error messages during tests
  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };

  beforeEach(async () => {
    // Reset all mocks before each test
    Object.values(mockAnimalService).forEach(mock => {
      if (jest.isMockFunction(mock)) {
        mock.mockReset();
      }
    });

    // Reset logger mocks
    Object.values(mockLogger).forEach(mock => {
      if (jest.isMockFunction(mock)) {
        mock.mockReset();
      }
    });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalController],
      providers: [
        {
          provide: AnimalService,
          useValue: mockAnimalService,
        },
      ],
    }).compile();

    controller = module.get<AnimalController>(AnimalController);
    service = module.get<AnimalService>(AnimalService) as jest.Mocked<AnimalService>;
    
    // Replace the logger instance with our mock
    (controller as any).logger = mockLogger;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAnimals', () => {
    it('should return all animals successfully', async () => {
      const mockAnimals = [
        {
          id: '1',
          name: 'Boi Nelore #001',
          species: 'Bovino',
          breed: 'Nelore',
          birthDate: '2020-05-15',
          weight: 450.5,
          gender: 'Macho',
          propertyId: 'prop-123',
          locationId: 'loc-456',
          healthStatus: 'Saudável',
          notes: 'Animal em bom estado',
        },
      ];

      const mockResponse: ApiResponse<any[]> = {
        success: true,
        data: mockAnimals,
        count: 1,
        message: 'Animals retrieved successfully',
      };

      mockAnimalService.getAllAnimals.mockResolvedValue(mockResponse);

      const result = await controller.getAllAnimals();

      expect(result).toEqual(mockResponse);
      expect(mockAnimalService.getAllAnimals).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      const error = new Error('Database connection failed');
      mockAnimalService.getAllAnimals.mockRejectedValue(error);

      await expect(controller.getAllAnimals()).rejects.toThrow('Database connection failed');
      expect(mockAnimalService.getAllAnimals).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAnimalById', () => {
    it('should return animal by id successfully', async () => {
      const animalId = '1';
      const mockAnimal = {
        id: animalId,
        name: 'Boi Nelore #001',
        species: 'Bovino',
        breed: 'Nelore',
        birthDate: '2020-05-15',
        weight: 450.5,
        gender: 'Macho',
        propertyId: 'prop-123',
        locationId: 'loc-456',
        healthStatus: 'Saudável',
        notes: 'Animal em bom estado',
      };

      const mockResponse: ApiResponse<any> = {
        success: true,
        data: mockAnimal,
        message: 'Animal retrieved successfully',
      };

      mockAnimalService.getAnimalById.mockResolvedValue(mockResponse);

      const result = await controller.getAnimalById(animalId);

      expect(result).toEqual(mockResponse);
      expect(mockAnimalService.getAnimalById).toHaveBeenCalledWith(animalId);
    });

    it('should handle service errors when getting animal by id', async () => {
      const animalId = '1';
      const error = new Error('Animal not found');
      mockAnimalService.getAnimalById.mockRejectedValue(error);

      await expect(controller.getAnimalById(animalId)).rejects.toThrow('Animal not found');
      expect(mockAnimalService.getAnimalById).toHaveBeenCalledWith(animalId);
    });
  });

  describe('createAnimal', () => {
    it('should create animal successfully', async () => {
      const createAnimalDto: CreateAnimalDto = {
        name: 'Boi Nelore #002',
        species: 'Bovino',
        breed: 'Nelore',
        birthDate: '2021-03-10',
        weight: 380.0,
        gender: 'Fêmea',
        propertyId: 'prop-123',
        locationId: 'loc-456',
        healthStatus: 'Saudável',
        notes: 'Novo animal adicionado',
      };

      const mockCreatedAnimal = {
        id: '2',
        ...createAnimalDto,
      };

      const mockResponse: ApiResponse<any> = {
        success: true,
        data: mockCreatedAnimal,
        message: 'Animal created successfully',
      };

      mockAnimalService.createAnimal.mockResolvedValue(mockResponse);

      const result = await controller.createAnimal(createAnimalDto);

      expect(result).toEqual(mockResponse);
      expect(mockAnimalService.createAnimal).toHaveBeenCalledWith(createAnimalDto);
    });

    it('should handle service errors when creating animal', async () => {
      const createAnimalDto: CreateAnimalDto = {
        name: 'Boi Nelore #002',
        species: 'Bovino',
        breed: 'Nelore',
        birthDate: '2021-03-10',
        weight: 380.0,
        gender: 'Fêmea',
        propertyId: 'prop-123',
        locationId: 'loc-456',
        healthStatus: 'Saudável',
        notes: 'Novo animal adicionado',
      };

      const error = new Error('Validation failed');
      mockAnimalService.createAnimal.mockRejectedValue(error);

      await expect(controller.createAnimal(createAnimalDto)).rejects.toThrow('Validation failed');
      expect(mockAnimalService.createAnimal).toHaveBeenCalledWith(createAnimalDto);
    });
  });

  describe('updateAnimal', () => {
    it('should update animal successfully', async () => {
      const animalId = '1';
      const updateAnimalDto: UpdateAnimalDto = {
        weight: 480.0,
        healthStatus: 'Em tratamento',
        notes: 'Animal em tratamento veterinário',
      };

      const mockUpdatedAnimal = {
        id: animalId,
        name: 'Boi Nelore #001',
        species: 'Bovino',
        breed: 'Nelore',
        birthDate: '2020-05-15',
        weight: 480.0,
        gender: 'Macho',
        propertyId: 'prop-123',
        locationId: 'loc-456',
        healthStatus: 'Em tratamento',
        notes: 'Animal em tratamento veterinário',
      };

      const mockResponse: ApiResponse<any> = {
        success: true,
        data: mockUpdatedAnimal,
        message: 'Animal updated successfully',
      };

      mockAnimalService.updateAnimal.mockResolvedValue(mockResponse);

      const result = await controller.updateAnimal(animalId, updateAnimalDto);

      expect(result).toEqual(mockResponse);
      expect(mockAnimalService.updateAnimal).toHaveBeenCalledWith(animalId, updateAnimalDto);
    });

    it('should handle service errors when updating animal', async () => {
      const animalId = '1';
      const updateAnimalDto: UpdateAnimalDto = {
        weight: 480.0,
        healthStatus: 'Em tratamento',
      };

      const error = new Error('Animal not found');
      mockAnimalService.updateAnimal.mockRejectedValue(error);

      await expect(controller.updateAnimal(animalId, updateAnimalDto)).rejects.toThrow('Animal not found');
      expect(mockAnimalService.updateAnimal).toHaveBeenCalledWith(animalId, updateAnimalDto);
    });
  });

  describe('deleteAnimal', () => {
    it('should delete animal successfully', async () => {
      const animalId = '1';

      const mockResponse: ApiResponse<null> = {
        success: true,
        data: null,
        message: 'Animal deleted successfully',
      };

      mockAnimalService.deleteAnimal.mockResolvedValue(mockResponse);

      const result = await controller.deleteAnimal(animalId);

      expect(result).toEqual(mockResponse);
      expect(mockAnimalService.deleteAnimal).toHaveBeenCalledWith(animalId);
    });

    it('should handle service errors when deleting animal', async () => {
      const animalId = '1';
      const error = new Error('Animal not found');
      mockAnimalService.deleteAnimal.mockRejectedValue(error);

      await expect(controller.deleteAnimal(animalId)).rejects.toThrow('Animal not found');
      expect(mockAnimalService.deleteAnimal).toHaveBeenCalledWith(animalId);
    });
  });
});
