import { Injectable, Logger } from '@nestjs/common';
import { ResponseHelper } from '../common/helpers/response.helper';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);

  async getAllProperties(): Promise<ApiResponse<any[]>> {
    this.logger.log('Fetching all properties', 'getAllProperties');
    return ResponseHelper.successWithCount([], 'Properties retrieved successfully');
  }

  async getPropertyById(id: string): Promise<ApiResponse<any>> {
    this.logger.log(`Fetching property with id: ${id}`, 'getPropertyById');
    return ResponseHelper.successSingle(null, 'Property retrieved successfully');
  }

  async createProperty(createPropertyDto: any): Promise<ApiResponse<any>> {
    this.logger.log('Creating new property', 'createProperty');
    return ResponseHelper.successSingle(createPropertyDto, 'Property created successfully');
  }

  async updateProperty(id: string, updatePropertyDto: any): Promise<ApiResponse<any>> {
    this.logger.log(`Updating property with id: ${id}`, 'updateProperty');
    return ResponseHelper.successSingle(updatePropertyDto, 'Property updated successfully');
  }

  async deleteProperty(id: string): Promise<ApiResponse<null>> {
    this.logger.log(`Deleting property with id: ${id}`, 'deleteProperty');
    return ResponseHelper.successSingle(null, 'Property deleted successfully');
  }
}
