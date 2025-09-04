// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Contract } from '@/prisma/prisma.client';
import { ContractDeletedEvent } from '../events/contract-deleted.event';
import { DeleteContractCommand } from './delete-contract.command';

@CommandHandler(DeleteContractCommand)
export class DeleteContractHandler
  implements ICommandHandler<DeleteContractCommand, Contract>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteContractCommand): Promise<Contract> {
    const contract = await this.prismaService.client.contract.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new ContractDeletedEvent(contract));

    return contract;
  }
}
