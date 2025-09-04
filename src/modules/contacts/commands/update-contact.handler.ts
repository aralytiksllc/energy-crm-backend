// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Contact } from '@/prisma/prisma.client';
import { ContactUpdatedEvent } from '../events/contact-updated.event';
import { UpdateContactCommand } from './update-contact.command';

@CommandHandler(UpdateContactCommand)
export class UpdateContactHandler
  implements ICommandHandler<UpdateContactCommand, Contact>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateContactCommand): Promise<Contact> {
    const contact = await this.prismaService.client.contact.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new ContactUpdatedEvent(contact));

    return contact;
  }
}
