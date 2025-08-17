// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Role } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { RoleDeletedEvent } from '../events/role-deleted.event';
import { DeleteRoleCommand } from './delete-role.command';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<Role> {
    const role = await this.prismaService.role.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new RoleDeletedEvent(role));

    return role;
  }
}
