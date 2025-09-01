// External
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Document } from '@/prisma/prisma.client';
import { Prisma } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { DocumentCreatedEvent } from '../events/document-created.event';
import { CreateDocumentCommand } from '../commands/create-document.command';

@CommandHandler(CreateDocumentCommand)
export class CreateDocumentHandler
  implements ICommandHandler<CreateDocumentCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateDocumentCommand): Promise<Document> {
    const { customerId, ...data } = command.dto;

    try {
      const document = await this.prismaService.document.create({
        data: {
          ...data,
          customer: { connect: { id: customerId } },
        },
      });

      this.eventBus.publish(new DocumentCreatedEvent(document));
      
      return document;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException('Customer not found.');
        }
      }
      throw error;
    }
  }
}
