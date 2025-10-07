import { Controller, Get, Logger } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { PlansResponseDto } from './dto/plan.dto';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  private readonly logger = new Logger(PlansController.name);

  constructor(private readonly plansService: PlansService) {}

  @Get()
  @Throttle({ short: { limit: 15, ttl: 1000 } })
  @ApiOperation({ summary: 'Obter todos os planos disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de planos retornada com sucesso',
    type: PlansResponseDto,
  })
  async getAllPlans() {
    this.logger.log('GET /plans - Request received', 'getAllPlans');
    
    try {
      const result = await this.plansService.getAllPlans();
      this.logger.log('GET /plans - Request completed successfully', 'getAllPlans');
      return result;
    } catch (error) {
      this.logger.error('GET /plans - Request failed', error.stack, 'getAllPlans');
      throw error;
    }
  }
}
