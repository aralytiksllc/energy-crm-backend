// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Contract } from '@/common/prisma/prisma.client';
import { ContractDeletedEvent } from '../events/contract-deleted.event';
import { DeleteContractCommand } from './delete-contract.command';

@CommandHandler(DeleteContractCommand)
export class DeleteContractHandler
  implements ICommandHandler<DeleteContractCommand, Contract>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteContractCommand): Promise<Contract> {
    const contract = await this.prisma.client.contract.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new ContractDeletedEvent(contract));

    return contract;
  }
}
