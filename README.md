# Boi na Nuvem Backend

Backend API for farm and animal management, built with NestJS.

## 📋 Description

**Boi na Nuvem** (Cow in the Cloud) is a farm management application that allows you to control properties, animals, employees, suppliers, buyers, and service providers. The API provides RESTful endpoints for all these functionalities, with automatic documentation via Swagger.

## 🚀 Technologies

- **NestJS** - Node.js framework for server-side applications
- **TypeScript** - Programming language
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing and verification
- **Winston** - Logging system with structured logging
- **Swagger** - API documentation and interactive testing
- **Helmet** - HTTP security headers and protection
- **Throttler** - Rate limiting and API abuse protection
- **Class Validator** - Data validation and transformation
- **Prometheus** - Metrics collection and monitoring
- **Cache Manager** - In-memory caching for performance
- **Date-fns** - Date manipulation utilities
- **OpenAI** - AI-powered pasture planning and climate analysis
- **Jest** - Unit and e2e testing framework with comprehensive mocking
- **Supertest** - HTTP assertion library for API testing

## 📁 Project Structure

```
src/
├── animal/           # Animal management
├── buyer/            # Buyer management
├── cache/            # Cache management and interceptors
├── common/           # Common utilities and services
│   ├── helpers/      # Response helpers and utilities
│   ├── interfaces/   # Common interfaces
│   └── services/     # Shared services (email)
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
├── user/             # User authentication and management
│   └── dto/          # User data transfer objects
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
JWT_REFRESH_EXPIRES_IN=7d

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here

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
- `GET /property/climate/pasture-planning` - AI-powered pasture planning based on climate data
- `GET /locations` - Location management
- `GET /service-providers` - Service provider management
- `GET /employees` - Employee management
- `GET /suppliers` - Supplier management
- `GET /buyers` - Buyer management
- `GET /animals` - Animal management

### User Management Endpoints

- `POST /user/register` - Register a new user with automatic subscription
- `POST /user/login` - User authentication with JWT tokens and remember me option
- `POST /user/refresh` - Refresh access token using refresh token
- `POST /user/forgot-password` - Request password reset code via email
- `POST /user/reset-password` - Reset password using valid reset code
- `POST /user/validate-reset-code` - Validate password reset code
- `GET /user` - Get all registered users
- `GET /user/:id` - Get user by ID
- `GET /user/email/:email` - Get user by email address
- `GET /user/:id/subscription` - Get user subscription details

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
- **JWT Authentication**: Secure token-based authentication with:
  - Access tokens with user information and subscription details
  - Refresh tokens for token renewal
  - Configurable token expiration (1d/30d based on remember me)
  - Secure password hashing with bcrypt
- **Password Reset**: Secure password recovery system with:
  - 8-digit numeric reset codes
  - 15-minute code expiration
  - Email-based code delivery
  - One-time use codes

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

## 🔐 Authentication & Security Features

The application includes a comprehensive authentication system:

### JWT Token System
- **Access Tokens**: Contain user information, subscription details, and expiration
- **Refresh Tokens**: Allow token renewal without re-authentication
- **Remember Me**: Extended token expiration (30d access, 60d refresh) vs standard (1d access, 7d refresh)
- **Token Payload**: Includes userId, name, planName, subscriptionType, subscriptionStatus, subscriptionCreatedAt

### Password Management
- **Secure Hashing**: bcrypt with salt rounds for password storage
- **Password Reset**: 8-digit numeric codes sent via email
- **Code Expiration**: Reset codes expire after 15 minutes
- **One-time Use**: Codes are invalidated after successful password reset
- **Validation**: Frontend can validate reset codes before showing reset form

### User Registration & Login
- **Automatic Subscription**: New users get Enterprise plan (trial) with 0 value
- **Email Validation**: Comprehensive email format validation
- **Duplicate Prevention**: Prevents duplicate emails and documents
- **Subscription Integration**: Login includes subscription and plan information

## 🌱 AI-Powered Pasture Planning

The application includes an intelligent pasture planning system powered by OpenAI:

### Features
- **Climate Data Integration**: Fetches historical climate data (temperature and precipitation) from Open-Meteo API
- **AI Analysis**: Uses GPT-5 nano to analyze climate patterns and generate personalized recommendations
- **Pasture Growth Classification**: Provides monthly pasture growth ratings (Good, Medium, Poor)
- **Reproductive Calendar**: Generates annual breeding calendar with insemination, calving, and supplementation schedules
- **Portuguese Language**: All recommendations are provided in Portuguese for Brazilian farmers
- **Markdown Format**: Returns structured, easy-to-read planning documents

### Usage
```bash
GET /property/climate/pasture-planning?lat=-23.5505&lon=-46.6333
```

### Response Format
```json
{
  "planning": [
    {"mes": "Janeiro", "estado": "Bom"},
    {"mes": "Fevereiro", "estado": "Bom"},
    {"mes": "Março", "estado": "Bom"},
    {"mes": "Abril", "estado": "Médio"}
  ]
}
```

### Requirements
- Valid OpenAI API key configured in `OPENAI_API_KEY` environment variable
- Latitude and longitude coordinates for the property location
- Internet connection for climate data and AI processing

## 📧 Email Service

The application includes a mock email service for development:

### Features
- **Password Reset Emails**: Professional HTML emails with reset codes
- **Confirmation Emails**: Password reset confirmation notifications
- **Logging**: All emails are logged to console for development
- **Extensible**: Ready for integration with real email services (SendGrid, AWS SES, Mailgun)

### Email Templates
- **Professional Design**: HTML emails with company branding
- **Security Information**: Clear instructions about code expiration and usage
- **Portuguese Language**: Localized content for Brazilian users
- **Responsive**: Mobile-friendly email templates

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

The application has comprehensive test coverage with both unit and end-to-end tests.

### Test Structure

```
test/
├── app.e2e-spec.ts              # Basic application e2e tests
├── user-registration.e2e-spec.ts # User registration flow e2e tests
├── app-integration.e2e-spec.ts   # Integration tests (health, swagger, security)
└── jest-e2e.json                # E2E test configuration

src/
├── **/*.spec.ts                 # Unit tests for each module
└── **/*.controller.spec.ts      # Controller unit tests
```

### Test Coverage

- **Unit Tests**: 168 tests across 27 test suites
- **E2E Tests**: 29 tests across 3 test suites
- **Total Coverage**: 100% of critical paths
- **Test Types**:
  - Controller tests with mocked dependencies
  - Service tests with business logic validation
  - Integration tests for API endpoints
  - Health check and monitoring tests
  - Security and validation tests

### Running Tests

```bash
# Run all unit tests
npm run test

# Run unit tests with coverage report
npm run test:cov

# Run unit tests in watch mode
npm run test:watch

# Run unit tests in debug mode
npm run test:debug

# Run end-to-end tests
npm run test:e2e

# Run specific test file
npm test -- --testPathPatterns=health.controller.spec.ts
```

### Test Features

- **Mocking**: Comprehensive mocking of external dependencies
- **Validation Testing**: Input validation and error handling
- **Security Testing**: CORS, rate limiting, and security headers
- **API Testing**: Complete endpoint testing with request/response validation
- **Health Monitoring**: Health check and metrics endpoint testing
- **Memory Management**: Optimized test setup to prevent memory leaks
- **Cross-platform**: Tests work on Windows, Linux, and macOS

### Test Results

All tests are currently passing:
- ✅ **168/168 unit tests passing**
- ✅ **29/29 e2e tests passing**
- ✅ **27/27 test suites passing**
- ✅ **No memory leaks or warnings**

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
