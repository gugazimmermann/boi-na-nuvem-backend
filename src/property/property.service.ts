import { Injectable, Logger } from '@nestjs/common';
import { ResponseHelper } from '../common/helpers/response.helper';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { ClimateService } from './climate.service';
import { CreatePropertyDto } from './dto/property.dto';
import { Property, PropertyStatus, PasturePlanning, PROPERTIES } from '../mocks/properties';
import { LOCATIONS, LOCATION_MOVIMENTS, LOCATION_OBSERVATIONS, LOCATION_QUALITIES } from '../mocks/locations';
import { ANIMALS, ANIMAL_LOCATIONS } from '../mocks/animals';
import { EMPLOYESS, PROPERTYHASEMPLOYEE } from '../mocks/employees';
import { v4 as uuidv4 } from 'uuid';

export interface PropertySummary {
  id: string;
  codigo: string;
  nome: string;
  endereco: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  quantidadeLocalizacoes: number;
  capacidade: {
    total: number;
    totalAnimais: number;
    porcentagemOcupacao: number;
  };
  totalColaboradores: number;
  status: PropertyStatus;
}

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);

  constructor(private readonly climateService: ClimateService) {}

  async getAllProperties(): Promise<ApiResponse<PropertySummary[]>> {
    this.logger.log('Fetching all properties with summary data', 'getAllProperties');
    
    try {
      // Filter only non-deleted properties and exclude the "ALL" property
      const activeProperties = PROPERTIES.filter(property => 
        !property.deletedAt && property.code !== 'ALL'
      );
      
      const propertiesSummary: PropertySummary[] = activeProperties.map(property => {
        // Get locations for this property
        const propertyLocations = LOCATIONS.filter(location => 
          location.propertyId === property.id && !location.deletedAt
        );
        
        // Calculate total capacity from all locations
        const totalCapacity = propertyLocations.reduce((sum, location) => sum + location.capacity, 0);
        
        // Get animals for this property
        const propertyAnimals = ANIMALS.filter(animal => 
          animal.propertyId === property.id && !animal.deletedAt
        );
        
        // Calculate occupancy percentage
        const occupancyPercentage = totalCapacity > 0 ? (propertyAnimals.length / totalCapacity) * 100 : 0;
        
        // Get employees for this property
        const propertyEmployeeIds = PROPERTYHASEMPLOYEE
          .filter(relation => relation.propertyId === property.id)
          .map(relation => relation.employeeId);
        
        const propertyEmployees = EMPLOYESS.filter(employee => 
          propertyEmployeeIds.includes(employee.id) && !employee.deletedAt
        );
        
        return {
          id: property.id,
          codigo: property.code,
          nome: property.name,
          endereco: {
            street: property.street,
            number: property.number,
            neighborhood: property.neighborhood,
            city: property.city,
            state: property.state,
            country: property.country,
            zipCode: property.zipCode,
          },
          quantidadeLocalizacoes: propertyLocations.length,
          capacidade: {
            total: totalCapacity,
            totalAnimais: propertyAnimals.length,
            porcentagemOcupacao: Math.round(occupancyPercentage * 100) / 100, // Round to 2 decimal places
          },
          totalColaboradores: propertyEmployees.length,
          status: property.status,
        };
      });
      
      this.logger.log(`Found ${propertiesSummary.length} active properties with summary data`, 'getAllProperties');
      return ResponseHelper.successWithCount(propertiesSummary, 'Properties retrieved successfully');
    } catch (error) {
      this.logger.error('Error fetching properties:', error.message, 'getAllProperties');
      throw error;
    }
  }

  async getPropertyById(id: string): Promise<ApiResponse<any>> {
    this.logger.log(`Fetching property with id: ${id}`, 'getPropertyById');
    
    try {
      // Find property in mock data
      const property = PROPERTIES.find(p => p.id === id);
      
      if (!property) {
        this.logger.warn(`Property with id ${id} not found`, 'getPropertyById');
        return ResponseHelper.error('Property not found', 404);
      }
      
      // Check if property has been deleted
      if (property.deletedAt) {
        this.logger.warn(`Property with id ${id} has been deleted`, 'getPropertyById');
        return ResponseHelper.error('Property has been deleted', 404);
      }

      // Get all related data for the property
      const propertyLocations = LOCATIONS.filter(location => 
        location.propertyId === property.id && !location.deletedAt
      );

      const propertyAnimals = ANIMALS.filter(animal => 
        animal.propertyId === property.id && !animal.deletedAt
      );

      const propertyEmployeeIds = PROPERTYHASEMPLOYEE
        .filter(relation => relation.propertyId === property.id)
        .map(relation => relation.employeeId);

      const propertyEmployees = EMPLOYESS.filter(employee => 
        propertyEmployeeIds.includes(employee.id) && !employee.deletedAt
      );

      // Get location movements for this property
      const locationIds = propertyLocations.map(loc => loc.id);
      const propertyLocationMovements = LOCATION_MOVIMENTS.filter(movement =>
        locationIds.includes(movement.locationId)
      );

      // Get animal locations for this property
      const propertyAnimalLocations = ANIMAL_LOCATIONS.filter(animalLocation =>
        propertyLocationMovements.some(movement => movement.id === animalLocation.locationMovimentId)
      );

      // Get observations for this property's locations
      const propertyObservations = LOCATION_OBSERVATIONS.filter(observation =>
        locationIds.includes(observation.locationId)
      );

      // Get location qualities for this property's locations
      const propertyLocationQualities = LOCATION_QUALITIES.filter(quality =>
        locationIds.includes(quality.locationId)
      );

      // Calculate statistics
      const totalCapacity = propertyLocations.reduce((sum, location) => sum + location.capacity, 0);
      const occupancyPercentage = totalCapacity > 0 ? (propertyAnimals.length / totalCapacity) * 100 : 0;

      // Build complete property data with all related information
      const propertyWithRelatedData = {
        ...property,
        // Statistics
        statistics: {
          totalLocations: propertyLocations.length,
          totalAnimals: propertyAnimals.length,
          totalCapacity,
          occupancyPercentage: Math.round(occupancyPercentage * 100) / 100,
          totalEmployees: propertyEmployees.length,
        },
        // Related data
        locations: propertyLocations,
        animals: propertyAnimals,
        employees: propertyEmployees,
        locationMovements: propertyLocationMovements,
        animalLocations: propertyAnimalLocations,
        observations: propertyObservations,
        locationQualities: propertyLocationQualities,
      };
      
      // Return the complete property data with all related information
      this.logger.log(`Property ${id} retrieved successfully with related data`, 'getPropertyById');
      return ResponseHelper.successSingle(propertyWithRelatedData, 'Property retrieved successfully');
    } catch (error) {
      this.logger.error(`Error fetching property ${id}:`, error.message, 'getPropertyById');
      throw error;
    }
  }

  async createProperty(createPropertyDto: CreatePropertyDto, userId: string): Promise<ApiResponse<Property>> {
    this.logger.log(`Creating new property for user: ${userId}`, 'createProperty');
    
    try {
      // Generate unique ID for property
      const propertyId = uuidv4();
      
      // Create property object
      const newProperty: Property = {
        id: propertyId,
        code: createPropertyDto.code,
        name: createPropertyDto.name,
        description: createPropertyDto.description,
        street: createPropertyDto.street,
        number: createPropertyDto.number || '',
        neighborhood: createPropertyDto.neighborhood || '',
        city: createPropertyDto.city,
        state: createPropertyDto.state,
        country: createPropertyDto.country || 'Brasil',
        zipCode: createPropertyDto.zipCode,
        latitude: createPropertyDto.latitude,
        longitude: createPropertyDto.longitude,
        status: createPropertyDto.status,
        createdAt: new Date().toISOString(),
        deletedAt: null,
      };

      // Fetch climate data if latitude and longitude are available
      if (createPropertyDto.latitude && createPropertyDto.longitude) {
        this.logger.log(`Fetching climate data for property: ${createPropertyDto.name}`, 'createProperty');
        
        try {
          const climateData = await this.climateService.getClimateData(
            createPropertyDto.latitude, 
            createPropertyDto.longitude
          );
          
          // Prepare unified pasture planning data
          const pasturePlanningData: PasturePlanning[] = climateData.map(climate => ({
            month: climate.month,
            precipitation: parseFloat(climate.precipitation || '0'),
            temperature: parseFloat(climate.temperature || '0'),
            state: 'Good' // Will be updated by AI
          }));
          
          // Generate pasture planning
          this.logger.log(`Generating pasture planning for property: ${createPropertyDto.name}`, 'createProperty');
          try {
            const pasturePlanning = await this.climateService.generatePasturePlanning(
              createPropertyDto.latitude, 
              createPropertyDto.longitude
            );
            
            // Update pasture data with AI states
            const aiPastureData = (pasturePlanning as any).pasture || [];
            const finalPastureData: PasturePlanning[] = pasturePlanningData.map((item, index) => ({
              ...item,
              state: aiPastureData[index]?.state === 'Good' ? 'Good' : 
                     aiPastureData[index]?.state === 'Medium' ? 'Medium' : 'Poor'
            }));
            
            // Add pasture data to property
            newProperty.pasturePlanning = finalPastureData;
            
          } catch (planningError) {
            this.logger.warn('Error generating pasture planning, continuing without it', 'createProperty');
            // Add basic pasture data without AI states
            newProperty.pasturePlanning = pasturePlanningData;
          }
        } catch (climateError) {
          this.logger.warn('Error fetching climate data, continuing without it', 'createProperty');
        }
      } else {
        this.logger.warn('Latitude and longitude not provided, climate data will not be fetched', 'createProperty');
      }
      
      this.logger.log(`Property created successfully with ID: ${propertyId}`, 'createProperty');
      return ResponseHelper.successSingle(newProperty, 'Property created successfully');
    } catch (error) {
      this.logger.error('Error creating property:', error.message, 'createProperty');
      throw error;
    }
  }


  async updateProperty(id: string, updatePropertyDto: any): Promise<ApiResponse<any>> {
    this.logger.log(`Updating property with id: ${id}`, 'updateProperty');
    
    try {
      // Simulate current property fetch (in a real scenario, this would come from database)
      // For now, we'll assume we have access to current property data
      const currentProperty = await this.getPropertyById(id);
      
      // Check if city changed
      const cityChanged = updatePropertyDto.city && 
                         currentProperty.data?.city && 
                         updatePropertyDto.city !== currentProperty.data.city;
      
      // Check if latitude/longitude changed
      const coordinatesChanged = (updatePropertyDto.latitude && updatePropertyDto.longitude) &&
                                (updatePropertyDto.latitude !== currentProperty.data?.latitude ||
                                 updatePropertyDto.longitude !== currentProperty.data?.longitude);
      
      // Merge existing data with new provided data
      let updatedProperty = { 
        ...currentProperty.data, 
        ...updatePropertyDto,
        id: currentProperty.data.id, // Keep original ID
        createdAt: currentProperty.data.createdAt // Keep creation date
      };
      
      // If city changed or coordinates changed, fetch new climate data
      if (cityChanged || coordinatesChanged) {
        this.logger.log(`City or coordinates changed for property ${id}, fetching new climate data`, 'updateProperty');
        
        // Use new coordinates if provided, otherwise use current ones
        const latitude = updatePropertyDto.latitude || currentProperty.data?.latitude;
        const longitude = updatePropertyDto.longitude || currentProperty.data?.longitude;
        
        if (latitude && longitude) {
          try {
            // Fetch new climate data
            const climateData = await this.climateService.getClimateData(latitude, longitude);
            
            // Prepare unified pasture planning data
            const pasturePlanningData: PasturePlanning[] = climateData.map(climate => ({
              month: climate.month,
              precipitation: parseFloat(climate.precipitation || '0'),
              temperature: parseFloat(climate.temperature || '0'),
              state: 'Good' // Will be updated by AI
            }));
            
            // Generate new pasture planning
            this.logger.log(`Generating new pasture planning for property: ${id}`, 'updateProperty');
            try {
              const pasturePlanning = await this.climateService.generatePasturePlanning(
                latitude, 
                longitude
              );
              
              // Update pasture data with AI states
              const aiPastureData = (pasturePlanning as any).pasture || [];
              const finalPastureData: PasturePlanning[] = pasturePlanningData.map((item, index) => ({
                ...item,
                state: aiPastureData[index]?.state === 'Good' ? 'Good' : 
                       aiPastureData[index]?.state === 'Medium' ? 'Medium' : 'Poor'
              }));
              
              // Add new pasture data to updated property
              updatedProperty.pasturePlanning = finalPastureData;
              
              this.logger.log(`New climate and pasture data obtained successfully for property ${id}`, 'updateProperty');
              
            } catch (planningError) {
              this.logger.warn(`Error generating new pasture planning for property ${id}, continuing without it`, 'updateProperty');
              // Add basic pasture data without AI states
              updatedProperty.pasturePlanning = pasturePlanningData;
            }
          } catch (climateError) {
            this.logger.warn(`Error fetching new climate data for property ${id}, continuing without it`, 'updateProperty');
          }
        } else {
          this.logger.warn(`Latitude and longitude not available for property ${id}, climate data will not be updated`, 'updateProperty');
        }
      } else {
        this.logger.log(`City and coordinates did not change for property ${id}, keeping current climate data`, 'updateProperty');
      }
      
      this.logger.log(`Property updated successfully with ID: ${id}`, 'updateProperty');
      return ResponseHelper.successSingle(updatedProperty, 'Property updated successfully');
      
    } catch (error) {
      this.logger.error(`Error updating property ${id}:`, error.message, 'updateProperty');
      throw error;
    }
  }

  async deleteProperty(id: string): Promise<ApiResponse<null>> {
    this.logger.log(`Deleting property with id: ${id}`, 'deleteProperty');
    
    try {
      // Check if property exists
      const currentProperty = await this.getPropertyById(id);
      
      if (!currentProperty.data) {
        this.logger.warn(`Property with id ${id} not found for deletion`, 'deleteProperty');
        return ResponseHelper.successSingle(null, 'Property not found');
      }
      
      // Check if property is already deleted
      if (currentProperty.data.deletedAt) {
        this.logger.warn(`Property with id ${id} is already deleted`, 'deleteProperty');
        return ResponseHelper.successSingle(null, 'Property is already deleted');
      }
      
      // Implement soft delete - mark as deleted instead of physically removing
      const deletedProperty = {
        ...currentProperty.data,
        deletedAt: new Date().toISOString(),
        status: PropertyStatus.INACTIVE
      };
      
      // In a real scenario, this would update the database
      // For now, we'll simulate the operation
      this.logger.log(`Property ${id} marked as deleted at ${deletedProperty.deletedAt}`, 'deleteProperty');
      
      return ResponseHelper.successSingle(null, 'Property deleted successfully');
      
    } catch (error) {
      this.logger.error(`Error deleting property ${id}:`, error.message, 'deleteProperty');
      throw error;
    }
  }

  async restoreProperty(id: string): Promise<ApiResponse<any>> {
    this.logger.log(`Restoring property with id: ${id}`, 'restoreProperty');
    
    try {
      // Find property (including deleted ones)
      const property = PROPERTIES.find(p => p.id === id);
      
      if (!property) {
        this.logger.warn(`Property with id ${id} not found for restoration`, 'restoreProperty');
        return ResponseHelper.successSingle(null, 'Property not found');
      }
      
      // Check if property is deleted
      if (!property.deletedAt) {
        this.logger.warn(`Property with id ${id} is not deleted`, 'restoreProperty');
        return ResponseHelper.successSingle(null, 'Property is not deleted');
      }
      
      // Restore property
      const restoredProperty = {
        ...property,
        deletedAt: null,
        status: PropertyStatus.ACTIVE
      };
      
      // In a real scenario, this would update the database
      this.logger.log(`Property ${id} restored successfully`, 'restoreProperty');
      
      return ResponseHelper.successSingle(restoredProperty, 'Property restored successfully');
      
    } catch (error) {
      this.logger.error(`Error restoring property ${id}:`, error.message, 'restoreProperty');
      throw error;
    }
  }
}
