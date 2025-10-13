import { Injectable, Logger } from '@nestjs/common';
import { ResponseHelper } from '../common/helpers/response.helper';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { ANIMALS } from '../mocks/animals';

@Injectable()
export class AnimalService {
  private readonly logger = new Logger(AnimalService.name);

  async getAllAnimals(): Promise<ApiResponse<any[]>> {
    this.logger.log('Fetching all animals', 'getAllAnimals');
    
    try {
      // Filter only non-deleted animals
      const activeAnimals = ANIMALS.filter(animal => !animal.deletedAt);
      
      this.logger.log(`Found ${activeAnimals.length} active animals`, 'getAllAnimals');
      return ResponseHelper.successWithCount(activeAnimals, 'Animals retrieved successfully');
    } catch (error) {
      this.logger.error('Error fetching animals:', error.message, 'getAllAnimals');
      throw error;
    }
  }

  async getAnimalById(id: string): Promise<ApiResponse<any>> {
    this.logger.log(`Fetching animal with id: ${id}`, 'getAnimalById');
    
    try {
      // Find animal in mock data
      const animal = ANIMALS.find(a => a.id === id);
      
      if (!animal) {
        this.logger.warn(`Animal with id ${id} not found`, 'getAnimalById');
        return ResponseHelper.successSingle(null, 'Animal not found');
      }
      
      // Check if animal has been deleted
      if (animal.deletedAt) {
        this.logger.warn(`Animal with id ${id} has been deleted`, 'getAnimalById');
        return ResponseHelper.successSingle(null, 'Animal has been deleted');
      }
      
      return ResponseHelper.successSingle(animal, 'Animal retrieved successfully');
    } catch (error) {
      this.logger.error(`Error fetching animal ${id}:`, error.message, 'getAnimalById');
      throw error;
    }
  }

  async createAnimal(createAnimalDto: any): Promise<ApiResponse<any>> {
    this.logger.log('Creating new animal', 'createAnimal');
    return ResponseHelper.successSingle(createAnimalDto, 'Animal created successfully');
  }

  async updateAnimal(id: string, updateAnimalDto: any): Promise<ApiResponse<any>> {
    this.logger.log(`Updating animal with id: ${id}`, 'updateAnimal');
    return ResponseHelper.successSingle(updateAnimalDto, 'Animal updated successfully');
  }

  async deleteAnimal(id: string): Promise<ApiResponse<null>> {
    this.logger.log(`Deleting animal with id: ${id}`, 'deleteAnimal');
    return ResponseHelper.successSingle(null, 'Animal deleted successfully');
  }
}
