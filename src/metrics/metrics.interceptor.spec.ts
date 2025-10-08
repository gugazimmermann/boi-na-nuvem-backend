import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { MetricsInterceptor } from './metrics.interceptor';
import { MetricsService } from './metrics.service';
import { Request, Response } from 'express';

describe('MetricsInterceptor', () => {
  let interceptor: MetricsInterceptor;
  let metricsService: MetricsService;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  const mockMetricsService = {
    incrementHttpRequests: jest.fn(),
    recordHttpRequestDuration: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsInterceptor,
        {
          provide: MetricsService,
          useValue: mockMetricsService,
        },
      ],
    }).compile();

    interceptor = module.get<MetricsInterceptor>(MetricsInterceptor);
    metricsService = module.get<MetricsService>(MetricsService);

    // Mock request and response
    mockRequest = {
      method: 'GET',
      path: '/api/test',
      route: { path: '/api/test' },
    };

    mockResponse = {
      statusCode: 200,
    };

    // Mock execution context
    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    } as any;

    // Mock call handler
    mockCallHandler = {
      handle: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('intercept', () => {
    it('should record metrics for successful requests', (done) => {
      const responseData = { message: 'success' };
      mockCallHandler.handle = jest.fn().mockReturnValue(of(responseData));

      // Mock Date.now to control timing
      const startTime = 1000;
      const endTime = 1500;
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual(responseData);
          expect(mockMetricsService.incrementHttpRequests).toHaveBeenCalledWith(
            'GET',
            '/api/test',
            200
          );
          expect(mockMetricsService.recordHttpRequestDuration).toHaveBeenCalledWith(
            'GET',
            '/api/test',
            200,
            0.5 // (1500 - 1000) / 1000
          );
          done();
        },
        error: done,
      });
    });

    it('should record metrics for failed requests', (done) => {
      const error = new Error('Test error');
      (error as any).status = 400;
      mockCallHandler.handle = jest.fn().mockReturnValue(throwError(() => error));

      // Mock Date.now to control timing
      const startTime = 1000;
      const endTime = 1200;
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: () => done(new Error('Should have thrown')),
        error: (err) => {
          expect(err).toBe(error);
          expect(mockMetricsService.incrementHttpRequests).toHaveBeenCalledWith(
            'GET',
            '/api/test',
            400
          );
          expect(mockMetricsService.recordHttpRequestDuration).toHaveBeenCalledWith(
            'GET',
            '/api/test',
            400,
            0.2 // (1200 - 1000) / 1000
          );
          done();
        },
      });
    });

    it('should use default status code 500 for errors without status', (done) => {
      const error = new Error('Test error');
      // No status property
      mockCallHandler.handle = jest.fn().mockReturnValue(throwError(() => error));

      // Mock Date.now to control timing
      const startTime = 1000;
      const endTime = 1100;
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: () => done(new Error('Should have thrown')),
        error: (err) => {
          expect(err).toBe(error);
          expect(mockMetricsService.incrementHttpRequests).toHaveBeenCalledWith(
            'GET',
            '/api/test',
            500
          );
          expect(mockMetricsService.recordHttpRequestDuration).toHaveBeenCalledWith(
            'GET',
            '/api/test',
            500,
            0.1 // (1100 - 1000) / 1000
          );
          done();
        },
      });
    });

    it('should use request.path when route.path is not available', (done) => {
      mockRequest.route = undefined; // No route object
      const responseData = { message: 'success' };
      mockCallHandler.handle = jest.fn().mockReturnValue(of(responseData));

      // Mock Date.now
      const startTime = 1000;
      const endTime = 1500;
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (data) => {
          expect(data).toEqual(responseData);
          expect(mockMetricsService.incrementHttpRequests).toHaveBeenCalledWith(
            'GET',
            '/api/test', // Should use request.path
            200
          );
          done();
        },
        error: done,
      });
    });

    it('should handle different HTTP methods', (done) => {
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      let completed = 0;

      methods.forEach((method) => {
        mockRequest.method = method;
        const responseData = { message: 'success' };
        mockCallHandler.handle = jest.fn().mockReturnValue(of(responseData));

        // Mock Date.now
        const startTime = 1000;
        const endTime = 1500;
        jest.spyOn(Date, 'now')
          .mockReturnValueOnce(startTime)
          .mockReturnValueOnce(endTime);

        interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
          next: (data) => {
            expect(data).toEqual(responseData);
            expect(mockMetricsService.incrementHttpRequests).toHaveBeenCalledWith(
              method,
              '/api/test',
              200
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

    it('should handle different status codes', (done) => {
      const statusCodes = [200, 201, 400, 404, 500];
      let completed = 0;

      statusCodes.forEach((statusCode) => {
        mockResponse.statusCode = statusCode;
        const responseData = { message: 'success' };
        mockCallHandler.handle = jest.fn().mockReturnValue(of(responseData));

        // Mock Date.now
        const startTime = 1000;
        const endTime = 1500;
        jest.spyOn(Date, 'now')
          .mockReturnValueOnce(startTime)
          .mockReturnValueOnce(endTime);

        interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
          next: (data) => {
            expect(data).toEqual(responseData);
            expect(mockMetricsService.incrementHttpRequests).toHaveBeenCalledWith(
              'GET',
              '/api/test',
              statusCode
            );
            completed++;
            if (completed === statusCodes.length) {
              done();
            }
          },
          error: done,
        });
      });
    });
  });

  describe('interceptor initialization', () => {
    it('should be defined', () => {
      expect(interceptor).toBeDefined();
    });

    it('should be an instance of MetricsInterceptor', () => {
      expect(interceptor).toBeInstanceOf(MetricsInterceptor);
    });

    it('should have MetricsService injected', () => {
      expect(metricsService).toBeDefined();
    });
  });
});
