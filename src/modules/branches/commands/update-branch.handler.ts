// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Branch } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { BranchUpdatedEvent } from '../events/branch-updated.event';
import { UpdateBranchCommand } from './update-branch.command';

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler
  implements ICommandHandler<UpdateBranchCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateBranchCommand): Promise<Branch> {
    const branch = await this.prismaService.branch.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new BranchUpdatedEvent(branch));

    return branch;
  }
}
