// External
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Branch } from '@/prisma/prisma.client';
import { Prisma } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { BranchCreatedEvent } from '../events/branch-created.event';
import { CreateBranchCommand } from './create-branch.command';

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler
  implements ICommandHandler<CreateBranchCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateBranchCommand): Promise<Branch> {
    const { customerId, dto } = command;

    try {
      const branch = await this.prismaService.branch.create({
        data: {
          ...dto,

          // attach to customer via relation
          customer: { connect: { id: customerId } },
        },
      });

      this.eventBus.publish(new BranchCreatedEvent(branch));

      return branch;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException('Customer not found.');
        }
      }

      throw error;
    }
  }
}
