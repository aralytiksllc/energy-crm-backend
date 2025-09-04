// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Branch } from '@/prisma/prisma.client';
import { BranchDeletedEvent } from '../events/branch-deleted.event';
import { DeleteBranchCommand } from './delete-branch.command';

@CommandHandler(DeleteBranchCommand)
export class DeleteBranchHandler
  implements ICommandHandler<DeleteBranchCommand, Branch>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,

    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteBranchCommand): Promise<Branch> {
    const branch = await this.prismaService.client.branch.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new BranchDeletedEvent(branch));

    return branch;
  }
}
