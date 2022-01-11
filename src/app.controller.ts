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
  getHello(): any {
    // try {
    //   return this.responseService.successResponse(
    //     true,
    //     this.appService.getHello(),
    //   );
    // } catch (error) {
    //   return this.responseService.badRequestResponse(error.message);
    // }
  }
}
