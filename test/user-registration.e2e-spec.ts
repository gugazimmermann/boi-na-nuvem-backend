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
    await app.close();
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
});
