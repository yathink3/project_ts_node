import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { validationMiddleware } from '@middlewares/validation.middleware';
import userService from '@services/users.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller('/users')
export class UsersController {
  public userService = new userService();

  @Get()
  @OpenAPI({ summary: 'Return a list of users' })
  async getUsers() {
    const findAllUsersData: User[] = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Post()
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createUserData: User = await this.userService.createUser(userData);
    return { data: createUserData, message: 'created' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('id') userId: number) {
    const findOneUserData: User = await this.userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Put('/:id')
  @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') userId: number, @Body() userData: CreateUserDto) {
    const updateUserData: User[] = await this.userService.updateUser(userId, userData);
    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') userId: number) {
    const deleteUserData: User[] = await this.userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}
