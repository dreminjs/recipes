import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService, MinioClient } from 'nestjs-minio-client';
import * as crypto from 'crypto';
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

  private readonly minioPort = +this.configService.get<string>('MINIO_PORT');

  private readonly minioEndpoint = this.configService.get<string>('MINIO_ENDPOINT');

  private readonly minioBucket = this.configService.get<string>('MINIO_BUCKET');

  public async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const hashedFileName = crypto
          .createHash('md5')
          .update(Date.now().toString() + Math.random().toString())
          .digest('hex');
        
        const ext = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length,
        );
        
        const fileName = hashedFileName + ext;

        const metaData = {
          'Content-Type': file.mimetype,
        };

        try {
          await this.client.putObject(
            this.minioBucket,
            fileName,
            file.buffer,
            file.size,
            metaData,
          );

          return {
            url: `${this.minioEndpoint}:${this.minioPort}/${this.minioBucket}/${fileName}`,
            fileName: fileName,
            originalName: file.originalname,
            size: file.size,
          };
        } catch (error) {
          throw new HttpException(
            `Error uploading file ${file.originalname}: ${error.message}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
    );

    return uploadResults.map(el => el.fileName)
  }

  async findBuffer(fileName: string): Promise<Readable> {
    const fileBuffer = await this.minioService.client.getObject(
      this.minioBucket,
      fileName
    );
    return fileBuffer;
  }

  async deleteMany(data: string[]) {
    console.log("delete")
  }
}
