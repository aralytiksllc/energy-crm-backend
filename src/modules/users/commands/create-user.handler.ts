// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Prisma, User } from '@prisma/client';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { Hash } from '@/common/hash/hash.impl';
import { CreateUserCommand } from './create-user.command';
import { UserCreatedEvent } from '../events/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { dto } = command;

    if (dto.password) {
      dto.password = await Hash.make(dto.password);
    }

    const user = await this.prisma.user.create({
      data: dto as Prisma.UserCreateInput,
    });

    this.eventBus.publish(new UserCreatedEvent(user));

    return user;
  }
}
