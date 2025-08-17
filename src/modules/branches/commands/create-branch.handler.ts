// External
import { ConflictException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Branch } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { BranchCreatedEvent } from '../events/branch-created.event';
import { CreateBranchCommand } from './create-branch.command';

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateBranchCommand): Promise<Branch> {


    const branch = await this.prismaService.branch.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new BranchCreatedEvent(branch));

    return branch;
  }
}
