import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlansController } from './plans/plans.controller';
import { PlansService } from './plans/plans.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, PlansController],
  providers: [AppService, PlansService],
})
export class AppModule {}
