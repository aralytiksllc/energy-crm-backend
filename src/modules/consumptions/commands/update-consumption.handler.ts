// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type ConsumptionFile } from '@/common/prisma/prisma.client';
import { ConsumptionUpdatedEvent } from '../events/consumption-updated.event';
import { UpdateConsumptionCommand } from './update-consumption.command';

@CommandHandler(UpdateConsumptionCommand)
export class UpdateConsumptionHandler
  implements ICommandHandler<UpdateConsumptionCommand>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateConsumptionCommand): Promise<ConsumptionFile> {
    const consumption = await this.prisma.client.consumptionFile.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new ConsumptionUpdatedEvent(consumption));

    return consumption;
  }
}
