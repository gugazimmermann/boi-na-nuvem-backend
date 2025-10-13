import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
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
      'http://localhost:3001',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? 'http://localhost';
  await app.listen(port);
  
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  logger.log(`Application is running on: ${host}:${port}`, 'Bootstrap');
  logger.log(`Swagger documentation available at: ${host}:${port}/docs`, 'Bootstrap');
  logger.log(`Health check available at: ${host}:${port}/health`, 'Bootstrap');
  logger.log(`Prometheus metrics available at: ${host}:${port}/metrics`, 'Bootstrap');
  logger.log('Security headers configured with Helmet', 'Bootstrap');
  logger.log('Rate limiting configured with Throttler', 'Bootstrap');
  logger.log('Global validation pipe configured with class-validator', 'Bootstrap');
  logger.log('Prometheus metrics collection enabled', 'Bootstrap');
}
bootstrap();
