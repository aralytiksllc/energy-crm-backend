// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Prisma, type Document } from '@/prisma/prisma.client';
import { DocumentDeletedEvent } from '../events/document-deleted.event';
import { DeleteDocumentCommand } from './delete-document.command';

@CommandHandler(DeleteDocumentCommand)
export class DeleteDocumentHandler
  implements ICommandHandler<DeleteDocumentCommand, Document>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteDocumentCommand): Promise<Document> {
    const document = await this.prismaService.client.document.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new DocumentDeletedEvent(document));

    return document;
  }
}
