// External
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  generateBlobSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { randomUUID } from 'crypto';
import { extname } from 'path';

// Internal
import { AZURE_STORAGE_MODULE_OPTIONS } from './azure-storage.constant';
import { type AzureStorageOptions } from './azure-storage.interfaces';

@Injectable()
export class AzureStorageService {
  private readonly logger = new Logger(AzureStorageService.name);

  constructor(
    @Inject(AZURE_STORAGE_MODULE_OPTIONS)
    private readonly options: AzureStorageOptions,
  ) {}

  private resolveOptions(
    options?: Partial<AzureStorageOptions>,
  ): AzureStorageOptions {
    return { ...this.options, ...options };
  }

  private getContainerClient(options: AzureStorageOptions): ContainerClient {
    const { accountName, accountKey, containerName } = options;

    const url = `https://${accountName}.blob.core.windows.net`;

    const credential = new StorageSharedKeyCredential(accountName, accountKey);

    const service = new BlobServiceClient(url, credential);

    return service.getContainerClient(containerName);
  }

  async upload(
    file: Express.Multer.File,
    overrides?: Partial<AzureStorageOptions>,
  ): Promise<{ name: string; url: string }> {
    const options = this.resolveOptions(overrides);

    if (!file?.buffer) throw new Error('File buffer is missing.');

    const container = this.getContainerClient(options);
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

    return { name: blobName, url: blockBlob.url };
  }

  async delete(
    blobName: string,
    overrides?: Partial<AzureStorageOptions>,
  ): Promise<boolean> {
    const options = this.resolveOptions(overrides);
    const container = this.getContainerClient(options);
    const blob = container.getBlobClient(blobName);

    const response = await blob.deleteIfExists();

    if (!response.succeeded) {
      throw new NotFoundException(`Failed to delete blob "${blobName}".`);
    }

    this.logger.log(`Blob "${blobName}" deleted successfully.`);

    return true;
  }

  async getSignedUrl(
    blobName: string,
    overrides?: Partial<AzureStorageOptions>,
  ): Promise<string> {
    const options = this.resolveOptions(overrides);
    const container = this.getContainerClient(options);
    const blob = container.getBlobClient(blobName);

    const now = new Date();
    const startsOn = new Date(now.getTime() - 2 * 60 * 1000);
    const expiresIn = options.sasExpiresInSeconds ?? 3600;
    const expiresOn = new Date(now.getTime() + expiresIn * 1000);

    const credential = new StorageSharedKeyCredential(
      options.accountName,
      options.accountKey,
    );

    const sas = generateBlobSASQueryParameters(
      {
        containerName: options.containerName,
        blobName,
        permissions: BlobSASPermissions.parse('r'),
        protocol: SASProtocol.Https,
        startsOn,
        expiresOn,
      },
      credential,
    ).toString();

    return `${blob.url}?${sas}`;
  }
}
