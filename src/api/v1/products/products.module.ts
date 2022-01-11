import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { ProductsController } from './controller/products.controller';
import { ProductMiddleware } from './middleware/product.middleware';
import { ProductsService } from './service/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ResponseService, ConsoleService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes('products');
  }
}
