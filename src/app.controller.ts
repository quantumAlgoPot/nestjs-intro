import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseService } from './utils/response/response.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly responseService: ResponseService,
  ) {}
}
