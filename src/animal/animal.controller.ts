import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AnimalService } from './animal.service';

@ApiTags('animals')
@Controller('animal')
export class AnimalController {
  private readonly logger = new Logger(AnimalController.name);

  constructor(private readonly animalService: AnimalService) {}

  @Get()
  @Throttle({ short: { limit: 20, ttl: 1000 } })
  @ApiOperation({ summary: 'Get all animals' })
  @ApiResponse({ status: 200, description: 'List of animals returned successfully' })
  async getAllAnimals() {
    this.logger.log('GET /animal - Request received', 'getAllAnimals');
    
    try {
      const result = await this.animalService.getAllAnimals();
      this.logger.log('GET /animal - Request completed successfully', 'getAllAnimals');
      return result;
    } catch (error) {
      this.logger.error('GET /animal - Request failed', error.stack, 'getAllAnimals');
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get animal by ID' })
  @ApiParam({ name: 'id', description: 'Animal ID' })
  @ApiResponse({ status: 200, description: 'Animal found successfully' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  async getAnimalById(@Param('id') id: string) {
    this.logger.log(`GET /animal/${id} - Request received`, 'getAnimalById');
    
    try {
      const result = await this.animalService.getAnimalById(id);
      this.logger.log(`GET /animal/${id} - Request completed successfully`, 'getAnimalById');
      return result;
    } catch (error) {
      this.logger.error(`GET /animal/${id} - Request failed`, error.stack, 'getAnimalById');
      throw error;
    }
  }

  @Post()
  @Throttle({ short: { limit: 5, ttl: 1000 } })
  @ApiOperation({ summary: 'Create new animal' })
  @ApiResponse({ status: 201, description: 'Animal created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async createAnimal(@Body() createAnimalDto: any) {
    this.logger.log('POST /animal - Request received', 'createAnimal');
    
    try {
      const result = await this.animalService.createAnimal(createAnimalDto);
      this.logger.log('POST /animal - Request completed successfully', 'createAnimal');
      return result;
    } catch (error) {
      this.logger.error('POST /animal - Request failed', error.stack, 'createAnimal');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update animal' })
  @ApiParam({ name: 'id', description: 'Animal ID' })
  @ApiResponse({ status: 200, description: 'Animal updated successfully' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  async updateAnimal(@Param('id') id: string, @Body() updateAnimalDto: any) {
    this.logger.log(`PUT /animal/${id} - Request received`, 'updateAnimal');
    
    try {
      const result = await this.animalService.updateAnimal(id, updateAnimalDto);
      this.logger.log(`PUT /animal/${id} - Request completed successfully`, 'updateAnimal');
      return result;
    } catch (error) {
      this.logger.error(`PUT /animal/${id} - Request failed`, error.stack, 'updateAnimal');
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete animal' })
  @ApiParam({ name: 'id', description: 'Animal ID' })
  @ApiResponse({ status: 200, description: 'Animal deleted successfully' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  async deleteAnimal(@Param('id') id: string) {
    this.logger.log(`DELETE /animal/${id} - Request received`, 'deleteAnimal');
    
    try {
      const result = await this.animalService.deleteAnimal(id);
      this.logger.log(`DELETE /animal/${id} - Request completed successfully`, 'deleteAnimal');
      return result;
    } catch (error) {
      this.logger.error(`DELETE /animal/${id} - Request failed`, error.stack, 'deleteAnimal');
      throw error;
    }
  }
}
