import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseService } from './utils/response/response.service';
import { ProductsController } from './api/v1/products/controller/products.controller';
import { ProductsService } from './api/v1/products/service/products.service';
import { ProductsModule } from './api/v1/products/products.module';
import { UserModule } from './api/v1/user/user.module';
import { ConsoleService } from './utils/console/console.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { AuthController } from './api/v1/auth/controllers/auth.controller';
import { AuthService } from './api/v1/auth/service/auth.service';
import { LocalStrategy } from './api/v1/auth/service/local.strategy.service';
import { UserService } from './api/v1/user/service/user.service';
import { UserController } from './api/v1/user/controller/user.controller';

@Module({
  imports: [
    ProductsModule,
    UserModule,
    MongooseModule,
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    AuthController,
    UserController,
  ],
  providers: [
    AppService,
    ResponseService,
    ProductsService,
    ConsoleService,
    AuthService,
    LocalStrategy,
    UserService,
  ],
})
export class AppModule {}
