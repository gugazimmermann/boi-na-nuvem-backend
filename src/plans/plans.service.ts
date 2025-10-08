import { Injectable, Logger } from '@nestjs/common';
import plans, { Plan } from '../mocks/plans';
import { ResponseHelper } from '../common/helpers/response.helper';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);

  getAllPlans(): ApiResponse<Plan[]> {
    this.logger.log('Fetching all plans', 'getAllPlans');
    
    try {
      const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
      
      this.logger.log(`Successfully retrieved ${sortedPlans.length} plans`, 'getAllPlans');
      
      return ResponseHelper.successWithCount(sortedPlans, 'Plans retrieved successfully');
    } catch (error) {
      this.logger.error('Error fetching plans', error.stack, 'getAllPlans');
      throw error;
    }
  }
}
