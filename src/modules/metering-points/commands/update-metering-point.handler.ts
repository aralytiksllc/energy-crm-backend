// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type MeteringPoint } from '@/common/prisma/prisma.client';
import { MeteringPointUpdatedEvent } from '../events/metering-point-updated.event';
import { UpdateMeteringPointCommand } from './update-metering-point.command';

@CommandHandler(UpdateMeteringPointCommand)
export class UpdateMeteringPointHandler
  implements ICommandHandler<UpdateMeteringPointCommand, MeteringPoint>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateMeteringPointCommand): Promise<MeteringPoint> {
    const meteringPoint = await this.prisma.client.meteringPoint.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new MeteringPointUpdatedEvent(meteringPoint));

    return meteringPoint;
  }
}
