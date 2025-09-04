// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type User } from '@/prisma/prisma.client';
import { UserCreatedEvent } from '../events/user-created.event';
import { CreateUserCommand } from './create-user.command';
import { Hash } from '@/common/hash/hash.impl';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    if (typeof command.dto.password === 'string') {
      command.dto.password = await Hash.make(command.dto.password);
    }

    const user = await this.prismaService.client.user.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new UserCreatedEvent(user));

    return user;
  }
}
