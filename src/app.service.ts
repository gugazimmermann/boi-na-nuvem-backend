import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}


  getAppInfo(): { title: string; version: string } {
    return {
      title: this.configService.get<string>('APP_TITLE', 'Boi na Nuvem Backend'),
      version: this.configService.get<string>('APP_VERSION', '0.0.1'),
    };
  }
}
