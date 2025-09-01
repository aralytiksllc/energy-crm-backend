// azure-storage.middleware.ts
import { Injectable } from '@nestjs/common';
import type { StorageEngine } from 'multer';
import type { Request } from 'express';
import { AzureStorageService } from './azure-storage.service';
import type { UploadedFileInput } from './azure-storage.interfaces';

@Injectable()
export class AzureStorageMulter implements StorageEngine {
  constructor(private readonly azure: AzureStorageService) {}

  async _handleFile(
    _req: Request,
    file: Express.Multer.File,
    cb: (
      error: Error | null,
      info?: Express.Multer.File & { storageUrl: string | null },
    ) => void,
  ): Promise<void> {
    try {
      if (!file.buffer) return cb(new Error('File buffer is missing'));

      const input: UploadedFileInput = {
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer,
        size: file.size,
      };

      const { blobUrl } = await this.azure.upload(input);

      if (!blobUrl)
        return cb(new Error('Upload to Azure failed: no storage URL returned'));

      cb(null, { ...file, storageUrl: blobUrl });
    } catch (e) {
      cb(e as Error);
    }
  }

  _removeFile(
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null) => void,
  ): void {
    file.buffer = undefined as unknown as Buffer;
    cb(null);
  }
}
