import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { Counter, Histogram, Gauge } from 'prom-client';

describe('MetricsService', () => {
  let service: MetricsService;
  let mockHttpRequestsTotal: jest.Mocked<Counter<string>>;
  let mockHttpRequestDuration: jest.Mocked<Histogram<string>>;
  let mockActiveConnections: jest.Mocked<Gauge<string>>;

  beforeEach(async () => {
    // Create mock metrics
    mockHttpRequestsTotal = {
      labels: jest.fn().mockReturnThis(),
      inc: jest.fn(),
    } as any;

    mockHttpRequestDuration = {
      labels: jest.fn().mockReturnThis(),
      observe: jest.fn(),
    } as any;

    mockActiveConnections = {
      set: jest.fn(),
      inc: jest.fn(),
      dec: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: 'PROM_METRIC_HTTP_REQUESTS_TOTAL',
          useValue: mockHttpRequestsTotal,
        },
        {
          provide: 'PROM_METRIC_HTTP_REQUEST_DURATION_SECONDS',
          useValue: mockHttpRequestDuration,
        },
        {
          provide: 'PROM_METRIC_ACTIVE_CONNECTIONS',
          useValue: mockActiveConnections,
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('incrementHttpRequests', () => {
    it('should increment HTTP requests counter with correct labels', () => {
      const method = 'GET';
      const route = '/api/test';
      const statusCode = 200;

      service.incrementHttpRequests(method, route, statusCode);

      expect(mockHttpRequestsTotal.labels).toHaveBeenCalledWith({
        method,
        route,
        status_code: statusCode.toString(),
      });
      expect(mockHttpRequestsTotal.inc).toHaveBeenCalledTimes(1);
    });

    it('should handle different HTTP methods and status codes', () => {
      const testCases = [
        { method: 'POST', route: '/api/users', statusCode: 201 },
        { method: 'PUT', route: '/api/users/1', statusCode: 200 },
        { method: 'DELETE', route: '/api/users/1', statusCode: 204 },
        { method: 'GET', route: '/api/users', statusCode: 404 },
        { method: 'GET', route: '/api/users', statusCode: 500 },
      ];

      testCases.forEach(({ method, route, statusCode }) => {
        service.incrementHttpRequests(method, route, statusCode);
        expect(mockHttpRequestsTotal.labels).toHaveBeenCalledWith({
          method,
          route,
          status_code: statusCode.toString(),
        });
      });

      expect(mockHttpRequestsTotal.inc).toHaveBeenCalledTimes(testCases.length);
    });
  });

  describe('recordHttpRequestDuration', () => {
    it('should record HTTP request duration with correct labels', () => {
      const method = 'GET';
      const route = '/api/test';
      const statusCode = 200;
      const duration = 0.5;

      service.recordHttpRequestDuration(method, route, statusCode, duration);

      expect(mockHttpRequestDuration.labels).toHaveBeenCalledWith({
        method,
        route,
        status_code: statusCode.toString(),
      });
      expect(mockHttpRequestDuration.observe).toHaveBeenCalledWith(duration);
    });

    it('should handle different durations', () => {
      const testCases = [
        { method: 'GET', route: '/api/fast', statusCode: 200, duration: 0.001 },
        { method: 'POST', route: '/api/slow', statusCode: 201, duration: 2.5 },
        { method: 'PUT', route: '/api/medium', statusCode: 200, duration: 0.1 },
      ];

      testCases.forEach(({ method, route, statusCode, duration }) => {
        service.recordHttpRequestDuration(method, route, statusCode, duration);
        expect(mockHttpRequestDuration.labels).toHaveBeenCalledWith({
          method,
          route,
          status_code: statusCode.toString(),
        });
        expect(mockHttpRequestDuration.observe).toHaveBeenCalledWith(duration);
      });
    });
  });

  describe('setActiveConnections', () => {
    it('should set active connections count', () => {
      const count = 42;

      service.setActiveConnections(count);

      expect(mockActiveConnections.set).toHaveBeenCalledWith(count);
    });

    it('should handle zero connections', () => {
      service.setActiveConnections(0);
      expect(mockActiveConnections.set).toHaveBeenCalledWith(0);
    });

    it('should handle large connection counts', () => {
      service.setActiveConnections(1000);
      expect(mockActiveConnections.set).toHaveBeenCalledWith(1000);
    });
  });

  describe('incrementActiveConnections', () => {
    it('should increment active connections', () => {
      service.incrementActiveConnections();
      expect(mockActiveConnections.inc).toHaveBeenCalledTimes(1);
    });

    it('should increment multiple times', () => {
      service.incrementActiveConnections();
      service.incrementActiveConnections();
      service.incrementActiveConnections();
      expect(mockActiveConnections.inc).toHaveBeenCalledTimes(3);
    });
  });

  describe('decrementActiveConnections', () => {
    it('should decrement active connections', () => {
      service.decrementActiveConnections();
      expect(mockActiveConnections.dec).toHaveBeenCalledTimes(1);
    });

    it('should decrement multiple times', () => {
      service.decrementActiveConnections();
      service.decrementActiveConnections();
      expect(mockActiveConnections.dec).toHaveBeenCalledTimes(2);
    });
  });

  describe('service initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should be an instance of MetricsService', () => {
      expect(service).toBeInstanceOf(MetricsService);
    });
  });
});
