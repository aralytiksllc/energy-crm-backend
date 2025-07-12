// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UsersRepository } from '../users.repository';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, dto, options } = command;

    const existingUser = await this.usersRepository.findOneByOrFail({ id });

    const updatedUser = this.usersRepository.merge(existingUser, dto);

    const savedUser = await this.usersRepository.save(updatedUser, options);

    this.eventBus.publish(new UserUpdatedEvent(savedUser));

    return savedUser;
  }
}
