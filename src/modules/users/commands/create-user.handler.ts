// External
import { ConflictException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { User } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { UserCreatedEvent } from '../events/user-created.event';
import { CreateUserCommand } from './create-user.command';
import { Hash } from '@/common/hash/hash.impl';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const exists = await this.prismaService.user.findUnique({
      where: { email: command.dto.email },
    });

    if (exists) {
      throw new ConflictException('A user with this email already exists.');
    }

    if (typeof command.dto.password === 'string') {
      command.dto.password = await Hash.make(command.dto.password);
    }

    const user = await this.prismaService.user.create({
      data: { ...command.dto },
      include: {
        role: { include: { permissions: true } },
        department: true,
      },
    });

    this.eventBus.publish(new UserCreatedEvent(user));

    return user;
  }
}
