import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import validateEnv from '@utils/validateEnv';
import 'dotenv/config';
import 'reflect-metadata';

validateEnv();

const app = new App([IndexController, AuthController, UsersController]);
app.listen();
