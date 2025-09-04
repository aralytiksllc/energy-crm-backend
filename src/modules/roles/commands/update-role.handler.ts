// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Role } from '@/common/prisma/prisma.client';
import { RoleUpdatedEvent } from '../events/role-updated.event';
import { UpdateRoleCommand } from './update-role.command';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<Role> {
    const role = await this.prisma.client.role.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new RoleUpdatedEvent(role));

    return role;
  }
}
