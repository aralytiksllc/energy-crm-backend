// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

// Internal dependencies
import { User } from '../entities/user.entity';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly entityManager: EntityManager,

    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, dto } = command;

    const user = await this.userRepository.findOneOrFail({ id });

    this.userRepository.assign(user, dto);

    await this.entityManager.persistAndFlush(user);

    this.eventBus.publish(new UserUpdatedEvent(user));

    return user;
  }
}
