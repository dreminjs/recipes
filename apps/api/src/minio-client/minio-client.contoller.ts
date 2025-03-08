import {
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { MinioFileUploadInterceptor } from './minio-file-upload.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioFileName } from './minio-file-name.decorator';

@Controller('minio')
export class MinioClientController {
  @UseInterceptors(FileInterceptor('file'), MinioFileUploadInterceptor)
  @Post('test')
  public async uploadOne(@MinioFileName() fileName: string) {
    console.log(`File name: ${fileName}`);
    return 'Ok!';
  }
}
