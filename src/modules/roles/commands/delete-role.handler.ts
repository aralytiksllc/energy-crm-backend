// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Role } from '@/common/prisma/prisma.client';
import { RoleDeletedEvent } from '../events/role-deleted.event';
import { DeleteRoleCommand } from './delete-role.command';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler
  implements ICommandHandler<DeleteRoleCommand, Role>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<Role> {
    const role = await this.prisma.client.role.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new RoleDeletedEvent(role));

    return role;
  }
}
