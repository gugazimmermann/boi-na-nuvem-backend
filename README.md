# Boi na Nuvem Backend

Backend API for farm and animal management, built with NestJS.

## 📋 Description

**Boi na Nuvem** (Cow in the Cloud) is a farm management application that allows you to control properties, animals, employees, suppliers, buyers, and service providers. The API provides RESTful endpoints for all these functionalities, with automatic documentation via Swagger.

## 🚀 Technologies

- **NestJS** - Node.js framework for server-side applications
- **TypeScript** - Programming language
- **Winston** - Logging system with structured logging
- **Swagger** - API documentation and interactive testing
- **Helmet** - HTTP security headers and protection
- **Throttler** - Rate limiting and API abuse protection
- **Class Validator** - Data validation and transformation
- **Prometheus** - Metrics collection and monitoring
- **Cache Manager** - In-memory caching for performance
- **Date-fns** - Date manipulation utilities
- **Jest** - Unit and e2e testing framework

## 📁 Project Structure

```
src/
├── animal/           # Animal management
├── buyer/            # Buyer management
├── cache/            # Cache management and interceptors
├── config/           # Configurations (logger, throttler, app config)
├── employee/         # Employee management
├── health/           # Health check endpoints
├── interceptors/     # Custom interceptors (throttler logger)
├── location/         # Location management
├── metrics/          # Prometheus metrics collection
├── mocks/            # Mock data for development
├── plans/            # Plan management
├── property/         # Property management
├── service-provider/ # Service provider management
├── supplier/         # Supplier management
├── app.controller.ts # Main controller
├── app.module.ts     # Main module
├── app.service.ts    # Main service
└── main.ts           # Application entry point
```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd boi-na-nuvem-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (if needed):
```bash
# Create a .env file in the project root
PORT=3000
HOST=http://localhost
NODE_ENV=development

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=boi_na_nuvem

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

# App Configuration
APP_TITLE=Boi na Nuvem Backend
APP_VERSION=0.0.1

# Production Configuration Example
# HOST=https://boi-na-nuvem-backend.onrender.com
# NODE_ENV=production
```

## 🚀 Running the Application

### Development
```bash
# Start in development mode with hot-reload
npm run start:dev

# Start in debug mode
npm run start:debug
```

### Production
```bash
# Build the project
npm run build

# Start in production mode
npm run start:prod
```

### Other Commands
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Format code
npm run format

# Run linting
npm run lint
```

## 📚 API Documentation

Interactive API documentation is available via Swagger:

- **Local**: http://localhost:3000/docs
- **Production**: https://boi-na-nuvem-backend.onrender.com/docs

### Main Endpoints

- `GET /plans` - List all available plans
- `GET /properties` - Property management
- `GET /locations` - Location management
- `GET /service-providers` - Service provider management
- `GET /employees` - Employee management
- `GET /suppliers` - Supplier management
- `GET /buyers` - Buyer management
- `GET /animals` - Animal management

### System Endpoints

- `GET /health` - Health check endpoint
- `GET /metrics` - Prometheus metrics endpoint

## 🔒 Security

The application implements multiple security layers:

- **Helmet**: Comprehensive HTTP security headers including:
  - Content Security Policy (CSP)
  - HTTP Strict Transport Security (HSTS)
  - XSS Protection
  - Frame Options (clickjacking protection)
  - Content Type Options (MIME sniffing protection)
  - Referrer Policy
- **CORS**: Configured allowed origins with credentials support
- **Rate Limiting**: API abuse protection with Throttler
- **Validation**: Automatic input data validation with class-validator
- **Logging**: Complete logging system for security auditing

### CORS Configuration

Allowed origins:
- `https://boi-na-nuvem.onrender.com` (production)
- `http://localhost:5173` (development)
- `http://localhost:5174` (alternative development)

## 📊 Logging

The system uses Winston for logging with different levels:

- **Combined logs**: `logs/combined.log`
- **Error logs**: `logs/error.log`
- **Exceptions**: `logs/exceptions.log`
- **Rejections**: `logs/rejections.log`

## 🚀 Caching

The application implements in-memory caching for improved performance:

- **Cache Manager**: Global caching with configurable TTL and max items
- **Cache Interceptor**: Automatic caching of GET requests
- **Configurable**: Cache settings can be adjusted via environment variables
- **Performance**: Reduces database load and improves response times

## 📈 Monitoring & Metrics

The application includes comprehensive monitoring capabilities:

- **Prometheus Metrics**: Automatic collection of HTTP request metrics
- **Custom Metrics**: 
  - `http_requests_total` - Total HTTP requests with method, route, and status labels
  - `http_request_duration_seconds` - Request duration histogram
  - `active_connections` - Number of active connections gauge
- **Metrics Endpoint**: Available at `/metrics` for Prometheus scraping
- **Health Checks**: Built-in health monitoring at `/health`
- **Performance Monitoring**: Request timing and error rate tracking

## 🧪 Testing

```bash
# Unit tests
npm run test

# Tests with coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `build` | Compile TypeScript project |
| `format` | Format code with Prettier |
| `start` | Start the application |
| `start:dev` | Start in development mode |
| `start:debug` | Start in debug mode |
| `start:prod` | Start in production mode |
| `lint` | Run ESLint |
| `test` | Run unit tests |
| `test:watch` | Run tests in watch mode |
| `test:cov` | Run tests with coverage |
| `test:debug` | Run tests in debug mode |
| `test:e2e` | Run end-to-end tests |

## 🌐 Deployment

The application is configured for deployment on Render.com:

- **Production URL**: https://boi-na-nuvem-backend.onrender.com
- **Documentation**: https://boi-na-nuvem-backend.onrender.com/docs

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED License. See the `package.json` file for more details.

## 📞 Support

For support and questions, please contact us through the repository issues.

---

**Built with ❤️ using NestJS**
