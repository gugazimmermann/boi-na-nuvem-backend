import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}


  getAppInfo(): { title: string; version: string; environment: string } {
    return {
      title: this.configService.get<string>('app.title') || 'Boi na Nuvem Backend',
      version: this.configService.get<string>('app.version') || '0.0.1',
      environment: this.configService.get<string>('app.environment') || 'development',
    };
  }
}
