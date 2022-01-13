import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { UserService } from '../user/service/user.service';
import { ConsoleService } from 'src/utils/console/console.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.jwt_token,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UserService, ConsoleService],
  exports: [
    AuthService,
    JwtModule.register({
      secret: process.env.jwt_token,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {
  constructor(private readonly configService: ConfigService) {}
}
