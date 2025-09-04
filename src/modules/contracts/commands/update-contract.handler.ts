// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Contract } from '@/prisma/prisma.client';
import { ContractUpdatedEvent } from '../events/contract-updated.event';
import { UpdateContractCommand } from './update-contract.command';

@CommandHandler(UpdateContractCommand)
export class UpdateContractHandler
  implements ICommandHandler<UpdateContractCommand>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateContractCommand): Promise<Contract> {
    const contract = await this.prismaService.client.contract.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new ContractUpdatedEvent(contract));

    return contract;
  }
}
