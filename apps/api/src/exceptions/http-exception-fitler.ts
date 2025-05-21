import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    BadRequestException,
  } from '@nestjs/common';
  import { Response } from 'express';
import { IStandardResponse } from 'interfaces';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
  
      const standardResponse: IStandardResponse = {
        success: false,
        message: exception.message,
        error: {
          code: exception.constructor.name,
        },
      };
  
      if (exception instanceof BadRequestException) {
        const exceptionResponse = exception.getResponse();
        if (typeof exceptionResponse === 'object') {
          standardResponse.error.details = (exceptionResponse as any).message;
        }
      }
  
      response.status(status).json(standardResponse);
    }
  }