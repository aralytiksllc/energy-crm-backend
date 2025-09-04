// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type MeteringPoint } from '@/common/prisma/prisma.client';
import { MeteringPointDeletedEvent } from '../events/metering-point-deleted.event';
import { DeleteMeteringPointCommand } from './delete-metering-point.command';

@CommandHandler(DeleteMeteringPointCommand)
export class DeleteMeteringPointHandler
  implements ICommandHandler<DeleteMeteringPointCommand, MeteringPoint>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteMeteringPointCommand): Promise<MeteringPoint> {
    const meteringPoint = await this.prisma.client.meteringPoint.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new MeteringPointDeletedEvent(meteringPoint));

    return meteringPoint;
  }
}
