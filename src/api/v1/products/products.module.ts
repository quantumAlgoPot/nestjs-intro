import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { ProductsController } from './controller/products.controller';
import { ProductsEntity, ProductssSchema } from './entity/products.entity';
import { ProductMiddleware } from './middleware/product.middleware';
import { ProductsService } from './service/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ResponseService, ConsoleService],
  imports: [
    MongooseModule.forFeature([
      { name: ProductsEntity.name, schema: ProductssSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: ProductsEntity.name, schema: ProductssSchema },
    ]),
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes('products');
  }
}
