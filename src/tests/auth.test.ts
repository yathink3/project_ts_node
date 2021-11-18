import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import request from 'supertest';

const app = new App([AuthController]);

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /api/signup', () => {
    it('response should have the Create userData', () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

      return request(app.getServer()).post('/api/signup').send(userData);
    });
  });

  describe('[POST] /api/login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        email: 'lim@gmail.com',
        password: 'q1w2e3r4',
      };
      return request(app.getServer())
        .post('/api/login')
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });
});
