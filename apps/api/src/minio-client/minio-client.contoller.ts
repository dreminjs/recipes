import {
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { MinioFileUploadInterceptor } from './minio-file-upload.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioFileNames } from './minio-file-name.decorator';

@Controller('minio')
export class MinioClientController {
  @UseInterceptors(FileInterceptor('file'), MinioFileUploadInterceptor)
  @Post()
  public async uploadOne(@MinioFileNames() fileNames: string[]) {
    console.log(`Files names: ${fileNames.join("")}`);
    return 'Ok!';
  }
}
