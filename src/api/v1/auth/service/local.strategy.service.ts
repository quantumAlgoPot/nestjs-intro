import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ConsoleService } from 'src/utils/console/console.service';
import { Auth } from '../interface/auth';
import { AuthService } from './auth.service';
export type User = Auth;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly consoleService: ConsoleService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.consoleService.print(username + ' ' + password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
