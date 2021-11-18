import App from '@/app';
import { UsersController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import request from 'supertest';

const app = new App([UsersController]);

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /api/users', () => {
    it('response statusCode 200 / findAll', () => {
      const findUser: User[] = userModel;
      return request(app.getServer()).get('/api/users').expect(200, { data: findUser, message: 'findAll' });
    });
  });

  describe('[GET] /api/users/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const userId = 1;
      const findUser: User = userModel.find(user => user.id === userId);
      return request(app.getServer()).get(`/api/users/${userId}`).expect(200, { data: findUser, message: 'findOne' });
    });
  });

  describe('[POST] /api/users', () => {
    it('response statusCode 201 / created', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };
      return request(app.getServer()).post('/api/users').send(userData).expect(201);
    });
  });

  describe('[PUT] /api/users/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const userId = 1;
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };
      return request(app.getServer()).put(`/api/users/${userId}`).send(userData).expect(200);
    });
  });

  describe('[DELETE] /api/users/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const userId = 1;
      return request(app.getServer()).delete(`/api/users/${userId}`).expect(200);
    });
  });
});
