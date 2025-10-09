import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('title', 'Boi na Nuvem Backend');
        expect(res.body.data).toHaveProperty('version', '0.0.1');
        expect(res.body.data).toHaveProperty('environment', 'test');
        expect(res.body).toHaveProperty('message', 'Application information retrieved successfully');
      });
  });
});
