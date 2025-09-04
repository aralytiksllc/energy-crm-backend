// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Prisma, type Contact } from '@/prisma/prisma.client';
import { ContactCreatedEvent } from '../events/contact-created.event';
import { CreateContactCommand } from './create-contact.command';

@CommandHandler(CreateContactCommand)
export class CreateContactHandler
  implements ICommandHandler<CreateContactCommand, Contact>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateContactCommand): Promise<Contact> {
    const { customerId, ...input } = command.dto;

    const data: Prisma.ContactCreateInput = {
      ...input,

      customer: {
        connect: { id: customerId },
      },
    };

    const contact = await this.prismaService.client.contact.create({ data });

    this.eventBus.publish(new ContactCreatedEvent(contact));

    return contact;
  }
}
