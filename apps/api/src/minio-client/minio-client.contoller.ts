import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { Response } from 'express'
import { MinioFileUploadInterceptor } from './minio-file-upload.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioFileName } from './minio-file-name.decorator';

@Controller('minio')
export class MinioClientController {

  @UseInterceptors(FileInterceptor('file'),MinioFileUploadInterceptor)
  @Post('test')
  public async uploadOne(@MinioFileName() fileName: string) {
    console.log("Hi from Controller!")
    console.log(`File name: ${fileName}`)
    return 'Ok!';
  }

}
