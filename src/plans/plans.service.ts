import { Injectable } from '@nestjs/common';
import plans from '../mocks/plans';

@Injectable()
export class PlansService {
  getPlans() {
    // Sort plans by price in ascending order
    return plans.sort((a, b) => a.price - b.price);
  }
}
