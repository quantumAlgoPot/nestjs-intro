import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
  successResponse(status = false, result, @Res() res: Response) {
    if (status !== false) {
      res.status(HttpStatus.OK).json({
        status: true,
        statusCode: 200,
        message: 'success',
        payload: result,
      });
    } else {
      res.status(HttpStatus.OK).json({
        status: false,
        statusCode: 200,
        message: 'success',
        payload: 'No Data Found!',
      });
    }
  }

  badRequestResponse(result, @Res() res: Response) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: false,
      statusCode: 400,
      message: 'Bad Request',
      payload: result,
    });
  }

  serverFailureResponse(result = [], @Res() res: Response) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: true,
      statusCode: 500,
      message: 'Internal Server Error!',
      payload: result,
    });
  }

  dbError(result = []): any {
    return {
      status: false,
      statusCode: 533,
      message: 'Db Error!',
      payload: result,
    };
  }
}
