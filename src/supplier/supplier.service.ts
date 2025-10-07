import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);

  async getAllSuppliers() {
    this.logger.log('Fetching all suppliers', 'getAllSuppliers');
    return { success: true, data: [], count: 0 };
  }

  async getSupplierById(id: string) {
    this.logger.log(`Fetching supplier with id: ${id}`, 'getSupplierById');
    return { success: true, data: null };
  }

  async createSupplier(createSupplierDto: any) {
    this.logger.log('Creating new supplier', 'createSupplier');
    return { success: true, data: createSupplierDto };
  }

  async updateSupplier(id: string, updateSupplierDto: any) {
    this.logger.log(`Updating supplier with id: ${id}`, 'updateSupplier');
    return { success: true, data: updateSupplierDto };
  }

  async deleteSupplier(id: string) {
    this.logger.log(`Deleting supplier with id: ${id}`, 'deleteSupplier');
    return { success: true, message: 'Supplier deleted successfully' };
  }
}
