// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Document } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { DocumentDeletedEvent } from '../events/document-deleted.event';
import { DeleteDocumentCommand } from './delete-document.command';

@CommandHandler(DeleteDocumentCommand)
export class DeleteDocumentHandler implements ICommandHandler<DeleteDocumentCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteDocumentCommand): Promise<Document> {
    const document = await this.prismaService.document.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new DocumentDeletedEvent(document));

    return document;
  }
}
