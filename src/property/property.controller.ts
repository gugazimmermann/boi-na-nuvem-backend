import { Controller, Get, Post, Put, Delete, Body, Param, Logger, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { PropertyService } from './property.service';
import { ClimateService } from './climate.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto/property.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('properties')
@Controller('property')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PropertyController {
  private readonly logger = new Logger(PropertyController.name);

  constructor(
    private readonly propertyService: PropertyService,
    private readonly climateService: ClimateService,
  ) {}

  @Get()
  @Throttle({ short: { limit: 200, ttl: 1000 } }) // 200 requests por segundo
  @ApiOperation({ summary: 'Get all properties' })
  @ApiResponse({ status: 200, description: 'Properties list returned successfully' })
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
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiResponse({ status: 200, description: 'Property found successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async getPropertyById(@Param('id') id: string) {
    this.logger.log(`GET /property/${id} - Request received`, 'getPropertyById');
    
    try {
      const result = await this.propertyService.getPropertyById(id);
      
      // Check if the result indicates an error
      if (!result.success) {
        this.logger.warn(`GET /property/${id} - Property not found or deleted`, 'getPropertyById');
        return {
          success: false,
          data: null,
          message: result.message,
          statusCode: result.statusCode || 404
        };
      }
      
      this.logger.log(`GET /property/${id} - Request completed successfully`, 'getPropertyById');
      return result;
    } catch (error) {
      this.logger.error(`GET /property/${id} - Request failed`, error.stack, 'getPropertyById');
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new property' })
  @ApiResponse({ status: 201, description: 'Property created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Invalid or missing access token' })
  async createProperty(@Body() createPropertyDto: CreatePropertyDto, @Request() req: any) {
    this.logger.log('POST /property - Request received', 'createProperty');
    
    try {
      // Add authenticated user information
      const userId = req.user.userId;
      const result = await this.propertyService.createProperty(createPropertyDto, userId);
      this.logger.log('POST /property - Request completed successfully', 'createProperty');
      return result;
    } catch (error) {
      this.logger.error('POST /property - Request failed', error.stack, 'createProperty');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update property' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiResponse({ status: 200, description: 'Property updated successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async updateProperty(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
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
  @ApiOperation({ summary: 'Delete property' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiResponse({ status: 200, description: 'Property deleted successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
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

  @Get('climate/pasture-planning')
  @ApiOperation({ summary: 'Generate pasture planning based on climate data' })
  @ApiQuery({ name: 'lat', description: 'Property latitude', type: 'number' })
  @ApiQuery({ name: 'lon', description: 'Property longitude', type: 'number' })
  @ApiResponse({ status: 200, description: 'Pasture planning generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async getPasturePlanning(@Query('lat') lat: string, @Query('lon') lon: string) {
    this.logger.log(`GET /property/climate/pasture-planning - Request received for lat: ${lat}, lon: ${lon}`, 'getPasturePlanning');
    
    try {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      
      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error('Latitude and longitude must be valid numbers');
      }
      
      const result = await this.climateService.generatePasturePlanning(latitude, longitude);
      this.logger.log(`GET /property/climate/pasture-planning - Request completed successfully`, 'getPasturePlanning');
      return { planning: result };
    } catch (error) {
      this.logger.error(`GET /property/climate/pasture-planning - Request failed`, error.stack, 'getPasturePlanning');
      throw error;
    }
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore deleted property' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiResponse({ status: 200, description: 'Property restored successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async restoreProperty(@Param('id') id: string) {
    this.logger.log(`POST /property/${id}/restore - Request received`, 'restoreProperty');
    
    try {
      const result = await this.propertyService.restoreProperty(id);
      this.logger.log(`POST /property/${id}/restore - Request completed successfully`, 'restoreProperty');
      return result;
    } catch (error) {
      this.logger.error(`POST /property/${id}/restore - Request failed`, error.stack, 'restoreProperty');
      throw error;
    }
  }

}
