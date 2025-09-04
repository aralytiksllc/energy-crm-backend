// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Prisma, type MeteringPoint } from '@/prisma/prisma.client';
import { MeteringPointCreatedEvent } from '../events/metering-point-created.event';
import { CreateMeteringPointCommand } from './create-metering-point.command';

@CommandHandler(CreateMeteringPointCommand)
export class CreateMeteringPointHandler
  implements ICommandHandler<CreateMeteringPointCommand>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
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

    const meteringPoint = await this.prismaService.client.meteringPoint.create({
      data,
    });

    this.eventBus.publish(new MeteringPointCreatedEvent(meteringPoint));

    return meteringPoint;
  }
}
