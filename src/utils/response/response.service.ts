import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  successResponse(status = false, result = []): any {
    if (status !== false) {
      return {
        status: true,
        statusCode: 200,
        message: 'success',
        payload: result,
      };
    } else {
      return {
        status: false,
        statusCode: 200,
        message: 'success',
        payload: 'No Data Found!',
      };
    }
  }

  badRequestResponse(result = []): any {
    return {
      status: false,
      statusCode: 400,
      message: 'Bad Request',
      error: result,
    };
  }

  serverFailureResponse(result = []): any {
    return {
      status: true,
      statusCode: 500,
      message: 'Internal Server Error!',
      payload: result,
    };
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
