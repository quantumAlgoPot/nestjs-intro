import {
  Module,
  NestModule,
  MiddlewareConsumer,
  forwardRef,
  RequestMethod,
} from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/service/auth.service';
import { UserController } from './controller/user.controller';
import { BodyMiddleware } from './middleware/body.middleware';
import { ParamMiddleware } from './middleware/param.middleware';
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
    consumer.apply(BodyMiddleware).forRoutes('user');
    consumer
      .apply(UserMiddleware)
      .forRoutes(
        { path: 'user/:id', method: RequestMethod.PATCH },
        { path: 'user', method: RequestMethod.POST },
      );
    consumer
      .apply(ParamMiddleware)
      .forRoutes(
        { path: 'user/:id', method: RequestMethod.PATCH },
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.DELETE },
      );
  }
}
