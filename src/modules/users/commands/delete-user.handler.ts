import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { User } from '@/entities/user.entity';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { UsersRepository } from '../users.repository';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const { id } = command;

    const existingUser = await this.usersRepository.findOneByOrFail({ id });

    const removedUser = await this.usersRepository.remove(existingUser);

    this.eventBus.publish(new UserDeletedEvent(removedUser));

    return removedUser;
  }
}
