import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService, MinioClient } from 'nestjs-minio-client';
import * as crypto from 'crypto';
import { BufferedFile } from './minio.interface';
import { Readable } from 'stream';

@Injectable()
export class MinioClientService {
  constructor(
    private readonly configService: ConfigService,
    private readonly minioService: MinioService
  ) {}

  public get client(): MinioClient {
    return this.minioService.client;
  }

  private readonly baseBucket = this.configService.get<string>('MINIO_BUCKET');

  private readonly minioPort = this.configService.get<string>('MINIO_PORT');

  private readonly minioEndpoint = this.configService.get<string>('MINIO_ENDPOINT');

  private readonly minioBucket = this.configService.get<string>('MINIO_BUCKET');

  public async uploadOne(file: BufferedFile) {
    console.log({ file });
    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': '1234',
    };
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length
    );
    const fileName = `${hashedFileName + ext}`;
    this.client.putObject(
      this.baseBucket,
      fileName,
      file.buffer,
      null,
      metaData,
      function (err) {
        if (err)
          throw new HttpException(
            `Error uploading file. Reason is ${err.message}`,
            HttpStatus.BAD_REQUEST
          );
      }
    );

    return {
      url: `${this.minioEndpoint}:${this.minioPort}/${this.minioBucket}/${fileName}`,
      fileName,
    };
  }
  async findBuffer(fileName: string): Promise<Readable> {
    const fileBuffer = await this.minioService.client.getObject(
      this.baseBucket,
      fileName
    );
    return fileBuffer;
  }
}
