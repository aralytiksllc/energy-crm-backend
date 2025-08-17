// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Contract } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { ContractUpdatedEvent } from '../events/contract-updated.event';
import { UpdateContractCommand } from './update-contract.command';

@CommandHandler(UpdateContractCommand)
export class UpdateContractHandler
  implements ICommandHandler<UpdateContractCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateContractCommand): Promise<Contract> {
    const contract = await this.prismaService.contract.update({
      where: { id: command.id },
      data: command.dto,
    });

    this.eventBus.publish(new ContractUpdatedEvent(contract));

    return contract;
  }
}
