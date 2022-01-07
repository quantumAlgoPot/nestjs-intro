import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDouble(): string {
    return this.appService.getNo();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
