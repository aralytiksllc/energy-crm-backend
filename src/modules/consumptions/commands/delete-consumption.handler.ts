// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { ConsumptionFile } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ConsumptionDeletedEvent } from '../events/consumption-deleted.event';
import { DeleteConsumptionCommand } from './delete-consumption.command';

@CommandHandler(DeleteConsumptionCommand)
export class DeleteConsumptionHandler
  implements ICommandHandler<DeleteConsumptionCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteConsumptionCommand): Promise<ConsumptionFile> {
    const consumption = await this.prismaService.consumptionFile.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new ConsumptionDeletedEvent(consumption));

    return consumption;
  }
}
