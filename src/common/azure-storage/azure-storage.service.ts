import { Inject, Injectable, Logger } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { AZURE_STORAGE_MODULE_OPTIONS } from './azure-storage.constant';
import type {
  AzureStorageOptions,
  UploadedFileInput,
} from './azure-storage.interfaces';

@Injectable()
export class AzureStorageService {
  private readonly logger = new Logger(AzureStorageService.name);

  constructor(
    @Inject(AZURE_STORAGE_MODULE_OPTIONS)
    private readonly options: AzureStorageOptions,
  ) {}

  async upload(
    file: UploadedFileInput,
    perRequestOptions?: Partial<AzureStorageOptions>,
  ): Promise<{
    blobName: string;
    blobUrl: string;
  }> {
    const opts: AzureStorageOptions = {
      ...this.options,
      ...(perRequestOptions ?? {}),
    };

    if (!opts.connectionString) {
      throw new Error('"AZURE_STORAGE_CONNECTION_STRING" was not provided.');
    }

    if (!file?.buffer) throw new Error('File buffer is missing.');

    const container = this.getContainerClient(opts);
    await container.createIfNotExists();

    const extension = extname(file.originalname) || '';
    const blobName = `${randomUUID()}${extension}`;

    const blockBlob = container.getBlockBlobClient(blobName);
    await blockBlob.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype || 'application/octet-stream',
      },
    });

    this.logger.log(`Blob "${blobName}" uploaded`);

    return {
      blobName,
      blobUrl: blockBlob.url,
    };
  }

  private getContainerClient(opts: AzureStorageOptions): ContainerClient {
    const service = BlobServiceClient.fromConnectionString(
      opts.connectionString,
    );
    return service.getContainerClient(opts.containerName);
  }
}
