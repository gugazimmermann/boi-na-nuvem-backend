import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PropertyService } from './property.service';

@ApiTags('properties')
@Controller('property')
export class PropertyController {
  private readonly logger = new Logger(PropertyController.name);

  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as propriedades' })
  @ApiResponse({ status: 200, description: 'Lista de propriedades retornada com sucesso' })
  async getAllProperties() {
    this.logger.log('GET /property - Request received', 'getAllProperties');
    
    try {
      const result = await this.propertyService.getAllProperties();
      this.logger.log('GET /property - Request completed successfully', 'getAllProperties');
      return result;
    } catch (error) {
      this.logger.error('GET /property - Request failed', error.stack, 'getAllProperties');
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter propriedade por ID' })
  @ApiParam({ name: 'id', description: 'ID da propriedade' })
  @ApiResponse({ status: 200, description: 'Propriedade encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
  async getPropertyById(@Param('id') id: string) {
    this.logger.log(`GET /property/${id} - Request received`, 'getPropertyById');
    
    try {
      const result = await this.propertyService.getPropertyById(id);
      this.logger.log(`GET /property/${id} - Request completed successfully`, 'getPropertyById');
      return result;
    } catch (error) {
      this.logger.error(`GET /property/${id} - Request failed`, error.stack, 'getPropertyById');
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova propriedade' })
  @ApiResponse({ status: 201, description: 'Propriedade criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createProperty(@Body() createPropertyDto: any) {
    this.logger.log('POST /property - Request received', 'createProperty');
    
    try {
      const result = await this.propertyService.createProperty(createPropertyDto);
      this.logger.log('POST /property - Request completed successfully', 'createProperty');
      return result;
    } catch (error) {
      this.logger.error('POST /property - Request failed', error.stack, 'createProperty');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar propriedade' })
  @ApiParam({ name: 'id', description: 'ID da propriedade' })
  @ApiResponse({ status: 200, description: 'Propriedade atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
  async updateProperty(@Param('id') id: string, @Body() updatePropertyDto: any) {
    this.logger.log(`PUT /property/${id} - Request received`, 'updateProperty');
    
    try {
      const result = await this.propertyService.updateProperty(id, updatePropertyDto);
      this.logger.log(`PUT /property/${id} - Request completed successfully`, 'updateProperty');
      return result;
    } catch (error) {
      this.logger.error(`PUT /property/${id} - Request failed`, error.stack, 'updateProperty');
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar propriedade' })
  @ApiParam({ name: 'id', description: 'ID da propriedade' })
  @ApiResponse({ status: 200, description: 'Propriedade deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
  async deleteProperty(@Param('id') id: string) {
    this.logger.log(`DELETE /property/${id} - Request received`, 'deleteProperty');
    
    try {
      const result = await this.propertyService.deleteProperty(id);
      this.logger.log(`DELETE /property/${id} - Request completed successfully`, 'deleteProperty');
      return result;
    } catch (error) {
      this.logger.error(`DELETE /property/${id} - Request failed`, error.stack, 'deleteProperty');
      throw error;
    }
  }
}
