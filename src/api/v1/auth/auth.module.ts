import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { UserService } from '../user/service/user.service';
import { ConsoleService } from 'src/utils/console/console.service';
import { LocalStrategy } from './service/local.strategy.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule],
  providers: [AuthService, UserService, ConsoleService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
