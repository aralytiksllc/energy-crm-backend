// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Contract } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { ContractDeletedEvent } from '../events/contract-deleted.event';
import { DeleteContractCommand } from './delete-contract.command';

@CommandHandler(DeleteContractCommand)
export class DeleteContractHandler implements ICommandHandler<DeleteContractCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteContractCommand): Promise<Contract> {
    const contract = await this.prismaService.contract.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new ContractDeletedEvent(contract));

    return contract;
  }
}
