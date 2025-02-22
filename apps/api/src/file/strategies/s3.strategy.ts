import { FileStrategyUseCase, Options } from '../file.config';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as crypto from 'node:crypto';
 
@Injectable()
export class S3FileStrategy implements FileStrategyUseCase {
  public async execute(file: Express.Multer.File, options: Required<Options>): Promise<string> {
    const s3 = this.getS3Instance(options.s3.accessKey, options.s3.secretAccessKey, options.s3.region);

    const filename = crypto.randomUUID();

    const params = {
      Bucket: options.s3.bucket,
      Key: filename,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    try {
      await s3.upload(params).promise();

      return filename;
    } catch (error) {
      throw new BadRequestException(`Error uploading file: ${error}`);
    }
  }

  private getS3Instance = ((accessKeyId: string, secretAccessKey: string, region: string) => {
    return new AWS.S3({ accessKeyId, secretAccessKey, region });
  });

}
