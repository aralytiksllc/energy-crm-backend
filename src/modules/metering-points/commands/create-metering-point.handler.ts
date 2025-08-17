// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { MeteringPoint } from '@/prisma/prisma.client';
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
    const meteringPoint = await this.prismaService.meteringPoint.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new MeteringPointCreatedEvent(meteringPoint));

    return meteringPoint;
  }
}
