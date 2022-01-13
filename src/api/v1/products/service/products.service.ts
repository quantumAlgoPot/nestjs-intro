import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsoleService } from 'src/utils/console/console.service';
import { ProductsDocument, ProductsEntity } from '../entity/products.entity';
import { Products } from '../interface/products';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsEntity.name)
    private readonly productsModel: Model<ProductsDocument>,
    private readonly consoleService: ConsoleService,
  ) {}
  private products: Products[] = [];

  async insertProduct(product: Products): Promise<ProductsEntity> {
    const newProduct = new this.productsModel(product);
    await newProduct.save();
    return newProduct?._id;
  }

  async getAllProducts() {
    return await this.productsModel
      .find({ isDeleted: false })
      .select('title description price');
  }

  async getSingleProduct(productId: number) {
    return await this.productsModel
      .findOne({
        _id: productId,
        isDeleted: false,
      })
      .select('title description price')
      .lean();
  }

  async updateSingleProduct(product: Products) {
    this.consoleService.print(product);
    if ((await this.getSingleProduct(product.id)) != null) {
      // eslint-disable-next-line no-var
      var toBeUpdatedProduct: any = {};
      if (product.title) {
        toBeUpdatedProduct.title = product.title;
      }
      if (product.description) {
        toBeUpdatedProduct.description = product.description;
      }
      if (product.price) {
        toBeUpdatedProduct.price = product.price;
      }
      return await this.productsModel
        .findByIdAndUpdate(
          {
            _id: product.id,
            isDeleted: false,
          },
          toBeUpdatedProduct,
        )
        .select('username, password')
        .lean();
    } else {
      this.consoleService.print('On line 43 of User.Service.ts');
      return null;
    }
    return null;
  }

  async deleteProduct(productId: string) {
    return await this.productsModel
      .findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          isDeleted: true,
        },
      )
      .select('title')
      .lean();
  }
}
