// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma, type Branch } from '@/common/prisma/prisma.client';
import { BranchCreatedEvent } from '../events/branch-created.event';
import { CreateBranchCommand } from './create-branch.command';

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler
  implements ICommandHandler<CreateBranchCommand, Branch>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateBranchCommand): Promise<Branch> {
    const { customerId, contactId, ...input } = command.dto;

    const data: Prisma.BranchCreateInput = {
      ...input,

      customer: {
        connect: { id: customerId },
      },
    };

    if (contactId) {
      data.contact = {
        connect: { id: contactId },
      };
    }

    const branch = await this.prisma.client.branch.create({ data });

    this.eventBus.publish(new BranchCreatedEvent(branch));

    return branch;
  }
}
