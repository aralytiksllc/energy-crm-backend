// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Contract } from '@/common/prisma/prisma.client';
import { ContractCreatedEvent } from '../events/contract-created.event';
import { CreateContractCommand } from './create-contract.command';

@CommandHandler(CreateContractCommand)
export class CreateContractHandler
  implements ICommandHandler<CreateContractCommand, Contract>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateContractCommand): Promise<Contract> {
    const contract = await this.prisma.client.contract.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new ContractCreatedEvent(contract));

    return contract;
  }
}
