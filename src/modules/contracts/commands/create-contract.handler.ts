// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Contract } from '@/prisma/prisma.client';
import { ContractCreatedEvent } from '../events/contract-created.event';
import { CreateContractCommand } from './create-contract.command';

@CommandHandler(CreateContractCommand)
export class CreateContractHandler
  implements ICommandHandler<CreateContractCommand, Contract>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateContractCommand): Promise<Contract> {
    const contract = await this.prismaService.client.contract.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new ContractCreatedEvent(contract));

    return contract;
  }
}
