import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheService: CacheService,
    private readonly reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = this.generateCacheKey(request);

    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(async (data) => {
        const ttl = this.getTTL(context);
        await this.cacheService.set(cacheKey, data, ttl);
      }),
    );
  }

  private generateCacheKey(request: any): string {
    const { method, url, query, params } = request;
    const keyParts = [method, url];

    if (query && Object.keys(query).length > 0) {
      keyParts.push(JSON.stringify(query));
    }

    if (params && Object.keys(params).length > 0) {
      keyParts.push(JSON.stringify(params));
    }
    
    return keyParts.join(':');
  }

  private getTTL(context: ExecutionContext): number {
    
    const handler = context.getHandler();
    const className = context.getClass().name;

    if (className.includes('Plans')) return 600; 
    if (className.includes('Property')) return 300; 
    if (className.includes('Animal')) return 180; 
    
    return 300; 
  }
}
