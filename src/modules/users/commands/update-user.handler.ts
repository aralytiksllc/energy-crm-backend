// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { User } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UpdateUserCommand } from './update-user.command';
import { Hash } from '@/common/hash/hash.impl';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    if (typeof command.dto.password === 'string') {
      command.dto.password = await Hash.make(command.dto.password);
    }

    const user = await this.prismaService.user.update({
      where: { id: command.id },
      data: { ...command.dto },
      include: { role: { include: { permissions: true } }, department: true },
    });

    this.eventBus.publish(new UserUpdatedEvent(user));

    return user;
  }
}
