// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Branch } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { BranchDeletedEvent } from '../events/branch-deleted.event';
import { DeleteBranchCommand } from './delete-branch.command';

@CommandHandler(DeleteBranchCommand)
export class DeleteBranchHandler implements ICommandHandler<DeleteBranchCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteBranchCommand): Promise<Branch> {
    const branch = await this.prismaService.branch.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new BranchDeletedEvent(branch));

    return branch;
  }
}
