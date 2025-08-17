// External
import { ConflictException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Consumption } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { ConsumptionCreatedEvent } from '../events/consumption-created.event';
import { CreateConsumptionCommand } from './create-consumption.command';

@CommandHandler(CreateConsumptionCommand)
export class CreateConsumptionHandler
  implements ICommandHandler<CreateConsumptionCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateConsumptionCommand): Promise<Consumption> {
    const consumption = await this.prismaService.consumption.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new ConsumptionCreatedEvent(consumption));

    return consumption;
  }
}
