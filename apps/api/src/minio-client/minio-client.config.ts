
import { ConfigService } from "@nestjs/config"

export const getMinioClientConfig = async (configService: ConfigService): Promise<any>  => ({
    useSSL: false,
    accessKey: configService.get<string>("MINIO_ACCESS_KEY"),
    secretKey: configService.get<string>("MINIO_SECRET_KEY"),
    port: +configService.get<number>("MINIO_PORT"),
    endPoint: configService.get<string>("MINIO_ENDPOINT")
})