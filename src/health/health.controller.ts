import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        info: {
          type: 'object',
          properties: {
            memory_heap: { type: 'object' },
            memory_rss: { type: 'object' },
            storage: { type: 'object' },
          },
        },
        error: { type: 'object' },
        details: {
          type: 'object',
          properties: {
            memory_heap: { type: 'object' },
            memory_rss: { type: 'object' },
            storage: { type: 'object' },
          },
        },
      },
    },
  })
  @ApiResponse({ 
    status: 503, 
    description: 'Application is unhealthy' 
  })
  @HealthCheck()
  check() {
    return this.health.check([
      
      () => this.memory.checkHeap('memory_heap', 500 * 1024 * 1024), // Increased to 500MB for testing
      
      () => this.memory.checkRSS('memory_rss', 500 * 1024 * 1024), // Increased to 500MB for testing
      
      () => this.disk.checkStorage('storage', { 
        path: process.platform === 'win32' ? 'C:\\' : '/', 
        thresholdPercent: 0.9 // Increased to 90% for testing
      }),
    ]);
  }
}
