// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Contact } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { ContactDeletedEvent } from '../events/contact-deleted.event';
import { DeleteContactCommand } from './delete-contact.command';

@CommandHandler(DeleteContactCommand)
export class DeleteContactHandler implements ICommandHandler<DeleteContactCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteContactCommand): Promise<Contact> {
    const contact = await this.prismaService.contact.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new ContactDeletedEvent(contact));

    return contact;
  }
}
