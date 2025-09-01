import { Type } from '@nestjs/common';

export interface AzureStorageOptions {
  accountName: string;
  connectionString: string;
  containerName: string;
}

export interface AzureStorageAsyncOptions {
  useExisting?: Type<AzureStorageOptionsFactory>;
  useClass?: Type<AzureStorageOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AzureStorageOptions> | AzureStorageOptions;
  inject?: any[];
}

export interface AzureStorageOptionsFactory {
  createAzureStorageOptions():
    | AzureStorageOptions
    | Promise<AzureStorageOptions>;
}

export interface UploadedFileMetadata {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  storageUrl: string ;
}


export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer?: Buffer;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  storageUrl?: string | null;
}

export interface UploadedFileInput {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}