import { Body, Controller, Post } from '@nestjs/common';
import { ResponseService } from 'src/utils/response/response.service';
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
    const generatedId = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPprice,
    );
    return this.responseService.successResponse(true, { id: generatedId });
  }
}
