import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from '@/entities/history.entity';
import { CreateHistoryCommand } from './create-history.command';
import { HistoryCreatedEvent } from '../events/history-created.event';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  constructor(
    @InjectRepository(History)
    private readonly historiesRepository: Repository<History>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateHistoryCommand): Promise<History> {
    const { dto } = command;

    const entity = this.historiesRepository.create(dto);

    const history = await this.historiesRepository.save(entity);

    this.eventBus.publish(new HistoryCreatedEvent(history));

    return history;
  }
}
