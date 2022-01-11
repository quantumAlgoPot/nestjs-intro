import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { Products } from './products';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    protected productService: ProductsService,
    public readonly responseService: ResponseService,
    public readonly consoleService: ConsoleService,
  ) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPprice: string,
  ): Products {
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
      this.consoleService.print(product);
      if (product) {
        return this.responseService.successResponse(true, product);
      } else {
        return this.responseService.successResponse(false, 'No Data Found');
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Patch(':id')
  updateSingleProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: string,
  ): Products {
    try {
      const product = this.productService.updateSingleProduct(
        productId,
        prodTitle,
        prodDesc,
        prodPrice,
      );
      this.consoleService.print(product);
      if (product) {
        return this.responseService.successResponse(true, product);
      } else {
        return this.responseService.successResponse(false, 'No Data Found');
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    try {
      this.productService.deleteProduct(prodId);
      return null;
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }
}
