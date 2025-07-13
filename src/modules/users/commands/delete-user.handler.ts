// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { User } from '@prisma/client';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const { id } = command;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.prisma.user.delete({ where: { id } });

    this.eventBus.publish(new UserDeletedEvent(user));

    return user;
  }
}
