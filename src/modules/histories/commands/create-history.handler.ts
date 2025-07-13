// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { History } from '@prisma/client';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { HistoryCreatedEvent } from '../events/history-created.event';
import { CreateHistoryCommand } from './create-history.command';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateHistoryCommand): Promise<History> {
    const { dto } = command;

    const savedHistory = await this.prisma.history.create({
      data: dto,
    });

    this.eventBus.publish(new HistoryCreatedEvent(savedHistory));

    return savedHistory;
  }
}
