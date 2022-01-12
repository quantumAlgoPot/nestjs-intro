import {
  Module,
  NestModule,
  MiddlewareConsumer,
  forwardRef,
} from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/service/auth.service';
import { UserController } from './controller/user.controller';
import { UserMiddleware } from './middleware/user.middleware';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, ResponseService, ConsoleService, AuthService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('user');
  }
}
