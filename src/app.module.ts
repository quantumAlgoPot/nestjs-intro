import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseService } from './utils/response/response.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ConsoleService } from './utils/console/console.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ProductsModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ResponseService, ProductsService, ConsoleService],
})
export class AppModule {}
