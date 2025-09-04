// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma, type MeteringPoint } from '@/common/prisma/prisma.client';
import { MeteringPointCreatedEvent } from '../events/metering-point-created.event';
import { CreateMeteringPointCommand } from './create-metering-point.command';

@CommandHandler(CreateMeteringPointCommand)
export class CreateMeteringPointHandler
  implements ICommandHandler<CreateMeteringPointCommand, MeteringPoint>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateMeteringPointCommand): Promise<MeteringPoint> {
    const { branchId, ...input } = command.dto;

    const data: Prisma.MeteringPointCreateInput = {
      ...input,

      branch: {
        connect: { id: branchId },
      },
    };

    const meteringPoint = await this.prisma.client.meteringPoint.create({
      data,
    });

    this.eventBus.publish(new MeteringPointCreatedEvent(meteringPoint));

    return meteringPoint;
  }
}
