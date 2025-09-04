// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Branch } from '@/prisma/prisma.client';
import { BranchUpdatedEvent } from '../events/branch-updated.event';
import { UpdateBranchCommand } from './update-branch.command';

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler
  implements ICommandHandler<UpdateBranchCommand, Branch>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateBranchCommand): Promise<Branch> {
    const branch = await this.prismaService.client.branch.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new BranchUpdatedEvent(branch));

    return branch;
  }
}
