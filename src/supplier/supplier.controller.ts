import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';

@ApiTags('suppliers')
@Controller('supplier')
export class SupplierController {
  private readonly logger = new Logger(SupplierController.name);

  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os fornecedores' })
  @ApiResponse({ status: 200, description: 'Lista de fornecedores retornada com sucesso' })
  async getAllSuppliers() {
    this.logger.log('GET /supplier - Request received', 'getAllSuppliers');
    
    try {
      const result = await this.supplierService.getAllSuppliers();
      this.logger.log('GET /supplier - Request completed successfully', 'getAllSuppliers');
      return result;
    } catch (error) {
      this.logger.error('GET /supplier - Request failed', error.stack, 'getAllSuppliers');
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter fornecedor por ID' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({ status: 200, description: 'Fornecedor encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  async getSupplierById(@Param('id') id: string) {
    this.logger.log(`GET /supplier/${id} - Request received`, 'getSupplierById');
    
    try {
      const result = await this.supplierService.getSupplierById(id);
      this.logger.log(`GET /supplier/${id} - Request completed successfully`, 'getSupplierById');
      return result;
    } catch (error) {
      this.logger.error(`GET /supplier/${id} - Request failed`, error.stack, 'getSupplierById');
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo fornecedor' })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createSupplier(@Body() createSupplierDto: any) {
    this.logger.log('POST /supplier - Request received', 'createSupplier');
    
    try {
      const result = await this.supplierService.createSupplier(createSupplierDto);
      this.logger.log('POST /supplier - Request completed successfully', 'createSupplier');
      return result;
    } catch (error) {
      this.logger.error('POST /supplier - Request failed', error.stack, 'createSupplier');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar fornecedor' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({ status: 200, description: 'Fornecedor atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  async updateSupplier(@Param('id') id: string, @Body() updateSupplierDto: any) {
    this.logger.log(`PUT /supplier/${id} - Request received`, 'updateSupplier');
    
    try {
      const result = await this.supplierService.updateSupplier(id, updateSupplierDto);
      this.logger.log(`PUT /supplier/${id} - Request completed successfully`, 'updateSupplier');
      return result;
    } catch (error) {
      this.logger.error(`PUT /supplier/${id} - Request failed`, error.stack, 'updateSupplier');
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar fornecedor' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({ status: 200, description: 'Fornecedor deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  async deleteSupplier(@Param('id') id: string) {
    this.logger.log(`DELETE /supplier/${id} - Request received`, 'deleteSupplier');
    
    try {
      const result = await this.supplierService.deleteSupplier(id);
      this.logger.log(`DELETE /supplier/${id} - Request completed successfully`, 'deleteSupplier');
      return result;
    } catch (error) {
      this.logger.error(`DELETE /supplier/${id} - Request failed`, error.stack, 'deleteSupplier');
      throw error;
    }
  }
}
