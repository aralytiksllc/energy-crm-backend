// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Contact } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { ContactUpdatedEvent } from '../events/contact-updated.event';
import { UpdateContactCommand } from './update-contact.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateContactCommand)
export class UpdateContactHandler
  implements ICommandHandler<UpdateContactCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateContactCommand): Promise<Contact> {
    const {
      id,
      dto: { customerId, ...dto },
    } = command;

    try {
      const { count } = await this.prismaService.contact.updateMany({
        where: { id, customerId },
        data: { ...dto },
      });

      if (count === 0) {
        throw new NotFoundException('Contact not found for this customer');
      }

      const contact = await this.prismaService.contact.findUnique({
        where: { id, customerId },
      });

      if (!contact) {
        throw new NotFoundException('Contact not found after update');
      }

      this.eventBus.publish(new ContactUpdatedEvent(contact));

      return contact;
    } catch (error) {
      throw error;
    }
  }
}
