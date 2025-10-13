import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { ClimateService } from './climate.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PropertyStatus } from '../mocks/properties';

describe('PropertyController', () => {
  let controller: PropertyController;
  let service: PropertyService;

  const mockProperty = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: 'FAZ-001',
    name: 'Fazenda do Juca',
    description: 'Propriedade principal para criação de gado',
    street: 'Rua Simão Piaz',
    number: 'S/N',
    neighborhood: 'Porto',
    city: 'São João do Itaperiú',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88395-000',
    latitude: -26.5593843,
    longitude: -48.7587542,
    status: PropertyStatus.ACTIVE,
    phases: ['cria', 'recria', 'engorda'],
    createdAt: '2024-01-15T10:00:00Z',
    deletedAt: null,
    pasturePlanning: [
      { month: 'January', precipitation: 4894.2, temperature: 24.9, state: 'Good' },
      { month: 'February', precipitation: 4270.2, temperature: 24.9, state: 'Good' },
    ]
  };

  const mockPropertyService = {
    getAllProperties: jest.fn(),
    getPropertyById: jest.fn(),
    createProperty: jest.fn(),
    updateProperty: jest.fn(),
    deleteProperty: jest.fn(),
    restoreProperty: jest.fn(),
  };

  const mockClimateService = {
    getClimateData: jest.fn(),
    generatePasturePlanning: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: PropertyService,
          useValue: mockPropertyService,
        },
        {
          provide: ClimateService,
          useValue: mockClimateService,
        },
        {
          provide: JwtAuthGuard,
          useValue: mockJwtAuthGuard,
        },
      ],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
    service = module.get<PropertyService>(PropertyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPropertyById', () => {
    it('should return a property when found', async () => {
      const propertyId = '550e8400-e29b-41d4-a716-446655440001';
      const expectedResponse = {
        success: true,
        data: mockProperty,
        message: 'Property retrieved successfully',
      };

      mockPropertyService.getPropertyById.mockResolvedValue(expectedResponse);

      const result = await controller.getPropertyById(propertyId);

      expect(service.getPropertyById).toHaveBeenCalledWith(propertyId);
      expect(result).toEqual(expectedResponse);
    });

    it('should return error when property not found', async () => {
      const propertyId = 'non-existent-id';
      const expectedResponse = {
        success: false,
        data: null,
        message: 'Property not found',
        statusCode: 404,
      };

      mockPropertyService.getPropertyById.mockResolvedValue(expectedResponse);

      const result = await controller.getPropertyById(propertyId);

      expect(service.getPropertyById).toHaveBeenCalledWith(propertyId);
      expect(result).toEqual(expectedResponse);
    });

    it('should return error when property is deleted', async () => {
      const propertyId = '550e8400-e29b-41d4-a716-446655440006'; // This ID is deleted in mock data
      const expectedResponse = {
        success: false,
        data: null,
        message: 'Property has been deleted',
        statusCode: 404,
      };

      mockPropertyService.getPropertyById.mockResolvedValue(expectedResponse);

      const result = await controller.getPropertyById(propertyId);

      expect(service.getPropertyById).toHaveBeenCalledWith(propertyId);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle service errors', async () => {
      const propertyId = '550e8400-e29b-41d4-a716-446655440001';
      const error = new Error('Database connection failed');

      mockPropertyService.getPropertyById.mockRejectedValue(error);

      await expect(controller.getPropertyById(propertyId)).rejects.toThrow('Database connection failed');
      expect(service.getPropertyById).toHaveBeenCalledWith(propertyId);
    });
  });

  describe('getAllProperties', () => {
    it('should return all properties', async () => {
      const expectedResponse = {
        success: true,
        data: [mockProperty],
        count: 1,
        message: 'Properties retrieved successfully',
      };

      mockPropertyService.getAllProperties.mockResolvedValue(expectedResponse);

      const result = await controller.getAllProperties();

      expect(service.getAllProperties).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('createProperty', () => {
    it('should create a new property', async () => {
      const createPropertyDto = {
        code: 'FAZ-002',
        name: 'Nova Fazenda',
        street: 'Rua Nova',
        city: 'Nova Cidade',
        state: 'NS',
        zipCode: '12345-000',
        latitude: -20.0,
        longitude: -50.0,
        status: PropertyStatus.ACTIVE,
        phases: ['cria', 'recria'],
      };

      const mockUser = { userId: 'user-123' };
      const expectedResponse = {
        success: true,
        data: { ...createPropertyDto, id: 'new-id' },
        message: 'Property created successfully',
      };

      mockPropertyService.createProperty.mockResolvedValue(expectedResponse);

      const result = await controller.createProperty(createPropertyDto, { user: mockUser } as any);

      expect(service.createProperty).toHaveBeenCalledWith(createPropertyDto, mockUser.userId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('updateProperty', () => {
    it('should update a property', async () => {
      const propertyId = '550e8400-e29b-41d4-a716-446655440001';
      const updatePropertyDto = {
        name: 'Fazenda Atualizada',
        description: 'Nova descrição',
      };

      const expectedResponse = {
        success: true,
        data: { ...mockProperty, ...updatePropertyDto },
        message: 'Property updated successfully',
      };

      mockPropertyService.updateProperty.mockResolvedValue(expectedResponse);

      const result = await controller.updateProperty(propertyId, updatePropertyDto);

      expect(service.updateProperty).toHaveBeenCalledWith(propertyId, updatePropertyDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('deleteProperty', () => {
    it('should delete a property', async () => {
      const propertyId = '550e8400-e29b-41d4-a716-446655440001';
      const expectedResponse = {
        success: true,
        data: null,
        message: 'Property deleted successfully',
      };

      mockPropertyService.deleteProperty.mockResolvedValue(expectedResponse);

      const result = await controller.deleteProperty(propertyId);

      expect(service.deleteProperty).toHaveBeenCalledWith(propertyId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('restoreProperty', () => {
    it('should restore a deleted property', async () => {
      const propertyId = '550e8400-e29b-41d4-a716-446655440006';
      const expectedResponse = {
        success: true,
        data: { ...mockProperty, deletedAt: null },
        message: 'Property restored successfully',
      };

      mockPropertyService.restoreProperty.mockResolvedValue(expectedResponse);

      const result = await controller.restoreProperty(propertyId);

      expect(service.restoreProperty).toHaveBeenCalledWith(propertyId);
      expect(result).toEqual(expectedResponse);
    });
  });
});