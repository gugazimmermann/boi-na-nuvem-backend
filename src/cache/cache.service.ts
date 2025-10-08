import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Get a value from cache
   */
  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  /**
   * Set a value in cache with optional TTL
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  /**
   * Delete a value from cache
   */
  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  /**
   * Clear all cache
   */
  async reset(): Promise<void> {
    // Note: cache-manager v5 doesn't have a reset method
    // This would need to be implemented based on the specific cache store
    // For now, we'll leave this as a placeholder
    console.warn('Cache reset not implemented for this cache store');
  }

  /**
   * Check if a key exists in cache
   */
  async has(key: string): Promise<boolean> {
    const value = await this.cacheManager.get(key);
    return value !== undefined;
  }

  /**
   * Get multiple values from cache
   */
  async mget<T>(keys: string[]): Promise<(T | undefined)[]> {
    const promises = keys.map(key => this.get<T>(key));
    return await Promise.all(promises);
  }

  /**
   * Set multiple values in cache
   */
  async mset<T>(keyValuePairs: Array<{ key: string; value: T; ttl?: number }>): Promise<void> {
    const promises = keyValuePairs.map(({ key, value, ttl }) => this.set(key, value, ttl));
    await Promise.all(promises);
  }

  /**
   * Get or set a value in cache (cache-aside pattern)
   */
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

  /**
   * Generate a cache key with namespace
   */
  generateKey(namespace: string, ...parts: (string | number)[]): string {
    return `${namespace}:${parts.join(':')}`;
  }

  /**
   * Cache user-specific data
   */
  async cacheUserData<T>(userId: string, dataType: string, value: T, ttl?: number): Promise<void> {
    const key = this.generateKey('user', userId, dataType);
    await this.set(key, value, ttl);
  }

  /**
   * Get user-specific cached data
   */
  async getUserData<T>(userId: string, dataType: string): Promise<T | undefined> {
    const key = this.generateKey('user', userId, dataType);
    return await this.get<T>(key);
  }

  /**
   * Invalidate user-specific cache
   */
  async invalidateUserCache(userId: string, dataType?: string): Promise<void> {
    if (dataType) {
      const key = this.generateKey('user', userId, dataType);
      await this.del(key);
    } else {
      // Invalidate all user cache (this would require a more sophisticated implementation)
      // For now, we'll just clear the entire cache
      await this.reset();
    }
  }
}
