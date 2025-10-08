import { Test, TestingModule } from '@nestjs/testing';
import { AnimalService } from './animal.service';
import { CreateAnimalDto, UpdateAnimalDto } from './dto/animal.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';

describe('AnimalService', () => {
  let service: AnimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalService],
    }).compile();

    service = module.get<AnimalService>(AnimalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAnimals', () => {
    it('should return empty array with success response', async () => {
      const result = await service.getAllAnimals();

      expect(result).toEqual({
        success: true,
        data: [],
        count: 0,
        message: 'Animals retrieved successfully',
      });
    });
  });

  describe('getAnimalById', () => {
    it('should return null with success response for any id', async () => {
      const animalId = 'test-id-123';

      const result = await service.getAnimalById(animalId);

      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Animal retrieved successfully',
      });
    });

    it('should handle empty string id', async () => {
      const result = await service.getAnimalById('');

      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Animal retrieved successfully',
      });
    });

    it('should handle undefined id', async () => {
      const result = await service.getAnimalById(undefined as any);

      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Animal retrieved successfully',
      });
    });
  });

  describe('createAnimal', () => {
    it('should return created animal data with success response', async () => {
      const createAnimalDto: CreateAnimalDto = {
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

      const result = await service.createAnimal(createAnimalDto);

      expect(result).toEqual({
        success: true,
        data: createAnimalDto,
        message: 'Animal created successfully',
      });
    });

    it('should handle create animal without optional fields', async () => {
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
      };

      const result = await service.createAnimal(createAnimalDto);

      expect(result).toEqual({
        success: true,
        data: createAnimalDto,
        message: 'Animal created successfully',
      });
    });

    it('should handle empty create animal dto', async () => {
      const createAnimalDto = {} as CreateAnimalDto;

      const result = await service.createAnimal(createAnimalDto);

      expect(result).toEqual({
        success: true,
        data: createAnimalDto,
        message: 'Animal created successfully',
      });
    });
  });

  describe('updateAnimal', () => {
    it('should return updated animal data with success response', async () => {
      const animalId = 'test-id-123';
      const updateAnimalDto: UpdateAnimalDto = {
        weight: 480.0,
        healthStatus: 'Em tratamento',
        notes: 'Animal em tratamento veterinário',
      };

      const result = await service.updateAnimal(animalId, updateAnimalDto);

      expect(result).toEqual({
        success: true,
        data: updateAnimalDto,
        message: 'Animal updated successfully',
      });
    });

    it('should handle partial update with only some fields', async () => {
      const animalId = 'test-id-123';
      const updateAnimalDto: UpdateAnimalDto = {
        weight: 500.0,
      };

      const result = await service.updateAnimal(animalId, updateAnimalDto);

      expect(result).toEqual({
        success: true,
        data: updateAnimalDto,
        message: 'Animal updated successfully',
      });
    });

    it('should handle empty update animal dto', async () => {
      const animalId = 'test-id-123';
      const updateAnimalDto = {} as UpdateAnimalDto;

      const result = await service.updateAnimal(animalId, updateAnimalDto);

      expect(result).toEqual({
        success: true,
        data: updateAnimalDto,
        message: 'Animal updated successfully',
      });
    });

    it('should handle update with undefined id', async () => {
      const updateAnimalDto: UpdateAnimalDto = {
        weight: 480.0,
      };

      const result = await service.updateAnimal(undefined as any, updateAnimalDto);

      expect(result).toEqual({
        success: true,
        data: updateAnimalDto,
        message: 'Animal updated successfully',
      });
    });
  });

  describe('deleteAnimal', () => {
    it('should return null with success response for any id', async () => {
      const animalId = 'test-id-123';

      const result = await service.deleteAnimal(animalId);

      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Animal deleted successfully',
      });
    });

    it('should handle empty string id', async () => {
      const result = await service.deleteAnimal('');

      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Animal deleted successfully',
      });
    });

    it('should handle undefined id', async () => {
      const result = await service.deleteAnimal(undefined as any);

      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Animal deleted successfully',
      });
    });
  });

  describe('service initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should be an instance of AnimalService', () => {
      expect(service).toBeInstanceOf(AnimalService);
    });
  });
});
