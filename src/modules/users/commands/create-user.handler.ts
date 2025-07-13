// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Prisma, User } from '@prisma/client';

// Internal dependencies
import { PrismaService } from '@/common/prisma/prisma.service';
import { Hash } from '@/common/hash/hash.impl';
import { CreateUserCommand } from './create-user.command';
import { UserCreatedEvent } from '../events/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { dto } = command;

    if (dto.password) {
      dto.password = await Hash.make(dto.password);
    }

    const user = await this.prismaService.user.create({
      data: dto as Prisma.UserCreateInput,
    });

    this.eventBus.publish(new UserCreatedEvent(user));

    return user;
  }
}
