import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  HealthCheckService,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: HealthCheckService;
  let memoryHealthIndicator: MemoryHealthIndicator;
  let diskHealthIndicator: DiskHealthIndicator;

  const mockHealthCheckService = {
    check: jest.fn(),
  };

  const mockMemoryHealthIndicator = {
    checkHeap: jest.fn(),
    checkRSS: jest.fn(),
  };

  const mockDiskHealthIndicator = {
    checkStorage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
        {
          provide: MemoryHealthIndicator,
          useValue: mockMemoryHealthIndicator,
        },
        {
          provide: DiskHealthIndicator,
          useValue: mockDiskHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    memoryHealthIndicator = module.get<MemoryHealthIndicator>(MemoryHealthIndicator);
    diskHealthIndicator = module.get<DiskHealthIndicator>(DiskHealthIndicator);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('check', () => {
    it('should return healthy status when all checks pass', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: {
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          storage: { status: 'up' },
        },
        error: {},
        details: {
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          storage: { status: 'up' },
        },
      };

      mockHealthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
      expect(mockHealthCheckService.check).toHaveBeenCalledTimes(1);
      expect(mockHealthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
      ]);
    });

    it('should return unhealthy status when memory heap check fails', async () => {
      const mockHealthResult = {
        status: 'error',
        info: {},
        error: {
          memory_heap: { status: 'down', message: 'Memory heap usage exceeded threshold' },
        },
        details: {
          memory_heap: { status: 'down', message: 'Memory heap usage exceeded threshold' },
          memory_rss: { status: 'up' },
          storage: { status: 'up' },
        },
      };

      mockHealthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
      expect(result.status).toBe('error');
      expect(result.error.memory_heap.status).toBe('down');
    });

    it('should return unhealthy status when memory RSS check fails', async () => {
      const mockHealthResult = {
        status: 'error',
        info: {},
        error: {
          memory_rss: { status: 'down', message: 'Memory RSS usage exceeded threshold' },
        },
        details: {
          memory_heap: { status: 'up' },
          memory_rss: { status: 'down', message: 'Memory RSS usage exceeded threshold' },
          storage: { status: 'up' },
        },
      };

      mockHealthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
      expect(result.status).toBe('error');
      expect(result.error.memory_rss.status).toBe('down');
    });

    it('should return unhealthy status when disk storage check fails', async () => {
      const mockHealthResult = {
        status: 'error',
        info: {},
        error: {
          storage: { status: 'down', message: 'Disk storage usage exceeded threshold' },
        },
        details: {
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          storage: { status: 'down', message: 'Disk storage usage exceeded threshold' },
        },
      };

      mockHealthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
      expect(result.status).toBe('error');
      expect(result.error.storage.status).toBe('down');
    });

    it('should return unhealthy status when multiple checks fail', async () => {
      const mockHealthResult = {
        status: 'error',
        info: {},
        error: {
          memory_heap: { status: 'down', message: 'Memory heap usage exceeded threshold' },
          storage: { status: 'down', message: 'Disk storage usage exceeded threshold' },
        },
        details: {
          memory_heap: { status: 'down', message: 'Memory heap usage exceeded threshold' },
          memory_rss: { status: 'up' },
          storage: { status: 'down', message: 'Disk storage usage exceeded threshold' },
        },
      };

      mockHealthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
      expect(result.status).toBe('error');
      expect(result.error.memory_heap.status).toBe('down');
      expect(result.error.storage.status).toBe('down');
    });

    it('should handle health check service errors', async () => {
      const error = new Error('Health check service error');
      mockHealthCheckService.check.mockRejectedValue(error);

      await expect(controller.check()).rejects.toThrow('Health check service error');
      expect(mockHealthCheckService.check).toHaveBeenCalledTimes(1);
    });

    it('should call memory heap check with correct parameters', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: { memory_heap: { status: 'up' } },
        error: {},
        details: { memory_heap: { status: 'up' } },
      };

      mockHealthCheckService.check.mockImplementation((checks) => {
        // Execute the first check (memory heap)
        const memoryHeapCheck = checks[0];
        return memoryHeapCheck().then(() => mockHealthResult);
      });

      mockMemoryHealthIndicator.checkHeap.mockResolvedValue({ status: 'up' });

      await controller.check();

      expect(mockMemoryHealthIndicator.checkHeap).toHaveBeenCalledWith('memory_heap', 500 * 1024 * 1024);
    });

    it('should call memory RSS check with correct parameters', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: { memory_rss: { status: 'up' } },
        error: {},
        details: { memory_rss: { status: 'up' } },
      };

      mockHealthCheckService.check.mockImplementation((checks) => {
        // Execute the second check (memory RSS)
        const memoryRSSCheck = checks[1];
        return memoryRSSCheck().then(() => mockHealthResult);
      });

      mockMemoryHealthIndicator.checkRSS.mockResolvedValue({ status: 'up' });

      await controller.check();

      expect(mockMemoryHealthIndicator.checkRSS).toHaveBeenCalledWith('memory_rss', 500 * 1024 * 1024);
    });

    it('should call disk storage check with correct parameters for Windows', async () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', {
        value: 'win32',
        configurable: true,
      });

      const mockHealthResult = {
        status: 'ok',
        info: { storage: { status: 'up' } },
        error: {},
        details: { storage: { status: 'up' } },
      };

      mockHealthCheckService.check.mockImplementation((checks) => {
        // Execute the third check (disk storage)
        const diskStorageCheck = checks[2];
        return diskStorageCheck().then(() => mockHealthResult);
      });

      mockDiskHealthIndicator.checkStorage.mockResolvedValue({ status: 'up' });

      await controller.check();

      expect(mockDiskHealthIndicator.checkStorage).toHaveBeenCalledWith('storage', {
        path: 'C:\\',
        thresholdPercent: 0.9,
      });

      // Restore original platform
      Object.defineProperty(process, 'platform', {
        value: originalPlatform,
        configurable: true,
      });
    });

    it('should call disk storage check with correct parameters for Unix-like systems', async () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', {
        value: 'linux',
        configurable: true,
      });

      const mockHealthResult = {
        status: 'ok',
        info: { storage: { status: 'up' } },
        error: {},
        details: { storage: { status: 'up' } },
      };

      mockHealthCheckService.check.mockImplementation((checks) => {
        // Execute the third check (disk storage)
        const diskStorageCheck = checks[2];
        return diskStorageCheck().then(() => mockHealthResult);
      });

      mockDiskHealthIndicator.checkStorage.mockResolvedValue({ status: 'up' });

      await controller.check();

      expect(mockDiskHealthIndicator.checkStorage).toHaveBeenCalledWith('storage', {
        path: '/',
        thresholdPercent: 0.9,
      });

      // Restore original platform
      Object.defineProperty(process, 'platform', {
        value: originalPlatform,
        configurable: true,
      });
    });
  });

  describe('controller initialization', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should be an instance of HealthController', () => {
      expect(controller).toBeInstanceOf(HealthController);
    });

    it('should have all required dependencies injected', () => {
      expect(healthCheckService).toBeDefined();
      expect(memoryHealthIndicator).toBeDefined();
      expect(diskHealthIndicator).toBeDefined();
    });
  });
});
