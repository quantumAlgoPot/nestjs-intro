import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConsoleService } from 'src/utils/console/console.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly consoleService: ConsoleService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const breakedToken: any = this.jwtService.decode(
        request.headers.authorization.replace('Bearer ', ''),
      );
      this.consoleService.print(breakedToken);
      if (breakedToken == null) return false;
      return this.authService
        .validateUser(breakedToken.username, breakedToken.password)
        .then((userCheck) => {
          if (userCheck != null) {
            this.consoleService.print(true);
            return true;
          }
          this.consoleService.print(false);
          return false;
        });
    } catch (error) {
      return false;
    }
  }
}
