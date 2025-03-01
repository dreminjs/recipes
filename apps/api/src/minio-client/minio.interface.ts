export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: AppMimeType;
    size: number;
    buffer: Buffer | string;
  }

  export type AppMimeType =
  | 'image/png'
  | 'image/jpeg';