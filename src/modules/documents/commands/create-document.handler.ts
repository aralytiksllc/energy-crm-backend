// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma, type Document } from '@/common/prisma/prisma.client';
import { AzureStorageService } from '@/common/azure-storage/azure-storage.service';
import { DocumentCreatedEvent } from '../events/document-created.event';
import { CreateDocumentCommand } from '../commands/create-document.command';

@CommandHandler(CreateDocumentCommand)
export class CreateDocumentHandler
  implements ICommandHandler<CreateDocumentCommand, Document>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly azureStorage: AzureStorageService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateDocumentCommand): Promise<Document> {
    const { file, dto } = command;

    const blob = await this.azureStorage.upload(file);

    const data: Prisma.DocumentCreateInput = {
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

    try {
      const document = await this.prisma.client.document.create({ data });

      this.eventBus.publish(new DocumentCreatedEvent(document));

      return document;
    } catch (error) {
      await this.azureStorage.delete(blob.name);
      throw error;
    }
  }
}
