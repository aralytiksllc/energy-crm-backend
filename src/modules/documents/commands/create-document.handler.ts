// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Prisma, type Document } from '@/prisma/prisma.client';
import { DocumentCreatedEvent } from '../events/document-created.event';
import { CreateDocumentCommand } from '../commands/create-document.command';

@CommandHandler(CreateDocumentCommand)
export class CreateDocumentHandler
  implements ICommandHandler<CreateDocumentCommand, Document>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateDocumentCommand): Promise<Document> {
    const { customerId, ...input } = command.dto;

    const data: Prisma.DocumentCreateInput = {
      ...input,

      customer: {
        connect: { id: customerId },
      },
    };

    const document = await this.prismaService.client.document.create({ data });

    this.eventBus.publish(new DocumentCreatedEvent(document));

    return document;
  }
}
