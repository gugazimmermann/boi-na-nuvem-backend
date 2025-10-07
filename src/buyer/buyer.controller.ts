import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BuyerService } from './buyer.service';

@ApiTags('buyers')
@Controller('buyer')
export class BuyerController {
  private readonly logger = new Logger(BuyerController.name);

  constructor(private readonly buyerService: BuyerService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os compradores' })
  @ApiResponse({ status: 200, description: 'Lista de compradores retornada com sucesso' })
  async getAllBuyers() {
    this.logger.log('GET /buyer - Request received', 'getAllBuyers');
    
    try {
      const result = await this.buyerService.getAllBuyers();
      this.logger.log('GET /buyer - Request completed successfully', 'getAllBuyers');
      return result;
    } catch (error) {
      this.logger.error('GET /buyer - Request failed', error.stack, 'getAllBuyers');
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter comprador por ID' })
  @ApiParam({ name: 'id', description: 'ID do comprador' })
  @ApiResponse({ status: 200, description: 'Comprador encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Comprador não encontrado' })
  async getBuyerById(@Param('id') id: string) {
    this.logger.log(`GET /buyer/${id} - Request received`, 'getBuyerById');
    
    try {
      const result = await this.buyerService.getBuyerById(id);
      this.logger.log(`GET /buyer/${id} - Request completed successfully`, 'getBuyerById');
      return result;
    } catch (error) {
      this.logger.error(`GET /buyer/${id} - Request failed`, error.stack, 'getBuyerById');
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo comprador' })
  @ApiResponse({ status: 201, description: 'Comprador criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createBuyer(@Body() createBuyerDto: any) {
    this.logger.log('POST /buyer - Request received', 'createBuyer');
    
    try {
      const result = await this.buyerService.createBuyer(createBuyerDto);
      this.logger.log('POST /buyer - Request completed successfully', 'createBuyer');
      return result;
    } catch (error) {
      this.logger.error('POST /buyer - Request failed', error.stack, 'createBuyer');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar comprador' })
  @ApiParam({ name: 'id', description: 'ID do comprador' })
  @ApiResponse({ status: 200, description: 'Comprador atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Comprador não encontrado' })
  async updateBuyer(@Param('id') id: string, @Body() updateBuyerDto: any) {
    this.logger.log(`PUT /buyer/${id} - Request received`, 'updateBuyer');
    
    try {
      const result = await this.buyerService.updateBuyer(id, updateBuyerDto);
      this.logger.log(`PUT /buyer/${id} - Request completed successfully`, 'updateBuyer');
      return result;
    } catch (error) {
      this.logger.error(`PUT /buyer/${id} - Request failed`, error.stack, 'updateBuyer');
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar comprador' })
  @ApiParam({ name: 'id', description: 'ID do comprador' })
  @ApiResponse({ status: 200, description: 'Comprador deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Comprador não encontrado' })
  async deleteBuyer(@Param('id') id: string) {
    this.logger.log(`DELETE /buyer/${id} - Request received`, 'deleteBuyer');
    
    try {
      const result = await this.buyerService.deleteBuyer(id);
      this.logger.log(`DELETE /buyer/${id} - Request completed successfully`, 'deleteBuyer');
      return result;
    } catch (error) {
      this.logger.error(`DELETE /buyer/${id} - Request failed`, error.stack, 'deleteBuyer');
      throw error;
    }
  }
}
