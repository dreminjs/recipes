import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomRequest } from './custom-request.interface';
import { MinioClientService } from './minio-client.service';
import { BufferedFile } from './minio.interface';

@Injectable()
export class MinioFileUploadInterceptor implements NestInterceptor {
  constructor(private readonly minioClientService: MinioClientService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as CustomRequest;


    const fileNames = await this.minioClientService.uploadFiles(
      request.files as BufferedFile[]
    );

    request['fileNames'] = fileNames.map(el => el.fileName)

    return next.handle();
  }
}
