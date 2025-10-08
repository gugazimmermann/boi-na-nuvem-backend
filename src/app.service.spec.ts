import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { CacheService } from './cache/cache.service';

describe('AppService', () => {
  let service: AppService;
  let cacheService: CacheService;
  let configService: ConfigService;

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    cacheService = module.get<CacheService>(CacheService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAppInfo', () => {
    it('should return cached app info when available', async () => {
      const cachedInfo = {
        title: 'Boi na Nuvem Backend',
        version: '0.0.1',
        environment: 'test',
      };

      mockCacheService.get.mockResolvedValue(cachedInfo);

      const result = await service.getAppInfo();

      expect(result).toEqual(cachedInfo);
      expect(mockCacheService.get).toHaveBeenCalledWith('app:info');
      expect(mockCacheService.set).not.toHaveBeenCalled();
      expect(mockConfigService.get).not.toHaveBeenCalled();
    });

    it('should fetch and cache app info when not cached', async () => {
      const expectedInfo = {
        title: 'Boi na Nuvem Backend',
        version: '0.0.1',
        environment: 'test',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockConfigService.get
        .mockReturnValueOnce('Boi na Nuvem Backend')
        .mockReturnValueOnce('0.0.1')
        .mockReturnValueOnce('test');
      mockCacheService.set.mockResolvedValue(undefined);

      const result = await service.getAppInfo();

      expect(result).toEqual(expectedInfo);
      expect(mockCacheService.get).toHaveBeenCalledWith('app:info');
      expect(mockConfigService.get).toHaveBeenCalledTimes(3);
      expect(mockCacheService.set).toHaveBeenCalledWith('app:info', expectedInfo, 300);
    });

    it('should use default values when config values are not available', async () => {
      const expectedInfo = {
        title: 'Boi na Nuvem Backend',
        version: '0.0.1',
        environment: 'development',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockConfigService.get.mockReturnValue(undefined);
      mockCacheService.set.mockResolvedValue(undefined);

      const result = await service.getAppInfo();

      expect(result).toEqual(expectedInfo);
      expect(mockConfigService.get).toHaveBeenCalledTimes(3);
      expect(mockCacheService.set).toHaveBeenCalledWith('app:info', expectedInfo, 300);
    });

    it('should handle cache service errors', async () => {
      const error = new Error('Cache service unavailable');
      mockCacheService.get.mockRejectedValue(error);

      await expect(service.getAppInfo()).rejects.toThrow('Cache service unavailable');
    });

    it('should handle config service errors', async () => {
      const error = new Error('Config service unavailable');
      mockCacheService.get.mockResolvedValue(null);
      mockConfigService.get.mockImplementation(() => {
        throw error;
      });

      await expect(service.getAppInfo()).rejects.toThrow('Config service unavailable');
    });

    it('should handle cache set errors gracefully', async () => {
      const expectedInfo = {
        title: 'Boi na Nuvem Backend',
        version: '0.0.1',
        environment: 'test',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockConfigService.get
        .mockReturnValueOnce('Boi na Nuvem Backend')
        .mockReturnValueOnce('0.0.1')
        .mockReturnValueOnce('test');
      mockCacheService.set.mockRejectedValue(new Error('Cache set failed'));

      // Suppress console.warn for this test
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      // Should still return the info even if caching fails
      const result = await service.getAppInfo();

      expect(result).toEqual(expectedInfo);
      expect(mockCacheService.set).toHaveBeenCalledWith('app:info', expectedInfo, 300);
      
      // Verify that console.warn was called with the expected message
      expect(consoleSpy).toHaveBeenCalledWith('Failed to cache app info:', expect.any(Error));
      
      // Restore console.warn
      consoleSpy.mockRestore();
    });
  });
});
