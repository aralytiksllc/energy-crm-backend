// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Document } from '@/prisma/prisma.client';
import { DocumentUpdatedEvent } from '../events/document-updated.event';
import { UpdateDocumentCommand } from './update-document.command';

@CommandHandler(UpdateDocumentCommand)
export class UpdateDocumentHandler
  implements ICommandHandler<UpdateDocumentCommand, Document>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateDocumentCommand): Promise<Document> {
    const document = await this.prismaService.client.document.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new DocumentUpdatedEvent(document));

    return document;
  }
}
