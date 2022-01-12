import { Injectable, NestMiddleware } from '@nestjs/common';
import * as Joi from 'joi';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';

@Injectable()
export class ParamMiddleware implements NestMiddleware {
  constructor(
    private readonly responseService: ResponseService,
    private readonly consoleService: ConsoleService,
  ) {}
  use(req: any, res: any, next: () => void) {
    try {
      req.params.id = parseInt(req.params.id);
      const schema = Joi.object().keys({
        id: Joi.number().required(),
      });
      const { error } = schema.validate(req.params, {
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
