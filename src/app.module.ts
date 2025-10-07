import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
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
import { loggerConfig } from './config/logger.config';
import { throttlerConfig } from './config/throttler.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
