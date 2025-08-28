// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { MeteringPoint } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { MeteringPointUpdatedEvent } from '../events/metering-point-updated.event';
import { UpdateMeteringPointCommand } from './update-metering-point.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateMeteringPointCommand)
export class UpdateMeteringPointHandler
  implements ICommandHandler<UpdateMeteringPointCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateMeteringPointCommand): Promise<MeteringPoint> {
    const {
      id,
      dto: { branchId, ...dto },
    } = command;

    try {
      const { count } = await this.prismaService.meteringPoint.updateMany({
        where: { id, branchId },
        data: { ...dto },
      });

      if (count === 0) {
        throw new NotFoundException(
          'Metering point not found for this branch.',
        );
      }

      const meteringPoint = await this.prismaService.meteringPoint.findUnique({
        where: { id, branchId },
      });

      if (!meteringPoint) {
        throw new NotFoundException('Metering point not found after update.');
      }

      this.eventBus.publish(new MeteringPointUpdatedEvent(meteringPoint));

      return meteringPoint;
    } catch (error) {
      throw error;
    }
  }
}
