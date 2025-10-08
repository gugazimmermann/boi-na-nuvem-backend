import { Controller, Get, Logger } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { ResponseHelper } from './common/helpers/response.helper';
import { ApiResponse } from './common/interfaces/api-response.interface';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Throttle({ short: { limit: 5, ttl: 1000 } })
  @CacheKey('app-info')
  @CacheTTL(300)
  async getAppInfo(): Promise<ApiResponse<{ title: string; version: string; environment: string }>> {
    this.logger.log('GET / - Request received', 'getAppInfo');
    
    try {
      const result = await this.appService.getAppInfo();
      this.logger.log('GET / - Request completed successfully', 'getAppInfo');
      return ResponseHelper.successSingle(result, 'Application information retrieved successfully');
    } catch (error) {
      this.logger.error('GET / - Request failed', error.stack, 'getAppInfo');
      throw error;
    }
  }

}
