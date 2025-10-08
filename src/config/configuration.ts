export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'http://localhost',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    name: process.env.DATABASE_NAME || 'boi_na_nuvem',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  app: {
    title: process.env.APP_TITLE || 'Boi na Nuvem Backend',
    version: process.env.APP_VERSION || '0.0.1',
    environment: process.env.NODE_ENV || 'development',
  },
  prometheus: {
    enabled: process.env.PROMETHEUS_ENABLED === 'true' || true,
    path: process.env.PROMETHEUS_PATH || '/metrics',
  },
  health: {
    enabled: process.env.HEALTH_ENABLED === 'true' || true,
    path: process.env.HEALTH_PATH || '/health',
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '300', 10), 
    max: parseInt(process.env.CACHE_MAX || '100', 10), 
    enabled: process.env.CACHE_ENABLED === 'true' || true,
  },
});
