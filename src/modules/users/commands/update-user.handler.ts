// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type User } from '@/prisma/prisma.client';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UpdateUserCommand } from './update-user.command';
import { Hash } from '@/common/hash/hash.impl';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    if (typeof command.dto.password === 'string') {
      command.dto.password = await Hash.make(command.dto.password);
    }

    const user = await this.prismaService.client.user.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new UserUpdatedEvent(user));

    return user;
  }
}
