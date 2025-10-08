# Configuration Guide

This project uses `@nestjs/config` for managing environment variables and application configuration.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application Configuration
APP_TITLE=Boi na Nuvem Backend
APP_VERSION=0.0.1
NODE_ENV=development
PORT=3000

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=boi_na_nuvem

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1d

# Monitoring Configuration
PROMETHEUS_ENABLED=true
PROMETHEUS_PATH=/metrics
HEALTH_ENABLED=true
HEALTH_PATH=/health

# CORS Configuration
CORS_ORIGIN=https://boi-na-nuvem.onrender.com,http://localhost:5173,http://localhost:5174

# Cache Configuration
CACHE_TTL=300
CACHE_MAX=100
CACHE_ENABLED=true
```

## Usage in Services

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      name: this.configService.get<string>('database.name'),
    };
  }

  getJwtConfig() {
    return {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    };
  }

  getCacheConfig() {
    return {
      ttl: this.configService.get<number>('cache.ttl'),
      max: this.configService.get<number>('cache.max'),
      enabled: this.configService.get<boolean>('cache.enabled'),
    };
  }
}
```

## Configuration Structure

The configuration is organized in the following structure:

- `app.*` - Application settings
- `database.*` - Database connection settings
- `jwt.*` - JWT authentication settings
- `prometheus.*` - Prometheus metrics settings
- `health.*` - Health check settings
- `cache.*` - Cache settings

## Environment Files Priority

1. `.env.local` (highest priority)
2. `.env`
3. System environment variables (lowest priority)
