// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma, type Document } from '@/common/prisma/prisma.client';
import { AzureStorageService } from '@/common/azure-storage/azure-storage.service';
import { DocumentUpdatedEvent } from '../events/document-updated.event';
import { UpdateDocumentCommand } from './update-document.command';

@CommandHandler(UpdateDocumentCommand)
export class UpdateDocumentHandler
  implements ICommandHandler<UpdateDocumentCommand, Document>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly azureStorage: AzureStorageService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateDocumentCommand): Promise<Document> {
    const { id, file, dto } = command;

    if (!file) {
      const document = await this.prisma.client.document.update({
        where: { id },
        data: dto,
      });

      this.eventBus.publish(new DocumentUpdatedEvent(document));

      return document;
    }

    const existing = await this.prisma.client.document.findUniqueOrThrow({
      where: { id },
    });

    const blob = await this.azureStorage.upload(file);

    try {
      const data: Prisma.DocumentUpdateInput = {
        name: blob.name,

        path: blob.url,

        originalName: file.originalname,

        mimeType: file.mimetype,

        size: file.size,

        description: dto.description,

        documentType: dto.documentType,

        customer: {
          connect: { id: dto.customerId },
        },
      };

      const document = await this.prisma.client.document.update({
        where: { id },
        data,
      });

      await this.azureStorage.delete(existing.name);

      this.eventBus.publish(new DocumentUpdatedEvent(document));

      return document;
    } catch (error) {
      await this.azureStorage.delete(blob.name);
      throw error;
    }
  }
}
