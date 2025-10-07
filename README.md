# Boi na Nuvem Backend

Backend API for farm and animal management, built with NestJS.

## 📋 Description

**Boi na Nuvem** (Cow in the Cloud) is a farm management application that allows you to control properties, animals, employees, suppliers, buyers, and service providers. The API provides RESTful endpoints for all these functionalities, with automatic documentation via Swagger.

## 🚀 Technologies

- **NestJS** - Node.js framework for server-side applications
- **TypeScript** - Programming language
- **Winston** - Logging system
- **Swagger** - API documentation
- **Helmet** - HTTP security
- **Throttler** - Rate limiting
- **Class Validator** - Data validation
- **Jest** - Unit and e2e testing

## 📁 Project Structure

```
src/
├── animal/           # Animal management
├── buyer/            # Buyer management
├── config/           # Configurations (logger, throttler)
├── employee/         # Employee management
├── interceptors/     # Custom interceptors
├── location/         # Location management
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
- **Production**: https://boi-na-nuvem.onrender.com/docs

### Main Endpoints

- `GET /plans` - List all available plans
- `GET /properties` - Property management
- `GET /locations` - Location management
- `GET /service-providers` - Service provider management
- `GET /employees` - Employee management
- `GET /suppliers` - Supplier management
- `GET /buyers` - Buyer management
- `GET /animals` - Animal management

## 🔒 Security

The application implements multiple security layers:

- **Helmet**: HTTP security headers
- **CORS**: Allowed origins configuration
- **Rate Limiting**: API abuse protection
- **Validation**: Automatic input data validation
- **Logging**: Complete logging system for auditing

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

- **Production URL**: https://boi-na-nuvem.onrender.com
- **Documentation**: https://boi-na-nuvem.onrender.com/docs

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
