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
    
    // Try to get from cache first
    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    // If not in cache, execute the handler and cache the result
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
    
    // Include query parameters in cache key
    if (query && Object.keys(query).length > 0) {
      keyParts.push(JSON.stringify(query));
    }
    
    // Include route parameters in cache key
    if (params && Object.keys(params).length > 0) {
      keyParts.push(JSON.stringify(params));
    }
    
    return keyParts.join(':');
  }

  private getTTL(context: ExecutionContext): number {
    // You can customize TTL based on the endpoint
    const handler = context.getHandler();
    const className = context.getClass().name;
    
    // Different TTL for different endpoints
    if (className.includes('Plans')) return 600; // 10 minutes
    if (className.includes('Property')) return 300; // 5 minutes
    if (className.includes('Animal')) return 180; // 3 minutes
    
    return 300; // Default 5 minutes
  }
}
