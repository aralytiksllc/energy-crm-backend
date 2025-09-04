// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Contact } from '@/prisma/prisma.client';
import { ContactDeletedEvent } from '../events/contact-deleted.event';
import { DeleteContactCommand } from './delete-contact.command';

@CommandHandler(DeleteContactCommand)
export class DeleteContactHandler
  implements ICommandHandler<DeleteContactCommand, Contact>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteContactCommand): Promise<Contact> {
    const contact = await this.prismaService.client.contact.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new ContactDeletedEvent(contact));

    return contact;
  }
}
