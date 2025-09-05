// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Document } from '@/common/prisma/prisma.client';
import { AzureStorageService } from '@/common/azure-storage/azure-storage.service';
import { DocumentDeletedEvent } from '../events/document-deleted.event';
import { DeleteDocumentCommand } from './delete-document.command';

@CommandHandler(DeleteDocumentCommand)
export class DeleteDocumentHandler
  implements ICommandHandler<DeleteDocumentCommand, Document>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly azureStorage: AzureStorageService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteDocumentCommand): Promise<Document> {
    const document = await this.prisma.client.$transaction(async (tx) => {
      const document = await tx.document.delete({ where: { id: command.id } });

      await this.azureStorage.delete(document.name);

      return document;
    });

    this.eventBus.publish(new DocumentDeletedEvent(document));

    return document;
  }
}
