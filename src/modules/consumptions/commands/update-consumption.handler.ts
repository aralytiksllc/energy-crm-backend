// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Consumption } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ConsumptionUpdatedEvent } from '../events/consumption-updated.event';
import { UpdateConsumptionCommand } from './update-consumption.command';

@CommandHandler(UpdateConsumptionCommand)
export class UpdateConsumptionHandler
  implements ICommandHandler<UpdateConsumptionCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateConsumptionCommand): Promise<Consumption> {
    const consumption = await this.prismaService.consumption.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new ConsumptionUpdatedEvent(consumption));

    return consumption;
  }
}
