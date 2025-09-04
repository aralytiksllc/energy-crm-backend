// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type MeteringPoint } from '@/prisma/prisma.client';
import { MeteringPointDeletedEvent } from '../events/metering-point-deleted.event';
import { DeleteMeteringPointCommand } from './delete-metering-point.command';

@CommandHandler(DeleteMeteringPointCommand)
export class DeleteMeteringPointHandler
  implements ICommandHandler<DeleteMeteringPointCommand>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteMeteringPointCommand): Promise<MeteringPoint> {
    const meteringPoint = await this.prismaService.client.meteringPoint.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new MeteringPointDeletedEvent(meteringPoint));

    return meteringPoint;
  }
}
