import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import type { Cache } from 'cache-manager';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return cached value when key exists', async () => {
      const key = 'test-key';
      const expectedValue = { id: 1, name: 'test' };
      mockCacheManager.get.mockResolvedValue(expectedValue);

      const result = await service.get(key);

      expect(result).toEqual(expectedValue);
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should return undefined when key does not exist', async () => {
      const key = 'non-existent-key';
      mockCacheManager.get.mockResolvedValue(undefined);

      const result = await service.get(key);

      expect(result).toBeUndefined();
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should handle cache manager errors', async () => {
      const key = 'error-key';
      const error = new Error('Cache error');
      mockCacheManager.get.mockRejectedValue(error);

      await expect(service.get(key)).rejects.toThrow('Cache error');
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    });
  });

  describe('set', () => {
    it('should set value with TTL', async () => {
      const key = 'test-key';
      const value = { id: 1, name: 'test' };
      const ttl = 300;

      mockCacheManager.set.mockResolvedValue(undefined);

      await service.set(key, value, ttl);

      expect(mockCacheManager.set).toHaveBeenCalledWith(key, value, ttl);
    });

    it('should set value without TTL', async () => {
      const key = 'test-key';
      const value = { id: 1, name: 'test' };

      mockCacheManager.set.mockResolvedValue(undefined);

      await service.set(key, value);

      expect(mockCacheManager.set).toHaveBeenCalledWith(key, value, undefined);
    });

    it('should handle cache manager errors', async () => {
      const key = 'error-key';
      const value = { id: 1 };
      const error = new Error('Cache set error');
      mockCacheManager.set.mockRejectedValue(error);

      await expect(service.set(key, value)).rejects.toThrow('Cache set error');
    });
  });

  describe('del', () => {
    it('should delete key from cache', async () => {
      const key = 'test-key';
      mockCacheManager.del.mockResolvedValue(undefined);

      await service.del(key);

      expect(mockCacheManager.del).toHaveBeenCalledWith(key);
    });

    it('should handle cache manager errors', async () => {
      const key = 'error-key';
      const error = new Error('Cache delete error');
      mockCacheManager.del.mockRejectedValue(error);

      await expect(service.del(key)).rejects.toThrow('Cache delete error');
    });
  });

  describe('reset', () => {
    it('should log warning and not call cache manager reset', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await service.reset();

      expect(consoleSpy).toHaveBeenCalledWith('Cache reset not implemented for this cache store');
      expect(mockCacheManager.reset).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('has', () => {
    it('should return true when key exists', async () => {
      const key = 'existing-key';
      const value = { id: 1 };
      mockCacheManager.get.mockResolvedValue(value);

      const result = await service.has(key);

      expect(result).toBe(true);
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should return false when key does not exist', async () => {
      const key = 'non-existent-key';
      mockCacheManager.get.mockResolvedValue(undefined);

      const result = await service.has(key);

      expect(result).toBe(false);
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should return false when value is null', async () => {
      const key = 'null-key';
      mockCacheManager.get.mockResolvedValue(null);

      const result = await service.has(key);

      expect(result).toBe(false);
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    });
  });

  describe('mget', () => {
    it('should return array of values for multiple keys', async () => {
      const keys = ['key1', 'key2', 'key3'];
      const values = [{ id: 1 }, { id: 2 }, undefined];
      
      mockCacheManager.get
        .mockResolvedValueOnce(values[0])
        .mockResolvedValueOnce(values[1])
        .mockResolvedValueOnce(values[2]);

      const result = await service.mget(keys);

      expect(result).toEqual(values);
      expect(mockCacheManager.get).toHaveBeenCalledTimes(3);
    });

    it('should handle empty keys array', async () => {
      const keys: string[] = [];

      const result = await service.mget(keys);

      expect(result).toEqual([]);
      expect(mockCacheManager.get).not.toHaveBeenCalled();
    });
  });

  describe('mset', () => {
    it('should set multiple key-value pairs', async () => {
      const keyValuePairs = [
        { key: 'key1', value: { id: 1 }, ttl: 300 },
        { key: 'key2', value: { id: 2 }, ttl: 600 },
        { key: 'key3', value: { id: 3 } },
      ];

      mockCacheManager.set.mockResolvedValue(undefined);

      await service.mset(keyValuePairs);

      expect(mockCacheManager.set).toHaveBeenCalledTimes(3);
      expect(mockCacheManager.set).toHaveBeenCalledWith('key1', { id: 1 }, 300);
      expect(mockCacheManager.set).toHaveBeenCalledWith('key2', { id: 2 }, 600);
      expect(mockCacheManager.set).toHaveBeenCalledWith('key3', { id: 3 }, undefined);
    });

    it('should handle empty key-value pairs array', async () => {
      const keyValuePairs: Array<{ key: string; value: any; ttl?: number }> = [];

      await service.mset(keyValuePairs);

      expect(mockCacheManager.set).not.toHaveBeenCalled();
    });
  });

  describe('getOrSet', () => {
    it('should return cached value when key exists', async () => {
      const key = 'existing-key';
      const cachedValue = { id: 1, name: 'cached' };
      const factory = jest.fn().mockResolvedValue({ id: 2, name: 'new' });

      mockCacheManager.get.mockResolvedValue(cachedValue);

      const result = await service.getOrSet(key, factory);

      expect(result).toEqual(cachedValue);
      expect(factory).not.toHaveBeenCalled();
      expect(mockCacheManager.set).not.toHaveBeenCalled();
    });

    it('should call factory and cache result when key does not exist', async () => {
      const key = 'new-key';
      const newValue = { id: 2, name: 'new' };
      const ttl = 300;
      const factory = jest.fn().mockResolvedValue(newValue);

      mockCacheManager.get.mockResolvedValue(undefined);
      mockCacheManager.set.mockResolvedValue(undefined);

      const result = await service.getOrSet(key, factory, ttl);

      expect(result).toEqual(newValue);
      expect(factory).toHaveBeenCalledTimes(1);
      expect(mockCacheManager.set).toHaveBeenCalledWith(key, newValue, ttl);
    });

    it('should handle factory errors', async () => {
      const key = 'error-key';
      const factory = jest.fn().mockRejectedValue(new Error('Factory error'));

      mockCacheManager.get.mockResolvedValue(undefined);

      await expect(service.getOrSet(key, factory)).rejects.toThrow('Factory error');
      expect(factory).toHaveBeenCalledTimes(1);
    });
  });

  describe('generateKey', () => {
    it('should generate key with namespace and parts', () => {
      const result = service.generateKey('user', '123', 'profile');

      expect(result).toBe('user:123:profile');
    });

    it('should generate key with mixed string and number parts', () => {
      const result = service.generateKey('cache', 'data', 123, 'item');

      expect(result).toBe('cache:data:123:item');
    });

    it('should generate key with only namespace', () => {
      const result = service.generateKey('global');

      expect(result).toBe('global:');
    });
  });

  describe('cacheUserData', () => {
    it('should cache user data with generated key', async () => {
      const userId = 'user123';
      const dataType = 'profile';
      const value = { name: 'John', email: 'john@example.com' };
      const ttl = 300;

      mockCacheManager.set.mockResolvedValue(undefined);

      await service.cacheUserData(userId, dataType, value, ttl);

      expect(mockCacheManager.set).toHaveBeenCalledWith('user:user123:profile', value, ttl);
    });

    it('should cache user data without TTL', async () => {
      const userId = 'user123';
      const dataType = 'settings';
      const value = { theme: 'dark' };

      mockCacheManager.set.mockResolvedValue(undefined);

      await service.cacheUserData(userId, dataType, value);

      expect(mockCacheManager.set).toHaveBeenCalledWith('user:user123:settings', value, undefined);
    });
  });

  describe('getUserData', () => {
    it('should get user data with generated key', async () => {
      const userId = 'user123';
      const dataType = 'profile';
      const expectedValue = { name: 'John', email: 'john@example.com' };

      mockCacheManager.get.mockResolvedValue(expectedValue);

      const result = await service.getUserData(userId, dataType);

      expect(result).toEqual(expectedValue);
      expect(mockCacheManager.get).toHaveBeenCalledWith('user:user123:profile');
    });
  });

  describe('invalidateUserCache', () => {
    it('should delete specific user data type when dataType is provided', async () => {
      const userId = 'user123';
      const dataType = 'profile';

      mockCacheManager.del.mockResolvedValue(undefined);

      await service.invalidateUserCache(userId, dataType);

      expect(mockCacheManager.del).toHaveBeenCalledWith('user:user123:profile');
    });

    it('should reset entire cache when dataType is not provided', async () => {
      const userId = 'user123';
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await service.invalidateUserCache(userId);

      expect(consoleSpy).toHaveBeenCalledWith('Cache reset not implemented for this cache store');
      expect(mockCacheManager.del).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
