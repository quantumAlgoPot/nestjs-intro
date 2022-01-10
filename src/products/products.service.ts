import { Injectable } from '@nestjs/common';
import { Products } from './products';

@Injectable()
export class ProductsService {
  private products: Products[] = [];

  insertProduct(title: string, desc: string, price: string) {
    const newProduct = new Products(new Date().toString(), title, desc, price);
    this.products.push(newProduct);
    return newProduct?.id;
  }

  getAllProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    return this.products.find((product) => product.id == productId);
  }
}
