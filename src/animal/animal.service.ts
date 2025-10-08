import { Injectable, Logger } from '@nestjs/common';
import { ResponseHelper } from '../common/helpers/response.helper';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Injectable()
export class AnimalService {
  private readonly logger = new Logger(AnimalService.name);

  async getAllAnimals(): Promise<ApiResponse<any[]>> {
    this.logger.log('Fetching all animals', 'getAllAnimals');
    return ResponseHelper.successWithCount([], 'Animals retrieved successfully');
  }

  async getAnimalById(id: string): Promise<ApiResponse<any>> {
    this.logger.log(`Fetching animal with id: ${id}`, 'getAnimalById');
    return ResponseHelper.successSingle(null, 'Animal retrieved successfully');
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
