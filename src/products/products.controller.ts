import { Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(protected productService: ProductsService) {}

  @Post()
  addProduct(title: string, desc: string, price: string): any {
    this.productService.insertProduct(title, desc, price);
  }
}
