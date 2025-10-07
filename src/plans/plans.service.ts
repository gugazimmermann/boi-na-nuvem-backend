import { Injectable, Logger } from '@nestjs/common';
import plans, { Plan } from '../mocks/plans';

@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);

  getAllPlans() {
    this.logger.log('Fetching all plans', 'getAllPlans');
    
    try {
      const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
      
      this.logger.log(`Successfully retrieved ${sortedPlans.length} plans`, 'getAllPlans');
      
      return {
        success: true,
        data: sortedPlans,
        count: sortedPlans.length
      };
    } catch (error) {
      this.logger.error('Error fetching plans', error.stack, 'getAllPlans');
      throw error;
    }
  }
}
