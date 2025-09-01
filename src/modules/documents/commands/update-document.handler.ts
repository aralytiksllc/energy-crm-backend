// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Document } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { DocumentUpdatedEvent } from '../events/document-updated.event';
import { UpdateDocumentCommand } from './update-document.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateDocumentCommand)
export class UpdateDocumentHandler
  implements ICommandHandler<UpdateDocumentCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateDocumentCommand): Promise<Document> {
    const {
      id,
      dto: { customerId, ...documentData },
    } = command;

    const document = await this.prismaService.document.findUnique({
      where: { id: command.id },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    if (customerId) {
      const customer = await this.prismaService.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      }

      documentData['customerId'] = customer.id;
    }

    const updated = await this.prismaService.document.update({
      where: { id },
      data: documentData,
    });

    this.eventBus.publish(new DocumentUpdatedEvent(updated));

    return updated;
  }
}
