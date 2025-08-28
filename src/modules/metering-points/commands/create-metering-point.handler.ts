// External
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { MeteringPoint } from '@/prisma/prisma.client';
import { Prisma } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { MeteringPointCreatedEvent } from '../events/metering-point-created.event';
import { CreateMeteringPointCommand } from './create-metering-point.command';

@CommandHandler(CreateMeteringPointCommand)
export class CreateMeteringPointHandler
  implements ICommandHandler<CreateMeteringPointCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateMeteringPointCommand): Promise<MeteringPoint> {
    const { branchId, ...dto } = command.dto;

    try {
      const meteringPoint = await this.prismaService.meteringPoint.create({
        data: {
          ...dto,

          // attach to branch via relation
          branch: { connect: { id: branchId } },
        },
      });

      this.eventBus.publish(new MeteringPointCreatedEvent(meteringPoint));

      return meteringPoint;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException('Branch not found.');
        }
      }

      throw error;
    }
  }
}
