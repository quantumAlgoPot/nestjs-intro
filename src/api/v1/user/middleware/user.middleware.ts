import { Injectable, NestMiddleware } from '@nestjs/common';
import * as Joi from 'joi';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private responseService: ResponseService,
    private readonly consoleService: ConsoleService,
  ) {}

  use(req: any, res: any, next: () => void) {
    try {
      this.consoleService.print('On line 14 of User.Update.Middleware.ts');
      const schema = Joi.object().keys({
        username: Joi.string().optional(),
        password: Joi.string().optional(),
      });
      const { error } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error)
        return this.responseService.badRequestResponse(
          error.details[0].message,
          res,
        );
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
    next();
  }
}
