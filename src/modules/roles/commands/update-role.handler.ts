// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Role } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { RoleUpdatedEvent } from '../events/role-updated.event';
import { UpdateRoleCommand } from './update-role.command';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<Role> {
    const role = await this.prismaService.role.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new RoleUpdatedEvent(role));

    return role;
  }
}
