import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getSingleUserByName(username);
    console.log(user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
