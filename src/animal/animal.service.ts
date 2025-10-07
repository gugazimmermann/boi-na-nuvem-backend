import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AnimalService {
  private readonly logger = new Logger(AnimalService.name);

  async getAllAnimals() {
    this.logger.log('Fetching all animals', 'getAllAnimals');
    return { success: true, data: [], count: 0 };
  }

  async getAnimalById(id: string) {
    this.logger.log(`Fetching animal with id: ${id}`, 'getAnimalById');
    return { success: true, data: null };
  }

  async createAnimal(createAnimalDto: any) {
    this.logger.log('Creating new animal', 'createAnimal');
    return { success: true, data: createAnimalDto };
  }

  async updateAnimal(id: string, updateAnimalDto: any) {
    this.logger.log(`Updating animal with id: ${id}`, 'updateAnimal');
    return { success: true, data: updateAnimalDto };
  }

  async deleteAnimal(id: string) {
    this.logger.log(`Deleting animal with id: ${id}`, 'deleteAnimal');
    return { success: true, message: 'Animal deleted successfully' };
  }
}
