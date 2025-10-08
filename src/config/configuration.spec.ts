describe('Configuration', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment variables
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  describe('default configuration', () => {
    it('should return default values when no environment variables are set', () => {
      // Clear environment variables
      delete process.env.PORT;
      delete process.env.HOST;
      delete process.env.DATABASE_HOST;
      delete process.env.DATABASE_PORT;
      delete process.env.DATABASE_USERNAME;
      delete process.env.DATABASE_PASSWORD;
      delete process.env.DATABASE_NAME;
      delete process.env.JWT_SECRET;
      delete process.env.JWT_EXPIRES_IN;
      delete process.env.APP_TITLE;
      delete process.env.APP_VERSION;
      delete process.env.NODE_ENV;
      delete process.env.PROMETHEUS_ENABLED;
      delete process.env.PROMETHEUS_PATH;
      delete process.env.HEALTH_ENABLED;
      delete process.env.HEALTH_PATH;
      delete process.env.CACHE_TTL;
      delete process.env.CACHE_MAX;
      delete process.env.CACHE_ENABLED;

      // Import configuration after clearing env vars
      const configuration = require('./configuration').default;

      const config = configuration();

      expect(config).toEqual({
        port: 3000,
        host: 'http://localhost',
        database: {
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'password',
          name: 'boi_na_nuvem',
        },
        jwt: {
          secret: 'your-secret-key',
          expiresIn: '1d',
        },
        app: {
          title: 'Boi na Nuvem Backend',
          version: '0.0.1',
          environment: 'development',
        },
        prometheus: {
          enabled: true,
          path: '/metrics',
        },
        health: {
          enabled: true,
          path: '/health',
        },
        cache: {
          ttl: 300,
          max: 100,
          enabled: true,
        },
      });
    });
  });

  describe('environment variable configuration', () => {
    it('should use environment variables when provided', () => {
      // Set environment variables
      process.env.PORT = '8080';
      process.env.HOST = 'https://api.example.com';
      process.env.DATABASE_HOST = 'db.example.com';
      process.env.DATABASE_PORT = '3306';
      process.env.DATABASE_USERNAME = 'admin';
      process.env.DATABASE_PASSWORD = 'secret';
      process.env.DATABASE_NAME = 'production_db';
      process.env.JWT_SECRET = 'super-secret-key';
      process.env.JWT_EXPIRES_IN = '7d';
      process.env.APP_TITLE = 'Production API';
      process.env.APP_VERSION = '1.0.0';
      process.env.NODE_ENV = 'production';
      process.env.PROMETHEUS_ENABLED = 'false';
      process.env.PROMETHEUS_PATH = '/custom-metrics';
      process.env.HEALTH_ENABLED = 'false';
      process.env.HEALTH_PATH = '/custom-health';
      process.env.CACHE_TTL = '600';
      process.env.CACHE_MAX = '200';
      process.env.CACHE_ENABLED = 'false';

      // Import configuration after setting env vars
      const configuration = require('./configuration').default;

      const config = configuration();

      expect(config).toEqual({
        port: 8080,
        host: 'https://api.example.com',
        database: {
          host: 'db.example.com',
          port: 3306,
          username: 'admin',
          password: 'secret',
          name: 'production_db',
        },
        jwt: {
          secret: 'super-secret-key',
          expiresIn: '7d',
        },
        app: {
          title: 'Production API',
          version: '1.0.0',
          environment: 'production',
        },
        prometheus: {
          enabled: true, // Defaults to true when not 'false'
          path: '/custom-metrics',
        },
        health: {
          enabled: true, // Defaults to true when not 'false'
          path: '/custom-health',
        },
        cache: {
          ttl: 600,
          max: 200,
          enabled: true, // Defaults to true when not 'false'
        },
      });
    });
  });

  describe('partial environment variable configuration', () => {
    it('should use environment variables for some values and defaults for others', () => {
      // Set only some environment variables
      process.env.PORT = '4000';
      process.env.DATABASE_HOST = 'test-db';
      process.env.APP_TITLE = 'Test API';
      process.env.NODE_ENV = 'test';
      process.env.CACHE_TTL = '120';

      // Import configuration after setting env vars
      const configuration = require('./configuration').default;

      const config = configuration();

      expect(config.port).toBe(4000);
      expect(config.host).toBe('http://localhost'); // default
      expect(config.database.host).toBe('test-db');
      expect(config.database.port).toBe(5432); // default
      expect(config.database.username).toBe('postgres'); // default
      expect(config.database.password).toBe('password'); // default
      expect(config.database.name).toBe('boi_na_nuvem'); // default
      expect(config.jwt.secret).toBe('your-secret-key'); // default
      expect(config.jwt.expiresIn).toBe('1d'); // default
      expect(config.app.title).toBe('Test API');
      expect(config.app.version).toBe('0.0.1'); // default
      expect(config.app.environment).toBe('test');
      expect(config.prometheus.enabled).toBe(true); // default
      expect(config.prometheus.path).toBe('/metrics'); // default
      expect(config.health.enabled).toBe(true); // default
      expect(config.health.path).toBe('/health'); // default
      expect(config.cache.ttl).toBe(120);
      expect(config.cache.max).toBe(100); // default
      expect(config.cache.enabled).toBe(true); // default
    });
  });

  describe('boolean environment variables', () => {
    it('should handle boolean environment variables correctly', () => {
      // Test true values
      process.env.PROMETHEUS_ENABLED = 'true';
      process.env.HEALTH_ENABLED = 'true';
      process.env.CACHE_ENABLED = 'true';

      let configuration = require('./configuration').default;
      let config = configuration();

      expect(config.prometheus.enabled).toBe(true);
      expect(config.health.enabled).toBe(true);
      expect(config.cache.enabled).toBe(true);

      // Test false values
      process.env.PROMETHEUS_ENABLED = 'false';
      process.env.HEALTH_ENABLED = 'false';
      process.env.CACHE_ENABLED = 'false';

      // Clear require cache to reload the module
      delete require.cache[require.resolve('./configuration')];
      configuration = require('./configuration').default;
      config = configuration();

      expect(config.prometheus.enabled).toBe(true); // Defaults to true when not 'false'
      expect(config.health.enabled).toBe(true); // Defaults to true when not 'false'
      expect(config.cache.enabled).toBe(true); // Defaults to true when not 'false'

      // Test undefined values (should default to true)
      delete process.env.PROMETHEUS_ENABLED;
      delete process.env.HEALTH_ENABLED;
      delete process.env.CACHE_ENABLED;

      delete require.cache[require.resolve('./configuration')];
      configuration = require('./configuration').default;
      config = configuration();

      expect(config.prometheus.enabled).toBe(true);
      expect(config.health.enabled).toBe(true);
      expect(config.cache.enabled).toBe(true);
    });
  });

  describe('numeric environment variables', () => {
    it('should parse numeric environment variables correctly', () => {
      process.env.PORT = '9000';
      process.env.DATABASE_PORT = '3306';
      process.env.CACHE_TTL = '1800';
      process.env.CACHE_MAX = '500';

      const configuration = require('./configuration').default;
      const config = configuration();

      expect(config.port).toBe(9000);
      expect(config.database.port).toBe(3306);
      expect(config.cache.ttl).toBe(1800);
      expect(config.cache.max).toBe(500);
    });

    it('should handle invalid numeric values gracefully', () => {
      process.env.PORT = 'invalid';
      process.env.DATABASE_PORT = 'not-a-number';
      process.env.CACHE_TTL = 'also-invalid';

      const configuration = require('./configuration').default;
      const config = configuration();

      expect(config.port).toBeNaN();
      expect(config.database.port).toBeNaN();
      expect(config.cache.ttl).toBeNaN();
    });
  });
});
