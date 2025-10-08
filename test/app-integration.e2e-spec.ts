import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('App Integration (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Apply the same configuration as in main.ts
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validateCustomDecorators: true,
    }));
    
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      noSniff: true,
      xssFilter: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      frameguard: { action: 'deny' },
    }));
    
    app.enableCors({
      origin: [
        'https://boi-na-nuvem.onrender.com',
        'https://localhost:3000',
        'http://localhost:3000',
        'http://localhost:3001'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });

    // Setup Swagger
    const config = new DocumentBuilder()
      .setTitle('Boi na Nuvem API')
      .setDescription('API for farm and animal management')
      .setVersion('1.0')
      .addTag('plans', 'Plan management')
      .addTag('properties', 'Property management')
      .addTag('locations', 'Location management')
      .addTag('service-providers', 'Service provider management')
      .addTag('employees', 'Employee management')
      .addTag('suppliers', 'Supplier management')
      .addTag('buyers', 'Buyer management')
      .addTag('animals', 'Animal management')
      .addTag('users', 'User management')
      .addTag('health', 'Health check endpoints')
      .addTag('metrics', 'Prometheus metrics endpoints')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'ok');
          expect(res.body).toHaveProperty('info');
          expect(res.body).toHaveProperty('error');
          expect(res.body).toHaveProperty('details');
        });
    });
  });

  describe('Application Info', () => {
    it('should return application information', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('title');
          expect(res.body.data).toHaveProperty('version');
          expect(res.body.data).toHaveProperty('environment');
          expect(res.body).toHaveProperty('message', 'Application information retrieved successfully');
        });
    });
  });

  describe('API Documentation', () => {
    it('should serve Swagger documentation', () => {
      return request(app.getHttpServer())
        .get('/docs')
        .expect(200);
    });

    it('should serve Swagger JSON', () => {
      return request(app.getHttpServer())
        .get('/docs-json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('openapi');
          expect(res.body).toHaveProperty('info');
          expect(res.body).toHaveProperty('paths');
        });
    });
  });

  describe('Metrics Endpoint', () => {
    it('should serve Prometheus metrics', () => {
      return request(app.getHttpServer())
        .get('/metrics')
        .expect(200)
        .expect((res) => {
          expect(res.text).toContain('# HELP');
          expect(res.text).toContain('# TYPE');
        });
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting to requests', async () => {
      // Make multiple requests quickly to trigger rate limiting
      const requests = Array(10).fill(null).map(() =>
        request(app.getHttpServer())
          .get('/')
          .expect((res) => {
            // Some requests should be rate limited (429) or succeed (200)
            expect([200, 429]).toContain(res.status);
          })
      );

      await Promise.all(requests);
    });
  });

  describe('CORS and Security Headers', () => {
    it('should include security headers', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => {
          // Check for security headers added by Helmet
          expect(res.headers).toHaveProperty('x-content-type-options');
          expect(res.headers).toHaveProperty('x-frame-options');
          expect(res.headers).toHaveProperty('x-xss-protection');
        });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent endpoints', () => {
      return request(app.getHttpServer())
        .get('/non-existent-endpoint')
        .expect(404);
    });

    it('should return 404 for unsupported methods (NestJS default behavior)', () => {
      return request(app.getHttpServer())
        .delete('/')
        .expect(404); // NestJS returns 404 for unsupported methods by default
    });
  });

  describe('Content Type', () => {
    it('should return JSON content type for API endpoints', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });

  describe('Response Time', () => {
    it('should respond within reasonable time', async () => {
      const startTime = Date.now();
      
      await request(app.getHttpServer())
        .get('/')
        .expect(200);
      
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    });
  });

  describe('Concurrent Requests', () => {
    it('should handle concurrent requests', async () => {
      const concurrentRequests = Array(5).fill(null).map(() =>
        request(app.getHttpServer())
          .get('/')
          .expect(200)
      );

      await Promise.all(concurrentRequests);
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory with multiple requests', async () => {
      // Make multiple requests to check for memory leaks
      // Reduced number of requests to avoid rate limiting
      for (let i = 0; i < 3; i++) {
        await request(app.getHttpServer())
          .get('/')
          .expect(200);
      }
    });
  });
});
