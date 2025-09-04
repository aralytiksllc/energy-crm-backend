// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type MeteringPoint } from '@/prisma/prisma.client';
import { MeteringPointUpdatedEvent } from '../events/metering-point-updated.event';
import { UpdateMeteringPointCommand } from './update-metering-point.command';

@CommandHandler(UpdateMeteringPointCommand)
export class UpdateMeteringPointHandler
  implements ICommandHandler<UpdateMeteringPointCommand>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateMeteringPointCommand): Promise<MeteringPoint> {
    const meteringPoint = await this.prismaService.client.meteringPoint.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new MeteringPointUpdatedEvent(meteringPoint));

    return meteringPoint;
  }
}
