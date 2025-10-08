import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from './cache/cache.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
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
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
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

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    cacheService = app.get<CacheService>(CacheService);
    configService = app.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAppInfo', () => {
    it('should return app information successfully', async () => {
      const mockAppInfo = {
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

      const result = await appController.getAppInfo();

      expect(result).toEqual({
        success: true,
        data: mockAppInfo,
        message: 'Application information retrieved successfully',
      });
      expect(mockCacheService.get).toHaveBeenCalledWith('app:info');
      expect(mockCacheService.set).toHaveBeenCalledWith('app:info', mockAppInfo, 300);
    });

    it('should return cached app information when available', async () => {
      const cachedAppInfo = {
        title: 'Boi na Nuvem Backend',
        version: '0.0.1',
        environment: 'test',
      };

      mockCacheService.get.mockResolvedValue(cachedAppInfo);

      const result = await appController.getAppInfo();

      expect(result).toEqual({
        success: true,
        data: cachedAppInfo,
        message: 'Application information retrieved successfully',
      });
      expect(mockCacheService.get).toHaveBeenCalledWith('app:info');
      expect(mockCacheService.set).not.toHaveBeenCalled();
      expect(mockConfigService.get).not.toHaveBeenCalled();
    });

    it('should handle cache get errors and rethrow them', async () => {
      const error = new Error('Cache service error');
      mockCacheService.get.mockRejectedValue(error);

      // Mock the logger to suppress error logs during test
      const loggerSpy = jest.spyOn(appController['logger'], 'error').mockImplementation();

      await expect(appController.getAppInfo()).rejects.toThrow('Cache service error');
      
      expect(loggerSpy).toHaveBeenCalledWith('GET / - Request failed', expect.any(String), 'getAppInfo');
      loggerSpy.mockRestore();
    });

    it('should handle cache set errors gracefully', async () => {
      const mockAppInfo = {
        title: 'Boi na Nuvem Backend',
        version: '0.0.1',
        environment: 'test',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockConfigService.get
        .mockReturnValueOnce('Boi na Nuvem Backend')
        .mockReturnValueOnce('0.0.1')
        .mockReturnValueOnce('test');
      
      // Mock cache set to throw an error
      const cacheError = new Error('Cache set failed');
      mockCacheService.set.mockRejectedValue(cacheError);

      // Mock console.warn to suppress expected warning
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      // Should not throw error, should return the app info despite cache failure
      const result = await appController.getAppInfo();

      expect(result).toEqual({
        success: true,
        data: mockAppInfo,
        message: 'Application information retrieved successfully',
      });
      expect(mockCacheService.get).toHaveBeenCalledWith('app:info');
      expect(mockCacheService.set).toHaveBeenCalledWith('app:info', mockAppInfo, 300);
      expect(consoleSpy).toHaveBeenCalledWith('Failed to cache app info:', cacheError);

      consoleSpy.mockRestore();
    });

    it('should use default values when config values are not available', async () => {
      mockCacheService.get.mockResolvedValue(null);
      mockConfigService.get.mockReturnValue(undefined);
      mockCacheService.set.mockResolvedValue(undefined);

      const result = await appController.getAppInfo();

      expect(result.data).toEqual({
        title: 'Boi na Nuvem Backend',
        version: '0.0.1',
        environment: 'development',
      });
    });
  });
});
