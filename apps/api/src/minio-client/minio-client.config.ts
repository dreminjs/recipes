
import { ConfigService } from "@nestjs/config"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMinioClientConfig = async (configService: ConfigService): Promise<any>  => ({
    useSSL: false,
    accessKey: configService.get<string>("MINIO_ACCESS_KEY"),
    secretKey: configService.get<string>("MINIO_SECRET_KEY"),
    port: +configService.get<number>("MINIO_PORT"),
    endPoint: configService.get<string>("MINIO_ENDPOINT")
})