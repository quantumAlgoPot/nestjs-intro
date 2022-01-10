import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseService } from 'src/utils/response/response.service';
import { Products } from './products';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    protected productService: ProductsService,
    public readonly responseService: ResponseService,
  ) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPprice: string,
  ): { title: string; desc: string; price: string } {
    try {
      const generatedId = this.productService.insertProduct(
        prodTitle,
        prodDesc,
        prodPprice,
      );
      return this.responseService.successResponse(true, { id: generatedId });
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Get()
  retrieveAllProducts(): [Products] {
    try {
      return this.responseService.successResponse(
        true,
        this.productService.getAllProducts(),
      );
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Get(':id')
  retrievSingleProduct(@Param('id') productId: string): Products {
    try {
      const product = this.productService.getSingleProduct(productId);
      console.log(product);
      if (product) {
        return this.responseService.successResponse(true, product);
      } else {
        return this.responseService.successResponse(false, 'No Data Found');
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }
}
