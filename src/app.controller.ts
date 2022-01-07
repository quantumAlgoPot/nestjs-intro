import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseService } from './utils/response/response.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getDouble(): any {
    try {
      const res = this.responseService.successResponse(
        true,
        this.appService.getNo(),
      );
      console.log(res);
      return res;
    } catch (error) {
      return this.responseService.badRequestResponse(error.message);
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
