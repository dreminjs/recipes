import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { CustomRequest } from "./custom-request.interface";
import { Request } from "express"
import { MinioClientService } from "./minio-client.service";
import { BufferedFile } from "./minio.interface";



@Injectable()
export class MinioFileUploadInterceptor implements NestInterceptor {
    
    constructor(
        private readonly minioClientService: MinioClientService
    ){}
    
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        
        const request = context.switchToHttp().getRequest() as CustomRequest

        const { file } = request
        
        const { fileName } = await this.minioClientService.uploadOne(file as BufferedFile)

        request["fileName"] = fileName

        return next.handle()

    }
}