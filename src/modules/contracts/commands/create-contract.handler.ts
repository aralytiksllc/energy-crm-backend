// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Contract } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { ContractCreatedEvent } from '../events/contract-created.event';
import { CreateContractCommand } from './create-contract.command';

@CommandHandler(CreateContractCommand)
export class CreateContractHandler
  implements ICommandHandler<CreateContractCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateContractCommand): Promise<Contract> {
    const contract = await this.prismaService.contract.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new ContractCreatedEvent(contract));

    return contract;
  }
}
