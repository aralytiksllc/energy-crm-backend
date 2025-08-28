// External
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Contact } from '@/prisma/prisma.client';
import { Prisma } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { ContactCreatedEvent } from '../events/contact-created.event';
import { CreateContactCommand } from './create-contact.command';

@CommandHandler(CreateContactCommand)
export class CreateContactHandler
  implements ICommandHandler<CreateContactCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateContactCommand): Promise<Contact> {
    const { customerId, ...dto } = command.dto;

    try {
      const contact = await this.prismaService.contact.create({
        data: {
          ...dto,

          // attach to customer via relation
          customer: { connect: { id: customerId } },
        },
      });

      this.eventBus.publish(new ContactCreatedEvent(contact));

      return contact;
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
