import { Controller, Get, Logger } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Throttle({ short: { limit: 5, ttl: 1000 } })
  getAppInfo(): { title: string; version: string } {
    this.logger.log('GET / - Request received', 'getAppInfo');
    
    try {
      const result = this.appService.getAppInfo();
      this.logger.log('GET / - Request completed successfully', 'getAppInfo');
      return result;
    } catch (error) {
      this.logger.error('GET / - Request failed', error.stack, 'getAppInfo');
      throw error;
    }
  }

}
