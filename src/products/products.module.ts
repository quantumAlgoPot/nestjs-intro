import { Module } from '@nestjs/common';
import { ResponseService } from 'src/utils/response/response.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ResponseService],
})
export class ProductsModule {}
