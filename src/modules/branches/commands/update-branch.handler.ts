// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Branch } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { BranchUpdatedEvent } from '../events/branch-updated.event';
import { UpdateBranchCommand } from './update-branch.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler
  implements ICommandHandler<UpdateBranchCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateBranchCommand): Promise<Branch> {
    const { customerId, id, dto } = command;

    try {
      const { count } = await this.prismaService.branch.updateMany({
        where: { id, customerId },
        data: { ...dto },
      });

      if (count === 0) {
        throw new NotFoundException('Branch not found for this customer');
      }

      const branch = await this.prismaService.branch.findUnique({
        where: { id, customerId },
      });

      if (!branch) {
        throw new NotFoundException('Branch not found after update');
      }

      this.eventBus.publish(new BranchUpdatedEvent(branch));

      return branch;
    } catch (error) {
      throw error;
    }
  }
}
