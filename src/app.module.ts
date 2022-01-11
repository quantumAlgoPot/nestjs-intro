import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseService } from './utils/response/response.service';
import { ProductsController } from './api/v1/products/products.controller';
import { ProductsService } from './api/v1/products/products.service';
import { ProductsModule } from './api/v1/products/products.module';
import { ConsoleService } from './utils/console/console.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule,
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule,
    DatabaseModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ResponseService, ProductsService, ConsoleService],
})
export class AppModule {}
