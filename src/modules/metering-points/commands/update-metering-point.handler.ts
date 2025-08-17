// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { MeteringPoint } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { MeteringPointUpdatedEvent } from '../events/metering-point-updated.event';
import { UpdateMeteringPointCommand } from './update-metering-point.command';

@CommandHandler(UpdateMeteringPointCommand)
export class UpdateMeteringPointHandler
  implements ICommandHandler<UpdateMeteringPointCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateMeteringPointCommand): Promise<MeteringPoint> {
    const meteringPoint = await this.prismaService.meteringPoint.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new MeteringPointUpdatedEvent(meteringPoint));

    return meteringPoint;
  }
}
