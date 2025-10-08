import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlansModule } from './plans/plans.module';
import { PropertyModule } from './property/property.module';
import { LocationModule } from './location/location.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { EmployeeModule } from './employee/employee.module';
import { SupplierModule } from './supplier/supplier.module';
import { BuyerModule } from './buyer/buyer.module';
import { AnimalModule } from './animal/animal.module';
import { HealthModule } from './health/health.module';
import { CacheModule as AppCacheModule } from './cache/cache.module';
import { UserModule } from './user/user.module';
import { 
  PrometheusModule, 
  makeCounterProvider, 
  makeHistogramProvider, 
  makeGaugeProvider 
} from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics/metrics.service';
import { MetricsInterceptor } from './metrics/metrics.interceptor';
import { loggerConfig } from './config/logger.config';
import { throttlerConfig } from './config/throttler.config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>('cache.ttl'),
        max: configService.get<number>('cache.max'),
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot(loggerConfig),
    ThrottlerModule.forRoot(throttlerConfig),
    PlansModule,
    PropertyModule,
    LocationModule,
    ServiceProviderModule,
    EmployeeModule,
    SupplierModule,
    BuyerModule,
    AnimalModule,
    HealthModule,
    AppCacheModule,
    UserModule,
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
    }),
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    }),
    makeGaugeProvider({
      name: 'active_connections',
      help: 'Number of active connections',
    }),
    MetricsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule {}
