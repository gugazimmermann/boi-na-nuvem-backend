import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {

    console.warn('Cache reset not implemented for this cache store');
  }

  async has(key: string): Promise<boolean> {
    const value = await this.cacheManager.get(key);
    return value !== undefined && value !== null;
  }

  async mget<T>(keys: string[]): Promise<(T | undefined)[]> {
    const promises = keys.map(key => this.get<T>(key));
    return await Promise.all(promises);
  }

  async mset<T>(keyValuePairs: Array<{ key: string; value: T; ttl?: number }>): Promise<void> {
    const promises = keyValuePairs.map(({ key, value, ttl }) => this.set(key, value, ttl));
    await Promise.all(promises);
  }

  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    let value = await this.get<T>(key);
    
    if (value === undefined) {
      value = await factory();
      await this.set(key, value, ttl);
    }
    
    return value;
  }

  generateKey(namespace: string, ...parts: (string | number)[]): string {
    return `${namespace}:${parts.join(':')}`;
  }

  async cacheUserData<T>(userId: string, dataType: string, value: T, ttl?: number): Promise<void> {
    const key = this.generateKey('user', userId, dataType);
    await this.set(key, value, ttl);
  }

  async getUserData<T>(userId: string, dataType: string): Promise<T | undefined> {
    const key = this.generateKey('user', userId, dataType);
    return await this.get<T>(key);
  }

  async invalidateUserCache(userId: string, dataType?: string): Promise<void> {
    if (dataType) {
      const key = this.generateKey('user', userId, dataType);
      await this.del(key);
    } else {

      await this.reset();
    }
  }
}
