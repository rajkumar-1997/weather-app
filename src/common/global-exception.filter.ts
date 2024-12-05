import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType = 'Http error';
    if (exception instanceof HttpException) {
      // Handle http exceptions
      status = exception.getStatus();

      const responseContent = exception.getResponse();
      if (typeof responseContent === 'string') {
        message = responseContent;
      } else if (typeof responseContent === 'object') {
        message = responseContent['message'] || 'HttpException occurred';
      }
    } else if (this.isAxiosError(exception)) {
      // Handle Axios errors
      const axiosError = exception as AxiosError;
      const responseData = axiosError.response?.data;
      status = axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      errorType = 'Axios error';
      if (this.isErrorResponseData(responseData)) {
        message = responseData.error.message;
      } else {
        message = 'Axios error occurred';
      }
    }

    // Return error response with message in the response object
    response.status(status).json({
      statusCode: status,
      message,
      errorType,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private isAxiosError(exception: any): exception is AxiosError {
    return exception.isAxiosError === true;
  }

  private isErrorResponseData(
    data: any,
  ): data is { error: { message: string } } {
    return data && data.error && typeof data.error.message === 'string';
  }
}
