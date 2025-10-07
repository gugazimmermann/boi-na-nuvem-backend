import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);

  async getAllProperties() {
    this.logger.log('Fetching all properties', 'getAllProperties');
    return { success: true, data: [], count: 0 };
  }

  async getPropertyById(id: string) {
    this.logger.log(`Fetching property with id: ${id}`, 'getPropertyById');
    return { success: true, data: null };
  }

  async createProperty(createPropertyDto: any) {
    this.logger.log('Creating new property', 'createProperty');
    return { success: true, data: createPropertyDto };
  }

  async updateProperty(id: string, updatePropertyDto: any) {
    this.logger.log(`Updating property with id: ${id}`, 'updateProperty');
    return { success: true, data: updatePropertyDto };
  }

  async deleteProperty(id: string) {
    this.logger.log(`Deleting property with id: ${id}`, 'deleteProperty');
    return { success: true, message: 'Property deleted successfully' };
  }
}
