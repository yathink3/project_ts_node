import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = this.users;
    // const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = this.users.find(user => user.id === userId);
    // const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = this.users.find(user => user.email === userData.email);
    // const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUserData: User = { id: this.users.length + 1, ...userData, password: hashedPassword };
    this.users = [...this.users, createUserData];

    // const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserData: User[] = this.users.map((user: User) => {
      if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
      return user;
    });

    return updateUserData;

    // if (userData.email) {
    //   const findUser: User = await this.users.findOne({ email: userData.email });
    //   if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    // }

    // if (userData.password) {
    //   const hashedPassword = await bcrypt.hash(userData.password, 10);
    //   userData = { ...userData, password: hashedPassword };
    // }

    // const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    // if (!updateUserById) throw new HttpException(409, "You're not user");

    // return updateUserById;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
    return deleteUserData;

    // const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    // if (!deleteUserById) throw new HttpException(409, "You're not user");

    // return deleteUserById;
  }
}

export default UserService;
