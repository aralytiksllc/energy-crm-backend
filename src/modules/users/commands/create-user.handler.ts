// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';
import { UserCreatedEvent } from '../events/user-created.event';
import { UsersRepository } from '../users.repository';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { dto, options } = command;

    const newUser = this.usersRepository.create(dto);

    const savedUser = await this.usersRepository.save(newUser, options);

    this.eventBus.publish(new UserCreatedEvent(savedUser));

    return savedUser;
  }
}
