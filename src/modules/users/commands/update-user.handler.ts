// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Prisma, User } from '@prisma/client';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { Hash } from '@/common/hash/hash.impl';
import { UpdateUserCommand } from './update-user.command';
import { UserUpdatedEvent } from '../events/user-updated.event';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, dto } = command;

    if (dto.password) {
      dto.password = await Hash.make(dto.password);
    }

    const user = await this.prismaService.user.update({
      where: { id },
      data: dto as Prisma.UserUpdateInput,
    });

    this.eventBus.publish(new UserUpdatedEvent(user));

    return user;
  }
}
