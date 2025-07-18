// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

// Internal dependencies
import { History } from '@/modules/histories/entities/history.entity';
import { HistoryCreatedEvent } from '../events/history-created.event';
import { HistoriesRepository } from '../histories.repository';
import { CreateHistoryCommand } from './create-history.command';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  constructor(
    private readonly historiesRepository: HistoriesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateHistoryCommand): Promise<History> {
    const { dto } = command;

    const newHistory = this.historiesRepository.create(dto);

    const savedHistory = await this.historiesRepository.save(newHistory);

    this.eventBus.publish(new HistoryCreatedEvent(savedHistory));

    return savedHistory;
  }
}
