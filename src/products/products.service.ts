import { Injectable } from '@nestjs/common';
import { Products } from './products';

@Injectable()
export class ProductsService {
  products: Products[] = [];

  insertProduct(title: string, desc: string, price: string) {
    const newProduct = new Products(new Date().toString(), title, desc, price);
    this.products.push(newProduct);
  }

  getProduct() {
    return 'abc';
  }
}
