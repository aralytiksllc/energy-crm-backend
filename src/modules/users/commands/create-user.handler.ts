// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';

// Internal dependencies
import { User } from '../entities/user.entity';
import { UserCreatedEvent } from '../events/user-created.event';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly entityManager: EntityManager,

    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { dto } = command;

    const user = this.userRepository.create(dto);

    await this.entityManager.persistAndFlush(user);

    this.eventBus.publish(new UserCreatedEvent(user));

    return user;
  }
}
