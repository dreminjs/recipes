export interface Options {
  localDest?: string;
  strategy: FileStrategy;
  s3?: S3Options;
}
export interface S3Options {
  bucket: string;
  region: string;
  accessKey: string;
  secretAccessKey: string;
}

export enum FileStrategy {
  local = 'LOCAL',
  s3 = 'S3',
}

export interface FileStrategyUseCase {
  execute: (file: Express.Multer.File, options: Options) => Promise<any>;
}
