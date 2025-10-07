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

  @Get('health')
  @Throttle({ short: { limit: 20, ttl: 1000 } })
  getHealth(): { status: string; timestamp: string } {
    this.logger.log('GET /health - Request received', 'getHealth');
    
    try {
      const result = this.appService.getHealth();
      this.logger.log('GET /health - Request completed successfully', 'getHealth');
      return result;
    } catch (error) {
      this.logger.error('GET /health - Request failed', error.stack, 'getHealth');
      throw error;
    }
  }
}
