import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule, } from 'nestjs-minio-client';
import { getMinioClientConfig } from './minio-client.config';
import { MinioClientService } from './minio-client.service';
import { MinioClientController } from './minio-client.contoller';


@Module({
    imports: [MinioModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getMinioClientConfig
    })],
    providers: [MinioClientService],
    controllers: [MinioClientController]
})
export class MinioClientModule {
s
}
