// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type ConsumptionFile } from '@/common/prisma/prisma.client';
import { ConsumptionDeletedEvent } from '../events/consumption-deleted.event';
import { DeleteConsumptionCommand } from './delete-consumption.command';

@CommandHandler(DeleteConsumptionCommand)
export class DeleteConsumptionHandler
  implements ICommandHandler<DeleteConsumptionCommand, ConsumptionFile>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteConsumptionCommand): Promise<ConsumptionFile> {
    const consumption = await this.prisma.client.consumptionFile.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new ConsumptionDeletedEvent(consumption));

    return consumption;
  }
}
