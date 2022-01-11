import { Injectable } from '@nestjs/common';
import { Products } from '../interface/products';

@Injectable()
export class ProductsService {
  private products: Products[] = [];

  insertProduct(title: string, desc: string, price: string) {
    const newProduct = new Products(
      (Math.floor(Math.random() * 1000) + 1).toString(),
      title,
      desc,
      price,
    );
    this.products.push(newProduct);
    return newProduct?.id;
  }

  getAllProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    return this.products.find((product) => product.id == productId);
  }

  updateSingleProduct(
    productId: string,
    title: string,
    desc: string,
    price: string,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
    return this.products;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Products, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      return null;
    }
    return [product, productIndex];
  }
}
