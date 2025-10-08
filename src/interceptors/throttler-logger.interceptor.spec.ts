import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { ThrottlerLoggerInterceptor } from './throttler-logger.interceptor';

describe('ThrottlerLoggerInterceptor', () => {
  let interceptor: ThrottlerLoggerInterceptor;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;
  let mockRequest: any;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThrottlerLoggerInterceptor],
    }).compile();

    interceptor = module.get<ThrottlerLoggerInterceptor>(ThrottlerLoggerInterceptor);

    // Mock request
    mockRequest = {
      method: 'GET',
      url: '/api/test',
      ip: '127.0.0.1',
    };

    // Mock execution context
    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as any;

    // Mock call handler
    mockCallHandler = {
      handle: jest.fn().mockReturnValue(of({ message: 'success' })),
    };

    // Spy on logger
    loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    loggerSpy.mockRestore();
  });

  describe('intercept', () => {
    it('should log request information', (done) => {
      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual({ message: 'success' });
          expect(loggerSpy).toHaveBeenCalledWith(
            'Request: GET /api/test from IP: 127.0.0.1',
            'ThrottlerLogger'
          );
          expect(loggerSpy).toHaveBeenCalledWith(
            'Response: GET /api/test - Success',
            'ThrottlerLogger'
          );
          done();
        },
        error: done,
      });
    });

    it('should log different HTTP methods', (done) => {
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      let completed = 0;

      methods.forEach((method) => {
        mockRequest.method = method;
        mockRequest.url = `/api/${method.toLowerCase()}`;

        interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
          next: (data) => {
            expect(data).toEqual({ message: 'success' });
            expect(loggerSpy).toHaveBeenCalledWith(
              `Request: ${method} /api/${method.toLowerCase()} from IP: 127.0.0.1`,
              'ThrottlerLogger'
            );
            expect(loggerSpy).toHaveBeenCalledWith(
              `Response: ${method} /api/${method.toLowerCase()} - Success`,
              'ThrottlerLogger'
            );
            completed++;
            if (completed === methods.length) {
              done();
            }
          },
          error: done,
        });
      });
    });

    it('should log different IP addresses', (done) => {
      const ips = ['127.0.0.1', '192.168.1.1', '10.0.0.1', '::1'];
      let completed = 0;

      ips.forEach((ip) => {
        mockRequest.ip = ip;

        interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
          next: (data) => {
            expect(data).toEqual({ message: 'success' });
            expect(loggerSpy).toHaveBeenCalledWith(
              `Request: GET /api/test from IP: ${ip}`,
              'ThrottlerLogger'
            );
            expect(loggerSpy).toHaveBeenCalledWith(
              'Response: GET /api/test - Success',
              'ThrottlerLogger'
            );
            completed++;
            if (completed === ips.length) {
              done();
            }
          },
          error: done,
        });
      });
    });

    it('should log different URLs', (done) => {
      const urls = ['/api/users', '/api/animals', '/api/properties', '/health'];
      let completed = 0;

      urls.forEach((url) => {
        mockRequest.url = url;

        interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
          next: (data) => {
            expect(data).toEqual({ message: 'success' });
            expect(loggerSpy).toHaveBeenCalledWith(
              `Request: GET ${url} from IP: 127.0.0.1`,
              'ThrottlerLogger'
            );
            expect(loggerSpy).toHaveBeenCalledWith(
              `Response: GET ${url} - Success`,
              'ThrottlerLogger'
            );
            completed++;
            if (completed === urls.length) {
              done();
            }
          },
          error: done,
        });
      });
    });

    it('should handle requests with query parameters', (done) => {
      mockRequest.url = '/api/users?page=1&limit=10';

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual({ message: 'success' });
          expect(loggerSpy).toHaveBeenCalledWith(
            'Request: GET /api/users?page=1&limit=10 from IP: 127.0.0.1',
            'ThrottlerLogger'
          );
          expect(loggerSpy).toHaveBeenCalledWith(
            'Response: GET /api/users?page=1&limit=10 - Success',
            'ThrottlerLogger'
          );
          done();
        },
        error: done,
      });
    });

    it('should handle requests with path parameters', (done) => {
      mockRequest.url = '/api/users/123';

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual({ message: 'success' });
          expect(loggerSpy).toHaveBeenCalledWith(
            'Request: GET /api/users/123 from IP: 127.0.0.1',
            'ThrottlerLogger'
          );
          expect(loggerSpy).toHaveBeenCalledWith(
            'Response: GET /api/users/123 - Success',
            'ThrottlerLogger'
          );
          done();
        },
        error: done,
      });
    });

    it('should call next.handle()', (done) => {
      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(mockCallHandler.handle).toHaveBeenCalledTimes(1);
          expect(data).toEqual({ message: 'success' });
          done();
        },
        error: done,
      });
    });

    it('should handle undefined IP address', (done) => {
      mockRequest.ip = undefined;

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual({ message: 'success' });
          expect(loggerSpy).toHaveBeenCalledWith(
            'Request: GET /api/test from IP: undefined',
            'ThrottlerLogger'
          );
          done();
        },
        error: done,
      });
    });

    it('should handle undefined URL', (done) => {
      mockRequest.url = undefined;

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual({ message: 'success' });
          expect(loggerSpy).toHaveBeenCalledWith(
            'Request: GET undefined from IP: 127.0.0.1',
            'ThrottlerLogger'
          );
          done();
        },
        error: done,
      });
    });

    it('should handle undefined method', (done) => {
      mockRequest.method = undefined;

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual({ message: 'success' });
          expect(loggerSpy).toHaveBeenCalledWith(
            'Request: undefined /api/test from IP: 127.0.0.1',
            'ThrottlerLogger'
          );
          done();
        },
        error: done,
      });
    });
  });

  describe('interceptor initialization', () => {
    it('should be defined', () => {
      expect(interceptor).toBeDefined();
    });

    it('should be an instance of ThrottlerLoggerInterceptor', () => {
      expect(interceptor).toBeInstanceOf(ThrottlerLoggerInterceptor);
    });
  });
});
