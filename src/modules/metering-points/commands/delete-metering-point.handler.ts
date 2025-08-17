// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { MeteringPoint } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { MeteringPointDeletedEvent } from '../events/metering-point-deleted.event';
import { DeleteMeteringPointCommand } from './delete-metering-point.command';

@CommandHandler(DeleteMeteringPointCommand)
export class DeleteMeteringPointHandler
  implements ICommandHandler<DeleteMeteringPointCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteMeteringPointCommand): Promise<MeteringPoint> {
    const meteringPoint = await this.prismaService.meteringPoint.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new MeteringPointDeletedEvent(meteringPoint));

    return meteringPoint;
  }
}
