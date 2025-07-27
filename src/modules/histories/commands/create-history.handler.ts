// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';

// Internal dependencies
import { History } from '../entities/history.entity';
import { HistoryCreatedEvent } from '../events/history-created.event';
import { CreateHistoryCommand } from './create-history.command';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: EntityRepository<History>,

    private readonly entityManager: EntityManager,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateHistoryCommand): Promise<History> {
    const { dto } = command;

    const history = this.historyRepository.create(dto);

    await this.entityManager.persistAndFlush(history);

    this.eventBus.publish(new HistoryCreatedEvent(history));

    return history;
  }
}
