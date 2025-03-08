import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from './custom-request.interface';

export const MinioFileName = createParamDecorator(
  (_: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as CustomRequest;
    return request.fileName;
  }
);
