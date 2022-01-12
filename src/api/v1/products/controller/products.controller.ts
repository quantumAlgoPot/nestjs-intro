/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { productsDto } from '../dto/products.dto';
import { Products } from '../interface/products';
import { ProductsService } from '../service/products.service';
import { Response } from 'express';
import { validate, ValidationError, validateOrReject } from 'class-validator';

@Controller('products')
export class ProductsController {
  constructor(
    protected productService: ProductsService,
    public readonly responseService: ResponseService,
    public readonly consoleService: ConsoleService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  addProduct(@Body() product: productsDto, @Res() res: Response) {
    try {
      validate(product).then((errors) => {
        console.log(errors);
        if (errors.length > 0) {
          console.log(errors);
          this.responseService.badRequestResponse(errors, res);
        }
      });

      const generatedId = this.productService.insertProduct(
        product.title,
        product.desc,
        product.price,
      );
      this.responseService.successResponse(true, { id: generatedId }, res);
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @Get()
  retrieveAllProducts(@Res() res: Response) {
    try {
      return this.responseService.successResponse(
        true,
        this.productService.getAllProducts(),
        res,
      );
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @Get(':id')
  retrievSingleProduct(@Param('id') productId: string, @Res() res: Response) {
    try {
      const product = this.productService.getSingleProduct(productId);
      this.consoleService.print(product);
      if (product) {
        return this.responseService.successResponse(true, product, res);
      } else {
        return this.responseService.successResponse(
          false,
          'No Data Found',
          res,
        );
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @Patch(':id')
  updateSingleProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: string,
    @Res() res: Response,
  ) {
    try {
      const product = this.productService.updateSingleProduct(
        productId,
        prodTitle,
        prodDesc,
        prodPrice,
      );
      this.consoleService.print(product);
      if (product) {
        return this.responseService.successResponse(true, product, res);
      } else {
        return this.responseService.successResponse(
          false,
          'No Data Found',
          res,
        );
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string, @Res() res: Response) {
    try {
      this.productService.deleteProduct(prodId);
      return null;
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }
}
