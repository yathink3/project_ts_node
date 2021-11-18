import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import request from 'supertest';

const app = new App([IndexController]);

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /api/', () => {
    it('response statusCode 200', () => {
      return request(app.getServer()).get('/api/').expect(200);
    });
  });
});
