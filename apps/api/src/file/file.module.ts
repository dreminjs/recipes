import { Module } from '@nestjs/common';
import { S3FileStrategy } from './strategies/s3.strategy';

@Module({
  providers: [S3FileStrategy],
  exports: [S3FileStrategy]
})
export class FileModule {}
