import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LocationService } from './location.service';

@ApiTags('locations')
@Controller('location')
export class LocationController {
  private readonly logger = new Logger(LocationController.name);

  constructor(private readonly locationService: LocationService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as localizações' })
  @ApiResponse({ status: 200, description: 'Lista de localizações retornada com sucesso' })
  async getAllLocations() {
    this.logger.log('GET /location - Request received', 'getAllLocations');
    
    try {
      const result = await this.locationService.getAllLocations();
      this.logger.log('GET /location - Request completed successfully', 'getAllLocations');
      return result;
    } catch (error) {
      this.logger.error('GET /location - Request failed', error.stack, 'getAllLocations');
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter localização por ID' })
  @ApiParam({ name: 'id', description: 'ID da localização' })
  @ApiResponse({ status: 200, description: 'Localização encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Localização não encontrada' })
  async getLocationById(@Param('id') id: string) {
    this.logger.log(`GET /location/${id} - Request received`, 'getLocationById');
    
    try {
      const result = await this.locationService.getLocationById(id);
      this.logger.log(`GET /location/${id} - Request completed successfully`, 'getLocationById');
      return result;
    } catch (error) {
      this.logger.error(`GET /location/${id} - Request failed`, error.stack, 'getLocationById');
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova localização' })
  @ApiResponse({ status: 201, description: 'Localização criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createLocation(@Body() createLocationDto: any) {
    this.logger.log('POST /location - Request received', 'createLocation');
    
    try {
      const result = await this.locationService.createLocation(createLocationDto);
      this.logger.log('POST /location - Request completed successfully', 'createLocation');
      return result;
    } catch (error) {
      this.logger.error('POST /location - Request failed', error.stack, 'createLocation');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar localização' })
  @ApiParam({ name: 'id', description: 'ID da localização' })
  @ApiResponse({ status: 200, description: 'Localização atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Localização não encontrada' })
  async updateLocation(@Param('id') id: string, @Body() updateLocationDto: any) {
    this.logger.log(`PUT /location/${id} - Request received`, 'updateLocation');
    
    try {
      const result = await this.locationService.updateLocation(id, updateLocationDto);
      this.logger.log(`PUT /location/${id} - Request completed successfully`, 'updateLocation');
      return result;
    } catch (error) {
      this.logger.error(`PUT /location/${id} - Request failed`, error.stack, 'updateLocation');
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar localização' })
  @ApiParam({ name: 'id', description: 'ID da localização' })
  @ApiResponse({ status: 200, description: 'Localização deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Localização não encontrada' })
  async deleteLocation(@Param('id') id: string) {
    this.logger.log(`DELETE /location/${id} - Request received`, 'deleteLocation');
    
    try {
      const result = await this.locationService.deleteLocation(id);
      this.logger.log(`DELETE /location/${id} - Request completed successfully`, 'deleteLocation');
      return result;
    } catch (error) {
      this.logger.error(`DELETE /location/${id} - Request failed`, error.stack, 'deleteLocation');
      throw error;
    }
  }
}
