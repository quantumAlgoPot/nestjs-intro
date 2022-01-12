import { Injectable } from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { User } from '../interface/user';

@Injectable()
export class UserService {
  private user: User[] = [];

  constructor(private readonly consoleService: ConsoleService) {}

  insertUser(username: string, password: string) {
    const newUser = new User(
      Math.floor(Math.random() * 1000) + 1,
      username,
      password,
    );
    this.user.push(newUser);
    return newUser?.id;
  }

  getAllUsers() {
    return [...this.user];
  }

  getSingleUser(userId: number) {
    return this.user.find((product) => product.id == userId);
  }

  updateSingleUser(user: User) {
    if (this.findUser(user.id) != null) {
      const [userObj, index] = this.findUser(user.id);
      this.consoleService.print('On line 32 of User.Service.ts');
      const updateUSer = { ...userObj };
      if (user.username) {
        updateUSer.username = user.username;
      }
      if (user.password) {
        updateUSer.password = user.password;
      }
      this.user[index] = updateUSer;
      return this.user;
    } else {
      this.consoleService.print('On line 43 of User.Service.ts');
      return null;
    }
  }

  deleteUser(userId: number) {
    console.log(userId);
    const index = this.findUser(userId)[1];
    this.user.splice(index, 1);
  }

  private findUser(id: number): [User, number] {
    this.consoleService.print(this.user);
    const userIndex = this.user.findIndex((user) => user.id == id);
    const user = this.user[userIndex];
    if (!user) {
      this.consoleService.print('returning null');
      return null;
    }
    this.consoleService.print('user' + user + ' userIndex ' + userIndex);
    return [user, userIndex];
  }

  async findOne(username: string): Promise<User | undefined> {
    this.consoleService.print(this.user);
    return this.user.find((user) => user.username === username);
  }
}
