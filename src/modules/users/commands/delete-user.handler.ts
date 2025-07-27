// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';

// Internal dependencies
import { User } from '../entities/user.entity';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly entityManager: EntityManager,

    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const { id } = command;

    const user = await this.userRepository.findOneOrFail({ id });

    await this.entityManager.removeAndFlush(user);

    this.eventBus.publish(new UserDeletedEvent(user));

    return user;
  }
}
