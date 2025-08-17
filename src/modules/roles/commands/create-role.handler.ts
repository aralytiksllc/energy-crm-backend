// External
import { ConflictException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Role } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { RoleCreatedEvent } from '../events/role-created.event';
import { CreateRoleCommand } from './create-role.command';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateRoleCommand): Promise<Role> {
    const role = await this.prismaService.role.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new RoleCreatedEvent(role));

    return role;
  }
}
