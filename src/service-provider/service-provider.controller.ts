import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ServiceProviderService } from './service-provider.service';

@ApiTags('service-providers')
@Controller('service-provider')
export class ServiceProviderController {
  private readonly logger = new Logger(ServiceProviderController.name);

  constructor(private readonly serviceProviderService: ServiceProviderService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os prestadores de serviço' })
  @ApiResponse({ status: 200, description: 'Lista de prestadores de serviço retornada com sucesso' })
  async getAllServiceProviders() {
    this.logger.log('GET /service-provider - Request received', 'getAllServiceProviders');
    
    try {
      const result = await this.serviceProviderService.getAllServiceProviders();
      this.logger.log('GET /service-provider - Request completed successfully', 'getAllServiceProviders');
      return result;
    } catch (error) {
      this.logger.error('GET /service-provider - Request failed', error.stack, 'getAllServiceProviders');
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter prestador de serviço por ID' })
  @ApiParam({ name: 'id', description: 'ID do prestador de serviço' })
  @ApiResponse({ status: 200, description: 'Prestador de serviço encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Prestador de serviço não encontrado' })
  async getServiceProviderById(@Param('id') id: string) {
    this.logger.log(`GET /service-provider/${id} - Request received`, 'getServiceProviderById');
    
    try {
      const result = await this.serviceProviderService.getServiceProviderById(id);
      this.logger.log(`GET /service-provider/${id} - Request completed successfully`, 'getServiceProviderById');
      return result;
    } catch (error) {
      this.logger.error(`GET /service-provider/${id} - Request failed`, error.stack, 'getServiceProviderById');
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo prestador de serviço' })
  @ApiResponse({ status: 201, description: 'Prestador de serviço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createServiceProvider(@Body() createServiceProviderDto: any) {
    this.logger.log('POST /service-provider - Request received', 'createServiceProvider');
    
    try {
      const result = await this.serviceProviderService.createServiceProvider(createServiceProviderDto);
      this.logger.log('POST /service-provider - Request completed successfully', 'createServiceProvider');
      return result;
    } catch (error) {
      this.logger.error('POST /service-provider - Request failed', error.stack, 'createServiceProvider');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar prestador de serviço' })
  @ApiParam({ name: 'id', description: 'ID do prestador de serviço' })
  @ApiResponse({ status: 200, description: 'Prestador de serviço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Prestador de serviço não encontrado' })
  async updateServiceProvider(@Param('id') id: string, @Body() updateServiceProviderDto: any) {
    this.logger.log(`PUT /service-provider/${id} - Request received`, 'updateServiceProvider');
    
    try {
      const result = await this.serviceProviderService.updateServiceProvider(id, updateServiceProviderDto);
      this.logger.log(`PUT /service-provider/${id} - Request completed successfully`, 'updateServiceProvider');
      return result;
    } catch (error) {
      this.logger.error(`PUT /service-provider/${id} - Request failed`, error.stack, 'updateServiceProvider');
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar prestador de serviço' })
  @ApiParam({ name: 'id', description: 'ID do prestador de serviço' })
  @ApiResponse({ status: 200, description: 'Prestador de serviço deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Prestador de serviço não encontrado' })
  async deleteServiceProvider(@Param('id') id: string) {
    this.logger.log(`DELETE /service-provider/${id} - Request received`, 'deleteServiceProvider');
    
    try {
      const result = await this.serviceProviderService.deleteServiceProvider(id);
      this.logger.log(`DELETE /service-provider/${id} - Request completed successfully`, 'deleteServiceProvider');
      return result;
    } catch (error) {
      this.logger.error(`DELETE /service-provider/${id} - Request failed`, error.stack, 'deleteServiceProvider');
      throw error;
    }
  }
}
