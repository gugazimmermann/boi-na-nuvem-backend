import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache/cache.service';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private cacheService: CacheService,
  ) {}

  async getAppInfo(): Promise<{ title: string; version: string; environment: string }> {
    const cacheKey = 'app:info';

    const cachedInfo = await this.cacheService.get<{ title: string; version: string; environment: string }>(cacheKey);
    if (cachedInfo) {
      return cachedInfo;
    }

    const appInfo = {
      title: this.configService.get<string>('app.title') || 'Boi na Nuvem Backend',
      version: this.configService.get<string>('app.version') || '0.0.1',
      environment: this.configService.get<string>('app.environment') || 'development',
    };

    await this.cacheService.set(cacheKey, appInfo, 300);
    
    return appInfo;
  }
}
