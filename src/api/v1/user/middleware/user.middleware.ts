import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ResponseService } from 'src/utils/response/response.service';
const responseService = new ResponseService();

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      return responseService.badRequestResponse('Body Not Defined', res);
    }
    next();
  }
}
