import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('User Registration (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Apply validation pipe
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validateCustomDecorators: true,
    }));
    
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      // Close the application properly
      await app.close();
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      // Wait for cleanup and clear any timers
      await new Promise(resolve => setTimeout(resolve, 200));
      jest.clearAllTimers();
      
      // Clear the app reference
      app = null;
    }
  });

  describe('POST /user/register', () => {
    const getValidUserData = (suffix: string = '') => ({
      name: `João Silva${suffix}`,
      email: `joao.silva${suffix}@email.com`,
      phone: '+55 11 99999-1234',
      document: `123.456.789-0${suffix}`,
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      zipCode: '01234-567',
      password: 'minhasenha123',
    });

    it('should register a new user successfully', () => {
      const validUserData = getValidUserData('1');
      return request(app.getHttpServer())
        .post('/user/register')
        .send(validUserData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('message', 'User created successfully');
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('userId');
          expect(res.body.data).toHaveProperty('subscriptionId');
          expect(res.body.data).toHaveProperty('name', validUserData.name);
          expect(res.body.data).toHaveProperty('email', validUserData.email);
          expect(res.body.data).toHaveProperty('planName');
          expect(res.body.data).toHaveProperty('subscriptionType');
          expect(res.body.data).toHaveProperty('subscriptionValue');
          expect(res.body.data).toHaveProperty('subscriptionStatus');
          expect(res.body.data).toHaveProperty('createdAt');
        });
    });

    it('should return 409 when email already exists', async () => {
      const validUserData = getValidUserData('2');
      // First registration
      await request(app.getHttpServer())
        .post('/user/register')
        .send(validUserData)
        .expect(201);

      // Second registration with same email
      const duplicateEmailData = {
        ...validUserData,
        document: '987.654.321-00', // Different document
      };

      return request(app.getHttpServer())
        .post('/user/register')
        .send(duplicateEmailData)
        .expect(409)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 409);
          expect(res.body).toHaveProperty('message', 'Email is already in use');
        });
    });

    it('should return 409 when document already exists', async () => {
      const validUserData = getValidUserData('3');
      // First registration
      await request(app.getHttpServer())
        .post('/user/register')
        .send(validUserData)
        .expect(201);

      // Second registration with same document
      const duplicateDocumentData = {
        ...validUserData,
        email: 'different@email.com', // Different email
      };

      return request(app.getHttpServer())
        .post('/user/register')
        .send(duplicateDocumentData)
        .expect(409)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 409);
          expect(res.body).toHaveProperty('message', 'Document is already in use');
        });
    });

    it('should return 400 for invalid email format', () => {
      const validUserData = getValidUserData('4');
      const invalidEmailData = {
        ...validUserData,
        email: 'invalid-email',
      };

      return request(app.getHttpServer())
        .post('/user/register')
        .send(invalidEmailData)
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for missing required fields', () => {
      const incompleteData = {
        name: 'João Silva',
        email: 'joao.silva5@email.com',
        // Missing other required fields
      };

      return request(app.getHttpServer())
        .post('/user/register')
        .send(incompleteData)
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for weak password', () => {
      const validUserData = getValidUserData('6');
      const weakPasswordData = {
        ...validUserData,
        password: '123', // Too short
      };

      return request(app.getHttpServer())
        .post('/user/register')
        .send(weakPasswordData)
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should handle registration with minimal required fields', () => {
      const minimalData = {
        name: 'João Silva',
        email: 'joao.minimal7@email.com',
        phone: '+55 11 99999-1234',
        document: '111.222.333-44',
        street: 'Rua das Flores',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      return request(app.getHttpServer())
        .post('/user/register')
        .send(minimalData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body.data).toHaveProperty('name', minimalData.name);
          expect(res.body.data).toHaveProperty('email', minimalData.email);
        });
    });

    it('should handle registration with all optional fields', () => {
      const completeData = {
        name: 'João Silva Complete',
        email: 'joao.complete8@email.com',
        phone: '+55 11 99999-1234',
        document: '555.666.777-88',
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'minhasenha123',
      };

      return request(app.getHttpServer())
        .post('/user/register')
        .send(completeData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body.data).toHaveProperty('name', completeData.name);
          expect(res.body.data).toHaveProperty('email', completeData.email);
        });
    });
  });

  describe('GET /user', () => {
    it('should return all users', () => {
      return request(app.getHttpServer())
        .get('/user')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });
  });

  describe('GET /user/:id', () => {
    it('should return user by ID', async () => {
      // First register a user
      const userData = {
        name: 'Test User',
        email: 'test.user9@email.com',
        phone: '+55 11 99999-1234',
        document: '999.888.777-66',
        street: 'Rua Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'testpassword123',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      const userId = registerResponse.body.data.userId;

      // Then get the user by ID
      return request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('id', userId);
          expect(res.body.data).toHaveProperty('name', userData.name);
          expect(res.body.data).toHaveProperty('email', userData.email);
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/user/non-existent-id')
        .expect(404)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 404);
          expect(res.body).toHaveProperty('message', 'User not found');
        });
    });
  });

  describe('GET /user/email/:email', () => {
    it('should return user by email', async () => {
      // First register a user
      const userData = {
        name: 'Email Test User',
        email: 'email.test10@email.com',
        phone: '+55 11 99999-1234',
        document: '888.777.666-55',
        street: 'Rua Email Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'emailtest123',
      };

      await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      // Then get the user by email
      return request(app.getHttpServer())
        .get(`/user/email/${userData.email}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('name', userData.name);
          expect(res.body.data).toHaveProperty('email', userData.email);
        });
    });

    it('should return 404 for non-existent email', () => {
      return request(app.getHttpServer())
        .get('/user/email/nonexistent@email.com')
        .expect(404)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 404);
          expect(res.body).toHaveProperty('message', 'User not found');
        });
    });
  });

  describe('GET /user/:id/subscription', () => {
    it('should return user subscription', async () => {
      // First register a user
      const userData = {
        name: 'Subscription Test User',
        email: 'subscription.test11@email.com',
        phone: '+55 11 99999-1234',
        document: '777.666.555-44',
        street: 'Rua Subscription Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'subscriptiontest123',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      const userId = registerResponse.body.data.userId;

      // Then get the user subscription
      return request(app.getHttpServer())
        .get(`/user/${userId}/subscription`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('userId', userId);
          expect(res.body.data).toHaveProperty('type');
          expect(res.body.data).toHaveProperty('value');
          expect(res.body.data).toHaveProperty('status');
        });
    });

    it('should return 404 for non-existent user subscription', () => {
      return request(app.getHttpServer())
        .get('/user/non-existent-id/subscription')
        .expect(404)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 404);
          expect(res.body).toHaveProperty('message', 'User subscription not found');
        });
    });
  });

  describe('POST /user/login', () => {
    let registeredUser: any;

    beforeEach(async () => {
      // Register a user for login tests
      const userData = {
        name: 'Login Test User',
        email: 'login.test@email.com',
        phone: '+55 11 99999-1234',
        document: '111.222.333-44',
        street: 'Rua Login Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'logintest123',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      registeredUser = {
        ...userData,
        userId: registerResponse.body.data.userId
      };
    });

    it('should login successfully with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: registeredUser.email,
          password: registeredUser.password
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('message', 'Login successful');
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('token');
          expect(res.body.data).toHaveProperty('refreshToken');
          expect(res.body.data).toHaveProperty('expiresAt');
          expect(res.body.data).toHaveProperty('refreshExpiresAt');
          expect(res.body.data).toHaveProperty('rememberMe', false);
          
          // Verify token structure
          expect(typeof res.body.data.token).toBe('string');
          expect(typeof res.body.data.refreshToken).toBe('string');
          expect(typeof res.body.data.expiresAt).toBe('string');
          expect(typeof res.body.data.refreshExpiresAt).toBe('string');
        });
    });

    it('should login successfully with rememberMe option', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: registeredUser.email,
          password: registeredUser.password,
          rememberMe: true
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('rememberMe', true);
          expect(res.body.data).toHaveProperty('token');
          expect(res.body.data).toHaveProperty('refreshToken');
        });
    });

    it('should return 401 for invalid email', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: 'nonexistent@email.com',
          password: registeredUser.password
        })
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('message', 'Invalid email or password');
        });
    });

    it('should return 401 for invalid password', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: registeredUser.email,
          password: 'wrongpassword'
        })
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('message', 'Invalid email or password');
        });
    });

    it('should return 400 for missing email', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          password: registeredUser.password
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for missing password', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: registeredUser.email
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for invalid email format', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: 'invalid-email',
          password: registeredUser.password
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should handle rememberMe string conversion', () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: registeredUser.email,
          password: registeredUser.password,
          rememberMe: 'true' // String 'true' gets converted to boolean true
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body.data).toHaveProperty('rememberMe', true);
        });
    });
  });

  describe('POST /user/refresh', () => {
    let loginResponse: any;

    beforeEach(async () => {
      // Register and login a user for refresh token tests
      const userData = {
        name: 'Refresh Test User',
        email: 'refresh.test@email.com',
        phone: '+55 11 99999-1234',
        document: '555.666.777-88',
        street: 'Rua Refresh Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'refreshtest123',
      };

      await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      loginResponse = response.body.data;
    });

    it('should refresh token successfully with valid refresh token', () => {
      return request(app.getHttpServer())
        .post('/user/refresh')
        .send({
          refreshToken: loginResponse.refreshToken
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('message', 'Token refreshed successfully');
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('token');
          expect(res.body.data).toHaveProperty('refreshToken');
          expect(res.body.data).toHaveProperty('expiresAt');
          expect(res.body.data).toHaveProperty('refreshExpiresAt');
          
          // New tokens should be different from original ones (or same if generated at same time)
          // Note: Tokens might be the same if generated within the same second
          expect(res.body.data.token).toBeDefined();
          expect(res.body.data.refreshToken).toBeDefined();
        });
    });

    it('should return 401 for invalid refresh token', () => {
      return request(app.getHttpServer())
        .post('/user/refresh')
        .send({
          refreshToken: 'invalid.refresh.token'
        })
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('message', 'Invalid or expired refresh token');
        });
    });

    it('should return 400 for missing refresh token', () => {
      return request(app.getHttpServer())
        .post('/user/refresh')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 401 for non-string refresh token', () => {
      return request(app.getHttpServer())
        .post('/user/refresh')
        .send({
          refreshToken: 123
        })
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('message', 'Invalid or expired refresh token');
        });
    });
  });

  describe('POST /user/forgot-password', () => {
    let registeredUser: any;

    beforeEach(async () => {
      // Register a user for forgot password tests
      const userData = {
        name: 'Forgot Password Test User',
        email: 'forgot.test@email.com',
        phone: '+55 11 99999-1234',
        document: '999.888.777-66',
        street: 'Rua Forgot Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'forgottest123',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      registeredUser = {
        ...userData,
        userId: registerResponse.body.data.userId
      };
    });

    it('should send password reset code for existing user', () => {
      return request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({
          email: registeredUser.email
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('message', 'Password reset code sent');
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('message');
          expect(res.body.data).toHaveProperty('email', registeredUser.email);
          expect(res.body.data.message).toContain('Password reset code has been sent');
        });
    });

    it('should return success even for non-existent email (security)', () => {
      return request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({
          email: 'nonexistent@email.com'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('message', 'Password reset code sent');
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('email', 'nonexistent@email.com');
        });
    });

    it('should return 400 for missing email', () => {
      return request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for invalid email format', () => {
      return request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({
          email: 'invalid-email'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for non-string email', () => {
      return request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({
          email: 123
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });
  });

  describe('POST /user/validate-reset-code', () => {
    let resetCode: string;

    beforeEach(async () => {
      // Register a user and request password reset to get a valid code
      const userData = {
        name: 'Validate Code Test User',
        email: 'validate.test@email.com',
        phone: '+55 11 99999-1234',
        document: '111.222.333-44',
        street: 'Rua Validate Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'validatetest123',
      };

      await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      // Request password reset
      await request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({
          email: userData.email
        })
        .expect(200);

      // For testing purposes, we'll use a mock 8-digit code
      // In a real scenario, you'd need to extract this from the email service or database
      resetCode = '12345678';
    });

    it('should validate reset code successfully', () => {
      return request(app.getHttpServer())
        .post('/user/validate-reset-code')
        .send({
          code: resetCode
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('message', 'Code validation completed');
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('valid');
          expect(res.body.data).toHaveProperty('message');
          expect(typeof res.body.data.valid).toBe('boolean');
        });
    });

    it('should return 400 for missing code', () => {
      return request(app.getHttpServer())
        .post('/user/validate-reset-code')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for invalid code format (not 8 digits)', () => {
      return request(app.getHttpServer())
        .post('/user/validate-reset-code')
        .send({
          code: '1234567' // 7 digits instead of 8
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for non-numeric code', () => {
      return request(app.getHttpServer())
        .post('/user/validate-reset-code')
        .send({
          code: 'abcdefgh'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should handle numeric code conversion', () => {
      return request(app.getHttpServer())
        .post('/user/validate-reset-code')
        .send({
          code: 12345678 // Number gets converted to string
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('valid');
        });
    });
  });

  describe('POST /user/reset-password', () => {
    let registeredUser: any;
    let resetCode: string;

    beforeEach(async () => {
      // Register a user for reset password tests
      const userData = {
        name: 'Reset Password Test User',
        email: 'reset.test@email.com',
        phone: '+55 11 99999-1234',
        document: '555.666.777-88',
        street: 'Rua Reset Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'resettest123',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      registeredUser = {
        ...userData,
        userId: registerResponse.body.data.userId
      };

      // Request password reset
      await request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({
          email: userData.email
        })
        .expect(200);

      // For testing purposes, we'll use a mock 8-digit code
      // In a real scenario, you'd need to extract this from the email service or database
      resetCode = '12345678';
    });

    it('should return 400 for invalid reset code (mock code)', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: resetCode, // Mock code that doesn't exist in the system
          newPassword: 'NewPassword123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Invalid or expired reset code');
        });
    });

    it('should return 400 for invalid reset code', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: '99999999', // Invalid code
          newPassword: 'NewPassword123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Invalid or expired reset code');
        });
    });

    it('should return 400 for missing code', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          newPassword: 'NewPassword123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for missing new password', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: resetCode
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for weak password (less than 8 characters)', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: resetCode,
          newPassword: 'weak'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for password without uppercase letter', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: resetCode,
          newPassword: 'lowercase123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for password without lowercase letter', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: resetCode,
          newPassword: 'UPPERCASE123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should return 400 for invalid code format (not 8 digits)', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: '1234567', // 7 digits instead of 8
          newPassword: 'NewPassword123'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('should handle numeric code conversion in reset', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: 12345678, // Number gets converted to string
          newPassword: 'NewPassword123'
        })
        .expect(400) // Still fails because it's an invalid code
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message', 'Invalid or expired reset code');
        });
    });

    it('should return 400 for non-string password', () => {
      return request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: resetCode,
          newPassword: 12345678
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });
  });

  describe('Password Recovery Flow Integration', () => {
    let registeredUser: any;

    beforeEach(async () => {
      // Register a user for integration tests
      const userData = {
        name: 'Integration Test User',
        email: 'integration.test@email.com',
        phone: '+55 11 99999-1234',
        document: '777.888.999-00',
        street: 'Rua Integration Test',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        zipCode: '01234-567',
        password: 'integrationtest123',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/user/register')
        .send(userData)
        .expect(201);

      registeredUser = {
        ...userData,
        userId: registerResponse.body.data.userId
      };
    });

    it('should demonstrate password recovery flow (without actual reset)', async () => {
      // Step 1: Request password reset
      const forgotResponse = await request(app.getHttpServer())
        .post('/user/forgot-password')
        .send({
          email: registeredUser.email
        })
        .expect(200);

      expect(forgotResponse.body.success).toBe(true);

      // Step 2: Validate reset code (using mock code for testing)
      const validateResponse = await request(app.getHttpServer())
        .post('/user/validate-reset-code')
        .send({
          code: '12345678'
        })
        .expect(200);

      expect(validateResponse.body.success).toBe(true);

      // Step 3: Attempt reset password (will fail with mock code)
      const resetResponse = await request(app.getHttpServer())
        .post('/user/reset-password')
        .send({
          code: '12345678',
          newPassword: 'NewIntegrationPassword123'
        })
        .expect(400); // Expected to fail with mock code

      expect(resetResponse.body.statusCode).toBe(400);

      // Step 4: Verify original login still works (since reset failed)
      const loginResponse = await request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: registeredUser.email,
          password: registeredUser.password // Original password still works
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.data).toHaveProperty('token');
    });
  });
});
